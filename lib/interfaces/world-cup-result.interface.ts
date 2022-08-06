import { COUNTRIES } from '../enums'

export interface WorldCupFinalMatch {
  year: number
  winner: COUNTRIES
  runnerUp: COUNTRIES
}

export interface WorldCupFinalAppearances {
  favoriteCountry: string
  finals: WorldCupFinalMatch[]
  numOfAppearances: number
  numOfWinners: number
}
