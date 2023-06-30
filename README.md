# Webscraper für kleinanzeigen.de
Ein smarter Webscraper für kleinanzeigen.de, der die Anzeigen auf bestimmte Schlagwörter prüfen kann.

# Motivation

Ermöglicht das Absuchen von Anzeigen auf kleinazeigen auf bestimmte Schlagwörter. Will ich beispielsweise nach einem Handy suchen, will ich nicht, dass mir Anzeigen angezeigt werden, welche einen Displaschaden beschreiben. Andernfalls will ich eventuell auch nur Anzeigen angezeigt bekommen, die bereits in der Beschreibung oder dem Titel eine Information zum Batteriezustand geben. So können Titel und Beschreibungen der Anzeigen bereits vorab gefiltert werden.

# Wie?

To install all dependencies:

```
npm install
```


Lege fest, wie und wonach du suchen willst.

Initial ist festgelegt, dass nur Angebote und keine Gesuche brücksichtigt werden. Dies legt die Konstante 'angebotstyp' fest.
Die Preisrange wird mit 'preis_range' festgehalten und ist in diesem Fall bei 350€-500€.
Den Suchtext legst du in'suchtext' fest. Die Leerzeichen werden durch '-', um die Query korrekt auszuführen.

Weiterhin kannst du Schlagwörter festlegen, welche im Anzeigentitel oder in der Beschreibung enthalten sein sollen.
Dazu kannst du auch Schlagwörter festlegen, welche nicht im Anzeigentitel oder in der Beschreibung auftauchen sollen.

In diesem Beispiel, möchte ich, dass die Anzeige eine Angabe zum 'Batteriezustand' enthält. Ich möchte aber nicht, dass das Wort 'Displayschaden' oder der String 'Kein Paypal' auftaucht.

Beim Ausführen des Programms wird die Suchquery ausgeführt und alle Anzeigen der ersten Seite auf die Schlagwörter analysiert.
Dabei gilt, dass alle in 'tags' enthaltenen Schlagwörter im Titel oder der Beschreibung auftauchen müssen.

Für 'non_tags' gilt, dass keiner dieser non_tags enthalten sein darf.

Somit werden am Ende nur die Links zu den Anzeigen ausgegeben, welche alle meine tags enthalten und keine meiner non-tags.

```
const url = "https://www.kleinanzeigen.de"; //main url
const angebotstyp = "/s-anzeige:angebote"; //nur angebote, kein gesuche
const preis_range = "/preis:350:550"; //350€-500€
let suchtext = "iphone 13 mini"; //suchtext

const tags = ["batteriezustand"]; //schlagwörter, die die beschreibung enthalten soll
const non_tags = ["displayschaden", "kein paypal"]; //schlagwörter, die nicht in beschreibung stehen sollen
```

# Zukunft & Hinweise

- Frontend zur erleichterten Eingabe in einer no-code-Umgebung integrieren
- Noch weitere Filter wie Stadt und Umgebung einbauen
- Möglichkeit geben, dass nicht alle tags enthalten sein müssen
- Das Untersuchen von Anzeigen auf den weiteren Seiten und nicht nur auf der ersten Seite
