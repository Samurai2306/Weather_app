function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Контакты</h3>
            <div className="footer-social">
              <a
                href="https://github.com/Samurai2306"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <img src="/icons8-github-1.svg" alt="GitHub" />
              </a>
              <a
                href="https://vk.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="VKontakte"
              >
                <img src="/icons8-vk-2.svg" alt="VKontakte" />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Telegram"
              >
                <img src="/icons8-tg-1.svg" alt="Telegram" />
              </a>
              <a
                href="mailto:example@mail.com"
                className="social-link"
                aria-label="Email"
              >
                <img src="/icons8-gmail-1.svg" alt="Email" />
              </a>
            </div>
          </div>
          <div className="footer-section">
            <p className="footer-text">
              Приложение для отслеживания погоды с динамическими темами и прогнозами по маршрутам.
            </p>
            <p className="footer-copyright">
              © {new Date().getFullYear()} Weather App. Все права защищены.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
