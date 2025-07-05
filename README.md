
Here's a concise explanation you can paste into your README file for your teammates, outlining the estimated generation capabilities within a 20,000-token budget:

---

### AI Content Generation Estimates (20,000 Token Budget)

This document outlines the approximate number of content pieces that can be generated from PDF files using our AI system, based on a 20,000-token budget. These are estimates, and actual token usage can vary slightly depending on the specific content density of the PDFs and the exact nature of the AI's output.

**General Assumptions:**
* **PDF Page Content:** A typical single-spaced PDF page is estimated to be 400-500 words, translating to roughly 500-700 tokens for AI input.
* **Flashcard/Quiz Item Length:** Individual flashcards or quiz questions (including options and correct answers) are estimated to be 20-50 tokens each.
* **Summaries:** Summaries are generally 10-20% of the original content's length.

---

#### **1. Summarizing PDF Pages**

With a 20,000-token budget, the AI can summarize approximately:

* **27 to 30 pages** of PDF content.
    * *(This assumes generating concise summaries, around 10-20% of the original text length.)*

---

#### **2. Generating Flashcards from a 10-Page PDF**

When generating flashcards from a single 10-page PDF, a significant portion of the budget goes towards the AI reading the entire document (approx. 5,000-7,000 tokens). The remaining tokens are used for the flashcard output.

From **one 10-page PDF**, within a 20,000-token budget, you could generate approximately:

* **260 to 1,300 flashcards.**
    * *(The number varies greatly depending on the desired conciseness/detail of each flashcard. A higher number implies very brief Q&A pairs.)*

---

#### **3. Generating 15-Question Multi-Choice Quizzes from 10-Page PDFs**

If each 15-question quiz is generated from a *different* 10-page PDF (meaning the AI re-reads a new 10-page document for each quiz), a 20,000-token budget allows for approximately:

* **2 full 15-question multi-choice quizzes.**
    * *(Each such quiz, including input and output, costs around 7,750 tokens.)*

---

**Important Note on Token Usage:**

The primary driver of token cost is the **size of the input PDF document**. The AI must process the entire document to extract relevant information, even if the final output (summary, flashcard, quiz) is relatively short. If you generate multiple items from the *same* large PDF, the input cost for reading the PDF might only be incurred once, making subsequent generations from that document much more token-efficient.

---

Here's an updated version for your README file, explaining the estimated generation capabilities with a **1,000,000 token budget**:

---

### AI Content Generation Estimates (1,000,000 Token Budget)

This document outlines the approximate number of content pieces that can be generated from PDF files using our AI system, based on a **1,000,000-token budget**. These are estimates, and actual token usage can vary slightly depending on the specific content density of the PDFs and the exact nature of the AI's output.

**General Assumptions:**
* **PDF Page Content:** A typical single-spaced PDF page is estimated to be 400-500 words, translating to roughly 500-700 tokens for AI input.
* **Flashcard/Quiz Item Length:** Individual flashcards or quiz questions (including options and correct answers) are estimated to be 20-50 tokens each.
* **Summaries:** Summaries are generally 10-20% of the original content's length.

---

#### **1. Summarizing PDF Pages**

With a 1,000,000-token budget, the AI can summarize approximately:

* **1,364 to 1,365 pages** of PDF content.
    * *(This assumes generating concise summaries, around 10-20% of the original text length. Each 1-page summary costs approximately 733 tokens.)*

---

#### **2. Generating Flashcards from PDF Pages**

When generating flashcards, a significant portion of the budget goes towards the AI reading the source document.

* **From 1-Page PDFs (generating 1 flashcard per page):**
    * You could generate approximately **1,333 individual flashcards**, each sourced from a different 1-page PDF.
        * *(Each such generation costs around 750 tokens.)*

* **From 10-Page PDFs (generating a set of 10 flashcards per 10-page PDF):**
    * You could generate approximately **139 to 140 sets of 10 flashcards**, with each set sourced from a different 10-page PDF.
        * *(Each set (10 flashcards from 10 pages) costs around 7,167 tokens.)*

---

#### **3. Generating Multi-Choice Quizzes from PDF Pages**

Similar to flashcards, the primary cost for quizzes comes from the AI reading the source PDF.

* **15-Question Quizzes from 1-Page PDFs:**
    * You could generate approximately **689 to 690 15-question multi-choice quizzes**, with each quiz sourced from a different 1-page PDF.
        * *(Each 15-question quiz from a 1-page PDF costs around 1,450 tokens.)*

* **15-Question Quizzes from 10-Page PDFs:**
    * You could generate approximately **129 15-question multi-choice quizzes**, with each quiz sourced from a different 10-page PDF.
        * *(Each 15-question quiz from a 10-page PDF costs around 7,750 tokens.)*

---

**Important Note on Token Usage:**

The primary driver of token cost is the **size of the input PDF document**. The AI must process the entire document to extract relevant information, even if the final output (summary, flashcard, quiz) is relatively short. If you generate multiple items from the *same* large PDF, the input cost for reading the PDF might only be incurred once, making subsequent generations from that document much more token-efficient.

---
