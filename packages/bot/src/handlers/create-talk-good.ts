import { Context } from 'telegraf';

export async function handleCreateCommand(ctx: Context) {
  await ctx.reply('Click the button below to create new Talk', {
    reply_markup: {
      inline_keyboard: [[{ text: 'Create', web_app: { url: process.env.WEBAPP_BASE_URL + `/talk` } }]],
    },
  });
}
