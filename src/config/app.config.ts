import { IAppConfig } from './app.type'

export const AppConfig: IAppConfig = {
  api: import.meta.env.VITE_API_URL || '',
  ggApi: import.meta.env.VITE_GG_API_URL || ''
}
