/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTEXT_SEASON: import('./utils/ohys').SeasonParam['season']
  readonly VITE_CONTEXT_YEAR: number
  readonly VITE_WEBHOOK_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
