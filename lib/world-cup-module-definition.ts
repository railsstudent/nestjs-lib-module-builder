import { ConfigurableModuleBuilder } from '@nestjs/common'
import { WorldCupModuleOptions } from './interfaces'

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<WorldCupModuleOptions>()
  .setClassMethodName('forRoot')
  .build()
