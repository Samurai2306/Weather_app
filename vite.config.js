import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Для GitHub Pages: base должен соответствовать имени репозитория
// Например, если репозиторий называется 'Weather_app', то base = '/Weather_app/'
// Для кастомного домена или корневого деплоя используйте base = '/'
const getBasePath = () => {
  // В GitHub Actions используем переменную окружения или имя репозитория
  if (process.env.GITHUB_ACTIONS) {
    // Можно использовать переменную окружения VITE_BASE_PATH
    // или определить из GITHUB_REPOSITORY (формат: owner/repo-name)
    const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]
    return repoName ? `/${repoName}/` : '/Weather_app/'
  }
  // Для локальной разработки используем корневой путь
  return '/'
}

export default defineConfig({
  plugins: [react()],
  base: getBasePath(),
})
