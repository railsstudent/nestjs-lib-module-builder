import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { COUNTRIES } from '../enums'
import { WorldCupFinalAppearances, WorldCupFinalMatch, WorldCupModuleOptions } from '../interfaces'
import { MODULE_OPTIONS_TOKEN } from '../world-cup-module-definition'

@Injectable()
export class WorldCupService {
  private readonly results: WorldCupFinalMatch[]
  private readonly resultMap: Record<number, WorldCupFinalMatch>

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
      {
        year: 1970,
        winner: COUNTRIES.BRAZIL,
        runnerUp: COUNTRIES.ITALY,
      },
      {
        year: 1966,
        winner: COUNTRIES.ENGLAND,
        runnerUp: COUNTRIES.WEST_GERMANY,
      },
      {
        year: 1962,
        winner: COUNTRIES.BRAZIL,
        runnerUp: COUNTRIES.CZECHOSLOVAKIA,
      },
      {
        year: 1958,
        winner: COUNTRIES.BRAZIL,
        runnerUp: COUNTRIES.SWEDEN,
      },
      {
        year: 1954,
        winner: COUNTRIES.WEST_GERMANY,
        runnerUp: COUNTRIES.HUNGARY,
      },
      {
        year: 1950,
        winner: COUNTRIES.URUGUAY,
        runnerUp: COUNTRIES.BRAZIL,
      },
      {
        year: 1938,
        winner: COUNTRIES.ITALY,
        runnerUp: COUNTRIES.HUNGARY,
      },
      {
        year: 1934,
        winner: COUNTRIES.ITALY,
        runnerUp: COUNTRIES.CZECHOSLOVAKIA,
      },
      {
        year: 1930,
        winner: COUNTRIES.URUGUAY,
        runnerUp: COUNTRIES.ARGENTINA,
      },
    ]

    this.resultMap = this.results.reduce((acc, item) => {
      acc[item.year] = item
      return acc
    }, {} as Record<number, WorldCupFinalMatch>)
  }

  getYear(): number {
    return this.options.year
  }

  getResult(): WorldCupFinalMatch {
    const result = this.resultMap[this.options.year]
    if (result) {
      return result
    }
    throw new BadRequestException(`${this.options.year} is not a World Cup year.`)
  }

  getFinalAppearances(): WorldCupFinalAppearances {
    const typedCountry = COUNTRIES[this.options.favoriteCountry as keyof typeof COUNTRIES]
    if ([COUNTRIES.GERMANY, COUNTRIES.WEST_GERMANY].includes(typedCountry)) {
      return this.getGermanyAppearance()
    }

    const { finals, numOfWinners } = this.results.reduce(
      (acc, item) => {
        const { winner, runnerUp } = item
        if ([winner, runnerUp].includes(typedCountry)) {
          acc.finals.push(item)
        }
        if (winner === this.options.favoriteCountry) {
          acc.numOfWinners = acc.numOfWinners + 1
        }
        return acc
      },
      { finals: [] as WorldCupFinalMatch[], numOfWinners: 0 },
    )
    return {
      favoriteCountry: this.options.favoriteCountry,
      finals,
      numOfAppearances: finals.length,
      numOfWinners,
    }
  }

  private getGermanyAppearance(): WorldCupFinalAppearances {
    const { finals, numOfWinners } = this.results.reduce(
      (acc, item) => {
        const { winner, runnerUp } = item
        if ([winner, runnerUp].includes(COUNTRIES.GERMANY) || [winner, runnerUp].includes(COUNTRIES.WEST_GERMANY)) {
          acc.finals.push(item)
        }
        if ([COUNTRIES.GERMANY, COUNTRIES.WEST_GERMANY].includes(winner)) {
          acc.numOfWinners = acc.numOfWinners + 1
        }
        return acc
      },
      { finals: [] as WorldCupFinalMatch[], numOfWinners: 0 },
    )
    return {
      favoriteCountry: this.options.favoriteCountry,
      finals,
      numOfAppearances: finals.length,
      numOfWinners,
    }
  }
}
