import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { MODULE_OPTIONS_TOKEN } from '@nestjs/common/cache/cache.module-definition'
import { WorldCupModuleOptions } from '../interfaces'

@Injectable()
export class WorldCupService {
  constructor(@Inject(MODULE_OPTIONS_TOKEN) private options: WorldCupModuleOptions) {}

  getYear(): number {
    return this.options.year
  }

  getResults(): { winner: string; runnerUp: string } {
    throw new BadRequestException(`${this.options.year} is not a World Cup year.`)
  }
}
