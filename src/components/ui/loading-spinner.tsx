
import { Loader } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

export function LoadingSpinner({ size = 24, className = "" }: LoadingSpinnerProps) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Loader className="animate-spin text-brand-600" size={size} />
    </div>
  );
}

export function FullPageLoader() {
  return (
    <div className="fixed inset-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="text-center">
        <LoadingSpinner size={40} />
        <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    </div>
  );
}
