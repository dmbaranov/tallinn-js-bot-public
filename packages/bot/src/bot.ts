import { Scenes, session, Telegraf } from 'telegraf';
import {
  handleStartCommand,
  handleListCommand,
  handleCreateCommand,
  handleEditTalk,
  createTalkWizard,
  TalkWizardContext,
} from './handlers/index.js';

export function startBot() {
  const bot = new Telegraf<TalkWizardContext>(process.env.TELEGRAM_BOT_TOKEN!);
  const stage = new Scenes.Stage<TalkWizardContext>([createTalkWizard]);

  bot.use(session());
  bot.use(stage.middleware());

  bot.start(handleStartCommand);
  bot.command('list', handleListCommand);
  bot.command('create_bad', (ctx) => ctx.scene.enter('create-talk'));
  bot.on('web_app_data', handleEditTalk);
  bot.command('create', handleCreateCommand);

  bot.launch();
}
