import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import { cn } from "cn"
import styles from "./progress.module.css"
function Progress({ className, children, value, ...props }) {
  return (
    <ProgressPrimitive.Root
      value={value}
      data-slot="progress"
      className={cn(styles.progress, className)}
      {...props}
    >
      {children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressPrimitive.Root>
  )
}

function ProgressTrack({ className, ...props }) {
  return (
    <ProgressPrimitive.Track
      className={cn(styles.track, className)}
      data-slot="progress-track"
      {...props}
    />
  )
}

function ProgressIndicator({ className, ...props }) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn(styles.indicator, className)}
      {...props}
    />
  )
}

export { Progress, ProgressTrack, ProgressIndicator }
