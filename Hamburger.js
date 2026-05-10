/* ============================================================
   ZIGZAG MEDIA — HAMBURGER / DRAWER LOGIC
   ============================================================ */
(function () {

    /* ---------- 1. Tạo nút hamburger ---------- */
    const hamburgerBtn = document.createElement('button');
    hamburgerBtn.className = 'hamburger-btn';
    hamburgerBtn.setAttribute('aria-label', 'Mở menu');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    hamburgerBtn.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    /* Chèn vào navbar — sau .right hoặc cuối nav */
    const navbar = document.getElementById('navbar');
    navbar.appendChild(hamburgerBtn);

    /* ---------- 2. Tạo drawer HTML ---------- */
    const navLinks = [
        { text: 'TRANG CHỦ', href: '#home' },
        { text: 'GIỚI THIỆU', href: '#about' },
        { text: 'DỊCH VỤ', href: '#services' },
        { text: 'SỰ KIỆN', href: '#services' },
        { text: 'TIN TỨC', href: '#partners' },
        { text: 'LIÊN HỆ', href: '#contact' },
    ];

    /* Lấy src social icons từ nav gốc nếu có */
    const fbSrc  = document.querySelector('nav .right a:first-child img')?.getAttribute('src') || 'Svg_file/facebook-color-svgrepo-com.svg';
    const ytSrc  = document.querySelector('nav .right a:last-child  img')?.getAttribute('src') || 'Svg_file/youtube-color-svgrepo-com.svg';

    const drawer = document.createElement('div');
    drawer.className = 'nav-drawer';
    drawer.setAttribute('aria-hidden', 'true');
    drawer.innerHTML = `
        <div class="nav-drawer-backdrop"></div>
        <div class="nav-drawer-panel" role="dialog" aria-modal="true" aria-label="Menu điều hướng">
            <div class="nav-drawer-header">
                <span class="nav-drawer-logo">ZIGZAG</span>
                <button class="nav-drawer-close" aria-label="Đóng menu">&times;</button>
            </div>
            <ul class="nav-drawer-links">
                ${navLinks.map(l => `<li><a href="${l.href}">${l.text}</a></li>`).join('')}
            </ul>
            <div class="nav-drawer-social">
                <a href="#"><img src="${fbSrc}" alt="Facebook"></a>
                <a href="#"><img src="${ytSrc}" alt="YouTube"></a>
            </div>
        </div>
    `;
    document.body.appendChild(drawer);

    /* ---------- 3. Logic mở / đóng ---------- */
    const backdrop   = drawer.querySelector('.nav-drawer-backdrop');
    const closeBtn   = drawer.querySelector('.nav-drawer-close');
    const drawerLinks = drawer.querySelectorAll('.nav-drawer-links a');

    function openDrawer() {
        drawer.classList.add('is-open');
        hamburgerBtn.classList.add('is-open');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        drawer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; /* Khoá scroll nền */
    }

    function closeDrawer() {
        drawer.classList.remove('is-open');
        hamburgerBtn.classList.remove('is-open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    hamburgerBtn.addEventListener('click', openDrawer);
    closeBtn.addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', closeDrawer);

    /* Đóng khi click vào link */
    drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

    /* Đóng khi nhấn Escape */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
            closeDrawer();
        }
    });

    /* Đóng drawer nếu resize lên desktop */
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && drawer.classList.contains('is-open')) {
            closeDrawer();
        }
    });

})();
