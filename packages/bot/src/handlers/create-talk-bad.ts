import { Composer, Scenes } from 'telegraf';
import { makePostRequest } from '../utils.js';
import { Talk } from 'shared/types/talk.js';

interface TalkWizardWithSession extends Scenes.WizardSessionData {
  talkData?: string[];
}

export type TalkWizardContext = Scenes.WizardContext<TalkWizardWithSession>;

export const createTalkWizard = new Scenes.WizardScene(
  'create-talk',
  // title
  async (ctx) => {
    await ctx.reply('Enter Talk title');
    ctx.scene.session.talkData = [];

    return ctx.wizard.next();
  },
  // author
  async (ctx) => {
    await ctx.reply('Enter Talk author');
    ctx.scene.session.talkData?.push(getMessageContent(ctx));

    return ctx.wizard.next();
  },
  // description
  async (ctx) => {
    await ctx.reply('Enter Talk description');
    ctx.scene.session.talkData?.push(getMessageContent(ctx));

    return ctx.wizard.next();
  },
  // collect all the data and leave scene
  async (ctx) => {
    ctx.scene.session.talkData?.push(getMessageContent(ctx));

    if (Array.isArray(ctx.scene.session.talkData)) {
      await createTalk(ctx.scene.session.talkData);
      await ctx.reply('Talk has been created!');
    } else {
      await ctx.reply('Something went wrong');
    }

    return ctx.scene.leave();
  },
  new Composer<TalkWizardContext>()
);

// send data to the API
const createTalk = async (talkData: string[]) => {
  const talk: Talk = {
    title: talkData[0],
    author: talkData[1],
    description: talkData[2],
  };

  await makePostRequest('/talks/create_bad', { talk });
};

const getMessageContent = (ctx: TalkWizardContext): string => {
  if (ctx && ctx.message && 'text' in ctx.message) {
    return ctx.message.text;
  }

  throw new Error('Something went wrong');
};
