# 🛠️ Sistema de Gestão de Fornecedores e Cotações

## Descrição
Este sistema permite a gestão de fornecedores, contatos, produtos, requisições e cotações, além de garantir a segurança no acesso por meio de autenticação de usuários. Foi desenvolvido utilizando **Firebase** para a autenticação e armazenamento de dados.

## 🚀 Funcionalidades

### 🔐 Autenticação de Usuários (Essencial)
- Permitir que usuários façam login no sistema.
- Utilização do **Firebase Authentication** para a segurança.

### 🏢 Gestão de Fornecedores (Essencial)
- **CRUD** de Fornecedores: Criar, Deletar, Editar e Listar fornecedores cadastrados.

### 📇 Gestão de Contatos (Essencial)
- **CRUD** de Contatos: Criar, Deletar, Editar e Listar contatos cadastrados.
- Cada contato deve estar vinculado a um fornecedor.

### 🛒 Gestão de Produtos (Essencial)
- **CRUD** de Produtos: Criar, Deletar, Editar e Listar produtos cadastrados.

### 📝 Gestão de Requisições e Cotações (Essencial)
- **CRUD** de Requisições e Cotações: Criar, Deletar, Editar e Listar requisições e cotações cadastradas.
- Cada requisição pode ter no máximo **3 cotações**.

---

## ⚙️ Requisitos Não Funcionais

### 🔒 Segurança (Essencial)
- O sistema deve garantir que **somente usuários cadastrados** tenham acesso.

### 💻 Usabilidade (Essencial)
- O sistema deve ser **intuitivo e amigável** para facilitar o uso por qualquer tipo de usuário.

---

## 📝 Regras de Negócio

- Cada cadastro no sistema deve conter um **ID único**.
- Um **contato** deve pertencer a um fornecedor.
- Uma **cotação** deve pertencer a uma requisição.
- Uma **requisição** pode ter, no máximo, **3 cotações**.
- Cada cotação deve ser vinculada a um **produto** e a um **fabricante**.

---

## 🛠️ Tecnologias Utilizadas

- **Firebase** (Firestore Database)
- **React** 
- **Material-UI** para estilização da interface

---

## 📦 Como Executar o Projeto

1. Clone o repositório:
   git clone https://github.com/Cadu-Menezes/SistemaCompras.git
