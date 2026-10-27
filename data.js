// Bloom & Spencer Atelier — content & configuration
// Store contact details live here so they can be changed in one place.
// NOTE: the website footer shows +91 81799 93656, while its Call/WhatsApp
// buttons dial +91 99127 53635. Confirm with the owner which is correct.
window.CONFIG = {
  storeName: "Bloom & Spencer",
  whatsapp: "919912753635",            // digits only, with country code
  phoneDisplay: "+91 81799 93656",
  email: "info@bloomandspencer.com",
  address: ["#151, Motilal Nehru Nagar,", "Begumpet, Hyderabad - 500016."],
  instagram: "https://www.instagram.com/bloomandspencer/",
  site: "https://www.bloomandspencer.com/",
  img: "https://www.bloomandspencer.com/files1/images/"
};

window.STONES = {
  diamond: {
    name: "Diamond", color: "#e9eef2", edge: "#9fb3c2",
    tagline: "Diamonds of exceptional brilliance.",
    character: "Colourless fire and unmatched sparkle. Bloom & Spencer's diamonds are lab-grown: chemically and optically the same as mined diamonds.",
    hardness: "10 (the hardest natural material)",
    why: "Timeless, works with every metal, and tough enough to wear every day.",
    image: "rings/the-regent-classic-solitaire-ring.jpg", link: "diamond/"
  },
  ruby: {
    name: "Ruby", color: "#9b111e", edge: "#5e0a12",
    tagline: "Where the deep allure of ruby meets timeless luxury.",
    character: "A rich, passionate red. Ruby is a variety of the mineral corundum, coloured by chromium.",
    hardness: "9",
    why: "Bold and romantic, and nearly as durable as diamond, so it suits rings worn daily.",
    image: "ruby/ruby1.jpeg", link: "ruby/"
  },
  emerald: {
    name: "Emerald", color: "#046307", edge: "#023a04",
    tagline: "Where the richness of emerald meets timeless luxury.",
    character: "A deep, velvety green from the beryl family. Tiny natural inclusions, called its \"jardin\" or garden, are part of its charm.",
    hardness: "7.5 to 8",
    why: "Elegant and distinctive. Best in protective settings like halos, pendants and studs.",
    image: "emeralds/emerald.jpg", link: "emeralds/"
  },
  sapphire: {
    name: "Sapphire", color: "#0f52ba", edge: "#0a3577",
    tagline: "Where the depth of sapphire meets timeless elegance.",
    character: "Royal blue corundum, the same mineral as ruby. A classic choice for engagement rings.",
    hardness: "9",
    why: "Deep colour, excellent durability, and a sense of heritage.",
    image: "sapphire/sapphire.jpg", link: "sapphire/"
  },
  paraiba: {
    name: "Paraiba", color: "#1fb5c2", edge: "#0f7a83",
    tagline: "Where the rare allure of Paraiba meets modern luxury.",
    character: "A neon blue-green tourmaline that seems to glow, coloured by copper. One of the rarest gem colours in the world.",
    hardness: "7 to 7.5",
    why: "Unforgettable and modern. Shines in earrings and pendants.",
    image: "paraiba/paraiba.jpg", link: "paraiba/"
  }
};

window.PIECES = {
  ring: { name: "Ring", link: "rings/" },
  studs: { name: "Studs", link: "studs/" },
  pendant: { name: "Pendant", link: "pendants/" },
  bracelet: { name: "Bracelet", link: "bracelets/" }
};

window.CUTS = {
  round: "Round", oval: "Oval", pear: "Pear", marquise: "Marquise", princess: "Princess", emerald: "Emerald cut"
};

window.METALS = {
  yellow: { name: "Yellow gold", color: "#d4af37", dark: "#a8862a" },
  white: { name: "White gold", color: "#d9d9d9", dark: "#9e9e9e" },
  rose: { name: "Rose gold", color: "#e3a68d", dark: "#b67a62" },
  platinum: { name: "Platinum", color: "#c9ccd1", dark: "#8d9096" }
};

