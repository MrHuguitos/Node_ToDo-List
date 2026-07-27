<h1 align="center">
  📝 Node To-Do List API
</h1>

<p align="center">
  Uma API RESTful robusta, segura e moderna para gerenciamento de tarefas (<i>To-Do List</i>) desenvolvida com <b>Node.js 22</b>, <b>Express 5</b> e <b>MongoDB</b>.
</p>

<p align="center">
  <a href="https://todo-list-backend-chcc.onrender.com/ping" target="_blank">
    <img src="https://img.shields.io/badge/🌐_API_Online-Render-000000?style=for-the-badge&logo=render&logoColor=white" alt="API Online Render" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-v22+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-v5-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/JWT-HTTP--Only_Cookies-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Google-OAuth_2.0-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google OAuth" />
  <img src="https://img.shields.io/badge/Render-Deployed-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render" />
</p>

---

## 📌 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Destaques Técnicos](#-destaques-técnicos)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Documentação dos Endpoints](#-documentação-dos-endpoints)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Como Executar o Projeto](#-como-executar-o-projeto)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Autor](#-autor)

---

## 📖 Visão Geral

> 🔗 **Acesse a API rodando online no Render:** [https://todo-list-backend-chcc.onrender.com](https://todo-list-backend-chcc.onrender.com)  
> 🩺 **Health Check (Ping):** [https://todo-list-backend-chcc.onrender.com/ping](https://todo-list-backend-chcc.onrender.com/ping)

O **Node To-Do List API** é um serviço backend completo projetado para gerenciar tarefas e autenticação de usuários de forma altamente segura. A aplicação conta com suporte a cadastro e login tradicional com criptografia de senha via Bcrypt, login social via **Google OAuth 2.0**, controle de sessão por cookies **HTTP-Only** (evitando vulnerabilidades XSS no cliente), e um CRUD completo de tarefas isoladas por usuário utilizando **MongoDB** e **Mongoose**.

---

## ✨ Funcionalidades

- 🔐 **Autenticação Dupla:** Cadastro e login com e-mail/senha ou login social via Google OAuth 2.0.
- 🛡️ **Sessões em Cookies HTTP-Only:** Armazenamento seguro de tokens JWT em cookies com flags `httpOnly`, `secure` e `sameSite: none`.
- 🔑 **Criptografia com Bcrypt:** Hash de alta segurança para senhas armazenadas no banco de dados.
- 📋 **Gerenciamento Completo de Tarefas (CRUD):** Criação, listagem, atualização de descrição e status (`Pending`, `In Progress`, `Completed`) e exclusão de tarefas.
- 🔒 **Isolamento e Segurança de Dados:** Cada usuário possui acesso exclusivo às suas próprias tarefas via middleware de autenticação (`AuthMiddleware`).
- 🌐 **CORS Flexível:** Configurado para integração segura com aplicações frontend em ambientes de desenvolvimento e produção.

---

## ⚡ Destaques Técnicos

1. **Cookies HTTP-Only para JWT:** Diferente da abordagem comum de armazenar tokens no `localStorage`, os tokens JWT são trafegados via cookies `httpOnly`, mitigando vulnerabilidades como ataques XSS.
2. **Integração Nativa com Google OAuth 2.0:** Utilização da biblioteca oficial `google-auth-library` para verificar e validar os tokens de ID emitidos pelo Google no frontend.
3. **Modo Watcher Nativo do Node 22:** Uso das flags nativas `--watch` e `--env-file` no Node.js para recarregamento dinâmico sem necessidade de bibliotecas externas como `nodemon`.
4. **Mongoose Schemas & Indexação:** Modelagem otimizada das coleções (`usuarios` e `tarefas`) com indexação no campo `userId` para garantir consultas rápidas no banco de dados.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição |
| :--- | :--- |
| **[Node.js](https://nodejs.org/)** (v22+) | Ambiente de execução JavaScript no servidor |
| **[Express.js](https://expressjs.com/)** (v5) | Framework web para criação de APIs RESTful |
| **[MongoDB](https://www.mongodb.com/)** & **[Mongoose](https://mongoosejs.com/)** | Banco de dados NoSQL e ODM para modelagem de dados |
| **[JSON Web Token (JWT)](https://jwt.io/)** | Geração e verificação de tokens de autenticação |
| **[Google Auth Library](https://www.npmjs.com/package/google-auth-library)** | Verificação e integração com login do Google |
| **[Bcryptjs](https://www.npmjs.com/package/bcryptjs)** | Hash de senhas para segurança de usuários |
| **[Cookie Parser](https://www.npmjs.com/package/cookie-parser)** | Middleware para manipulação de cookies HTTP nas requisições |
| **[Render](https://render.com/)** | Plataforma de hospedagem e deploy da API em produção |

---

## 📌 Documentação dos Endpoints

### 🩺 Health Check
| Método | Endpoint | Descrição | Requer Autenticação |
| :--- | :--- | :--- | :---: |
| `GET` | `/ping` | Verifica se a API está funcionando | ❌ |

---

### 🔑 Autenticação (`/auth`)

| Método | Endpoint | Descrição | Corpo da Requisição (`JSON`) |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Cadastra um novo usuário | `{ "name": "Nome", "email": "user@email.com", "password": "password123" }` |
| `POST` | `/auth/login` | Realiza login tradicional | `{ "email": "user@email.com", "password": "password123" }` |
| `POST` | `/auth/google` | Realiza login via Google OAuth | `{ "token": "<GOOGLE_ID_TOKEN>" }` |
| `POST` | `/auth/logout` | Encerra a sessão e limpa o cookie | *(Nenhum)* |

> ℹ️ As rotas de login e registro definem o cookie HTTP-only `token` e retornam o nome do usuário: `{ "name": "<Nome do Usuário>" }`.

---

### 📝 Tarefas (`/tasks`) — *Requer Autenticação*

> 🔒 **Todas as rotas de tarefas exigem o cookie de autenticação `token`.**

| Método | Endpoint | Descrição | Corpo da Requisição (`JSON`) |
| :--- | :--- | :--- | :--- |
| `GET` | `/tasks` | Retorna todas as tarefas do usuário logado | *(Nenhum)* |
| `POST` | `/tasks` | Cria uma nova tarefa | `{ "description": "Estudar Node.js", "status": "Pending" }` |
| `PUT` | `/tasks/:id` | Atualiza uma tarefa existente por ID | `{ "description": "Estudar Node.js v22", "status": "Completed" }` |
| `DELETE` | `/tasks/:id` | Remove uma tarefa por ID | *(Nenhum)* |

#### Status de Tarefa permitidos:
- `'Pending'` *(Padrão)*
- `'In Progress'`
- `'Completed'`

---

## 📁 Estrutura de Pastas

```text
Node_ToDo-List/
├── src/
│   ├── config/
│   │   └── dbconfig.js       # Conexão com o banco de dados MongoDB
│   ├── controllers/
│   │   ├── AuthController.js # Lógica de autenticação (registro, login, google e logout)
│   │   └── TasksController.js# Lógica das operações CRUD de tarefas
│   ├── middleware/
│   │   └── AuthMiddleware.js # Middleware de proteção de rotas via JWT Cookie
│   ├── models/
│   │   ├── UsersModel.js     # Schema de Usuário (Mongoose)
│   │   └── TasksModel.js     # Schema de Tarefa (Mongoose)
│   └── routes/
│       ├── AuthRoutes.js     # Rotas da API de autenticação
│       └── TasksRoutes.js    # Rotas da API de tarefas
├── .env                      # Variáveis de ambiente
├── .gitignore                # Arquivos ignorados pelo Git
├── package.json              # Dependências e scripts do projeto
├── server.js                 # Ponto de entrada (Entrypoint) da aplicação Express
└── README.md                 # Documentação do projeto
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
Certifique-se de ter o **[Node.js](https://nodejs.org/)** (versão 22 ou superior) e o **npm** instalados na sua máquina.

### Passo a Passo

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/MrHuguitos/Node_ToDo-List.git
   ```

2. **Acessar a pasta do projeto:**
   ```bash
   cd Node_ToDo-List
   ```

3. **Instalar as dependências:**
   ```bash
   npm install
   ```

4. **Configurar as Variáveis de Ambiente:**
   Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/To-Do_List
   JWT_SECRET=seu_jwt_secret_aqui
   FRONTEND_URL=http://localhost:5173
   GOOGLE_CLIENT_ID=seu_google_client_id_aqui
   ```

5. **Executar a aplicação no modo de desenvolvimento:**
   ```bash
   npm run dev
   ```

6. **Testar a API:**  
   Acesse no seu navegador ou cliente HTTP (Postman/Insomnia) o endpoint `http://localhost:5000/ping`.

---

## ⚙️ Scripts Disponíveis

No repositório do projeto, você pode executar:

- `npm run dev`: Inicia o servidor local de desenvolvimento com o watcher nativo do Node.js (`node --watch --env-file=.env server.js`).
- `npm start`: Executa o servidor em ambiente de produção (`node server.js`).

---

## 👨‍💻 Autor

Desenvolvido por **Hugo Araujo** ([@MrHuguitos](https://github.com/MrHuguitos)).

Se você gostou deste projeto, sinta-se à vontade para deixar uma ⭐️ no repositório!