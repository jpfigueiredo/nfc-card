<script>
// Carregar cartões
function carregarCartoes() {
  let cartoes = JSON.parse(localStorage.getItem("cartoes")) || [];
  let tabela = document.querySelector("#cartoesTabela tbody");
  tabela.innerHTML = "";

  cartoes.forEach((c, index) => {
    let linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${index + 1}</td>
      <td>${c.nome}</td>
      <td>${c.numero}</td>
      <td>${c.validade}</td>
      <td>
        <button class="edit-btn" onclick="editar(${index})">Editar</button>
        <button class="delete-btn" onclick="excluir(${index})">Excluir</button>
      </td>
    `;
    tabela.appendChild(linha);
  });
}

// Editar cartão
function editar(id) {
  let novoNome = prompt("Novo nome:");
  let novoNumero = prompt("Novo número:");
  let novaValidade = prompt("Nova validade:");

  let cartoes = JSON.parse(localStorage.getItem("cartoes"));

  if (novoNome) cartoes[id].nome = novoNome;
  if (novoNumero) cartoes[id].numero = novoNumero;
  if (novaValidade) cartoes[id].validade = novaValidade;

  localStorage.setItem("cartoes", JSON.stringify(cartoes));
  carregarCartoes();
}

// Excluir cartão
function excluir(id) {
  if (confirm("Deseja realmente excluir?")) {
    let cartoes = JSON.parse(localStorage.getItem("cartoes"));
    cartoes.splice(id, 1);
    localStorage.setItem("cartoes", JSON.stringify(cartoes));
    carregarCartoes();
  }
}

// Logout
function logout() {
  localStorage.removeItem("adminLogado");
  window.location.href = "index.html";
}

// Verificar login
if (!localStorage.getItem("adminLogado")) {
  window.location.href = "admin_login.html";
}

carregarCartoes();
</script>
