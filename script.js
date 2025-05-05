const produtos = [
  { id: 1, nome: "Buquê de Rosas", tipo: "flores", preco: 79.90 },
  { id: 2, nome: "Lírios Brancos", tipo: "flores", preco: 65.00 },
  { id: 3, nome: "Orquídea Roxa", tipo: "flores", preco: 90.00 },
  { id: 4, nome: "Vaso de Cactos", tipo: "plantas", preco: 45.00 },
  { id: 5, nome: "Arranjo de Margaridas", tipo: "flores", preco: 55.00 },
  { id: 6, nome: "Tulipas Coloridas", tipo: "flores", preco: 99.90 },
  { id: 7, nome: "Planta de Samambaia", tipo: "plantas", preco: 49.90 },
  { id: 8, nome: "Cesta de Frutas e Flores", tipo: "arranjo", preco: 120.00 },
  { id: 9, nome: "Girassóis", tipo: "flores", preco: 60.00 },
  { id: 10, nome: "Vaso de Ficus", tipo: "plantas", preco: 85.00 }
];

const pedidos = [];
let carrinho = [];

function atualizarCarrinho() {
  const lista = document.getElementById("itens-carrinho");
  const total = document.getElementById("total-carrinho");
  if (!lista || !total) return;

  lista.innerHTML = "";
  let totalValor = 0;

  carrinho.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
    lista.appendChild(li);
    totalValor += item.preco;
  });

  total.textContent = `Total: R$ ${totalValor.toFixed(2)}`;
}

function atualizarHistoricoPedidos(nomeCliente) {
  const lista = document.getElementById("lista-pedidos-cliente");
  if (!lista) return;

  lista.innerHTML = "";
  const pedidosCliente = pedidos.filter(p => p.cliente === nomeCliente);

  if (pedidosCliente.length === 0) {
    lista.innerHTML = "<li>Você ainda não fez nenhum pedido.</li>";
    return;
  }

  pedidosCliente.forEach(p => {
    const li = document.createElement("li");
    li.className = "pedido";
    li.innerHTML = `
      <strong>Pedido #${p.id}</strong><br>
      Total: R$ ${p.valor.toFixed(2)}<br>
      Forma de Pagamento: ${p.forma_pgt}<br>
      Status: <span class="status ${p.status.toLowerCase().replace(' ', '-')}">${p.status}</span>
    `;
    lista.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const catalogo = document.getElementById("catalogo-produtos");
  if (catalogo) {
    produtos.forEach(p => {
      const div = document.createElement("div");
      div.className = "produto";
      div.innerHTML = `
        <h3>${p.nome}</h3>
        <p>R$ ${p.preco.toFixed(2)}</p>
        <button class="add-carrinho">Adicionar ao carrinho</button>
      `;
      const botao = div.querySelector(".add-carrinho");
      botao.addEventListener("click", () => {
        carrinho.push(p);
        atualizarCarrinho();
      });
      catalogo.appendChild(div);
    });

    document.getElementById("limpar-carrinho")?.addEventListener("click", () => {
      carrinho = [];
      atualizarCarrinho();
    });

    document.getElementById("finalizar-pedido")?.addEventListener("click", () => {
      if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
      }

      let nomeCliente = localStorage.getItem("nomeCliente");
      if (!nomeCliente) {
        nomeCliente = prompt("Digite seu nome:");
        if (!nomeCliente) return;
        localStorage.setItem("nomeCliente", nomeCliente);
      }

      const formaPagamento = prompt("Forma de pagamento (cartão, pix, dinheiro):");
      if (!formaPagamento) return;

      const total = carrinho.reduce((soma, item) => soma + item.preco, 0);
      const novoPedido = {
        id: pedidos.length + 1,
        cliente: nomeCliente,
        valor: total,
        forma_pgt: formaPagamento,
        status: "Em Processamento"
      };

      pedidos.push(novoPedido);
      carrinho = [];
      atualizarCarrinho();

      const mensagem = document.getElementById("mensagem-pedido");
      if (mensagem) {
        mensagem.textContent = `Pedido realizado com sucesso! ID: ${novoPedido.id}`;
        mensagem.style.color = "green";
      }

      atualizarHistoricoPedidos(nomeCliente);
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

        if (tipo === "cliente") {
          localStorage.setItem("nomeCliente", "Cliente Padrão");
          window.location.href = "cliente.html";
        } else if (tipo === "funcionario") {
          window.location.href = "funcionario.html";
        }
      } else {
        resposta.textContent = "Login inválido.";
        resposta.style.color = "red";
      }
    });
  }

  // Atualiza o histórico de pedidos do cliente se estiver na tela correta
  const nomeCliente = localStorage.getItem("nomeCliente");
  if (nomeCliente) {
    atualizarHistoricoPedidos(nomeCliente);
  }
});
