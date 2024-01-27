import { conversations as initConversation, createConversation } from '@grammyjs/conversations';
import { Bot, session } from 'grammy';

import constantsConfig from '../../../config/constants.config.ts';
import env from '../../../config/env.ts';
import { authConversation } from './conversations/auth.ts';
import { MyContext } from './conversations/types.ts';
import { globalErrorHandler } from './errors/globalErrorHandler.ts';

const bot = new Bot<MyContext>(env.TELEGRAM_BOT_TOKEN);

/** Maybe issue here: https://github.com/grammyjs/grammY/issues/345 */
// bot.use(
//   session({
//     type: 'multi',
//     conversation: {
//       initial() {
//         // return empty object for now
//         return {};
//       },
//     },
//   }),
// );
bot.use(
  session({
    initial() {
      // return empty object for now
      return {};
    },
  }),
);

/** Conversations: */
bot.use(initConversation());
bot.use(createConversation(authConversation, { id: constantsConfig.CONVERSATIONS.AUTH }));

bot.command('start', async ctx => {
  await ctx.conversation.enter(constantsConfig.CONVERSATIONS.AUTH);
});

bot.catch(globalErrorHandler);

/** Promise executes after bot stops or crushes */
export async function startBot(): Promise<void> {
  await bot.start({
    onStart(botInfo) {
      console.log(botInfo);
    },
  });
}

export async function stopBot(): Promise<void> {
  await bot.stop();
}
