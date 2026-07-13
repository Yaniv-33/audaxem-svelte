<script>
	import { onMount } from 'svelte';
	import logo from '$lib/assets/logo.svg';
	import pp from '$lib/assets/pp.jpg';

	let mBtn;
	let mMenu;

	onMount(() => {
		mBtn = document.getElementById('mobile-menu-btn');
		mMenu = document.getElementById('mobile-menu');

		mBtn.addEventListener('click', () => {
			mMenu.classList.toggle('hidden');
		});

		document.querySelectorAll('#mobile-menu a').forEach((link) => {
			link.addEventListener('click', () => {
				mMenu.classList.add('hidden');
			});
		});

		renderCalendar();
		startTypewriter();
	});

	// Animation Typewriter via manipulation directe du DOM
	function startTypewriter() {
		const targetPhrase = "le cabinet proactif des entreprises qui ont un temps d'avance.";
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

	// State management
	let selectedProjectType = 'lancer';
	let calendarWeekOffset = 0;
	let selectedDayVal = 23;
	let selectedHourVal = null;
	let isWaTabOpen = false;

	// Wizard Project Switcher (Lancer, Changer, Carre)
	function selectProject(type) {
		selectedProjectType = type;

		// Remove active classes
		document.querySelectorAll('.wizard-card').forEach((card) => {
			card.classList.remove('active');
		});

		// Set current
		document.getElementById(`proj-${type}`).classList.add('active');

		// Reset bullets
		document.getElementById('bullet-lancer').innerHTML = '';
		document.getElementById('bullet-changer').innerHTML = '';
		document.getElementById('bullet-carre').innerHTML = '';

		const dotMarkup = '<div class="w-2.5 h-2.5 rounded-full bg-ax-primary"></div>';
		const ctaBtn = document.getElementById('wizard-cta-label');

		if (type === 'lancer') {
			document.getElementById('bullet-lancer').innerHTML = dotMarkup;
			ctaBtn.textContent = 'Lancer mon entreprise gratuitement';
		} else if (type === 'changer') {
			document.getElementById('bullet-changer').innerHTML = dotMarkup;
			ctaBtn.textContent = 'Transférer mon dossier cabinet';
		} else if (type === 'carre') {
			document.getElementById('bullet-carre').innerHTML = dotMarkup;
			ctaBtn.textContent = 'Remettre ma compta au carré';
		}
	}

	// WhatsApp Floating Tab toggler
	function toggleWaTab() {
		const card = document.getElementById('wa-tab-card');
		isWaTabOpen = !isWaTabOpen;

		if (isWaTabOpen) {
			card.classList.remove('pointer-events-none', 'translate-y-2', 'opacity-0');
		} else {
			card.classList.add('pointer-events-none', 'translate-y-2', 'opacity-0');
		}
	}

	// Calendar Booking Logic
	const daysLabelArray = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'];
	const listHours = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

	function changeWeek(direction) {
		if (direction === 'prev' && calendarWeekOffset > 0) {
			calendarWeekOffset--;
		} else if (direction === 'next') {
			calendarWeekOffset++;
		}
		renderCalendar();
	}

	function renderCalendar() {
		const gridDays = document.getElementById('cal-days-grid');
		gridDays.innerHTML = '';

		const startingBaseDay = 20; // Simulated July days representation
		const computedStart = startingBaseDay + calendarWeekOffset * 7;

		for (let d = 0; d < 5; d++) {
			const targetDay = computedStart + d;
			const isDaySelected = selectedDayVal === targetDay;

			const dayButton = document.createElement('button');
			dayButton.type = 'button';
			dayButton.className = `p-3 rounded-xl flex flex-col items-center justify-center transition-all ${
				isDaySelected
					? 'bg-ax-primary text-white shadow'
					: 'bg-white border border-slate-200 hover:bg-slate-50 text-ax-textDark'
			}`;
			dayButton.onclick = () => {
				selectedDayVal = targetDay;
				renderCalendar();
			};

			dayButton.innerHTML = `
            <span class="text-[9px] uppercase font-mono tracking-wider opacity-80">${daysLabelArray[d]}</span>
            <span class="text-base font-extrabold mt-1">${targetDay}</span>
        `;
			gridDays.appendChild(dayButton);
		}

		renderHours();
		updateSummary();
	}

	function renderHours() {
		const gridHours = document.getElementById('cal-hours-grid');
		gridHours.innerHTML = '';

		listHours.forEach((hour) => {
			const isHourSelected = selectedHourVal === hour;
			const hourButton = document.createElement('button');
			hourButton.type = 'button';
			hourButton.className = `p-3 rounded-xl text-xs font-mono font-bold text-center transition-all ${
				isHourSelected
					? 'bg-ax-deep text-white border border-ax-deep'
					: 'bg-white border border-slate-200 hover:border-slate-400 text-ax-textDark'
			}`;
			hourButton.onclick = () => {
				selectedHourVal = hour;
				renderHours();
				updateSummary();
			};

			hourButton.textContent = hour;
			gridHours.appendChild(hourButton);
		});
	}

	function updateSummary() {
		const summaryLabel = document.getElementById('cal-selected-summary');
		if (selectedHourVal) {
			summaryLabel.textContent = `${selectedDayVal} Juillet 2026 à ${selectedHourVal}`;
		} else {
			summaryLabel.textContent = 'Sélectionnez un horaire';
		}
	}

	// Contact Booking Submission Form handler
	function submitMeeting(event) {
		event.preventDefault();
		if (!selectedHourVal) {
			alert("Veuillez sélectionner un créneau horaire d'abord.");
			return;
		}

		const sender = document.getElementById('form-name').value;
		const email = document.getElementById('form-email').value;

		const modal = document.getElementById('success-modal');
		const desc = document.getElementById('modal-success-desc');

		desc.textContent = `Félicitations ${sender}, votre rendez-vous conseil stratégique de 15 minutes avec Yaniv Choukroun est enregistré pour le ${selectedDayVal} Juillet 2026 à ${selectedHourVal}. Une confirmation vous a été envoyée sur ${email}.`;
		modal.classList.remove('hidden');
	}

	function closeModal() {
		document.getElementById('success-modal').classList.add('hidden');
		document.getElementById('booking-form').reset();
		selectedHourVal = null;
		renderCalendar();
	}
</script>

<nav class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between h-20">
			<!-- Logo Left: Combined text in dark blue -->
			<div class="flex items-center">
				<a href="#accueil" class="flex items-center space-x-3">
					<img src={logo} class="w-20 h-20" />
					<div class="flex flex-col">
						<span
							class="font-display text-2xl font-extrabold text-ax-deep tracking-tight leading-tight"
						>
							Audaxem Conseil
						</span>
					</div>
				</a>
			</div>

			<!-- Desktop Nav Tabs (Accueil, Services, A propos, Contact) -->
			<div class="hidden md:flex items-center space-x-8">
				<a
					href="#accueil"
					class="text-ax-textMuted hover:text-ax-primary font-semibold text-sm transition-colors"
					>Accueil</a
				>
				<a
					href="#services"
					class="text-ax-textMuted hover:text-ax-primary font-semibold text-sm transition-colors"
					>Services</a
				>
				<a
					href="#a-propos"
					class="text-ax-textMuted hover:text-ax-primary font-semibold text-sm transition-colors"
					>À propos</a
				>
				<a
					href="#contact"
					class="text-ax-textMuted hover:text-ax-primary font-semibold text-sm transition-colors"
					>Contact</a
				>

				<div class="h-6 w-px bg-slate-200"></div>

				<a
					href="tel:0603962664"
					class="text-slate-700 hover:text-ax-primary font-mono text-sm flex items-center gap-2"
				>
					<i class="fa-solid fa-phone text-ax-primary text-xs"></i> 06 03 96 26 64
				</a>
				<a
					href="#contact"
					class="bg-ax-primary hover:bg-ax-royal text-white text-xs font-bold px-5 py-3 rounded-xl shadow-md transition-all uppercase tracking-wide"
				>
					Prendre RDV
				</a>
			</div>

			<!-- Mobile Menu Button -->
			<div class="flex items-center md:hidden">
				<button
					id="mobile-menu-btn"
					class="text-slate-900 hover:text-ax-primary focus:outline-none"
				>
					<i class="fa-solid fa-bars text-2xl"></i>
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile Menu -->
	<div
		id="mobile-menu"
		class="hidden md:hidden bg-white border-t border-slate-100 px-4 pt-2 pb-6 space-y-3 shadow-lg"
	>
		<a
			href="#accueil"
			class="block py-2 text-ax-textDark hover:text-ax-primary font-semibold text-sm">Accueil</a
		>
		<a
			href="#services"
			class="block py-2 text-ax-textDark hover:text-ax-primary font-semibold text-sm">Services</a
		>
		<a
			href="#a-propos"
			class="block py-2 text-ax-textDark hover:text-ax-primary font-semibold text-sm">À propos</a
		>
		<a
			href="#contact"
			class="block py-2 text-ax-textDark hover:text-ax-primary font-semibold text-sm">Contact</a
		>
		<hr class="border-slate-100 my-2" />
		<a href="tel:0603962664" class="block py-2 text-slate-700 font-mono text-sm"
			><i class="fa-solid fa-phone text-ax-primary mr-1"></i> 06 03 96 26 64</a
		>
		<a
			href="#contact"
			class="block text-center bg-ax-primary text-white py-3 rounded-xl hover:bg-ax-royal transition-colors uppercase font-bold text-xs"
			>Prendre RDV</a
		>
	</div>
</nav>

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
					class="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ax-textDark leading-tight tracking-tight min-h-[120px] sm:min-h-[100px] lg:min-h-[150px]"
				>
					Audaxem Conseil : <span id="typewriter-text" class=""></span><span
						class="ml-1 inline-block animate-pulse"
						>|</span
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
						<div
							onclick={selectProject('lancer')}
							id="proj-lancer"
							class="wizard-card active border border-slate-150 p-4 rounded-xl cursor-pointer flex justify-between items-center bg-white"
						>
							<div class="flex items-start gap-3">
								<div
									class="w-11 h-11 rounded-xl bg-gradient-to-br from-ax-primary to-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25"
								>
									<i class="fa-solid fa-rocket text-sm"></i>
								</div>
								<div class="pr-2">
									<h4 class="text-sm font-bold text-ax-textDark">Lancer mon entreprise</h4>
									<p class="text-xs text-ax-textMuted mt-0.5 leading-snug">
										Création clé en main, conseils stratégiques et structure juridique optimisée.
									</p>
								</div>
							</div>
							<div
								class="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-ax-primary font-bold text-xs flex-shrink-0"
								id="bullet-lancer"
							>
								<div class="w-2.5 h-2.5 rounded-full bg-ax-primary"></div>
							</div>
						</div>

						<!-- Option 2: Changer de cabinet -->
						<div
							onclick={selectProject('changer')}
							id="proj-changer"
							class="wizard-card border border-slate-150 p-4 rounded-xl cursor-pointer flex justify-between items-center bg-white"
						>
							<div class="flex items-start gap-3">
								<div
									class="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-600 to-ax-royal text-white flex items-center justify-center shadow-md shadow-slate-500/25"
								>
									<i class="fa-solid fa-arrow-right-arrow-left text-sm"></i>
								</div>
								<div class="pr-2">
									<h4 class="text-sm font-bold text-ax-textDark">Changer de cabinet</h4>
									<p class="text-xs text-ax-textMuted mt-0.5 leading-snug">
										Transition maîtrisée, récupération du dossier sans rupture et pilotage renforcé.
									</p>
								</div>
							</div>
							<div
								class="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-ax-primary font-bold text-xs flex-shrink-0"
								id="bullet-changer"
							></div>
						</div>

						<!-- Option 3: Remettre ma compta au carré -->
						<div
							onclick={selectProject('carre')}
							id="proj-carre"
							class="wizard-card border border-slate-150 p-4 rounded-xl cursor-pointer flex justify-between items-center bg-white"
						>
							<div class="flex items-start gap-3">
								<div
									class="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center shadow-md shadow-emerald-500/25"
								>
									<i class="fa-solid fa-sparkles text-sm"></i>
								</div>
								<div class="pr-2">
									<h4 class="text-sm font-bold text-ax-textDark">Remettre ma compta au carré</h4>
									<p class="text-xs text-ax-textMuted mt-0.5 leading-snug">
										Rattrapage express, nettoyage complet et vision claire pour avancer.
									</p>
								</div>
							</div>
							<div
								class="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-ax-primary font-bold text-xs flex-shrink-0"
								id="bullet-carre"
							></div>
						</div>
					</div>

					<!-- Action Submit Form Button -->
					<div class="mt-6 pt-5 border-t border-slate-100">
						<a
							href="#contact"
							class="w-full bg-ax-primary hover:bg-ax-royal text-white text-center py-4 rounded-xl font-bold text-xs shadow-md transition-all uppercase tracking-wider flex items-center justify-center gap-2"
						>
							<span id="wizard-cta-label">Lancer mon entreprise</span>
							<i class="fa-solid fa-chevron-right text-[10px]"></i>
						</a>
						<p class="text-[10px] text-center text-ax-textMuted mt-3 font-mono">
							Discuter de mon projet professionnel avec Yaniv en 15 min
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- SECTION: GOOGLE REVIEWS (Social Proof Banner) -->
<section class="py-14 bg-white border-b border-slate-100">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="flex flex-col items-center text-center mb-10">
			<div
				class="flex items-center gap-1 bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-full text-amber-500 font-mono text-xs font-bold mb-3 shadow-sm"
			>
				<i class="fa-solid fa-star"></i>
				<i class="fa-solid fa-star"></i>
				<i class="fa-solid fa-star"></i>
				<i class="fa-solid fa-star"></i>
				<i class="fa-solid fa-star"></i>
				<span class="text-slate-700 ml-1">5.0 / 5 sur Google Reviews</span>
			</div>
			<h2 class="font-display text-2xl sm:text-3xl font-extrabold text-ax-textDark tracking-tight">
				Ils parlent de nous, ils nous font confiance
			</h2>
		</div>

		<!-- Reviews Grid -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<!-- Review 1 -->
			<div
				class="bg-ax-slate p-6 rounded-2xl border border-slate-200/50 shadow-sm flex flex-col justify-between"
			>
				<div>
					<div class="flex items-center gap-1 text-amber-400 text-xs mb-3">
						<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
							class="fa-solid fa-star"
						></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
					</div>
					<p class="text-xs text-ax-textMuted leading-relaxed italic">
						"Yaniv m'a accompagné pour le lancement de mon activité. Conseils clairs, structure
						optimisée en 48h et prise en main de l'outil Pennylane d'une simplicité remarquable. Un
						vrai gain de temps !"
					</p>
				</div>
				<div
					class="mt-4 pt-4 border-t border-slate-200/40 flex items-center justify-between text-[11px]"
				>
					<span class="font-bold text-ax-textDark">Alexandre M. • Consultant</span>
					<span class="text-slate-400 font-mono text-[10px] flex items-center gap-1"
						><i class="fa-brands fa-google text-amber-500"></i> Avis vérifié</span
					>
				</div>
			</div>

			<!-- Review 2 -->
			<div
				class="bg-ax-slate p-6 rounded-2xl border border-slate-200/50 shadow-sm flex flex-col justify-between"
			>
				<div>
					<div class="flex items-center gap-1 text-amber-400 text-xs mb-3">
						<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
							class="fa-solid fa-star"
						></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
					</div>
					<p class="text-xs text-ax-textMuted leading-relaxed italic">
						"Je redoutais le transfert de ma comptabilité depuis mon ancien cabinet, mais Audaxem a
						tout géré de manière fluide et transparente. Réponse toujours sous 24h, très pro et
						disponible."
					</p>
				</div>
				<div
					class="mt-4 pt-4 border-t border-slate-200/40 flex items-center justify-between text-[11px]"
				>
					<span class="font-bold text-ax-textDark">Marine D. • Co-fondatrice Agence</span>
					<span class="text-slate-400 font-mono text-[10px] flex items-center gap-1"
						><i class="fa-brands fa-google text-amber-500"></i> Avis vérifié</span
					>
				</div>
			</div>

			<!-- Review 3 -->
			<div
				class="bg-ax-slate p-6 rounded-2xl border border-slate-200/50 shadow-sm flex flex-col justify-between"
			>
				<div>
					<div class="flex items-center gap-1 text-amber-400 text-xs mb-3">
						<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
							class="fa-solid fa-star"
						></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
					</div>
					<p class="text-xs text-ax-textMuted leading-relaxed italic">
						"Un accompagnement proactif précieux. Au-delà des chiffres, Yaniv apporte de réels
						conseils d'optimisation fiscale et sociale pour mon entreprise au quotidien. Je
						recommande les yeux fermés."
					</p>
				</div>
				<div
					class="mt-4 pt-4 border-t border-slate-200/40 flex items-center justify-between text-[11px]"
				>
					<span class="font-bold text-ax-textDark">Thomas L. • Artisan d'art</span>
					<span class="text-slate-400 font-mono text-[10px] flex items-center gap-1"
						><i class="fa-brands fa-google text-amber-500"></i> Avis vérifié</span
					>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- SECTION 2: SERVICES (Design moderne, cartes premium sans emojis) -->
<section id="services" class="py-24 bg-gradient-to-b from-white to-ax-slate/30 border-b border-slate-200/50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Header Section -->
		<div class="max-w-4xl mx-auto text-center mb-20">
			<span class="text-ax-primary font-extrabold text-xs uppercase tracking-widest block mb-4 font-mono bg-blue-50 w-fit mx-auto px-3 py-1 rounded-full">
				Nos offres sur-mesure
			</span>
			<h2 class="font-display text-3xl sm:text-4xl font-extrabold text-ax-textDark leading-tight tracking-tight">
				L'expertise 360° qui répond à toutes les problématiques comptables, sociales, juridiques et fiscales des dirigeants.
			</h2>
		</div>

		<!-- Grid Cards - Design moderne avec icônes vectorielles et numérotation -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
			<!-- Mission 1: Tenue comptable & optimisation (Blue Accent) -->
			<div class="relative bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden">
				<span class="absolute -top-2 -right-2 text-7xl font-black text-slate-50 select-none font-display">01</span>
				<div class="relative">
					<div class="flex items-start justify-between mb-6">
						<div class="flex items-center gap-4">
							<div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-ax-primary to-blue-600 text-white flex items-center justify-center text-xl shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
								<i class="fa-solid fa-calculator"></i>
							</div>
							<div>
								<h3 class="text-lg font-extrabold text-ax-textDark font-display">
									Tenue comptable & optimisation
								</h3>
								<span class="text-[10px] font-mono font-bold text-ax-primary uppercase bg-blue-50 px-2 py-0.5 rounded-md">Pilotage Réel</span>
							</div>
						</div>
					</div>
					
					<p class="text-xs text-ax-textDark mb-6 leading-relaxed font-semibold">
						Votre gestion, simplifiée et pilotée au quotidien. Nous transformons vos obligations comptables en réels outils de visibilité financière.
					</p>

					<!-- Detailed Mission Checklist -->
					<ul class="space-y-3 mb-8">
						<li class="flex items-start gap-2.5 text-xs text-ax-textMuted">
							<i class="fa-solid fa-circle-check text-ax-primary mt-0.5"></i>
							<span><strong>Tenue & supervision :</strong> Organisation et suivi rigoureux de votre comptabilité courante.</span>
						</li>
						<li class="flex items-start gap-2.5 text-xs text-ax-textMuted">
							<i class="fa-solid fa-circle-check text-ax-primary mt-0.5"></i>
							<span><strong>États financiers :</strong> Production rapide de vos bilans, comptes de résultat et liasses fiscales.</span>
						</li>
						<li class="flex items-start gap-2.5 text-xs text-ax-textMuted">
							<i class="fa-solid fa-circle-check text-ax-primary mt-0.5"></i>
							<span><strong>Tableaux de bord :</strong> Indicateurs clés personnalisés pour piloter sereinement votre trésorerie.</span>
						</li>
					</ul>
				</div>
				<div class="relative pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-mono font-bold text-ax-primary">
					<span class="flex items-center gap-1.5"><i class="fa-solid fa-laptop-code text-sm"></i> Outils Pennylane inclus</span>
					<i class="fa-solid fa-arrow-right-long group-hover:translate-x-1.5 transition-transform"></i>
				</div>
			</div>

			<!-- Mission 2: Gestion sociale (Purple Accent) -->
			<div class="relative bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden">
				<span class="absolute -top-2 -right-2 text-7xl font-black text-slate-50 select-none font-display">02</span>
				<div class="relative">
					<div class="flex items-start justify-between mb-6">
						<div class="flex items-center gap-4">
							<div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 text-white flex items-center justify-center text-xl shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform">
								<i class="fa-solid fa-user-group"></i>
							</div>
							<div>
								<h3 class="text-lg font-extrabold text-ax-textDark font-display">
									Gestion sociale
								</h3>
								<span class="text-[10px] font-mono font-bold text-purple-600 uppercase bg-purple-50 px-2 py-0.5 rounded-md">Conformité RH</span>
							</div>
						</div>
					</div>
					
					<p class="text-xs text-ax-textDark mb-6 leading-relaxed font-semibold">
						La paie sans stress, le volet social totalement sécurisé. Nous vous déchargeons de la complexité de la réglementation RH.
					</p>

					<!-- Detailed Mission Checklist -->
					<ul class="space-y-3 mb-8">
						<li class="flex items-start gap-2.5 text-xs text-ax-textMuted">
							<i class="fa-solid fa-circle-check text-purple-500 mt-0.5"></i>
							<span><strong>Bulletins de paie :</strong> Édition conforme des bulletins et gestion complète des absences ou congés.</span>
						</li>
						<li class="flex items-start gap-2.5 text-xs text-ax-textMuted">
							<i class="fa-solid fa-circle-check text-purple-500 mt-0.5"></i>
							<span><strong>Déclarations sociales :</strong> Télétransmission sécurisée de vos DSN et échanges avec les organismes.</span>
						</li>
						<li class="flex items-start gap-2.5 text-xs text-ax-textMuted">
							<i class="fa-solid fa-circle-check text-purple-500 mt-0.5"></i>
							<span><strong>Sécurité juridique :</strong> Rédaction de contrats de travail, avenants et procédures de rupture.</span>
						</li>
					</ul>
				</div>
				<div class="relative pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-mono font-bold text-purple-600">
					<span class="flex items-center gap-1.5"><i class="fa-solid fa-users text-sm"></i> Stabilité réglementaire Silae</span>
					<i class="fa-solid fa-arrow-right-long group-hover:translate-x-1.5 transition-transform"></i>
				</div>
			</div>

			<!-- Mission 3: Formalités juridiques & création (Orange Accent) -->
			<div class="relative bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden">
				<span class="absolute -top-2 -right-2 text-7xl font-black text-slate-50 select-none font-display">03</span>
				<div class="relative">
					<div class="flex items-start justify-between mb-6">
						<div class="flex items-center gap-4">
							<div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700 text-white flex items-center justify-center text-xl shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform">
								<i class="fa-solid fa-scale-balanced"></i>
							</div>
							<div>
								<h3 class="text-lg font-extrabold text-ax-textDark font-display">
									Formalités juridiques & création
								</h3>
								<span class="text-[10px] font-mono font-bold text-orange-600 uppercase bg-orange-50 px-2 py-0.5 rounded-md">Structure Clé en main</span>
							</div>
						</div>
					</div>
					
					<p class="text-xs text-ax-textDark mb-6 leading-relaxed font-semibold">
						Créer, modifier, sécuriser : on s'occupe de tout. Une protection juridique optimale dès le premier jour de votre entreprise.
					</p>

					<!-- Detailed Mission Checklist -->
					<ul class="space-y-3 mb-8">
						<li class="flex items-start gap-2.5 text-xs text-ax-textMuted">
							<i class="fa-solid fa-circle-check text-orange-500 mt-0.5"></i>
							<span><strong>Création d'entreprise :</strong> Conseil sur la forme sociale adaptée (SASU, EURL, SAS, SARL) et statuts.</span>
						</li>
						<li class="flex items-start gap-2.5 text-xs text-ax-textMuted">
							<i class="fa-solid fa-circle-check text-orange-500 mt-0.5"></i>
							<span><strong>Secrétariat juridique annuel :</strong> Rédaction des assemblées générales ordinaires (AGO) et dépôt des comptes.</span>
						</li>
						<li class="flex items-start gap-2.5 text-xs text-ax-textMuted">
							<i class="fa-solid fa-circle-check text-orange-500 mt-0.5"></i>
							<span><strong>Modifications statutaires :</strong> Gestion des transferts de siège, augmentations de capital ou changements d'objet.</span>
						</li>
					</ul>
				</div>
				<div class="relative pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-mono font-bold text-orange-600">
					<span class="flex items-center gap-1.5"><i class="fa-solid fa-gavel text-sm"></i> Formalités & Statuts sous 48h</span>
					<i class="fa-solid fa-arrow-right-long group-hover:translate-x-1.5 transition-transform"></i>
				</div>
			</div>

			<!-- Mission 4: Gestion fiscale (Green Accent) -->
			<div class="relative bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden">
				<span class="absolute -top-2 -right-2 text-7xl font-black text-slate-50 select-none font-display">04</span>
				<div class="relative">
					<div class="flex items-start justify-between mb-6">
						<div class="flex items-center gap-4">
							<div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center text-xl shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform">
								<i class="fa-solid fa-coins"></i>
							</div>
							<div>
								<h3 class="text-lg font-extrabold text-ax-textDark font-display">
									Gestion fiscale
								</h3>
								<span class="text-[10px] font-mono font-bold text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded-md">Optimisation</span>
							</div>
						</div>
					</div>
					
					<p class="text-xs text-ax-textDark mb-6 leading-relaxed font-semibold">
						Votre fiscalité, optimisée, arbitrée et sous contrôle. Nous étudions chaque levier légal pour maximiser votre net disponible.
					</p>

					<!-- Detailed Mission Checklist -->
					<ul class="space-y-3 mb-8">
						<li class="flex items-start gap-2.5 text-xs text-ax-textMuted">
							<i class="fa-solid fa-circle-check text-emerald-500 mt-0.5"></i>
							<span><strong>Déclarations d'impôts :</strong> Prise en charge de la TVA, de la CFE, de l'IS et sécurisation de vos échéances.</span>
						</li>
						<li class="flex items-start gap-2.5 text-xs text-ax-textMuted">
							<i class="fa-solid fa-circle-check text-emerald-500 mt-0.5"></i>
							<span><strong>Stratégie de rémunération :</strong> Arbitrages personnalisés entre salaires, dividendes et primes de direction.</span>
						</li>
						<li class="flex items-start gap-2.5 text-xs text-ax-textMuted">
							<i class="fa-solid fa-circle-check text-emerald-500 mt-0.5"></i>
							<span><strong>Sécurisation fiscale :</strong> Veille réglementaire permanente et accompagnement proactif en cas de contrôle.</span>
						</li>
					</ul>
				</div>
				<div class="relative pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-mono font-bold text-emerald-600">
					<span class="flex items-center gap-1.5"><i class="fa-solid fa-chart-pie text-sm"></i> Rationalisation IS / IR</span>
					<i class="fa-solid fa-arrow-right-long group-hover:translate-x-1.5 transition-transform"></i>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- SECTION 2.5: POURQUOI AUDAXEM (Des arguments concrets, pas des promesses) -->
<section class="py-20 bg-white border-b border-slate-200/50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="max-w-2xl mx-auto text-center mb-14">
			<span class="text-ax-primary font-bold text-xs uppercase tracking-widest block font-mono mb-3"
				>Pourquoi Audaxem</span
			>
			<h2 class="font-display text-2xl sm:text-3xl font-extrabold text-ax-textDark tracking-tight">
				Des arguments concrets, pas des promesses
			</h2>
			<p class="text-sm text-ax-textMuted mt-4 leading-relaxed">
				Choisir Audaxem, c'est choisir un cabinet qui conjugue exigence technique, modernité et
				vraie proximité.
			</p>
		</div>

		<!-- Arguments Grid -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			<!-- Argument 1 -->
			<div class="bg-ax-slate p-6 rounded-2xl border border-slate-200/50">
				<span class="font-mono text-xs font-extrabold text-ax-primary">01</span>
				<h3 class="text-sm font-display font-extrabold text-ax-textDark mt-2 mb-2">
					Un interlocuteur unique
				</h3>
				<p class="text-xs text-ax-textMuted leading-relaxed">
					Yaniv vous accompagne directement, sans intermédiaire. Une relation de proximité, du
					conseil à la production.
				</p>
			</div>

			<!-- Argument 2 -->
			<div class="bg-ax-slate p-6 rounded-2xl border border-slate-200/50">
				<span class="font-mono text-xs font-extrabold text-ax-primary">02</span>
				<h3 class="text-sm font-display font-extrabold text-ax-textDark mt-2 mb-2">
					100 % digital, sans la distance
				</h3>
				<p class="text-xs text-ax-textMuted leading-relaxed">
					Des outils modernes pour gagner du temps, couplés à un accompagnement humain et
					disponible.
				</p>
			</div>

			<!-- Argument 3 -->
			<div class="bg-ax-slate p-6 rounded-2xl border border-slate-200/50">
				<span class="font-mono text-xs font-extrabold text-ax-primary">03</span>
				<h3 class="text-sm font-display font-extrabold text-ax-textDark mt-2 mb-2">
					Réactivité garantie
				</h3>
				<p class="text-xs text-ax-textMuted leading-relaxed">
					Vos questions trouvent une réponse rapide. Pas de boîte noire, pas d'attente
					interminable.
				</p>
			</div>

			<!-- Argument 4 -->
			<div class="bg-ax-slate p-6 rounded-2xl border border-slate-200/50">
				<span class="font-mono text-xs font-extrabold text-ax-primary">04</span>
				<h3 class="text-sm font-display font-extrabold text-ax-textDark mt-2 mb-2">
					Conseil à forte valeur
				</h3>
				<p class="text-xs text-ax-textMuted leading-relaxed">
					Au-delà des obligations, une vision stratégique pour optimiser votre fiscalité et votre
					développement.
				</p>
			</div>

			<!-- Argument 5 -->
			<div class="bg-ax-slate p-6 rounded-2xl border border-slate-200/50">
				<span class="font-mono text-xs font-extrabold text-ax-primary">05</span>
				<h3 class="text-sm font-display font-extrabold text-ax-textDark mt-2 mb-2">
					Transparence totale
				</h3>
				<p class="text-xs text-ax-textMuted leading-relaxed">
					Des honoraires clairs et un périmètre défini : vous savez exactement ce qui est
					inclus.
				</p>
			</div>

			<!-- Argument 6 -->
			<div class="bg-ax-slate p-6 rounded-2xl border border-slate-200/50">
				<span class="font-mono text-xs font-extrabold text-ax-primary">06</span>
				<h3 class="text-sm font-display font-extrabold text-ax-textDark mt-2 mb-2">
					Expert-comptable inscrit à l'Ordre
				</h3>
				<p class="text-xs text-ax-textMuted leading-relaxed">
					Une garantie de compétence, de déontologie et de sécurité pour vous et votre
					entreprise.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- SECTION 3: À PROPOS (Yaniv Choukroun & Audaxem Presentation, Profile Photo & Quote Bubble) -->
<section id="a-propos" class="py-20 bg-ax-light/50 border-b border-slate-200/50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
			<!-- Left: Profile Photo & Quote Bubble -->
			<div class="lg:col-span-5 space-y-8 flex flex-col items-center">
				<!-- Photo Representation with custom beautiful frame -->
				<div
					class="relative w-72 h-80 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-gradient-to-br from-ax-royal to-ax-deep flex items-center justify-center"
				>
					<!-- Premium illustration styling representing Yaniv as standard photo placeholder -->
					<img src={pp} class="w-full h-full object-cover" />
				</div>

				<!-- Quote Bubble -->
				<div class="relative bg-white border border-slate-150 p-6 rounded-2xl shadow-sm max-w-sm flex flex-col">
					<div
						class="absolute -top-3 left-6 w-6 h-6 bg-white border-t border-l border-slate-150 rotate-45"
					></div>
					<span class="text-ax-primary text-3xl font-serif absolute top-2 left-3 opacity-20">“</span
					>
					<p class="text-xs text-ax-textMuted italic leading-relaxed pl-4 relative z-10">
						"Ce qui me motive profondément, c’est de créer une vraie proximité avec mes clients et
						de les accompagner avec engagement et bienveillance."
					</p>
					<h5 class="text-[10px] font-bold text-ax-textDark mt-3 text-right font-mono">
						— Yaniv Choukroun, fondateur du cabinet Audaxem Conseil
					</h5>
					<a href="https://www.linkedin.com/in/yaniv-choukroun-07579018a/" target="_blank" class="text-xs text-ax-primary underline font-bold mt-2 ml-auto">Découvrir son parcours</a>
				</div>
			</div>

			<!-- Right: Full Bio Presentation Content -->
			<div class="lg:col-span-7 space-y-6">
				<span class="text-ax-primary font-bold text-xs uppercase tracking-widest block font-mono"
					>À propos de l'Expert Comptable</span
				>
				<h2 class="font-display text-3xl font-extrabold text-ax-textDark leading-tight">
					Une vision humaine de l'expertise comptable
				</h2>

				<div class="prose prose-slate text-sm text-ax-textMuted leading-relaxed space-y-4">
					<p>
						Expert‑comptable et Commissaire aux Comptes, Yaniv a développé son parcours au sein de
						cabinets nationaux. Il a accompagné des entrepreneurs, des TPE, des PME et des groupes
						aux profils très variés, dans des environnements exigeants où la rigueur et la précision
						sont essentielles.
					</p>
					<p>
						Au fil de ces expériences, il a construit une expertise solide en comptabilité,
						fiscalité, social et structuration juridique. Mais surtout, il a appris à aller au‑delà
						des chiffres : comprendre les enjeux, les doutes, les ambitions et les décisions que
						doivent prendre les dirigeants.
					</p>
					<p>
						Avec cette vision plus humaine du métier, Yaniv a choisi de créer <strong
							>AUDAXEM CONSEIL</strong
						>, un cabinet qui lui ressemble : proche, moderne, réactif, et réellement tourné vers
						l’accompagnement. Un cabinet où l’on transforme les données en décisions concrètes, et
						où l’on aide les dirigeants à avancer avec clarté, confiance et sérénité.
					</p>
				</div>

				<!-- Trust indicators in Blue hues -->
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200/60">
					<div class="flex items-center gap-3">
						<div
							class="w-10 h-10 rounded-lg bg-blue-50 text-ax-primary flex items-center justify-center"
						>
							<i class="fa-solid fa-shield-halved text-base"></i>
						</div>
						<div>
							<h4 class="text-xs font-bold text-ax-textDark">
								Yaniv est inscrit au Tableau de l'Ordre
							</h4>
						</div>
					</div>

					<div class="flex items-center gap-3">
						<div
							class="w-10 h-10 rounded-lg bg-blue-50 text-ax-primary flex items-center justify-center"
						>
							<i class="fa-solid fa-clock-rotate-left text-base"></i>
						</div>
						<div>
							<h4 class="text-xs font-bold text-ax-textDark">
								Engagement de réponse sous 24h ouvrées
							</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- SECTION 4: CONTACT & INTERACTIVE CALENDAR SCHEDULER -->
<section id="contact" class="py-20 bg-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center max-w-2xl mx-auto mb-16">
			<span class="text-ax-primary font-bold text-xs uppercase tracking-widest block mb-2 font-mono"
				>Contact & RDV</span
			>
			<h2 class="font-display text-3xl font-extrabold text-ax-textDark">
				Prêt à optimiser votre gestion ?
			</h2>

			<p class="text-sm text-ax-textMuted mt-2">
				Rencontrons-nous pour discuter de vos besoins et élaborer ensemble la stratégie adaptée à
				votre situation.
			</p>
		</div>

		<!-- Main Layout Split (Details vs Scheduler) -->
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
			<!-- Coordinates and WhatsApp Focus (Left Column) -->
			<div
				class="lg:col-span-5 bg-ax-deep text-white rounded-2xl p-8 shadow-xl flex flex-col justify-between"
			>
				<div class="flex flex-col justify-between h-full">
					<h3
						class="text-sm font-display font-extrabold text-white mb-6 uppercase tracking-wider flex items-center gap-2"
					>
						<i class="fa-solid fa-circle-nodes text-ax-primary"></i>
						Cabinet Audaxem Conseil
					</h3>

					<!-- Grid details updated with PLACE GAMBETTA -->
					<div class="space-y-6 text-xs text-slate-300 font-mono">
						<div class="flex items-start gap-3">
							<i class="fa-solid fa-map-location-dot text-ax-primary text-base mt-0.5"></i>
							<div>
								<span class="block font-bold text-white text-[11px] uppercase tracking-wider mb-0.5"
									>Siège social</span
								>
								<span class="leading-relaxed">35 Place Gambetta,<br />33000 Bordeaux</span>
							</div>
						</div>

						<div class="flex items-start gap-3">
							<i class="fa-solid fa-phone text-ax-primary text-base mt-0.5"></i>
							<div>
								<span class="block font-bold text-white text-[11px] uppercase tracking-wider mb-0.5"
									>Téléphone direct</span
								>
								<span>06 03 96 26 64</span>
							</div>
						</div>

						<div class="flex items-start gap-3">
							<i class="fa-solid fa-envelope text-ax-primary text-base mt-0.5"></i>
							<div>
								<span class="block font-bold text-white text-[11px] uppercase tracking-wider mb-0.5"
									>Email du cabinet</span
								>
								<span>yaniv.c@audaxem-conseil.fr</span>
							</div>
						</div>
					</div>

					<!-- Highly Visible Direct WhatsApp Call to Action -->
					<div class="mt-8 p-5 bg-emerald-950/40 border border-emerald-500/20 rounded-xl space-y-3">
						<div class="flex items-center gap-2 text-emerald-400 font-bold text-xs">
							<i class="fa-brands fa-whatsapp text-lg"></i>
							<span>Support direct WhatsApp</span>
						</div>
						<p class="text-[10px] text-slate-300 font-sans leading-relaxed">
							Échangez directement et de manière confidentielle avec Yaniv Choukroun sur votre
							projet de création ou de transfert de comptabilité.
						</p>
						<a
							href="https://wa.me/33603962664"
							target="_blank"
							class="inline-flex w-full items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg text-xs font-mono transition-colors shadow"
						>
							<i class="fa-brands fa-whatsapp text-sm"></i> Écrire sur WhatsApp
						</a>
					</div>
				</div>
			</div>

			<!-- Calendar Selection (Right Column) -->
			<div
				class="lg:col-span-7 bg-ax-slate rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between"
			>
				<div>
					<h3
						class="text-sm font-display font-extrabold text-ax-textDark mb-6 uppercase tracking-wider flex items-center gap-2"
					>
						<i class="fa-solid fa-calendar-check text-ax-primary"></i>
						Réserver votre créneau en ligne
					</h3>

					<!-- Month toggle layout -->
					<div class="flex justify-between items-center mb-5">
						<button
							type="button"
							class="text-ax-textMuted hover:text-ax-textDark font-mono text-xs font-bold"
							onclick={changeWeek('prev')}
						>
							<i class="fa-solid fa-chevron-left mr-1"></i> Précédent
						</button>
						<span class="font-display font-extrabold text-ax-textDark text-sm" id="cal-month"
							>Juillet 2026</span
						>
						<button
							type="button"
							class="text-ax-textMuted hover:text-ax-textDark font-mono text-xs font-bold"
							onclick={changeWeek('next')}
						>
							Suivant <i class="fa-solid fa-chevron-right ml-1"></i>
						</button>
					</div>

					<!-- Days Selector -->
					<div class="grid grid-cols-5 gap-2 text-center mb-6" id="cal-days-grid">
						<!-- Populated with JS -->
					</div>

					<!-- Hours Selector -->
					<h4 class="text-xs font-mono font-bold text-ax-textMuted mb-3 uppercase tracking-wider">
						Sélectionnez une heure
					</h4>
					<div class="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-6" id="cal-hours-grid">
						<!-- Populated with JS -->
					</div>

					<!-- Integrated mini-form for contact -->
					<form
						id="booking-form"
						onsubmit={submitMeeting(event)}
						class="space-y-4 border-t border-slate-200/60 pt-6"
					>
						<div
							class="bg-white rounded-xl p-3 border border-slate-150 font-mono text-xs flex justify-between items-center shadow-inner"
						>
							<span class="text-ax-textMuted">Rendez-vous choisi :</span>
							<span class="font-bold text-ax-primary" id="cal-selected-summary"
								>Choisir un horaire</span
							>
						</div>

						<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<input
								type="text"
								id="form-name"
								required
								placeholder="Votre nom complet"
								class="bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-ax-primary"
							/>
							<input
								type="email"
								id="form-email"
								required
								placeholder="Votre e-mail"
								class="bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-ax-primary"
							/>
						</div>

						<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<input
								type="tel"
								id="form-phone"
								required
								placeholder="Téléphone portable"
								class="bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-ax-primary"
							/>
							<button
								type="submit"
								class="bg-ax-primary hover:bg-ax-royal text-white font-extrabold py-2.5 px-4 rounded-lg text-xs uppercase tracking-wider transition-all"
							>
								Confirmer le rendez-vous
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Success Modal Overlay -->
<div
	id="success-modal"
	class="hidden fixed inset-0 bg-ax-deep/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
>
	<div
		class="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 text-center space-y-4 shadow-2xl font-mono text-xs"
	>
		<div
			class="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl"
		>
			<i class="fa-solid fa-circle-check"></i>
		</div>
		<h3 class="text-sm font-display font-extrabold text-ax-textDark uppercase tracking-wider">
			Créneau réservé !
		</h3>
		<p class="text-ax-textMuted leading-relaxed" id="modal-success-desc">
			Votre demande de consultation a bien été enregistrée.
		</p>
		<button
			type="button"
			onclick={closeModal()}
			class="w-full bg-ax-primary hover:bg-ax-royal text-white font-bold py-3 rounded-xl text-xs uppercase tracking-widest transition-all"
		>
			Fermer
		</button>
	</div>
</div>

<!-- Floating Whatsapp Action Button -->
<a
	href="https://wa.me/33603962664"
	target="_blank"
	class="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-all flex-shrink-0 px-6 py-3 gap-4"
>
	<span class="text-xs font-bold font-mono hidden sm:inline-block h-fit">
		Discuter avec Yaniv
	</span>
	<i class="fa-brands fa-whatsapp text-2xl"></i>
</a>

<!-- Footer Area (High Contrast, Shades of Blue) -->
<footer class="bg-ax-deep text-slate-400 pt-16 pb-8 border-t border-slate-800">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
			<!-- Branding -->
			<div class="space-y-4">
				<div class="flex items-center space-x-3">
					<span class="font-display text-xs uppercase font-extrabold text-white tracking-tight">
						Audaxem Conseil
					</span>
				</div>
				<p class="text-xs text-slate-400 leading-relaxed">
					Cabinet d'expertise-comptable moderne et axé sur le digital. Il propose un accompagnement
					sur mesure pour optimiser votre gestion comptable, financière et fiscale. Son objectif est
					de vous faire gagner du temps et de la sérénité pour développer votre activité.
				</p>
			</div>

			<!-- Coordinates Place Gambetta -->
			<div class="space-y-4">
				<h4 class="text-white font-display font-bold text-xs uppercase tracking-wider">
					Le Cabinet
				</h4>
				<ul class="space-y-3 text-xs text-slate-400 font-mono">
					<li class="flex items-start gap-2">
						<i class="fa-solid fa-map-location-dot text-ax-primary mt-1"></i>
						<span>35 Place Gambetta,<br />33000 Bordeaux</span>
					</li>
					<li class="flex items-center gap-2">
						<i class="fa-solid fa-phone text-ax-primary"></i>
						<span>06 03 96 26 64</span>
					</li>
					<li class="flex items-center gap-2">
						<i class="fa-solid fa-envelope text-ax-primary"></i>
						<span>contact@audaxem-conseil.fr</span>
					</li>
				</ul>
			</div>

			<!-- Specialties Links -->
			<div class="space-y-4">
				<h4 class="text-white font-display font-bold text-xs uppercase tracking-wider">Domaines</h4>
				<ul class="space-y-2 text-xs text-slate-400 font-mono">
					<li>
						<a href="#services" class="hover:text-white transition-colors">Tenue comptable</a>
					</li>
					<li>
						<a href="#services" class="hover:text-white transition-colors">Bulletins de paie</a>
					</li>
					<li>
						<a href="#services" class="hover:text-white transition-colors">Création SASU & EURL</a>
					</li>
					<li>
						<a href="#services" class="hover:text-white transition-colors">Optimisation fiscale</a>
					</li>
				</ul>
			</div>

			<!-- Newsletter Subscription -->
			<div class="space-y-4">
				<h4 class="text-white font-display font-bold text-xs uppercase tracking-wider">
					Fiches Conseils
				</h4>
				<p class="text-xs text-slate-400 leading-relaxed">
					Recevez nos notes d'optimisation rédigées directement par Yaniv Choukroun.
				</p>
				<form
					onsubmit={() => {
						event.preventDefault();
						document.getElementById('news-success').classList.remove('hidden');
					}}
					class="flex gap-2"
				>
					<input
						type="email"
						placeholder="Adresse e-mail"
						required
						class="bg-white/5 text-white placeholder-slate-600 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-white w-full"
					/>
					<button
						type="submit"
						class="bg-white text-ax-deep font-bold px-3 py-2 rounded-lg text-xs hover:bg-slate-200 transition-colors"
						>OK</button
					>
				</form>
				<p
					id="news-success"
					class="hidden text-[10px] text-emerald-400 font-mono mt-1 font-semibold"
				>
					Inscription validée !
				</p>
			</div>
		</div>

		<!-- Bottom footer info -->
		<div
			class="border-t border-slate-800 pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-slate-600 gap-4"
		>
			<p>© 2026 Audaxem Conseil. Dirigé par Yaniv Choukroun. Tous droits réservés.</p>
			<div class="flex gap-4">
				<a href="#" class="hover:text-white transition-colors">Mentions Légales</a>
				<a href="#" class="hover:text-white transition-colors">Confidentialité</a>
			</div>
		</div>
	</div>
</footer>