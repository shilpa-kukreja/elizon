export const WHATSAPP_NUMBER = "917428855574";

export const categories = [
  { id: "detergents", name: "DETERGENTS" },
  { id: "soaps", name: "SOAPS & HANDWASH" },
  { id: "toilet-cleaners", name: "TOILET CLEANERS" },
  { id: "dishwash", name: "DISHWASH" },
];

export function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getProductImageSrc(image) {
  if (!image) return "/product/1.png";
  if (image.startsWith("http") || image.startsWith("/")) return image;
  return `/${image}`;
}

// ═══════════════════════════════════════════════════════════
//   PRODUCTS — one product per category
//   Product details are now written as one flowing paragraph.
// ═══════════════════════════════════════════════════════════
// In rawProducts — add `benefits: [...]` to each product

const rawProducts = {
  detergents: [
    {
      id: 1,
      name: "Elizon Detergents",
      image: "/products/detergent.jpg",
      shortDescription:
        "Powerful cleaning for everyday laundry — tough on stains, gentle on fabric.",
      longDescription:
        "Elizon Detergents are formulated for modern households that want one product to handle it all. Whether you are running a full machine load, washing delicate fabrics by hand, or tackling a stubborn stain that has been sitting for days, our concentrated blend lifts dirt, oil, and odour from the fabric without leaving residue behind. The formula works effectively in cold water, making it as kind on your electricity bill as it is on your clothes. With a balanced pH that protects fabric fibres and colour, and a fresh fragrance that lingers lightly after every wash, Elizon Detergents are built around a simple belief — cleaning should be effective, effortless, and something you can trust every single day.",
      benefits: [
        "Works effectively in cold water",
        "Safe for all fabric types — cotton, synthetics, and blends",
        "Concentrated formula — one bottle lasts longer",
        "Built-in freshness that lingers after every wash",
      ],
    },
  ],

  soaps: [
    {
      id: 2,
      name: "Elizon Soaps & Handwash",
      image: "/products/soap.jpg",
      shortDescription:
        "Gentle cleansing care for the whole family — from bath bars to handwash.",
      longDescription:
        "Elizon Soaps & Handwash are made for everyday use — gentle enough for children, effective enough for adults, and designed for the entire family. Our bath bars combine moisturising ingredients like shea butter, glycerine, and aloe vera with a rich, creamy lather that cleanses without stripping the skin of its natural oils. The liquid handwash carries the same care in a convenient pump bottle, making regular hand hygiene a pleasant part of daily life. Every variant is dermatologically tested, pH balanced, and free from harsh additives — because the products you use on your skin every day should be the ones you can trust the most.",
      benefits: [
        "Dermatologically tested and pH balanced",
        "Enriched with shea butter, glycerine, and aloe vera",
        "Gentle enough for children and sensitive skin",
        "Rich, creamy lather that rinses clean",
      ],
    },
  ],

  "toilet-cleaners": [
    {
      id: 3,
      name: "Elizon Toilet Cleaners",
      image: "/products/toilet-cleaner.jpg",
      shortDescription:
        "Deep cleaning action that removes stains, kills germs, and leaves lasting freshness.",
      longDescription:
        "Elizon Toilet Cleaners are engineered to do the hardest cleaning work in your home — thoroughly, quickly, and without the smell of harsh chemicals. Our thick formula clings to the bowl surface, reaching under the rim and down the trap where ordinary cleaners struggle to reach. It dissolves tough stains, limescale, and mineral buildup while killing 99.9% of germs on contact. The result is a hygienically clean toilet that smells fresh for hours. Suitable for both daily touch-ups and weekly deep cleaning, Elizon Toilet Cleaners make one of the least pleasant chores in the house genuinely simple — so your bathroom stays as clean as it looks.",
      benefits: [
        "Kills 99.9% of germs on contact",
        "Thick formula clings to bowl surfaces",
        "Dissolves tough stains, limescale, and mineral buildup",
        "Long-lasting freshness — no harsh chemical smell",
      ],
    },
  ],

  dishwash: [
    {
      id: 4,
      name: "Elizon Dishwash",
      image: "/products/dishwash.jpg",
      shortDescription:
        "Powerful grease-cutting action for spotless dishes, every single wash.",
      longDescription:
        "Elizon Dishwash is built for the everyday reality of home cooking — oil, spice, burnt pans, greasy plates, and a sink full of last night's dinner. Our concentrated formula cuts through grease on contact, lifting even the most stubborn food residue without endless scrubbing. A little goes a long way: one drop lathers into a rich foam that works through the entire sink, so a single bottle lasts you weeks. It rinses clean without leaving any film or fragrance behind on your utensils, and it is gentle on your hands even after long sessions at the sink. Because dishwashing should be the easiest part of cooking, not the hardest.",
      benefits: [
        "Cuts through grease on contact",
        "Concentrated — a little goes a long way",
        "Rinses clean without film or residue",
        "Gentle on hands, even after long use",
      ],
    },
  ],
};

function enrich(product, categoryId) {
  const slug = product.slug ?? `${slugify(product.name)}-${product.id}`;
  return {
    ...product,
    slug,
    category: categoryId,
    price: product.price ?? "Price on request",
    shortDescription: product.shortDescription ?? "",
    longDescription: product.longDescription ?? "",
    benefits: Array.isArray(product.benefits) ? product.benefits : [],
  };
}

export const productsByCategory = Object.fromEntries(
  categories.map(({ id }) => [
    id,
    (rawProducts[id] ?? []).map((item) => enrich(item, id)),
  ]),
);

export const defaultCategoryId = categories[0]?.id ?? "detergents";

export function isValidCategoryId(categoryId) {
  return categories.some((c) => c.id === categoryId);
}

export function getProductsForCategory(categoryId) {
  return productsByCategory[categoryId] ?? [];
}

export function getAllProducts() {
  return Object.values(productsByCategory).flat();
}

export function getProductBySlug(slug) {
  return getAllProducts().find((product) => product.slug === slug);
}

export function getCategoryName(categoryId) {
  return categories.find((c) => c.id === categoryId)?.name ?? "Products";
}

export function getRelatedProducts(slug, limit = 4) {
  const current = getProductBySlug(slug);
  if (!current) return [];

  return getProductsForCategory(current.category)
    .filter((item) => item.slug !== slug)
    .slice(0, limit);
}

export function getWhatsAppUrl(product) {
  const text = encodeURIComponent(
    `Hi, I am interested in ${product.name}. Please share more details.`,
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}