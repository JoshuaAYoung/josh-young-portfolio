// TODO
// reimplement GA?
import React, { Component } from 'react';

interface ErrorFallbackComponentProps {
  error: Error | null;
}

export const ErrorFallbackComponent: React.FC<ErrorFallbackComponentProps> = ({
  error,
}) => {
  // const handleError = (errorMessage = 'error boundary on react app') => {
  //   ReactGA.event({
  //     category: 'Errors',
  //     action: errorMessage,
  //     label: 'error boundary',
  //   });
  // };

  // useEffect(() => {
  //   const page = window.location.pathname;
  //   const date = new Date().toLocaleDateString();
  //   const message = error?.message || 'Unknown error';
  // const errorMessage = `Error: ${message} on route: ${page} on date: ${date}`;
  // handleError(errorMessage);
  // }, [error]);

  return (
    <div style={{ padding: 20, margin: 20, background: 'hotpink' }}>
      <h3>Something went wrong</h3>
      <p>{error?.message}</p>
    </div>
  );
};

interface ErrorBoundaryProps {
  children: React.ReactNode;
  Fallback: React.ComponentType<{ error: Error | null }>;
}

interface ErrorBoundaryState {
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error(error);
    return { error };
  }

  render() {
    const { error } = this.state;
    const { children, Fallback } = this.props;

    if (error) return <Fallback error={error} />;
    return children;
  }
}

export default ErrorBoundary;
