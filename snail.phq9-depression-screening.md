# Building a PHQ-9 Depression Screening App: A Snail-Pace Tutorial

## The Big Picture

This is a medical questionnaire app that helps people understand their depression level. It asks 9 simple questions, scores your answers from 0 to 27, and tells you if your symptoms are minimal, mild, moderate, or severe.

Think of it like a thermometer for your mood: you answer the questions (like taking your temperature), and the app gives you a reading (the score) that helps you understand how you're feeling.

## How It Works at a High Level

```
User opens app → Sees 9 questions → Answers each one → Clicks "Submit"
     ↓
App calculates score (0-27) → Shows severity level → User can retake or clear
```

The app remembers your answers even if you close the browser. It supports four languages: Thai, Burmese, Khmer, and English.

## Key Components

Here's what makes up this app:

```
depression6/
├── src/
│   ├── App.jsx              ← The main brain of the app
│   ├── App.module.css       ← Main styling
│   ├── lib/
│   │   ├── utils.js         ← Score calculation logic
│   │   └── translations.js  ← All text in 4 languages
│   ├── components/
│   │   ├── ui/              ← Reusable building blocks (buttons, cards)
│   │   └── language-switcher.jsx  ← Language selection buttons
│   └── main.jsx             ← Entry point that starts everything
├── index.html               ← The page shell
└── package.json             ← Lists all dependencies
```

Now let's build this step by step, adding one tiny piece at a time.

---

## Step 1: Create the Empty Shell

We start with absolutely nothing but an empty component that returns a blank screen. This is our foundation — like pouring concrete for a building before we add walls or windows.

**File:** `src/App.jsx`

```jsx
export default function App() {
  return (
    <div></div>
  );
}
```

What's happening here:
- `export default function App()` — We're creating a named component called "App" and making it available to other files. Think of this as labeling a box so we can find it later.
- `return (...)` — Every React component must return something to show on the screen. Right now, it's an empty `<div>` tag — just a blank container with nothing inside it.

At this point, if you run the app, you'll see... nothing. Just a white page. That's okay! We're building from scratch.

---

## Step 2: Add the Page Structure

Now let's give our empty div some structure. We'll wrap everything in a container that will hold all our content.

**File:** `src/App.jsx`

```jsx
export default function App() {
  return (
    <div className="app">
      <div className="container"></div>
    </div>
  );
}
```

What changed:
- We added a class name "app" to the outer div. This is like putting an address label on it so our CSS styles can find it and dress it up later.
- Inside, we created another div with class "container". This will be where all the questionnaire content lives — like a box inside a box.

Think of this like setting up rooms in a house: the outer div is the building itself, and the inner container is the main room where people will sit and answer questions.

---

## Step 3: Add the Questionnaire Title

Let's add some text so users know what they're looking at. We'll use a heading element for the title.

**File:** `src/App.jsx`

```jsx
export default function App() {
  return (
    <div className="app">
      <div className="container">
        <h1>PHQ-9 Depression Screening</h1>
      </div>
    </div>
  );
}
```

What changed:
- We added an `<h1>` tag inside the container. The "h1" means "heading level 1" — it's the biggest, most important heading on the page.
- The text "PHQ-9 Depression Screening" tells users exactly what this tool is for.

Now when you look at the app, you'll see big bold text at the top saying what the questionnaire is called. It's like putting a sign above the door of our building so people know where they are.

---

## Step 4: Add the Description Text

Below the title, we need to explain to users how to use this tool. We'll add descriptive text that tells them what to expect.

**File:** `src/App.jsx`

```jsx
export default function App() {
  return (
    <div className="app">
      <div className="container">
        <h1>PHQ-9 Depression Screening</h1>
        <p>Over the last 2 weeks, how often have you been bothered by any of the following problems?</p>
      </div>
    </div>
  );
}
```

What changed:
- We added a `<p>` tag (paragraph) below the heading. This contains instructions for the user.
- The text explains that they should think about how they've felt over the past two weeks — this is important because depression screening looks at recent patterns, not just today's mood.

Think of this like a waiter explaining the menu before you order: it sets expectations and helps people understand what they're doing.

---

## Step 5: Create the First Question

Now we'll add our first actual question from the PHQ-9 questionnaire. This is where the real work begins!

**File:** `src/App.jsx`

