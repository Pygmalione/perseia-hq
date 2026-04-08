# Media brain spec

## Cel
Zbudować warstwę, która pozwala znaleźć właściwy obraz, wideo, PDF lub template po treści, stylu, kolorze, historii użycia, feedbacku i relacjach projektowych.

## Zakres v1
- Skan istniejących assetów,
- fingerprint pliku przez hash,
- sidecar `.asset.yaml`,
- indeks sqlite dla szybkich lookupów,
- relacje temporalne w Graphiti,
- tagi ręczne i półautomatyczne,
- wyszukiwanie po metadata i full text,
- widoki: list, grid, timeline, related.

## Zakres v2
- embeddings multimodalne,
- klasteryzacja podobnych assetów,
- wykrywanie duplikatów i bliskich wariantów,
- ekstrakcja OCR z obrazów i PDF,
- similarity graph dla motywów wizualnych.

## Dane obowiązkowe per asset
- `asset_id`,
- `sha256`,
- `path`,
- `kind`,
- `project`,
- `source`,
- `created_at`,
- `dimensions`,
- `duration_ms`,
- `palette`,
- `keywords`,
- `feedback_refs`,
- `usage_history`,
- `embedding_ref`.

## Sidecar YAML
Każdy asset ma plik `.asset.yaml` z:
- tytułem,
- opisem,
- słowami kluczowymi,
- projektem,
- kampanią,
- typem formatu,
- preferencjami i antywzorcami,
- historią iteracji,
- referencjami do feedbacku.

## Search modes
1. Exact search - po ID, nazwie, ścieżce,
2. Faceted search - po filtrach metadata,
3. Relational search - po projekcie, osobie, kampanii,
4. Semantic search - po embeddingach,
5. Reverse history search - pokaż wszystko, co było inspirowane danym assetem.

## Pipeline ingestu
1. Skan katalogów,
2. Hash i basic metadata,
3. Sidecar resolve albo create,
4. SQLite insert/update,
5. Graphiti relation sync,
6. Search index refresh,
7. Checkpoint do `state/import-runs.json`.

## KPI
- lookup do 2 sekund,
- pełne metadata dla 90% assetów,
- zero zgubionych referencji do feedbacku,
- deduplikacja bliskich wariantów.
