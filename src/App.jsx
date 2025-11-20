import { useCallback, useEffect, useMemo, useState } from 'react'
import CitySelector from './components/CitySelector'
import WeatherDisplay from './components/WeatherDisplay'
import FocusLocationCard from './components/FocusLocationCard'
import Accordion from './components/Accordion'
import RouteSelector from './components/RouteSelector'
import RouteWeather from './components/RouteWeather'
import ExtremeWeatherAlert from './components/ExtremeWeatherAlert'
import Footer from './components/Footer'
import './App.css'

const CITIES = [
  { name: 'Москва', query: 'Moscow', highlighted: true },
  { name: 'Мытищи', query: 'Mytishchi', highlighted: true },
  { name: 'Санкт-Петербург', query: 'Saint Petersburg' },
  { name: 'Сочи', query: 'Sochi' },
  { name: 'Подольск', query: 'Podolsk, Moscow Oblast' },
  { name: 'Химки', query: 'Khimki, Moscow Oblast' },
  { name: 'Королёв', query: 'Korolyov, Moscow Oblast' },
  { name: 'Люберцы', query: 'Lyubertsy, Moscow Oblast' },
  { name: 'Одинцово', query: 'Odintsovo, Moscow Oblast' },
  { name: 'Серпухов', query: 'Serpukhov, Moscow Oblast' },
  { name: 'Щёлково', query: 'Shchelkovo, Moscow Oblast' },
  { name: 'Сергиев Посад', query: 'Sergiyev Posad, Moscow Oblast' },
  { name: 'Пушкино', query: 'Pushkino, Moscow Oblast' },
  { name: 'Лобня', query: 'Lobnya, Moscow Oblast' },
  { name: 'Дубна', query: 'Dubna, Moscow Oblast' },
  { name: 'Коломна', query: 'Kolomna, Moscow Oblast' },
  { name: 'Балашиха', query: 'Balashikha, Moscow Oblast' },
  { name: 'Фрязино', query: 'Fryazino, Moscow Oblast' }
]

const FOCUS_LOCATIONS = [
  {
    id: 'mytishchi',
    title: 'Станция Мытищи',
    subtitle: '15‑минутные срезы',
    query: '55.9139,37.7453',
    extended: false,
    accent: 'north'
  },
  {
    id: 'yaroslavsky',
    title: 'Ярославский вокзал',
    subtitle: 'центр Москвы',
    query: '55.7797,37.6564',
    extended: true,
    accent: 'central'
  },
  {
    id: 'mirea',
    title: 'Корпуса РТУ МИРЭА',
    subtitle: 'проспект Вернадского',
    query: '55.6699,37.4825',
    extended: true,
    accent: 'south'
  },
  {
    id: 'mirea-pirog',
    title: 'МИРЭА, Малая Пироговская',
    subtitle: 'кампус на набережной',
    query: '55.7481,37.5658',
    extended: true,
    accent: 'river'
  },
  {
    id: 'mei',
    title: 'Главный корпус МЭИ',
    subtitle: 'Энергетический проезд',
    query: '55.7554,37.7022',
    extended: true,
    accent: 'east'
  },
  {
    id: 'dacha',
    title: 'Дача',
    subtitle: '56.214900, 38.168589',
    query: '56.214900,38.168589',
    extended: false,
    accent: 'country'
  }
]

