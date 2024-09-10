import { Context } from 'telegraf';
import { WebAppResponse } from 'src/types.js';
import { makePutRequest } from 'src/utils.js';

export async function handleEditTalk(ctx: Context) {
  const webAppResponse: WebAppResponse | undefined = ctx.webAppData?.data.json();

  if (webAppResponse) {
    await makePutRequest(`/talks/${webAppResponse.id}`, webAppResponse.talk);
  }
}
