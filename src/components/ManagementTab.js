import React from 'react';

const ManagementTab = () => {
  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Gerenciamento</h2>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px',
        padding: '20px 0'
      }}>
        <div style={{
          background: 'var(--bg-main)',
          padding: '20px',
          borderRadius: 'var(--border-radius)',
          border: '1px solid var(--border-color)'
        }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px' }}>
            Relatórios
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button className="btn btn-primary">Relatório de Ocupação</button>
            <button className="btn btn-primary">Relatório de Altas</button>
            <button className="btn btn-primary">Relatório Financeiro</button>
          </div>
        </div>

        <div style={{
          background: 'var(--bg-main)',
          padding: '20px',
          borderRadius: 'var(--border-radius)',
          border: '1px solid var(--border-color)'
        }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px' }}>
            Configurações
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button className="btn btn-secondary">Configurar Postos</button>
            <button className="btn btn-secondary">Tipos de Leito</button>
            <button className="btn btn-secondary">Categorias</button>
          </div>
        </div>

        <div style={{
          background: 'var(--bg-main)',
          padding: '20px',
          borderRadius: 'var(--border-radius)',
          border: '1px solid var(--border-color)'
        }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px' }}>
            Backup e Dados
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button className="btn btn-success">Backup Completo</button>
            <button className="btn btn-warning">Importar Dados</button>
            <button className="btn btn-danger">Limpar Cache</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementTab;
