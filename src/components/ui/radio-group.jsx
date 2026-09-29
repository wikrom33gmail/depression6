import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { cn } from "cn"
import styles from "./radio-group.module.css"

function RadioGroup({ className, ...props }) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn(styles.radioGroup, className)}
      {...props}
    />
  )
}

function RadioGroupItem({ className, value, id, ...props }) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      name={id}
      value={value}
      id={id}
      className={cn(styles.radioItem, className)}
      {...props}
    >
      <span className={styles.srOnly}>radio</span>
      <span className={styles.indicator}>
        <span className={styles.dot} />
      </span>
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }
