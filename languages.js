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
  function syncMetadata() {
    const view = document.documentElement.dataset.view || 'start';
    const publicRoot = new URL('https://lemelson.github.io/mijia-water-flosser-pro-guide/');
    const pageURL = code => new URL((code === 'ru' ? '' : code + '/') + (view === 'start' ? '' : view + '/'), publicRoot).href;
    const heading = document.querySelector('main h1')?.innerText.replace(/\s+/g, ' ').trim();
    const description = (document.querySelector('main .lead')?.innerText || heading) + ' · Mijia Smart Water Flosser Pro ME0706.';
    if (heading) document.title = heading + ' · Mijia Pro ME0706';
    document.querySelector('link[rel="canonical"]').href = pageURL(current);
    document.querySelector('meta[name="description"]').content = description;
    document.querySelector('meta[property="og:title"]').content = document.title;
    document.querySelector('meta[property="og:description"]').content = description;
    document.querySelector('meta[property="og:url"]').content = pageURL(current);
    document.querySelectorAll('link[hreflang]').forEach(link => {
      const code = link.hreflang === 'x-default' ? 'en' : link.hreflang === 'zh-Hans' ? 'zh' : link.hreflang;
      link.href = pageURL(code);
    });
    document.querySelectorAll('.language-links a').forEach(link => {
      link.href = pageURL(link.hreflang === 'zh-Hans' ? 'zh' : link.hreflang);
    });
    const schema = document.querySelector('script[type="application/ld+json"]');
    if (schema) {
      const data = JSON.parse(schema.textContent);
      Object.assign(data, {name: heading, description, url: pageURL(current)});
      schema.textContent = JSON.stringify(data);
    }
  }
  document.addEventListener('click', event => { if (event.target.closest('[data-view]')) syncMetadata(); });
  window.addEventListener('popstate', syncMetadata);
  window.addEventListener('hashchange', syncMetadata);
  syncMetadata();
  wrapper.append(icon, select);
  document.querySelector('header').insertBefore(wrapper, document.querySelector('.print'));
})();
