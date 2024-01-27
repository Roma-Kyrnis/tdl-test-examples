import {
  Client,
  configure,
  createClient as tdlCreateClient,
  StrictLoginDetails,
  TdlError,
} from 'tdl';
import type * as Td from 'tdlib-types';

import constantsConfig from '../../../config/constants.config.ts';

type TDLibUpdateListener = (update: Td.Update) => void;

export type CreateClientConfig = {
  /**  Passing apiId and apiHash is mandatory, these values can be obtained at https://my.telegram.org/ */
  telegramApiId: number;
  /**  Passing apiId and apiHash is mandatory, these values can be obtained at https://my.telegram.org/ */
  telegramApiHash: string;
  enableErrorListener?: boolean;
  /** Default stream to `console.error` */
  errorListener?: (err: Td.error | TdlError) => void;
  enableUpdateListener?: boolean;
  /** Aside of receiving responses to your requests, the server can push to you
  events called "updates" which are received as follows, default is console.log */
  updateListener?: TDLibUpdateListener;
};

type GetLoginDetailsUser = () => StrictLoginDetails;

export type CreateClientReturn = {
  client: Client;

  logIn: (getLoginDetails: GetLoginDetailsUser) => Promise<void>;
  logOut: () => Promise<Td.ok>;
  close: () => Promise<void>;
};

configure({
  tdjson: 'libtdjson.so',
  libdir: '/usr/local/lib/',
  // verbosityLevel: 1,
  // useNewTdjsonInterface: true,
});

function getTdlDatabaseDirectory(telegramId: number): string {
  return constantsConfig.TDLIB_DATABASE_DIRECTORY + '_' + telegramId;
}

function getTdlFilesDirectory(telegramId: number): string {
  return constantsConfig.TDLIB_FILES_DIRECTORY + '_' + telegramId;
}

export async function createClient(
  config: CreateClientConfig,
  telegramId: number,
): Promise<CreateClientReturn> {
  console.log('--------------------------------Create Client--------------------------------');

  const client = tdlCreateClient({
    apiId: config.telegramApiId,
    apiHash: config.telegramApiHash,
    databaseDirectory: getTdlDatabaseDirectory(telegramId),
    filesDirectory: getTdlFilesDirectory(telegramId),
  });

  if ('enableErrorListener' in config ? config.enableErrorListener : true) {
    client.on('error', config.errorListener ?? console.error);
  }

  if (config.enableUpdateListener) {
    client.on('update', config.updateListener ?? console.log);
  }

  return {
    client,

    /** LogIn/LogOut/Stop */
    logIn(getLoginDetails: GetLoginDetailsUser): Promise<void> {
      return client.login(getLoginDetails);
    },
    logOut(): Promise<Td.ok> {
      return client.invoke({ _: 'logOut' });
    },
    close(): Promise<void> {
      return client.close();
    },
  };
}
