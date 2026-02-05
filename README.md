# Express Employees API

Uma API REST simples feita em Node.js (Express) para gerenciar empregados.

## Endpoints

Base URL: `/api/employees`

| Método | Rota                | Descrição                     |
| ------ | ------------------- | ----------------------------- |
| GET    | `/api/employees`    | Lista todos os empregados     |
| GET    | `/api/employees/:id`| Lista um empregado específico |
| POST   | `/api/employees`    | Cria um novo empregado        |
| PUT    | `/api/employees/:id`| Atualiza um empregado         |
| DELETE | `/api/employees/:id`| Exclui um empregado           |

## Requisitos

- Node.js (LTS recomendado)
- Docker + Docker Desktop (recomendado para subir o MongoDB rapidamente)
  - Alternativamente: MongoDB instalado localmente (ou uma URL de conexão válida)

## Como rodar

### 1. Clone o repositório

- Repositório: <https://github.com/jpvilarinho/express-api.git>

### 2. Entre na pasta do projeto

```bash
cd express-api
```

### 3. Subir o MongoDB via Docker

> Se você ainda não tiver o Docker Desktop rodando, abra o Docker Desktop primeiro.

- Crie e suba um container do MongoDB:

```bash
docker run --name mongo-express-api -p 27017:27017 -d mongo:7
```

- Verifique se o container está rodando:

```bash
docker ps
```

- Ver logs do MongoDB:

```bash
docker logs -f mongo-express-api
```

Comandos úteis do container

- Parar o MongoDB:

```bash
docker stop mongo-express-api
```

- Iniciar novamente:

```bash
docker start mongo-express-api
```

- Remover o container (caso precise recriar):

```bash
docker rm -f mongo-express-api
```

> Observação: sem volume, os dados ficam dentro do container. Se remover, você perde os dados.

### 4. Crie um arquivo .env na raiz do projeto

```bash
DB_URL=localhost/my-employees
TEST_DB_URL=localhost/test-my-employees
PORT=5000
```

### 5. Instale as dependências

```bash
npm install
```

### 6. Rode o servidor

```bash
npm run dev
```

## Exemplos de uso

- Listar todos:

```curl
http://localhost:5000/api/employees
```

- Criar:

```curl
  -X POST http://localhost:5000/api/employees \
  -H "Content-Type: application/json" \
  -d '{"name":"João","job":"Developer"}'
```

- Buscar por id:

```curl
http://localhost:5000/api/employees/<id>
```

- Atualizar:

```curl
  -X PUT http://localhost:5000/api/employees/<id> \
  -H "Content-Type: application/json" \
  -d '{"name":"João","job":"Senior Developer"}'
```

- Excluir:

```curl
-X DELETE http://localhost:5000/api/employees/<id>
```

PowerShell/Terminal

- Criar:

```bash
Invoke-RestMethod `
  -Uri http://localhost:5000/api/employees `
  -Method Post `
  -ContentType "application/json" `
  -Body '{"name":"João","job":"Developer"}'
```

- Listar:

```bash
Invoke-RestMethod http://localhost:5000/api/employees
```

- Atualizar:

```bash
Invoke-RestMethod `
  -Uri http://localhost:5000/api/employees/<id> `
  -Method Put `
  -ContentType "application/json" `
  -Body '{"name":"João","job":"Senior Developer"}'
```

- Excluir:

```bash
Invoke-RestMethod `
  -Uri http://localhost:5000/api/employees/<id> `
  -Method Delete
```bash
