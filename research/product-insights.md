# Product Insights – Perseia Imperial Gallery + Knowledge Garden

## Core Jobs-to-be-Done
- **Karol**: błyskawicznie oceniać nowe kreacje i przekazywać feedback, który natychmiast wpływa na kolejną iterację.
- **Kuratorzy**: wybierać i aranżować assety w luksusowych sekwencjach bez nadmiaru kliknięć.
- **Strateg**: monitorować, które motywy (np. litera V, gradienty) zwiększają konwersję.

## Value Proposition
- **Jedno źródło prawdy** dla estetyki, historii feedbacku i statusu assetów.
- **Luxury minimalism 2026** jako filtr wszystkich decyzji: mniej elementów, więcej precyzji.
- **Asset brain** zdolny odnaleźć kontekst (kampania, mood, kolor) w czasie rzeczywistym.

## User Insights
- Karol preferuje krótkie, wysoko-informacyjne raporty wizualne z 2–3 top propozycjami.
- Zespół kreatywny musi mieć gotowe prompt templates do natychmiastowego użycia.
- Potrzebna jest czytelna mapa progresu (np. 200 assets batch → status, feedback loop, final deliverable).

## Roadmap Highlights
1. **Sprint 0** – ustanowienie content pipeline (ten zestaw plików) i konfiguracja asset inventory.
2. **Sprint 1** – wdrożenie prompt systemu, utworzenie 20 referencyjnych assetów, pierwsza pętla feedback.
3. **Sprint 2** – automatyczne feedowanie feedbacku do knowledge garden, KPI dla szybkości review.
4. **Sprint 3** – skalowanie do 200 assetów, segmentacja wg kanałów (wystawa, digital, print, motion).

## Risks & Mitigations
- **Przeładowanie systemu**: ograniczamy liczbę jednoczesnych wariantów do 5 na batch.
- **Rozbieżność stylu**: styl guardrails w `PROMPT_SYSTEM.md` + wizualne QA checklisty.
- **Brak danych historycznych**: start z manualnym taggingiem, później semi-automatyczne embeddingi.

## KPIs to Track
- Czas od briefu do pierwszego review (docelowo <6h).
- Ilość assetów zatwierdzonych w pierwszej iteracji.
- Satysfakcja Karola (ankieta po każdej serii) – target 4.8/5.
- Pokrycie asset inventory (minimum 90% zasobów posiada aktualny status).