// Real Bloom & Spencer pieces shown as "inspired by" suggestions.
window.COLLECTION = {
  ring: [
    ["The Regent Classic Solitaire Ring", "rings/the-regent-classic-solitaire-ring"],
    ["The Belgravia Pear Solitaire Ring", "rings/the-belgravia-pear-solitaire-ring"],
    ["The Belgravia Oval Diamond Ring", "rings/the-belgravia-oval-diamond-ring"],
    ["The Mayfair Marquise Solitaire Ring", "rings/the-mayfair-marquise-solitaire-ring"],
    ["The Knightsbridge Princess Solitaire Ring", "rings/the-knightsbridge-princess-solitaire-ring"],
    ["Belgravia Sapphire Haloring", "rings/belgravia-sapphire-haloring"]
  ],
  studs: [
    ["The Regent Round Solitaire Stud Earrings", "studs/the-regent-round-solitaire-stud-earrings"],
    ["The Kensington Oval Halo Diamond Stud Earrings", "studs/the-kensington-oval-halo-diamond-stud-earrings"],
    ["The Mayfair Marquise Stud Earrings", "studs/the-mayfair-marquise-stud-earrings"],
    ["The Knightsbridge Princess Stud Earrings", "studs/the-knightsbridge-princess-stud-earrings"],
    ["The Heartline Diamond Stud Earrings", "studs/the-heartline-diamond-stud-earrings"]
  ],
  pendant: [
    ["The Regent Solitaire Necklace", "pendants/the-regent-solitaire-necklace"],
    ["The Belgravia Pear Halo Necklace", "pendants/the-belgravia-pear-halo-necklace"],
    ["The Knightsbridge Oval Pendant", "pendants/the-knightsbridge-oval-pendant"],
    ["The Savile Emerald-Cut Necklace", "pendants/the-savile-emerald-cut-necklace"],
    ["The Belgravia Ruby Heart Necklace", "pendants/the-belgravia-ruby-heart-necklace"]
  ],
  bracelet: [
    ["The Kensington Tennis Bracelet", "bracelets/the-kensington-tennis-bracelet"],
    ["The Mayfair Solitaire Bracelet", "bracelets/the-mayfair-solitaire-bracelet"],
    ["The Chelsea Three-Stone Bracelet", "bracelets/the-chelsea-three-stone-bracelet"],
    ["The Kensington Rainbow Bracelet", "bracelets/the-kensington-rainbow-bracelet"],
    ["The Belgravia Trio Bracelet", "bracelets/the-belgravia-trio-bracelet"]
  ]
};

// Quiz: each answer adds points to stones.
window.QUIZ = [
  { q: "Which setting feels most like you?", a: [
    ["A candle-lit dinner", { ruby: 2, diamond: 1 }],
    ["A garden at golden hour", { emerald: 2 }],
    ["A quiet evening by the sea", { sapphire: 2, paraiba: 1 }],
    ["A rooftop party with music", { paraiba: 2, diamond: 1 }]
  ]},
  { q: "Pick a word for your style.", a: [
    ["Classic", { diamond: 2, sapphire: 1 }],
    ["Bold", { ruby: 2 }],
    ["Romantic", { emerald: 1, ruby: 1 }],
    ["Original", { paraiba: 2, emerald: 1 }]
  ]},
  { q: "How will you wear it most?", a: [
    ["Every single day", { diamond: 2, sapphire: 1, ruby: 1 }],
    ["Weekends and evenings", { emerald: 1, paraiba: 1 }],
    ["Special occasions", { ruby: 1, emerald: 1, paraiba: 1 }],
    ["It's a gift for someone else", { diamond: 1, sapphire: 1 }]
  ]},
  { q: "Which colour do you reach for?", a: [
    ["White and silver", { diamond: 3 }],
    ["Deep red", { ruby: 3 }],
    ["Green", { emerald: 3 }],
    ["Blue or turquoise", { sapphire: 2, paraiba: 2 }]
  ]}
];
