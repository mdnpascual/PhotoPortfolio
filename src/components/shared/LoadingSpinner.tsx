import { SPINNER_SIZE, SPINNER_COLOR } from "../../config/constants";

interface LoadingSpinnerProps {
  size?: string;  // Tailwind class, default: SPINNER_SIZE
  color?: string; // Tailwind border class, default: SPINNER_COLOR
}

export default function LoadingSpinner({
  size = SPINNER_SIZE,
  color = SPINNER_COLOR,
}: LoadingSpinnerProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className={`${size} animate-spin rounded-full border-2 ${color} border-t-transparent`}
      />
    </div>
  );
}
