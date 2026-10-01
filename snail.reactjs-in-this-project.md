# The PHQ-9 Depression Screener: A Snail-Pace React Tutorial

Welcome, dear learner. You are about to understand every single piece of the React code in this depression screening app. We will move slowly. Very slowly. Like a snail climbing up a leaf. Each step is tiny. Each concept is explained from scratch. If you have never written a line of JavaScript before, that is perfectly fine. That is exactly who this tutorial is for.

Grab a cup of tea. Sit comfortably. Let us begin at the very beginning.

---

## Part 1: What Is React? (The Big Picture)

Imagine you are building with LEGO bricks. Each brick has a specific shape and purpose. You snap them together to build something bigger—a house, a car, a spaceship.

**React is exactly that.** It is a collection of LEGO-like pieces called **components**. Each component does one small job:
- One component might be a button
- Another might be a card with text inside it
- Another might be the entire quiz form

You snap these components together to build your whole application. That is all React is. A way to build user interfaces out of reusable, snap-together pieces.

In this project, we have:
- A **Card** component (a box with a border and padding)
- A **Button** component (something you can click)
- A **RadioGroup** component (a set of options where you pick one)
- And many more small pieces

All snapped together to make the PHQ-9 depression screening quiz.

---

## Part 2: The Entry Point — main.jsx

Every React application has a starting point, like the ignition key in a car. In this project, that file is called `main.jsx`. Let us look at it line by line.

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### Line 1: `import React from 'react'`

The word **import** means "bring in something that was built elsewhere." Think of it like ordering a pizza. You don't make the dough yourself; you import (order) it from the pizzeria.

Here, we are importing the React library itself. This gives us access to all the LEGO bricks React provides. The word `from 'react'` tells JavaScript where to find this library—it's in a package called "react" that was installed when the project was set up.

### Line 2: `import ReactDOM from 'react-dom/client'`

This imports another piece of React called **ReactDOM**. If React is the LEGO bricks, ReactDOM is the glue that sticks them onto the actual web page. Without ReactDOM, your components would exist in memory but you wouldn't see anything on screen. The `/client` part means we're using the version for running in a web browser (as opposed to a server).

### Line 3: `import App from './App.jsx'`

This imports our main application component called **App**. The `./` means "in this same folder." So it's looking for a file called `App.jsx` right here. This is the big piece that contains all the quiz logic and layout. We'll explore it in detail later.

### Line 4: `import './index.css'`

This imports a stylesheet—a file full of instructions about how things should look (colors, sizes, spacing). The `.css` extension stands for "Cascading Style Sheets." When you import a CSS file this way, its styles apply to the entire application.

### Lines 6-10: Rendering the App

