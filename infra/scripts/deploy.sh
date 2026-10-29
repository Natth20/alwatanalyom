#!/usr/bin/env bash
set -euo pipefail

# ========================================================
# نص النشر الآلي على الخادم للإنتاج (Zero-Downtime Deployment)
# ========================================================

TAG="${TAG:-latest}"
echo "🚀 Starting Al-Watan Al-Youm deployment with TAG: ${TAG}..."

# 1. سحب أحدث صور الحاويات
echo "📦 Pulling container images..."
docker compose -f infra/compose/docker-compose.prod.yml pull

# 2. تطبيق هجرات قاعدة البيانات المتوافقة تصاعدياً قبل الإطلاق
echo "🗄️ Running database migrations..."
docker compose -f infra/compose/docker-compose.prod.yml run --rm worker pnpm db:migrate:deploy

# 3. تحديث الخدمات بالتسلسل دون توقف
echo "🔄 Updating web service..."
docker compose -f infra/compose/docker-compose.prod.yml up -d --no-deps --wait web

echo "🔄 Updating admin service..."
docker compose -f infra/compose/docker-compose.prod.yml up -d --no-deps --wait admin

echo "🔄 Updating worker service..."
docker compose -f infra/compose/docker-compose.prod.yml up -d --no-deps worker

echo "🔄 Reloading Caddy proxy..."
docker compose -f infra/compose/docker-compose.prod.yml exec -T caddy caddy reload --config /etc/caddy/Caddyfile || true

# 4. اختبار الدخان والتأكد من استجابة الموقع
echo "🔍 Running smoke test on healthcheck endpoint..."
sleep 3
if curl -sf http://127.0.0.1:3000/api/health > /dev/null; then
  echo "✅ Deployment completed successfully! Service is HEALTHY."
else
  echo "⚠️ Healthcheck failed! Review container logs with: docker compose logs --tail=50"
  exit 1
fi
