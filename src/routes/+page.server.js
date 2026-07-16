import {
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GOOGLE_REDIRECT_URI,
	GOOGLE_REFRESH_TOKEN,
	GOOGLE_ACCOUNT_ID,
	GOOGLE_LOCATION_ID,
	RESEND_API_KEY
} from '$env/static/private';
import { error, fail } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { Resend } from 'resend';

const resend = new Resend(RESEND_API_KEY);

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

async function getGoogleAccessToken() {
	const res = await fetch('https://oauth2.googleapis.com/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			client_id: GOOGLE_CLIENT_ID,
			client_secret: GOOGLE_CLIENT_SECRET,
			redirect_uri: GOOGLE_REDIRECT_URI,
			refresh_token: GOOGLE_REFRESH_TOKEN,
			grant_type: 'refresh_token'
		})
	});

	if (!res.ok) {
		const body = await res.text();
		console.error('Failed to refresh Google access token:', body);
		return null;
	}

	const data = await res.json();
	return data.access_token;
}

async function getGoogleReviews() {
	const accessToken = await getGoogleAccessToken();
	if (!accessToken) return [];

	try {
		const res = await fetch(
			`https://mybusiness.googleapis.com/v4/accounts/${GOOGLE_ACCOUNT_ID}/locations/${GOOGLE_LOCATION_ID}/reviews`,
			{
				headers: { Authorization: `Bearer ${accessToken}` }
			}
		);

		if (!res.ok) {
			const body = await res.text();
			console.error('Failed to fetch Google reviews:', body);
			return [];
		}

		const data = await res.json();

		return (data.reviews ?? []).map((review) => ({
			id: review.reviewId,
			author: review.reviewer?.displayName ?? 'Anonyme',
			profilePhoto: review.reviewer?.profilePhotoUrl ?? null,
			rating: starRatingToNumber(review.starRating),
			comment: review.comment ?? '',
			createdAt: review.createTime,
			reply: review.reviewReply?.comment ?? null
		}));
	} catch (err) {
		console.error('Error fetching Google reviews:', err);
		return [];
	}
}

function starRatingToNumber(starRating) {
	const map = {
		ONE: 1,
		TWO: 2,
		THREE: 3,
		FOUR: 4,
		FIVE: 5
	};
	return map[starRating] ?? 0;
}

export async function load() {
	const form = await superValidate(zod4(appointmentSchema));
	const reviews = await getGoogleReviews();

	return { form, reviews };
}

export const actions = {
	bookAppointment: async ({ request }) => {
		const form = await superValidate(request, zod4(appointmentSchema));
		console.log(form);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { data, error: resendError } = await resend.emails.send({
			from: 'Audaxem Conseil <yaniv.c@audaxem-conseil.fr>',
			to: ['contact@yaakovfar.dev'],
			subject: 'Nouvelle demande de RDV',
			html: '<strong>It works!</strong>'
		});

		if (resendError) {
			console.error({ resendError });
			return fail(500, { form });
		}

		console.log({ data });
		return message(form, 'Votre conseillé a reçu votre demande de RDV.');
	}
};