import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva } from "class-variance-authority"
import { cn } from "cn"
import styles from "./button.module.css"

const buttonVariants = cva(styles.button, {
  variants: {
    variant: {
      default: styles.default,
      outline: styles.outline,
      secondary: styles.secondary,
      ghost: styles.ghost,
      destructive: styles.destructive,
      link: styles.link,
    },
    size: {
      default: styles.defaultSize,
      xs: styles.xs,
      sm: styles.sm,
      lg: styles.lg,
      icon: styles.icon,
      "icon-xs": styles.iconXs,
      "icon-sm": styles.iconSm,
      "icon-lg": styles.iconLg,
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

function Button({ className, variant = "default", size = "default", ...props }) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
