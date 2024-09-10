import _ from 'lodash';
import { Context, Markup } from 'telegraf';
import { makeGetRequest } from 'src/utils.js';
import { Talk } from 'shared/types/talk.js';

export async function handleListCommand(ctx: Context) {
  const talks = await makeGetRequest<Talk[]>('/talks');

  const formattedTalks = talks.map((talk) => talk.title).join('\n\n');

  const keyboard = Markup.keyboard(
    _.chunk(
      talks.map((_, index) => ({
        text: `${index + 1}`,
        web_app: { url: process.env.WEBAPP_BASE_URL + `/talk/${index}` },
      }))
    )
  ).resize();

  await ctx.reply(formattedTalks, keyboard);
}
