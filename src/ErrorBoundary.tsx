import React, { ReactNode, useEffect, useState } from 'react';

interface ErrorFallbackComponentProps {
  error: Error | null;
}

function ErrorFallbackComponent({ error }: ErrorFallbackComponentProps) {
  return (
    <div style={{ padding: 20, margin: 20, background: 'hotpink' }}>
      <h3>Something went wrong</h3>
      <p>{error?.message}</p>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: ReactNode;
  Fallback: React.ComponentType<{ error: Error }>;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  children,
  Fallback,
}) => {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      setError(event.error);
    };

    window.addEventListener('error', handleError);
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  if (error) {
    return <Fallback error={error} />;
  }

  return children as React.ReactElement;
};

export { ErrorFallbackComponent, ErrorBoundary };
