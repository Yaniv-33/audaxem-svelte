import {
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GOOGLE_REDIRECT_URI,
	GOOGLE_REFRESH_TOKEN,
	GOOGLE_ACCOUNT_ID,
	GOOGLE_LOCATION_ID,
} from '$env/static/private';

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
	const reviews = await getGoogleReviews();

	return { reviews };
}