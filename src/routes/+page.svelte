<script>
	import { onMount } from 'svelte';
	import ContactSection from "$lib/parts/ContactSection.svelte"
	import About from "$lib/parts/About.svelte"
	import WhyAudaxem from "$lib/parts/WhyAudaxem.svelte"
	import Services from "$lib/parts/Services.svelte"
	import GoogleReviews from "$lib/parts/GoogleReviews.svelte"
	import logo from '$lib/assets/logo.svg';

	let { data } = $props();

	onMount(() => {
		startTypewriter();
	});

	function startTypewriter() {
		const targetPhrase = 'le cabinet proactif des entrepreneurs ambitieux.';
		const typewriterElement = document.getElementById('typewriter-text');
		if (!typewriterElement) return;
		let index = 0;
		typewriterElement.textContent = '';
		const interval = setInterval(() => {
			if (index < targetPhrase.length) {
				typewriterElement.textContent += targetPhrase[index];
				index++;
			} else {
				clearInterval(interval);
			}
		}, 100);
	}

	let selectedProjectType = $state('lancer');

	const projects_types = [
		{
			key: 'lancer',
			gradient: 'from-ax-primary to-blue-600',
			icon: 'fa-rocket',
			title: 'Lancer mon entreprise',
			desc: 'Création clé en main, conseils stratégiques et structure juridique optimisée.'
		},
		{
			key: 'changer',
			gradient: 'from-slate-600 to-ax-royal',
			icon: 'fa-arrow-right-arrow-left',
			title: 'Changer de cabinet',
			desc: 'Transition maîtrisée, récupération du dossier sans rupture et pilotage renforcé.'
		},
		{
			key: 'carre',
			gradient: 'from-emerald-500 to-emerald-700',
			icon: 'fa-broom',
			title: 'Remettre ma compta au carré',
			desc: 'Rattrapage express, nettoyage complet et vision claire pour avancer.'
		}
	];
</script>

<!-- SECTION 1: ACCUEIL (Hero banner with custom structure and interactive project card) -->
<section
	id="accueil"
	class="relative py-12 lg:py-20 bg-gradient-to-b from-ax-light via-ax-light/40 to-ax-slate overflow-hidden border-b border-slate-200/50"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
			<!-- Left Content: Preserving original badges but applying exact requested texts -->
			<div class="lg:col-span-6 space-y-6 text-center lg:text-left">
				<!-- Standard badge kept -->
				<div
					class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 border border-blue-200/40 text-ax-royal text-xs font-semibold"
				>
					<span class="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
					Expert-comptable inscrit à l'Ordre • Nouvelle Aquitaine
				</div>

				<!-- Headline with Fixed Height Container & Typewriter Target Elements -->
				<h1
					class="font-display text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0F4585] leading-tight tracking-tight min-h-[120px] sm:min-h-[100px] lg:min-h-[150px]"
				>
					Audaxem Conseil : <span id="typewriter-text" class=""></span><span
						class="ml-1 inline-block animate-pulse">|</span
					>
				</h1>

				<!-- Requested Description text -->
				<p
					class="text-base sm:text-lg text-ax-textMuted leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium"
				>
					L'expert-comptable nouvelle génération, engagé à vos côtés pour optimiser votre gestion et
					accélérer la réussite de votre entreprise.
				</p>

				<!-- Highlight bullets in shades of blue -->
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-left max-w-md mx-auto lg:mx-0">
					<div class="flex items-center gap-2.5 text-xs font-semibold text-ax-textDark">
						<i class="fa-solid fa-circle-check text-ax-primary text-lg"></i>
						<span>Conseils et Optimisations</span>
					</div>
					<div class="flex items-center gap-2.5 text-xs font-semibold text-ax-textDark">
						<i class="fa-solid fa-circle-check text-ax-primary text-lg"></i>
						<span>Outils digitaux modernes</span>
					</div>
					<div class="flex items-center gap-2.5 text-xs font-semibold text-ax-textDark">
						<i class="fa-solid fa-circle-check text-ax-primary text-lg"></i>
						<span>Cabinet 100% digitalisé</span>
					</div>
					<div class="flex items-center gap-2.5 text-xs font-semibold text-ax-textDark">
						<i class="fa-solid fa-circle-check text-ax-primary text-lg"></i>
						<span>Suivi au quotidien par Yaniv</span>
					</div>
				</div>
			</div>

			<!-- Right Content: The Interactive Project Selector customized with client options -->
			<div class="lg:col-span-6">
				<div
					class="bg-white rounded-2xl border border-slate-100 shadow-ax-card p-6 sm:p-8 relative"
				>
					<div
						class="absolute -top-3 -right-3 bg-ax-royal text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow"
					>
						Simple & Rapide
					</div>
					<h3 class="text-xl font-display font-bold text-center text-ax-primary mb-7">
						Quel est votre projet ?
					</h3>

					<!-- Wizard Steps Custom Options -->
					<div class="space-y-3">
						<!-- Option 1: Lancer mon entreprise -->
						{#each projects_types as p}
							<div
								onclick={() => {
									selectedProjectType = p.key;
								}}
								id="proj-lancer"
								class="wizard-card border border-slate-150 p-4 rounded-xl cursor-pointer flex justify-between items-center bg-white"
								class:active={selectedProjectType == p.key}
							>
								<div class="flex items-start gap-4">
									<div
										class="w-11 h-11 rounded-xl bg-gradient-to-br {p.gradient} text-white flex items-center justify-center shadow-md shadow-blue-500/25"
									>
										<i class="fa-solid {p.icon} text-sm"></i>
									</div>
									<div class="pr-2">
										<h4 class="text-sm font-bold text-ax-textDark">{p.title}</h4>
										<p class="text-xs text-ax-textMuted mt-0.5 leading-snug max-w-[350px]">
											{p.desc}
										</p>
									</div>
								</div>
								<div
									class="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-ax-primary font-bold text-xs flex-shrink-0"
									id="bullet-lancer"
								>
									<div
										class="w-2.5 h-2.5 rounded-full"
										class:bg-ax-primary={selectedProjectType == p.key}
									></div>
								</div>
							</div>
						{/each}
					</div>

					<!-- Action Submit Form Button -->
					<div class="mt-6 pt-5 border-t border-slate-100">
						<a
							href="#contact"
							class="w-full bg-ax-primary hover:bg-ax-royal text-white text-center py-4 rounded-xl font-bold text-xs shadow-md transition-all uppercase tracking-wider flex items-center justify-center gap-2"
						>
							<span id="wizard-cta-label"
								>{projects_types.find((el) => el.key == selectedProjectType).title}</span
							>
							<i class="fa-solid fa-chevron-right text-[10px]"></i>
						</a>
						<p class="text-[10px] text-center text-ax-textMuted mt-3 font-display">
							Discuter de mon projet professionnel avec Yaniv en 15 min
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<Services />
<WhyAudaxem />
<About />
<ContactSection />

{#if false}
	<GoogleReviews />
{/if}

<!-- Floating Whatsapp Action Button -->
<a
	href="https://wa.me/33603962664"
	target="_blank"
	class="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-all flex-shrink-0 px-6 py-3 gap-4"
>
	<span class="text-xs font-bold font-display hidden sm:inline-block h-fit">
		Discuter avec Yaniv
	</span>
	<i class="fa-brands fa-whatsapp text-2xl"></i>
</a>