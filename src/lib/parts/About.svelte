<script>
	import pp from '$lib/assets/pp.jpg';
</script>

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
				<div
					class="relative bg-gradient-to-b from-[#111E38] to-[#0B1528] border border-blue-500/30 p-6 rounded-2xl shadow-xl max-w-80 flex flex-col items-center"
				>
					<div
						class="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#111E38] border-t border-l border-blue-500/30 rotate-45"
					></div>
					<span class="text-blue-400/25 text-5xl font-serif absolute top-1 left-4 select-none"
						>“</span
					>

					<p
						class="text-sm font-bold text-slate-100 italic leading-relaxed text-center relative z-10 pt-2 px-2"
					>
						"Ce qui me motive profondément, c’est de créer une vraie proximité avec mes clients et
						de les accompagner avec engagement et bienveillance."
					</p>

					<div
						class="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent my-3"
					></div>

					<h5 class="text-xs md:text-sm font-semibold text-blue-200 text-center tracking-wide">
						Yaniv Choukroun, fondateur du cabinet Audaxem Conseil
					</h5>

					<a
						href="https://www.linkedin.com/in/yaniv-choukroun-07579018a/"
						target="_blank"
						class="text-xs md:text-sm text-blue-400 hover:text-blue-300 underline font-bold mt-3 transition-colors flex items-center justify-center gap-3"
					>
						Découvrir son parcours

						<svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 0 72 72" width="30"
							><g fill="none" fill-rule="evenodd"
								><path
									d="M8,72 L64,72 C68.418278,72 72,68.418278 72,64 L72,8 C72,3.581722 68.418278,-8.11624501e-16 64,0 L8,0 C3.581722,8.11624501e-16 -5.41083001e-16,3.581722 0,8 L0,64 C5.41083001e-16,68.418278 3.581722,72 8,72 Z"
									fill="#007EBB"
								></path><path
									d="M62,62 L51.315625,62 L51.315625,43.8021149 C51.315625,38.8127542 49.4197917,36.0245323 45.4707031,36.0245323 C41.1746094,36.0245323 38.9300781,38.9261103 38.9300781,43.8021149 L38.9300781,62 L28.6333333,62 L28.6333333,27.3333333 L38.9300781,27.3333333 L38.9300781,32.0029283 C38.9300781,32.0029283 42.0260417,26.2742151 49.3825521,26.2742151 C56.7356771,26.2742151 62,30.7644705 62,40.051212 L62,62 Z M16.349349,22.7940133 C12.8420573,22.7940133 10,19.9296567 10,16.3970067 C10,12.8643566 12.8420573,10 16.349349,10 C19.8566406,10 22.6970052,12.8643566 22.6970052,16.3970067 C22.6970052,19.9296567 19.8566406,22.7940133 16.349349,22.7940133 Z M11.0325521,62 L21.769401,62 L21.769401,27.3333333 L11.0325521,27.3333333 L11.0325521,62 Z"
									fill="#FFF"
								></path></g
							></svg
						>
					</a>
				</div>
			</div>

			<!-- Right: Full Bio Presentation Content -->
			<div class="lg:col-span-7 space-y-6">
				<span class="text-ax-primary font-bold text-xs uppercase tracking-widest block font-display"
					>À propos de l'Expert Comptable</span
				>
				<h2 class="font-display text-3xl font-extrabold text-ax-textDark leading-tight">
					Une vision moderne de l'expertise comptable
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