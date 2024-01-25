tasks: {
  id: uuid,
  title: string,
  description: string,
  completed_at: string,
  created_at: string,
  updated_at: string,
}

---- Requisitos Funcionais

[x] Deve ser possível criar uma task no bando de dados;
[x] Deve ser possível listar as tasks cadastradas no banco de dados;
[x] Deve ser possível realizar uma busca, filtrando as tasks pelo title e description;
[x] Deve ser possível atualizar uma task pelo id;
[x] Deve ser possível remover uma task pelo id;
[x] Deve ser possível marcar a task como completa ou não;
[] Deve ser possível importar tasks a partir de um arquivo CSV.