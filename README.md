# Employee Profile

Employee registration form built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and **shadcn/ui**.

## Quick Start

```bash
# Install dependencies
npm install

# Start both mock API server and Next.js dev server
npm run dev:all
```

Open [http://localhost:3000](http://localhost:3000).

### Or start separately

```bash
# Terminal 1: Mock API server (port 3001)
npm run mock-api

# Terminal 2: Next.js dev server (port 3000)
npm run dev
```

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 (App Router) | Framework |
| React 19 | UI library |
| Tailwind CSS v4 + shadcn/ui | Styling |
| react-hook-form + yup | Form handling & validation |
| TanStack React Query | Data fetching |
| Radix UI | Headless UI primitives |
| json-server | Mock REST API |
| sonner | Toast notifications |
| lucide-react | Icons |
| date-fns + react-day-picker | Date handling |

## Features

- **Personal Information** — FIN, document details, personal info, contact & address
- **Employment History** — Dynamic multiple records with organization, division, position
- **Form Validation** — yup schema with Azerbaijani error messages
- **Save Draft** — Persists form data to localStorage
- **Mock API** — 15 reference data endpoints (cities, genders, organizations, etc.)

## Form Sections

1. **Şəxsi məlumatlar — Əlaqə Məlumatları** (Personal & Contact Information)
   - 1.1 Şəxsi məlumatlar — ID document, name, gender, birth, citizenship
   - 1.2 Əlaqə və ünvan məlumatları — Registration, phone, email
2. **Əmək fəaliyyəti — Təhsil — Elmi dərəcə — Sertifikatlar** (Employment)
   - 2.1 Əmək fəaliyyəti — Dynamic employment blocks with organization, position, dates

## Mock API

The mock API runs on `http://localhost:3001` and provides reference data:

- `GET /organizations` — Available organizations
- `GET /structuralDivisions` — Divisions (filtered by `parentId`)
- `GET /positions` — Positions (filtered by `parentId`)
- `GET /cities` — Azerbaijani cities
- `GET /genders`, `GET /maritalStatuses`, `GET /nationalities`, `GET /citizenships`
- `GET /documentSeries`, `GET /issuingAuthorities`
- `GET /workTypes`, `GET /civilServantOptions`, `GET /terminationReasons`
- `GET /phonePrefixes`

Data source: `mock-api/db.json`

## Validation Rules

- **FİN** — 7 alphanumeric characters
- **Ş.V. nömrəsi** — digits only
- **Doğum tarixi** — must be at least 18 years ago
- **Sənədin verilmə tarixi** — after birth date, not in the future
- **Mobil nömrə** — 7 digits
- **E-mail** — valid email format
- Required fields marked with `*`

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run mock-api` | Start json-server on port 3001 |
| `npm run dev:all` | Run mock API + Next.js concurrently |

## Project Structure

```
app/
  create-employee/page.tsx    # Main form page
  layout.tsx                  # Root layout (Roboto font, providers)
  globals.css                 # Tailwind + shadcn theme
components/
  employee-form/              # Form-specific components
  ui/                         # shadcn/ui components
hooks/                        # React Query hooks
lib/                          # API client, schema, providers
mock-api/                     # json-server database
types/                        # TypeScript interfaces
```
