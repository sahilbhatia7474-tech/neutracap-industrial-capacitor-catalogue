# NeutraCap — Industrial Capacitor Catalogue

High-Reliability Starting, Running, Green Filter & DC Aluminium Electrolytic Capacitors with 35+ years industrial engineering heritage.

## Overview
NeutraCap is a precision industrial capacitor engineering platform and comprehensive digital specification catalogue featuring 490 verified baseline variants across 4 core product families:
- **Motor Starting Capacitors** (230V / 275V Heavy-Duty Phenolic Enclosure)
- **Motor Running Capacitors** (400V / 440V / 450V Metallized Polypropylene Film)
- **Green Filter / Power Factor Capacitors** (Low Loss MPP Dielectric)
- **DC Aluminium Electrolytic Capacitors** (High Ripple Current / Extended Endurance)

## Key Architecture
- **Framework**: Vite + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 with industrial navy/cyan aesthetic
- **PWA Ready**: Web App Manifest, App Shell Precaching Service Worker, Installable Standalone App
- **Media Engine**: Canonical single-asset facility tour & product media registry
- **Founder Vault**: Management desks for specifications, technical media, and RFQ logs

## Development & Build

### Prerequisites
- Node.js 18+ / Bun / npm

### Install Dependencies
```bash
npm install
```

### Run Locally
```bash
npm run dev
```
Starts development server on `http://localhost:3000`.

### Production Build
```bash
npm run build
```
Generates production bundle in `./dist`.

### Deployment
This repository is configured with `vercel.json` for seamless static SPA deployment on Vercel, Netlify, or Cloud Run.
