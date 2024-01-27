import { StrictLoginDetails } from 'tdl';

import { MyContext, MyConversation } from './types.ts';

export function getLoginDetails(
  conversation: MyConversation,
  ctx: MyContext,
): () => StrictLoginDetails {
  return function () {
    const loginDetails: StrictLoginDetails = {
      type: 'user',
      async getAuthCode(retry) {
        await ctx.reply(
          retry
            ? 'Please enter correct code from Telegram encoded in base64 as a template afdsf23f923f223='
            : 'Please enter your code encoded in base64',
        );
        const codeBase64 = await conversation.form.text();
        return Buffer.from(codeBase64, 'base64').toString('utf-8');
      },
      async getName() {
        await ctx.reply('Please enter your first name');
        const firstName = await conversation.form.text();
        await ctx.reply('Please enter your last name');
        const lastName = await conversation.form.text();
        return { firstName, lastName };
      },
      async confirmOnAnotherDevice(link) {
        await ctx.reply(
          'Please verify authorization on another device by using this link: ' + link,
        );
      },
      async getPassword(passwordHint, retry) {
        const hint = passwordHint ? '\n\n' + 'HINT: ' + ' ' + passwordHint : '';
        await ctx.reply(
          retry ? 'Please enter your password' : 'Incorrect password. Enter one`s more' + hint,
        );
        const password = await conversation.form.text();
        return password;
      },
      async getPhoneNumber(retry) {
        await ctx.reply(
          retry
            ? 'Please enter correct phone number as a template +380123456789'
            : 'Please enter your phone number',
        );
        const phone = await conversation.form.text();
        return phone;
      },
      async getEmailAddress() {
        await ctx.reply('Please enter your email address as an example hello@gmail.com');
        const email = await conversation.form.text();
        return email;
      },
      async getEmailCode() {
        await ctx.reply('Please enter your code from email');
        const emailCode = await conversation.form.text();
        return emailCode;
      },
    };
    return loginDetails;
  };
}
