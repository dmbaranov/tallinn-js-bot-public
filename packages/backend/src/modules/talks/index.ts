import { Talk } from 'shared/types/talk.js';

export class Talks {
  private readonly talks: Talk[] = [];

  constructor() {
    this.talks = initialTalks;
  }

  public getTalks() {
    return this.talks;
  }

  public getTalkById(talkId: number) {
    return this.talks[talkId];
  }

  public updateTalk(talkId: number, talk: Talk) {
    this.talks[talkId] = talk;
  }

  public createTalk(talk: Talk) {
    this.talks.push(talk);
  }
}

const initialTalks: Talk[] = [
  {
    title: 'Typescript is cute',
    description:
      'Typescript is a de-facto standard in our industry. Would be great to make a step forward from simple types (e.g `type UserId = string`) to use the full equipment of TS. In this talk, we will learn how to easily understand "monster" types and write your own complex types with "infer" "extends", use iterations and so on. We\'ll find answers for questions based on built-in solutions with explanations based on under-the-hood solutions (Omit, Pick, Partial etc.)',
    author: 'Illia Osmanov',
  },
  {
    title: ' Full Stack Type Safety: move faster and break less things',
    description:
      'In recent years, TypeScript has emerged as a powerful tool in the world of web development. One of hottest trends has been using it to obtain full stack type safety. Let’s explore the innovative ideas and techniques that enable developers to harness its true potential!',
    author: 'Stefan Djokovic',
  },
  {
    title: 'Practical tips for building accessible forms',
    description:
      "Web forms are crucial for user interaction on the web, and to ensure our products provide an inclusive experience for all, we need to build them with accessibility in mind. In this talk, we'll dive into best practices and practical tips for crafting web forms that are accessible and won't leave anyone behind.",
    author: 'Kateryna Porshnieva',
  },
];
