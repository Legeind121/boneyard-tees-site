import { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Error Boundary component to catch React errors and prevent app crashes
 * Displays a fallback UI when errors occur in child components
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging (development only)
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // You can also log to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#0a0e27',
          color: '#e0e7ff',
          padding: '2rem',
          textAlign: 'center',
          fontFamily: 'Ardillah Kafi, sans-serif'
        }}>
          <div style={{
            maxWidth: '600px',
            padding: '2rem',
            border: '2px solid #ff006e',
            borderRadius: '10px',
            backgroundColor: '#1a1f3a'
          }}>
            <h1 style={{
              fontSize: '2.5rem',
              marginBottom: '1rem',
              color: '#ff006e',
              textShadow: '0 0 20px #ff006e'
            }}>
              Oops! Something Broke
            </h1>
            <p style={{
              fontSize: '1.2rem',
              marginBottom: '2rem',
              color: '#a8b2d1'
            }}>
              Merica knocked something over. Don't worry, we're on it.
            </p>
            <button
              onClick={this.handleReset}
              style={{
                padding: '0.75rem 2rem',
                fontSize: '1.1rem',
                backgroundColor: '#ff006e',
                color: '#0a0e27',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                marginRight: '1rem'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 0 20px #ff006e';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.href = '/'}
              style={{
                padding: '0.75rem 2rem',
                fontSize: '1.1rem',
                backgroundColor: 'transparent',
                color: '#00f5ff',
                border: '2px solid #00f5ff',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#00f5ff';
                e.target.style.color = '#0a0e27';
                e.target.style.boxShadow = '0 0 20px #00f5ff';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#00f5ff';
                e.target.style.boxShadow = 'none';
              }}
            >
              Go Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
