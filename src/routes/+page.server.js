import {
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GOOGLE_REDIRECT_URI,
} from '$env/static/private';
import { error, fail } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { google } from "googleapis";

const appointmentSchema = z.object({
	name: z
		.string({ required_error: 'Le nom est obligatoire' })
		.min(2, 'Le nom doit contenir au moins 2 caractères'),
	email: z
		.string({ required_error: "L'adresse e-mail est obligatoire" })
		.email('Adresse e-mail invalide'),
	phone: z
		.string({ required_error: 'Le téléphone est obligatoire' })
		.regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, 'Numéro de téléphone invalide'),
	selectedDay: z.number({ required_error: 'Veuillez choisir un jour' }),
	selectedHour: z
		.string({ required_error: 'Veuillez choisir un horaire' })
		.min(1, 'Veuillez choisir un horaire')
});

const oauth2 = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
);

export async function load(event) {
	const form = await superValidate(event, zod4(appointmentSchema));
	
	try {
		const { averageRating, totalReviewCount, reviews } = await fetchGoogleReviews();
		return {
			form,
			googleReviews: reviews,
			googleAverageRating: averageRating,
			googleTotalReviewCount: totalReviewCount
		};
	} catch (err) {
		console.error('Erreur lors de la récupération des avis Google :', err);
		return {
			form,
			googleReviews: [],
			googleAverageRating: null,
			googleTotalReviewCount: 0
		};
	}
}