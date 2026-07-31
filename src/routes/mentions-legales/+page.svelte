<script>
	import logo from '$lib/assets/logo.svg';
</script>

<svelte:head>
	<title>Mentions légales | Audaxem Conseil</title>
	<meta
		name="description"
		content="Mentions légales du site Audaxem Conseil, cabinet d'expertise comptable et de conseil."
	/>
</svelte:head>

<section
	class="relative py-16 lg:py-24 bg-gradient-to-b from-ax-light via-ax-light/40 to-ax-slate overflow-hidden border-b border-slate-200/50"
>
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="max-w-3xl">
			<h1
				class="font-display text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0F4585] leading-tight tracking-tight mt-6"
			>
				Informations légales et conditions d’utilisation
			</h1>
			<p class="text-base sm:text-lg text-ax-textMuted leading-relaxed mt-5 max-w-2xl">
				Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en
				l'économie numérique, il est précisé aux utilisateurs du site Audaxem Conseil l'identité des
				différents intervenants dans le cadre de sa réalisation et de son suivi.
			</p>
		</div>
	</div>
</section>

<section class="py-20 bg-white">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
			<article class="rounded-3xl border border-slate-200/80 bg-ax-slate p-8 shadow-sm">
				<div class="flex items-center gap-3 mb-5">
					<div
						class="w-12 h-12 rounded-2xl bg-gradient-to-br from-ax-primary to-blue-600 text-white flex items-center justify-center font-display font-black"
					>
						01
					</div>
					<h2 class="text-lg font-extrabold text-ax-textDark font-display">Éditeur du site</h2>
				</div>
				<p class="text-sm text-ax-textMuted leading-relaxed">
					Le présent site, accessible à l’URL https://audaxem-conseil.fr/ (le « Site »), est édité
					par : AUDAXEM CONSEIL, société au capital de 1000 euros, inscrite au R.C.S. de BORDEAUX
					sous le numéro 994 489 946 R.C.S. Bordeaux, dont le siège social est situé au 35 PLACE
					GAMBETTA 33000 BORDEAUX, représenté(e) par Yaniv CHOUKROUN dûment habilité(e) Le numéro
					individuel TVA de l’éditeur est : FR13994489946.
				</p>

				<p class="text-sm text-ax-textMuted leading-relaxed mt-4">
					Le Directeur de la publication du Site est Yaniv CHOUKROUN .
				</p>
			</article>

			<article class="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm">
				<div class="flex items-center gap-3 mb-5">
					<div
						class="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 text-white flex items-center justify-center font-display font-black"
					>
						02
					</div>
					<h2 class="text-lg font-extrabold text-ax-textDark font-display">Hébergement</h2>
				</div>
				<p class="text-sm text-ax-textMuted leading-relaxed">
					Le Site est hébergé par la société Netlify, situé 101 2nd Street, Suite 1200, San
					Francisco, CA 94105, (contact téléphonique ou email : +14156911573).
				</p>
			</article>

			<article class="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm">
				<div class="flex items-center gap-3 mb-5">
					<div
						class="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700 text-white flex items-center justify-center font-display font-black"
					>
						03
					</div>
					<h2 class="text-lg font-extrabold text-ax-textDark font-display">
						Propriété intellectuelle
					</h2>
				</div>
				<p class="text-sm text-ax-textMuted leading-relaxed">
					L’ensemble des contenus présents sur ce site, à l’exception des éléments fournis par des
					tiers, est la propriété exclusive d’Audaxem Conseil. Toute reproduction, représentation ou
					utilisation partielle ou totale sans autorisation est interdite.
				</p>
			</article>

			<article class="rounded-3xl border border-slate-200/80 bg-ax-slate p-8 shadow-sm">
				<div class="flex items-center gap-3 mb-5">
					<div
						class="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center font-display font-black"
					>
						04
					</div>
					<h2 class="text-lg font-extrabold text-ax-textDark font-display">
						Protection des données
					</h2>
				</div>
				<p class="text-sm text-ax-textMuted leading-relaxed">
					Les informations personnelles collectées via le formulaire de contact ou le rendez-vous en
					ligne sont utilisées uniquement pour répondre à votre demande et organiser un échange
					adapté à votre projet.
				</p>
				<p class="mt-4 text-sm text-ax-textMuted leading-relaxed">
					Conformément au Règlement général sur la protection des données, vous disposez d’un droit
					d’accès, de rectification et de suppression sur vos données personnelles.
				</p>
			</article>
		</div>
	</div>
</section>

<section class="py-16 bg-ax-light/50 border-t border-slate-200/50">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm">
			<h2 class="font-display text-2xl font-extrabold text-ax-textDark">Contact</h2>
			<p class="text-sm text-ax-textMuted leading-relaxed mt-3 max-w-2xl">
				Pour toute question relative à ce site, à ses contenus ou à votre parcours de collecte de
				données, vous pouvez nous contacter à l’adresse indiquée ci-dessous.
			</p>
			<div class="mt-6 flex flex-col sm:flex-row gap-4 text-sm">
				<a
					href="mailto:yaniv.c@audaxem-conseil.fr"
					class="inline-flex items-center justify-center rounded-xl bg-ax-primary px-5 py-3 font-semibold text-white hover:bg-ax-royal transition-colors"
				>
					Envoyer un email
				</a>
				<a
					href="/#contact"
					class="inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-3 font-semibold text-ax-textDark hover:border-ax-primary hover:text-ax-primary transition-colors"
				>
					Prendre rendez-vous
				</a>
			</div>
		</div>
	</div>
</section>
