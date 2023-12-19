# Filmvisarna

## Run tests

**Använd branch:en `react-easier-fix` för att använda `npm install` och `npm test` utan att ändra i `node_modules`. När du gått till branch:en följ stegen som vanligt men hoppa över steg 2 (även om du redan kört `npm install` på en annan branch).**

1. 
```bash
npm install
```
2. Gå till filen `/node_modules/react-easier/useDebug.js` och kommentera ut rad 3 (`if (import.meta...`)

3. 
```bash
npm test
```

## Utforskande testning
### Bokning
* Bokningen av biljetter liknade ett vanligt biosystem (som t.ex. från Filmstaden). 
* Det tar oftast onödigt lång tid för själva bokningen av en film att gå igenom ( 7~10+ sekunder). 
* När man bokar platser tillsammans är maxgränsen 6 totalt personer. Om du väljer “separata platser” så försvinner gränsen och man kan öka antalet vuxna/barn/pensionärer hur mycket som helst. Stänger du av “separata platser” så försöker hemsidan sätta totalen av antal personer/biljetter på en och samma rad. Det blir massa felmeddelanden i konsolen. Det går däremot inte att placera bokningen om inte totalen av antal biljetter faktiskt får plats på den raden du väljer. 
* Vid bokning finns det en "logga in!"-knapp som inte fungerar. 
* Man kan trycka boka utan att skriva in någon mail eller telefon nummer och blir då fast på att det laddar
### Avbokning
* Det går inte att avboka en film om du bokade den utan att logga in. 
* Vi upptäckte att viss del av informationen på avbokningssidan är dold i bakgrunden. Det är information som redan syns på kortet ovan men hittades av våra tester först när vi letade efter texten på sidan. 

## Unit-testning med Jest
### Vad testade vi?
Bokning och avbokning. Vi valde att testa komponenterna i `/components/bookMovie` och `/components/userPage`

**Filer som vi testar:**
* BookingTicketsForm.jsx
* ChooseSeats.jsx
* ConfirmBooking.jsx
* SeperateSeatsToggle.jsx (felstavat filnamn “separate”)
* TicketCounter.jsx
* CancelBooking.jsx
* UserBookingCard.jsx

**BookingTicketsForm:**

Komponenten innehåller en “Bli medlem”-knapp, en “logga in!”-knapp som inte funkar, ett formulär där du kan fylla i mailadress två gånger och mobiltelefon. Det finns en “Boka”-knapp under allt som inte är del av komponenten. 

**ChooseSeats:** 

Komponenten innehåller komponenten SeperateSeatsToggle (se nedan), biosalongens alla rader och platser som är bokade, tillgängliga eller markerade. En “Fortsätt”-knapp är underst som tillhör en annan komponent. 

**ConfirmBooking:**

Komponenten innehåller bokningsinformation efter att bokningen genomförts. T.ex bokningsnummer, filmtitel, rad & plats, salong, etc. 

**SeperateSeatsToggle:**

Komponenten är del av ChooseSeats och har en toggle-knapp som ställer in så att du kan välja platser separat i en salong istället för tillsammans. 

**TicketCounter:**

Komponenten innehåller tre räknare för Vuxen-, Barn- och Pensionärsbiljetter. Går mellan 0 och 6 totalt (t.ex. 2 av varje, eller 4 vuxna och 2 barn). Om du togglar separata platser kan du välja hur många biljetter som helst (troligen inte avsedd funktionalitet). Information om den valda filmen finns här också, med filmplansch, titel, datum, etc. 

**CancelBooking:**

Komponenten som kommer upp när man trycker `Avboka` i ett `UserBookingCard` för att konfirmera avbokningen. Komponenten visar även information om bokningen.

**UserBookingCard:**

Komponenten som visar en bokning på en användares sida. Inkluderar information om bokningen samt en `Mer info`-knapp som visar mer information och en avbokningsknapp. När man trycker på avboknings-knappen ska komponenten `CancelBooking` visas med hjälp av en `setState`.


### Hur god testtäckning har vi?

Vi har inte så bra testtäckning då vi inte testar alla filer. Vi testar heller inte integrationen mellan komponenterna. Ett exempel på det är att vi inte hittar de buggar från den utforskandetestningen som vi gjorde.

### Fanns det problem/brister med bokningssystemet som vi upptäckte vid testning? Vilka?

Vi upptäckte inga fel med våra enhetstester, alla tester går igenom.

### Stötte vi på problem med själva testramverket under arbetet med testerna? Vad? Vad var svårt att få att fungera med Jest? Varför?

Vi stötte på problem när vi gjorde vår jest setup. Problemet vi stötte på berodde på modulen `react-easier`. Vi löste det genom att fixa babel configen och lägga till `transformIgnorePatterns` i jest inställningarna i `package.json`
```json
"transformIgnorePatterns": [
      "/node_modules/(?!react-easier)"
    ]
```

Efter det stötte vi på problemet att react-easier använder sig av `import.meta`. Vi löste det genom att bara kommentera ut den raden från filen i `node_modules/react-easier.

Anledningen av många av dessa problem på grund av att jest använder `require` iställer för `import`

### Går det att ‘mocka’/simulera saker under testerna på ett bra sätt?

Det gick att mocka saker under testerna. Vi skulle vilja försöka hitta ett bättre sätt att mocka till exempel `useState` och har kvar original funktionalitet + testa den.

### Fallback/kompletterande testning: Gjorde vi någon kompletterande testning med annat testramverk än Jest? (T.ex. Cypress.io). Varför? Vad kom vi fram till under dessa tester?

Vi fokuserade på att skriva tester i Jest för att lära oss om det. Om vi hade använt andra verktyg som Cypress hade det snarare varit ui-testing istället för enhetstestning och vi hade kunnat ha större testtäckning.

### Är det enkelt/svårt att förstå/följa hur källkoden fungerar - React-komponenter etc?

Att förstå själva react-koden i helhet var inte jättesvårt. Koden var dock ganska svårläst med otydliga variabler. Ett exempel på det är användningen av “toggle” utan att förklara vad den styr på många ställen i koden. Ett annat exempel är att “seat” har olika mening i en “movie” och i en “booking”. I en booking är seat true/false medan i “movie” är det en siffra.

## Förslag till förbättringar och framtida testutveckling

### Hade det gått att göra fler tester, vilka? Hur hade det förbättrat testtäckningen?

Det hade gått att göra mer tester. Ett uppenbart ställe är att testa filer i `/pages`. Det skulle även testa integrationen mellan komponenterna. 

Det är några funktioner som finns i komponenterna `ChooseSeats.jsx` och `TicketCounter.jsx` som vi inte hann testa.

Om man testar mer saker förbättras testtäckningen.

### Hade andra testramverk behövts också (t.ex. för endpoint-testning)?
Andra ramverk som Cypress för e2e testning hade ökat testtäckningen. Det skulle till exempel kunna göra att vi kan testa hela bokningsflödet. Det hade även gjort det enklare att återskapa de problem som vi upptäckte i vår utforskande testning då man är direkt i gränssnittet till skillnad från enhetstesterna vi gjorde på komponenterna.

Vi hade även kunnat använda postman+newman för att skriva endpoint-testning till API:et för att se till att det fungerar som förväntat.