const ROUTES = [
  {
    id: 'mirea-vernadsky',
    name: 'Маршрут к МИРЭА (Вернадского)',
    description: 'Мытищи → Ярославский вокзал → МИРЭА',
    icon: '🎓',
    locations: [
      { name: 'Станция Мытищи', query: '55.9139,37.7453' },
      { name: 'Ярославский вокзал', query: '55.7797,37.6564' },
      { name: 'МИРЭА (Вернадского)', query: '55.6699,37.4825' }
    ]
  },
  {
    id: 'mirea-pirog',
    name: 'Маршрут к МИРЭА (Малая Пироговская)',
    description: 'Мытищи → Ярославский вокзал → МИРЭА',
    icon: '🎓',
    locations: [
      { name: 'Станция Мытищи', query: '55.9139,37.7453' },
      { name: 'Ярославский вокзал', query: '55.7797,37.6564' },
      { name: 'МИРЭА (Малая Пироговская)', query: '55.7481,37.5658' }
    ]
  },
  {
    id: 'mei',
    name: 'Маршрут к МЭИ',
    description: 'Мытищи → Ярославский вокзал → МЭИ',
    icon: '⚡',
    locations: [
      { name: 'Станция Мытищи', query: '55.9139,37.7453' },
      { name: 'Ярославский вокзал', query: '55.7797,37.6564' },
      { name: 'МЭИ', query: '55.7554,37.7022' }
    ]
  },
  {
    id: 'guz',
    name: 'Маршрут к ГУЗ',
    description: 'Мытищи → Ярославский вокзал → ГУЗ',
    icon: '🏛️',
    locations: [
      { name: 'Станция Мытищи', query: '55.9139,37.7453' },
      { name: 'Ярославский вокзал', query: '55.7797,37.6564' },
      { name: 'ГУЗ', query: '55.7586,37.6561' }
    ]
  },
  {
    id: 'mgsu',
    name: 'Маршрут к МГСУ',
    description: 'Мытищи → Ярославский вокзал → МГСУ',
    icon: '🏗️',
    locations: [
      { name: 'Станция Мытищи', query: '55.9139,37.7453' },
      { name: 'Ярославский вокзал', query: '55.7797,37.6564' },
      { name: 'МГСУ', query: '55.8083,37.7000' }
    ]
  },
  {
    id: 'baumann',
    name: 'Маршрут к МГТУ им. Баумана',
    description: 'Мытищи → Ярославский вокзал → МГТУ',
    icon: '🔧',
    locations: [
      { name: 'Станция Мытищи', query: '55.9139,37.7453' },
      { name: 'Ярославский вокзал', query: '55.7797,37.6564' },
      { name: 'МГТУ им. Баумана', query: '55.7654,37.6846' }
    ]
  }
]

const DEMO_CONDITIONS = [
  {
    text: 'Ясно',
    code: 1000,
    icon: 'https://cdn.weatherapi.com/weather/64x64/day/113.png'
  },
  {
    text: 'Перистые облака',
    code: 1003,
    icon: 'https://cdn.weatherapi.com/weather/64x64/day/116.png'
  },
  {
    text: 'Небольшой дождь',
    code: 1063,
    icon: 'https://cdn.weatherapi.com/weather/64x64/day/353.png'
  },
  {
    text: 'Снегопад',
    code: 1066,
    icon: 'https://cdn.weatherapi.com/weather/64x64/day/338.png'
  },
  {
    text: 'Гроза',
    code: 1087,
    icon: 'https://cdn.weatherapi.com/weather/64x64/day/389.png'
  }
]

const API_KEY = (import.meta.env.VITE_WEATHER_API_KEY ?? 'b4be8a662e224d608ce81855251811').trim()
const hasApiKey = Boolean(API_KEY)

const WEATHER_CODE_THEMES = {
  // Ясно
  1000: 'day',
  // Облачно
  1003: 'day',
  1006: 'day',
  1009: 'dusk',
  // Туман
  1030: 'dusk',
  1135: 'dusk',
  1147: 'dusk',
  // Дождь
  1063: 'rain',
  1069: 'rain',
  1072: 'rain',
  1150: 'rain',
  1153: 'rain',
  1168: 'rain',
  1171: 'rain',
  1180: 'rain',
  1183: 'rain',
  1186: 'rain',
  1189: 'rain',
  1192: 'rain',
  1195: 'rain',
  1198: 'rain',
  1201: 'rain',
  1204: 'rain',
  1207: 'rain',
  1240: 'rain',
  1243: 'rain',
  1246: 'rain',
  // Снег
  1066: 'snow',
  1114: 'snow',
  1117: 'snow',
  1210: 'snow',
  1213: 'snow',
  1216: 'snow',
  1219: 'snow',
  1222: 'snow',
  1225: 'snow',
  1237: 'snow',
  // Смешанные осадки (дождь со снегом)
  1249: 'rain',
  1252: 'rain',
  1255: 'rain',
  1258: 'rain',
  1261: 'rain',
  1264: 'rain',
  // Гроза
  1087: 'storm',
  1273: 'storm',
  1276: 'storm',
  1279: 'storm',
  1282: 'storm'
}

