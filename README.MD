# Desafio Tech Programa Trainee Biopark

Instruções de como rodar o projeto, Banco de dados, Frontend e Backend

Clone o projeto

```bash
  git clone https://github.com/PimLeonardo/DesafioTechBiopark.git
```

Entre no diretório do projeto

```bash
  cd DesafioTechBiopark/
```

## Backend

Entre no diretório do Backend

```bash
  cd backend/
```

Instale todas as dependências

```bash
  npm install
```

## Banco de dados

Primeiramente, o banco de dados escolhido foi o PostgreSQL. Para sua configuração, será necessária a criação de um aquivo .env, usando o .env.example como exemplo. Ademais, todas as tabelas e SQL podem ser encontradas [aqui.](./backend/prisma/migrations/20230306034250_biopark)

### Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar a seguinte variável de ambiente no seu .env:

`DATABASE_URL`

dentro de .env.example há todas as instruções necessárias para para montar a database url, para fazer a conexão com o seu banco de dados Postgre, [acesse a documentação oficial para mais detalhes.](https://www.prisma.io/docs/concepts/database-connectors/postgresql)

### Criação das tabelas

Para criar as tabelas o comando

```bash
  npx prisma migrate dev
```

## Frontend

Entre no diretório do Frontend

```bash
  cd frontend
```

Instale todas as dependências

```bash
  npm install
```

## Rodar o projeto

Dentro do diretório Frontend e Backend o comando para iniciar

```bash
  npm run dev
```

- A aplicação Frontend vai rodar em: http://localhost:5173/

- A aplicação Backend vai rodar em: http://localhost:3333/
