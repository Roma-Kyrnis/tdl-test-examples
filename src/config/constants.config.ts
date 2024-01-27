import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';

import { DAYS_OF_WEEK, Environment } from './types.ts';

const volumesFolderName = 'volumes';
const volumesFolderPath = path.resolve(volumesFolderName);
if (!existsSync(volumesFolderPath)) {
  mkdirSync(volumesFolderPath);
}

const databaseFoldername = path.join(volumesFolderPath, 'db');
if (!existsSync(databaseFoldername)) {
  mkdirSync(databaseFoldername);
}

/** TODO: remove this check: */
console.log('volumesFolderPath: ' + volumesFolderPath);

export default {
  DEFAULT_NODE_ENV: Environment.Production,
  DEFAULT_PORT: 3000,
  DEFAULT_HOST: '::',

  DATABASE_FOLDERNAME: databaseFoldername,
  DATABASE_MIGRATIONS_PATH: path.resolve('src', 'db', 'sqlite', 'migrations'),
  /** If true, will force the migration API to rollback and re-apply the latest migration over again each time when Node.js app launches. */
  DATABASE_MIGRATIONS_FORCE_TRUE: 'true',

  TDLIB_DATABASE_DIRECTORY: `${volumesFolderPath}/_td_database`,
  TDLIB_FILES_DIRECTORY: `${volumesFolderPath}/_td_files`,

  TDLIB: {
    REPLY_MARKUP_LIMIT_BUTTONS: 99,
  },

  DATABASE_TABLE_NAMES: {
    USERS: 'users',
    CHATS: 'chats',
    USERS_CHATS: 'users_chats',
    MESSAGES: 'messages',
  },

  DAYS_OF_WEEK: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as DAYS_OF_WEEK[],

  CHATS: {
    /** Due to limitations:
     * https://pypi.org/project/keyboa/#:~:text=Due%20to%20Telegram%20API%20limitation%20you%20can%20add%20up%20to%208%20buttons%20per%20row%20and%20up%20to%20100%20for%20the%20entire%20keyboard.
     */
    LIMIT: 98,
    CALLBACK_QUERY: {
      CHOOSE_CHAT: 'chats:choose:',
    },
  },
  PERIODICITY: {
    MINUTES: { MIN: 0, MAX: 59 },
    HOURS: { MIN: 0, MAX: 23 },
    regExpForAnySymbol: /^[*?]$/,
    regExpRangeNumber: /^\d+-\d+$/,
  },

  CONVERSATIONS: {
    AUTH: 'authorization',
    DE_AUTH: 'de_authorization',

    CHATS_REMOVE: 'chats_remove',

    MESSAGE_SET: 'message_set',
    MESSAGE_GET: 'message_get',
    MESSAGE_UPDATE: 'message_update',

    PERIODICITY_GET: 'periodicity_get',
    PERIODICITY_UPDATE: 'periodicity_update',
  },
};
