/**
 * Minimal i18n for auth/confirmed.html.
 */
(function () {
  var lang = (navigator.language || '').slice(0, 2);
  if (lang === 'pt') {
    document.documentElement.lang = 'pt-BR';
    document.title = 'E-mail Confirmado – Mayinab';
    document.getElementById('title').textContent = 'E-mail Confirmado!';
    document.getElementById('desc').textContent = 'Sua conta foi verificada com sucesso.';
    document.getElementById('action').innerHTML = 'Você pode fechar esta aba e <strong>voltar ao app Mayinab</strong> para entrar.';
  }
})();