const determineTheme = (payload) => {
  if (!payload) return 'night'

  // Проверяем код погоды
  if (payload.condition?.code && WEATHER_CODE_THEMES[payload.condition.code]) {
    const theme = WEATHER_CODE_THEMES[payload.condition.code]
    // Если день, используем светлые темы
    if (payload.isDay && (theme === 'rain' || theme === 'snow')) {
      return theme
    }
    if (payload.isDay && theme === 'day') {
      return 'day'
    }
    if (!payload.isDay && theme === 'storm') {
      return 'storm'
    }
  }

  // Проверяем текстовое описание
  const conditionText = payload.condition?.text?.toLowerCase() || ''
  if (conditionText.includes('дождь') || conditionText.includes('rain')) {
    return payload.isDay ? 'rain' : 'rain'
  }
  if (conditionText.includes('снег') || conditionText.includes('snow')) {
    return payload.isDay ? 'snow' : 'snow'
  }
  if (conditionText.includes('гроза') || conditionText.includes('thunder') || conditionText.includes('storm')) {
    return 'storm'
  }
  if (conditionText.includes('туман') || conditionText.includes('fog') || conditionText.includes('mist')) {
    return payload.isDay ? 'dusk' : 'dusk'
  }

  // Если день и ясно/облачно - используем персиковую тему
  if (payload.isDay) {
    const hour = new Date(payload.localtime ?? Date.now()).getHours()
    if (hour >= 7 && hour < 21) {
      if (conditionText.includes('ясно') || conditionText.includes('clear') || conditionText.includes('sunny')) {
        return 'day'
      }
      if (conditionText.includes('облачно') || conditionText.includes('cloud')) {
        return 'day'
      }
      return 'day'
    }
  }

  // По времени суток
  if (!payload.isDay) {
    return 'night'
  }

  const hour = new Date(payload.localtime ?? Date.now()).getHours()
  if (hour < 7 || hour >= 21) return 'twilight'
  if (hour >= 7 && hour < 12) return 'sunrise'
  if (hour >= 12 && hour < 18) return 'day'
  return 'sunset'
}

const randomFromArray = (list) => list[Math.floor(Math.random() * list.length)]

const formatIcon = (icon) => {
  if (!icon) return ''
  return icon.startsWith('//') ? `https:${icon}` : icon
}

const normalizeCurrentPayload = (current) => ({
  temp: Math.round(current.temp_c),
  feelsLike: Math.round(current.feelslike_c),
  humidity: current.humidity,
  pressure: current.pressure_mb,
  wind: (current.wind_kph / 3.6).toFixed(1),
  condition: {
    text: current.condition.text,
    icon: formatIcon(current.condition.icon)
  },
  time: current.last_updated,
  isDay: Boolean(current.is_day)
})

const normalizeHourPayload = (hour) => {
  if (!hour) return null
  return {
    temp: Math.round(hour.temp_c),
    feelsLike: Math.round(hour.feelslike_c ?? hour.temp_c),
    humidity: hour.humidity,
    pressure: hour.pressure_mb,
    wind: (hour.wind_kph / 3.6).toFixed(1),
    condition: {
      text: hour.condition.text,
      icon: formatIcon(hour.condition.icon)
    },
    time: hour.time,
    isDay: Boolean(hour.is_day)
  }
}

const findHourEntry = (hours, targetEpoch) => {
  if (!hours?.length) return null
  const after = hours.find((hour) => hour.time_epoch >= targetEpoch)
  if (after) return after
  return hours[hours.length - 1]
}

const formatCustomLabel = (value) => {
  if (!value) return ''
  const formatter = new Intl.DateTimeFormat('ru-RU', {
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit'
  })
  return `Выбранное время · ${formatter.format(new Date(value))}`
}

