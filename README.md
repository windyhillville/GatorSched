# GatorSched (Senior Design)

GatorSched is a mobile-first employee scheduling application.  
This repo contains:

- **frontend/** — React Native (Expo + TypeScript)
- **backend/** — Python (FastAPI, scheduling logic, and database layer)

## Repo Structure (high level)

```
employee-scheduler/
├── frontend/
├── backend/
├── docs/
└── README.md
```

## Prerequisites

### Required

- **Node.js** (LTS recommended)
- **npm** (comes with Node)
- **Python 3.11+** recommended (3.10+ usually OK)

### Recommended

- Git
- VS Code

---

# Frontend Setup (Expo + TypeScript)

## 1) Install dependencies

From the repo root:

### Mac / Linux / Windows

```bash
cd frontend
npm install
```

## 2) Run the app

```bash
npm run start
```

# Backend Setup (Python + FastAPI)

## 1) Create and activate a virtual environment

### Mac / Linux

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
```

### Windows (PowerShell)

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
```

> These instructions assume PowerShell. If you are using a different shell (e.g., Git Bash), equivalent commands may be required.

## 2) Install backend dependencies

```bash
pip install -r requirements.txt -r requirements-dev.txt
```

## 3) Run the API server (don't worry about this right now)

```bash
uvicorn gatorsched_api.main:app --reload
```

> By default the backend will run at:
> http://127.0.0.1:8000

## Connecting Frontend ↔ Backend (Dev Notes)

    •	The mobile app will call the backend via HTTP (FastAPI).
    •	When running on a simulator/emulator, http://127.0.0.1:8000 usually works.
    •	When running on a physical phone, you typically need to use your computer’s LAN IP

(example: http://192.168.1.50:8000).
