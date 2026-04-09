# Turso setup for Perseia HQ

## Cel

Przenieść runtime HQ z efemerycznego fallbacku `file:state/hq.sqlite` na trwałą bazę Turso, żeby feedback i live summaries persystowały na Vercelu.

## Co jest już gotowe

- App używa `@libsql/client`,
- `src/lib/db.ts` automatycznie przełącza się na Turso, gdy istnieją envy `TURSO_DATABASE_URL` i `TURSO_AUTH_TOKEN`,
- Data layers i `POST /api/feedback` są już zmigrowane,
- Schemat źródłowy jest w `db/schema.sql`,
- Bootstrap jest gotowy w `scripts/bootstrap_turso.sh`.

## Wymagania

- Konto Turso,
- Zainstalowany CLI `turso`,
- Zalogowany `vercel` CLI dla właściwego projektu.

## Szybka ścieżka

```bash
curl -sSfL https://get.tur.so/install.sh | bash
export TURSO_DATABASE_NAME=perseia-hq
bash scripts/bootstrap_turso.sh
```

Skrypt:
1. tworzy bazę,
2. pobiera URL,
3. generuje token,
4. wgrywa `db/schema.sql`,
5. wypisuje gotowe envy do Vercel.

## Dodanie envów do Vercel

```bash
vercel env add TURSO_DATABASE_URL production
vercel env add TURSO_AUTH_TOKEN production
vercel deploy --prod --yes
```

## Verify po deployu

- `GET /api/brain` zwraca 200,
- `POST /api/feedback` zwraca 200,
- nowy feedback nie znika po redeployu.

## Uwaga

Bez envów Turso aplikacja nadal działa, ale na Vercelu fallbackuje do lokalnego pliku, więc dane są efemeryczne.
