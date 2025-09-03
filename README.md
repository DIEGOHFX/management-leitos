# Sistema de Gestão de Leitos Hospitalares

Este é um sistema completo de gestão hospitalar desenvolvido em React com backend Node.js e banco de dados MySQL.

## Funcionalidades

- **Gestão de Leitos**: Controle completo de leitos hospitalares com diferentes status
- **Mapa Eletivo**: Gerenciamento de pacientes agendados para cirurgias
- **Gerenciamento**: Relatórios e configurações do sistema
- **Altas**: Controle de altas hospitalares
- **Histórico**: Rastreamento de todas as movimentações
- **Usuários**: Gerenciamento de usuários com diferentes níveis de acesso
- **Autenticação**: Sistema de login seguro com JWT
- **Temas**: Suporte a tema claro e escuro
- **Exportação**: Exportar dados para Excel (.xlsx)

## Tecnologias Utilizadas

### Frontend
- React 18
- Axios para requisições HTTP
- XLSX para exportação de dados
- CSS Variables para temas

### Backend
- Node.js
- Express.js
- MySQL2
- JWT para autenticação
- bcryptjs para criptografia de senhas
- CORS

## Configuração do Banco de Dados

O sistema está configurado para usar o banco MySQL hospedado na Railway:

```
Host: yamabiko.proxy.rlwy.net
Port: 40832
User: root
Password: enXxjOhQFaDWRuLHGeXiUqkTAaSZrHzJ
Database: railway
```

### Estrutura da Tabela de Usuários

```sql
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome_completo VARCHAR(100),
  data_nascimento DATE,
  cpf VARCHAR(14),
  matricula VARCHAR(20),
  login VARCHAR(50) UNIQUE,
  senha VARCHAR(255),
  situacao ENUM('ATIVO','INATIVO') DEFAULT 'ATIVO',
  tipo ENUM('MASTER','ADMIN','USUARIO') DEFAULT 'USUARIO',
  primeiro_acesso ENUM('CONCLUÍDO','PENDENTE') DEFAULT 'PENDENTE',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Como Executar

### 1. Instalar Dependências

**Frontend:**
```bash
cd hospital-management-system
npm install
```

**Backend:**
```bash
cd hospital-management-system/server
npm install
```

### 2. Executar o Backend

```bash
cd server
npm start
```

O servidor backend será executado na porta 3001.

### 3. Executar o Frontend

```bash
cd hospital-management-system
npm start
```

O frontend será executado na porta 3000 e abrirá automaticamente no navegador.

## Usuários de Teste

Para testar o sistema, você pode criar usuários diretamente no banco de dados ou usar a funcionalidade de cadastro de usuários (disponível para ADMIN e MASTER).

### Criar Usuário Master (SQL)

```sql
INSERT INTO usuarios (nome_completo, login, senha, tipo, situacao) 
VALUES ('Administrador Master', 'admin', '$2a$10$hash_da_senha', 'MASTER', 'ATIVO');
```

**Nota:** A senha deve ser criptografada usando bcrypt. Para a senha "123456":
```javascript
const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('123456', 10);
```

## Estrutura do Projeto

```
hospital-management-system/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── TabNavigation.js
│   │   ├── LoginModal.js
│   │   ├── BedsTab.js
│   │   ├── ElectiveMapTab.js
│   │   ├── ManagementTab.js
│   │   ├── DischargesTab.js
│   │   ├── HistoryTab.js
│   │   └── UsersTab.js
│   ├── contexts/
│   │   ├── AuthContext.js
│   │   └── ThemeContext.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── server/
│   ├── server.js
│   ├── package.json
│   └── .env
├── package.json
└── README.md
```

## Funcionalidades por Tipo de Usuário

### MASTER
- Acesso completo a todas as funcionalidades
- Pode criar usuários MASTER, ADMIN e USUARIO
- Gerenciamento completo do sistema

### ADMIN
- Acesso a todas as funcionalidades exceto criação de MASTER
- Pode criar usuários ADMIN e USUARIO
- Gerenciamento de leitos e pacientes

### USUARIO
- Acesso às funcionalidades básicas
- Visualização de leitos e pacientes
- Não pode gerenciar usuários

## API Endpoints

### Autenticação
- `POST /api/auth/login` - Login de usuário

### Usuários
- `GET /api/users` - Listar usuários (ADMIN/MASTER)
- `POST /api/users` - Criar usuário (ADMIN/MASTER)

### Utilitários
- `GET /api/health` - Status da API
- `GET /api/test-db` - Testar conexão com banco

## Próximos Passos

1. Implementar CRUD completo para leitos
2. Implementar sistema de pacientes
3. Adicionar relatórios avançados
4. Implementar notificações em tempo real
5. Adicionar backup automático

## Suporte

Para dúvidas ou problemas, verifique:
1. Se o banco de dados está acessível
2. Se as dependências foram instaladas corretamente
3. Se as portas 3000 e 3001 estão disponíveis
