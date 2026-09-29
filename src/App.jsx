import { useState, useEffect } from "react"
import styles from "./App.module.css"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group"
import { Label } from "./components/ui/label"
import { Button } from "./components/ui/button"
import { Progress } from "./components/ui/progress"
import { LanguageSwitcher } from "./components/language-switcher"
import { getPHQ9Severity, calculatePHQ9Score, PHQ9_MAX_SCORE } from "./lib/utils"
import { translations } from "./lib/translations"

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

  useEffect(() => {
    localStorage.setItem("phq9-answers", JSON.stringify(answers))
  }, [answers])

  const answeredCount = Object.keys(answers).length
  const progressPercent = (answeredCount / QUESTION_COUNT) * 100

  function handleAnswer(index, value) {
    if (!["0", "1", "2", "3"].includes(value)) return
    setAnswers((prev) => ({ ...prev, [index]: value }))
  }

  function handleSubmit() {
    if (answeredCount < QUESTION_COUNT) return
    setSubmitted(true)
  }

  function handleReset() {
    setAnswers({})
    setSubmitted(false)
    localStorage.removeItem("phq9-answers")
  }

  if (submitted) {
    const score = calculatePHQ9Score(answers)
    const severityKey = getPHQ9Severity(score)
    const severityClass = styles["severity" + severityKey.charAt(0).toUpperCase() + severityKey.slice(1)]

    return (
      <div className={styles.app}>
        <Card className={styles.container}>
          <CardHeader>
            <CardTitle>{t.title}</CardTitle>
          </CardHeader>
          <CardContent className={styles.resultContainer}>
            <p className={styles.scoreDisplay}>{score}/{PHQ9_MAX_SCORE}</p>
            <p className={`${styles.severityLabel} ${severityClass}`}>
              {t.severity[severityKey]}
            </p>
            <div className={styles.resultActions}>
              <Button onClick={handleReset} variant="outline" style={{ fontSize: '1.2rem' }}>
                {t.retake}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={styles.app}>
      <Card className={styles.container}>
        <div className={styles.fixedHeader}>
          <div className={styles.titleRow}>
            <CardTitle>{t.title}</CardTitle>
            <LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />
          </div>
          <CardDescription style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e40af', letterSpacing: '0.03em' }}>{t.description}</CardDescription>
          <div className={styles.submitRow}>
            <Button
              onClick={handleSubmit}
              disabled={answeredCount < QUESTION_COUNT}
              className={styles.submitButton}
              size="lg"
              style={{ backgroundColor: '#0f172a' }}
            >
              {answeredCount < QUESTION_COUNT
                ? t.remaining(QUESTION_COUNT - answeredCount)
                : t.submit}
            </Button>
            <Button onClick={handleReset} variant="outline" className={styles.clearButton} size="lg">
              {t.clear}
            </Button>
          </div>
        </div>
        <CardContent>

          <div className={styles.progressContainer}>
            <Progress value={progressPercent} />
          </div>

          {Array.from({ length: QUESTION_COUNT }).map((_, i) => (
            <div
              key={i}
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
    </div>
  )
}
