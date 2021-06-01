import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigKeys } from 'src/config/config.enum';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { ConnectionOptions } from 'typeorm';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) =>
      ({
        type: 'postgres',
        host: config.get(ConfigKeys.DBHOST),
        port: +config.get(ConfigKeys.DBPORT),
        username: config.get(ConfigKeys.DBUSER),
        password: config.get(ConfigKeys.DBPASS),
        database: config.get(ConfigKeys.DBNAME),
        entities: [join(__dirname, '..', '**', '*.entity{.ts,.js}')],
        migrations: [join(__dirname, 'migrations', '*{.ts,.js}')],
      } as ConnectionOptions),
  }),
];
