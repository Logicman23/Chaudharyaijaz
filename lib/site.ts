/**
 * Single source of truth for site copy and data.
 *
 * Biography, achievements and vision come from the official profile document
 * (assets/Aijaz Ch Profile.pdf). Items marked `TODO(client)` need the client to
 * confirm or supply real details before launch.
 */

export const site = {
  name: "Chaudhary Aijaz",
  fullName: "Aijaz Ahmed Chaudhary",
  urduName: "اعجاز احمد چوہدری",
  title: "Former Member, National Assembly of Pakistan",
  url: "https://chaudharyaijaz.com",
  description:
    "Official website of Aijaz Ahmed Chaudhary — former MNA from Mandi Bahauddin, Pakistan Tehreek-e-Insaf leader, businessman and social activist standing with Imran Khan's vision of a just, prosperous Pakistan.",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Biography", href: "#biography" },
  { label: "Vision", href: "#vision" },
  { label: "Gallery", href: "#gallery" },
  { label: "Events", href: "#events" },
  { label: "Media", href: "#media" },
  { label: "Contact", href: "#contact" },
] as const;

export const socials = {
  facebook: { label: "Facebook", handle: "ChAijazOfficial", url: "https://www.facebook.com/ChAijazOfficial" },
  x: { label: "X", handle: "aijaz_ch", url: "https://x.com/aijaz_ch" },
  youtube: {
    label: "YouTube",
    handle: "ChAijazMNA",
    url: "https://youtube.com/@ChAijazMNA",
    // Resolved from the @ChAijazMNA handle. Powers the key-less RSS feed.
    channelId: "UCpdUXMUni8CaP-vEDBTIQKA",
  },
  instagram: { label: "Instagram", handle: "chaijaz", url: "https://instagram.com/chaijaz" },
} as const;

export type SocialKey = keyof typeof socials;

/**
 * Hand-picked X posts, shown when X_BEARER_TOKEN isn't set.
 * TODO(client): copy the number at the end of a post URL
 * (x.com/aijaz_ch/status/<ID>) and add it here, newest first.
 */
export const featuredTweetIds: string[] = [];

export const heroSlides = [
  {
    // Finished banner artwork (text baked in) — shown whole, without the overlay copy.
    id: "banner",
    banner: true,
    eyebrow: "With Imran Khan",
    image: "/images/aijaz-imran-banner.jpg",
    width: 1312,
    height: 463,
    alt: "Mohammed Aijaz Chaudhary, former Member of the National Assembly of Pakistan, in conversation with Imran Khan — a lifelong commitment to public service, democratic values and people's welfare",
    href: "#biography",
  },
  {
    id: "solidarity",
    eyebrow: "Solidarity & Leadership",
    title: "Standing with Imran Khan.",
    highlight: "Carrying the vision forward.",
    body: "From the floor of the National Assembly to the front line of Pakistan Tehreek-e-Insaf — a steadfast voice for justice, accountability and the rule of law.",
    image: "/images/with-imran-khan.jpg",
    alt: "Chaudhary Aijaz seated with Imran Khan, who wears a PTI scarf",
    position: "object-[65%_40%]",
    cta: { label: "Read the Vision", href: "#vision" },
  },
  {
    id: "community",
    eyebrow: "Social Activism & Community",
    title: "The people's work,",
    highlight: "done at the people's door.",
    body: "Raising the concerns of Mandi Bahauddin with the institutions that can solve them — and following through until they are solved.",
    image: "/images/public-office-meeting.jpg",
    alt: "Chaudhary Aijaz raising constituents' concerns with a senior official",
    position: "object-[70%_center]",
    cta: { label: "Upcoming Events", href: "#events" },
  },
  {
    id: "future",
    eyebrow: "Future Vision",
    title: "A Naya Pakistan built on",
    highlight: "merit, enterprise and justice.",
    body: "Three decades of building institutions at home and abroad, now committed to a welfare state where every Pakistani has a fair chance.",
    image: "/images/national-assembly-session.jpg",
    alt: "Chaudhary Aijaz chairing a session in the National Assembly of Pakistan",
    position: "object-[60%_35%]",
    cta: { label: "Join the Movement", href: "#join" },
  },
] as const;

export const stats = [
  { value: "190+", label: "Bills submitted for legislation" },
  { value: "$6B", label: "Foreign investment brought to Pakistan" },
  { value: "7,800", label: "Jobs created for overseas Pakistanis" },
  { value: "30+", label: "Years of leadership experience" },
] as const;