```jsx
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

This is where the magic happens. Let's break it into pieces, like taking apart a clock to see how it ticks.

**`document.getElementById('root')`**: This asks the web page for an element with the ID "root." If you look at `index.html`, you'll find `<div id="root"></div>`. It's an empty box waiting to be filled. Think of it as a blank canvas on an easel.

**`ReactDOM.createRoot(...)`**: This takes that empty box and turns it into a place where React can draw things. It's like saying, "Hey browser, I'm going to paint my picture inside this specific frame."

**`.render(...)`**: Now we tell React what to actually draw. We pass in our components wrapped in `<React.StrictMode>`. StrictMode is like a careful teacher who checks your work twice—it helps catch mistakes during development but doesn't change how the app looks or behaves for users.

**`<App />`**: This is where our actual application gets drawn. The angle brackets and slash make it look like HTML, but this is actually **JSX**—a special syntax that lets us write component tags inside JavaScript. We'll learn about JSX next.

---

## Part 3: What Is JSX? (The Weird Tag Syntax)

You might be wondering: "Why does `<App />` look like HTML but it's in a JavaScript file?" That's because of **JSX** (pronounced "jays-eks").

JSX is a special way to write UI components that looks like HTML tags but actually runs as JavaScript. It was invented by the React team to make building interfaces feel natural and readable.

### A Simple Example

Here's what JSX looks like in its simplest form:

```jsx
const greeting = <h1>Hello, World!</h1>
```

This creates an `<h1>` heading element with the text "Hello, World!" inside it. It looks exactly like HTML, right? But here's the twist—you can put JavaScript expressions inside curly braces `{}`.

### Embedding JavaScript in JSX

```jsx
const name = "Alice"
const greeting = <h1>Hello, {name}!</h1>
```

The `{name}` part is replaced with the actual value of the variable `name`. So this would display: **Hello, Alice!**

You can do math too:

```jsx
const result = <p>2 + 2 equals {2 + 2}</p>
```

This displays: **2 + 2 equals 4**

### JSX in This Project

In our depression screener, we use JSX everywhere. For example, this line from `App.jsx`:

```jsx
<CardTitle>{t.title}</CardTitle>
```

This creates a title element and puts the value of `t.title` inside it. The `t` object contains translated text (we'll learn about that later), so `{t.title}` might be "PHQ-9 Depression Screener" in English or "แบบประเมินภาวะซึมเศร้า PHQ-9" in Thai, depending on which language is selected.

### Important JSX Rules to Remember

1. **Always close your tags.** `<div>` must become `</div>`. Self-closing tags like `<img />` need the slash at the end.
2. **Use className instead of class.** In HTML you write `class="button"`, but in JSX it's `className="button"` because "class" is a reserved word in JavaScript.
3. **One parent element required.** If you want to return multiple elements from a component, wrap them in a single container like `<div>` or use React Fragments (`<>...</>`).

---

## Part 4: Components Are Just Functions

This is one of the most important ideas in React. A component is simply a JavaScript function that returns JSX. Let's look at a tiny example first.

### Your First Component

```jsx
function Welcome() {
  return <h1>Hello, friend!</h1>
}
```

That's it! You just created your first React component. It's a function called `Welcome` that returns an `<h1>` heading. Notice how the function name starts with a capital letter—that's a convention in React to distinguish components from regular functions.

### Using Your Component

Once you've defined a component, you can use it like a tag:

```jsx
function App() {
  return (
    <div>
      <Welcome />
      <p>This is the rest of my app.</p>
    </div>
  )
}
```

When React sees `<Welcome />`, it calls the `Welcome` function and puts whatever it returns into that spot. So the final HTML would be:

```html
<div>
  <h1>Hello, friend!</h1>
  <p>This is the rest of my app.</p>
</div>
```

### The App Component in This Project

Now let's look at the real `App` component from our depression screener. It starts like this:

```jsx
export default function App() {
  // ... lots of code here ...
}
```

The words `export default` mean "this is the main thing being shared from this file." When another file does `import App from './App.jsx'`, it gets this function. Without `export default`, other files couldn't import it.

Inside this function, there's a lot going on—state management, event handlers, conditional rendering—but at its core, it still follows the same pattern: it's a function that returns JSX describing what should appear on screen.

---

## Part 5: Props — Passing Data Between Components

Imagine you have a button component. You want to use it in two places: once as a "Submit" button and once as a "Cancel" button. How do you tell the button what text to show?

You pass **props** (short for "properties"). Think of props like ingredients you hand to a chef. The chef (the component) uses those ingredients to make something specific.

### Defining Props

```jsx
function Button({ label, color }) {
  return <button style={{ backgroundColor: color }}>{label}</button>
}
```

This component expects two props: `label` (what text to show) and `color` (what background color to use). The curly braces around `{ label, color }` are JavaScript's "destructuring" syntax—it unpacks the values from an object.

### Using Props

```jsx
<Button label="Submit" color="blue" />
<Button label="Cancel" color="red" />
```

Each time we use `<Button>`, we pass different props, and the component renders differently based on what it receives.

### Props in This Project

In our depression screener, props are used extensively. Look at this line from `App.jsx`:

```jsx
<LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />
```

We're passing two props to the LanguageSwitcher component:
- `currentLang` — tells it which language is currently selected (the value of the `lang` variable)
- `onLanguageChange` — gives it a function to call when the user picks a different language (the `setLang` function)

The LanguageSwitcher component receives these props and uses them to display the correct options and respond to user clicks. It's like handing someone a remote control (`onLanguageChange`) and telling them which channel is currently on (`currentLang`).

### Another Example: The Card Component

```jsx
<Card className={styles.container}>
  <CardHeader>...</CardHeader>
  <CardContent>...</CardContent>