```jsx
export default function App() {
  return (
    <div className="app">
      <div className="container">
        <h1>PHQ-9 Depression Screening</h1>
        <p>Over the last 2 weeks, how often have you been bothered by any of the following problems?</p>

        <div className="question-card">
          <p>1. Little interest or pleasure in doing things</p>
        </div>
      </div>
    </div>
  );
}
```

What changed:
- We created a new div with class "question-card". This will hold one question and its answer options — like a flashcard you flip through.
- Inside, we have the first PHQ-9 question numbered as "1."

Each question in the PHQ-9 is presented this way: a number followed by the question text. We'll add more questions later, but for now, let's focus on making this one work perfectly before moving on.

---

## Step 6: Add Answer Options to the First Question

A question without answer choices isn't very useful! Let's add radio buttons so users can select how often they've experienced each symptom.

**File:** `src/App.jsx`

```jsx
export default function App() {
  return (
    <div className="app">
      <div className="container">
        <h1>PHQ-9 Depression Screening</h1>
        <p>Over the last 2 weeks, how often have you been bothered by any of the following problems?</p>

        <div className="question-card">
          <p>1. Little interest or pleasure in doing things</p>
          <label><input type="radio" name="q0" value="0" /> Not at all</label>
          <label><input type="radio" name="q0" value="1" /> Several days</label>
          <label><input type="radio" name="q0" value="2" /> More than half the days</label>
          <label><input type="radio" name="q0" value="3" /> Nearly every day</label>
        </div>
      </div>
    </div>
  );
}
```

What changed:
- We added four `<label>` elements, each containing a radio button and text.
- Each radio button has `name="q0"` — this groups them together so only one can be selected at a time (like choosing one flavor of ice cream).
- The values 0, 1, 2, 3 represent the severity scale: 0 = not at all, 3 = nearly every day.

The PHQ-9 uses this same four-point scale for all nine questions. By giving each option a numeric value, we can later add them up to calculate a total score.

---

## Step 7: Make It Interactive with State

Right now, clicking the radio buttons doesn't do anything — they just look selected but don't actually save the answer. Let's make it interactive using React's state!

**File:** `src/App.jsx`

```jsx
import { useState } from "react";

export default function App() {
  const [answers, setAnswers] = useState({});

  return (
    <div className="app">
      <div className="container">
        <h1>PHQ-9 Depression Screening</h1>
        <p>Over the last 2 weeks, how often have you been bothered by any of the following problems?</p>

        <div className="question-card">
          <p>1. Little interest or pleasure in doing things</p>
          <label><input type="radio" name="q0" value="0" checked={answers[0] === "0"} onChange={() => setAnswers({...answers, 0: "0"})} /> Not at all</label>
          <label><input type="radio" name="q0" value="1" checked={answers[0] === "1"} onChange={() => setAnswers({...answers, 0: "1"})} /> Several days</label>
          <label><input type="radio" name="q0" value="2" checked={answers[0] === "2"} onChange={() => setAnswers({...answers, 0: "2"})} /> More than half the days</label>
          <label><input type="radio" name="q0" value="3" checked={answers[0] === "3"} onChange={() => setAnswers({...answers, 0: "3"})} /> Nearly every day</label>
        </div>
      </div>
    </div>
  );
}
```

