import { getLocalsVsTouristsLabel } from "@/lib/utils"

interface LocalsTouristsSliderProps {
  value: number // 0-100 scale (0 = all locals, 100 = all tourists)
  showLabel?: boolean
  size?: "sm" | "md" | "lg"
}

export function LocalsTouristsSlider({ value, showLabel = true, size = "md" }: LocalsTouristsSliderProps) {
  const label = getLocalsVsTouristsLabel(value)

  const sizeClasses = {
    sm: "h-1 w-full",
    md: "h-1.5 w-full",
    lg: "h-2 w-full",
  }

  const labelSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Locals</span>
        <span>Tourists</span>
      </div>
      <div className="relative">
        <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-r from-emerald-600 to-blue-600`}></div>
        <div
          className="h-5 w-5 absolute rounded-full bg-white border-2 border-gray-800 shadow-md"
          style={{
            left: `${value}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        ></div>
      </div>
    </div>
  )
}

