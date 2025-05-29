import React, { Component } from 'react';
import { AlertTriangleIcon } from 'lucide-react';
interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
  error: Error | null;
}
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };
  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    // Here you would log the error to an error reporting service
  }
  public render() {
    if (this.state.hasError) {
      return <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            <AlertTriangleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-3">
              Something Went Wrong
            </h1>
            <p className="text-gray-600 mb-6">
              We're sorry, but there was an unexpected error. Our team has been
              notified.
            </p>
            <div className="space-y-4">
              <button onClick={() => window.location.reload()} className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors">
                Reload Application
              </button>
              <a href="/" className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors">
                Return to Homepage
              </a>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              If the problem persists, please contact support at
              support@cardiactek.com
            </p>
          </div>
        </div>;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;