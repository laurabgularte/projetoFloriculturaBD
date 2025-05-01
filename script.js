const produtos = [
  { id: 1, nome: "Buquê de Rosas", tipo: "flores", preco: 79.90 },
  { id: 2, nome: "Lírios Brancos", tipo: "flores", preco: 65.00 },
  { id: 3, nome: "Orquídea Roxa", tipo: "flores", preco: 90.00 }
];

const pedidos = [
  { id: 1, cliente: "Joana", valor: 144.90, forma_pgt: "Cartão" },
  { id: 2, cliente: "Carlos", valor: 65.00, forma_pgt: "Pix" }
];

document.addEventListener("DOMContentLoaded", () => {
  const catalogo = document.getElementById("catalogo-produtos");
  if (catalogo) {
    produtos.forEach(p => {
      const div = document.createElement("div");
      div.className = "produto";
      div.innerHTML = `<h3>${p.nome}</h3><p>R$ ${p.preco.toFixed(2)}</p>`;
      catalogo.appendChild(div);
    });
  }

  const listaPedidos = document.getElementById("lista-pedidos");
  if (listaPedidos) {
    pedidos.forEach(p => {
      const li = document.createElement("li");
      li.textContent = `Pedido #${p.id} - Cliente: ${p.cliente} - Total: R$ ${p.valor.toFixed(2)} (${p.forma_pgt})`;
      listaPedidos.appendChild(li);
    });
  }

  const formLogin = document.getElementById("formLogin");
  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      const tipo = document.getElementById("tipo").value;
      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;
      const resposta = document.getElementById("respostaLogin");
      if ((tipo === "cliente" && email === "cliente@flor.com" && senha === "123") ||
          (tipo === "funcionario" && email === "funcionario@flor.com" && senha === "admin")) {
        resposta.textContent = `Bem-vindo, ${tipo}!`;
        resposta.style.color = "green";
      } else {
        resposta.textContent = "Login inválido.";
        resposta.style.color = "red";
      }
    });
  }

  const formProduto = document.getElementById("formProduto");
  if (formProduto) {
    formProduto.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = document.getElementById("nomeProduto").value;
      const tipo = document.getElementById("tipoProduto").value;
      const preco = document.getElementById("precoProduto").value;
      const resposta = document.getElementById("respostaProduto");
      resposta.textContent = `Produto "${nome}" cadastrado com sucesso!`;
      resposta.style.color = "green";
      formProduto.reset();
    });
  }
});