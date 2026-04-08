# Product requirements - Perseia Imperial Gallery + Knowledge Garden

## Cel produktu
Zbudować operacyjne headquarters Phantasii, które łączy piękną ekspozycję kreacji z pamięcią gustu Cesarza, asset brainem dla obrazów i wideo, systemem draftowania odpowiedzi oraz stateful warstwą planowania projektów, speców, epik i tasków.

## Główne problemy do rozwiązania
- Feedback o kreacjach ginie w czatach, zamiast odkładać się do trwałej pamięci wykonawczej.
- Assety są rozproszone po plikach i trudno znaleźć właściwy wariant po motywie, kolorze, historii użycia lub relacji do biznesu.
- Imperial Gallery jest dziś galerią ekspozycyjną, ale nie pełnym centrum operacyjnym.
- Brakuje GUI do zarządzania wiedzą o osobach, politykach, tonie, historii zmian gustu i załącznikach.
- Brakuje systemu, który pozwala przejść od briefu do draftu odpowiedzi i od draftu do assetu, zachowując pełną pamięć decyzji.

## Użytkownicy
- Phantasia jako główna operatorka systemu,
- Karol jako finalny recenzent i źródło feedbacku,
- Inni agenci Imperium jako konsumenci wiedzy i współwykonawcy.

## Jobs to be done
1. Znaleźć w sekundach właściwy asset lub referencję wśród tysięcy plików.
2. Zapisać feedback tak, aby wpływał na kolejne prompty, układ galerii i drafty odpowiedzi.
3. Zarządzać projektami kreatywnymi przez PRD, epiki, taski i pliki stanu.
4. Tworzyć drafty odpowiedzi idealnie dopasowane do osoby, relacji, tonu i historii.
5. Budować kolejne serie logo, obrazów, wideo i dokumentów z pełną trasowalnością.

## Zakres v1
- Headquarters UI z modułami Gallery, Knowledge Garden, Asset Brain, Draft Studio, Projects,
- SQLite jako główna baza operacyjna,
- Graphiti jako pamięć temporalna i relacyjna,
- Stateful files jako warstwa deterministyczna dla projektów i flow,
- Ingestion pipeline dla istniejących i nowych assetów,
- Registry feedbacku Karola i stylowych preferencji,
- Wyszukiwanie po metadanych, tagach, relacjach i embeddingach,
- Task and spec system dla projektów kreatywnych,
- Logotopia production lane do 200+ assetów.

## Zakres v2
- Automatyczne ekstrakty z załączników i OCR,
- Klasteryzacja wizualna assetów,
- Scoring jakości kreacji,
- Timeline zmian gustu,
- Automatyczne propozycje draftów odpowiedzi i promptów.

## Kryteria sukcesu
- Każdy nowy asset dostaje ID, metadata i ślad feedbacku,
- Każdy feedback Karola może zostać odnaleziony i użyty przy nowej kreacji,
- Headquarters ma spójne widoki dla wiedzy, assetów i projektów,
- 200 nowych assetów można planować i śledzić batchowo,
- System ma repo git, częste commity i gotowość do wdrożenia.
