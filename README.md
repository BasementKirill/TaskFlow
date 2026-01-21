<div align="center">
  <img src="assets/icon.png" width="144"/>
  <h1 align="center">TaskFlow</h1>

  <p align="center">
    <strong>TaskFlow ist ein Open-Source Automatisierungstool, das die Lücke zwischen statischen To-Do-Listen und aktiven System-Workflows schließt.</strong>
  </p>

  <p align="center">
    TaskFlow wurde entwickelt, um tägliche Routinen zu vereinfachen, indem Aufgaben direkt mit ausführbaren Systemaktionen verknüpft werden. Gebaut mit Node.js (Electron, Vue, TypeScript).
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/version-0.0.1-blue?style=for-the-badge" alt="Version" />
    <img src="https://img.shields.io/badge/updated-Jan_2026-orange?style=for-the-badge" alt="Last Updated" />
    <a href="#">
      <img src="https://img.shields.io/badge/website-coming_soon-green?style=for-the-badge" alt="Website" />
    </a>
  </p>

  <br/>
  
  <img src="assets/screenshot.png" alt="TaskFlow Dashboard Preview" width="100%" style="border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);" />

</div>

---

## Features

- **Visueller Workflow-Builder**: Erstelle komplexe Automatisierungen intuitiv per Drag-and-Drop.
- **Modulare Bausteine**: Nutze vorgefertigte Aktionen wie Programmstarts, URL-Aufrufe oder Shell-Skripte.
- **Echtzeit-Synchronisation**: Dank Supabase sind deine Workflows auf all deinen Geräten sofort verfügbar.
- **Native System-Integration**: Tiefe Betriebssystem-Anbindung durch Electron für maximale Kontrolle.
- **Fokus-Modus**: Minimiere Ablenkungen, indem du dein gesamtes Arbeits-Setup mit nur einem Klick vorbereitest.

## Tech Stack

TaskFlow nutzt moderne Technologien für eine performante und sichere Desktop-Erfahrung:

- **Frontend**: [Vue.js 3](https://vuejs.org/) & [Tailwind CSS](https://tailwindcss.com/)
- **DesignComponents**: [Shadcn/vue](https://www.shadcn-vue.com/docs/components)
- **Runtime**: [Electron](https://www.electronjs.org/) & [Node.js](https://nodejs.org/)
- **Sprache**: [TypeScript](https://www.typescriptlang.org/)
- **Backend**: [Supabase](https://supabase.com/) (PostgreSQL & Realtime)

## Build from source

Um TaskFlow lokal zu bauen, folge diesen Schritten:

1. Repository klonen:
   ```bash
   git clone [https://github.com/BasementKirill/TaskFlow.git](https://github.com/BasementKirill/TaskFlow.git)
   npm init
   npm run dev
