import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const HistoryTab = () => {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // Mock data for history
  const mockHistory = [
    {
      id: 1,
      dataHora: '2024-01-20 14:30:00',
      usuario: 'admin',
      acao: 'INTERNACAO',
      paciente: 'João Silva Santos',
      leito: 'UTI 001',
      detalhes: 'Paciente internado na UTI'
    },
    {
      id: 2,
      dataHora: '2024-01-20 15:45:00',
      usuario: 'enfermeira1',
      acao: 'MUDANCA_STATUS',
      paciente: 'Maria Costa',
      leito: 'ENF 015',
      detalhes: 'Status alterado para LIMPEZA'
    },
    {
      id: 3,
      dataHora: '2024-01-19 10:20:00',
      usuario: 'medico1',
      acao: 'ALTA',
      paciente: 'Pedro Almeida',
      leito: 'UTI 003',
      detalhes: 'Alta médica por cura'
    }
  ];

  useEffect(() => {
    setHistory(mockHistory);
  }, []);

  const filteredHistory = history.filter(item => {
    const matchesSearch = Object.values(item).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesDate = !dateFilter || item.dataHora.includes(dateFilter);
    return matchesSearch && matchesDate;
  });

  const handleExportXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredHistory);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Histórico');
    XLSX.writeFile(workbook, 'historico.xlsx');
  };

  const clearSearch = () => {
    setSearchTerm('');
    setDateFilter('');
  };

  const getAcaoColor = (acao) => {
    switch (acao) {
      case 'INTERNACAO': return 'var(--accent-primary)';
      case 'ALTA': return 'var(--accent-success)';
      case 'MUDANCA_STATUS': return 'var(--warning-color)';
      case 'TRANSFERENCIA': return 'var(--accent-secondary)';
      default: return 'var(--text-primary)';
    }
  };

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Histórico de Movimentações</h2>
        <div className="main-actions">
          <div className="search-container">
            <input
              className="search-input"
              type="search"
              placeholder="Buscar no histórico..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              className="clear-search-btn" 
              onClick={clearSearch}
              title="Limpar busca"
            >
              <svg fill="currentColor" height="18" viewBox="0 0 24 24" width="18">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
              </svg>
            </button>
          </div>
          
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            style={{
              background: 'var(--bg-main)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              padding: '10px 12px',
              borderRadius: 'var(--border-radius)',
              fontSize: '0.9rem'
            }}
          />
          
          <button className="btn btn-success" onClick={handleExportXLSX}>
            Exportar .XLSX
          </button>
        </div>
      </div>
      
      <div className="table-container">
        <table className="management-table">
          <thead>
            <tr>
              <th>Data/Hora</th>
              <th>Usuário</th>
              <th>Ação</th>
              <th>Paciente</th>
              <th>Leito</th>
              <th>Detalhes</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map(item => (
              <tr key={item.id}>
                <td>{new Date(item.dataHora).toLocaleString('pt-BR')}</td>
                <td>{item.usuario}</td>
                <td>
                  <span style={{ 
                    color: getAcaoColor(item.acao),
                    fontWeight: '500'
                  }}>
                    {item.acao}
                  </span>
                </td>
                <td>{item.paciente}</td>
                <td>{item.leito}</td>
                <td>{item.detalhes}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredHistory.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: 'var(--text-secondary)' 
          }}>
            Nenhum registro encontrado
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryTab;
