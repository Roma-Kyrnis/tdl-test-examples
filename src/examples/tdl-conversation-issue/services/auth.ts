import { StrictLoginDetails } from 'tdl';

export const getLoginDetails: (telegramId: number, onStart?: boolean) => () => StrictLoginDetails =
  (telegramId, onStart) => () => {
    const loginDetails: StrictLoginDetails = {
      type: 'user',
      // onAuthCode: async retry => {
      //   await sendBotMessage(telegramId, ua.ASK_TEXT.AUTH.CODE[retry ? 'RETRY' : 'ENTER']);
      // },
      // onName: async () => {
      //   await sendBotMessage(telegramId, ua.ASK_TEXT.AUTH.NAME);
      // },
      // confirmOnAnotherDevice: async link => {
      //   await sendBotMessage(telegramId, ua.ASK_TEXT.AUTH.CONFIRM_ON_ANOTHER_DEVICE + link);
      // },
      // onPassword: async (passwordHint, retry) => {
      //   const hint = passwordHint
      //     ? '\n\n' + ua.ASK_TEXT.AUTH.PASSWORD.HINT + ' ' + passwordHint
      //     : '';
      //   await sendBotMessage(
      //     telegramId,
      //     ua.ASK_TEXT.AUTH.PASSWORD[retry ? 'RETRY' : 'ENTER'] + hint,
      //   );
      // },
      async getPhoneNumber(retry) {
        const phone = await convers
        await sendBotMessage(telegramId, ua.ASK_TEXT.AUTH.PHONE_NUMBER[retry ? 'RETRY' : 'ENTER']);
      },
      // onStateReady: async () => {
      //   let message = ua.RESULT_TEXT.AUTH.SUCCESS;
      //   if (onStart) message += '\n\n' + ua.RESULT_TEXT.AUTH.ON_START;

      //   await sendBotMessage(telegramId, message);
      //   await updateUser(telegramId, { authorization_state: 'authorizationStateReady' });
      // },
    };
    return loginDetails;
  };
