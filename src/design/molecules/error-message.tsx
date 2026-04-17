import { Button } from '@/design/atoms/button';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-red-500/30 bg-red-500/10 px-6 py-8 text-center">
      <span className="text-3xl">⚠️</span>
      <p className="text-sm text-red-300">{message}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Reintentar
        </Button>
      )}
    </div>
  );
}