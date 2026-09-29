import styles from "./language-switcher.module.css"
import { Button } from "./ui/button"

const LANGUAGES = [
  { code: "th", label: "ไทย" },
  { code: "my", label: "မြန်မာ" },
  { code: "km", label: "ខ្មែរ" },
  { code: "en", label: "English" },
]

export function LanguageSwitcher({ currentLang, onLanguageChange }) {
  return (
    <div className={styles.container}>
      {LANGUAGES.map(({ code, label }) => (
        <Button
          key={code}
          onClick={() => onLanguageChange(code)}
          variant={currentLang === code ? "default" : "outline"}
          size="sm"
          className={styles.buttonText}
        >
          {label}
        </Button>
      ))}
    </div>
  )
}
