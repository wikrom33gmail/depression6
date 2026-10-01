import styles from "./App.module.css"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group"
import { Label } from "./components/ui/label"
import { Button } from "./components/ui/button"
import { Progress } from "./components/ui/progress"
import { LanguageSwitcher } from "./components/language-switcher"
import { getPHQ9Severity, calculatePHQ9Score, PHQ9_MAX_SCORE } from "./lib/utils"
import { translations } from "./lib/translations"
import { useState, useEffect, useRef } from "react"
const QUESTION_COUNT = 9


export default function App() {
  const [lang, setLang] = useState("th")
  const t = translations[lang]

  const [answers, setAnswers] = useState(() => {
    try {
      const saved = localStorage.getItem("phq9-answers")
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  const [submitted, setSubmitted] = useState(false)
const questionRefs = Array.from({ length: QUESTION_COUNT }, () => useRef(null))

  useEffect(() => {
    localStorage.setItem("phq9-answers", JSON.stringify(answers))
  }, [answers])

  const answeredCount = Object.keys(answers).length
  const progressPercent = (answeredCount / QUESTION_COUNT) * 100

  function handleAnswer(index, value) {
    if (!["0", "1", "2", "3"].includes(value)) return
    setAnswers((prev) => {
      const updated = { ...prev, [index]: value }
      setTimeout(() => {
        // Find next unanswered question, wrapping around
        let targetIndex = -1
        for (let offset = 1; offset <= QUESTION_COUNT; offset++) {
          const candidate = (index + offset) % QUESTION_COUNT
          if (updated[candidate] === undefined) {
            targetIndex = candidate
            break
          }
        }
        if (targetIndex !== -1 && questionRefs[targetIndex]?.current) {
          questionRefs[targetIndex].current.scrollIntoView({ behavior: "smooth", block: "center" })
        }
      }, 50)
      return updated
    })
  }
function handleSubmit() {
    if (answeredCount >= QUESTION_COUNT) {
      setSubmitted(true)
      return
    }
    if (answeredCount < 7) return
    const firstUnanswered = [0, 1, 2, 3, 4, 5, 6, 7, 8].find((i) => answers[i] === undefined)
    if (firstUnanswered !== undefined && questionRefs[firstUnanswered]?.current) {
      questionRefs[firstUnanswered].current.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }


  function handleReset() {
    setAnswers({})
    setSubmitted(false)
    localStorage.removeItem("phq9-answers")
  }

  if (submitted) {
    const score = calculatePHQ9Score(answers)
    const severityKey = getPHQ9Severity(score)
    const severityClass = styles[
      "severity" +
      severityKey.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("")
    ]

    return (
      <div className={styles.app}>
        <Card className={styles.container}>
          <div className={styles.fixedHeader}>
            <div className={styles.titleRow}>
              <CardTitle>{t.title}</CardTitle>
            </div>
            <div className={styles.langRow}>
              <LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />
            </div>
            <div className={styles.subtitleRow}>
              <CardDescription style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e40af' }}>{t.description}</CardDescription>
            </div>
          </div>
          <CardContent className={styles.resultContainer}>
            <p className={styles.scoreDisplay}>{score}/{PHQ9_MAX_SCORE}</p>
            <p className={`${styles.severityLabel} ${severityClass}`}>
              {t.severity[severityKey]}
            </p>
          </CardContent>
        </Card>
        <div className={styles.fixedFooter}>
          <div className={styles.buttonRow}>
            <Button onClick={() => setSubmitted(false)} variant="outline" className={styles.submitButton} size="lg" style={{ backgroundColor: '#1e40af', color: 'white', width: '60%' }}>
              {t.back}
            </Button>
            <Button onClick={handleReset} variant="outline" className={styles.clearButton} size="lg" style={{ backgroundColor: 'white', color: '#1e40af', border: '2px solid #1e40af', width: '40%' }}>
              {t.retake}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.app}>
      <Card className={styles.container}>
        <div className={styles.fixedHeader}>
          <div className={styles.titleRow}>
            <CardTitle>{t.title}</CardTitle>
          </div>
          <div className={styles.langRow}>
            <LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />
          </div>
          <div className={styles.subtitleRow}>
            <CardDescription style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e40af' }}>{t.description}</CardDescription>
          </div>
        </div>
        <CardContent>


          {Array.from({ length: QUESTION_COUNT }).map((_, i) => (
            <div
              key={i}
ref={questionRefs[i]}
              className={`${styles.questionCard} ${
                answeredCount >= 7 && !answers[i] ? styles.highlighted : ""
              }`}
            >
              <p className={styles.questionText}>
                {i + 1}. {t.questions[i]}
              </p>
              <RadioGroup
                value={answers[i] ?? ""}
                onValueChange={(v) => handleAnswer(i, v)}
              >
                {t.options.map((opt) => (
                  <Label
                    key={opt.value}
                    htmlFor={`q${i}-${opt.value}`}
                    className={styles.optionLabel}
                    style={{ fontSize: '1.375rem' }}
                  >
                    <RadioGroupItem value={opt.value} id={`q${i}-${opt.value}`} />
                    <span>{opt.label}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>
          ))}
        </CardContent>
      </Card>
      <div className={styles.fixedFooter}>
        <div className={styles.progressContainer}>
          <Progress value={progressPercent} />
        </div>
        <div className={styles.buttonRow}>
          <Button
            onClick={handleSubmit}
disabled={answeredCount < QUESTION_COUNT}
            className={styles.submitButton}
            size="lg"
            style={{ backgroundColor: '#1e40af', color: 'white', width: '60%' }}
          >
            {answeredCount < QUESTION_COUNT
              ? t.remaining(QUESTION_COUNT - answeredCount)
              : t.submit}
          </Button>
          <Button onClick={handleReset} variant="outline" className={styles.clearButton} size="lg" style={{ backgroundColor: 'white', color: '#1e40af', border: '2px solid #1e40af', width: '40%' }}>
            {t.clear}
          </Button>
        </div>
      </div>
    </div>
  )
}
