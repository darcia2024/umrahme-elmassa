import { Component, type ReactNode } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error('App error:', error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#fafaf9', padding: '24px', textAlign: 'center',
        }}>
          <div style={{ maxWidth: 360 }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%', background: 'rgba(67,56,202,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px',
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4338ca" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12" y2="17" />
              </svg>
            </div>
            <h1 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
              Ada kendala sebentar
            </h1>
            <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6, marginBottom: 22 }}>
              Maaf, terjadi gangguan saat memuat halaman. Silakan muat ulang — datamu aman.
            </p>
            <button onClick={this.handleReload} style={{
              padding: '12px 28px', borderRadius: 12, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #4338ca 0%, #4f46e5 100%)', color: '#fff',
              fontSize: 14, fontWeight: 600,
            }}>
              Muat Ulang
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
