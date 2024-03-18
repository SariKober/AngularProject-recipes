export class Recipe {
	code!: string;
	name!: string;
	categoryCode!: string;
	preparationTime!: number;
	levelOfDifficulty!: number;
	dateAdded!: Date;
	listOfComponents!: string[];
	preparation!: string[];
	userCodeAdded!: string;
	image!: string;
}
