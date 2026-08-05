import { error } from '@sveltejs/kit';
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN
} from '$env/static/private';

// ---- 1. Rafraîchir l'access token à partir du refresh token ----
async function getAccessToken() {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      refresh_token: GOOGLE_REFRESH_TOKEN,
      grant_type: 'refresh_token'
    })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Échec du refresh token: ${res.status} - ${errText}`);
  }

  const data = await res.json();
  return data.access_token; // valide ~1h, on le régénère à chaque requête ici (simple)
}

// ---- 2. Récupérer le premier compte Business Profile ----
async function getAccountId(accessToken) {
  const res = await fetch(
    'https://mybusinessaccountmanagement.googleapis.com/v1/accounts',
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Échec récupération accounts: ${res.status} - ${errText}`);
  }

  const data = await res.json();
  if (!data.accounts || data.accounts.length === 0) {
    throw new Error('Aucun compte Business Profile trouvé pour cet utilisateur.');
  }

  return data.accounts[0].name; // ex: "accounts/123456789"
}

// ---- 3. Récupérer la première location (fiche) du compte ----
async function getLocationId(accessToken, accountName) {
  const res = await fetch(
    `https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations?readMask=name,title`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Échec récupération locations: ${res.status} - ${errText}`);
  }

  const data = await res.json();
  if (!data.locations || data.locations.length === 0) {
    throw new Error('Aucune fiche (location) trouvée pour ce compte.');
  }

  return {
    locationName: data.locations[0].name, // ex: "locations/987654321"
    title: data.locations[0].title
  };
}

// ---- 4. Récupérer les avis ----
async function getReviews(accessToken, accountId, locationId) {
  const res = await fetch(
    `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Échec récupération reviews: ${res.status} - ${errText}`);
  }

  return res.json(); // { reviews: [...], averageRating, totalReviewCount }
}

async function debugAccounts(accessToken) {
  const res = await fetch(
    'https://mybusinessaccountmanagement.googleapis.com/v1/accounts',
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
  return data;
}

// ---- load() SvelteKit ----
export async function load() {
  const accessToken = await getAccessToken();
    await debugAccounts(accessToken);
    
  try {
    const accessToken = await getAccessToken();

    const accountName = await getAccountId(accessToken); // "accounts/123456789"
    const accountId = accountName.split('/')[1];

    const { locationName, title } = await getLocationId(accessToken, accountName);
    const locationId = locationName.split('/')[1];

    const reviewsData = await getReviews(accessToken, accountId, locationId);

    return {
      businessName: title,
      averageRating: reviewsData.averageRating ?? null,
      totalReviewCount: reviewsData.totalReviewCount ?? 0,
      reviews: (reviewsData.reviews ?? []).map((r) => ({
        reviewer: r.reviewer?.displayName ?? 'Anonyme',
        rating: r.starRating, // "ONE" à "FIVE"
        comment: r.comment ?? '',
        createTime: r.createTime,
        reply: r.reviewReply?.comment ?? null
      }))
    };
  } catch (err) {
    console.error('Erreur chargement avis Google:', err);
    return {}
  }
}