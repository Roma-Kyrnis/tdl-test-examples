import { createClient, CreateClientConfig, CreateClientReturn } from './client.ts';

type GetTDLibInstanceConfig = CreateClientConfig;

type TDLibInstance = Omit<CreateClientReturn, 'client'>;

export async function getTDLibInstance(
  config: GetTDLibInstanceConfig,
  telegramId: number,
): Promise<TDLibInstance> {
  const { client, ...clientFunctions } = await createClient(config, telegramId);

  return { ...clientFunctions };
}
