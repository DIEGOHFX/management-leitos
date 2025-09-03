const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

// Database configuration
const dbConfig = {
  host: 'yamabiko.proxy.rlwy.net',
  port: 40832,
  user: 'root',
  password: 'enXxjOhQFaDWRuLHGeXiUqkTAaSZrHzJ',
  database: 'railway'
};

async function createTestUser() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    // Hash the password
    const hashedPassword = await bcrypt.hash('123456', 10);
    
    // Insert test user
    const query = `
      INSERT INTO usuarios (nome_completo, login, senha, tipo, situacao, primeiro_acesso) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    const values = [
      'Administrador Teste',
      'admin',
      hashedPassword,
      'MASTER',
      'ATIVO',
      'CONCLUÍDO'
    ];
    
    const [result] = await connection.execute(query, values);
    
    console.log('✅ Usuário teste criado com sucesso!');
    console.log('📋 Dados para login:');
    console.log('   Login: admin');
    console.log('   Senha: 123456');
    console.log('   Tipo: MASTER');
    
    await connection.end();
    
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.log('⚠️  Usuário "admin" já existe no banco de dados');
      console.log('📋 Use as credenciais:');
      console.log('   Login: admin');
      console.log('   Senha: 123456');
    } else {
      console.error('❌ Erro ao criar usuário:', error.message);
    }
  }
}

createTestUser();