What changed (this is a big step, so let's break it down):

1. **`import { useState } from "react"`** — We're bringing in React's state tool. State is like memory for your component — it remembers things between user interactions.

2. **`const [answers, setAnswers] = useState({})`** — This creates our answers object (starts empty `{}`) and gives us a way to update it (`setAnswers`). Think of `answers` as a notebook where we write down each response.

3. **`checked={answers[0] === "0"}`** — This tells React whether this radio button should appear selected. It checks if our answers object has question 0 set to value "0". If yes, the button appears checked; if no, it doesn't.

4. **`onChange={() => setAnswers({...answers, 0: "0"})}`** — When someone clicks this option, we update our answers object to record that question 0 was answered with value "0". The `{...answers, 0: "0"}` part means "take all the existing answers and add/update question 0 with this new value."

Now when you click a radio button, it actually remembers your choice! Try clicking different options — they should stay selected even if you move away from them.

---

## Step 8: Add All Nine Questions

We have one question working. Now let's add all nine PHQ-9 questions. Instead of writing each one out manually (which would be repetitive and error-prone), we'll use a loop to generate them dynamically.

**File:** `src/App.jsx`

```jsx
import { useState } from "react";

const QUESTIONS = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed it? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead or of hurting yourself in some way"
];

const OPTIONS = [
  { value: "0", label: "Not at all" },
  { value: "1", label: "Several days" },
  { value: "2", label: "More than half the days" },
  { value: "3", label: "Nearly every day" }
];

export default function App() {
  const [answers, setAnswers] = useState({});

  return (
    <div className="app">
      <div className="container">
        <h1>PHQ-9 Depression Screening</h1>
        <p>Over the last 2 weeks, how often have you been bothered by any of the following problems?</p>

        {QUESTIONS.map((question, index) => (
          <div key={index} className="question-card">
            <p>{index + 1}. {question}</p>
            {OPTIONS.map(option => (
              <label key={option.value}>
                <input
                  type="radio"
                  name={`q${index}`}
                  value={option.value}
                  checked={answers[index] === option.value}
                  onChange={() => setAnswers({...answers, [index]: option.value})}
                />
                {option.label}
              </label>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
```

What changed (another big step — let's take it slowly):

1. **`const QUESTIONS = [...]`** — We created an array containing all nine PHQ-9 questions as strings. This makes it easy to manage and update the questions in one place instead of scattered throughout the code.

2. **`const OPTIONS = [...]`** — Similarly, we put our answer options into an array of objects. Each object has a `value` (the number 0-3) and a `label` (what the user sees). This way, all questions use the same consistent set of answers.

3. **`QUESTIONS.map((question, index) => (...))`** — This is where the magic happens! The `.map()` function goes through each question in our array one by one and creates a piece of JSX for it. Think of it like a factory assembly line: we give it raw materials (the question text), and it produces finished products (the rendered question cards).

4. **`key={index}`** — React needs a unique identifier for each item in a list so it can track them efficiently. We use the index (position) of each question as its key. Question 0 gets key "0", question 1 gets key "1", and so on.

5. **Nested `.map()` for options** — Inside each question card, we have another `.map()` that goes through our OPTIONS array and creates radio buttons for each answer choice. This is like having a factory within a factory!

6. **Dynamic names with template literals** — Notice `name={`q${index}`}`. This uses JavaScript's template literal feature to create unique names for each question's radio group: "q0", "q1", "q2", etc. Without this, all the radio buttons would be grouped together and you could only select one answer total across all questions!

Now our app shows all nine questions with their answer options, and users can select an answer for each one independently.

---

## Step 9: Add a Submit Button

Once users have answered all the questions, they need a way to submit their answers and see their score. Let's add a button at the bottom of the form.

**File:** `src/App.jsx`

```jsx
import { useState } from "react";

const QUESTIONS = [/* ... same as before ... */];
const OPTIONS = [/* ... same as before ... */];

export default function App() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="app">
      <div className="container">
        <h1>PHQ-9 Depression Screening</h1>
        <p>Over the last 2 weeks, how often have you been bothered by any of the following problems?</p>

        {QUESTIONS.map((question, index) => (/* ... same as before ... */))}

        <button
          onClick={() => setSubmitted(true)}
          disabled={answeredCount < QUESTIONS.length}
        >
          {answeredCount < QUESTIONS.length
            ? `Answer all ${QUESTIONS.length - answeredCount} remaining questions`
            : "Submit"}
        </button>
      </div>
    </div>
  );
}
```

What changed:

1. **`const [submitted, setSubmitted] = useState(false)`** — New state variable to track whether the user has submitted their answers yet. Starts as `false` (not submitted).

2. **`const answeredCount = Object.keys(answers).length`** — This counts how many questions have been answered by checking how many keys exist in our answers object. If someone has answered 5 questions, this will be 5.

3. **The submit button** — We added a `<button>` element with several important features:
   - `onClick={() => setSubmitted(true)}` — When clicked, it sets the submitted state to true, which will later trigger showing the results.
   - `disabled={answeredCount < QUESTIONS.length}` — The button is disabled (grayed out and unclickable) until all 9 questions have been answered. This prevents users from submitting incomplete questionnaires.
   - Dynamic text — If not all questions are answered, it tells users how many remain. Once all are answered, it just says "Submit".

Think of this button like the finish line of a race: you can't cross it until you've completed all the laps (answered all the questions).

---

## Step 10: Calculate and Display the Score

Now comes the exciting part! When users submit their answers, we need to calculate their total score and show them what it means. Let's create a function that adds up all their responses.

**File:** `src/App.jsx`

```jsx
import { useState } from "react";

const QUESTIONS = [/* ... same as before ... */];
const OPTIONS = [/* ... same as before ... */];

function calculateScore(answers) {
  let total = 0;
  for (let i = 0; i < QUESTIONS.length; i++) {
    if (answers[i] !== undefined) {
      total += parseInt(answers[i]);
    }
  }
  return total;
}

function getSeverity(score) {
  if (score <= 4) return "Minimal";
  if (score <= 9) return "Mild";
  if (score <= 14) return "Moderate";
  if (score <= 19) return "Moderately Severe";
  return "Severe";
}

export default function App() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = Object.keys(answers).length;

  if (submitted) {
    const score = calculateScore(answers);
    const severity = getSeverity(score);

    return (
      <div className="app">
        <div className="container">
          <h1>Your PHQ-9 Results</h1>
          <p className="score-display">{score}/27</p>
          <p className="severity-label">{severity}</p>
          <button onClick={() => { setAnswers({}); setSubmitted(false); }}>Retake Assessment</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container">
        <h1>PHQ-9 Depression Screening</h1>
        <p>Over the last 2 weeks, how often have you been bothered by any of the following problems?</p>

        {QUESTIONS.map((question, index) => (/* ... same as before ... */))}

        <button
          onClick={() => setSubmitted(true)}
          disabled={answeredCount < QUESTIONS.length}
        >
          {answeredCount < QUESTIONS.length
            ? `Answer all ${QUESTIONS.length - answeredCount} remaining questions`
            : "Submit"}
        </button>
      </div>
    </div>
  );
}
```

What changed (this is a major step — let's break it down carefully):

1. **`calculateScore(answers)` function** — This takes the answers object and adds up all the numeric values. Here's how it works:
   - It starts with `total = 0`.
   - It loops through each question index (0-8).
   - For each question that has an answer, it converts the string value ("0", "1", etc.) to a number using `parseInt()` and adds it to the total.
   - Finally, it returns the sum.

2. **`getSeverity(score)` function** — This translates the numeric score into a meaningful category based on clinical guidelines:
   - 0-4 = Minimal depression
   - 5-9 = Mild depression
   - 10-14 = Moderate depression
   - 15-19 = Moderately severe depression
   - 20-27 = Severe depression

3. **Conditional rendering with `if (submitted)`** — This is a powerful React pattern. If the user has submitted their answers, we show completely different content: their results instead of the questions. It's like flipping a page in a book — before submission, you're on the "questions" page; after submission, you're on the "results" page.

4. **The results view** — When submitted is true, we display:
   - A heading saying "Your PHQ-9 Results"
   - The score out of 27 (the maximum possible)
   - The severity level as determined by our function
   - A button to retake the assessment (which resets everything back to the beginning)

Now when users answer all nine questions and click submit, they see their personalized results!

---

## Step 11: Add Progress Tracking

It's helpful for users to know how far along they are in completing the questionnaire. Let's add a progress indicator that shows them how many questions they've answered so far.

**File:** `src/App.jsx` (add this inside the main return block, before the questions)

```jsx
<div className="progress-container">
  <div className="progress-bar" style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }}></div>
</div>
<p>{answeredCount} of {QUESTIONS.length} questions answered</p>
```

What this does:
- Creates a progress bar that fills up as users answer more questions.
- The width is calculated by dividing answered questions by total questions and multiplying by 100 to get a percentage.
- Shows text like "5 of 9 questions answered" so users know exactly where they stand.

Think of this like the fuel gauge in your car — it tells you how much further you have to go before reaching your destination (completing all questions).

---

## Step 12: Save Answers to Local Storage

What if a user accidentally closes their browser? We don't want them to lose all their answers! Let's use the browser's local storage feature to save their progress automatically.

**File:** `src/App.jsx` (add this after creating the state variables)

```jsx
// Load saved answers on startup
const [answers, setAnswers] = useState(() => {
  try {
    const saved = localStorage.getItem("phq9-answers");
    return saved ? JSON.parse(saved) : {};
  } catch (e) {
    return {};
  }
});

// Save answers whenever they change
useEffect(() => {
  localStorage.setItem("phq9-answers", JSON.stringify(answers));
}, [answers]);
```

What this does:
1. **Loading on startup** — When the app first loads, it checks if there are any saved answers in local storage. If yes, it restores them; if no, it starts with an empty object.
2. **Saving on changes** — Every time the user selects a new answer (which triggers `setAnswers`), we save the updated answers to local storage using `JSON.stringify()` to convert the object into text that can be stored.

This means users can close their browser, come back later, and continue where they left off! It's like an autosave feature in a word processor.

---

## Step 13: Add Multi-Language Support

The PHQ-9 is used worldwide, so let's make our app available in multiple languages. We'll start by creating a translations file that contains all the text in different languages.

**New File:** `src/lib/translations.js`

```javascript
export const translations = {
  en: {
    title: "PHQ-9 Depression Screening",
    description: "Over the last 2 weeks, how often have you been bothered by any of the following problems?",
    questions: [/* English questions */],
    options: [/* English option labels */],
    submit: "Submit",
    retake: "Retake Assessment",
    severity: {
      minimal: "Minimal",
      mild: "Mild",
      moderate: "Moderate",
      moderately_severe: "Moderately Severe",
      severe: "Severe"
    }
  },
  th: {
    title: "แบบสอบถามสุขภาพผู้ป่วย PHQ-9",
    description: "ในช่วง 2 สัปดาห์ที่ผ่านมา ท่านมีอาการต่อไปนี้บ่อยแค่ไหน?",
    questions: [/* Thai questions */],
    options: [/* Thai option labels */],
    submit: "รวมคะแนน",
    retake: "ทำแบบประเมินอีกครั้ง",
    severity: {
      minimal: "ภาวะซึมเศร้าเล็กน้อย",
      mild: "ภาวะซึมเศร้าระดับเบา",
      moderate: "ภาวะซึมเศร้าระดับปานกลาง",
      moderately_severe: "ภาวะซึมเศร้าระดับค่อนข้างรุนแรง",
      severe: "ภาวะซึมเศร้าระดับรุนแรง"
    }
  },
  // Add more languages here...
};
```

Then in App.jsx, we import this and use it to display the correct language based on user selection. This makes our app accessible to people who speak different languages — like having a translator available for everyone!

---

## Step 14: Style Everything with CSS Modules

Our app works perfectly now, but it looks plain. Let's make it beautiful using CSS Modules, which let us write styles specific to each component without worrying about conflicts.

**New File:** `src/App.module.css`

```css
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: system-ui, sans-serif;
}

.container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

h1 {
  color: #1e3a8a;
  margin-bottom: 1rem;
}

.question-card {
  background: #f8fafc;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
}

.score-display {
  font-size: 3rem;
  font-weight: bold;
  color: #dc2626;
}

.severity-label {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 1rem;
}
```

Then in App.jsx, we import and apply these styles using the `styles` object that CSS Modules provides. This makes our app look professional and polished — like putting a nice outfit on before going out!

---

## Step 15: Build and Deploy

Our app is complete! Now let's build it for production so we can share it with others.

**Terminal command:**
```bash
bun run build
```

This creates an optimized version of our app in the `dist/` folder that loads quickly and works efficiently on any device. We can then deploy this to a web server or hosting service like Netlify, Vercel, or GitHub Pages so anyone with internet access can use it.

---

## Recap: What We Built

Let's review everything we accomplished together:

1. ✅ Created an empty React component shell
2. ✅ Added page structure with containers
3. ✅ Displayed the questionnaire title and description
4. ✅ Implemented the first question with radio button answers
5. ✅ Made it interactive using React state to remember selections
6. ✅ Scaled up to all nine PHQ-9 questions using loops
7. ✅ Added a submit button that validates completion
8. ✅ Calculated scores and displayed severity results
9. ✅ Tracked progress so users know how far along they are
10. ✅ Saved answers automatically to local storage for persistence
11. ✅ Added multi-language support for global accessibility
12. ✅ Styled everything beautifully with CSS Modules
13. ✅ Built the app for production deployment

You now have a fully functional PHQ-9 depression screening tool that can help people understand their mental health! 🎉

Remember: this is just the beginning. You could add features like email results, shareable reports, appointment booking, or integration with healthcare providers. The possibilities are endless — you've built the foundation, and now you're ready to grow it into whatever you imagine.