const buildTimelineFromForecast = (data, location, customTime) => {
  const hours = (data.forecast?.forecastday ?? []).flatMap((day) => day.hour ?? [])
  const nowEpoch = data.current.last_updated_epoch

  const timeline = [
    {
      key: 'now',
      label: 'Сейчас',
      payload: normalizeCurrentPayload(data.current)
    },
    {
      key: 'next15',
      label: 'Через 15 минут',
      payload: normalizeHourPayload(findHourEntry(hours, nowEpoch + 15 * 60))
    }
  ]

  if (location.extended) {
    timeline.push({
      key: 'next90',
      label: 'Через 1 час 30 минут',
      payload: normalizeHourPayload(findHourEntry(hours, nowEpoch + 90 * 60))
    })
  }

  if (customTime) {
    const customEpoch = Math.round(new Date(customTime).getTime() / 1000)
    timeline.push({
      key: 'custom',
      label: formatCustomLabel(customTime),
      payload: normalizeHourPayload(findHourEntry(hours, customEpoch))
    })
  }

  return {
    location: {
      city: data.location.name,
      country: data.location.country
    },
    updated: data.current.last_updated,
    timeline: timeline.filter((item) => item.payload)
  }
}

const createMockHours = (seed) => {
  const baseEpoch = Math.round(Date.now() / 1000)
  return Array.from({ length: 12 }).map((_, index) => {
    const tempShift = index - 2
    return {
      time_epoch: baseEpoch + index * 3600,
      time: new Date((baseEpoch + index * 3600) * 1000).toISOString(),
      temp_c: seed.temp + tempShift,
      feelslike_c: seed.feelsLike + tempShift * 0.6,
      humidity: Math.max(10, Math.min(100, seed.humidity + tempShift * 2)),
      pressure_mb: seed.pressure,
      wind_kph: parseFloat(seed.wind) * 3.6,
      condition: seed.condition,
      is_day: index % 24 < 18 ? 1 : 0
    }
  })
}

const buildMockTimeline = (mock, location, customTime) => {
  const pseudoHours = createMockHours(mock)
  const nowEpoch = Math.round(Date.now() / 1000)
  const timeline = [
    {
      key: 'now',
      label: 'Сейчас (демо)',
      payload: {
        temp: mock.temp,
        feelsLike: mock.feelsLike,
        humidity: mock.humidity,
        pressure: mock.pressure,
        wind: mock.wind,
        condition: mock.condition,
        time: new Date().toISOString(),
        isDay: mock.isDay
      }
    },
    {
      key: 'next15',
      label: 'Через 15 минут',
      payload: normalizeHourPayload(findHourEntry(pseudoHours, nowEpoch + 15 * 60))
    }
  ]

  if (location.extended) {
    timeline.push({
      key: 'next90',
      label: 'Через 1 час 30 минут',
      payload: normalizeHourPayload(findHourEntry(pseudoHours, nowEpoch + 90 * 60))
    })
  }

  if (customTime) {
    const customEpoch = Math.round(new Date(customTime).getTime() / 1000)
    timeline.push({
      key: 'custom',
      label: formatCustomLabel(customTime),
      payload: normalizeHourPayload(findHourEntry(pseudoHours, customEpoch))
    })
  }

  return {
    location: { city: mock.city, country: mock.country },
    updated: new Date().toISOString(),
    timeline: timeline.filter((item) => item.payload)
  }
}

