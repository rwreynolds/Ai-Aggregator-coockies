// components/ui/Slider.tsx
import { cn } from "@/lib/utils";

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  label?: string;
  className?: string;
  displayValue?: boolean;
}

export function Slider({
  min,
  max,
  step = 1,
  value,
  onChange,
  label,
  className,
  displayValue = true,
}: SliderProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between">
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}
        {displayValue && (
          <span className="text-sm text-gray-500">{value}</span>
        )}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-xs text-gray-500">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}