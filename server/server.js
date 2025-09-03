const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
}

// Database configuration using Railway MySQL
const dbConfig = {
  host: process.env.DB_HOST || 'yamabiko.proxy.rlwy.net',
  port: process.env.DB_PORT || 40832,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'enXxjOhQFaDWRuLHGeXiUqkTAaSZrHzJ',
  database: process.env.DB_NAME || 'railway',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};
// Create connection pool
const pool = mysql.createPool(dbConfig);

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'hospital_management_secret_key';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token de acesso requerido' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

// Auth Routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { login, senha } = req.body;
    console.log('🔐 Tentativa de login:', { login, senha: '***' });

    if (!login || !senha) {
      return res.status(400).json({ error: 'Login e senha são obrigatórios' });
    }

    // Query with explicit field names and lowercase 'login' field as per memory
    const query = `
      SELECT id, nome_completo, data_nascimento, cpf, matricula, login, senha, 
             situacao, tipo, primeiro_acesso, criado_em, atualizado_em 
      FROM usuarios 
      WHERE login = ? AND situacao = 'ATIVO'
    `;
    
    console.log('📊 Executando query para login:', login);
    const [rows] = await pool.execute(query, [login]);
    console.log('📋 Usuários encontrados:', rows.length);

    if (rows.length === 0) {
      console.log('❌ Nenhum usuário encontrado para login:', login);
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const user = rows[0];
    console.log('👤 Usuário encontrado:', { login: user.login, situacao: user.situacao });
    
    // Check if password is already hashed (starts with $2a$ or $2b$) or plain text
    let isValidPassword = false;
    if (user.senha.startsWith('$2a$') || user.senha.startsWith('$2b$')) {
      // Password is hashed, use bcrypt
      console.log('🔒 Senha criptografada detectada, usando bcrypt');
      isValidPassword = await bcrypt.compare(senha, user.senha);
    } else {
      // Password is plain text, compare directly
      console.log('📝 Senha em texto simples detectada');
      isValidPassword = senha === user.senha;
    }

    console.log('✅ Senha válida:', isValidPassword);

    if (!isValidPassword) {
      console.log('❌ Senha incorreta para usuário:', user.login);
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        login: user.login, 
        tipo: user.tipo,
        nome_completo: user.nome_completo
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Remove password from response
    const { senha: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// User Routes
app.get('/api/users', authenticateToken, async (req, res) => {
  try {
    // Only MASTER and ADMIN can view users
    if (req.user.tipo !== 'MASTER' && req.user.tipo !== 'ADMIN') {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    const query = `
      SELECT id, nome_completo, data_nascimento, cpf, matricula, login, 
             situacao, tipo, primeiro_acesso, criado_em, atualizado_em 
      FROM usuarios 
      ORDER BY nome_completo
    `;
    
    const [rows] = await pool.execute(query);
    res.json(rows);

  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.post('/api/users', authenticateToken, async (req, res) => {
  try {
    // Only MASTER and ADMIN can create users
    if (req.user.tipo !== 'MASTER' && req.user.tipo !== 'ADMIN') {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    const { 
      nome_completo, 
      data_nascimento, 
      cpf, 
      matricula, 
      login, 
      senha, 
      tipo = 'USUARIO' 
    } = req.body;

    if (!nome_completo || !login || !senha) {
      return res.status(400).json({ error: 'Nome, login e senha são obrigatórios' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(senha, 10);

    const query = `
      INSERT INTO usuarios (nome_completo, data_nascimento, cpf, matricula, login, senha, tipo, situacao, primeiro_acesso)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'ATIVO', 'PENDENTE')
    `;

    const [result] = await pool.execute(query, [
      nome_completo, 
      data_nascimento, 
      cpf, 
      matricula, 
      login, 
      hashedPassword, 
      tipo
    ]);

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      id: result.insertId
    });

  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'Login já existe' });
    } else {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
});

// Bed Management Routes (placeholder for now)
app.get('/api/beds', authenticateToken, async (req, res) => {
  try {
    // This would connect to a beds table when implemented
    res.json([]);
  } catch (error) {
    console.error('Erro ao buscar leitos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Hospital Management API is running' });
});

// Test database connection
app.get('/api/test-db', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT 1 as test');
    res.json({ message: 'Database connection successful', data: rows });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Catch all handler: send back React's index.html file in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Hospital Management Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
