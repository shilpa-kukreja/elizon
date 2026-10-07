export const WHATSAPP_NUMBER = "917428855574";

export const categories = [
  { id: "detergents", name: "DETERGENTS" },
  { id: "soaps", name: "SOAPS & HANDWASH" },
  { id: "toilet-cleaners", name: "TOILET CLEANERS" },
  { id: "household-care", name: "HOUSEHOLD CARE" },
  { id: "personal-care", name: "PERSONAL CARE" },
  { id: "eco-range", name: "ECO RANGE" },
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

/** Display labels when using the `details` object on a product */
export const SPEC_FIELD_LABELS = {
  modelName: "Product Code",
  variant: "Variant",
  volume: "Volume",
  weight: "Net Weight",
  packSize: "Pack Size",
  packaging: "Packaging Type",
  formulation: "Formulation",
  fragrance: "Fragrance",
  colour: "Colour",
  ph: "pH Level",
  activeIngredient: "Active Ingredients",
  foamLevel: "Foam Level",
  dilutionRatio: "Dilution Ratio",
  cleaningAction: "Cleaning Action",
  antibacterial: "Antibacterial",
  skinSafe: "Skin Friendly",
  dermatTested: "Dermatologically Tested",
  ecoFriendly: "Eco-Friendly",
  biodegradable: "Biodegradable",
  crueltyFree: "Cruelty Free",
  shelfLife: "Shelf Life",
  storage: "Storage Conditions",
  usage: "Recommended Usage",
  surfaces: "Suitable Surfaces",
  caution: "Caution",
  brand: "Brand",
  countryOfOrigin: "Country of Origin",
  certification: "Certifications",
  mrp: "MRP",
  unitsPerCarton: "Units per Carton",
};

function formatSpecKey(key) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

/**
 * Builds a list of { label, value } for the product detail page.
 * Supports two formats per product (use whichever is easier):
 *
 * 1) Object — only include fields this product has:
 *    details: { volume: "1 L", fragrance: "Lemon" }
 *
 * 2) Array — full control of labels and order:
 *    specifications: [{ label: "Volume", value: "1 L" }]
 */
export function getProductSpecifications(product) {
  if (!product) return [];

  if (Array.isArray(product.specifications)) {
    return product.specifications.filter(
      (row) =>
        row?.label?.trim() && row?.value != null && String(row.value).trim(),
    );
  }

  if (product.details && typeof product.details === "object") {
    return Object.entries(product.details)
      .filter(([, value]) => value != null && String(value).trim() !== "")
      .map(([key, value]) => ({
        label: SPEC_FIELD_LABELS[key] ?? formatSpecKey(key),
        value: String(value).trim(),
      }));
  }

  const fallback = [];
  if (product.model?.trim()) {
    fallback.push({
      label: SPEC_FIELD_LABELS.modelName,
      value: product.model.trim(),
    });
  }
  if (product.specs?.trim()) {
    fallback.push({ label: "Highlights", value: product.specs.trim() });
  }
  return fallback;
}

function enrich(product, categoryId) {
  const slug = product.slug ?? `${slugify(product.name)}-${product.id}`;
  const enriched = {
    ...product,
    slug,
    category: categoryId,
    price: product.price ?? "Price on request",
    shortDescription: product.shortDescription ?? product.specs ?? "",
    longDescription: product.longDescription ?? "",
  };
  return {
    ...enriched,
    specificationList: getProductSpecifications(enriched),
  };
}

// Keys MUST match `categories[].id` exactly
const rawProducts = {
  detergents: [
    {
      id: 1,
      name: "Elizon Fresh Clean Liquid Detergent",
      model: "ELZ-DET-LQ-1L",
      image: "/products/1.webp",
      shortDescription:
        "Concentrated liquid detergent for everyday machine and hand wash with long-lasting freshness.",
      longDescription:
        "Elizon Fresh Clean Liquid Detergent is a concentrated formula engineered for both machine and hand washing. Its advanced surfactant blend lifts tough stains even in cold water, while the built-in fabric conditioner keeps clothes soft, bright, and fresh-smelling. Safe for all fabric types including cotton, synthetics, and blends.",
      details: {
        modelName: "ELZ-DET-LQ-1L",
        variant: "Fresh Clean",
        volume: "1 Litre",
        packaging: "Recyclable HDPE Bottle with Measuring Cap",
        formulation: "Liquid Concentrate",
        fragrance: "Aqua Fresh",
        colour: "Sky Blue",
        ph: "7.5 – 8.5 (Neutral)",
        activeIngredient: "Anionic & Non-Ionic Surfactants, Enzymes",
        foamLevel: "Medium (Machine) / High (Hand Wash)",
        dilutionRatio: "1 cap (30ml) per 5L water",
        cleaningAction: "Stain Removal, Whitening, Odour Elimination",
        skinSafe: "Yes",
        ecoFriendly: "Yes",
        biodegradable: "Yes",
        shelfLife: "24 Months",
        storage: "Cool, dry place away from direct sunlight",
        usage: "Machine wash, hand wash, bucket wash",
        caution: "Keep out of reach of children. Avoid contact with eyes.",
        brand: "Elizon",
        countryOfOrigin: "India",
        certification: "BIS, ISO 9001:2015",
        unitsPerCarton: "12 bottles",
      },
    },
    {
      id: 2,
      name: "Elizon Fresh Clean Liquid Detergent 2L",
      model: "ELZ-DET-LQ-2L",
      image: "/products/2.webp",
      shortDescription:
        "Family-size pack of our best-selling liquid detergent for high-frequency washing.",
      longDescription:
        "The 2-litre family pack of Elizon Fresh Clean delivers the same concentrated formula in a value pack designed for households with high washing frequency. Ideal for large families, hostels, and small commercial laundries.",
      details: {
        modelName: "ELZ-DET-LQ-2L",
        variant: "Fresh Clean",
        volume: "2 Litres",
        packaging: "Recyclable HDPE Bottle with Measuring Cap",
        formulation: "Liquid Concentrate",
        fragrance: "Aqua Fresh",
        colour: "Sky Blue",
        ph: "7.5 – 8.5",
        activeIngredient: "Anionic & Non-Ionic Surfactants, Enzymes",
        dilutionRatio: "1 cap (30ml) per 5L water",
        cleaningAction: "Stain Removal, Whitening, Odour Elimination",
        skinSafe: "Yes",
        ecoFriendly: "Yes",
        biodegradable: "Yes",
        shelfLife: "24 Months",
        usage: "Machine wash, hand wash",
        brand: "Elizon",
        countryOfOrigin: "India",
        certification: "BIS, ISO 9001:2015",
        unitsPerCarton: "6 bottles",
      },
    },
    {
      id: 3,
      name: "Elizon Power Wash Detergent Powder",
      model: "ELZ-DET-PW-1KG",
      image: "/products/3.webp",
      shortDescription:
        "High-foam detergent powder for deep cleaning and stain removal.",
      longDescription:
        "Elizon Power Wash is a high-performance detergent powder formulated to tackle stubborn stains like oil, grease, and mud. Its quick-dissolve granules prevent residue build-up in washing machines, and the balanced pH keeps fabrics soft after every wash.",
      details: {
        modelName: "ELZ-DET-PW-1KG",
        variant: "Power Wash",
        weight: "1 kg",
        packaging: "Laminated Poly Pouch",
        formulation: "Powder",
        fragrance: "Lemon Fresh",
        colour: "White with Blue Speckles",
        ph: "9.0 – 10.5",
        activeIngredient: "LABSA, Sodium Carbonate, Optical Brighteners",
        foamLevel: "High",
        cleaningAction: "Deep Stain Removal, Whitening",
        skinSafe: "Use gloves for prolonged contact",
        ecoFriendly: "Phosphate-free",
        biodegradable: "Partially",
        shelfLife: "18 Months",
        storage: "Store in a dry place, keep pouch sealed after use",
        usage: "Machine wash, bucket wash",
        brand: "Elizon",
        countryOfOrigin: "India",
        certification: "BIS",
        unitsPerCarton: "20 pouches",
      },
    },
    {
      id: 4,
      name: "Elizon Fabric Conditioner",
      model: "ELZ-DET-FC-1L",
      image: "/products/4.webp",
      shortDescription:
        "Softening fabric conditioner with long-lasting perfume for clothes that feel new.",
      longDescription:
        "Elizon Fabric Conditioner softens fibres, reduces static, and leaves clothes with a subtle, long-lasting fragrance. Suitable for all fabric types, it reduces wrinkles and makes ironing easier while protecting colours from fading.",
      details: {
        modelName: "ELZ-DET-FC-1L",
        variant: "Soft & Fresh",
        volume: "1 Litre",
        packaging: "Recyclable HDPE Bottle",
        formulation: "Cationic Emulsion",
        fragrance: "Floral Musk",
        colour: "Light Pink",
        ph: "3.0 – 4.5",
        activeIngredient: "Ester Quat, Silicone Softener",
        dilutionRatio: "1 cap (30ml) per wash cycle",
        cleaningAction: "Softening, Anti-Static, Fragrance",
        skinSafe: "Yes",
        ecoFriendly: "Yes",
        biodegradable: "Yes",
        shelfLife: "24 Months",
        usage: "Add to final rinse cycle",
        brand: "Elizon",
        countryOfOrigin: "India",
        certification: "ISO 9001:2015",
        unitsPerCarton: "12 bottles",
      },
    },
    {
      id: 5,
      name: "Elizon Stain Remover Spray",
      model: "ELZ-DET-SR-500ML",
      image: "/products/5.webp",
      shortDescription:
        "Pre-wash stain remover spray for tough stains on fabric and upholstery.",
      longDescription:
        "Target stubborn stains before they set. Elizon Stain Remover Spray is a quick-action formula that penetrates deep into fabric fibres to break down oil, ink, tea, coffee, and grass stains. Safe for most washable fabrics.",
      details: {
        modelName: "ELZ-DET-SR-500ML",
        variant: "Pre-Wash",
        volume: "500 ml",
        packaging: "Trigger Spray Bottle",
        formulation: "Liquid Spray",
        fragrance: "Fresh Citrus",
        colour: "Clear",
        ph: "6.5 – 7.5",
        activeIngredient: "Oxygen-based Bleach, Enzymes",
        cleaningAction: "Stain Break-down",
        skinSafe: "Yes",
        ecoFriendly: "Yes",
        shelfLife: "18 Months",
        usage: "Spray on stain, wait 5 minutes, wash normally",
        caution: "Test on hidden area first. Do not use on silk or wool.",
        brand: "Elizon",
        countryOfOrigin: "India",
        unitsPerCarton: "24 bottles",
      },
    },
    // {
    //   id: 6,
    //   name: "Elizon Dishwash Liquid Gel",
    //   model: "ELZ-DET-DW-750ML",
    //   image: "allproduct/detergents/dishwash.jpeg",
    //   shortDescription:
    //     "Concentrated dishwash gel that cuts grease fast and leaves no residue.",
    //   longDescription:
    //     "Elizon Dishwash Liquid Gel is a thick, concentrated formula that dissolves grease on contact. A little goes a long way — one bottle lasts three times longer than ordinary dishwash liquids. Gentle on hands, tough on oil.",
    //   details: {
    //     modelName: "ELZ-DET-DW-750ML",
    //     variant: "Lemon Power",
    //     volume: "750 ml",
    //     packaging: "Recyclable Bottle with Flip-top Cap",
    //     formulation: "Thick Gel",
    //     fragrance: "Lemon",
    //     colour: "Bright Yellow",
    //     ph: "6.0 – 7.0",
    //     activeIngredient: "Anionic Surfactant, Lemon Extract",
    //     foamLevel: "High",
    //     cleaningAction: "Grease Cutting, Odour Removal",
    //     skinSafe: "Yes",
    //     ecoFriendly: "Yes",
    //     biodegradable: "Yes",
    //     shelfLife: "24 Months",
    //     usage: "Dilute 1 tsp in 1L water or apply directly on sponge",
    //     brand: "Elizon",
    //     countryOfOrigin: "India",
    //     certification: "ISO 9001:2015",
    //     unitsPerCarton: "20 bottles",
    //   },
    // },
  ],

  soaps: [
    {
      id: 7,
      name: "Elizon Moisturising Bath Soap",
      model: "ELZ-SOAP-BS-125G",
      image: "allproduct/soaps/bath-125g.jpeg",
      shortDescription:
        "Creamy bath soap with shea butter and glycerine for soft, nourished skin.",
      longDescription:
        "Elizon Moisturising Bath Soap combines shea butter and vegetable glycerine to cleanse without stripping natural oils. Its rich, creamy lather leaves skin feeling soft, smooth, and beautifully fragrant throughout the day.",
      details: {
        modelName: "ELZ-SOAP-BS-125G",
        variant: "Shea Butter",
        weight: "125 g",
        packaging: "Paper Wrapper",
        formulation: "Bar Soap",
        fragrance: "Shea & Vanilla",
        colour: "Cream",
        ph: "7.0 – 8.0",
        activeIngredient: "Shea Butter, Glycerine, Vitamin E",
        foamLevel: "Rich & Creamy",
        cleaningAction: "Gentle Cleansing, Moisturising",
        skinSafe: "Yes",
        dermatTested: "Yes",
        ecoFriendly: "Yes",
        crueltyFree: "Yes",
        shelfLife: "36 Months",
        usage: "Daily bath",
        brand: "Elizon",
        countryOfOrigin: "India",
        certification: "ISO 9001:2015",
        unitsPerCarton: "48 bars",
      },
    },
    {
      id: 8,
      name: "Elizon Antibacterial Soap",
      model: "ELZ-SOAP-AB-125G",
      image: "allproduct/soaps/antibacterial.jpeg",
      shortDescription:
        "Antibacterial soap with neem and tulsi for germ protection all day.",
      longDescription:
        "Formulated with neem, tulsi, and antibacterial actives, this soap provides 99.9% germ protection with every wash. Ideal for families, healthcare workers, and anyone who needs reliable protection from bacteria and odours.",
      details: {
        modelName: "ELZ-SOAP-AB-125G",
        variant: "Neem & Tulsi",
        weight: "125 g",
        packaging: "Paper Wrapper",
        formulation: "Bar Soap",
        fragrance: "Neem & Herbal",
        colour: "Natural Green",
        ph: "7.5 – 8.5",
        activeIngredient: "Neem Extract, Tulsi, Triclocarban",
        antibacterial: "Yes — 99.9% Germ Protection",
        skinSafe: "Yes",
        dermatTested: "Yes",
        ecoFriendly: "Yes",
        shelfLife: "36 Months",
        usage: "Daily bath",
        brand: "Elizon",
        countryOfOrigin: "India",
        certification: "ISO 9001:2015",
        unitsPerCarton: "48 bars",
      },
    },
    {
      id: 9,
      name: "Elizon Liquid Handwash",
      model: "ELZ-SOAP-HW-500ML",
      image: "allproduct/soaps/handwash-500ml.jpeg",
      shortDescription:
        "Gentle liquid handwash with aloe vera and lemon for clean, fresh hands.",
      longDescription:
        "Elizon Liquid Handwash gently cleanses while keeping hands soft and hydrated. Its balanced formula removes dirt, oil, and germs without drying out the skin — perfect for frequent handwashing at home, office, or clinic.",
      details: {
        modelName: "ELZ-SOAP-HW-500ML",
        variant: "Aloe & Lemon",
        volume: "500 ml",
        packaging: "Pump Dispenser Bottle",
        formulation: "Liquid Gel",
        fragrance: "Aloe & Lemon",
        colour: "Pale Green",
        ph: "5.5 – 6.5",
        activeIngredient: "Aloe Vera Extract, Lemon Oil, Glycerine",
        foamLevel: "Medium",
        antibacterial: "Yes",
        skinSafe: "Yes",
        dermatTested: "Yes",
        ecoFriendly: "Yes",
        biodegradable: "Yes",
        shelfLife: "24 Months",
        usage: "Apply on wet hands, lather, rinse",
        brand: "Elizon",
        countryOfOrigin: "India",
        certification: "ISO 9001:2015",
        unitsPerCarton: "24 bottles",
      },
    },
    {
      id: 10,
      name: "Elizon Glycerine Beauty Soap",
      model: "ELZ-SOAP-GB-100G",
      image: "allproduct/soaps/glycerine.jpeg",
      shortDescription:
        "Transparent glycerine soap for glowing, healthy-looking skin.",
      longDescription:
        "Made with pure vegetable glycerine, this translucent beauty soap hydrates as it cleanses. Its gentle formula is ideal for sensitive skin and helps maintain the skin's natural moisture balance after every wash.",
      details: {
        modelName: "ELZ-SOAP-GB-100G",
        variant: "Glycerine",
        weight: "100 g",
        packaging: "Transparent Wrap",
        formulation: "Transparent Bar",
        fragrance: "Rose",
        colour: "Clear",
        ph: "6.5 – 7.5",
        activeIngredient: "Vegetable Glycerine, Rose Extract",
        foamLevel: "Light",
        cleaningAction: "Gentle Cleansing, Hydration",
        skinSafe: "Yes",
        dermatTested: "Yes",
        crueltyFree: "Yes",
        shelfLife: "36 Months",
        usage: "Daily bath",
        brand: "Elizon",
        countryOfOrigin: "India",
        unitsPerCarton: "48 bars",
      },
    },
    {
      id: 11,
      name: "Elizon Foaming Handwash Refill",
      model: "ELZ-SOAP-HW-RF-1L",
      image: "allproduct/soaps/handwash-refill.jpeg",
      shortDescription:
        "1L refill pouch — economy pack for the Elizon Liquid Handwash dispenser.",
      longDescription:
        "Our 1-litre refill pouch is designed for households and offices that use handwash daily. Made from 70% less plastic than a full bottle, it saves money and reduces waste while delivering the same gentle, effective formula.",
      details: {
        modelName: "ELZ-SOAP-HW-RF-1L",
        variant: "Aloe & Lemon",
        volume: "1 Litre",
        packaging: "Recyclable Refill Pouch",
        formulation: "Liquid Gel",
        fragrance: "Aloe & Lemon",
        colour: "Pale Green",
        ph: "5.5 – 6.5",
        activeIngredient: "Aloe Vera Extract, Lemon Oil",
        ecoFriendly: "Yes",
        biodegradable: "Yes",
        shelfLife: "24 Months",
        usage: "Pour into Elizon dispenser bottle",
        brand: "Elizon",
        countryOfOrigin: "India",
        unitsPerCarton: "10 pouches",
      },
    },
  ],

  "toilet-cleaners": [
    {
      id: 12,
      name: "Elizon Toilet Cleaner Liquid",
      model: "ELZ-TC-LQ-500ML",
      image: "allproduct/toilet/cleaner-500ml.jpeg",
      shortDescription:
        "Thick toilet cleaner that removes stains, kills 99.9% germs, and leaves a fresh fragrance.",
      longDescription:
        "Elizon Toilet Cleaner Liquid clings to the bowl surface to dissolve tough stains, limescale, and odour-causing bacteria. Its thick formula reaches under the rim and down the trap for a hygienically clean toilet after every use.",
      details: {
        modelName: "ELZ-TC-LQ-500ML",
        variant: "Ocean Fresh",
        volume: "500 ml",
        packaging: "Angled-neck Bottle",
        formulation: "Thick Liquid",
        fragrance: "Ocean Fresh",
        colour: "Deep Blue",
        ph: "1.5 – 2.5 (Acidic)",
        activeIngredient: "Hydrochloric Acid (low conc.), Surfactants",
        cleaningAction: "Stain Removal, Germ Kill, Limescale Dissolve",
        antibacterial: "Yes — 99.9% Germ Kill",
        shelfLife: "24 Months",
        usage: "Apply under rim, leave 10 min, brush, flush",
        caution: "Do not mix with other cleaners. Use gloves.",
        brand: "Elizon",
        countryOfOrigin: "India",
        certification: "ISO 9001:2015",
        unitsPerCarton: "24 bottles",
      },
    },
    {
      id: 13,
      name: "Elizon Toilet Cleaner Gel",
      model: "ELZ-TC-GEL-500ML",
      image: "allproduct/toilet/cleaner-gel.jpeg",
      shortDescription:
        "Stick-to-surface gel formula for a deeper, longer-lasting clean.",
      longDescription:
        "The gel formula in Elizon Toilet Cleaner clings to vertical bowl surfaces, giving the actives more time to break down stains. It leaves no harsh smell and keeps the bathroom fresh for hours after use.",
      details: {
        modelName: "ELZ-TC-GEL-500ML",
        variant: "Lemon Fresh",
        volume: "500 ml",
        packaging: "Angled-neck Bottle",
        formulation: "Thick Gel",
        fragrance: "Lemon",
        colour: "Yellow",
        ph: "2.0 – 3.0",
        activeIngredient: "Citric Acid, Non-ionic Surfactants",
        cleaningAction: "Deep Stain Removal, Odour Control",
        antibacterial: "Yes",
        shelfLife: "24 Months",
        usage: "Squeeze under rim, leave 10 min, brush, flush",
        brand: "Elizon",
        countryOfOrigin: "India",
        unitsPerCarton: "24 bottles",
      },
    },
    {
      id: 14,
      name: "Elizon Toilet Bowl Cleaner Tablets",
      model: "ELZ-TC-TAB-50G",
      image: "allproduct/toilet/tablets.jpeg",
      shortDescription:
        "Drop-in tablet that keeps the toilet bowl clean and fresh for up to 30 days.",
      longDescription:
        "One tablet lasts up to 30 days. Elizon Toilet Bowl Cleaner Tablets release a continuous dose of cleaning actives with every flush — preventing stains, controlling odour, and keeping the bowl spotless with zero effort.",
      details: {
        modelName: "ELZ-TC-TAB-50G",
        variant: "Continuous Clean",
        weight: "50 g",
        packaging: "Individual Blister Pack",
        formulation: "Effervescent Tablet",
        fragrance: "Pine Fresh",
        colour: "Blue-White",
        activeIngredient: "Surfactants, Bleach, Fragrance",
        cleaningAction: "Continuous Stain Prevention, Odour Control",
        shelfLife: "36 Months",
        usage: "Drop in cistern or bowl, replace monthly",
        brand: "Elizon",
        countryOfOrigin: "India",
        unitsPerCarton: "100 tablets",
      },
    },
    {
      id: 15,
      name: "Elizon Bathroom Disinfectant Spray",
      model: "ELZ-TC-SPR-300ML",
      image: "allproduct/toilet/spray-300ml.jpeg",
      shortDescription:
        "Multi-surface disinfectant spray for basins, taps, tiles, and fittings.",
      longDescription:
        "Kills 99.9% of germs on bathroom surfaces in 30 seconds. Elizon Bathroom Disinfectant Spray is safe for chrome, ceramic, glass, and stainless steel — perfect for a quick daily wipe-down or deep clean.",
      details: {
        modelName: "ELZ-TC-SPR-300ML",
        volume: "300 ml",
        packaging: "Trigger Spray Bottle",
        formulation: "Alcohol-free Liquid",
        fragrance: "Citrus Blast",
        colour: "Clear",
        ph: "6.0 – 7.0",
        activeIngredient: "Benzalkonium Chloride, Citrus Extract",
        antibacterial: "Yes — 99.9% Germ Kill",
        surfaces: "Ceramic, Chrome, Glass, Stainless Steel",
        skinSafe: "Yes",
        shelfLife: "18 Months",
        usage: "Spray on surface, wipe with clean cloth",
        brand: "Elizon",
        countryOfOrigin: "India",
        unitsPerCarton: "24 bottles",
      },
    },
  ],

  "household-care": [
    {
      id: 16,
      name: "Elizon Floor Cleaner Liquid",
      model: "ELZ-HC-FL-1L",
      image: "allproduct/household/floor-cleaner.jpeg",
      shortDescription:
        "Disinfectant floor cleaner safe for all surfaces, with a lasting fresh scent.",
      longDescription:
        "Elizon Floor Cleaner cleans, disinfects, and deodorises in one step. Safe for marble, tiles, granite, and wood, its balanced formula removes dirt and germs without leaving streaks or harming the surface finish.",
      details: {
        modelName: "ELZ-HC-FL-1L",
        variant: "Pine Fresh",
        volume: "1 Litre",
        packaging: "Recyclable HDPE Bottle",
        formulation: "Concentrated Liquid",
        fragrance: "Pine",
        colour: "Green",
        ph: "7.0 – 8.0",
        activeIngredient: "Benzalkonium Chloride, Pine Oil",
        dilutionRatio: "1 cap per bucket of water",
        antibacterial: "Yes",
        surfaces: "Marble, Tiles, Granite, Wood",
        skinSafe: "Yes",
        ecoFriendly: "Yes",
        shelfLife: "24 Months",
        usage: "Dilute in water, mop, no rinsing needed",
        brand: "Elizon",
        countryOfOrigin: "India",
        certification: "ISO 9001:2015",
        unitsPerCarton: "12 bottles",
      },
    },
    {
      id: 17,
      name: "Elizon Glass & Surface Cleaner",
      model: "ELZ-HC-GL-500ML",
      image: "allproduct/household/glass-cleaner.jpeg",
      shortDescription:
        "Streak-free glass cleaner for windows, mirrors, and shiny surfaces.",
      longDescription:
        "Elizon Glass Cleaner leaves a brilliant, streak-free shine on windows, mirrors, tabletops, and chrome fittings. Its quick-evaporating formula means no wiping residue — just a crystal-clear finish every time.",
      details: {
        modelName: "ELZ-HC-GL-500ML",
        volume: "500 ml",
        packaging: "Trigger Spray Bottle",
        formulation: "Alcohol-based Liquid",
        fragrance: "Fresh",
        colour: "Clear Blue",
        ph: "7.0",
        activeIngredient: "Isopropyl Alcohol, Ammonia (low conc.)",
        surfaces: "Glass, Mirrors, Chrome, Acrylic",
        cleaningAction: "Streak-free Cleaning",
        shelfLife: "24 Months",
        usage: "Spray, wipe with dry microfibre cloth",
        brand: "Elizon",
        countryOfOrigin: "India",
        unitsPerCarton: "24 bottles",
      },
    },
    {
      id: 18,
      name: "Elizon Kitchen Degreaser Spray",
      model: "ELZ-HC-KT-500ML",
      image: "allproduct/household/kitchen-cleaner.jpeg",
      shortDescription:
        "Powerful kitchen degreaser for stovetops, chimneys, and cooking surfaces.",
      longDescription:
        "Cuts through the toughest kitchen grease in seconds. Elizon Kitchen Degreaser is formulated to dissolve oil, soot, and burnt-on residue from chimneys, stovetops, tiles, and cooking utensils — no scrubbing required.",
      details: {
        modelName: "ELZ-HC-KT-500ML",
        volume: "500 ml",
        packaging: "Trigger Spray Bottle",
        formulation: "Foaming Liquid",
        fragrance: "Lemon",
        colour: "Yellow",
        ph: "9.0 – 10.0",
        activeIngredient: "Alkaline Surfactants, Citrus Solvents",
        cleaningAction: "Heavy Grease Removal",
        surfaces: "Stainless Steel, Enamel, Ceramic",
        shelfLife: "18 Months",
        usage: "Spray, wait 2 min, wipe clean",
        caution: "Do not use on aluminium or painted surfaces.",
        brand: "Elizon",
        countryOfOrigin: "India",
        unitsPerCarton: "20 bottles",
      },
    },
    {
      id: 19,
      name: "Elizon Air Freshener",
      model: "ELZ-HC-AF-300ML",
      image: "allproduct/household/air-freshener.jpeg",
      shortDescription:
        "Long-lasting room freshener that neutralises odours instead of masking them.",
      longDescription:
        "Elizon Air Freshener uses odour-neutralising technology to eliminate smoke, cooking, and pet odours at the molecular level. A single spray keeps a room smelling fresh for hours.",
      details: {
        modelName: "ELZ-HC-AF-300ML",
        variant: "Lavender",
        volume: "300 ml",
        packaging: "Aerosol Can",
        formulation: "Water-based",
        fragrance: "Lavender",
        colour: "Purple",
        shelfLife: "36 Months",
        usage: "Spray in air, 3-4 short bursts per room",
        brand: "Elizon",
        countryOfOrigin: "India",
        unitsPerCarton: "24 cans",
      },
    },
    {
      id: 20,
      name: "Elizon Multi-Surface Disinfectant",
      model: "ELZ-HC-MS-1L",
      image: "allproduct/household/multi-surface.jpeg",
      shortDescription:
        "One bottle for every surface — kills 99.9% of germs and leaves a fresh scent.",
      longDescription:
        "From kitchen counters to children's toys, Elizon Multi-Surface Disinfectant cleans and disinfects any surface safely. Its no-rinse formula saves time and is safe around food preparation areas.",
      details: {
        modelName: "ELZ-HC-MS-1L",
        volume: "1 Litre",
        packaging: "Refillable Trigger Bottle",
        formulation: "Concentrated Liquid",
        fragrance: "Citrus Fresh",
        colour: "Pale Yellow",
        ph: "6.5 – 7.5",
        activeIngredient: "Benzalkonium Chloride, Citric Acid",
        antibacterial: "Yes — 99.9% Germ Kill",
        surfaces: "Kitchen Counters, Tiles, Plastic, Metal, Glass",
        dilutionRatio: "Ready to use",
        skinSafe: "Yes",
        ecoFriendly: "Yes",
        shelfLife: "24 Months",
        usage: "Spray and wipe",
        brand: "Elizon",
        countryOfOrigin: "India",
        certification: "ISO 9001:2015",
        unitsPerCarton: "12 bottles",
      },
    },
  ],

  "personal-care": [
    {
      id: 21,
      name: "Elizon Body Wash",
      model: "ELZ-PC-BW-250ML",
      image: "allproduct/personal/body-wash.jpeg",
      shortDescription:
        "Refreshing body wash with vitamin E and aloe vera for a spa-like shower.",
      longDescription:
        "Turn your daily shower into a treat. Elizon Body Wash uses skin-loving ingredients like aloe vera and vitamin E to cleanse, hydrate, and refresh. Its silky lather rinses clean without leaving any greasy residue.",
      details: {
        modelName: "ELZ-PC-BW-250ML",
        variant: "Aloe & Vitamin E",
        volume: "250 ml",
        packaging: "Recyclable Pump Bottle",
        formulation: "Liquid Gel",
        fragrance: "Fruity",
        colour: "Pale Peach",
        ph: "5.5 – 6.5",
        activeIngredient: "Aloe Vera, Vitamin E, Glycerine",
        foamLevel: "Rich",
        skinSafe: "Yes",
        dermatTested: "Yes",
        crueltyFree: "Yes",
        shelfLife: "24 Months",
        usage: "Apply on wet loofah or hands, lather, rinse",
        brand: "Elizon",
        countryOfOrigin: "India",
        unitsPerCarton: "24 bottles",
      },
    },
    {
      id: 22,
      name: "Elizon Shampoo",
      model: "ELZ-PC-SH-200ML",
      image: "allproduct/personal/shampoo.jpeg",
      shortDescription:
        "Nourishing shampoo for strong, shiny hair with a mild, balanced formula.",
      longDescription:
        "Elizon Shampoo gently cleanses the scalp while strengthening hair from root to tip. Enriched with argan oil and keratin, it reduces frizz, adds shine, and keeps hair manageable all day.",
      details: {
        modelName: "ELZ-PC-SH-200ML",
        variant: "Argan & Keratin",
        volume: "200 ml",
        packaging: "Recyclable Bottle with Flip Cap",
        formulation: "Liquid",
        fragrance: "Floral",
        colour: "Pearl White",
        ph: "5.0 – 6.0",
        activeIngredient: "Argan Oil, Hydrolysed Keratin",
        foamLevel: "Medium",
        skinSafe: "Yes",
        dermatTested: "Yes",
        shelfLife: "24 Months",
        usage: "Massage on wet hair, lather, rinse",
        brand: "Elizon",
        countryOfOrigin: "India",
        unitsPerCarton: "24 bottles",
      },
    },
    {
      id: 23,
      name: "Elizon Hand Sanitiser",
      model: "ELZ-PC-HS-500ML",
      image: "allproduct/personal/sanitiser.jpeg",
      shortDescription:
        "70% alcohol sanitiser that kills 99.9% germs without drying hands.",
      longDescription:
        "Elizon Hand Sanitiser is a 70% alcohol-based formula that quickly kills bacteria and viruses on hands. Enriched with glycerine and aloe vera, it sanitises without leaving hands dry or sticky — perfect for on-the-go protection.",
      details: {
        modelName: "ELZ-PC-HS-500ML",
        volume: "500 ml",
        packaging: "Pump Dispenser Bottle",
        formulation: "Alcohol Gel",
        fragrance: "Aloe Fresh",
        colour: "Clear Green",
        ph: "6.0 – 7.5",
        activeIngredient: "Ethyl Alcohol 70% v/v, Aloe Vera",
        antibacterial: "Yes — 99.9% Germ Kill",
        skinSafe: "Yes",
        shelfLife: "24 Months",
        usage: "Apply a coin-sized amount, rub until dry",
        caution: "Flammable. Keep away from fire.",
        brand: "Elizon",
        countryOfOrigin: "India",
        certification: "ISO 9001:2015",
        unitsPerCarton: "24 bottles",
      },
    },
  ],

  "eco-range": [
    {
      id: 24,
      name: "Elizon Eco Dishwash Bar",
      model: "ELZ-ECO-DB-200G",
      image: "allproduct/eco/dishwash-bar.jpeg",
      shortDescription:
        "Plant-based dishwash bar with zero plastic packaging and no palm oil.",
      longDescription:
        "Made from coconut-derived surfactants and packaged in 100% recycled paper, the Elizon Eco Dishwash Bar is tough on grease and gentle on the planet. Biodegradable, cruelty-free, and free from synthetic fragrances.",
      details: {
        modelName: "ELZ-ECO-DB-200G",
        variant: "Coconut",
        weight: "200 g",
        packaging: "Recycled Paper Wrap",
        formulation: "Solid Bar",
        fragrance: "Natural Coconut",
        colour: "Off-White",
        ph: "8.0 – 9.0",
        activeIngredient: "Coconut Oil Surfactants, Sodium Carbonate",
        cleaningAction: "Grease Cutting",
        ecoFriendly: "Yes",
        biodegradable: "Yes",
        crueltyFree: "Yes",
        packagingRecyclable: "Yes",
        shelfLife: "24 Months",
        usage: "Rub on wet sponge, apply, rinse",
        brand: "Elizon",
        countryOfOrigin: "India",
        certification: "Vegan, Cruelty-free",
        unitsPerCarton: "60 bars",
      },
    },
    {
      id: 25,
      name: "Elizon Eco Laundry Powder",
      model: "ELZ-ECO-LP-1KG",
      image: "allproduct/eco/laundry-powder.jpeg",
      shortDescription:
        "Phosphate-free, biodegradable laundry powder safe for sensitive skin.",
      longDescription:
        "Elizon Eco Laundry Powder is formulated with plant-derived enzymes to clean effectively without phosphates, chlorine, or synthetic dyes. Biodegradable formula, recycled packaging, and gentle on sensitive skin.",
      details: {
        modelName: "ELZ-ECO-LP-1KG",
        weight: "1 kg",
        packaging: "Compostable Kraft Pouch",
        formulation: "Powder",
        fragrance: "Natural Lavender",
        colour: "Off-White",
        ph: "9.0 – 10.0",
        activeIngredient: "Plant Enzymes, Sodium Bicarbonate",
        cleaningAction: "Stain Removal, Whitening",
        ecoFriendly: "Yes",
        biodegradable: "Yes",
        crueltyFree: "Yes",
        skinSafe: "Yes",
        shelfLife: "18 Months",
        usage: "30 g per wash load",
        brand: "Elizon",
        countryOfOrigin: "India",
        certification: "Vegan, Cruelty-free",
        unitsPerCarton: "20 pouches",
      },
    },
    {
      id: 26,
      name: "Elizon Eco Floor Cleaner",
      model: "ELZ-ECO-FL-1L",
      image: "allproduct/eco/floor-cleaner.jpeg",
      shortDescription:
        "Plant-based floor cleaner with citronella oil — safe for kids and pets.",
      longDescription:
        "A natural disinfectant made from citronella and tea-tree oils, safe around children and pets. Kills germs, repels insects, and leaves a fresh botanical fragrance. Biodegradable and free from harsh chemicals.",
      details: {
        modelName: "ELZ-ECO-FL-1L",
        volume: "1 Litre",
        packaging: "Recyclable HDPE Bottle",
        formulation: "Plant-based Liquid",
        fragrance: "Citronella & Tea Tree",
        colour: "Pale Green",
        ph: "7.0 – 8.0",
        activeIngredient: "Citronella Oil, Tea Tree Oil, Soap Base",
        antibacterial: "Yes",
        surfaces: "Marble, Tiles, Granite, Wood",
        ecoFriendly: "Yes",
        biodegradable: "Yes",
        crueltyFree: "Yes",
        shelfLife: "24 Months",
        usage: "Dilute in water, mop",
        brand: "Elizon",
        countryOfOrigin: "India",
        certification: "Vegan, Cruelty-free",
        unitsPerCarton: "12 bottles",
      },
    },
  ],
};

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

export const useCases = {
  detergents: [
    {
      id: 1,
      name: "Home Laundry",
      description:
        "Everyday washing for families — deep cleaning, fabric care, and lasting freshness.",
      image: "/usecases/home-laundry.jpg",
    },
    {
      id: 2,
      name: "Commercial Laundries",
      description:
        "Bulk formulations and value packs for laundries, hotels, and hostels.",
      image: "/usecases/commercial-laundry.jpg",
    },
  ],
  soaps: [
    {
      id: 1,
      name: "Family Bath Care",
      description:
        "Gentle, moisturising soaps and handwashes for daily use by the whole family.",
      image: "/usecases/family-bath.jpg",
    },
    {
      id: 2,
      name: "Healthcare & Hospitality",
      description:
        "Antibacterial handwash and soap for clinics, hotels, and food-service operations.",
      image: "/usecases/healthcare-soap.jpg",
    },
  ],
  "toilet-cleaners": [
    {
      id: 1,
      name: "Residential Bathrooms",
      description:
        "Powerful stain removal and long-lasting freshness for home bathrooms.",
      image: "/usecases/home-bathroom.jpg",
    },
    {
      id: 2,
      name: "Commercial Washrooms",
      description:
        "High-volume toilet care for offices, malls, hospitals, and public facilities.",
      image: "/usecases/commercial-washroom.jpg",
    },
  ],
  "household-care": [
    {
      id: 1,
      name: "Daily Home Cleaning",
      description:
        "Floors, glass, kitchens, and multi-surfaces — one product line for the whole home.",
      image: "/usecases/home-cleaning.jpg",
    },
    {
      id: 2,
      name: "Facility Management",
      description:
        "Reliable cleaning solutions for offices, hotels, and institutional housekeeping.",
      image: "/usecases/facility-cleaning.jpg",
    },
  ],
  "personal-care": [
    {
      id: 1,
      name: "Daily Personal Hygiene",
      description:
        "Body wash, shampoo, and sanitiser for everyday personal care routines.",
      image: "/usecases/personal-hygiene.jpg",
    },
    {
      id: 2,
      name: "Travel & Hospitality",
      description:
        "Compact personal-care packs for hotels, airlines, and gifting.",
      image: "/usecases/travel-care.jpg",
    },
  ],
  "eco-range": [
    {
      id: 1,
      name: "Eco-Conscious Homes",
      description:
        "Plant-based, biodegradable products for homes that care about the planet.",
      image: "/usecases/eco-home.jpg",
    },
    {
      id: 2,
      name: "Green Businesses",
      description:
        "Sustainable cleaning solutions for hotels, cafes, and wellness brands.",
      image: "/usecases/green-business.jpg",
    },
  ],
};