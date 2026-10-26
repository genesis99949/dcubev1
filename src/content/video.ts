import { l, type L, type Lang } from "./i18n";

export type MediaKind = "video" | "voiceover" | "voiceover-ai";

export const mediaLabels: Record<MediaKind, L> = {
  video: l("AI video ad", "Reclamă video AI"),
  voiceover: l("Voice-over", "Voice-over"),
  "voiceover-ai": l("AI voice-over", "Voice-over AI"),
};

/** Separate from website packages. Romanian prices confirmed by Ramon on 2026-10-26. */
export const mediaOffers = [
  {
    id: "video-30",
    kind: "video",
    name: l("Up to 30 seconds", "Până la 30 de secunde"),
    description: l("A short video ad for your brand.", "O reclamă video scurtă pentru brandul tău."),
    price: { ro: 700, en: 140 },
  },
  {
    id: "video-60",
    kind: "video",
    name: l("Up to 60 seconds", "Până la 60 de secunde"),
    description: l("More time to present your product or business.", "Mai mult timp pentru a prezenta produsul sau afacerea ta."),
    price: { ro: 1200, en: 240 },
  },
  {
    id: "voiceover-200",
    kind: "voiceover",
    name: l("Up to 200 words", "Până la 200 de cuvinte"),
    description: l(
      "Voice recording in Romanian, with audio editing and processing. Available separately or added to a video.",
      "Înregistrare în limba română, cu editare și procesare audio. Se poate comanda separat sau adăuga unui video.",
    ),
    price: { ro: 200, en: 40 },
  },
  {
    id: "voiceover-ai-200",
    kind: "voiceover-ai",
    name: l("Up to 200 words", "Până la 200 de cuvinte"),
    description: l(
      "AI-generated voice in Romanian, with pronunciation checks and audio processing. Available separately or added to a video.",
      "Voce generată cu AI în limba română, cu verificarea pronunției și procesare audio. Se poate comanda separat sau adăuga unui video.",
    ),
    price: { ro: 100, en: 20 },
  },
] as const satisfies readonly {
  id: string;
  kind: MediaKind;
  name: L;
  description: L;
  price: Record<Lang, number>;
}[];

export const videoCopy = {
  headline: l("Video ads for your brand.", "Reclame video pentru brandul tău."),
  text: l(
    "I create video ads with AI-generated visuals, video editing and sound design. You can commission a video on its own.",
    "Creez reclame video cu imagini generate cu AI, montaj și sound design. Poți comanda un video ca proiect de sine stătător.",
  ),
  includes: [
    l("Script for one concept", "Scenariu pentru un singur concept"),
    l("AI-generated visuals", "Imagini generate cu AI"),
    l("Video editing & sound design", "Montaj și sound design"),
    l("MP4 in one format of your choice", "MP4 într-un format la alegere"),
    l("One round of adjustments", "O rundă de ajustări"),
  ],
  servicesTitle: l("Video ads & voice-over", "Reclame video și voice-over"),
  servicesText: l("AI video ads, editing and sound design, with recorded or AI-generated voice-over. Available as a separate project.", "Reclame video cu AI, montaj și sound design, cu voice-over înregistrat sau generat cu AI. Le poți comanda și ca proiect separat."),
  servicesAction: l("See video examples and prices", "Vezi exemplele și prețurile video"),
  examplesTitle: l("Watch two examples", "Vezi două exemple"),
  exampleAction: l("Watch the ad", "Vezi reclama"),
  detailsTitle: l("What your video includes", "Ce primești pentru video"),
  details: [
    {
      question: l("What format do I receive?", "În ce format primesc videoclipul?"),
      answer: l("You receive an MP4 in one format chosen before production: vertical, square or landscape. Extra formats and subtitles can be quoted separately.", "Primești un MP4 într-un format ales înainte de producție: vertical, pătrat sau orizontal. Formatele suplimentare și subtitrările se pot oferta separat."),
    },
    {
      question: l("What does a round of adjustments cover?", "Ce înseamnă o rundă de ajustări?"),
      answer: l("You send your feedback together, and I adjust the edit and titles within the approved concept. A new concept, extra scenes or additional versions are quoted separately before work on them starts.", "Îmi trimiți observațiile într-o singură listă, iar eu ajustez montajul și titlurile în cadrul conceptului aprobat. Un concept nou, scenele în plus sau versiunile suplimentare se cotează separat, înainte să lucrez la ele."),
    },
    {
      question: l("When do I receive it, and how do I pay?", "Când îl primesc și cum plătesc?"),
      answer: l("The written quote confirms the delivery date, scene list and materials needed before work starts. Payment is 50% in advance and 50% on final delivery.", "Oferta scrisă confirmă data livrării, lista scenelor și materialele necesare, înainte să începem. Plata este 50% avans și 50% la livrarea finală."),
    },
    {
      question: l("Can I order just a voice-over?", "Pot comanda doar voice-over?"),
      answer: l("Yes. Send the final text in Romanian, up to 200 words. You receive the edited audio. For a video, we adapt the text to the chosen duration; 200 words is the package limit, not a promise that the text fits a short ad.", "Da. Îmi trimiți textul final în română, de până la 200 de cuvinte, și primești înregistrarea editată. Pentru un video, adaptăm textul la durata aleasă; limita de 200 de cuvinte nu înseamnă că tot textul încape într-un spot scurt."),
    },
  ],
  processTitle: l("From brief to delivery.", "De la brief la livrare."),
  steps: [
    { title: l("Brief", "Brief"), text: l("Tell me what you are promoting, who it is for and what materials you have.", "Îmi spui ce promovezi, cui te adresezi și ce materiale ai.") },
    { title: l("Concept & quote", "Concept și ofertă"), text: l("We agree on the message, script and format. You get the price and deadline in writing, before the deposit.", "Stabilim mesajul, scenariul și formatul. Primești prețul și termenul în scris, înainte de avans.") },
    { title: l("Production", "Producție"), text: l("I create the visuals, edit and sound, or record the voice-over. You review a preview and send your feedback.", "Creez imaginile, montajul și sunetul sau înregistrez voice-over-ul. Vezi o previzualizare și îmi trimiți observațiile.") },
    { title: l("Delivery", "Livrare"), text: l("After approval and final payment, you receive the files in the agreed formats.", "După aprobare și plata finală, primești fișierele în formatele stabilite.") },
  ],
  action: l("Choose this video", "Aleg acest video"),
  voiceoverAction: l("Request a voice-over", "Vreau voice-over"),
  aiVoiceoverAction: l("Request an AI voice-over", "Vreau voice-over AI"),
  note: l(
    "Voice-over is charged separately. The script, number of scenes, delivery formats and revisions are agreed in the quote.",
    "Voice-over-ul se plătește separat. Scenariul, numărul de scene, formatele livrate și reviziile se stabilesc în ofertă.",
  ),
};
