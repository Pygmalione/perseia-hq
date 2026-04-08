# GUI spec - Perseia Imperial Gallery + Knowledge Garden

## Cel
Zaprojektować headquarters UI, które łączy piękno galerii z brutalnie skuteczną operacyjnością.

## Główne widoki

### 1. Home HQ
- Hero z aktywnym stanem systemu,
- kafle: Gallery, Garden, Asset Brain, Draft Studio, Projects, Ops,
- ostatnie checkpointy,
- feed ostatnich feedbacków i ingestów.

### 2. Knowledge Garden
- panel preferencji Karola,
- historia zmian gustu,
- reguły tonu i komunikacji,
- relacje osób, marek i biznesów,
- załączniki i źródła feedbacku,
- filtr po projektach i kampaniach.

### 3. Asset Brain
- wyszukiwarka globalna,
- filtry: typ, ratio, kolor, tag, projekt, kampania, status, osoba,
- grid i list view,
- cluster view dla podobnych assetów,
- timeline użycia assetów,
- panel sidecar metadata.

### 4. Draft Studio
- wybór respondenta,
- wybór celu odpowiedzi,
- zasysanie kontekstu z Garden,
- edytor draftu,
- wersjonowanie i porównanie draftów,
- zapis wyniku i feedbacku.

### 5. Projects
- lista projektów,
- PRD, epiki, taski, checkpointy,
- widok dependency,
- widok batchy Logotopii,
- status verify i deploy.

### 6. Review Console
- szybkie ocenianie assetów,
- yes/no/maybe + notatka,
- ekstrakcja preference tags,
- zapis do feedback registry,
- generowanie next move dla prompt engine.

## Nawigacja
- lewy rail z ikonami modułów,
- górny command bar,
- global search wszędzie,
- breadcrumbs w głębokich widokach,
- quick actions: add feedback, ingest asset, draft reply, start batch.

## Design language
- premium editorial minimalism,
- ciemny grafit, krem, platyna, subtelny blush,
- serif display + neutralny grotesk,
- kontrolowana asymetria,
- duże marginesy i mocna hierarchia.

## Responsywność
- desktop first dla headquarters,
- tablet do review i draftów,
- mobile do szybkiego lookupu i feedbacku.

## Stany pustych ekranów
Każdy moduł ma pokazywać next action zamiast martwej pustki.
