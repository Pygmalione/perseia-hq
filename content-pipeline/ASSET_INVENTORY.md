# Asset Inventory – Logotopia

## Current Repository Assets
| Category        | Name                                                      | Path                                | Format | Status       | Owner  | Notes |
|-----------------|-----------------------------------------------------------|-------------------------------------|--------|--------------|--------|-------|
| Strategy        | Project Charter                                           | PROJECT_CHARTER.md                  | md     | baseline     | Core   | Misja i cele nadrzędne. |
| Operations      | Task Status Tracker                                       | TASK_STATUS.md                      | md     | in-progress  | Core   | Lista otwartych zadań. |
| Research        | Logotopia Research Report                                 | research/research-report.md         | md     | active       | R&D    | Insights o luxury minimalism 2026. |
| Research        | Architecture Patterns for Logotopia Asset Brain           | research/architecture-patterns.md   | md     | active       | R&D    | Schemat warstw asset brain. |
| Research        | Product Insights                                          | research/product-insights.md        | md     | active       | R&D    | JTBD, roadmap, ryzyka. |
| Research        | References Registry                                       | research/references.json            | json   | active       | R&D    | Indeks dokumentów źródłowych. |

## Planned Visual & Media Assets
| Archetype              | Format | Volume | Status   | Notes |
|------------------------|--------|--------|----------|-------|
| V Monogram Series      | 1:1    | 20     | upcoming | Eksperymenty typograficzne. |
| Gallery Hero Panels    | 3:4    | 15     | upcoming | Layouty dla ekspozycji głównej. |
| Motion Intros          | 16:9   | 10     | queued   | Minimalistyczne animacje wejściowe. |
| Editorial Narratives   | PDF    | 5      | scoped   | Mikroeseje kuratorskie. |
| Feedback Capsules      | 9:16   | 12     | scoped   | Pionowe formaty summary feedbacku. |

## Workspace Asset Snapshot
Źródło listy: `content-pipeline/raw-asset-list.txt` (81 pozycji).

| Cluster                         | Path Pattern                         | Count | Notes |
|---------------------------------|--------------------------------------|-------|-------|
| Visuana identity explorations   | `*visuana*`                          | 34    | Iteracje logo, hero, patterny, signature V. |
| Futuristic typography series    | `ft-w*`                              | 16    | Zestawy typograficzne wysokiej rozdzielczości. |
| Concept renders (Mar 2026)      | `/workspace/2026-*`                  | 19    | Moodboardy i sceny konceptowe z luksusowym vibe. |
| Tmp session logos               | `tmp_sessions/visuana_logo_*`        | 11    | Szybkie warianty logotypów do dalszego wyboru. |
| Curated image library           | `images/*.png`                       | 5     | Referencje UI, mixed reality, nocny ogród. |
| Motion proof-of-concept         | `marek-nowakowski-poc-001.mp4`       | 1     | Wideo testujące narrację ruchu. |
| Archival photographic imprint   | `assets/20260405_..._51b97d5c.jpg`   | 1     | Materiał źródłowy do dalszej obróbki. |

## Metadata Standards
- **Naming**: `YYYYMMDD_context_descriptor_iterX`.
- **Tags**: kanał, mood, paleta, status feedbacku.
- **Storage**: lokalny katalog `assets/` (do utworzenia) z towarzyszącymi plikami `.asset.yaml`.

## Maintenance Ritual
1. Dodawaj nowy asset do tabeli, wypełnij status.
2. Zsynkuj feedback i prompt użyty do generacji.
3. Raz w tygodniu audit – nieużywane assety archiwizowane.
