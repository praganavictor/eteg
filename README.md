# Projeto ETEG

Este é um desafio tecnico feito para Eteg utilizando Docker, Typescript, React, NestJs e Node.js.

## Requisitos

- Docker e Docker Compose instalados
- Node.js instalado (para rodar sem Docker)

## Rodando o Projeto com Docker

### 1. Clone este repositório:

```bash
   git clone https://github.com/seu-usuario/eteg.git
   cd eteg
```

### 2. Execute o Docker Compose:

```bash
docker-compose up --build
```

Isso irá construir as imagens e iniciar os contêineres para o PostgreSQL, backend e frontend.

Certifique-se que todas as builds estão online

Os serviços estarão disponíveis nas seguintes portas:

PostgreSQL: 5432

Backend: 3333

Frontend: 4173

### 3. Acesse o frontend através do navegador:

```
http://localhost:4173
```

Você tambem pode conferir o banco de dados utilizando

```
npx prisma studio
```

## Rodando o Projeto Sem Docker

### 1. Clone este repositório:

```bash
git clone https://github.com/seu-usuario/eteg.git
cd eteg
```

### 2. Configurando o Banco de Dados PostgreSQL:

- Instale o PostgreSQL localmente.

- Crie um banco de dados chamado eteg e configure o usuário postgres com a senha postgres.

### 3. Rodando o Backend:

- Vá para o diretório do backend:

```bash
cd backend
```

- Instale as dependências:

```bash
npm install
```

- Configure a URL do banco de dados no .env:

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/eteg?schema=public
```

- Inicie o servidor backend:

```bash
npm start
```

- O backend estará disponível em http://localhost:3333.

### 4. Rodando o Frontend:

- Vá para o diretório do frontend:

```bash
cd frontend
```

- Instale as dependências:

```bash
npm install
```

- Configure a URL do backend no .env:

```bash
REACT_APP_BACKEND_URL=http://localhost:3333
```

- Inicie o servidor frontend:

```bash
npm start
```

- O frontend estará disponível em http://localhost:4173.

Pronto! Agora você pode rodar o projeto tanto com Docker quanto sem Docker.
