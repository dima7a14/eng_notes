import { router } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';

import type { Context } from './createContext';

export function createRouter() {
	return router<Context>()
		.transformer(superjson)
		.formatError(({ shape, error }) => {
			return {
				...shape,
				data: {
					...shape.data,
					zodError:
						error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
							? error.cause.flatten()
							: null,
				},
			};
		});
}