</Card>
```

Here, `className` is a prop being passed to the Card component. It tells the card which CSS class to use for styling. The value `{styles.container}` comes from our imported styles object (we'll learn about that in Part 10).

---

## Part 6: State — Remembering Things with useState

Components need to remember things. For example, our quiz needs to remember:
- Which questions the user has answered
- What answers they gave
- Whether they've submitted the quiz yet

This is where **state** comes in. State is like a component's memory—it stores information that can change over time.

### The useState Hook

React provides a special function called `useState` for managing state. It's called a "hook" because it lets you hook into React's internal features from inside your component functions.

Here's the basic syntax:

```jsx
const [count, setCount] = useState(0)
```

Let's break this down very carefully:

- `useState(0)` — This creates a piece of state with an initial value of 0. The number in parentheses is what the state starts as.
- `[count, setCount]` — This uses JavaScript array destructuring to give names to two things that useState returns:
  - `count` — the current value of the state (starts at 0)
  - `setCount` — a function you call to change the value

So after this line runs, you have:
- A variable called `count` that holds the number 0
- A function called `setCount` that lets you update count

### Changing State

To change the state, you call the setter function:

```jsx
setCount(5)      // Now count is 5
setCount(count + 1)  // Increment by 1
```

When you call `setCount`, React automatically re-renders your component with the new value. This means any JSX that uses `count` will update to show the new number. That's how interactive apps work!

### State in This Project

Our depression screener has several pieces of state. Let's look at them one by one.

**Language state:**
```jsx
const [lang, setLang] = useState("th")
```
This remembers which language is selected. It starts as "th" (Thai). When the user clicks a different language option, `setLang` is called with the new language code.

**Answers state:**
```jsx
const [answers, setAnswers] = useState(() => {
  try {
    const saved = localStorage.getItem("phq9-answers")
    return saved ? JSON.parse(saved) : {}
  } catch {
    return {}
  }
})
```
This is more complex but follows the same pattern. It creates state called `answers` that stores an object of question answers. The initial value isn't just a simple number—it's a function that checks if there are saved answers in the browser's localStorage and loads them if found. If nothing is saved, it starts with an empty object `{}`.

**Submitted state:**
```jsx
const [submitted, setSubmitted] = useState(false)
```
This remembers whether the user has submitted their quiz. It starts as `false` (not submitted yet). When they click submit, we call `setSubmitted(true)`.

### Why Use a Function for Initial State?

You might wonder why the answers state uses a function instead of just writing the value directly. The reason is efficiency and clarity. When you pass a function to useState, React only calls it once when the component first mounts. This is useful when calculating the initial value requires some work (like reading from localStorage). It also makes the code easier to read because all the initialization logic is grouped together in one place.

---

## Part 7: Effects — Doing Things When State Changes with useEffect

Sometimes you want your component to do something automatically whenever certain data changes. For example, when the user answers a question, we want to save their progress so they don't lose it if they close the browser tab.

This is what `useEffect` is for. It's like setting up an alarm that goes off whenever specific conditions are met.

### Basic useEffect Syntax

```jsx
useEffect(() => {
  // Code to run when effect triggers
}, [dependency])
```

The first argument is a function containing the code you want to run. The second argument (in square brackets) is a list of "dependencies"—values that, when they change, trigger the effect to run again.

### Saving Answers Automatically

In our depression screener, we have this effect:

```jsx
useEffect(() => {
  localStorage.setItem("phq9-answers", JSON.stringify(answers))
}, [answers])
```

Let's understand what this does step by step:

1. **When does it run?** Every time the `answers` state changes (because `answers` is listed in the dependency array).
2. **What does it do?** It takes the current answers object, converts it to a text string using `JSON.stringify()`, and saves that string to the browser's localStorage under the key "phq9-answers".

**localStorage** is like a tiny notebook built into every web browser. You can store small pieces of data in it, and they persist even after the user closes their tab or restarts their computer. It's perfect for saving quiz progress!

So here's what happens from the user's perspective:
1. User answers question 3
2. The `answers` state updates to include that answer
3. Because `answers` changed, our useEffect runs automatically
4. The effect saves all current answers to localStorage
5. If the user accidentally closes their browser and comes back later, their progress is still there!

### Another Example: Updating Page Title

Here's a simpler example of useEffect in action:

```jsx
useEffect(() => {
  document.title = "You have answered " + count + " questions"
}, [count])
```

Every time `count` changes, this effect updates the browser tab's title to show how many questions have been answered. It's a nice touch that gives users feedback without them having to look at the page content.

---

## Part 8: Refs — Remembering DOM Elements with useRef

Sometimes you need to remember a reference to an actual HTML element on the page, not just data in your component's state. For example, you might want to scroll to a specific question or focus on an input field.

This is what `useRef` is for. It creates a little container that holds a reference to something across re-renders.

### Creating a Ref

```jsx
const myElement = useRef(null)
```

This creates a ref object with a `.current` property that starts as `null`. You can attach this ref to an HTML element using the `ref` attribute:

```jsx
<input ref={myElement} type="text" />
```

Now, `myElement.current` will hold a reference to that actual `<input>` DOM element. You can use it to call methods on the element or read its properties.

### Refs in This Project

Our depression screener uses refs for an interesting feature: when the user answers a question, the page automatically scrolls down to the next unanswered question. Here's how it works:

```jsx
const questionRefs = Array.from({ length: QUESTION_COUNT }, () => useRef(null))
```

This creates an array of 9 refs (one for each PHQ-9 question). Each ref will eventually hold a reference to one question card on the page.

Then, when rendering each question, we attach the corresponding ref:

```jsx
<div key={i} ref={questionRefs[i]} className={styles.questionCard}>
  {/* Question content */}
