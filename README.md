# Cloud Computing Group Assignment

A modern, responsive cloud-native web application deployed to **Google App Engine** (PaaS) and **OpenFaaS** (FaaS). Built by a team of 20 students.

## Project Structure

```
├── backend/              # Django REST API
│   ├── config/           # Django project (settings, urls, wsgi)
│   ├── api/              # API app (views, urls, data, logger)
│   ├── manage.py
│   ├── requirements.txt
│   ├── app.yaml          # Google App Engine config
│   └── .env.example
├── frontend/             # React + Vite + Tailwind CSS
│   └── src/
│       ├── components/   # Navbar, Footer, StatusBadge
│       └── pages/        # Home, Members, Deployment, EnvConfig, Logs, About
├── openfaas/             # OpenFaaS function
│   ├── stack.yml
│   └── cloud-function/
├── .gitignore
└── README.md
```

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React 18, Vite 5, Tailwind CSS 3    |
| Backend  | Python 3.12, Django 5, DRF 3.15     |
| PaaS     | Google App Engine (python312)        |
| FaaS     | OpenFaaS (node20)                   |
| Server   | Gunicorn 22 + WhiteNoise 6          |

## Installation

### Backend

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env        # edit values
python manage.py runserver 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The Vite dev server proxies `/api/*` requests to `http://localhost:8000`.

## Dependency Versions

| Package               | Version |
|-----------------------|---------|
| Python                | 3.12.x  |
| Django                | 5.0.6   |
| djangorestframework   | 3.15.2  |
| django-cors-headers   | 4.3.1   |
| gunicorn              | 22.0.0  |
| whitenoise            | 6.7.0   |
| React                 | 18.2.0  |
| Vite                  | 5.0.4   |
| Tailwind CSS          | 3.3.6   |

## API Endpoints

| Endpoint       | Description               |
|----------------|---------------------------|
| `GET /`        | API info + timestamp      |
| `GET /members` | All 20 group members      |
| `GET /health`  | Health check              |
| `GET /config`  | Safe config + dep versions|
| `GET /logs`    | Application log entries   |

## Environment Variables

Create `backend/.env` from `.env.example`:

```
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
APP_NAME=Cloud Project
PLATFORM=Google App Engine
PORT=8000
```

Secrets are **never** committed. See `.gitignore`.

## Google App Engine Deployment

```bash
cd backend

# Authenticate
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# Deploy (uses app.yaml — python312 runtime)
gcloud app deploy

# Open deployed app
gcloud app browse

# Stream logs
gcloud app logs tail -s default
```

## OpenFaaS Deployment

```bash
cd openfaas

# Login
faas-cli login --gateway http://YOUR_GATEWAY:8080 --password YOUR_PASSWORD

# Build, push, deploy
faas-cli build -f stack.yml
faas-cli push -f stack.yml
faas-cli deploy -f stack.yml

# Monitor
faas-cli logs cloud-function
```

## Security Measures

- Secrets loaded exclusively via `os.environ` / `python-dotenv`
- `.env` files excluded via `.gitignore`
- Only safe variables surfaced through `/config` endpoint
- `DEBUG=False` in production
- HTTPS enforced via `app.yaml` handler `secure: always`
- `SECRET_KEY` never hardcoded

## Monitoring & Logs

The `/logs` endpoint and Logs dashboard show:
- Application startup events
- Deployment success confirmations
- Health check results
- Per-request log entries

## Testing

```bash
# Health check
curl http://localhost:8000/health

# Members list
curl http://localhost:8000/members

# Safe config
curl http://localhost:8000/config

# Logs
curl http://localhost:8000/logs
```
