import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'test_users',
        password: 'asdf123$',
        database: 'test',
        entities: [__dirname + '/../**/*.entity{.ts, .js}'],
        synchronize: true,
      }),
  },
];
