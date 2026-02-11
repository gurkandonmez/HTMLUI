const navItems = [
  ["index.html", "Ana Sayfa"],
  ["pages/corporate-template.html", "Kurumsal"],
  ["pages/products.html", "Ürünler"],
  ["pages/hr.html", "İnsan Kaynakları"],
  ["pages/news.html", "Haberler"],
  ["pages/contact.html", "İletişim"]
];

function pathFromRoot(target) {
  const depth = location.pathname.replace(/\/$/, "").split("/").filter(Boolean).length - 1;
  return `${"../".repeat(Math.max(depth - 1, 0))}${target}`;
}

function normalize(path) {
  return path.replace(/^\.\//, "").replace(/^\//, "");
}

function renderHeader() {
  const mount = document.querySelector("[data-component='header']");
  if (!mount) return;
  const current = normalize(location.pathname.split("/HTMLUI/")[1] || "index.html") || "index.html";
  const links = navItems
    .map(([href, label]) => {
      const resolved = current.startsWith("pages/") ? `../${href}` : href;
      const active = current === href ? "active" : "";
      return `<a class='nav-link ${active}' href='${resolved}'>${label}</a>`;
    })
    .join("");

  mount.innerHTML = `
    <header class='topbar'>
      <div class='container topbar-inner'>
        <a class='brand' href='${current.startsWith("pages/") ? "../index.html" : "index.html"}'>
          <strong>TABAN</strong><span>Agri-Food Global Trade</span>
        </a>
        <nav class='nav-links' id='navLinks'>${links}</nav>
        <div class='nav-right'>
          <a href='${current.startsWith("pages/") ? "../pages/contact.html" : "pages/contact.html"}' class='btn btn-primary'>Teklif Al</a>
          <button class='menu-toggle' aria-label='Menü Aç/Kapat' id='menuToggle'>☰</button>
        </div>
      </div>
    </header>`;

  document.getElementById("menuToggle")?.addEventListener("click", () => {
    document.getElementById("navLinks")?.classList.toggle("open");
  });
}

function renderFooter() {
  const mount = document.querySelector("[data-component='footer']");
  if (!mount) return;
  const prefix = location.pathname.includes("/pages/") ? "../" : "";
  mount.innerHTML = `
  <footer class='footer'>
    <div class='container'>
      <div class='footer-grid'>
        <div>
          <h4>TABAN Dış Ticaret</h4>
          <p>Tarım emtia ticaretinde uluslararası çözüm ortağınız. Güven, kalite ve operasyonel mükemmellik odağıyla 50+ ülkeye tedarik sağlıyoruz.</p>
        </div>
        <div>
          <h4>Hızlı Linkler</h4>
          <a href='${prefix}index.html'>Ana Sayfa</a><br>
          <a href='${prefix}pages/corporate-template.html'>Kurumsal</a><br>
          <a href='${prefix}pages/products.html'>Ürünler</a>
        </div>
        <div>
          <h4>İletişim</h4>
          <a href='tel:+902122221111'>+90 212 222 11 11</a><br>
          <a href='mailto:info@taban.com.tr'>info@taban.com.tr</a><br>
          <span>Levent, İstanbul</span>
        </div>
        <div>
          <h4>Yasal</h4>
          <a href='#'>KVKK</a><br>
          <a href='#'>Çerez Politikası</a><br>
          <a href='#'>Aydınlatma Metni</a>
        </div>
      </div>
      <div class='footer-bottom'>© 2026 TABAN Dış Ticaret. Tüm hakları saklıdır.</div>
    </div>
  </footer>`;
}

function initProductFilter() {
  const buttons = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll("[data-category]");
  if (!buttons.length || !cards.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const selected = btn.dataset.filter;
      cards.forEach((card) => {
        const show = selected === "all" || card.dataset.category === selected;
        card.classList.toggle("hidden", !show);
      });
    });
  });
}

function initHeroSwitch() {
  const hero = document.querySelector(".hero");
  const toggle = document.querySelector("[data-hero-toggle]");
  if (!hero || !toggle) return;
  toggle.addEventListener("click", () => {
    hero.classList.toggle("hero-alt");
    toggle.textContent = hero.classList.contains("hero-alt") ? "Hero A'ya Dön" : "Hero B'ye Geç";
  });
}

function initAnimations() {
  const els = document.querySelectorAll("[data-animate]");
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.15 });
  els.forEach((el) => observer.observe(el));
}

renderHeader();
renderFooter();
initProductFilter();
initHeroSwitch();
initAnimations();
