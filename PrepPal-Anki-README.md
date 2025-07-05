
# 📚 PrepPal to Anki Integration — README

This document explains how the **“Export to Anki”** feature works in PrepPal, along with potential future improvements.

---

## 🔗 Current Flow: Exporting Flashcards to Anki

Our goal is to allow PrepPal users to easily study their AI-generated flashcards using **Anki**, a popular spaced repetition tool.

### How It Works:

1. ✅ **User generates flashcards** in **PrepPal** (e.g., a set of 10 cards based on their PDF).
2. 📥 User clicks the **“Export to Anki”** button.
3. 💾 PrepPal automatically generates and downloads a **CSV file** containing the flashcards in this format:

```
Front,Back
"What is photosynthesis?", "Photosynthesis is the process by which plants convert sunlight into energy."
"Define mitosis.", "Mitosis is cell division resulting in two identical daughter cells."
```

4. 📂 The user **opens the Anki app** on their device.
5. 🔄 In Anki, they go to **File → Import**, select the downloaded CSV file, and choose (or create) a deck.
6. 🎉 Flashcards are now imported into Anki and ready to study using its powerful **spaced repetition algorithm**.

---

## 💡 Why We’re Using CSV Format:

- CSV is **simple**, **universal**, and **Anki supports direct import** from CSV.
- No need for the user to install additional tools or plugins.
- Works across all devices where Anki is available.

---

## 🚀 Future Ideas for “Export to Anki”

To improve the user experience and reduce manual steps, we could explore:

### 1. **Anki Deck File Export (.apkg)**
- Generate **.apkg** files (Anki’s native deck format) instead of CSV.
- Users could directly import ready-made Anki decks without formatting issues.
- Tools like [genanki](https://github.com/kerrickstaley/genanki) in Python can help us build these files on the backend.

### 2. **Direct Sync with Anki (AnkiConnect)**
- For power users, we could allow **1-click sync** directly from PrepPal into Anki using the **AnkiConnect API** (requires Anki + AnkiConnect plugin installed locally).
- This would eliminate the need to download and manually import files.
- This approach is more technical and better suited for advanced users (e.g., med school students, language learners).

---

## 📌 Next Steps for Implementation:

✅ Build the **CSV export function** (Node/Express ready).  
✅ Add **clear UI messaging** explaining how users can import into Anki.  
✅ Test with real users to check if CSV is enough or if demand exists for deeper integration.