export const milestones = [
  {
    tag: "Enterprise",
    title: "Founder & MD, Kuwait-based business house",
    body: "Built a group of 28 companies that became one of the largest employers of overseas Pakistanis — 7,800 staff, 99% of them Pakistani.",
  },
  {
    tag: "Investment",
    title: "Largest foreign investment in Pakistan",
    body: "Brought the Khalifa Refinery project — worth US $6 billion — to Pakistan.",
  },
  {
    tag: "Thought Leadership",
    title: "88 seminars & conferences worldwide",
    body: "Spoke as a technocrat on industrial city development, corporate culture in the developing world and industrial management.",
  },
  {
    tag: "Education",
    title: "Syndicate Member, Quaid-e-Azam University",
    body: "Curbed misappropriation of government funds by bringing private investment on a BOT basis to develop university projects.",
  },
  {
    tag: "Parliament",
    title: "Member, National Assembly of Pakistan",
    body: "Submitted more than 190 bills, including the elimination of discretionary powers at every tier and the merger of state welfare funds into one institution.",
  },
  {
    tag: "Committees",
    title: "Privatization & Foreign Affairs Committees",
    body: "Drafted the privatization schedule for state-owned institutions and coordinated with the European Parliament and donor agencies for 2005 earthquake relief.",
  },
  {
    tag: "Mandate",
    title: "Record-setting 2013 victory",
    body: "Won the National Assembly seat in a result described as a record in the 100-year political history of District Mandi Bahauddin and central Punjab.",
  },
  {
    tag: "PTI",
    title: "Joined Pakistan Tehreek-e-Insaf",
    body: "Resigned from the then-ruling party and the National Assembly on principle, and joined Imran Khan's PTI in opposition — standing in the front line of the struggle for democracy and justice.",
  },
] as const;

/** "Experience" section of the official profile — three decades running a Kuwait-headquartered group. */
export const experience = [
  {
    title: "International Corporate Affairs",
    body: "Represented international companies as strategic partner, agent, distributor, sponsor and adviser across the Middle East, Pakistan, AJK and Afghanistan.",
  },
  {
    title: "Crisis Management",
    body: "In the post-Gulf War era, worked with world-leading firms such as Bechtel and the Government of Kuwait while more than 300 oil fields were burning.",
  },
  {
    title: "Reconstruction & Rehabilitation",
    body: "Played a leading role in rebuilding and rehabilitating Kuwait after the war — a contribution on the record of the Kuwaiti Government.",
  },
  {
    title: "Petrochemical Industry",
    body: "Management and marketing expertise across the upstream and downstream petrochemical product lines of international companies.",
  },
  {
    title: "BOT Projects",
    body: "Arranged finance, design, tendering and supervision for build-operate-transfer projects — airports, tourist cities and a large agro project in Egypt.",
  },
  {
    title: "Mega Projects",
    body: "Management, design and execution of mega-scale hi-tech projects, with partners behind landmarks such as the Dubai Monorail and Business Bay.",
  },
  {
    title: "Aerospace Industry",
    body: "Drove strong revenue growth at Kuwait Airways through consultancy and management, and advised leading airlines on budgets and route marketing.",
  },
  {
    title: "Director, PARCO",
    body: "Replaced bureaucratic working styles at Pak-Arab Refinery, bringing the company to success on international standards.",
  },
  {
    title: "Project Management",
    body: "Civil and electro-mechanical works — medium and large projects for government, semi-government and the private sector.",
  },
] as const;

export const vision = [
  {
    title: "Good Governance",
    body: "Eliminate discretionary powers at every level to cut corruption at its root. The state governs; the private sector runs everything except defence, interior, foreign affairs and the State Bank.",
    accent: "red",
  },
  {
    title: "A True Welfare State",
    body: "Merge Bait-ul-Mal, BISP, Zakat and the Poverty Alleviation Fund into one strong institution — so the state is responsible for every unemployed Pakistani, without discrimination.",
    accent: "gold",
  },
  {
    title: "Corporate Pakistan",
    body: "Revolutionise the corporate sector with world-class industrial, commercial and agricultural business houses that compete with the outside world.",
    accent: "green",
  },
  {
    title: "Investment in Traction",
    body: "Open every sector to overseas Pakistanis and foreign investors through transparent tendering, franchising, BOT projects and capital-market development.",
    accent: "red",
  },
  {
    title: "Business Districts",
    body: "A business district in every division — Expo Centre, Industrial Park, IT Park and Trade Centre — so commerce runs all year round.",
    accent: "gold",
  },
  {
    title: "Educated Enterprise",
    body: "Awareness campaigns and training modules that put modern business practice in the hands of the common man to restore Pakistan's economy.",
    accent: "green",
  },
] as const;

