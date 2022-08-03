import { Module } from '@nestjs/common'
import { WorldCupService } from './services'
import { ConfigurableModuleClass } from './world-cup-module-definition'

@Module({
  providers: [WorldCupService],
  exports: [WorldCupService],
})
export class WorldCupModule extends ConfigurableModuleClass {}
