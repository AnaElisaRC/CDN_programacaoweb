document.addEventListener("DOMContentLoaded", () => {
  const botaoFiltrar = document.getElementById("filtrar");
  const selectCategoria = document.getElementById("categoria");
  const tabelaVendas = document.getElementById("tabela-vendas");

  // Elementos dos Cards do Topo
  const elReceita = document.getElementById("receita-total");
  const elVendas = document.getElementById("total-vendas");
  const elTicket = document.getElementById("ticket-medio");

  // Elementos do Gráfico
  const colunasGrafico = document.querySelectorAll(".barras-container .coluna");
  const itensLegenda = document.querySelectorAll(".legenda-lateral .legenda-item");

  // Remove acentos e padroniza para minúsculas
  const normalizar = (texto) =>
    texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .toLowerCase();

  function aplicarFiltro() {
    const filtro = normalizar(selectCategoria.value);
    const linhas = tabelaVendas.getElementsByTagName("tr");

    let totalReceita = 0;
    let totalVendas = 0;

    // 1. Filtragem da Tabela
    for (let i = 0; i < linhas.length; i++) {
      const celulaCat = linhas[i].getElementsByTagName("td")[2];
      const celulaValor = linhas[i].getElementsByTagName("td")[3];

      if (celulaCat && celulaValor) {
        const catTexto = normalizar(celulaCat.textContent);
        const corresponde = filtro === "todas" || catTexto === filtro;

        if (corresponde) {
          linhas[i].style.display = "";
          totalVendas++;

          // Converte "R$ 3.500,00" para número decimal
          const valorNumerico = parseFloat(
            celulaValor.textContent
              .replace("R$", "")
              .replace(/\./g, "")
              .replace(",", ".")
              .trim()
          );
          totalReceita += isNaN(valorNumerico) ? 0 : valorNumerico;
        } else {
          linhas[i].style.display = "none";
        }
      }
    }

    // 2. Atualização dos Cards
    const ticketMedio = totalVendas > 0 ? totalReceita / totalVendas : 0;

    elReceita.textContent = totalReceita.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
    elVendas.textContent = totalVendas;
    elTicket.textContent = ticketMedio.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });

    // 3. Filtragem das Colunas do Gráfico
    colunasGrafico.forEach((coluna) => {
      const legendaColuna = normalizar(
        coluna.querySelector(".legenda-eixo").textContent
      );
      if (filtro === "todas" || legendaColuna === filtro) {
        coluna.style.display = "flex";
      } else {
        coluna.style.display = "none";
      }
    });

    // 4. Filtragem da Legenda Lateral
    itensLegenda.forEach((item) => {
      const nomeItem = normalizar(item.textContent);
      if (filtro === "todas" || nomeItem === filtro) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  }

  // Dispara ao clicar no botão ou trocar diretamente o select
  botaoFiltrar.addEventListener("click", aplicarFiltro);
  selectCategoria.addEventListener("change", aplicarFiltro);
});