# System architecture - Perseia Imperial Gallery + Knowledge Garden

## Warstwy systemu

### 1. Experience layer
Next.js app jako headquarters UI.
Widoki:
- Gallery,
- Knowledge Garden,
- Asset Brain,
- Draft Studio,
- Projects,
- Review Console.

### 2. Application layer
Serwisy aplikacyjne:
- `feedback-service` - zapis i agregacja feedbacku,
- `asset-service` - indeksacja, wyszukiwanie, wersjonowanie,
- `draft-service` - persony, style, relacje, generator draftów,
- `project-service` - PRD, epiki, taski, checkpoints,
- `ingest-service` - skanowanie plików, metadane, embeddingi,
- `memory-sync-service` - synchronizacja SQLite <-> Graphiti <-> stateful files.

### 3. Data layer
- SQLite - szybka baza operacyjna,
- Graphiti - pamięć temporalna, relacje encji i decyzji,
- Stateful files - źródło prawdy dla projektów, planów i audytowalnych checkpointów,
- File storage - obrazy, wideo, PDF, dokumenty, sidecars.

## Główne przepływy
1. Asset ingest -> hash -> metadata -> embedding -> sqlite -> relacje do Graphiti.
2. Feedback Karola -> capture -> normalization -> sqlite tables -> Graphiti memory -> prompt updates.
3. Projekt -> PRD -> epiki -> taski -> checkpoints -> drafty -> assety -> review.
4. Draft odpowiedzi -> respondent profile -> tone rules -> context retrieval -> draft history.

## Moduły HQ
- `gallery` - ekspozycja finalnych kolekcji,
- `garden` - wiedza o gustach, politykach, relacjach, historii,
- `brain` - wyszukiwarka assetów i powiązań,
- `studio` - drafty odpowiedzi, prompt recipes, brief composer,
- `projects` - specy, epiki, taski, statusy,
- `ops` - job runs, cron hooks, import history, verify logs.

## Zasady architektoniczne
- Local-first,
- Git-friendly,
- Deterministic state,
- Search everywhere,
- Trace every feedback,
- One asset, many relations.

## Integracje
- Graphiti,
- Vercel dla frontu,
- GitHub dla repo i historii zmian,
- lokalne generatory obrazów, wideo i audio,
- później OCR i multimodal embeddings.
