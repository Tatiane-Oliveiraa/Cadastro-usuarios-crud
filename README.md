
# 👥 Sistema de Cadastro de Usuários (CRUD Full Stack)

Este projeto é um desafio técnico que consiste em um sistema de cadastro completo, permitindo criar, listar, editar e remover registros de pessoas. A aplicação foi construída com foco em organização de código, validação de dados e interface amigável.

---

## 🚀 Demonstração (Deploys)

- **Frontend Online:** [Link da Vercel aqui]
- **API Online (Swagger):** [Link do Render aqui]/docs

---

## 🛠️ Tecnologias e Ferramentas

### **Backend**
- **Python 3.11+** com **FastAPI**: Framework moderno e de alta performance.
- **Motor**: Driver assíncrono para o MongoDB.
- **Pydantic**: Validação de dados e esquemas.
- **Uvicorn**: Servidor ASGI para rodar a aplicação.

### **Frontend**
- **React** (Vite): Biblioteca para construção da interface.
- **Axios**: Cliente HTTP para comunicação com a API.
- **Lucide React**: Biblioteca de ícones modernos.
- **CSS3 Personalizado**: Estilização focada em UX e responsividade.

### **Banco de Dados**
- **MongoDB Atlas**: Banco de dados NoSQL em nuvem.

---

## 📌 Funcionalidades implementadas

- [x] **Create**: Cadastro de pessoas com Nome, Email e Data de Nascimento.
- [x] **Read**: Listagem dinâmica consumindo a API.
- [x] **Update**: Edição de dados existentes com preenchimento automático do formulário.
- [x] **Delete**: Remoção de registros com confirmação de segurança.
- [x] **Validação**: Verificação de campos obrigatórios, tamanho de nome e formato de e-mail.
- [x] **Responsividade**: Interface adaptável para diferentes tamanhos de tela.

---

## ⚙️ Como rodar o projeto localmente

### 1. Pré-requisitos
- Python instalado.
- Node.js e npm instalados.
- Uma conta no MongoDB Atlas (ou MongoDB local).

### 2. Configuração do Backend
bash
cd backend
python -m venv venv
# Ative o venv:
# Windows: venv\Scripts\activate | Linux/Mac: source venv/bin/activate
pip install -r requirements.txt

Crie um arquivo `.env` dentro da pasta `backend` com sua string de conexão:
env
MONGO_URL=sua_string_de_conexao_aqui

Inicie o servidor:
bash
python -m uvicorn main:app --reload


### 3. Configuração do Frontend
Abra um novo terminal:
bash
cd frontend
npm install
npm run dev

Acesse: `http://localhost:5173`

---

## 📂 Estrutura do Repositório

├── backend/           # API FastAPI, modelos e conexão com banco
├── frontend/          # Aplicação React e estilos CSS
├── .gitignore         # Arquivos ignorados pelo Git
└── README.md          # Documentação do projeto

---

## ✒️ Autor

Desenvolvido por **Tatiane Oliveira** - https://www.linkedin.com/in/devtatianeoliveira/


