import { cn } from "@/lib/utils"

export interface AdPlaceholderProps {
  id: string
  format: "horizontal" | "vertical" | "square"
  className?: string
}

export function AdPlaceholder({ id, format, className }: AdPlaceholderProps) {
  /* REPLACE WITH ACTUAL ADSENSE CODE */

  // Set dimensions based on format
  const dimensions = {
    horizontal: "h-[90px] md:h-[90px] w-full",
    vertical: "h-[600px] w-full md:w-[160px]",
    square: "h-[250px] w-full md:w-[300px] mx-auto",
  }

  return (
    <div
      id={`ad-${id}`}
      className={cn(
        "border-2 border-dashed border-gray-300 bg-gray-100 bg-opacity-50 flex items-center justify-center relative overflow-hidden",
        dimensions[format],
        className,
      )}
      data-ad-placeholder="true"
      data-ad-format={format}
    >
      <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-gray-300 to-gray-400 bg-stripes bg-stripes-white"></div>
      <span className="text-gray-500 font-medium text-sm">AD PLACEHOLDER</span>
    </div>
  )
}

