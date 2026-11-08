// MENU SANDUÍCHE

const botaoMenu = document.querySelector("#menu-botao");
const menuPrincipal = document.querySelector("#menu-principal");

if (botaoMenu && menuPrincipal) {
  function definirMenu(aberto) {
    botaoMenu.setAttribute("aria-expanded", String(aberto));

    botaoMenu.setAttribute(
      "aria-label",
      aberto
        ? "Fechar menu de navegação"
        : "Abrir menu de navegação"
    );

    menuPrincipal.hidden = !aberto;
  }

  botaoMenu.addEventListener("click", function () {
    const estaAberto =
      botaoMenu.getAttribute("aria-expanded") === "true";

    definirMenu(!estaAberto);
  });

  // Fecha ao clicar fora do menu.
  document.addEventListener("click", function (event) {
    if (
      !menuPrincipal.contains(event.target) &&
      !botaoMenu.contains(event.target)
    ) {
      definirMenu(false);
    }
  });

  // Fecha com Escape e devolve o foco ao botão.
  document.addEventListener("keydown", function (event) {
    if (
      event.key === "Escape" &&
      botaoMenu.getAttribute("aria-expanded") === "true"
    ) {
      definirMenu(false);
      botaoMenu.focus();
    }
  });

  // Fecha quando o usuário sai do cabeçalho pelo teclado.
  const cabecalho = botaoMenu.closest("header");

  if (cabecalho) {
    cabecalho.addEventListener("focusout", function (event) {
      if (!cabecalho.contains(event.relatedTarget)) {
        definirMenu(false);
      }
    });
  }

  // Identifica a página atual.
  const paginaAtual =
    window.location.pathname.split("/").pop() || "index.html";

  menuPrincipal.querySelectorAll("a").forEach(function (link) {
    const paginaLink = new URL(link.href).pathname.split("/").pop();

    if (paginaLink === paginaAtual) {
      link.setAttribute("aria-current", "page");
    }
  });
}

// FORMULÁRIO DE CONTATO

const formulario = document.querySelector("#form-contato");
const retorno = document.querySelector("#retorno-formulario");

if (formulario && retorno) {
  const nome = formulario.querySelector("#nome");
  const mensagem = formulario.querySelector("#mensagem");

  // Complementa o HTML5 para impedir textos só com espaços.
  function validarTexto(campo, minimo, aviso) {
    const texto = campo.value.trim();

    campo.setCustomValidity(
      campo.value.length > 0 && texto.length < minimo
        ? aviso
        : ""
    );
  }

  nome.addEventListener("input", function () {
    validarTexto(
      nome,
      3,
      "Informe um nome com pelo menos 3 caracteres, sem contar espaços nas extremidades."
    );
  });

  mensagem.addEventListener("input", function () {
    validarTexto(
      mensagem,
      10,
      "Escreva uma mensagem com pelo menos 10 caracteres, sem contar espaços nas extremidades."
    );
  });

  formulario.addEventListener("input", function () {
    retorno.textContent = "";
  });

  formulario.addEventListener("change", function () {
    retorno.textContent = "";
  });

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    retorno.textContent =
      "Dados validados com sucesso! Este é um protótipo acadêmico: nenhuma mensagem foi enviada ou armazenada.";
  });
}