export const gallery = [
  { src: "/images/with-imran-khan.jpg", alt: "With Imran Khan", caption: "With Chairman Imran Khan", w: 1080, h: 804 },
  { src: "/images/national-assembly-session.jpg", alt: "Chairing a session in the National Assembly", caption: "Chairing the session, National Assembly", w: 1012, h: 718 },
  { src: "/images/meeting-imran-khan.jpg", alt: "Meeting with Imran Khan", caption: "Strategy meeting with Imran Khan", w: 900, h: 502 },
  { src: "/images/public-office-meeting.jpg", alt: "Meeting with officials on public issues", caption: "Taking constituents' issues to the authorities", w: 960, h: 540 },
  { src: "/images/with-dignitaries.jpg", alt: "With dignitaries at an official reception", caption: "With dignitaries at an official reception", w: 900, h: 596 },
  { src: "/images/official-engagement.jpg", alt: "Official engagement", caption: "Official engagement in Islamabad", w: 960, h: 540 },
] as const;

/**
 * News / press grid. Seeded with feature stories drawn from the official
 * profile. TODO(client): add real press releases here — or swap this array for a
 * CMS query (Sanity, Contentful, WordPress REST) inside a `'use cache'` function.
 */
export const news: {
  category: "Press Release" | "Campaign Trail" | "Feature" | "Statement";
  title: string;
  excerpt: string;
  date: string | null;
  image: string;
  href: string;
}[] = [
  {
    category: "Feature",
    title: "From Kuwait to Parliament: three decades of building",
    excerpt:
      "How a Pakistani entrepreneur built a 28-company group abroad, employed 7,800 compatriots and brought a US $6 billion investment home.",
    date: null,
    image: "/images/with-dignitaries.jpg",
    href: "#biography",
  },
  {
    category: "Statement",
    title: "Why Chaudhary Aijaz stands with Imran Khan",
    excerpt:
      "Resigning from the ruling party and the Assembly on principle — and joining PTI's front line in the struggle for democracy and justice.",
    date: null,
    image: "/images/meeting-imran-khan.jpg",
    href: "#vision",
  },
  {
    category: "Campaign Trail",
    title: "Taking Mandi Bahauddin's voice to Islamabad",
    excerpt:
      "Constituents' issues raised directly with the federal departments responsible — and followed up until they are resolved.",
    date: null,
    image: "/images/official-engagement.jpg",
    href: "#events",
  },
];

/**
 * TODO(client): replace with the real schedule. Dates are left as "TBA" on
 * purpose so nothing invented is published. Set `date` to an ISO string
 * (e.g. "2026-11-14T16:00:00+05:00") and the card shows day/month automatically.
 */
export const events: {
  title: string;
  type: "Rally" | "Public Darbar" | "Workers' Convention" | "Press Conference";
  venue: string;
  city: string;
  date: string | null;
  description: string;
}[] = [
  {
    title: "Weekly Public Darbar",
    type: "Public Darbar",
    venue: "Haji Public Secretariat, Main Phalia Road",
    city: "Mandi Bahauddin",
    date: null,
    description: "Open-door hearing for constituents — bring your issues directly to Chaudhary Aijaz.",
  },
  {
    title: "PTI Workers' Convention",
    type: "Workers' Convention",
    venue: "Venue to be announced",
    city: "Mandi Bahauddin",
    date: null,
    description: "Organising the grassroots — union council coordinators, youth and women's wings.",
  },
  {
    title: "Press Conference",
    type: "Press Conference",
    venue: "Street 51 Marvi Road, House 16, F-7/4",
    city: "Islamabad",
    date: null,
    description: "Statement on current national affairs and the party's way forward.",
  },
];

export const offices = [
  {
    city: "Mandi Bahauddin",
    label: "Constituency Office",
    address: "Haji Public Secretariat, Main Phalia Road, Mandi Bahauddin",
    phones: ["0456-504491", "0456-506491", "0456-506699"],
  },
  {
    city: "Islamabad",
    label: "Islamabad Office",
    address: "Street 51 Marvi Road, House 16, F-7/4, Islamabad, Pakistan",
    phones: ["+92 321 5172162"],
  },
] as const;

export const islamabadOffice = offices[1];

/** Turns a display number like "+92 321 5172162" or "0456-504491" into a `tel:` href. */
export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

// TODO(client): confirm these are still current before launch.
export const contact = {
  email: "chaudharyaijaz@yahoo.com",
  whatsapp: "+92 311 4441444",
  whatsappLink: "https://wa.me/923114441444",
};
