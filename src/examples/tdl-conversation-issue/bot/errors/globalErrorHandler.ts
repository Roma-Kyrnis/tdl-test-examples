import { ErrorHandler, GrammyError, HttpError } from 'grammy';

import { MyContext } from '../conversations/types.ts';

export const globalErrorHandler: ErrorHandler<MyContext> = err => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  console.log(err);

  const e = err.error;
  if (e instanceof GrammyError) {
    console.error('Error in request:', e.description);
  } else if (e instanceof HttpError) {
    console.error('Could not contact Telegram:', e);
  } else {
    console.error('Unknown error:', e);
  }
};
