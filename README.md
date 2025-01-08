# API de Controle De Estoque

API para controle de estoque de materiais e medicamentos de uma clinica de saúde. \
Realiza armazenamento de dados frequentes em cache para aumentar a performance reduzindo o tempo de resposta.

## Tecnologias
- C# .NET
- Entity Framework
- SQL Server
- Redis
- Docker
- Swagger

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
![Texto Alternativo](https://github.com/RodrigoLorensiMarques/API-ClinicStock/blob/main/DbDiagrama.png)


## Como Rodar
### Requisitos:
- [.NET 9](https://dotnet.microsoft.com/pt-br/download)
- [Docker](https://docs.docker.com/get-started/get-docker/)

### Passo a Passo:
1. Em seu terminal, acesse a pasta raiz do repositório

2. Para subir os serviços use `docker-compose up` 

3. Dentro do diretório __src__, restaure os pacotes usando `dotnet restore`

4. Aplique as migrations usando `dotnet-ef database update`

5. Pronto! Agora você pode acessar o http://localhost:5124/swagger para ter acesso a interface do Swagger.


