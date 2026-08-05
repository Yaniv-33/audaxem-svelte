import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
} from '$env/static/private';

export async function GET({ url }) {
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('Aucun code reçu de Google.', { status: 400 });
  }

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code'
    })
  });

  const tokens = await res.json();

  if (!tokens.refresh_token) {
    return new Response(
      `Pas de refresh_token reçu. Réponse complète : ${JSON.stringify(tokens, null, 2)}
      
Astuce : si tu as déjà autorisé cette app avant, Google ne renvoie parfois pas de nouveau refresh_token. Va sur https://myaccount.google.com/permissions, révoque l'accès à ton app, puis relance /auth/google.`,
      { status: 200 }
    );
  }

  return new Response(
    `Copie cette valeur dans ton .env sous GOOGLE_REFRESH_TOKEN :

${tokens.refresh_token}

Tu peux ensuite supprimer/ignorer ces routes /auth/google.`,
    { status: 200 }
  );
}