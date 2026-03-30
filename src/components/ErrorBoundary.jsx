import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('GreenBasket Error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#050a07',
          flexDirection: 'column',
          gap: 16,
          padding: 20,
        }}>
          <div style={{ fontSize: 48 }}>⚠️</div>
          <h2 style={{ color: '#f0fdf4', fontFamily: 'sans-serif' }}>Something went wrong</h2>
          <pre style={{
            color: '#86efac',
            background: 'rgba(34,197,94,0.05)',
            border: '1px solid rgba(34,197,94,0.2)',
            borderRadius: 12,
            padding: 16,
            fontSize: 12,
            maxWidth: 700,
            overflow: 'auto',
          }}>
            {this.state.error?.toString()}
          </pre>
          <button
            onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload(); }}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #22c55e, #10b981)',
              color: '#fff',
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 14,
              border: 'none',
            }}
          >
            Reload App
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
