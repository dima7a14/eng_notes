import { createRouter } from '../createRouter';
import { phraseRouter } from './phrase.router';

export const appRouter = createRouter().merge('phrases.', phraseRouter);

export type AppRouter = typeof appRouter;
