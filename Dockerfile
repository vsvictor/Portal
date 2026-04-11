# ============================================================
#  Dockerfile — multi-stage build
#  Stage 1: збираємо Vue-додаток (Node.js)
#  Stage 2: роздаємо статику через Caddy з HTTP/3
# ============================================================

# ── Stage 1: Build ──────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Копіюємо маніфести залежностей окремо (для кешування шару)
COPY package*.json ./
RUN npm ci --prefer-offline

# Копіюємо вихідний код і збираємо
COPY . .
RUN npm run build

# ── Stage 2: Serve with Caddy (HTTP/3) ─────────────────────
FROM caddy:2-alpine

# Статика зі Stage 1
COPY --from=builder /app/dist /usr/share/caddy

# Конфігурація Caddy
COPY Caddyfile /etc/caddy/Caddyfile

# 80   — HTTP (редирект на HTTPS)
# 443  — HTTPS / HTTP/2 / HTTP/3 (TCP)
# 443/udp — HTTP/3 QUIC (обов'язково!)
EXPOSE 80 443 443/udp

