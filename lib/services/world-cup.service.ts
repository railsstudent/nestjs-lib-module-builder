import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { MODULE_OPTIONS_TOKEN } from '@nestjs/common/cache/cache.module-definition'
import { COUNTRIES } from '../enums'
import { WorldCupModuleOptions } from '../interfaces'

@Injectable()
export class WorldCupService {
  private readonly results: { year: number; winner: COUNTRIES; runnerUp: COUNTRIES }[]

  constructor(@Inject(MODULE_OPTIONS_TOKEN) private options: WorldCupModuleOptions) {
    this.results = [
      {
        year: 2018,
        winner: COUNTRIES.FRANCE,
        runnerUp: COUNTRIES.CROATIA,
      },
      {
        year: 2014,
        winner: COUNTRIES.GERMANY,
        runnerUp: COUNTRIES.ARGENTINA,
      },
      {
        year: 2010,
        winner: COUNTRIES.SPAIN,
        runnerUp: COUNTRIES.NETHERLANDS,
      },
      {
        year: 2006,
        winner: COUNTRIES.ITALY,
        runnerUp: COUNTRIES.FRANCE,
      },
      {
        year: 2002,
        winner: COUNTRIES.BRAZIL,
        runnerUp: COUNTRIES.GERMANY,
      },
      {
        year: 1998,
        winner: COUNTRIES.FRANCE,
        runnerUp: COUNTRIES.BRAZIL,
      },
      {
        year: 1994,
        winner: COUNTRIES.BRAZIL,
        runnerUp: COUNTRIES.ITALY,
      },
      {
        year: 1990,
        winner: COUNTRIES.WEST_GERMANY,
        runnerUp: COUNTRIES.ARGENTINA,
      },
      {
        year: 1986,
        winner: COUNTRIES.ARGENTINA,
        runnerUp: COUNTRIES.WEST_GERMANY,
      },
      {
        year: 1982,
        winner: COUNTRIES.ITALY,
        runnerUp: COUNTRIES.WEST_GERMANY,
      },
      {
        year: 1978,
        winner: COUNTRIES.ARGENTINA,
        runnerUp: COUNTRIES.NETHERLANDS,
      },
      {
        year: 1974,
        winner: COUNTRIES.WEST_GERMANY,
        runnerUp: COUNTRIES.NETHERLANDS,
      },
    ]
  }

  getYear(): number {
    return this.options.year
  }

  getResults(): { winner: COUNTRIES; runnerUp: COUNTRIES } {
    const result = this.results[this.options.year]
    if (result) {
      return {
        winner: result.winner,
        runnerUp: result.runnerUp,
      }
    }
    throw new BadRequestException(`${this.options.year} is not a World Cup year.`)
  }
}
