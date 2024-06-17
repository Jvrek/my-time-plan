# my-time-plan
MyTimePlan task for recrutation process
Node 20.11.1
angular 18
Angular material, plumbJs, ngrx, rxjs

Komentarz
W ciągu dwóch godzin udało mi sie zrobić
-Tworzenie nowych typów elementów type1/2/3
-Troche zahardcodowane inputy :D (skupiłem się bardziej na łączeniach)
-Tworzenie połączen miedzy nimi
-Stworzenie warunków 
  - te same typy nie moga sie połaczyć
  - liczba połączen miedzy tymi samymi typami max 1
-interfejs
-rozne kolory dla danego typu (ustawilem background po prostu
-Nie wiem czy idalnie sie wyswietlaja informacje w consoli, ale po kazdej akcji dostajemi informacje jakie elementy i ich wartosci sa w store oraz jakie są połączenia.

Trudności mialem z obsługą biblioteki jsplumb, bo o ile na początek wydawała sie fajnym wyborem o tyle później zorientowałem się, że nowa wersja dla typeScript 4.x którą zainstalowałem nie ma zbyt dobrej dokumentacji.
Straciłem sporo czasu na to żeby sensownie ją użyć. Mozliwe ze powinenen był od razu zmienić na inna biblioteke lub spedzić wiecej czasu nad wyborem.

Nie mniej w ciągu dwóch godiin wydaje mi się że udało mi sie zrealizowac wszystkie założenia. Po dwóch godzinach zająłem sie optymalizacyjnymi rzeczami i poprawianiem wygladu elementow i inputów.
Po czasie poprawilem tez kilka błedów którymi nie zdązylem się zajac w ustalonym czasie.

Poprawiłbym jeszcze dynamiczne odświeżanie połączeń, ponieważ teraz po stworzeniu połączenia i przesunięciu elementu strzałka nie rysuje się na nowo.
Może pobawie się tym jeszcze, ale już na osobnym branchu bugfix/arrow-refresh

Pozdrawiam
Jarek
