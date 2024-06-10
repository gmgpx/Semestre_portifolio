// Define uma array vazia para armazenar os dados dos usuários e um contador de IDs inicializado em 1
let data = [];
let idCounter = 1;



// Função para criar um novo usuário ou atualizar um existente
function createOrUpdate() {
  // Obtém os valores do nome de usuário e senha do formulário
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Verifica se foram fornecidos valores válidos para o nome de usuário e senha
  if (username && password) {
    // Procura por um usuário existente com o mesmo nome de usuário
    const existingUser = data.find(user => user.username === username);
    if (existingUser) {
      // Se o usuário já existir, atualiza sua senha
      existingUser.password = password;
    } else {
      // Caso contrário, cria um novo usuário com um ID único e adiciona à array de dados
      const newUser = { id: idCounter++, username, password };
      data.push(newUser);
    }
    // Renderiza a tabela com os dados atualizados e limpa o formulário
    renderTable();
    clearForm();
  } else {
    // Exibe um alerta se o nome de usuário e/ou senha não forem fornecidos
    alert('Please enter username and password.');
  }
}



// Função para renderizar a tabela com os usuários
function renderTable() {
  const tableBody = document.getElementById('user-table-body');
  const noDataMsg = document.getElementById('no-data-msg');

  // Limpa o conteúdo existente na tabela
  tableBody.innerHTML = '';

  // Verifica se há dados na array
  if (data.length === 0) {
    // Se não houver dados, exibe a mensagem de "No data available"
    noDataMsg.style.display = 'block';
    return;
  }

  // Esconde a mensagem de "No data available" se houver dados na array
  noDataMsg.style.display = 'none';

  // Popula a tabela com os dados existentes na array de usuários
  data.forEach(user => {
    const row = tableBody.insertRow();
    row.innerHTML = `<td>${user.id}</td><td>${user.username}</td><td>${user.password}</td><td class="action-buttons"><button onclick="edit(${user.id})">Editar</button><button onclick="remove(${user.id})">Deletar</button></td>`;
  });
}



// Função para limpar o formulário
function clearForm() {
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
}



// Função para editar o nome de usuário de um usuário existente
function edit(id) {
  // Procura pelo usuário com o ID especificado
  const user = data.find(user => user.id === id);
  if (user) {
    // Solicita um novo nome de usuário e atualiza se for fornecido
    const newUsername = prompt('Enter new username:', user.username);
    if (newUsername !== null) {
      user.username = newUsername;
      renderTable(); // Renderiza a tabela com os dados atualizados
    }
  } else {
    alert('User not found.'); // Exibe um alerta se o usuário não for encontrado
  }
}



// Função para remover um usuário da array
function remove(id) {
  const index = data.findIndex(user => user.id === id);
  if(confirm("Deseja apagar o usuário permanentemente?"))
  if (index !== -1) {
    data.splice(index, 1); // Remove o usuário da array
    renderTable(); // Renderiza a tabela com os dados atualizados
  } else {
    alert('User not found.'); // Exibe um alerta se o usuário não for encontrado
  }
}



// Função para filtrar os usuários pelo nome de usuário
function search() {
  const searchTerm = document.getElementById('username').value.toLowerCase();
  // Filtra os usuários cujos nomes de usuário contenham o termo de busca
  const filteredData = data.filter(user =>
    user.username.toLowerCase().includes(searchTerm)
  );
  data = filteredData; // Atualiza a array de dados com os resultados filtrados
  renderTable(); // Renderiza a tabela com os dados filtrados
}

// Renderiza a tabela ao carregar a página
renderTable();
