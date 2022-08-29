export interface Phrase {
	id?: string;
	name: string;
	slug?: string; // TODO: remove it
	userId: string;
	translations: string[];
	explanations: string[];
	examples: string[];
}
