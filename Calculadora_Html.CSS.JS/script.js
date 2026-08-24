// 1. Seleciona o botão de cálculo pelo ID "#calcular"
const botao = document.querySelector("#calcular");

// 2. Adiciona um "ouvinte" de clique no botão
botao.addEventListener("click", function () {
  
  // 3. Captura o texto digitado no campo de nome
  const nome = document.querySelector("#nome").value;
  
  // 4. Captura as notas e CONVERTE para número usando Number()
  // Sem o Number(), os valores seriam tratados como texto e concatenados em vez de somados!
  const nota1 = Number(document.querySelector("#nota1").value);
  const nota2 = Number(document.querySelector("#nota2").value);
  const nota3 = Number(document.querySelector("#nota3").value);
  
  // 5. Seleciona o elemento <p> onde vamos escrever a resposta
  const resultado = document.querySelector("#resultado");

  // 6. Faz o cálculo da média aritmética das 3 notas
  const media = (nota1 + nota2 + nota3) / 3;

  // 7. Estrutura condicional (se/senão):
  // .toFixed(1) formata o número para exibir apenas 1 casa decimal (ex: 7.333 vira 7.3)
  if (media >= 6) {
    // Aluno aprovado se a média for 6 ou maior
    resultado.textContent = nome + " - Média: " + media.toFixed(1) + " - APROVADO";
    resultado.style.color = "green"; // Destaca em verde
  } else {
    // Aluno reprovado se a média for menor que 6
    resultado.textContent = nome + " - Média: " + media.toFixed(1) + " - REPROVADO";
    resultado.style.color = "red"; // Destaca em vermelho
  }
});