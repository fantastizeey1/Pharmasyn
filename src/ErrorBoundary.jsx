import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to an error reporting service
    console.error("Error caught in ErrorBoundary:", error);
    console.error("Error info:", errorInfo);

    // Optionally log to an external service
    // logErrorToService(error, errorInfo);

    this.setState({ error, errorInfo });
  }

  handleReset = () => {
    // Reset the state to try rendering children again
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.errorContainer}>
          <h1 style={styles.errorMessage}>Something went wrong.</h1>
          {this.state.error && (
            <p style={styles.errorDetails}>
              Error: {this.state.error.toString()}
            </p>
          )}
          {this.state.errorInfo && (
            <details style={styles.errorStack}>
              <summary>Click for more info</summary>
              <pre>{this.state.errorInfo.componentStack}</pre>
            </details>
          )}
          <button onClick={this.handleReset} style={styles.resetButton}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Basic styles for the error message
const styles = {
  errorContainer: {
    padding: "20px",
    borderRadius: "5px",
    backgroundColor: "#f8d7da",
    color: "#721c24",
    margin: "20px",
  },
  errorMessage: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  errorDetails: {
    marginTop: "10px",
  },
  errorStack: {
    marginTop: "10px",
    whiteSpace: "pre-wrap", // Preserve whitespace in stack trace
  },
  resetButton: {
    marginTop: "20px",
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
};

export default ErrorBoundary;
