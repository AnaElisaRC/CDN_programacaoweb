// 1. Selecionando os elementos do HTML
const campoTarefa = document.getElementById('campo-tarefa');
const btnAdicionar = document.getElementById('btn-adicionar');
const listaTarefas = document.getElementById('lista-tarefas');

// 2. Função principal para adicionar a tarefa
function adicionarTarefa() {
  const textoTarefa = campoTarefa.value.trim();

  // Validação: não permitir tarefa vazia
  if (textoTarefa === '') {
    alert('Digite uma tarefa antes de adicionar.');
    return;
  }

  // Criação do elemento <li>
  const itemLista = document.createElement('li');

  // Criação de um <span> para segurar o texto da tarefa
  const spanTexto = document.createElement('span');
  spanTexto.textContent = textoTarefa;

  // Alternar a classe "concluida" ao clicar no texto
  spanTexto.addEventListener('click', function () {
    spanTexto.classList.toggle('concluida');
  });

  // Criação do botão "Excluir"
  const btnExcluir = document.createElement('button');
  btnExcluir.textContent = 'Excluir';
  btnExcluir.classList.add('btn-excluir');

  // Evento para remover o item da lista
  btnExcluir.addEventListener('click', function () {
    itemLista.remove();
  });

  // Montagem: adiciona o texto e o botão ao <li>, e o <li> na <ul>
  itemLista.appendChild(spanTexto);
  itemLista.appendChild(btnExcluir);
  listaTarefas.appendChild(itemLista);

  // Limpa o campo e devolve o foco para nova digitação
  campoTarefa.value = '';
  campoTarefa.focus();
}

// 3. Ouvintes de eventos (ao clicar no botão ou apertar Enter)
btnAdicionar.addEventListener('click', adicionarTarefa);

campoTarefa.addEventListener('keypress', function (evento) {
  if (evento.key === 'Enter') {
    adicionarTarefa();
  }
});