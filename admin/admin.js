if (localStorage.getItem("admin") !== "ok") location.href = "admin_login.html";

async function carregar() {
  const lista = await fetch("/data/cartoes.json").then(r => r.json());

  let html = "";
  lista.cartoes.forEach(c => {
    html += `
      <tr>
        <td>${c.nome}</td>
        <td>${c.id}</td>
        <td>
          <button onclick="editar('${c.id}')">Editar</button>
          <button style='background:red' onclick="excluir('${c.id}')">Excluir</button>
        </td>
      </tr>`;
  });

  document.getElementById("tabela").innerHTML = html;
}

carregar();

function logout() {
  localStorage.removeItem("admin");
  location.href = "admin_login.html";
}

async function novoCartao() {
  const nome = prompt("Nome do cartão:");
  if (!nome) return;

  const id = Date.now().toString();

  await fetch("/api/salvar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tipo: "novoCartao", nome, id })
  });

  carregar();
}

async function editar(id) {
  const json = await fetch(`/data/${id}.json`).then(r => r.json());

  document.getElementById("editor").innerHTML = `
    <div class='editorBox'>
      <h3>Editando cartão: ${id}</h3>
      
      <label>Imagem de fundo</label>
      <input id='bg' value="${json.backgroundImage}">

      <label>Opacidade</label>
      <input id='op' type='number' min='0' max='1' step='0.01' value="${json.backgroundOpacity}">

      <label>Logo</label>
      <input id='logo' value="${json.logo}">

      <button onclick="salvar('${id}')">Salvar alterações</button>
    </div>`;
}

async function salvar(id) {
  const conteudo = JSON.stringify({
    backgroundImage: document.getElementById("bg").value,
    backgroundOpacity: Number(document.getElementById("op").value),
    logo: document.getElementById("logo").value,
    botoes: [],
    servicos: []
  }, null, 2);

  await fetch("/api/salvar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tipo: "salvarCartao", arquivo: `${id}.json`, conteudo })
  });

  alert("Salvo com sucesso!");
}

async function excluir(id) {
  if (!confirm("Excluir permanentemente?")) return;

  await fetch("/api/salvar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tipo: "excluirCartao", id })
  });

  carregar();
}