</div>
```

Now `questionRefs[0].current` refers to the first question's div, `questionRefs[1].current` refers to the second, and so on.

When the user answers a question, we find the next unanswered one and scroll to it:

```jsx
if (targetIndex !== -1 && questionRefs[targetIndex]?.current) {
  questionRefs[targetIndex].current.scrollIntoView({ behavior: "smooth", block: "center" })
}
```

The `scrollIntoView` method is a built-in browser function that scrolls the page so the specified element is visible. The options `{ behavior: "smooth", block: "center" }` make it scroll smoothly and position the question in the center of the viewport. This creates a nice guided experience where the user's attention flows naturally from one question to the next.

---

## Part 9: Rendering Lists with .map()

Our quiz has 9 questions, but we don't want to write out all 9 question components manually—that would be repetitive and hard to maintain. Instead, we use JavaScript's `.map()` method to generate them from an array.

### What Is .map()?

The `.map()` method takes an array and transforms each item into something else. It returns a new array with the transformed items.

Here's a simple example:

```jsx
const numbers = [1, 2, 3]
const doubled = numbers.map(n => n * 2)
// doubled is now [2, 4, 6]
```

### Rendering Multiple Components

In React, you can use `.map()` to create multiple components from an array of data:

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo.text}</li>
      ))}
    </ul>
  )
}
```

For each item in the `todos` array, this creates an `<li>` element. The `key` prop is important—it helps React track which items have changed when the list updates.

### Rendering Questions in This Project

In our depression screener, we render all 9 questions like this:

```jsx
{Array.from({ length: QUESTION_COUNT }).map((_, i) => (
  <div key={i} ref={questionRefs[i]} className={styles.questionCard}>
    <p className={styles.questionText}>{i + 1}. {t.questions[i]}</p>
    <RadioGroup value={answers[i] ?? ""} onValueChange={(v) => handleAnswer(i, v)}>
      {t.options.map((opt) => (
        <Label key={opt.value} htmlFor={`q${i}-${opt.value}`} className={styles.optionLabel}>
          <RadioGroupItem value={opt.value} id={`q${i}-${opt.value}`} />
          <span>{opt.label}</span>
        </Label>
      ))}
    </RadioGroup>
  </div>
))}
```

Let's break this down:

1. **`Array.from({ length: QUESTION_COUNT })`** — Creates an array with 9 empty slots (since QUESTION_COUNT is 9). We don't care about the actual values; we just need something to iterate over 9 times.

2. **`.map((_, i) => ...)`** — For each slot in the array, create a question component. The `_` represents the value at that position (which we ignore), and `i` is the index (0 through 8).

3. **`key={i}`** — Each question gets a unique key based on its index so React can track them properly.

