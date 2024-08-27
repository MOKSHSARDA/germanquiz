const chapter1Questions = [
    // Example questions - replace these with your full set
    { question: "What does 'Haus' mean?", options: ["House", "Car", "Dog", "Tree"], correctAnswer: "House" },
    { question: "What does 'Hund' mean?", options: ["Dog", "Cat", "Bird", "Fish"], correctAnswer: "Dog" },
    { question: "What does 'Tisch' mean?", options: ["Table", "Chair", "Bed", "Sofa"], correctAnswer: "Table" },
    { question: "What does 'Stuhl' mean?", options: ["Chair", "Table", "Lamp", "Window"], correctAnswer: "Chair" },
    { question: "What does 'Buch' mean?", options: ["Book", "Pen", "Notebook", "Phone"], correctAnswer: "Book" },
    { question: "What does 'Apfel' mean?", options: ["Apple", "Banana", "Orange", "Grapes"], correctAnswer: "Apple" },
    { question: "What does 'Auto' mean?", options: ["Car", "Bike", "Bus", "Train"], correctAnswer: "Car" },
    { question: "What does 'Straße' mean?", options: ["Street", "Park", "Building", "Shop"], correctAnswer: "Street" },
    { question: "What does 'Fenster' mean?", options: ["Window", "Door", "Roof", "Wall"], correctAnswer: "Window" },
    { question: "What does 'Tür' mean?", options: ["Door", "Window", "Floor", "Ceiling"], correctAnswer: "Door" },
    { question: "What does 'Fenster' mean?", options: ["Window", "Door", "Roof", "Wall"], correctAnswer: "Window" },
    { question: "What does 'Tür' mean?", options: ["Door", "Window", "Floor", "Ceiling"], correctAnswer: "Door" },
    { question: "What does 'Straße' mean?", options: ["Street", "Park", "Building", "Shop"], correctAnswer: "Street" },
    { question: "What does 'Fenster' mean?", options: ["Window", "Door", "Roof", "Wall"], correctAnswer: "Window" },
    { question: "What does 'Tür' mean?", options: ["Door", "Window", "Floor", "Ceiling"], correctAnswer: "Door" },
    { question: "What is the English meaning of 'Danken'?", options: ["To thank", "To know", "To collect", "To play"], correctAnswer: "To thank" },
    { question: "Which German word means 'to listen'?", options: ["Zuhoren", "Horen", "Sein", "Sammeln"], correctAnswer: "Zuhoren" },
    { question: "What does 'Sagen' mean in English?", options: ["To say", "To write", "To listen", "To thank"], correctAnswer: "To say" },
    { question: "Which word means 'to greet' in German?", options: ["Grüßen", "Bekannt", "Verstehen", "Lernen"], correctAnswer: "Grüßen" },
    { question: "What is 'Situation' in German?", options: ["Situation", "Possibility", "Sentence", "Question"], correctAnswer: "Situation" },
    { question: "What does 'Haben' mean in English?", options: ["To have", "To be", "To know", "To do"], correctAnswer: "To have" },
    { question: "Which word means 'to stay' in German?", options: ["Leben", "Spielen", "Lernen", "Zahlen"], correctAnswer: "Leben" },
    { question: "What is the German word for 'phone'?", options: ["Handy", "Flasche", "Nudeln", "Koffer"], correctAnswer: "Handy" },
    { question: "Which word means 'to play'?", options: ["Spielen", "Machen", "Sammeln", "Danken"], correctAnswer: "Spielen" },
    { question: "What is 'Bekannt' in English?", options: ["To know", "To play", "To collect", "To thank"], correctAnswer: "To know" },
    { question: "Which word means 'conversation' in German?", options: ["Gesprach", "Frage", "Antwort", "Satz"], correctAnswer: "Gesprach" },
    { question: "What does 'Sammeln' mean in English?", options: ["To collect", "To know", "To play", "To thank"], correctAnswer: "To collect" },
    { question: "Which word means 'to learn' in German?", options: ["Lernen", "Zahlen", "Spielen", "Kennen"], correctAnswer: "Lernen" },
    { question: "What is 'Zuordnen' in English?", options: ["To match", "To collect", "To count", "To pay"], correctAnswer: "To match" },
    { question: "Which word means 'to pay' in German?", options: ["Zahlen", "Zuordnen", "Lernen", "Horen"], correctAnswer: "Zahlen" },
    { question: "What is the German word for 'question'?", options: ["Frage", "Antwort", "Satz", "Worter"], correctAnswer: "Frage" },
    { question: "What is the German word for 'country'?", options: ["Land", "Leute", "Text", "Situation"], correctAnswer: "Land" },
    { question: "What does 'Text' mean in English?", options: ["Text", "Country", "People", "Conversation"], correctAnswer: "Text" },
    { question: "Which word means 'formal' in German?", options: ["Formell", "Informell", "Laut", "Grüßen"], correctAnswer: "Formell" },
    { question: "What is 'Leute' in English?", options: ["People", "Text", "Situation", "Answer"], correctAnswer: "People" },
    { question: "What does 'Kontrolle' mean in English?", options: ["For the purpose of checking", "Handtowel", "Bottle", "Suitcase"], correctAnswer: "For the purpose of checking" },
    { question: "What is the German word for 'sentence'?", options: ["Satz", "Frage", "Antwort", "Gesprach"], correctAnswer: "Satz" },
    { question: "What does 'Zusammen' mean in English?", options: ["Together", "Separate", "Different", "Words"], correctAnswer: "Together" },
    { question: "Which word means 'to introduce' in German?", options: ["Vorstellen", "Ein bisschen", "Langsam", "Sprechen"], correctAnswer: "Vorstellen" },
    { question: "What does 'Langsam' mean in English?", options: ["Slowly", "More slowly", "To introduce", "Country"], correctAnswer: "Slowly" },
    { question: "What is 'Ein bisschen' in English?", options: ["A little bit", "People", "Handtowel", "Phone number"], correctAnswer: "A little bit" },
    { question: "Which word means 'to write' in German?", options: ["Schreiben", "Geschrieben", "Gesprach", "Horen"], correctAnswer: "Schreiben" },
    { question: "What does 'Getrennt' mean in English?", options: ["Separate", "Together", "Formally", "Loud"], correctAnswer: "Separate" },
    { question: "What is 'Kommen' in English?", options: ["To come", "To stay", "To learn", "To pay"], correctAnswer: "To come" },
    { question: "Which word means 'loud' in German?", options: ["Laut", "Leise", "Formell", "Wohnen"], correctAnswer: "Laut" },
    { question: "What does 'Handynummer' mean in English?", options: ["Phone number", "Handy", "Suitcase", "Text"], correctAnswer: "Phone number" },
    { question: "What is 'Autobahn' in English?", options: ["Highway", "Kindergarten", "Country", "Handtowel"], correctAnswer: "Highway" },
    { question: "Which word means 'different' in German?", options: ["Anders", "Ander", "Nudeln", "Wasserflasche"], correctAnswer: "Anders" },
    { question: "What does 'Reisefuhrerin' mean in English?", options: ["Tourist guide", "Conversation", "Suitcase", "Bottle"], correctAnswer: "Tourist guide" },
    { question: "What is 'Zuordnen' in English?", options: ["To match", "To count", "To collect", "To listen"], correctAnswer: "To match" },
    { question: "Which word means 'to listen' in German?", options: ["Zuhoren", "Horen", "Sammeln", "Machen"], correctAnswer: "Zuhoren" },
    { question: "What does 'Zahlen' mean in English?", options: ["To pay", "To count", "To know", "To have"], correctAnswer: "To pay" },
    { question: "What is the German word for 'to count'?", options: ["Zahlen", "Sammeln", "Reisefuhrerin", "Sprechen"], correctAnswer: "Zahlen" },
    { question: "Which word means 'to come from' in German?", options: ["Kommen + aus", "Wohnen + in", "Lernen", "Verstehen"], correctAnswer: "Kommen + aus" },
    { question: "What does 'Machen' mean in English?", options: ["To do", "To play", "To collect", "To write"], correctAnswer: "To do" },
    { question: "What is the German word for 'unknown'?", options: ["Unbekannt", "Bekannt", "Gesprach", "Anders"], correctAnswer: "Unbekannt" },
    { question: "Which word means 'a little bit' in German?", options: ["Ein bisschen", "Langsam", "Verstehen", "Wohnen"], correctAnswer: "Ein bisschen" },
    { question: "What does 'Sprechen' mean in English?", options: ["To speak", "To stay", "To learn", "To greet"], correctAnswer: "To speak" },
    { question: "What is the German word for 'to stay'?", options: ["Wohnen", "Leben", "Kommen", "Lernen"], correctAnswer: "Wohnen" },
    { question: "Which word means 'to understand' in German?", options: ["Verstehen", "Lernen", "Frage", "Antwort"], correctAnswer: "Verstehen" },
    { question: "What does 'Noch einmal' mean in English?", options: ["Once again", "More slowly", "Formal", "To come"], correctAnswer: "Once again" },
    { question: "What is 'Ankreuzen' in English?", options: ["To cross out", "To match", "To pay", "To speak"], correctAnswer: "To cross out" },
    { question: "Which word means 'to arrange' in German?", options: ["Ordnen", "Zusammen", "Getrennt", "Ein bisschen"], correctAnswer: "Ordnen" },
    { question: "What does 'Mehrere' mean in English?", options: ["Various", "Few", "Separate", "Different"], correctAnswer: "Various" },
    { question: "What is the German word for 'phone'?", options: ["Handy", "Flasche", "Koffer", "Kindergarten"], correctAnswer: "Handy" },
    { question: "What does 'Laut' mean in English?", options: ["Loud", "Soft", "Slowly", "Formal"], correctAnswer: "Loud" },
    { question: "Which word means 'to write' in German?", options: ["Schreiben", "Gesprach", "Zahlen", "Kommen"], correctAnswer: "Schreiben" },
    { question: "What is 'Text' in English?", options: ["Text", "Country", "People", "Conversation"], correctAnswer: "Text" },
    { question: "What does 'Leute' mean in English?", options: ["People", "Text", "Sentence", "Question"], correctAnswer: "People" },
    { question: "What is the German word for 'to come'?", options: ["Kommen", "Wohnen", "Lernen", "Verstehen"], correctAnswer: "Kommen" },
    { question: "What does 'Handtuch' mean in English?", options: ["Handtowel", "Bottle", "Suitcase", "Sick person"], correctAnswer: "Handtowel" },
    { question: "Which word means 'to pay' in German?", options: ["Zahlen", "Sammeln", "Horen", "Kommen"], correctAnswer: "Zahlen" },
    { question: "What is 'Satz' in English?", options: ["Sentence", "Conversation", "Text", "Answer"], correctAnswer: "Sentence" },
    { question: "What does 'Kennen' mean in English?", options: ["To know", "To stay", "To come", "To do"], correctAnswer: "To know" },
    { question: "What is the German word for 'to play'?", options: ["Spielen", "Machen", "Sammeln", "Haben"], correctAnswer: "Spielen" },
    { question: "What does 'Gesprach' mean in English?", options: ["Conversation", "Question", "Answer", "Text"], correctAnswer: "Conversation" },
    { question: "What is 'Kommen + aus' in English?", options: ["To come from", "To stay", "To learn", "To play"], correctAnswer: "To come from" },
    { question: "Which word means 'to greet' in German?", options: ["Grüßen", "Verabschieden", "Haben", "Lernen"], correctAnswer: "Grüßen" },
    { question: "What is 'Sagen' in English?", options: ["To say", "To write", "To play", "To learn"], correctAnswer: "To say" },
    { question: "What does 'Horen' mean in English?", options: ["To hear", "To listen", "To play", "To stay"], correctAnswer: "To hear" },
    { question: "What is 'Reisefuhrerin' in English?", options: ["Tourist guide", "Country", "Text", "Sentence"], correctAnswer: "Tourist guide" },
    { question: "Which word means 'to do' in German?", options: ["Machen", "Sammeln", "Sagen", "Haben"], correctAnswer: "Machen" },
    { question: "What does 'Wohnen + in' mean in English?", options: ["To stay in", "To come from", "To pay", "To match"], correctAnswer: "To stay in" },
    { question: "What is 'Unbekannt' in English?", options: ["Unknown", "Known", "Formal", "Separate"], correctAnswer: "Unknown" },
    { question: "Which word means 'to match' in German?", options: ["Zuordnen", "Sammeln", "Machen", "Sprechen"], correctAnswer: "Zuordnen" },
    { question: "What is 'Formell' in English?", options: ["Formal", "Informal", "Different", "Loud"], correctAnswer: "Formal" },
    { question: "What does 'Anders' mean in English?", options: ["Different", "Same", "Formal", "Loud"], correctAnswer: "Different" },
    { question: "What is 'Zahlen' in English?", options: ["To pay", "To count", "To know", "To learn"], correctAnswer: "To pay" },
    { question: "Which word means 'sick person' in German?", options: ["Kranke", "Flasche", "Koffer", "Nudeln"], correctAnswer: "Kranke" },
    { question: "What is 'Flasche' in English?", options: ["Bottle", "Handtowel", "Suitcase", "Water bottle"], correctAnswer: "Bottle" },
    { question: "What does 'Machen' mean in English?", options: ["To do", "To play", "To speak", "To collect"], correctAnswer: "To do" },
    { question: "Which word means 'to learn' in German?", options: ["Lernen", "Spielen", "Horen", "Kommen"], correctAnswer: "Lernen" },
    { question: "What is 'Handy' in English?", options: ["Phone", "Phone number", "Suitcase", "Conversation"], correctAnswer: "Phone" },
    { question: "What does 'Gesprach' mean in English?", options: ["Conversation", "Sentence", "Question", "Text"], correctAnswer: "Conversation" },
    { question: "Which word means 'to play' in German?", options: ["Spielen", "Sammeln", "Zahlen", "Lernen"], correctAnswer: "Spielen" },
    { question: "What is 'Wohnen' in English?", options: ["To stay", "To come", "To have", "To know"], correctAnswer: "To stay" },
    { question: "What does 'Laut' mean in English?", options: ["Loud", "Soft", "Slowly", "Formal"], correctAnswer: "Loud" },
    { question: "Which word means 'to match' in German?", options: ["Zuordnen", "Horen", "Sammeln", "Lernen"], correctAnswer: "Zuordnen" },
    { question: "What is 'Frage' in English?", options: ["Question", "Answer", "Conversation", "Sentence"], correctAnswer: "Question" },
    { question: "What does 'Leute' mean in English?", options: ["People", "Country", "Text", "Answer"], correctAnswer: "People" },
    { question: "Which word means 'to come' in German?", options: ["Kommen", "Horen", "Lernen", "Sprechen"], correctAnswer: "Kommen" },
    { question: "What is 'Ein bisschen' in English?", options: ["A little bit", "A lot", "Different", "Known"], correctAnswer: "A little bit" },
    { question: "What does 'Getrennt' mean in English?", options: ["Separate", "Together", "Different", "Known"], correctAnswer: "Separate" },
    { question: "What is 'Lernen' in English?", options: ["To learn", "To know", "To play", "To count"], correctAnswer: "To learn" },
    { question: "What does 'Sprechen' mean in English?", options: ["To speak", "To come", "To stay", "To do"], correctAnswer: "To speak" },
    { question: "Which word means 'to come from' in German?", options: ["Kommen + aus", "Wohnen + in", "Zahlen", "Horen"], correctAnswer: "Kommen + aus" },
    { question: "What is 'Satz' in English?", options: ["Sentence", "Conversation", "Question", "Answer"], correctAnswer: "Sentence" },
    { question: "What does 'Machen' mean in English?", options: ["To do", "To play", "To learn", "To speak"], correctAnswer: "To do" },
    { question: "What is 'Zahlen' in English?", options: ["To pay", "To count", "To listen", "To speak"], correctAnswer: "To pay" },
    { question: "Which word means 'to introduce' in German?", options: ["Vorstellen", "Kommen", "Machen", "Sprechen"], correctAnswer: "Vorstellen" },
    { question: "What is 'Formell' in English?", options: ["Formal", "Informal", "Loud", "Soft"], correctAnswer: "Formal" },
    { question: "What does 'Laut' mean in English?", options: ["Loud", "Soft", "Formal", "Different"], correctAnswer: "Loud" },
    { question: "Which word means 'sick person' in German?", options: ["Kranke", "Nudeln", "Koffer", "Wasserflasche"], correctAnswer: "Kranke" },
    { question: "What is 'Zahlen' in English?", options: ["To pay", "To count", "To learn", "To understand"], correctAnswer: "To pay" },
    { question: "What does 'Gesprach' mean in English?", options: ["Conversation", "Sentence", "Question", "Answer"], correctAnswer: "Conversation" },
    { question: "What is 'Wohnen + in' in English?", options: ["To stay in", "To come from", "To learn", "To know"], correctAnswer: "To stay in" },
    { question: "Which word means 'to know' in German?", options: ["Kennen", "Sammeln", "Machen", "Spielen"], correctAnswer: "Kennen" },
    { question: "What does 'Ein bisschen' mean in English?", options: ["A little bit", "A lot", "Few", "Many"], correctAnswer: "A little bit" },
    { question: "What is 'Formell' in English?", options: ["Formal", "Informal", "Loud", "Soft"], correctAnswer: "Formal" },
    { question: "Which word means 'to come from' in German?", options: ["Kommen + aus", "Wohnen + in", "Spielen", "Lernen"], correctAnswer: "Kommen + aus" },
    { question: "What is 'Unbekannt' in English?", options: ["Unknown", "Known", "Formal", "Separate"], correctAnswer: "Unknown" },
    { question: "What does 'Zusammen' mean in English?", options: ["Together", "Separate", "Different", "Few"], correctAnswer: "Together" },
    { question: "What is 'Kommen' in English?", options: ["To come", "To stay", "To learn", "To count"], correctAnswer: "To come" },
    { question: "Which word means 'phone number' in German?", options: ["Handynummer", "Handy", "Koffer", "Nudeln"], correctAnswer: "Handynummer" },
    { question: "What is 'Reisefuhrerin' in English?", options: ["Tourist guide", "Conversation", "Text", "Country"], correctAnswer: "Tourist guide" },
    { question: "What does 'Laut' mean in English?", options: ["Loud", "Soft", "Formal", "Different"], correctAnswer: "Loud" },
    { question: "Which word means 'to write' in German?", options: ["Schreiben", "Sagen", "Kommen", "Lernen"], correctAnswer: "Schreiben" },
    { question: "What is 'Formell' in English?", options: ["Formal", "Informal", "Different", "Few"], correctAnswer: "Formal" },
    { question: "What does 'Grüßen' mean in English?", options: ["To greet", "To stay", "To come", "To pay"], correctAnswer: "To greet" },
    { question: "What is 'Kommen + aus' in English?", options: ["To come from", "To stay in", "To play", "To learn"], correctAnswer: "To come from" },
    { question: "Which word means 'sick person' in German?", options: ["Kranke", "Wasserflasche", "Handtuch", "Flasche"], correctAnswer: "Kranke" },
    { question: "What does 'Satz' mean in English?", options: ["Sentence", "Conversation", "Answer", "Question"], correctAnswer: "Sentence" },
    { question: "What is 'Zusammen' in English?", options: ["Together", "Separate", "Few", "Different"], correctAnswer: "Together" },
    { question: "Which word means 'to speak' in German?", options: ["Sprechen", "Horen", "Sammeln", "Kommen"], correctAnswer: "Sprechen" },
    { question: "What does 'Leute' mean in English?", options: ["People", "Country", "Text", "Situation"], correctAnswer: "People" },
    { question: "What is 'Wohnen' in English?", options: ["To stay", "To learn", "To play", "To come"], correctAnswer: "To stay" },
    { question: "What does 'Machen' mean in English?", options: ["To do", "To say", "To listen", "To count"], correctAnswer: "To do" },
    { question: "What is 'Laut' in English?", options: ["Loud", "Soft", "Different", "Together"], correctAnswer: "Loud" },
    { question: "What does 'Sagen' mean in English?", options: ["To say", "To write", "To learn", "To play"], correctAnswer: "To say" },
    { question: "Which word means 'to count' in German?", options: ["Zahlen", "Horen", "Sprechen", "Spielen"], correctAnswer: "Zahlen" },
    { question: "What is 'Kennen' in English?", options: ["To know", "To stay", "To play", "To do"], correctAnswer: "To know" },
    { question: "What does 'Gesprach' mean in English?", options: ["Conversation", "Question", "Sentence", "Text"], correctAnswer: "Conversation" },
    { question: "Which word means 'to listen' in German?", options: ["Zuhoren", "Horen", "Sammeln", "Kommen"], correctAnswer: "Zuhoren" },
    { question: "What is 'Sammeln' in English?", options: ["To collect", "To do", "To speak", "To learn"], correctAnswer: "To collect" },
    { question: "What does 'Ein bisschen' mean in English?", options: ["A little bit", "A lot", "Few", "Many"], correctAnswer: "A little bit" },
    { question: "Which word means 'different' in German?", options: ["Anders", "Ander", "Nudeln", "Koffer"], correctAnswer: "Anders" },
    { question: "What is 'Formell' in English?", options: ["Formal", "Informal", "Loud", "Soft"], correctAnswer: "Formal" },
    { question: "What does 'Wohnen' mean in English?", options: ["To stay", "To come", "To play", "To learn"], correctAnswer: "To stay" },
    { question: "Which word means 'to play' in German?", options: ["Spielen", "Machen", "Sammeln", "Kommen"], correctAnswer: "Spielen" },
    { question: "What is 'Laut' in English?", options: ["Loud", "Soft", "Formal", "Different"], correctAnswer: "Loud" },
    { question: "What does 'Machen' mean in English?", options: ["To do", "To learn", "To pay", "To understand"], correctAnswer: "To do" },
    { question: "Which word means 'to speak' in German?", options: ["Sprechen", "Horen", "Machen", "Lernen"], correctAnswer: "Sprechen" },
    { question: "What is 'Unbekannt' in English?", options: ["Unknown", "Known", "Formal", "Different"], correctAnswer: "Unknown" },
    { question: "What does 'Leute' mean in English?", options: ["People", "Text", "Sentence", "Answer"], correctAnswer: "People" },
    { question: "Which word means 'to stay' in German?", options: ["Wohnen", "Kommen", "Lernen", "Sprechen"], correctAnswer: "Wohnen" },
    { question: "What is 'Kommen' in English?", options: ["To come", "To stay", "To pay", "To learn"], correctAnswer: "To come" },
    { question: "What does 'Horen' mean in English?", options: ["To hear", "To listen", "To speak", "To count"], correctAnswer: "To hear" },
    { question: "What is 'Satz' in English?", options: ["Sentence", "Conversation", "Question", "Answer"], correctAnswer: "Sentence" },
    { question: "What does 'Zusammen' mean in English?", options: ["Together", "Separate", "Few", "Many"], correctAnswer: "Together" },
    { question: "Which word means 'to pay' in German?", options: ["Zahlen", "Sammeln", "Machen", "Lernen"], correctAnswer: "Zahlen" },
    { question: "What is 'Handy' in English?", options: ["Phone", "Suitcase", "Text", "Conversation"], correctAnswer: "Phone" },
    { question: "What does 'Kennen' mean in English?", options: ["To know", "To come", "To play", "To stay"], correctAnswer: "To know" },
    { question: "Which word means 'to arrange' in German?", options: ["Ordnen", "Machen", "Sammeln", "Kommen"], correctAnswer: "Ordnen" },
    { question: "What is 'Grüßen' in English?", options: ["To greet", "To stay", "To learn", "To play"], correctAnswer: "To greet" },
    { question: "What does 'Sammeln' mean in English?", options: ["To collect", "To do", "To play", "To learn"], correctAnswer: "To collect" },
    { question: "Which word means 'to match' in German?", options: ["Zuordnen", "Horen", "Sammeln", "Lernen"], correctAnswer: "Zuordnen" },
    { question: "What is 'Sprechen' in English?", options: ["To speak", "To come", "To stay", "To pay"], correctAnswer: "To speak" },
    { question: "What does 'Horen' mean in English?", options: ["To hear", "To listen", "To pay", "To play"], correctAnswer: "To hear" },
    { question: "Which word means 'to write' in German?", options: ["Schreiben", "Horen", "Machen", "Kommen"], correctAnswer: "Schreiben" },
    { question: "What is 'Lernen' in English?", options: ["To learn", "To play", "To come", "To stay"], correctAnswer: "To learn" },
    { question: "What does 'Zahlen' mean in English?", options: ["To pay", "To count", "To hear", "To do"], correctAnswer: "To pay" },
    { question: "Which word means 'to come' in German?", options: ["Kommen", "Sammeln", "Lernen", "Wohnen"], correctAnswer: "Kommen" },
    { question: "What is 'Ein bisschen' in English?", options: ["A little bit", "A lot", "Few", "None"], correctAnswer: "A little bit" },
    { question: "What does 'Ordnen' mean in English?", options: ["To arrange", "To pay", "To match", "To speak"], correctAnswer: "To arrange" },
    { question: "Which word means 'to understand' in German?", options: ["Verstehen", "Lernen", "Kommen", "Horen"], correctAnswer: "Verstehen" },
    { question: "What is 'Horen' in English?", options: ["To hear", "To listen", "To speak", "To come"], correctAnswer: "To hear" },
    { question: "What does 'Zusammen' mean in English?", options: ["Together", "Separate", "Few", "Different"], correctAnswer: "Together" },
    { question: "Which word means 'to play' in German?", options: ["Spielen", "Machen", "Kommen", "Lernen"], correctAnswer: "Spielen" },
    { question: "What is 'Sammeln' in English?", options: ["To collect", "To pay", "To do", "To write"], correctAnswer: "To collect" },
    { question: "What does 'Wohnen' mean in English?", options: ["To stay", "To come", "To do", "To learn"], correctAnswer: "To stay" },
    { question: "Which word means 'to say' in German?", options: ["Sagen", "Kommen", "Sammeln", "Horen"], correctAnswer: "Sagen" },
    { question: "What is 'Satz' in English?", options: ["Sentence", "Text", "Question", "Answer"], correctAnswer: "Sentence" },
    { question: "What does 'Kommen' mean in English?", options: ["To come", "To stay", "To play", "To learn"], correctAnswer: "To come" },
    { question: "Which word means 'to listen' in German?", options: ["Zuhoren", "Horen", "Kommen", "Sprechen"], correctAnswer: "Zuhoren" },
    { question: "What is 'Machen' in English?", options: ["To do", "To say", "To listen", "To play"], correctAnswer: "To do" },
    { question: "What does 'Grüßen' mean in English?", options: ["To greet", "To play", "To stay", "To do"], correctAnswer: "To greet" },
    { question: "Which word means 'to learn' in German?", options: ["Lernen", "Sammeln", "Kommen", "Horen"], correctAnswer: "Lernen" },
    { question: "What is 'Ein bisschen' in English?", options: ["A little bit", "A lot", "Different", "Few"], correctAnswer: "A little bit" },
    { question: "What does 'Kommen' mean in English?", options: ["To come", "To stay", "To know", "To do"], correctAnswer: "To come" },
    { question: "Which word means 'to come' in German?", options: ["Kommen", "Sammeln", "Horen", "Spielen"], correctAnswer: "Kommen" },
    { question: "What is 'Unbekannt' in English?", options: ["Unknown", "Known", "Formal", "Different"], correctAnswer: "Unknown" },
    { question: "What does 'Satz' mean in English?", options: ["Sentence", "Conversation", "Question", "Answer"], correctAnswer: "Sentence" },
    { question: "Which word means 'to speak' in German?", options: ["Sprechen", "Horen", "Kommen", "Spielen"], correctAnswer: "Sprechen" },
    { question: "What is 'Gesprach' in English?", options: ["Conversation", "Text", "Answer", "Sentence"], correctAnswer: "Conversation" },
    { question: "What does 'Sprechen' mean in English?", options: ["To speak", "To come", "To stay", "To count"], correctAnswer: "To speak" },
    { question: "Which word means 'to come from' in German?", options: ["Kommen + aus", "Wohnen + in", "Zahlen", "Machen"], correctAnswer: "Kommen + aus" },
    { question: "What is 'Horen' in English?", options: ["To hear", "To listen", "To pay", "To play"], correctAnswer: "To hear" },
    { question: "Which word means 'to match' in German?", options: ["Zuordnen", "Sammeln", "Horen", "Lernen"], correctAnswer: "Zuordnen" },
    { question: "What is 'Zusammen' in English?", options: ["Together", "Separate", "Few", "Known"], correctAnswer: "Together" },
    { question: "What does 'Leute' mean in English?", options: ["People", "Country", "Conversation", "Answer"], correctAnswer: "People" },
    { question: "Which word means 'to pay' in German?", options: ["Zahlen", "Sammeln", "Sprechen", "Kommen"], correctAnswer: "Zahlen" },
    { question: "What is 'Sammeln' in English?", options: ["To collect", "To count", "To play", "To learn"], correctAnswer: "To collect" },
    { question: "What does 'Lernen' mean in English?", options: ["To learn", "To know", "To come", "To do"], correctAnswer: "To learn" },
    { question: "Which word means 'to stay' in German?", options: ["Wohnen", "Sammeln", "Lernen", "Horen"], correctAnswer: "Wohnen" },
    { question: "What is 'Handy' in English?", options: ["Phone", "Suitcase", "Text", "Conversation"], correctAnswer: "Phone" },
    { question: "What does 'Grüßen' mean in English?", options: ["To greet", "To stay", "To learn", "To play"], correctAnswer: "To greet" },
    { question: "Which word means 'sick person' in German?", options: ["Kranke", "Wasserflasche", "Handtuch", "Flasche"], correctAnswer: "Kranke" },
    { question: "What is 'Formell' in English?", options: ["Formal", "Informal", "Loud", "Soft"], correctAnswer: "Formal" }

];

let selectedQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timerInterval;

document.getElementById('startQuiz').addEventListener('click', startQuiz);

function startQuiz() {
    const username = document.getElementById('username').value;
    const selectedChapter = document.getElementById('chapter').value;
    if (!username) {
        alert("Please enter your name");
        return;
    }

    document.getElementById('homePage').style.display = 'none';
    document.getElementById('quizPage').style.display = 'block';

    if (selectedChapter == '1') {
        selectedQuestions = shuffle(chapter1Questions).slice(0, 10);
    }
    // Add similar blocks for other chapters

    showQuestion();
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function showQuestion() {
    if (currentQuestionIndex >= selectedQuestions.length) {
        showResults();
        return;
    }

    const question = selectedQuestions[currentQuestionIndex];
    const questionContainer = document.getElementById('questionContainer');
    const shuffledOptions = shuffle([...question.options]); // Shuffle options

    questionContainer.innerHTML = `
        <div class="question">Question ${currentQuestionIndex + 1}: <strong>${question.question}</strong></div>
        ${shuffledOptions.map(option => `
            <div class="option">
                <button type="button" onclick="selectOption('${option}')">${option}</button>
            </div>
        `).join('')}
    `;

    document.getElementById('submitBtn').disabled = true;
    startTimer();
}

function startTimer() {
    let timeLeft = 10;
    document.getElementById('timer').textContent = `Time left: ${timeLeft} seconds`;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `Time left: ${timeLeft} seconds`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleAnswer();
        }
    }, 1000);
}

