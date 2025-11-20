function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section footer-about">
            <h3>Глеб Чернов</h3>
            <p className="footer-role">Fullstack разработчик & Студент РТУ МИРЭА</p>
            <p className="footer-description">
              Создаю современные веб-решения с фокусом на качество и производительность
            </p>
            <a
              href="https://samurai2306.github.io/portfolio_project"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-portfolio-link"
            >
              Портфолио разработчика
            </a>
          </div>
          <div className="footer-section footer-contacts">
            <h3>Контакты</h3>
            <div className="footer-contact-list">
              <a
                href="https://t.me/MMOLODOY"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-item"
              >
                <img src={`${import.meta.env.BASE_URL}icons8-tg-1.svg`} alt="Telegram" />
                <span>Telegram @mm0l0d0y</span>
              </a>
              <a
                href="https://github.com/Samurai2306"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-item"
              >
                <img src={`${import.meta.env.BASE_URL}icons8-github-1.svg`} alt="GitHub" />
                <span>GitHub Samurai2306</span>
              </a>
              <a
                href="mailto:undertale2006rus@gmail.com"
                className="footer-contact-item"
              >
                <img src={`${import.meta.env.BASE_URL}icons8-gmail-1.svg`} alt="Email" />
                <span>undertale2006rus@gmail.com</span>
              </a>
              <a
                href="https://vk.com/glebnigger"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-item"
              >
                <img src={`${import.meta.env.BASE_URL}icons8-vk-2.svg`} alt="VKontakte" />
                <span>VK glebnigger</span>
              </a>
              <a
                href="https://samurai2306.github.io/Tecno_tracker"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-item"
              >
                <span className="footer-contact-icon">🌤️</span>
                <span>Трекер технологий</span>
              </a>
            </div>
          </div>
          <div className="footer-section footer-info">
            <p className="footer-text">
              Приложение для отслеживания погоды с динамическими темами и прогнозами по маршрутам.
            </p>
          </div>
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()} ГЛЕБ ЧЕРНОВ. СОЗДАНО С ❤️ И БОЛЬШИМ КОЛИЧЕСТВОМ КОДА.
        </div>
      </div>
    </footer>
  )
}

export default Footer
