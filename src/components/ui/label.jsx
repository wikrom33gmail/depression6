import { cn } from "cn"
import styles from "./label.module.css"

function Label({ className, disabled, ...props }) {
  return (
    <label
      data-slot="label"
      data-disabled={disabled}
      className={cn(styles.label, className)}
      {...props}
    />
  )
}

export { Label }
