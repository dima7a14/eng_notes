import dashify from 'dashify';

export class Phrase {
	constructor(data) {
		this._name = data.name;
		this._translations = data.translations ?? [];
		this._explanations = data.explanations ?? [];
		this._examples = data.examples ?? [];
		this._userId = data.userId;
	}

	get isValid() {
		if (!this._name) {
			return false;
		}

		if (!this._userId) {
			return false;
		}

		return true;
	}

	get data() {
		return {
			name: this.name,
			slug: this.slug,
			translations: this.translations,
			explanations: this.explanations,
			examples: this.examples,
			userId: this.userId,
		};
	}

	get name() {
		return this.name;
	}

	set name(value) {
		this._name = value;
	}

	get slug() {
		return dashify(this._name);
	}

	get translations() {
		return this._translations;
	}

	set translations(values) {
		this._translations = values;
	}

	get explanations() {
		return this._explanations;
	}

	set explanations(values) {
		this._explanations = values;
	}

	get examples() {
		return this._examples;
	}

	set examples(values) {
		this._examples = values;
	}

	get userId() {
		return this._userId;
	}

	set userId(value) {
		this._userId = value;
	}

	validate() {
		const errors = {};

		if (!this.name) {
			errors.name = 'Name is required.';
		}

		if (!this.slug) {
			errors.slug = 'Slug is required.';
		}

		if (!this.userId) {
			errors.userId = 'User id is required';
		}

		return errors;
	}
}
