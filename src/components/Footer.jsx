function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section footer-contacts">
            <h3>Контакты</h3>
            <div className="footer-social">
              <a
                href="https://github.com/Samurai2306"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <img src={`${import.meta.env.BASE_URL}icons8-github-1.svg`} alt="GitHub" />
              </a>
              <a
                href="https://vk.com/glebnigger"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="VKontakte"
              >
                <img src={`${import.meta.env.BASE_URL}icons8-vk-2.svg`} alt="VKontakte" />
              </a>
              <a
                href="https://t.me/MMOLODOY"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Telegram"
              >
                <img src={`${import.meta.env.BASE_URL}icons8-tg-1.svg`} alt="Telegram" />
              </a>
              <a
                href="mailto:undertale2006rus@gmail.com"
                className="social-link"
                aria-label="Email"
              >
                <img src={`${import.meta.env.BASE_URL}icons8-gmail-1.svg`} alt="Email" />
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
