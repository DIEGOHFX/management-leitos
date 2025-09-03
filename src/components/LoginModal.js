import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LoginModal = () => {
  const [credentials, setCredentials] = useState({ login: '', senha: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(credentials);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'var(--surface-color)',
        padding: '40px',
        borderRadius: 'var(--border-radius)',
        boxShadow: 'var(--shadow)',
        width: '100%',
        maxWidth: '400px',
        margin: '20px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <svg fill="none" height="48" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="48" style={{ color: 'var(--accent-primary)', marginBottom: '16px' }}>
            <rect height="7" width="7" x="3" y="3"></rect>
            <rect height="7" width="7" x="14" y="3"></rect>
            <rect height="7" width="7" x="14" y="14"></rect>
            <rect height="7" width="7" x="3" y="14"></rect>
          </svg>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>
            Sistema de Gestão Hospitalar
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Faça login para acessar o sistema
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-primary)' }}>
              Login
            </label>
            <input
              type="text"
              name="login"
              value={credentials.login}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--border-radius)',
                background: 'var(--bg-main)',
                color: 'var(--text-primary)',
                fontSize: '1rem'
              }}
              placeholder="Digite seu login"
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-primary)' }}>
              Senha
            </label>
            <input
              type="password"
              name="senha"
              value={credentials.senha}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--border-radius)',
                background: 'var(--bg-main)',
                color: 'var(--text-primary)',
                fontSize: '1rem'
              }}
              placeholder="Digite sua senha"
            />
          </div>

          {error && (
            <div style={{
              background: 'var(--accent-danger)',
              color: 'white',
              padding: '12px',
              borderRadius: 'var(--border-radius)',
              marginBottom: '20px',
              fontSize: '0.9rem'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '1rem',
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