function App() {
  const [selectedCity, setSelectedCity] = useState(CITIES[0])
  const [weather, setWeather] = useState(null)
  const [status, setStatus] = useState(API_KEY ? 'loading' : 'demo')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [theme, setTheme] = useState('night')
  const [focusWeather, setFocusWeather] = useState({})
  const [focusStatus, setFocusStatus] = useState(hasApiKey ? 'loading' : 'demo')
  const [focusError, setFocusError] = useState('')
  const [customTime, setCustomTime] = useState('')
  const [selectedRoute, setSelectedRoute] = useState(null)
  const [routeWeather, setRouteWeather] = useState([])
  const [routeLoading, setRouteLoading] = useState(false)
  const [temperatureUnit, setTemperatureUnit] = useState('C')
  const [searchQuery, setSearchQuery] = useState('')
  const [forecast, setForecast] = useState(null)
  const [moscowWeather, setMoscowWeather] = useState(null)
  const [themeMode, setThemeMode] = useState('auto') // 'auto' или 'manual'
  const [manualTheme, setManualTheme] = useState('light') // 'light' или 'dark'

  useEffect(() => {
    if (themeMode === 'auto') {
      document.body.dataset.theme = theme
      document.body.dataset.darkMode = 'false'
    } else {
      document.body.dataset.theme = manualTheme === 'dark' ? 'night' : 'day'
      document.body.dataset.darkMode = manualTheme === 'dark' ? 'true' : 'false'
    }
  }, [theme, themeMode, manualTheme])

  const fetchMockWeather = useCallback(async (city) => {
    await new Promise((resolve) => setTimeout(resolve, 650))

    const seasons = {
      winter: { min: -18, max: -3 },
      spring: { min: 0, max: 14 },
      summer: { min: 14, max: 28 },
      autumn: { min: -2, max: 10 }
    }

    const month = new Date().getMonth()
    let season = 'winter'
    if (month >= 2 && month <= 4) season = 'spring'
    else if (month >= 5 && month <= 7) season = 'summer'
    else if (month >= 8 && month <= 10) season = 'autumn'

    const tempRange = seasons[season]
    const temperature =
      Math.round(Math.random() * (tempRange.max - tempRange.min) + tempRange.min)
    const condition = randomFromArray(DEMO_CONDITIONS)
    const now = new Date()

    const feelsLike = temperature - Math.round(Math.random() * 4)
    const tempF = Math.round(temperature * 9 / 5 + 32)
    const feelsLikeF = Math.round(feelsLike * 9 / 5 + 32)
    
    return {
      city: city.name,
      country: 'Россия',
      temp: temperature,
      tempF: tempF,
      feelsLike: feelsLike,
      feelsLikeF: feelsLikeF,
      humidity: Math.round(Math.random() * 50 + 40),
      pressure: 1000 + Math.round(Math.random() * 18),
      wind: (Math.random() * 7 + 1.5).toFixed(1),
      tempRange: [temperature - 3, temperature + 3],
      tempRangeF: [tempF - 5, tempF + 5],
      condition: {
        ...condition,
        code: condition.code || 1000
      },
      isDay: now.getHours() >= 6 && now.getHours() <= 20,
      localtime: now.toISOString(),
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().split(' ')[0].slice(0, 5)
    }
  }, [])

  const fetchFocusWeather = useCallback(
    async (location) => {
      if (!location) return null

      if (!hasApiKey) {
        const mock = await fetchMockWeather({ name: location.title })
        return {
          id: location.id,
          title: location.title,
          subtitle: location.subtitle,
          accent: location.accent,
          mode: 'demo',
          ...buildMockTimeline(mock, location, customTime)
        }
      }

      const params = new URLSearchParams({
        key: API_KEY,
        q: location.query,
        lang: 'ru',
        days: '2',
        aqi: 'no',
        alerts: 'no'
      })

      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?${params}`)
      if (!response.ok) {
        const errPayload = await response.json().catch(() => ({}))
        throw new Error(errPayload?.error?.message || `Не удалось получить погоду для ${location.title}`)
      }

      const data = await response.json()
      return {
        id: location.id,
        title: location.title,
        subtitle: location.subtitle,
        accent: location.accent,
        mode: 'ready',
        ...buildTimelineFromForecast(data, location, customTime)
      }
    },
    [customTime, fetchMockWeather]
  )

  const fetchWeather = useCallback(
    async (city) => {
      if (!city) return

      if (!API_KEY) {
        const mock = await fetchMockWeather(city)
        setWeather(mock)
        setTheme(determineTheme(mock))
        setStatus('demo')
        setError('')
        return
      }

      setLoading(true)
      setError('')
      setStatus('loading')

      try {
        const params = new URLSearchParams({
          key: API_KEY,
          q: city.query,
          lang: 'ru',
          days: '3',
          aqi: 'no',
          alerts: 'yes'
        })
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?${params}`)

        if (!response.ok) {
          const errPayload = await response.json().catch(() => ({}))
          throw new Error(errPayload?.error?.message || 'Не удалось получить погоду')
        }

        const data = await response.json()

        const normalized = {
          city: data.location.name,
          country: data.location.country,
          temp: Math.round(data.current.temp_c),
          tempF: Math.round(data.current.temp_f),
          feelsLike: Math.round(data.current.feelslike_c),
          feelsLikeF: Math.round(data.current.feelslike_f),
          humidity: data.current.humidity,
          pressure: data.current.pressure_mb,
          wind: (data.current.wind_kph / 3.6).toFixed(1),
          tempRange: [Math.round(data.current.temp_c - 2), Math.round(data.current.temp_c + 2)],
          tempRangeF: [Math.round(data.current.temp_f - 3.6), Math.round(data.current.temp_f + 3.6)],
          condition: {
            text: data.current.condition.text,
            code: data.current.condition.code,
            icon: data.current.condition.icon.startsWith('//')
              ? `https:${data.current.condition.icon}`
              : data.current.condition.icon
          },
          isDay: Boolean(data.current.is_day),
          localtime: data.location.localtime,
          date: data.location.localtime.split(' ')[0],
          time: data.location.localtime.split(' ')[1]
        }

        if (data.forecast?.forecastday) {
          const forecastData = data.forecast.forecastday.slice(0, 3).map((day) => ({
            date: day.date,
            dateEpoch: day.date_epoch,
            day: {
              maxtemp_c: Math.round(day.day.maxtemp_c),
              maxtemp_f: Math.round(day.day.maxtemp_f),
              mintemp_c: Math.round(day.day.mintemp_c),
              mintemp_f: Math.round(day.day.mintemp_f),
              condition: {
                text: day.day.condition.text,
                icon: day.day.condition.icon.startsWith('//')
                  ? `https:${day.day.condition.icon}`
                  : day.day.condition.icon,
                code: day.day.condition.code
              }
            }
          }))
          setForecast(forecastData)
        }

        setWeather(normalized)
        setTheme(determineTheme(normalized))
        setStatus('ready')

        if (city.name !== 'Москва') {
          const moscowParams = new URLSearchParams({
            key: API_KEY,
            q: 'Moscow',
            lang: 'ru',
            aqi: 'no'
          })
          const moscowResponse = await fetch(`https://api.weatherapi.com/v1/current.json?${moscowParams}`)
          if (moscowResponse.ok) {
            const moscowData = await moscowResponse.json()
            setMoscowWeather({
              temp: Math.round(moscowData.current.temp_c),
              tempF: Math.round(moscowData.current.temp_f)
            })
          }
        } else {
          setMoscowWeather(null)
        }
      } catch (err) {
        console.error(err)
        const mock = await fetchMockWeather(city)
        setWeather(mock)
        setTheme(determineTheme(mock))
        setStatus('demo')
        setError(err.message)
      } finally {
        setLoading(false)
      }
    },
    [fetchMockWeather]
  )

  useEffect(() => {
    fetchWeather(selectedCity)
  }, [selectedCity, fetchWeather])

  useEffect(() => {
    let ignore = false
    setFocusStatus(hasApiKey ? 'loading' : 'demo')
    setFocusError('')

    async function loadFocus() {
      try {
        const payloads = await Promise.all(FOCUS_LOCATIONS.map((loc) => fetchFocusWeather(loc)))
        if (ignore) return
        const mapped = payloads.reduce((acc, item) => {
          if (!item) return acc
          acc[item.id] = item
          return acc
        }, {})
        setFocusWeather(mapped)
        setFocusStatus(hasApiKey ? 'ready' : 'demo')
      } catch (err) {
        if (ignore) return
        console.error(err)
        setFocusError(err.message)
        setFocusStatus('demo')
      }
    }

    loadFocus()

    return () => {
      ignore = true
    }
  }, [customTime, fetchFocusWeather])

  const modeLabel = useMemo(() => {
    if (status === 'ready') return 'Онлайн данные'
    if (status === 'loading') return 'Загрузка данных...'
    return 'Демо-режим'
  }, [status])

  const handleRetry = () => fetchWeather(selectedCity)

  const fetchRouteWeather = useCallback(
    async (route) => {
      if (!route || !route.locations) return

      setRouteLoading(true)
      setRouteWeather([])

      try {
        const now = new Date()

        const weatherPromises = route.locations.map(async (location, index) => {
          // Определяем временные интервалы для текущей точки
          let intervals
          if (index === 0) {
            // Мытищи: сейчас и через 15 минут
            intervals = [
              { offset: 0, label: 'Сейчас' },
              { offset: 15 * 60, label: 'Через 15 минут' }
            ]
          } else if (index === 1) {
            // Ярославский вокзал: через 30 и 45 минут
            intervals = [
              { offset: 30 * 60, label: 'Через 30 минут' },
              { offset: 45 * 60, label: 'Через 45 минут' }
            ]
          } else {
            // Конечная точка: через 1 час и 2 часа
            intervals = [
              { offset: 60 * 60, label: 'Через 1 час' },
              { offset: 120 * 60, label: 'Через 2 часа' }
            ]
          }

          if (!hasApiKey) {
            const mock = await fetchMockWeather({ name: location.name })
            return {
              location: location.name,
              intervals: intervals.map((interval) => ({
                label: interval.label,
                temp: mock.temp,
                feelsLike: mock.feelsLike,
                humidity: mock.humidity,
                wind: mock.wind,
                condition: mock.condition,
                time: new Date(now.getTime() + interval.offset * 1000).toLocaleTimeString('ru-RU', {
                  hour: '2-digit',
                  minute: '2-digit'
                })
              }))
            }
          }

          // Получаем прогноз на 2 дня для доступа к почасовым данным
          const params = new URLSearchParams({
            key: API_KEY,
            q: location.query,
            lang: 'ru',
            days: '2',
            aqi: 'no',
            alerts: 'no'
          })

          const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?${params}`)
          if (!response.ok) throw new Error(`Ошибка для ${location.name}`)

          const data = await response.json()
          const hours = (data.forecast?.forecastday ?? []).flatMap((day) => day.hour ?? [])
          const currentEpoch = data.current.last_updated_epoch

          const intervalData = intervals.map((interval) => {
            // Для первой точки и интервала "Сейчас" используем текущие данные
            if (index === 0 && interval.offset === 0) {
              return {
                label: interval.label,
                temp: Math.round(data.current.temp_c),
                feelsLike: Math.round(data.current.feelslike_c),
                humidity: data.current.humidity,
                wind: (data.current.wind_kph / 3.6).toFixed(1),
                condition: {
                  text: data.current.condition.text,
                  icon: formatIcon(data.current.condition.icon)
                },
                time: new Date(data.location.localtime).toLocaleTimeString('ru-RU', {
                  hour: '2-digit',
                  minute: '2-digit'
                })
              }
            }

            const targetEpoch = currentEpoch + interval.offset
            const hourData = findHourEntry(hours, targetEpoch)

            if (!hourData) {
              // Fallback на текущие данные
              return {
                label: interval.label,
                temp: Math.round(data.current.temp_c),
                feelsLike: Math.round(data.current.feelslike_c),
                humidity: data.current.humidity,
                wind: (data.current.wind_kph / 3.6).toFixed(1),
                condition: {
                  text: data.current.condition.text,
                  icon: formatIcon(data.current.condition.icon)
                },
                time: new Date((currentEpoch + interval.offset) * 1000).toLocaleTimeString('ru-RU', {
                  hour: '2-digit',
                  minute: '2-digit'
                })
              }
            }

            return {
              label: interval.label,
              temp: Math.round(hourData.temp_c),
              feelsLike: Math.round(hourData.feelslike_c ?? hourData.temp_c),
              humidity: hourData.humidity,
              wind: (hourData.wind_kph / 3.6).toFixed(1),
              condition: {
                text: hourData.condition.text,
                icon: formatIcon(hourData.condition.icon)
              },
              time: new Date(hourData.time_epoch * 1000).toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit'
              })
            }
          })

          return {
            location: location.name,
            intervals: intervalData
          }
        })

        const results = await Promise.all(weatherPromises)
        setRouteWeather(results)
      } catch (err) {
        console.error('Ошибка загрузки погоды по маршруту:', err)
        setRouteWeather([])
      } finally {
        setRouteLoading(false)
      }
    },
    [fetchMockWeather]
  )

  const handleRouteSelect = (route) => {
    setSelectedRoute(route)
    fetchRouteWeather(route)
  }

  return (
    <div className="app">
      <header className="hero">
        <p className="eyebrow">О проекте</p>
        <h1>Моя погода</h1>
        <p className="tagline">
          Современное приложение на React с динамическими градиентами и стеклянными панелями,
          которое подстраивает тему под погоду и время суток. Погода определена по местам моего маршрута в вуз.
        </p>
        <div className="hero-meta">
          <span className={`chip ${status}`}>{modeLabel}</span>
          <span className="chip outline">React 18 · Vite</span>
          <div className="controls">
            <button
              className={`control-button ${temperatureUnit === 'C' ? 'active' : ''}`}
              onClick={() => setTemperatureUnit('C')}
            >
              °C
            </button>
            <button
              className={`control-button ${temperatureUnit === 'F' ? 'active' : ''}`}
              onClick={() => setTemperatureUnit('F')}
            >
              °F
            </button>
            <div className="theme-controls">
              {themeMode === 'auto' ? (
                <>
                  <button
                    className={`control-button theme-mode active`}
                    onClick={() => setThemeMode('auto')}
                    title="Автоматическая тема по погоде"
                  >
                     Авто
                  </button>
                  <button
                    className="control-button theme-switch"
                    onClick={() => setThemeMode('manual')}
                    title="Переключить на ручной выбор темы"
                  >
                     Ручной
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="control-button theme-switch"
                    onClick={() => setThemeMode('auto')}
                    title="Вернуться к автоматической теме"
                  >
                    
                  </button>
                  <button
                    className={`control-button ${manualTheme === 'light' ? 'active' : ''}`}
                    onClick={() => setManualTheme('light')}
                    title="Светлая тема"
                  >
                    ☀️
                  </button>
                  <button
                    className={`control-button ${manualTheme === 'dark' ? 'active' : ''}`}
                    onClick={() => setManualTheme('dark')}
                    title="Темная тема"
                  >
                    🌙
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <Accordion title="🌍 Погода в городах" icon="🌍" defaultOpen={true}>
          <div className="accordion-inner">
            <CitySelector
              cities={CITIES}
              selectedCity={selectedCity}
              onCityChange={setSelectedCity}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            {loading && (
              <div className="loading-block">
                <div className="spinner" />
                <p>Получаем свежие данные...</p>
              </div>
            )}
            {!loading && weather && (
              <>
                <ExtremeWeatherAlert weather={weather} />
                <WeatherDisplay
                  weather={weather}
                  status={status}
                  onRetry={handleRetry}
                  error={error}
                  temperatureUnit={temperatureUnit}
                  moscowWeather={moscowWeather}
                  forecast={forecast}
                />
              </>
            )}
          </div>
        </Accordion>

        <Accordion title="🎓 Погода по маршруту к вузу" icon="🎓" defaultOpen={false}>
          <div className="accordion-inner">
            <RouteSelector routes={ROUTES} selectedRoute={selectedRoute} onRouteSelect={handleRouteSelect} />
            <RouteWeather route={selectedRoute} weatherData={routeWeather} loading={routeLoading} />
          </div>
        </Accordion>

        <Accordion title="📍 Расширенные точки" icon="📍" defaultOpen={false}>
          <div className="accordion-inner">
            <div className="time-input">
              <label htmlFor="custom-time">Собственное время</label>
              <input
                id="custom-time"
                type="datetime-local"
                value={customTime}
                onChange={(event) => setCustomTime(event.target.value)}
              />
              {customTime && (
                <button type="button" className="ghost" onClick={() => setCustomTime('')}>
                  Очистить
                </button>
              )}
      </div>
            <p className="mini-note">
              Для каждой точки показываем актуальные данные, прогноз через 15 минут, а для московских
              объектов — погоду через 1 час 30 минут и значение на выбранное вами время.
            </p>
            {focusStatus === 'loading' && <div className="focus-placeholder">Собираем данные...</div>}
            {focusError && <div className="note warning">{focusError}</div>}
            <div className="focus-accordions">
              {FOCUS_LOCATIONS.map((location) => (
                <Accordion
                  key={location.id}
                  title={`${location.icon || '📍'} ${location.title}`}
                  defaultOpen={false}
                >
                  <FocusLocationCard location={location} data={focusWeather[location.id]} />
                </Accordion>
              ))}
            </div>
          </div>
        </Accordion>
      </main>
      <Footer />
    </div>
  )
}

export default App
