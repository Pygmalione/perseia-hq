# Architecture Patterns for Logotopia Asset Brain

## Guiding Principles
- **Premium minimalism**: tylko konieczne moduły, bez zbędnej ornamentyki w kodzie i interfejsie.
- **Stateful determinism**: każdy etap produkcji zapisany w state files, zgodnie z charterem.
- **Composable intelligence**: asset brain jako zestaw mikrousług zdolnych łączyć się z knowledge garden.

## Core Layers
1. **Ingestion Layer**
   - Pulluje metadata z repo (np. `content-pipeline/ASSET_INVENTORY.md`).
   - Integruje się z lokalnym storage (obrazy, wideo) via hash + semantic tags.
   - Walidacje: format, aspect, tonalność względem preferencji Karola.
2. **Knowledge Garden Layer**
   - Graphiti + SQLite do przechowywania relacji: asset ↔ feedback ↔ kampania.
   - Prompt memory – zapisuje skuteczne kombinacje z `PROMPT_SYSTEM.md`.
3. **Experience Layer**
   - Galerie moodboardów, storytelling cards w stylu luksusowej biblioteki.
   - Interfejs minimalny: jedna dominująca litera (V) jako motyw nawigacyjny.

## Data Flow Pattern
```
[Creative Brief] -> [Prompt System] -> [Generation Engine]
       |                      |               |
       v                      v               v
  [Knowledge Garden] <-> [Asset Brain] <-> [Review Console]
```
- Feedback wraca do Knowledge Garden w postaci structured JSON (asset id, ocena, komentarz).

## Asset Version Control
- Git-tracked `.asset.yaml` pliki towarzyszące multimedia.
- Każda iteracja ma fingerprint: `YYYYMMDD_assetname_iterX`.
- Automatyczne syntezy do `ASSET_INVENTORY.md` przez scripts w `scripts/` (do implementacji).

## Prompt & Feedback Loop
1. Start od template (system + style) z `PROMPT_SYSTEM.md`.
2. Generacja 3 wariantów → scoring Karola.
3. Update scoringu + opisów w Knowledge Garden (SQLite table `asset_feedback`).
4. Re-train local embeddings, zapewniając preferencję luxury minimalism 2026.

## Future Extensions
- **Multimodal clustering**: UMAP + CLIP embeddings do szybkiej nawigacji.
- **Temporal storytelling**: timeline, w której assety zyskują kontekst (kampania, sezon).
- **Holograficzne wystawy**: integracja z XR (opcjonalnie) przy zachowaniu minimalnej liczby gestów.
