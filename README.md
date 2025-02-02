# ClinicStock

ClinicStock é uma aplicação para controle de estoque de materiais e medicamentos de uma clinica de saúde. \
Realiza armazenamento de dados frequentes em cache para aumentar a performance reduzindo o tempo de resposta.

![image](https://github.com/user-attachments/assets/9dce0526-9d70-448f-872c-0ce4e8c380f6)


## Tecnologias
- C# .NET
- Entity Framework
- SQL Server
- Redis
- Docker
- Swagger
- React.js

## API Endpoints
### Material
- __POST /Material:__ Adiciona um novo material.
- __PUT /Material:__ Edita um material pelo ID.
- __GET /Material{Id}:__ Recupera um material pelo ID.
- __DELETE /Material{Id}:__ Deleta um material pelo ID.
- __GET /Material/name:__ Recupera um material pelo nome.
- __GET /Material/GetAll:__  Recupera todos os materiais.


### Medicine
- __POST /Medicine:__ Adiciona um novo medicamento.
- __PUT /Medicine:__ Edita um medicamento pelo ID.
- __GET /Medicine{Id}:__ Recupera um medicamento pelo ID.
- __DELETE /Medicine{Id}:__ Deleta um medicamento pelo ID.
- __GET /Medicine/name:__ Recupera um medicamento pelo nome.
- __GET /Medicine/GetAll:__  Recupera todos os medicamentos.

## Tabelas
![Texto Alternativo](https://github.com/RodrigoLorensiMarques/API-ClinicStock/blob/main/backend/DbDiagrama.png)


## [BackEnd] Como Rodar
### Requisitos:
- [.NET 9](https://dotnet.microsoft.com/pt-br/download)
- [Docker](https://docs.docker.com/get-started/get-docker/)

### Passo a Passo:
1. Em seu terminal, acesse o diretório banckend na raiz do repositório:
      ```
   cd ClinicStock/backend
   ```

4. Suba os serviços:
   ```
   docker-compose up
   ```
5. Acesse o diretório __WebApi__, restaure os pacotes:
   ```
   cd WebAPI
   dotnet restore
   ```

6. Aplique as migrations:
   ```
   dotnet-ef database update
   ```

9. Pronto! Agora você pode acessar o [http://localhost:5124/swagger](http://localhost:5077/swagger/index.html) para ter acesso a interface do Swagger e visualizar os endpoints da API.

## [FrontEnd] Como Rodar
### Requisitos:
- [Node.JS](https://nodejs.org/pt)

### Passo a Passo:
1. Em seu terminal, acesse o diretório do frontend na raiz do repositório:
      ```
   cd ClinicStock/frontend/clinicStock
   ```

2. Instale as dependências:
   ```
   npm install
   ```
3. Suba a aplicação
   ```
   npm run dev
   ```
4. Pronto! Agora você pode acessar o [http://localhost:5173/](http://localhost:5173/) para ter acesso ao frontend da aplicação.
   


