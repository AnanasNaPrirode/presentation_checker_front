# Деплой frontend на Render

SPA на React + Vite. Разворачивается как **Static Site**.

Порядок: **сначала backend**, затем этот frontend (нужен URL API).

---

## 1. Подготовка репозитория

1. Закоммитьте и запушьте проект в GitHub/GitLab.
2. В корне должны быть: `package.json`, `vite.config.ts`, `render.yaml`, `public/`.

---

## 2. Создание Static Site в Render

[Dashboard](https://dashboard.render.com/) → **New** → **Static Site** → репозиторий `presentation_checker_front`.

### Поля формы

| Поле | Значение |
|------|----------|
| **Name** | `pptx-checker-front` (или своё) |
| **Region** | `Frankfurt (EU Central)` — желательно тот же регион, что у API |
| **Branch** | `main` |
| **Root Directory** | оставить пустым |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |

---

## 3. Переменные окружения (Environment)

**Environment** → **Add Environment Variable**:

| Key | Value | Пример |
|-----|-------|--------|
| `VITE_API_URL` | URL backend **без** `/` в конце | `https://pptx-checker-api.onrender.com` |

Важно:

- Переменная вшивается в сборку на этапе **build**. После смены `VITE_API_URL` нужен **Manual Deploy** (пересборка).
- Не добавляйте `/api` в конец — клиент сам вызывает `/api/check` и `/api/rules`.
- Для локальной разработки переменную можно не задавать: Vite проксирует `/api` на `http://127.0.0.1:8000`.

---

## 4. После деплоя

1. Дождитесь **Live**.
2. URL: `https://pptx-checker-front.onrender.com` (или ваш Name).
3. Откройте сайт, загрузите `.pptx` — должен пойти запрос на `{VITE_API_URL}/api/check`.

### Если CORS / «Failed to fetch»

На **backend** в Render задайте:

| Key | Value |
|-----|-------|
| `FRONTEND_URL` | `https://pptx-checker-front.onrender.com` |

Перезапустите backend (Manual Deploy). Подробности — в `DEPLOY.md` backend-репозитория.

---

## 5. Blueprint (опционально)

В репозитории есть `render.yaml`.  
**New** → **Blueprint** → выберите репозиторий.  
`VITE_API_URL` задайте вручную до или сразу после первого деплоя.

---

## 6. Ограничения Free tier

- Статика отдаётся быстро, cold start не касается HTML/JS.
- Первый запрос к API после простоя backend может занять 30–60 с — на экране будет долгая «Проверяем презентацию…».

---

## 7. Локальный запуск

```powershell
cd presentation_checker_front
npm install
npm run dev
```

Откройте http://localhost:5173 (backend на порту 8000).

С явным API:

```powershell
$env:VITE_API_URL="http://127.0.0.1:8000"
npm run dev
```

---

## 8. Связка с backend

| Шаг | Действие |
|-----|----------|
| 1 | Задеплоить backend, скопировать URL API |
| 2 | На frontend: `VITE_API_URL` = URL API |
| 3 | Задеплоить frontend, скопировать URL сайта |
| 4 | На backend: `FRONTEND_URL` = URL frontend |
| 5 | Manual Deploy обоих сервисов при смене URL |

Пример:

```
VITE_API_URL=https://pptx-checker-api.onrender.com
FRONTEND_URL=https://pptx-checker-front.onrender.com
```
