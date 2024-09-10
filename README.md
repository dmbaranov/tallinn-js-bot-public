# TallinnJS Organizer Bot
Small demo project for Telegram WebApp-enhanced bot


### How to start
- Register new Telegram bot using @BotFather bot;
- Clone project, copy .env.example to .env for `bot` and `backend` packages and fill in proper values;
  - Remember that public HTTPS URL is needed for `WEBAPP_BASE_URL` to open Web UI from the bot;
- Start all three package using package.json in the source of the project;


### Available commands
- `/start` - greeting for new users;
- `/list` - list current talks;
- `/create_bad` - create a new talk in an inconvenient way, without WebApp capabilities;
- `/create` - create a new talk using WebApp;