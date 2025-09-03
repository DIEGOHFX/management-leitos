# 🚀 Guia de Deploy na Railway

## **Opção Recomendada: Deploy Unificado**

Seu projeto está configurado para deploy **unificado** na Railway, onde backend e frontend rodam no mesmo serviço. Esta é a abordagem mais simples e econômica.

## **📋 Pré-requisitos**

1. ✅ Conta no GitHub
2. ✅ Conta na Railway (railway.app)
3. ✅ Repositório GitHub com o código

## **🔧 Configuração Atual**

O projeto já está configurado com:

- ✅ **railway.json** - Configuração de deploy
- ✅ **Procfile** - Comando de inicialização
- ✅ **Scripts de produção** no package.json
- ✅ **Servidor configurado** para servir arquivos estáticos
- ✅ **URLs relativas** em produção
- ✅ **.gitignore** configurado

## **📤 Passos para Deploy**

### **1. Subir para o GitHub**

```bash
# Inicializar repositório Git
git init

# Adicionar arquivos
git add .

# Fazer commit
git commit -m "Initial commit - Hospital Management System"

# Conectar ao repositório GitHub (substitua pela sua URL)
git remote add origin https://github.com/SEU_USUARIO/hospital-management-system.git

# Enviar para GitHub
git push -u origin main
```

### **2. Deploy na Railway**

1. **Acesse**: https://railway.app
2. **Faça login** com sua conta GitHub
3. **Clique em "New Project"**
4. **Selecione "Deploy from GitHub repo"**
5. **Escolha seu repositório**: `hospital-management-system`
6. **Railway detectará automaticamente** as configurações

### **3. Configurar Variáveis de Ambiente**

Na Railway, adicione estas variáveis:

```
NODE_ENV=production
JWT_SECRET=seu_jwt_secret_super_seguro_aqui
PORT=3001
```

### **4. Deploy Automático**

A Railway irá:
1. ✅ Instalar dependências do frontend
2. ✅ Fazer build do React (`npm run build`)
3. ✅ Instalar dependências do backend
4. ✅ Iniciar o servidor (`npm run start:prod`)

## **🌐 Como Funciona em Produção**

```
┌─────────────────────────────────────────┐
│              Railway Service             │
├─────────────────────────────────────────┤
│  Frontend (React Build)                 │
│  ├── Arquivos estáticos servidos       │
│  │   pelo Express                      │
│  └── SPA routing com /* handler        │
├─────────────────────────────────────────┤
│  Backend (Node.js/Express)              │
│  ├── API endpoints (/api/*)            │
│  ├── Autenticação JWT                  │
│  └── Conexão MySQL                     │
├─────────────────────────────────────────┤
│  Database (MySQL - Railway)            │
│  └── Mesmo banco que você já usa       │
└─────────────────────────────────────────┘
```

## **📊 Fluxo de Requisições**

1. **Usuário acessa** `https://seu-app.railway.app`
2. **Express serve** `build/index.html` (React)
3. **React faz chamadas** para `/api/*`
4. **Express processa** APIs e retorna dados
5. **MySQL** fornece dados do banco

## **🔄 Atualizações Automáticas**

Cada `git push` para a branch `main` irá:
1. ✅ Trigger automático do deploy
2. ✅ Rebuild da aplicação
3. ✅ Deploy sem downtime

## **🛠️ Comandos Úteis**

### **Desenvolvimento Local**
```bash
npm run dev          # Frontend + Backend
npm run server       # Apenas Backend
npm start           # Apenas Frontend
```

### **Produção Local (Teste)**
```bash
npm run build:prod   # Build para produção
npm run start:prod   # Rodar como produção
```

## **📈 Vantagens do Deploy Unificado**

✅ **Simplicidade**: Um único serviço na Railway
✅ **Economia**: Sem custos adicionais de múltiplos serviços
✅ **Performance**: Sem latência entre frontend/backend
✅ **SSL Automático**: HTTPS configurado automaticamente
✅ **Domínio Gratuito**: `*.railway.app`

## **🔧 Alternativa: Deploy Separado**

Se preferir separar frontend e backend:

### **Backend (API)**
- Criar serviço separado na Railway
- Usar apenas a pasta `/server`
- Configurar CORS para o domínio do frontend

### **Frontend (React)**
- Deploy no Vercel/Netlify
- Configurar variável `REACT_APP_API_URL`
- Apontar para a URL da API

## **🚨 Troubleshooting**

### **Build Falha**
```bash
# Testar build local
npm run build:prod
```

### **Erro de Conexão DB**
- Verificar se as credenciais MySQL estão corretas
- Testar endpoint: `https://seu-app.railway.app/api/test-db`

### **Erro 404 em Rotas**
- Verificar se o `/* handler` está configurado
- Problema comum em SPAs

## **📝 Próximos Passos**

1. 🔄 **Fazer deploy inicial**
2. 🧪 **Testar todas as funcionalidades**
3. 🔐 **Criar usuário de produção**
4. 📊 **Configurar monitoramento**
5. 🎨 **Configurar domínio personalizado** (opcional)

---

**🎉 Seu sistema estará online em poucos minutos!**
