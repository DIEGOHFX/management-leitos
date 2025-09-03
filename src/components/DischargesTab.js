import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const DischargesTab = () => {
  const [discharges, setDischarges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for discharges
  const mockDischarges = [
    {
      id: 1,
      nomePaciente: 'Pedro Almeida',
      cpf: '111.222.333-44',
      leito: 'UTI 001',
      dataInternacao: '2024-01-10',
      dataAlta: '2024-01-18',
      tipoAlta: 'CURA',
      medico: 'Dr. Roberto Silva',
      observacoes: 'Paciente recuperado completamente'
    },
    {
      id: 2,
      nomePaciente: 'Ana Costa',
      cpf: '555.666.777-88',
      leito: 'ENF 015',
      dataInternacao: '2024-01-12',
      dataAlta: '2024-01-19',
      tipoAlta: 'TRANSFERENCIA',
      medico: 'Dra. Maria Santos',
      observacoes: 'Transferido para hospital especializado'
    }
  ];

  useEffect(() => {
    setDischarges(mockDischarges);
  }, []);

  const filteredDischarges = discharges.filter(discharge => 
    Object.values(discharge).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleExportXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredDischarges);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Altas');
    XLSX.writeFile(workbook, 'altas.xlsx');
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const getTipoAltaColor = (tipo) => {
    switch (tipo) {
      case 'CURA': return 'var(--accent-success)';
      case 'TRANSFERENCIA': return 'var(--accent-secondary)';
      case 'OBITO': return 'var(--accent-danger)';
      case 'EVASAO': return 'var(--warning-color)';
      default: return 'var(--text-primary)';
    }
  };

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Altas e Histórico</h2>
        <div className="main-actions">
          <div className="search-container">
            <input
              className="search-input"
              type="search"
              placeholder="Buscar altas..."
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
          
          <button className="btn btn-primary">
            Registrar Alta
          </button>
          
          <button className="btn btn-success" onClick={handleExportXLSX}>
            Exportar .XLSX
          </button>
        </div>
      </div>
      
      <div className="table-container">
        <table className="management-table">
          <thead>
            <tr>
              <th>Nome Paciente</th>
              <th>CPF</th>
              <th>Leito</th>
              <th>Data Internação</th>
              <th>Data Alta</th>
              <th>Tipo Alta</th>
              <th>Médico</th>
              <th>Observações</th>
              <th className="th-editar">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredDischarges.map(discharge => (
              <tr key={discharge.id}>
                <td>{discharge.nomePaciente}</td>
                <td>{discharge.cpf}</td>
                <td>{discharge.leito}</td>
                <td>{new Date(discharge.dataInternacao).toLocaleDateString('pt-BR')}</td>
                <td>{new Date(discharge.dataAlta).toLocaleDateString('pt-BR')}</td>
                <td>
                  <span style={{ 
                    color: getTipoAltaColor(discharge.tipoAlta),
                    fontWeight: '500'
                  }}>
                    {discharge.tipoAlta}
                  </span>
                </td>
                <td>{discharge.medico}</td>
                <td>{discharge.observacoes}</td>
                <td>
                  <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                    Ver Detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredDischarges.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: 'var(--text-secondary)' 
          }}>
            Nenhuma alta encontrada
          </div>
        )}
      </div>
    </div>
  );
};

export default DischargesTab;
