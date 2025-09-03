import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const ElectiveMapTab = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isolationFilter, setIsolationFilter] = useState(false);

  // Mock data for elective patients
  const mockPatients = [
    {
      id: 1,
      nomePaciente: 'João Silva Santos',
      dataNascimento: '1985-03-15',
      cpf: '123.456.789-00',
      convenio: 'Unimed',
      procedimento: 'Cirurgia Cardíaca',
      medico: 'Dr. Carlos Lima',
      dataAgendamento: '2024-01-20',
      status: 'AGENDADO',
      isolamento: 'NAO'
    },
    {
      id: 2,
      nomePaciente: 'Maria Oliveira Costa',
      dataNascimento: '1978-07-22',
      cpf: '987.654.321-00',
      convenio: 'Bradesco Saúde',
      procedimento: 'Cirurgia Ortopédica',
      medico: 'Dr. Ana Santos',
      dataAgendamento: '2024-01-21',
      status: 'CONFIRMADO',
      isolamento: 'SIM'
    }
  ];

  useEffect(() => {
    setPatients(mockPatients);
  }, []);

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = Object.values(patient).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesIsolation = !isolationFilter || patient.isolamento === 'SIM';
    return matchesSearch && matchesIsolation;
  });

  const handleExportXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredPatients);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Mapa Eletivo');
    XLSX.writeFile(workbook, 'mapa-eletivo.xlsx');
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'AGENDADO': return 'var(--warning-color)';
      case 'CONFIRMADO': return 'var(--accent-success)';
      case 'CANCELADO': return 'var(--accent-danger)';
      case 'REALIZADO': return 'var(--accent-secondary)';
      default: return 'var(--text-primary)';
    }
  };

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Mapa Eletivo</h2>
        <div className="main-actions">
          <div className="search-container">
            <input
              className="search-input"
              type="search"
              placeholder="Buscar pacientes..."
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
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontSize: '0.9rem', marginLeft: '15px' }}>
            <input 
              type="checkbox" 
              checked={isolationFilter}
              onChange={(e) => setIsolationFilter(e.target.checked)}
              style={{ accentColor: 'var(--primary-color)', transform: 'scale(1.1)' }}
            />
            Filtrar Isolamento
          </label>
          
          <button className="btn btn-secondary">
            Importar
          </button>
          
          <button className="btn btn-primary">
            Cadastrar Paciente
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
              <th>Data Nasc.</th>
              <th>CPF</th>
              <th>Convênio</th>
              <th>Procedimento</th>
              <th>Médico</th>
              <th>Data Agendamento</th>
              <th>Status</th>
              <th>Isolamento</th>
              <th className="th-editar">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map(patient => (
              <tr key={patient.id}>
                <td>{patient.nomePaciente}</td>
                <td>{new Date(patient.dataNascimento).toLocaleDateString('pt-BR')}</td>
                <td>{patient.cpf}</td>
                <td>{patient.convenio}</td>
                <td>{patient.procedimento}</td>
                <td>{patient.medico}</td>
                <td>{new Date(patient.dataAgendamento).toLocaleDateString('pt-BR')}</td>
                <td>
                  <span style={{ 
                    color: getStatusColor(patient.status),
                    fontWeight: '500'
                  }}>
                    {patient.status}
                  </span>
                </td>
                <td>
                  <span style={{ 
                    color: patient.isolamento === 'SIM' ? 'var(--accent-danger)' : 'var(--accent-success)'
                  }}>
                    {patient.isolamento}
                  </span>
                </td>
                <td>
                  <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredPatients.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: 'var(--text-secondary)' 
          }}>
            Nenhum paciente encontrado
          </div>
        )}
      </div>
    </div>
  );
};

export default ElectiveMapTab;
