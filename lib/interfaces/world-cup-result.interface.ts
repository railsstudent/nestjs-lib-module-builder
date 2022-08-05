import { COUNTRIES } from '../enums'

export interface WorldCupFinalMatch {
  year: number
  winner: COUNTRIES
  runnerUp: COUNTRIES
}

export type WorldCupResult = Omit<WorldCupFinalMatch, 'year'>
