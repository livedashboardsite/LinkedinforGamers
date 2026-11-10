import React, { Component, type ReactNode } from 'react';
import { ShieldAlert, RefreshCw, Home, Terminal } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('NEXUS Recovery System Caught Anomaly:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleHardReset = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('nexus_profile_v2');
        localStorage.removeItem('nexus_posts_v2');
        localStorage.removeItem('nexus_jobs_v2');
        localStorage.removeItem('nexus_notifications_v2');
        window.location.reload();
      }
    } catch {
      window.location.reload();
    }
  };

  handleSoftReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-screen animate-fade-in">
          <div className="error-boundary-card glass-card">
            <div className="error-icon-pulse">
              <ShieldAlert size={36} className="text-rose" />
            </div>

            <h2 className="error-heading">
              {this.props.fallbackTitle || 'SYSTEM TELEMETRY ANOMALY DETECTED'}
            </h2>

            <p className="error-subtext">
              An unexpected render fault occurred in the mobile view buffer. The Nexus fail-safe subroutines have protected your session.
            </p>

            <div className="error-actions-group">
              <button 
                onClick={this.handleSoftReset}
                className="btn-glow-primary error-btn"
              >
                <RefreshCw size={15} />
                <span>Recover & Rerender View</span>
              </button>

              <button 
                onClick={this.handleHardReset}
                className="btn-secondary error-btn"
              >
                <Terminal size={15} />
                <span>Reset Local Cache & Reload</span>
              </button>

              <button 
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.location.href = '/';
                  }
                }}
                className="btn-ghost-secondary error-btn"
              >
                <Home size={15} />
                <span>Return to Home</span>
              </button>
            </div>

            {this.state.error && (
              <details className="error-tech-details">
                <summary className="error-details-summary">Technical Fault Diagnostic</summary>
                <pre className="error-stack-text">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
