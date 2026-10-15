---
title: "Harden your VPS before installing a self-hosted PaaS: SSH, firewall and the Docker ufw trap"
description: "A practical checklist for a fresh Linux VPS before you install DeployKit: updates, SSH keys, a firewall Docker can't bypass, fail2ban, and securing the panel."
slug: harden-vps-before-self-hosted-paas
date: 2026-10-15
tags: [security, self-hosting, vps, docker, tutorial]
author: DeployKit Team
---

A self-hosted PaaS is a powerful thing to put on the internet. It holds your source credentials, your database passwords and access to the Docker socket, which is effectively root on the machine. Before you install one, it's worth spending twenty minutes making the server itself hard to break into.

This checklist assumes a fresh **Ubuntu 24.04** or **Debian 12** VPS. The commands are similar on other distributions. Do the steps in order, and keep your current SSH session open until you've confirmed you can log in again.

## 1. Update everything and turn on automatic security updates

```bash
sudo apt update && sudo apt full-upgrade -y
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

Unattended upgrades install security patches every day. Reboot when the kernel is updated (`/var/run/reboot-required` exists), or install `needrestart` so you're told which services need a restart.

## 2. Create a regular user with sudo

Don't work as `root` day to day:

```bash
adduser deploy
usermod -aG sudo deploy
```

Copy your public key to the new user, from **your own machine**:

```bash
ssh-copy-id deploy@your-server-ip
```

Open a **new** terminal and check that `ssh deploy@your-server-ip` works and that `sudo -v` asks for the password. Only then move on.

## 3. Lock down SSH

Passwords are what bots guess. Keys aren't. Create a drop-in file so package updates don't overwrite your settings:

```bash
sudo tee /etc/ssh/sshd_config.d/10-hardening.conf > /dev/null <<'EOF'
PasswordAuthentication no
KbdInteractiveAuthentication no
PermitRootLogin no
PubkeyAuthentication yes
MaxAuthTries 3
EOF
sudo sshd -t && sudo systemctl reload ssh
```

`sshd -t` validates the config before reloading, so a typo doesn't lock you out. Test a new login before closing your current session.

Moving SSH to a non-standard port cuts log noise, but it isn't real security. Keys and a firewall are what matter.

## 4. The firewall, and the Docker trap

This is the step most guides get wrong for Docker hosts.

**Docker bypasses `ufw`.** When a container publishes a port, Docker writes its own iptables rules, and they're evaluated before ufw's. So `ufw deny 5432` can report the port as blocked while a database container on that port is reachable from the whole internet.

On a DeployKit server, ports get published on the host in three cases:

- An app **without a domain** publishes its port on the host.
- A database with an **external port** enabled.
- A **game server**, whose players connect to its ports directly.

Apps with a domain don't publish anything. Traffic only enters through Traefik on 80 and 443.

### Use your cloud provider's firewall

The most reliable fix is a firewall **outside** the server: Hetzner Cloud Firewall, AWS Security Groups, DigitalOcean Cloud Firewalls, and so on. Docker can't touch those rules. A sensible starting point:

| Port | Protocol | Source | Why |
| --- | --- | --- | --- |
| 22 | TCP | Your IP (or office/VPN range) | SSH |
| 80 | TCP | Anywhere | Let's Encrypt validation and the HTTP→HTTPS redirect |
| 443 | TCP | Anywhere | Your apps and the dashboard |
| Game ports | TCP/UDP | Anywhere | Only if you run game servers |

Port 80 has to stay open even if everything ends up on HTTPS, because Let's Encrypt validates certificates over it.

### If you also use ufw

ufw is still useful for the host's own services, such as SSH:

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

Just don't rely on it for container ports. If you need host-level filtering of published ports, add rules to Docker's `DOCKER-USER` chain, for example with [ufw-docker](https://github.com/chaifeng/ufw-docker). **Don't disable Docker's iptables integration** (`"iptables": false`): it breaks container networking.

The safest habit is simply to publish as little as possible. Give every web app a domain, and only enable a database's external port when you really need it, restricted to your IP in the provider firewall.

## 5. Slow down brute-force attempts with fail2ban

Even with key-only SSH, bots hammer port 22 and fill your logs. fail2ban bans IPs after repeated failures:

```bash
sudo apt install -y fail2ban
sudo tee /etc/fail2ban/jail.local > /dev/null <<'EOF'
[sshd]
enabled = true
backend = systemd
maxretry = 5
bantime = 1h
EOF
sudo systemctl enable --now fail2ban
sudo fail2ban-client status sshd
```

The DeployKit dashboard has its own protection: login and registration are limited to 10 attempts per minute per IP.

## 6. Basic housekeeping

- **Time sync.** Certificates and tokens depend on the clock. Check `timedatectl` shows `System clock synchronized: yes`.
- **Swap on small servers.** On a 1–2 GB VPS, image builds can run out of memory. A 2 GB swap file gives you headroom:

  ```bash
  sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile
  sudo mkswap /swapfile && sudo swapon /swapfile
  echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
  ```

- **Docker log rotation.** By default, container logs grow without limit. Set a cap in `/etc/docker/daemon.json` (create it if Docker is already installed, then restart Docker):

  ```json
  {
    "log-driver": "json-file",
    "log-opts": { "max-size": "10m", "max-file": "3" }
  }
  ```

## 7. Install DeployKit, then secure the panel straight away

Now install:

```bash
npm i -g @deploykit/cli
sudo deploykit install --domain deploy.example.com --email you@example.com
```

Then, right away:

- **Create the admin account immediately.** If you didn't pass an admin email and password to the installer, the dashboard shows a registration form, and **the first person to register becomes the admin**. Don't leave a fresh install sitting with that form open on the internet. Register as soon as the domain resolves.
- **Use a long, unique password** and invite teammates with the lowest role they need: Viewer, Operator or Admin. See [users and roles](/docs/users-rbac).
- **Back up `/opt/deploykit/.env`.** The installer writes every secret there with mode `600`, including the encryption key for your apps' environment variables. If you lose that key, the stored variables can't be decrypted. Keep a copy in your password manager.
- **Copy backups off the server.** Database and game backups go to `/var/backups/deploykit`. A backup on the same disk doesn't survive losing the server, so sync that folder somewhere else.
- **Leave `TRUST_PROXY=false`** unless every request reaches DeployKit through a proxy you control that sets `X-Forwarded-For`. Otherwise clients could spoof their IP in rate limits and the audit log.
- **Treat Docker access as root access.** Anyone in the `docker` group, or with access to DeployKit's Admin role, can control the host. Keep that list short, and check the [audit log](/docs/audit-logs) from time to time.

## The checklist

1. System updated, unattended security upgrades on.
2. Non-root sudo user with an SSH key.
3. SSH: no passwords, no root login, config validated with `sshd -t`.
4. Cloud firewall allowing only 22 (from your IP), 80 and 443, plus game ports if needed.
5. No container port published that doesn't need to be. Remember that ufw doesn't cover them.
6. fail2ban watching SSH.
7. Clock synced, swap on small servers, Docker log rotation set.
8. Admin account created right after install, `.env` backed up, backups copied off the server.

None of this is specific to DeployKit, and it's worth doing on any server that faces the internet. Once it's done, follow the [installation guide](/docs/installation) and the [quickstart](/docs/quickstart) to deploy your first app.
