/* ==========================================================================
   STOMPIN STAMPEDE — SITE CONTENT
   --------------------------------------------------------------------------
   This is the ONLY file you need to edit to update the website.
   - Change any text between the quotes.
   - Leave a value as "" (empty) to hide it.
   - To add another item to a list, copy one { ... } block, paste it after a
     comma, and edit it.
   - Simple HTML is allowed in text (e.g. <strong>bold</strong> or links).
   Save the file and refresh the browser to see your changes.
   ========================================================================== */

window.SITE = {

  /* ---------- GENERAL ---------- */
  eventName: "Stompin Stampede",
  tagline: "",
  dateText: "June 2027",                 // Shown everywhere, e.g. "June 11–13, 2027"
  startDate: "",                         // For the countdown, format YYYY-MM-DD (e.g. "2027-06-11"). Leave "" to hide it.
  city: "",                  // Short location, e.g. "Nashville, TN"
  facebookUrl: "https://www.facebook.com/people/Stompin-Stampede/61594414935545/",   // <-- Paste your Facebook page link here
  registerUrl: "",                       // Link to your registration form. Leave "" to hide the Register buttons.

  /* ---------- HOME TAB ---------- */
  welcome:
    "Stompin Stampede is a line dance competition based in Queensland built for people who are just entering the competition field. More information coming soon; check out our Facebook page for more information." +
    "",

  // Short highlight cards on the home page
  highlights: [
    { title: "Competition", text: "Divisions for newcomers through advanced dancers." },
    { title: "Workshops",   text: "Learn new choreography from top instructors." },
    { title: "Social Dancing", text: "Dance the night away with fellow boot-scooters." },
  ],

  // News & announcements (newest first). Leave the list empty [] to hide.
  announcements: [
    { date: "Nov 2026", text: "Save the date! Stompin Stampede is coming June 2027. More details soon." },
  ],

  /* ---------- EVENT DETAILS TAB ---------- */
  about:
    "Add a description of the event here — who it’s for, what makes it special, " +
    "and what dancers can expect.",

  // Key facts shown as a list
  details: [
    { label: "Dates",        value: "June 2027 — exact dates TBA" },
    { label: "Location",     value: "TBA" },
    { label: "Doors Open",   value: "TBA" },
    { label: "Who Can Enter", value: "All ages and skill levels" },
    { label: "Spectators",   value: "Welcome — ticket info TBA" },
  ],

  /* ---------- SCHEDULE TAB ---------- */
  schedule: [
    {
      day: "Day 1 — Friday",
      items: [
        { time: "TBA", title: "Check-in & Registration" },
        { time: "TBA", title: "Welcome Social Dance" },
      ],
    },
    {
      day: "Day 2 — Saturday",
      items: [
        { time: "TBA", title: "Workshops" },
        { time: "TBA", title: "Competition Rounds" },
        { time: "TBA", title: "Evening Social & Awards" },
      ],
    },
  ],

  /* ---------- COMPETITION TAB ---------- */
  divisions: [
    { name: "Newcomer",     description: "For dancers new to competition." },
    { name: "Novice",       description: "Description TBA." },
    { name: "Intermediate", description: "Description TBA." },
    { name: "Advanced",     description: "Description TBA." },
    { name: "Teams",        description: "Group routines. Team size TBA." },
  ],
  rules: [
    "Full rules and judging criteria will be posted here.",
    "Dress code: TBA.",
  ],

  /* ---------- REGISTRATION TAB ---------- */
  registrationNote: "Registration opens soon. Check back or follow us on Facebook for updates.",
  fees: [
    { item: "Competitor Entry", price: "TBA" },
    { item: "Workshop Pass",    price: "TBA" },
    { item: "Spectator Ticket", price: "TBA" },
  ],
  deadlines: [
    { label: "Early-bird registration ends", date: "TBA" },
    { label: "Final registration deadline",  date: "TBA" },
  ],

  /* ---------- VENUE TAB ---------- */
  venueName: "Venue TBA",
  venueAddress: "",                      // Full street address. When filled in, a map appears.
  venueNotes: "Parking, accessibility, and venue details will be posted here.",
  hotels: [
    // { name: "Hotel Name", details: "Group rate $___/night — use code STOMP", url: "https://..." },
  ],

  /* ---------- FAQ TAB ---------- */
  faq: [
    { q: "Do I need a partner?", a: "No — line dancing is done solo. Just bring your boots!" },
    { q: "Can I come just to watch?", a: "Yes! Spectators are welcome. Ticket info coming soon." },
    { q: "What should I wear?", a: "Comfortable clothing and shoes you can dance in. Competition dress code TBA." },
  ],

  /* ---------- CONTACT TAB ---------- */
  contactEmail: "stompinstampede2027@gmail.com",                      // e.g. "info@stompinstampede.com"
  contactPhone: "0436127325",                      // e.g. "(555) 123-4567"
  contactNote: "Questions? Reach out — we’d love to hear from you.",
};
