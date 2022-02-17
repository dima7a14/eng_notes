import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

const TABLES = {
	phrases: 'phrases',
};

export async function getPhrases() {
	return await supabase.from(TABLES.phrases).select();
}

export async function createPhrase({
	name,
	slug,
	translations,
	explanations,
	examples,
	user_id,
}) {
	return await supabase
		.from(TABLES.phrases)
		.insert([
			{
				name,
				slug,
				translations,
				explanations,
				examples,
				user_id,
			},
		])
		.single();
}

export async function updatePhrase(id, values = {}) {
	return await supabase
		.from(TABLES.phrases)
		.update(values)
		.match({ id })
		.single();
}

export async function deletePhrase(id) {
	return await supabase.from(TABLES.phrases).delete().match({ id });
}
