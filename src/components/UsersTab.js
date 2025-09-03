import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const UsersTab = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    nome_completo: '',
    data_nascimento: '',
    cpf: '',
    matricula: '',
    login: '',
    senha: '',
    tipo: 'USUARIO'
  });
  const { user } = useAuth();

  const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? '/api' 
    : 'http://localhost:3001/api';

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/users`, newUser);
      setShowAddModal(false);
      setNewUser({
        nome_completo: '',
        data_nascimento: '',
        cpf: '',
        matricula: '',
        login: '',
        senha: '',
        tipo: 'USUARIO'
      });
      fetchUsers();
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      alert('Erro ao criar usuário: ' + (error.response?.data?.error || 'Erro desconhecido'));
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => 
    Object.values(user).some(value => 
      value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const clearSearch = () => {
    setSearchTerm('');
  };

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case 'MASTER': return 'var(--accent-danger)';
      case 'ADMIN': return 'var(--accent-secondary)';
      case 'USUARIO': return 'var(--accent-success)';
      default: return 'var(--text-primary)';
    }
  };

  const getSituacaoColor = (situacao) => {
    return situacao === 'ATIVO' ? 'var(--accent-success)' : 'var(--accent-danger)';
  };

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Gerenciamento de Usuários</h2>
        <div className="main-actions">
          <div className="search-container">
            <input
              className="search-input"
              type="search"
              placeholder="Buscar usuários..."
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
          
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            Adicionar Usuário
          </button>
        </div>
      </div>
      
      <div className="table-container">
        <table className="management-table">
          <thead>
            <tr>
              <th>Nome Completo</th>
              <th>Login</th>
              <th>CPF</th>
              <th>Matrícula</th>
              <th>Tipo</th>
              <th>Situação</th>
              <th>Primeiro Acesso</th>
              <th>Criado em</th>
              <th className="th-editar">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.nome_completo}</td>
                <td>{user.login}</td>
                <td>{user.cpf}</td>
                <td>{user.matricula}</td>
                <td>
                  <span style={{ 
                    color: getTipoColor(user.tipo),
                    fontWeight: '500'
                  }}>
                    {user.tipo}
                  </span>
                </td>
                <td>
                  <span style={{ 
                    color: getSituacaoColor(user.situacao),
                    fontWeight: '500'
                  }}>
                    {user.situacao}
                  </span>
                </td>
                <td>{user.primeiro_acesso}</td>
                <td>{new Date(user.criado_em).toLocaleDateString('pt-BR')}</td>
                <td>
                  <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredUsers.length === 0 && !loading && (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: 'var(--text-secondary)' 
          }}>
            Nenhum usuário encontrado
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showAddModal && (
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
            padding: '30px',
            borderRadius: 'var(--border-radius)',
            boxShadow: 'var(--shadow)',
            width: '100%',
            maxWidth: '500px',
            margin: '20px'
          }}>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>
              Adicionar Novo Usuário
            </h3>
            
            <form onSubmit={handleAddUser}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Nome Completo</label>
                <input
                  type="text"
                  value={newUser.nome_completo}
                  onChange={(e) => setNewUser({...newUser, nome_completo: e.target.value})}
                  required
                  style={{ width: '100%' }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Login</label>
                <input
                  type="text"
                  value={newUser.login}
                  onChange={(e) => setNewUser({...newUser, login: e.target.value})}
                  required
                  style={{ width: '100%' }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Senha</label>
                <input
                  type="password"
                  value={newUser.senha}
                  onChange={(e) => setNewUser({...newUser, senha: e.target.value})}
                  required
                  style={{ width: '100%' }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>CPF</label>
                <input
                  type="text"
                  value={newUser.cpf}
                  onChange={(e) => setNewUser({...newUser, cpf: e.target.value})}
                  style={{ width: '100%' }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Matrícula</label>
                <input
                  type="text"
                  value={newUser.matricula}
                  onChange={(e) => setNewUser({...newUser, matricula: e.target.value})}
                  style={{ width: '100%' }}
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Tipo</label>
                <select
                  value={newUser.tipo}
                  onChange={(e) => setNewUser({...newUser, tipo: e.target.value})}
                  style={{ width: '100%' }}
                >
                  <option value="USUARIO">USUÁRIO</option>
                  <option value="ADMIN">ADMIN</option>
                  {user?.tipo === 'MASTER' && <option value="MASTER">MASTER</option>}
                </select>
              </div>
              
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Criando...' : 'Criar Usuário'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTab;
