import { Beer, Utensils, Music } from "lucide-react"

interface KeyInfoProps {
  realAles: string
  foodService: string
  entertainment: string
}

export function KeyInfoGrid({ realAles, foodService, entertainment }: KeyInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
        <Beer className="h-5 w-5 text-primary shrink-0" />
        <div>
          <h3 className="font-medium">Real Ales</h3>
          <p className="text-sm text-muted-foreground">{realAles}</p>
        </div>
      </div>
      <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
        <Utensils className="h-5 w-5 text-primary shrink-0" />
        <div>
          <h3 className="font-medium">Food Service</h3>
          <p className="text-sm text-muted-foreground">{foodService}</p>
        </div>
      </div>
      <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
        <Music className="h-5 w-5 text-primary shrink-0" />
        <div>
          <h3 className="font-medium">Entertainment</h3>
          <p className="text-sm text-muted-foreground">{entertainment}</p>
        </div>
      </div>
    </div>
  )
}

