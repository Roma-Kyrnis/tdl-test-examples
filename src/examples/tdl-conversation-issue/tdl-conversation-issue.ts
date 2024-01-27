import { startBot, stopBot } from './bot/bot.ts';

export async function bootTdlConversationIssue(): Promise<void> {
  try {
    await startBot();
  } catch (error) {
    console.log('bootTdlConversationIssue:STOP');
    console.log(error);

    await stopBot();
  }
}
