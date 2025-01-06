# API de Controle De Estoque

API para controle de estoque de materiais e medicamentos de uma clinica de saúde.
Utiliza armazenamento de dados frequentes em cache para aumentar a performance reduzindo o tempo de resposta.

## Tecnologias
- C# .NET
- Entity Framework
- SQL Server
- Redis
- Docker

## API Endpoints
### Materials
- __POST /Materials:__ Adiciona um novo material.
- __PUT /Materials:__ Edita um material pelo ID.
- __GET /Materials{Id}:__ Recupera um material pelo ID.
- __DELETE /Materials{Id}:__ Deleta um material pelo ID.
- __GET /Materials/name:__ Recupera um material pelo nome.
- __GET /Materials/GetAll:__  Recupera todos os materiais.


### Medicines
- __POST /Medicine:__ Adiciona um novo medicamento.
- __PUT /Medicine:__ Edita um medicamento pelo ID.
- __GET /Medicine{Id}:__ Recupera um medicamento pelo ID.
- __DELETE /Medicine{Id}:__ Deleta um medicamento pelo ID.
- __GET /Medicine/name:__ Recupera um medicamento pelo nome.
- __GET /Medicine/GetAll:__  Recupera todos os medicamentos.
