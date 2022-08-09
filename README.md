## Description

Use ConfigurableModuleBuilder of NestJS 9 to build library in an easy way.

## Installation

```bash
$ npm i nestjs-world-cup-lib
```

## Register synchronously

```typescript
@Module({
  WorldCupModule.forRoot({
    year: 1994,
    favoriteCountry: 'Brazil',
  })
})
export class AppModule {}
```

## Register asynchronously

```typescript
@Module({
  WorldCupModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (service: ConfigService) => ({
      year: service.get<number>('YEAR'),
      favoriteCountry: service.get<string>('FAVORITE_COUNTRY'),
    }),
  }),
})
export class AppModule {}
```
