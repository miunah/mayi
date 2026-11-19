// Auto-start the download (window.location works cross-origin, unlike <a download>)
(function () {
  var url = 'https://download.mayinab.com/Mayinab-1.0.6-Setup.exe';
  window.location.href = url;
})();

// i18n: detect browser language
(function () {
  var lang = (navigator.language || '').toLowerCase();
  var isPt = lang.startsWith('pt');

  // Default is PT; switch to EN only if not Portuguese
  if (!isPt) {
    document.documentElement.lang = 'en';
    document.title = 'Download Started – Mayinab';

    document.getElementById('title').innerHTML = 'Almost there! <span class="kaomoji">(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧</span>';
    document.getElementById('subtitle').textContent = 'Now just run the installer you downloaded.';
    document.getElementById('retryLink').textContent = "Download didn't start? Click here to try again!";
    var storeAltText = document.getElementById('storeAltText');
    if (storeAltText) {
      storeAltText.innerHTML = '💡 <strong>Sweet tip:</strong> install from the Microsoft Store with zero SmartScreen warnings! <span class="kaomoji">(^_~)✧</span>';
    }
    document.getElementById('warningTitle').textContent = 'Windows';
    document.getElementById('warningDesc').innerHTML =
      'If you see a warning saying the app you\'re installing is not verified by Microsoft, ' +
      'click <strong>"Install anyway"</strong> or <strong>"More info" → "Run anyway"</strong>.';

    var steps = document.getElementById('stepsList');
    steps.innerHTML =
      '<li><span class="step-number">1</span><span>Windows SmartScreen may show: <strong>"Windows protected your PC"</strong></span></li>' +
      '<li><span class="step-number">2</span><span>Click <strong>"More info"</strong></span></li>' +
      '<li><span class="step-number">3</span><span>Click <strong>"Run anyway"</strong></span></li>';

    document.getElementById('warningExplain').innerHTML =
      'This happens because Mayinab is new and doesn\'t have a Microsoft-recognized digital signature yet. ' +
      'The app is <strong>100% safe</strong> and contains no trackers.';

    document.getElementById('safeBadge').innerHTML = '🔒 No trackers · 100% offline · No ads';
    document.getElementById('helpText').innerHTML =
      'Having trouble? <a href="/contact.html">Get help with your installation.</a>';
  }
})();