4. **`ref={questionRefs[i]}`** — Attach the corresponding ref to each question div for scrolling purposes.

5. **`{t.questions[i]}`** — Display the translated text of question number `i`. The `t` object contains all translations, and `t.questions` is an array where each index corresponds to a question.

6. **The inner `.map()` for options** — Each question has 4 answer options ("Not at all," "Several days," etc.). We use another `.map()` call to render these as radio buttons. For each option in `t.options`, we create a `<Label>` containing a `<RadioGroupItem>` (the actual radio button) and the option's text.

This nested mapping pattern is very common in React: an outer loop for main items (questions), and inner loops for sub-items (answer options). It keeps your code DRY (Don't Repeat Yourself) and makes it easy to add or remove questions later—just change the data, not the component structure.

---

## Part 10: Conditional Rendering — Showing Different Things Based on State

Sometimes you want to show different UI depending on some condition. For example, if the user has submitted their quiz, show them their score. If they haven't submitted yet, show them the questions.

This is called **conditional rendering**, and it's done using regular JavaScript `if` statements inside your component functions.

### Simple Conditional Rendering

```jsx
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>
  } else {
    return <h1>Please log in.</h1>
  }
}
```

Depending on the `isLoggedIn` prop, this component shows either a welcome message or a login prompt.

### Conditional Rendering in This Project

Our depression screener has two main views: the quiz form and the results page. We switch between them based on the `submitted` state:

```jsx
if (submitted) {
  // Show results view
  const score = calculatePHQ9Score(answers)
  const severityKey = getPHQ9Severity(score)
  
  return (
    <div className={styles.app}>
      {/* Results UI with score and severity */}
    </div>
  )
}

// If not submitted, show the quiz form
return (
  <div className={styles.app}>
    {/* Quiz questions UI */}
  </div>
)
```

When `submitted` is `true`, we calculate the user's score using helper functions (`calculatePHQ9Score` and `getPHQ9Severity`) and render the results view. When it's `false`, we render the quiz form with all the questions.

### Inline Conditional Rendering

You can also use JavaScript's ternary operator for simpler inline conditions:

```jsx
<Button disabled={answeredCount < QUESTION_COUNT}>
  {answeredCount < QUESTION_COUNT 
    ? t.remaining(QUESTION_COUNT - answeredCount) 
    : t.submit}
</Button>
```

This button shows different text depending on whether all questions have been answered. If not, it says something like "3 remaining." If yes, it says "Submit." The `disabled` prop also changes based on the same condition—the button is grayed out and unclickable until all questions are answered.

The ternary operator has this syntax: `condition ? valueIfTrue : valueIfFalse`. It's a compact way to write if/else expressions inline within JSX.

---

## Part 11: Event Handlers — Responding to User Actions

A quiz isn't very useful if it doesn't respond when users click buttons or select answers. React makes it easy to handle user interactions using **event handlers**.

### What Is an Event Handler?

An event handler is a function that runs when something happens—like a button click, a key press, or a form submission. In HTML, you might write `onclick="doSomething()"`. In React, it's similar but with camelCase names and JavaScript functions instead of strings.

### onClick Example

```jsx
function MyButton() {
  function handleClick() {
    alert("You clicked me!")
  }
  
  return <button onClick={handleClick}>Click me</button>
}
```

When the user clicks this button, React calls the `handleClick` function. Notice that we pass the function itself (`handleClick`), not a call to it (`handleClick()`). If you put parentheses, the function would run immediately when the component renders, not when clicked!

### Handling Radio Button Selections

In our depression screener, each answer option is a radio button inside a RadioGroup. When the user selects an option, we need to record their answer. Here's how:

```jsx
<RadioGroup 
  value={answers[i] ?? ""} 
  onValueChange={(v) => handleAnswer(i, v)}
>
```

The `onValueChange` prop receives a function that gets called whenever the selected radio button changes. The function receives one argument (`v`) which is the value of the newly selected option ("0", "1", "2", or "3" representing the severity levels).

We use an arrow function `(v) => handleAnswer(i, v)` to wrap our actual handler. This lets us pass along additional information—in this case, `i` (the question index)—along with the value that RadioGroup provides. Without this wrapper, we wouldn't know which question was being answered!

### The handleAnswer Function

```jsx
function handleAnswer(index, value) {
  if (!["0", "1", "2", "3"].includes(value)) return
  
  setAnswers((prev) => {
    const updated = { ...prev, [index]: value }
    
    // Scroll to next unanswered question after a short delay
    setTimeout(() => {
      let targetIndex = -1
      for (let offset = 1; offset <= QUESTION_COUNT; offset++) {
        const candidate = (index + offset) % QUESTION_COUNT
        if (updated[candidate] === undefined) {
          targetIndex = candidate
          break
        }
      }
      if (targetIndex !== -1 && questionRefs[targetIndex]?.current) {
        questionRefs[targetIndex].current.scrollIntoView({ 
          behavior: "smooth", 
          block: "center" 
        })
      }
    }, 50)
    
    return updated
  })
}
```

Let's walk through what this does:

1. **Validate the input**: First, it checks that `value` is one of the allowed options ("0", "1", "2", or "3"). If not, it returns early without doing anything. This prevents invalid data from getting into our state.

2. **Update the answers state**: It calls `setAnswers` with a function (not a direct value). Why a function? Because we need to know the previous state (`prev`) in order to add our new answer to it. The function receives the current state as its argument and returns the new state.

3. **Spread operator `{ ...prev, [index]: value }`**: This creates a new object that contains all the old answers plus our new one. The `...prev` part copies everything from the previous answers object. Then `[index]: value` adds (or updates) the answer for this specific question. Using bracket notation with a variable (`[index]`) lets us dynamically set which property to update based on the question number.

4. **Scroll to next question**: After updating the state, we use `setTimeout` to wait 50 milliseconds before scrolling. We need this small delay because React hasn't finished re-rendering yet when `setAnswers` is called—the new answer isn't visually reflected on screen until after the render completes. By waiting, we ensure the scroll happens after the UI has updated.

   The loop searches for the next unanswered question by checking each subsequent index (wrapping around to the beginning if necessary using the modulo operator `%`). Once it finds an unanswered question, it uses that question's ref to scroll into view.

This combination of state update and automatic scrolling creates a smooth, guided experience where users feel led through the quiz naturally without having to manually hunt for the next question.

---

## Part 12: CSS Modules — Scoped Styles

You might have noticed imports like this in `App.jsx`:

```jsx
import styles from "./App.module.css"
```

And usage like this:

```jsx
<div className={styles.app}>
```

This is called **CSS Modules**. It's a way to write CSS that only applies to one specific component, preventing style conflicts between different parts of your app.

### The Problem with Regular CSS

In traditional web development, if you define a class called `.button` in one file and another developer defines a class called `.button` in a different file, they'll conflict! Both will apply their styles to any element with `class="button"`. This gets messy as projects grow.

### How CSS Modules Solve It

With CSS Modules, each component has its own private stylesheet. When you write:

```css
/* App.module.css */
.app {
  background-color: white;
}
```

And then use it in your JSX:

```jsx
<div className={styles.app}>
```

The bundler (Vite, in our case) automatically generates a unique class name like `app_xK3mP` and applies that instead of just `app`. This ensures no other component can accidentally affect your styles.

### Using CSS Modules in This Project

Throughout the depression screener, we use CSS modules for all styling. For example:

```jsx
<Card className={styles.container}>
  <div className={styles.fixedHeader}>
    <CardTitle>{t.title}</CardTitle>
  </div>
</Card>
```

Each of these class names (`container`, `fixedHeader`) is defined in `App.module.css` and scoped to just this component. This makes the code more maintainable because you can change styles for one part of the app without worrying about breaking something else.

### Inline Styles vs CSS Modules

You might also see some inline styles mixed in:

```jsx
<CardDescription style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e40af' }}>
```

Inline styles are written directly in the JSX as JavaScript objects. They're useful for dynamic values that change based on state or props, but for static styling, CSS modules are generally preferred because they're easier to read and maintain. In this project, inline styles are used sparingly—mostly for color theming that needs to match specific design requirements.

---

## Part 13: Internationalization (i18n) — Multiple Languages

One of the coolest features of this depression screener is that it supports multiple languages! Users can switch between Thai and English (and potentially other languages in the future). This is called **internationalization**, often abbreviated as "i18n" (the "i" + 18 letters + "n").

### How i18n Works in This Project

All translatable text is stored in a single file: `lib/translations.js`. This file exports an object where each key is a language code and each value contains all the translated strings for that language.

```jsx
import { translations } from "./lib/translations"
```

In the App component, we track which language is selected using state:

```jsx
const [lang, setLang] = useState("th")  // Default to Thai
const t = translations[lang]           // Get translations for current language
```

The variable `t` (short for "translations") now holds all the text strings in the currently selected language. Throughout the component, instead of writing hardcoded English text like `"How often have you been bothered by..."`, we use `{t.questions[i]}` which pulls the appropriate translation.

### The Language Switcher Component

```jsx
<LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />
```

This component displays buttons or a dropdown that lets users pick their preferred language. It receives two props:
- `currentLang` — so it knows which option to highlight as selected
- `onLanguageChange` — a function to call when the user picks a different language (which updates our `lang` state)

When the user clicks "English," for example, `setLang("en")` is called. This triggers a re-render of the entire App component with `t` now pointing to English translations. Every piece of text on the page instantly switches languages!

### Why Store Translations in One File?

Keeping all translations in a single file has several advantages:
1. **Easy to maintain** — translators can work on one document rather than hunting through dozens of component files
2. **Consistent terminology** — the same phrase is translated identically everywhere it appears
3. **Easy to add new languages** — just add another entry to the translations object with all the strings for that language
4. **Missing translation detection** — if a new string is added to one language but forgotten in others, it's easy to spot

This approach scales well from two languages to twenty or more without changing how the components work—they always use `{t.something}` regardless of which languages are supported.

---

## Part 14: Helper Functions and Utility Libraries

Not all logic belongs directly inside your React components. Some calculations and data transformations are better kept separate in utility functions. This makes your code cleaner, more testable, and easier to understand.

### The utils.js File

In our depression screener, the file `lib/utils.js` contains helper functions for calculating PHQ-9 scores:

```jsx
import { getPHQ9Severity, calculatePHQ9Score, PHQ9_MAX_SCORE } from "./lib/utils"
```

**`calculatePHQ9Score(answers)`**: Takes the user's answers object and computes their total score. Each answer ("0", "1", "2", or "3") contributes that many points to the total. The maximum possible score is 27 (9 questions × 3 points each).

**`getPHQ9Severity(score)`**: Given a numeric score, returns a severity classification like "minimal," "mild," "moderate," "moderately_severe," or "severe." This follows the standard PHQ-9 scoring guidelines used by healthcare professionals.

**`PHQ9_MAX_SCORE`**: A constant equal to 27, representing the highest possible score on the PHQ-9 assessment. We import this so we can display scores as fractions like "15/27".

### Why Separate Utility Functions?

There are several good reasons to keep these calculations outside the main App component:

1. **Single responsibility**: The App component focuses on UI and user interaction, while utility functions handle pure data transformation. Each piece has one clear job.

2. **Testability**: You can write unit tests for `calculatePHQ9Score` without needing to render any React components or simulate user clicks. Just call the function with test data and check the result.

3. **Reusability**: If you wanted to build a different interface for the same PHQ-9 assessment (say, a mobile app instead of a web page), you could reuse these utility functions without rewriting the scoring logic.

4. **Clarity**: When reading the App component, seeing `calculatePHQ9Score(answers)` is immediately understandable. If all that calculation code were inline, it would obscure what the component is actually doing.

This separation of concerns—keeping UI logic separate from business logic—is a fundamental principle of good software architecture that applies far beyond React and JavaScript.

---

## Part 15: Putting It All Together — The Complete Flow

Now that we've explored every piece individually, let's trace through what happens when someone uses the depression screener, step by step. This will help cement your understanding of how all these concepts work together in a real application.

### Step 1: Page Loads

1. The browser loads `index.html`, which contains an empty `<div id="root"></div>`
2. JavaScript files are loaded and executed
3. `main.jsx` runs, importing the App component and rendering it into the root div
4. The App component initializes its state:
   - `lang` starts as "th" (Thai)
   - `answers` is checked in localStorage; if found, previous answers are restored; otherwise it's an empty object `{}`
   - `submitted` starts as `false`
5. Since `submitted` is false, the quiz form view is rendered with all 9 questions

### Step 2: User Answers a Question

1. User clicks on "Several days" for question 3
2. The RadioGroup component detects the change and calls its `onValueChange` handler
3. Our wrapper function `(v) => handleAnswer(2, v)` is called with value "1" (the code for "Several days")
4. `handleAnswer` validates the input and updates the `answers` state using `setAnswers`
5. Because `answers` changed, the useEffect that saves to localStorage runs automatically
6. The user's progress is now safely stored in their browser
7. After a 50ms delay, the page smoothly scrolls down to question 4 (the next unanswered question)

### Step 3: User Switches Languages

1. User clicks the "English" button in the LanguageSwitcher component
2. The switcher calls its `onLanguageChange` prop with value "en"
3. This is actually our `setLang` function, so it updates the `lang` state to "en"
4. React re-renders the entire App component
5. Now `t = translations["en"]`, so all text displays in English instead of Thai
6. The user's answers are preserved because they're stored separately from the language setting

### Step 4: User Submits the Quiz

1. After answering all 9 questions, the Submit button becomes enabled (no longer disabled)
2. User clicks Submit
3. `handleSubmit` is called, which sets `submitted` to `true`
4. React re-renders the App component
5. This time, since `submitted` is true, the results view is rendered instead of the quiz form
6. The score is calculated using `calculatePHQ9Score(answers)`
7. The severity level is determined using `getPHQ9Severity(score)`
8. The user sees their score (e.g., "12/27") and severity classification ("Mild depression")

### Step 5: User Retakes the Quiz

1. User clicks the "Retake" button on the results page
2. `handleReset` is called, which clears the answers state and sets submitted back to false
3. localStorage is cleared so previous answers don't interfere with the new attempt
4. The quiz form view reappears, ready for a fresh start

This complete flow demonstrates how all the React concepts we've learned—components, props, state, effects, refs, event handlers, conditional rendering, and more—work together harmoniously to create an interactive, user-friendly application. Each concept plays its specific role, and understanding them individually makes it much easier to grasp how they combine into something greater than the sum of their parts.

---

## Part 16: Key Takeaways and Next Steps

Congratulations! You've now learned all the core React concepts used in this depression screening application. Let's review what you know:

✅ **Components** are functions that return JSX—they're the building blocks of your UI
✅ **JSX** lets you write HTML-like syntax inside JavaScript, with `{}` for embedding expressions
✅ **Props** pass data from parent components to child components
✅ **State** (via `useState`) lets components remember and update information over time
✅ **Effects** (via `useEffect`) run side effects when specific values change
✅ **Refs** (via `useRef`) hold references to DOM elements for direct manipulation
✅ **.map()** generates multiple components from arrays of data
✅ **Conditional rendering** shows different UI based on state or props
✅ **Event handlers** respond to user interactions like clicks and selections
✅ **CSS Modules** provide scoped, component-specific styling
✅ **Internationalization** supports multiple languages through translation objects
✅ **Utility functions** keep business logic separate from UI code

### What To Explore Next

Now that you understand this project inside and out, here are some suggestions for continuing your React journey:

1. **Build something small**: Try creating a simple to-do list app or a counter using the concepts you've learned. Hands-on practice is the best way to solidify your understanding.

2. **Learn about React Router**: This project has one page, but most real apps have multiple pages. React Router lets you navigate between them without reloading the browser.

3. **Explore state management libraries**: For larger applications with complex state, tools like Redux or Zustand can help manage data flow more efficiently than useState alone.

4. **Study TypeScript**: Many production React projects use TypeScript instead of plain JavaScript for better type safety and developer tooling support.

5. **Read the official React documentation**: Now that you have practical experience, the docs will make much more sense. Focus on topics like hooks reference, component lifecycle, and performance optimization.

Remember: learning to program is like learning a musical instrument or a new language. It takes time, practice, and patience. Don't be discouraged if some concepts feel confusing at first—even experienced developers look things up regularly. The important thing is that you're building understanding step by step, just like we did in this tutorial.

You've come a long way from not knowing what JSX was to understanding a complete, production-quality React application. Be proud of your progress, and keep going! 🐌✨