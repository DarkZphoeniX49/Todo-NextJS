'use client';
import { signIn } from 'next-auth/react';

const containerStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  padding: '2rem'
};

const headingStyle = {
  fontSize: '28px',
  fontWeight: 700,
  marginBottom: '24px',
  color: '#111827',
  textAlign: 'center'
};

const loginButtonStyle = {
  backgroundColor: '#3b82f6',
  color: '#fff',
  padding: '12px 24px',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: 600,
  cursor: 'pointer',
  border: 'none',
  display: 'block',
  margin: '0 auto'
};

export default function LoginPage() {
  return (
    <main style={containerStyle}>
      <h1 style={headingStyle}>Connect to access to your tasks</h1>
      <button
        onClick={() => signIn('google', { callbackUrl: '/todo' })}
        style={loginButtonStyle}
      >
        Connect with Google
      </button>
    </main>
  );
}
