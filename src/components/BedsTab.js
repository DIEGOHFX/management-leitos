import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const BedsTab = () => {
  const [beds, setBeds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isolationFilter, setIsolationFilter] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock data for beds - in real app this would come from API
  const mockBeds = [
    {
      id: 1,
      codPosto: 'P001',
      nomePosto: 'UTI Adulto',
      leitoAcomodacao: 'Leito 01',
      numeroLeito: '001',
      tipoAcomodacao: 'UTI',
      status: 'DISPONIVEL',
      categoria: 'ADULTO',
      tipoLeito: 'UTI',
      isolamento: 'NAO'
    },
    {
      id: 2,
      codPosto: 'P002',
      nomePosto: 'Enfermaria',
      leitoAcomodacao: 'Leito 02',
      numeroLeito: '002',
      tipoAcomodacao: 'ENFERMARIA',
      status: 'OCUPADO',
      categoria: 'ADULTO',
      tipoLeito: 'COMUM',
      isolamento: 'SIM'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setBeds(mockBeds);
  }, []);

  const filteredBeds = beds.filter(bed => {
    const matchesSearch = Object.values(bed).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesIsolation = !isolationFilter || bed.isolamento === 'SIM';
    return matchesSearch && matchesIsolation;
  });

  const handleExportXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredBeds);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Leitos');
    XLSX.writeFile(workbook, 'leitos.xlsx');
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'DISPONIVEL': return 'var(--accent-success)';
      case 'OCUPADO': return 'var(--accent-danger)';
      case 'MANUTENCAO': return 'var(--warning-color)';
      case 'LIMPEZA': return 'var(--accent-secondary)';
      case 'DESATIVADO': return 'var(--text-secondary)';
      default: return 'var(--text-primary)';
    }
  };

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Lista de Leitos</h2>
        <div className="main-actions">
          <div className="search-container">
            <input
              className="search-input"
              type="search"
              placeholder="Buscar leitos..."
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
          
          <button className="btn btn-primary">
            Cadastrar Leito
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
              <th>Cód Posto</th>
              <th>Nome Posto</th>
              <th>Leito Acomodação</th>
              <th>Nº Leito</th>
              <th>Tipo Acomodação</th>
              <th>Status</th>
              <th>Categoria</th>
              <th>Tipo Leito</th>
              <th>Isolamento</th>
              <th className="th-editar">Editar</th>
            </tr>
          </thead>
          <tbody>
            {filteredBeds.map(bed => (
              <tr key={bed.id}>
                <td>{bed.codPosto}</td>
                <td>{bed.nomePosto}</td>
                <td>{bed.leitoAcomodacao}</td>
                <td>{bed.numeroLeito}</td>
                <td>{bed.tipoAcomodacao}</td>
                <td>
                  <span style={{ 
                    color: getStatusColor(bed.status),
                    fontWeight: '500'
                  }}>
                    {bed.status}
                  </span>
                </td>
                <td>{bed.categoria}</td>
                <td>{bed.tipoLeito}</td>
                <td>
                  <span style={{ 
                    color: bed.isolamento === 'SIM' ? 'var(--accent-danger)' : 'var(--accent-success)'
                  }}>
                    {bed.isolamento}
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
        
        {filteredBeds.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: 'var(--text-secondary)' 
          }}>
            Nenhum leito encontrado
          </div>
        )}
      </div>
    </div>
  );
};

export default BedsTab;
