# LogiTrack · Login Frontend

## Estructura del proyecto

```
logitrack-login/
├── public/
│   └── index.html
├── src/
│   ├── config/
│   │   └── app.config.ts        # ← Variables de entorno centralizadas
│   ├── types/
│   │   └── auth.types.ts        # Tipos TypeScript (LoginRequest, AuthState…)
│   ├── services/
│   │   └── auth.service.ts      # Llamadas HTTP + manejo de errores API
│   ├── hooks/
│   │   └── useAuth.ts           # Lógica de negocio (estado, login, logout)
│   ├── utils/
│   │   └── validation.utils.ts  # Reglas de validación de formulario
│   ├── components/
│   │   └── auth/
│   │       ├── LoginPage.tsx    # Layout + composición
│   │       ├── LoginForm.tsx    # Formulario con react-hook-form
│   │       └── Dashboard.tsx    # Vista post-login
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── .env.example                 # Plantilla de variables de entorno
├── .env.local                   # Variables locales (NO subir a git)
├── vercel.json                  # Configuración de despliegue
├── tsconfig.json
└── package.json
```

---

## Variables de entorno

Todas las configuraciones sensibles o dependientes del entorno están en variables `REACT_APP_*`. **Nunca hay valores quemados en el código fuente.**

| Variable                    | Descripción                          | Ejemplo                        |
|-----------------------------|--------------------------------------|--------------------------------|
| `REACT_APP_API_BASE_URL`    | URL base del backend                 | `https://api.logitrack.com`    |
| `REACT_APP_API_VERSION`     | Versión de la API                    | `v1`                           |
| `REACT_APP_APP_NAME`        | Nombre de la app en la UI            | `LogiTrack`                    |
| `REACT_APP_JWT_STORAGE_KEY` | Clave en localStorage para el token  | `logitrack_token`              |

### Para desarrollo local

```bash
cp .env.example .env.local
```

`.env.local` está en `.gitignore` y **nunca se sube al repositorio**.

---

## Instalación y uso local

### Requisitos
- Node.js ≥ 18
- npm ≥ 9

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-org/logitrack-login.git
cd logitrack-login

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con la URL de tu backend

# 4. Iniciar en modo desarrollo
npm start
```

La app abre en `http://localhost:3000`.

### Credenciales de prueba (hardcoded en el backend)

| Email                       | Contraseña    | Rol       |
|-----------------------------|---------------|-----------|
| admin@logitrack.com         | admin123      | ADMIN     |
| operator@logitrack.com      | operator123   | OPERATOR  |
| viewer@logitrack.com        | viewer123     | VIEWER    |

---

## Decisiones de arquitectura

### Separación de responsabilidades

```
UI Component  →  Custom Hook  →  Service  →  API
(LoginForm)      (useAuth)    (authService) (Spring Boot)
```

- **Componentes**: solo renderizan UI y delegan eventos
- **Hooks**: encapsulan estado y lógica de negocio
- **Services**: manejan HTTP, parseo de errores y almacenamiento
- **Config**: centraliza todas las variables de entorno

### Manejo de errores

El servicio clasifica los errores de la API en categorías legibles:

| HTTP Status | Mensaje al usuario                              |
|-------------|--------------------------------------------------|
| Sin conexión| "No se pudo conectar al servidor…"               |
| 401         | "Credenciales inválidas…"                        |
| 400         | "Datos de entrada inválidos"                     |
| 5xx         | "Error interno del servidor. Inténtalo más tarde"|

### Validación

Validación en dos capas:
1. **Client-side** (react-hook-form): feedback inmediato sin petición al servidor
2. **Server-side**: errores del backend mostrados en el alert global

---

## Scripts disponibles

```bash
npm start       # Desarrollo (hot reload)
npm run build   # Build de producción en ./build
npm test        # Tests con Jest
```

---

## Seguridad

- El token JWT se almacena en `localStorage` bajo la clave configurada en `REACT_APP_JWT_STORAGE_KEY`
- Headers de seguridad configurados en `vercel.json`:  `X-Frame-Options`, `X-XSS-Protection`, `X-Content-Type-Options`
- Ninguna credencial está quemada en el código fuente
- El archivo `.env.local` está excluido del repositorio vía `.gitignore`
