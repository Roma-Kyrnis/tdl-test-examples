import env from '../../../../config/env.ts';
import { getTDLibInstance } from '../../tdl/main.ts';
import { getLoginDetails } from './getLoginDetailts.ts';
import { MyContext, MyConversation } from './types.ts';

export const authConversation = async (
  conversation: MyConversation,
  ctx: MyContext,
): Promise<void> => {
  if (!ctx.from) {
    console.log(`User does not have 'from' field`);
    console.log(ctx.update);
    return;
  }

  const telegramId = ctx.from.id;

  const appId = env.TELEGRAM_APP_ID;
  const appHash = env.TELEGRAM_APP_HASH;

  const client = await conversation.external({
    task: getTDLibInstance,
    args: [
      { telegramApiId: appId, telegramApiHash: appHash, enableUpdateListener: false },
      telegramId,
    ],
  });

  await conversation.external({
    task: client.logIn,
    args: [getLoginDetails(conversation, ctx)],
    beforeStoreError: value => {
      console.log('logIn');
      console.log(value);
    },
  });

  await ctx.reply('Authorization success');
};
