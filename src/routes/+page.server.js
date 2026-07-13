// src/routes/+page.server.js
//
// Récupère les avis Google de votre fiche Google Business Profile (ex Google My Business)
// côté serveur, au chargement de la page (SSR).
//
// ─────────────────────────────────────────────────────────────────────────
// PRÉREQUIS (à faire une seule fois, avant de pouvoir utiliser ce code)
// ─────────────────────────────────────────────────────────────────────────
// 1. Créer un projet sur https://console.cloud.google.com
// 2. Activer l'API "Google My Business API" (ou "Business Profile APIs")
//    dans "APIs & Services > Bibliothèque"
// 3. Créer des identifiants OAuth 2.0 (type "Application Web")
//    -> récupérer CLIENT_ID et CLIENT_SECRET
// 4. Générer UNE FOIS un refresh token en autorisant votre compte Google
//    (celui qui gère la fiche établissement) avec le scope :
//    https://www.googleapis.com/auth/business.manage
//    (le plus simple : passer par l'OAuth 2.0 Playground
//    https://developers.google.com/oauthplayground en configurant vos propres
//    identifiants dans les options, puis échanger le code contre un refresh token)
// 5. Récupérer votre accountId et locationId via :
//    GET https://mybusinessaccountmanagement.googleapis.com/v1/accounts
//    puis GET https://mybusinessbusinessinformation.googleapis.com/v1/accounts/{accountId}/locations

// src/routes/+page.server.js
import { OAuth2Client } from 'google-auth-library';
import {
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GOOGLE_REFRESH_TOKEN,
	GOOGLE_ACCOUNT_ID,
	GOOGLE_LOCATION_ID,
	SMTP_HOST,
	SMTP_PORT,
	SMTP_USER,
	SMTP_PASS
} from '$env/static/private';
import { error, fail } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import nodemailer from 'nodemailer';

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

const oAuth2Client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);
oAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

async function getAccessToken() {
	const { token } = await oAuth2Client.getAccessToken();
	if (!token) throw new Error("Impossible d'obtenir un access token Google.");
	return token;
}

async function fetchGoogleReviews() {
	const accessToken = await getAccessToken();
	const url = `https://mybusiness.googleapis.com/v4/accounts/${GOOGLE_ACCOUNT_ID}/locations/${GOOGLE_LOCATION_ID}/reviews`;
	const response = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
	if (!response.ok) {
		const body = await response.text();
		throw new Error(`Erreur API Google (${response.status}) : ${body}`);
	}
	const data = await response.json();
	return {
		averageRating: data.averageRating ?? null,
		totalReviewCount: data.totalReviewCount ?? 0,
		reviews: (data.reviews ?? []).map((r) => ({
			id: r.reviewId,
			author: r.reviewer?.displayName ?? 'Anonyme',
			avatarUrl: r.reviewer?.profilePhotoUrl ?? null,
			rating: mapRating(r.starRating),
			comment: r.comment ?? '',
			createdAt: r.createTime,
			reply: r.reviewReply?.comment ?? null
		}))
	};
}

function mapRating(starRating) {
	const map = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
	return map[starRating] ?? 0;
}

const transporter = nodemailer.createTransport({
	host: SMTP_HOST,
	port: Number(SMTP_PORT),
	secure: Number(SMTP_PORT) === 465,
	auth: {
		user: SMTP_USER,
		pass: SMTP_PASS
	}
});

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

export const actions = {
	bookAppointment: async ({ request }) => {
		const form = await superValidate(request, zod4(appointmentSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { name, email, phone, selectedDay, selectedHour } = form.data;

		try {
			await transporter.sendMail({
				from: `"Audaxem Conseil" <${SMTP_USER}>`,
				to: 'perso@yaakovfar.dev',
				replyTo: email,
				subject: `🚨 Nouveau RDV - ${name}`,
				text: `Nouveau rendez-vous confirmé :\n\nNom : ${name}\nE-mail : ${email}\nTéléphone : ${phone}\nDate : ${selectedDay} Juillet 2026 à ${selectedHour}`,
				html: `
					<div style="font-family: sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; padding: 24px; border-radius: 12px;">
						<h2 style="color: #0284c7; margin-bottom: 20px;">🗓️ Consultation Stratégique Réservée</h2>
						<p>Un nouveau créneau a été bloqué depuis le site internet :</p>
						<table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
							<tr>
								<td style="padding: 8px 0; font-weight: bold; width: 120px;">Client :</td>
								<td style="padding: 8px 0;">${name}</td>
							</tr>
							<tr>
								<td style="padding: 8px 0; font-weight: bold;">E-mail :</td>
								<td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
							</tr>
							<tr>
								<td style="padding: 8px 0; font-weight: bold;">Téléphone :</td>
								<td style="padding: 8px 0;"><a href="tel:${phone}">${phone}</a></td>
							</tr>
							<tr>
								<td style="padding: 8px 0; font-weight: bold; color: #0284c7;">Date du RDV :</td>
								<td style="padding: 8px 0; font-weight: bold; color: #0284c7;">${selectedDay} Juillet 2026 à ${selectedHour}</td>
							</tr>
						</table>
					</div>
				`
			});

			return { form };
		} catch (mailError) {
			console.error("Erreur lors de l'envoi de l'e-mail :", mailError);
			return fail(500, {
				form,
				message: 'Une erreur est survenue lors de la confirmation de votre RDV.'
			});
		}
	}
};
