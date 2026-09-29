(() => {
  const languages = [
    ['ru', 'Русский', 'Язык инструкции'],
    ['en', 'English', 'Guide language'],
    ['zh', '简体中文', '说明书语言'],
    ['hi', 'हिन्दी', 'निर्देशिका की भाषा'],
    ['es', 'Español', 'Idioma de la guía'],
    ['ar', 'العربية', 'لغة الدليل'],
    ['fr', 'Français', 'Langue du guide'],
    ['uk', 'Українська', 'Мова інструкції'],
    ['kk', 'Қазақша', 'Нұсқаулық тілі'],
    ['uz', 'Oʻzbekcha', 'Qoʻllanma tili'],
  ];
  const siteRoot = new URL('.', document.currentScript.src);
  const pathParts = location.pathname.split('/').filter(Boolean);
  const current = languages.find(([code]) => pathParts.includes(code))?.[0] || 'ru';
  const locale = languages.find(([code]) => code === current);
  const wrapper = document.createElement('label');
  wrapper.className = 'language-picker';
  const icon = document.createElement('span');
  icon.textContent = '◎';
  icon.setAttribute('aria-hidden', 'true');
  const select = document.createElement('select');
  select.id = 'languageSelect';
  select.setAttribute('aria-label', locale[2]);
  languages.forEach(([code, name]) => {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = name;
    option.lang = code === 'zh' ? 'zh-Hans' : code;
    option.selected = code === current;
    select.append(option);
  });
  select.addEventListener('change', () => {
    const language = select.value;
    const section = document.documentElement.dataset.view || 'start';
    location.assign(new URL((language === 'ru' ? '' : `${language}/`) + (section === 'start' ? '' : `${section}/`), siteRoot));
  });
  wrapper.append(icon, select);
  document.querySelector('header').insertBefore(wrapper, document.querySelector('.print'));
})();