function selectOption(selectedOption) {
    const buttons = document.querySelectorAll('.option button');
    buttons.forEach(button => {
        button.disabled = true;
        if (button.textContent === selectedOption) {
            if (selectedOption === selectedQuestions[currentQuestionIndex].correctAnswer) {
                button.classList.add('correct');
                score++;
            } else {
                button.classList.add('incorrect');
            }
        } else if (button.textContent === selectedQuestions[currentQuestionIndex].correctAnswer) {
            button.classList.add('correct');
        }
    });

    document.getElementById('submitBtn').disabled = false;
}

document.getElementById('submitBtn').addEventListener('click', () => {
    clearInterval(timerInterval);
    handleAnswer();
});

function handleAnswer() {
    if (currentQuestionIndex < selectedQuestions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('quizPage').style.display = 'none';
    document.getElementById('result').style.display = 'block';

    let resultMessage;
    if (score < 3) {
        resultMessage = "Mhnat kr";
    } else if (score >= 3 && score <= 6) {
        resultMessage = "Thik h bss";
    } else if (score >= 7) {
        resultMessage = "Aacha kr rha hai";
    }

    document.getElementById('score').innerHTML = `Your score: ${score} / 10<br>${resultMessage}`;
}

document.getElementById('restartBtn').addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('result').style.display = 'none';
    document.getElementById('homePage').style.display = 'block';
});

document.getElementById('homeBtn').addEventListener('click', () => {
    document.getElementById('result').style.display = 'none';
    document.getElementById('homePage').style.display = 'block';
});
