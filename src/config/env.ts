import 'reflect-metadata';

import path from 'node:path';
import process from 'node:process';

import { plainToClass } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsString, validateSync } from 'class-validator';
import * as dotenv from 'dotenv';

import constants from './constants.config.ts';
import { Environment } from './types.ts';

let { NODE_ENV: nodeENV } = process.env;

if (!Object.values(Environment).find(env => env === nodeENV)) {
  console.warn(`WARN: Default NODE_ENV is using - ${constants.DEFAULT_NODE_ENV}`);
  nodeENV = constants.DEFAULT_NODE_ENV;
}

dotenv.config({ path: path.resolve(process.cwd(), `.env.${nodeENV}`) });

class EnvironmentVariables {
  /** Environment:
   * sqlite:runMigrations force: env.NODE_ENV === Environment.Development/ This setting should be set to false if your data should be persistent*/
  @IsEnum(Environment)
  NODE_ENV: Environment;

  /** Server */
  @IsNumber()
  PORT: number;

  @IsString()
  HOST: string;

  /** TDLib */
  @IsString()
  TELEGRAM_BOT_TOKEN: string;

  @IsNumber()
  TELEGRAM_APP_ID: number;

  @IsString()
  TELEGRAM_APP_HASH: string;

  /** SQLite */
  @IsString()
  DATABASE_SQLITE_DATABASE_NAME: string;

  @IsBoolean()
  DATABASE_MIGRATIONS_FORCE: boolean;
}

const validation = (): EnvironmentVariables => {
  const envConfig = {
    /** Environment */
    NODE_ENV: nodeENV,

    /** Server */
    PORT: parseInt(process.env.PORT ?? '', 10) || constants.DEFAULT_PORT,
    HOST: process.env.HOST ?? constants.DEFAULT_HOST,
    REMOTE_DOMAIN: process.env.REMOTE_DOMAIN,

    /** TDLib */
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_APP_ID: process.env.TELEGRAM_APP_ID && parseInt(process.env.TELEGRAM_APP_ID),
    TELEGRAM_APP_HASH: process.env.TELEGRAM_APP_HASH,

    /** SQLite */
    DATABASE_SQLITE_DATABASE_NAME: process.env.DATABASE_SQLITE_DATABASE_NAME,
    /** If true, will force the migration API to rollback and re-apply the latest migration over again each time when Node.js app launches. */
    DATABASE_MIGRATIONS_FORCE:
      nodeENV === Environment.Production
        ? false
        : process.env.DATABASE_MIGRATIONS_FORCE === constants.DATABASE_MIGRATIONS_FORCE_TRUE,
  };

  try {
    const validatedConfig = plainToClass(EnvironmentVariables, envConfig, {
      enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }
    return validatedConfig;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default validation();
