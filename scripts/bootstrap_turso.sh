#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SCHEMA_PATH="$ROOT_DIR/db/schema.sql"

if ! command -v turso >/dev/null 2>&1; then
  echo "❌ Brak CLI 'turso'. Zainstaluj je: curl -sSfL https://get.tur.so/install.sh | bash"
  exit 1
fi

if [[ -z "${TURSO_DATABASE_NAME:-}" ]]; then
  echo "❌ Ustaw TURSO_DATABASE_NAME, np. export TURSO_DATABASE_NAME=perseia-hq"
  exit 1
fi

if [[ ! -f "$SCHEMA_PATH" ]]; then
  echo "❌ Nie znaleziono schema.sql w $SCHEMA_PATH"
  exit 1
fi

echo "➡️ Tworzę bazę: $TURSO_DATABASE_NAME"
turso db create "$TURSO_DATABASE_NAME" || true

DB_URL="$(turso db show "$TURSO_DATABASE_NAME" --url)"
AUTH_TOKEN="$(turso db tokens create "$TURSO_DATABASE_NAME")"

echo "➡️ Wgrywam schemat do Turso"
turso db shell "$TURSO_DATABASE_NAME" < "$SCHEMA_PATH"

echo
echo "✅ Turso gotowe"
echo "TURSO_DATABASE_URL=$DB_URL"
echo "TURSO_AUTH_TOKEN=$AUTH_TOKEN"
echo
echo "➡️ Następny krok: dodaj te envy do Vercel:"
echo "vercel env add TURSO_DATABASE_URL production"
echo "vercel env add TURSO_AUTH_TOKEN production"
echo
echo "➡️ Potem zrób redeploy:"
echo "vercel deploy --prod --yes"
