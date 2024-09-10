import { Context } from 'telegraf';

export async function handleStartCommand(ctx: Context) {
  await ctx.reply('Welcome to TallinnJS Organizer Bot!\nWhat do you want to do?');
}
