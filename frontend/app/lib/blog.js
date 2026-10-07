// ============================================================
//  Elizon Blog — Single Source of Truth
//  Add/edit posts here. All pages read from this file.
// ============================================================

export const BLOGS = [
  {
    slug: 'how-to-choose-the-right-detergent-for-your-home',
    title: 'How to Choose the Right Detergent for Your Home',
    excerpt:
      'Liquid or powder? Concentrated or regular? A practical guide to matching the right detergent to your washing machine, fabric type, and family needs.',
    category: 'Detergents',
    readTime: '5 min read',
    date: 'May 15, 2024',
    image: '/blog/4.jpg',
    author: 'Priya Sharma',
    authorRole: 'Product Specialist',
    authorBio:
      'Priya leads product education at Elizon and has helped over 500 families pick the right cleaning products for their homes.',
    featured: true,
    content: [
      {
        type: 'lead',
        text: 'Walk into any supermarket and you will face a wall of detergents — liquid, powder, pods, concentrated, eco, antibacterial. The labels promise the same thing. The prices do not. So how do you actually choose?',
      },
      { type: 'heading', text: 'Start With Your Machine' },
      {
        type: 'paragraph',
        text: 'The single biggest factor in choosing a detergent is your washing machine. Front-loaders use less water and need low-foam formulas; top-loaders handle high-foam better. If you use a semi-automatic or wash by hand, powder often gives you more control over dosage.',
      },
      {
        type: 'list',
        items: [
          'Front-load machine — pick a low-foam liquid or concentrated detergent',
          'Top-load machine — liquid or powder both work; pick based on fabric type',
          'Semi-automatic — powder gives the most control',
          'Hand wash — mild liquid detergent is easiest on hands',
        ],
      },
      { type: 'heading', text: 'Match to Your Fabric Mix' },
      {
        type: 'paragraph',
        text: 'Delicate fabrics like silk and wool need gentle, pH-neutral detergents. Everyday cottons and synthetics tolerate stronger formulas with enzymes and brighteners. If your household washes a mix of everything, a general-purpose liquid detergent with fabric conditioner built in is the safest default.',
      },
      {
        type: 'quote',
        text: 'The right detergent is not the strongest one — it is the one matched to your machine, your fabric, and your family.',
        cite: 'Priya Sharma, Product Specialist',
      },
      { type: 'heading', text: 'Liquid vs Powder: A Quick Decision' },
      {
        type: 'orderedList',
        items: [
          'Choose liquid if you wash in cold water, want pre-treatment convenience, or have a front-loader',
          'Choose powder if you want lower cost per wash, need heavy stain removal, or use a top-loader with hard water',
          'Choose concentrated if storage and shipping footprint matter and you want a smaller dose per wash',
          'Choose eco/pod if you care about packaging waste and consistent dosing',
        ],
      },
      { type: 'heading', text: 'Watch Out for Overdosing' },
      {
        type: 'paragraph',
        text: 'Most households use 30-50% more detergent than needed. Overdosing does not clean better — it leaves residue on clothes, builds up in the machine, and shortens fabric life. Read the label and trust it. If your clothes feel stiff after washing, you are probably overdosing, not under-dosing.',
      },
      { type: 'heading', text: 'The Bottom Line' },
      {
        type: 'paragraph',
        text: 'There is no universally "best" detergent. There is only the best one for your machine, your fabric mix, and your family. Once you find it, stick with it and use the right dose every time — that is what actually keeps clothes clean and machines healthy.',
      },
    ],
  },

  {
    slug: '5-habits-for-a-cleaner-healthier-bathroom',
    title: '5 Habits for a Cleaner, Healthier Bathroom',
    excerpt:
      'Small daily routines that keep bathrooms spotless, hygienic, and fresh — without harsh chemicals or heavy scrubbing.',
    category: 'Toilet Care',
    readTime: '6 min read',
    date: 'May 10, 2024',
    image: '/blog/2.webp',
    author: 'Amit Verma',
    authorRole: 'Home Care Expert',
    authorBio:
      'Amit writes about practical home-care routines and has tested over 200 cleaning products in real households.',
    content: [
      {
        type: 'lead',
        text: 'A clean bathroom is not the result of one heroic deep clean. It is the result of small habits repeated daily — habits that take less than two minutes but save you hours of scrubbing later.',
      },
      { type: 'heading', text: '1. Squeegee After Every Shower' },
      {
        type: 'paragraph',
        text: 'Thirty seconds with a squeegee after each shower prevents 80% of soap scum and water stains. It is the single highest-ROI habit in bathroom care.',
      },
      { type: 'heading', text: '2. Flush Cleaner Daily' },
      {
        type: 'paragraph',
        text: 'Drop a toilet-cleaner tablet in the cistern or bowl once a month. Every flush delivers a small dose of cleaning actives, so stains never get a chance to set.',
      },
      { type: 'heading', text: '3. Wipe the Sink Every Night' },
      {
        type: 'paragraph',
        text: 'A quick wipe of the basin, tap, and counter with a disinfectant spray takes 20 seconds. It keeps toothpaste residue and water spots from becoming permanent stains.',
      },
      { type: 'heading', text: '4. Ventilate for 10 Minutes' },
      {
        type: 'paragraph',
        text: 'Moisture is the enemy. Leaving the door or window open for 10 minutes after a shower prevents mould growth on grout and silicone — no scrubbing required.',
      },
      {
        type: 'quote',
        text: 'You do not need to deep-clean more often. You need to let dirt accumulate less.',
        cite: 'Amit Verma, Home Care Expert',
      },
      { type: 'heading', text: '5. Keep a Cleaning Kit in the Bathroom' },
      {
        type: 'paragraph',
        text: 'If the spray is in the kitchen and the cloth is in the laundry, you will skip the wipe. Keep a small caddy under the sink with a spray, a microfibre cloth, and a toilet cleaner. Proximity drives consistency.',
      },
      { type: 'heading', text: 'What This Means Long-Term' },
      {
        type: 'paragraph',
        text: 'Homes that practise these habits rarely need deep cleaning at all. The bathroom simply stays clean — quietly, consistently, without anyone dreading the chore.',
      },
    ],
  },

  {
    slug: 'liquid-vs-powder-detergent-which-is-better',
    title: 'Liquid vs Powder Detergent: Which Is Better?',
    excerpt:
      'A side-by-side breakdown of cleaning power, cost, fabric care, and environmental impact — so you can decide with confidence.',
    category: 'Detergents',
    readTime: '4 min read',
    date: 'May 5, 2024',
    image: '/blog/3.png',
    author: 'Rajesh Kumar',
    authorRole: 'R&D Lead',
    authorBio:
      'Rajesh leads formulation R&D at Elizon, developing detergents that balance cleaning power with skin safety and biodegradability.',
    content: [
      {
        type: 'lead',
        text: 'The liquid-versus-powder debate has raged for decades. The honest answer: it depends. Here is a clean, unbiased comparison across the four factors that actually matter.',
      },
      { type: 'heading', text: 'Cleaning Power' },
      {
        type: 'paragraph',
        text: 'For everyday dirt and light stains, both work equally well. For heavy stains — mud, grease, grass — powder detergents with bleach activators usually pull ahead, especially in hot water.',
      },
      { type: 'heading', text: 'Cost Per Wash' },
      {
        type: 'list',
        items: [
          'Powder: lowest cost per wash — around 40-50% cheaper than liquid',
          'Liquid: mid-range, but concentrated versions close the gap',
          'Pods: most expensive per wash, but zero measurement waste',
        ],
      },
      { type: 'heading', text: 'Fabric Care' },
      {
        type: 'paragraph',
        text: 'Liquid detergents dissolve faster and rinse cleaner, so they are gentler on delicate fabrics. Powders can leave residue if not fully dissolved, particularly in cold washes.',
      },
      { type: 'heading', text: 'Environmental Impact' },
      {
        type: 'paragraph',
        text: 'Powder usually comes in cardboard, which is more recyclable than the plastic bottles liquid detergents use. But powder often contains more filler. Concentrated liquids reduce packaging and shipping footprint. There is no clear winner — it comes down to your priorities.',
      },
      {
        type: 'quote',
        text: 'The best detergent is the one you will actually use correctly, at the right dose, every time.',
        cite: 'Rajesh Kumar, R&D Lead',
      },
      { type: 'heading', text: 'The Verdict' },
      {
        type: 'orderedList',
        items: [
          'Front-loader, cold washes, delicate fabrics — choose liquid',
          'Top-loader, hot washes, heavy stains — choose powder',
          'Mixed household, no strong preference — choose concentrated liquid',
          'Eco-conscious, packaging-driven — choose powder in cardboard',
        ],
      },
      {
        type: 'paragraph',
        text: 'Whichever you pick, buy in the smallest reasonable quantity so it does not go stale, and always measure the dose. That single habit matters more than the format.',
      },
    ],
  },

  {
    slug: 'eco-friendly-cleaning-products-explained',
    title: 'Eco-Friendly Cleaning Products, Explained',
    excerpt:
      'What "biodegradable" and "plant-based" really mean, and how to spot genuine eco-friendly cleaning products on the shelf.',
    category: 'Eco Living',
    readTime: '7 min read',
    date: 'April 28, 2024',
    image: '/blog/1.avif',
    author: 'Dr. Anil Mehta',
    authorRole: 'Sustainability Advisor',
    authorBio:
      'Dr. Mehta advises brands on sustainable product design and has published extensively on green chemistry.',
    content: [
      {
        type: 'lead',
        text: 'The word "eco-friendly" is on almost every cleaning product label today. It is also almost entirely unregulated. Here is how to tell the real ones from the greenwashing.',
      },
      { type: 'heading', text: 'What "Biodegradable" Actually Means' },
      {
        type: 'paragraph',
        text: 'A biodegradable ingredient breaks down into natural substances through microbial action. The key question is how fast, and under what conditions. Look for "readily biodegradable" — a technical term meaning it breaks down within 28 days in standard tests.',
      },
      { type: 'heading', text: 'Plant-Based Is Not Automatically Safe' },
      {
        type: 'paragraph',
        text: 'Some plant-derived surfactants are just as harsh as synthetic ones. The origin of an ingredient does not determine its environmental or health impact — the formulation does.',
      },
      {
        type: 'quote',
        text: 'Eco-friendly is a systems claim, not an ingredient claim. Look at the whole product, not one word on the front.',
        cite: 'Dr. Anil Mehta, Sustainability Advisor',
      },
      { type: 'heading', text: 'What to Actually Look For' },
      {
        type: 'list',
        items: [
          'Full ingredient disclosure — brands that hide behind "surfactants" are usually hiding more',
          'Third-party certifications — Ecocert, Green Seal, or equivalent',
          'Concentrated formulas — smaller packaging, less shipping, less waste',
          'Refillable or compostable packaging where possible',
          'Phosphate-free — phosphates damage water systems',
          'No synthetic dyes or fragrances — these provide no cleaning benefit',
        ],
      },
      { type: 'heading', text: 'Red Flags to Avoid' },
      {
        type: 'orderedList',
        items: [
          'Vague claims like "chemical-free" — everything is a chemical',
          'Certifications that do not exist or cannot be verified',
          'Green packaging with unlisted synthetic actives inside',
          'Claims of "antibacterial" without specifying which bacteria and at what kill rate',
        ],
      },
      { type: 'heading', text: 'The Practical Takeaway' },
      {
        type: 'paragraph',
        text: 'If you want genuinely eco-friendly cleaning products, read the ingredients, look for real certifications, and prefer concentrated formulas in recycled or refillable packaging. Ignore the front of the bottle. The back tells the truth.',
      },
    ],
  },

  {
    slug: 'how-to-keep-your-kitchen-grease-free',
    title: 'How to Keep Your Kitchen Grease-Free',
    excerpt:
      'Practical techniques and the right products to break down stubborn kitchen grease on stovetops, chimneys, and cookware.',
    category: 'Household Care',
    readTime: '5 min read',
    date: 'April 22, 2024',
    image: '/blog/5.jpg',
    author: 'Neha Arora',
    authorRole: 'Home Expert',
    authorBio:
      'Neha writes about practical home maintenance and has tested dozens of kitchen-cleaning products in everyday kitchens.',
    content: [
      {
        type: 'lead',
        text: 'Kitchen grease is stubborn for one simple reason: oil and water do not mix. You cannot clean oil with water-based products alone. You need a formulation that breaks the surface tension first.',
      },
      { type: 'heading', text: 'Why Grease Is So Hard to Remove' },
      {
        type: 'paragraph',
        text: 'When cooking oil hits a hot surface, it polymerises — it essentially turns into a varnish. The longer it sits, the harder it becomes. This is why a splatter that wipes away in seconds becomes a stain that refuses to budge after a week.',
      },
      {
        type: 'quote',
        text: 'The best time to clean grease is five minutes after it lands. The second best is right now.',
        cite: 'Neha Arora, Home Expert',
      },
      { type: 'heading', text: 'The Right Tool for Each Surface' },
      {
        type: 'list',
        items: [
          'Stovetop — alkaline degreaser spray, sit 2 minutes, wipe with microfibre',
          'Chimney filters — soak in hot water + dishwash liquid for 30 minutes weekly',
          'Countertops — everyday multi-surface cleaner; degreaser only for cooking zones',
          'Cookware — dishwash gel with warm water; avoid abrasive scrubbers on non-stick',
          'Tiles and backsplash — degreaser spray, wipe downward so residue does not drip',
        ],
      },
      { type: 'heading', text: 'The Weekly Routine That Prevents Buildup' },
      {
        type: 'orderedList',
        items: [
          'Daily — wipe the stovetop with a damp cloth while it is still warm',
          'Weekly — spray degreaser on the chimney filter and stovetop, let sit, wipe',
          'Monthly — deep-clean the chimney filter, backsplash, and behind the stove',
          'Quarterly — inspect the chimney motor and ducting for oil buildup',
        ],
      },
      { type: 'heading', text: 'What Not to Do' },
      {
        type: 'paragraph',
        text: 'Never use abrasive pads on non-stick or glass surfaces. Never mix bleach-based and acid-based cleaners — the fumes are toxic. And never let grease sit overnight if you can help it; those eight hours turn an easy wipe into a hard scrub.',
      },
      { type: 'heading', text: 'The Bottom Line' },
      {
        type: 'paragraph',
        text: 'A grease-free kitchen is not the result of aggressive cleaning. It is the result of cleaning the right surfaces at the right cadence with the right product. Two minutes a day beats three hours a month, every time.',
      },
    ],
  },

  {
    slug: 'why-handwashing-still-matters-in-2024',
    title: 'Why Handwashing Still Matters in 2024',
    excerpt:
      'The science behind regular handwashing, and how choosing the right handwash can make the habit easier for the whole family.',
    category: 'Personal Care',
    readTime: '4 min read',
    date: 'April 15, 2024',
    image: '/blog/6.jpg',
    author: 'Vikas Sharma',
    authorRole: 'Health & Hygiene Writer',
    authorBio:
      'Vikas writes about everyday health practices backed by peer-reviewed research and public-health guidance.',
    content: [
      {
        type: 'lead',
        text: 'Handwashing is the single most effective public-health intervention ever discovered. It is also the one we most often skip. Here is why it still matters — and how to make it stick.',
      },
      { type: 'heading', text: 'The Science in 60 Seconds' },
      {
        type: 'paragraph',
        text: 'Soap molecules have a water-loving head and a water-fearing tail. The tail grabs onto oils, dirt, and microbes; the head lets water wash it all away. Twenty seconds of proper handwashing removes more than 99% of transient microbes from your hands.',
      },
      { type: 'heading', text: 'When Handwashing Matters Most' },
      {
        type: 'list',
        items: [
          'Before preparing food, especially raw meat or eggs',
          'After using the toilet or changing a nappy',
          'After coughing, sneezing, or blowing your nose',
          'After touching shared surfaces like door handles or ATMs',
          'Before and after caring for someone who is sick',
        ],
      },
      {
        type: 'quote',
        text: 'Handwashing is not a habit of the anxious. It is a habit of the responsible.',
        cite: 'Vikas Sharma, Health & Hygiene Writer',
      },
      { type: 'heading', text: 'How to Actually Wash Your Hands' },
      {
        type: 'orderedList',
        items: [
          'Wet your hands with running water',
          'Apply enough soap to cover all surfaces',
          'Lather and scrub for at least 20 seconds — palms, backs, between fingers, under nails',
          'Rinse thoroughly under running water',
          'Dry with a clean towel or air-dry',
        ],
      },
      { type: 'heading', text: 'Choosing the Right Handwash' },
      {
        type: 'paragraph',
        text: 'The best handwash is the one your family will actually use. Look for one that is gentle on skin (mild pH, aloe vera or glycerine), has a pleasant fragrance, and comes in a pump dispenser so it is easy to use. Antibacterial formulas are helpful in healthcare settings; for everyday home use, a regular gentle handwash works just as well.',
      },
      { type: 'heading', text: 'Making the Habit Stick' },
      {
        type: 'paragraph',
        text: 'Put the handwash where you actually need it — kitchen sink, bathroom sink, near the washing machine. Proximity drives consistency. A bottle in a cupboard is a bottle that never gets used.',
      },
    ],
  },
];

// ============================================================
//  HELPERS — used by home, listing, and slug pages
// ============================================================

/** Get all blogs, sorted newest-first */
export function getAllBlogs() {
  return [...BLOGS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

/** Single blog by slug */
export function getBlogBySlug(slug) {
  return BLOGS.find((b) => b.slug === slug) || null;
}

/** Featured blog (only one should have `featured: true`) */
export function getFeaturedBlog() {
  return BLOGS.find((b) => b.featured) || getAllBlogs()[0] || null;
}

/** Non-featured blogs, sorted newest first */
export function getNonFeaturedBlogs() {
  return getAllBlogs().filter((b) => !b.featured);
}

/** Recent blogs for the home page — featured + N most recent */
export function getHomeBlogs(limit = 4) {
  const featured = getFeaturedBlog();
  const rest = getNonFeaturedBlogs();
  const total = featured ? [featured, ...rest] : rest;
  return total.slice(0, limit);
}

/** Related blogs — same category first, then others, excluding current */
export function getRelatedBlogs(slug, limit = 3) {
  const current = getBlogBySlug(slug);
  if (!current) return [];

  const sameCategory = BLOGS.filter(
    (b) => b.slug !== slug && b.category === current.category,
  );
  const others = BLOGS.filter(
    (b) => b.slug !== slug && b.category !== current.category,
  );

  return [...sameCategory, ...others].slice(0, limit);
}

/** All unique categories */
export function getAllCategories() {
  return [...new Set(BLOGS.map((b) => b.category))];
}

/** Blogs filtered by category */
export function getBlogsByCategory(category) {
  if (!category || category === 'All') return getAllBlogs();
  return getAllBlogs().filter((b) => b.category === category);
}

/** Total number of posts */
export function getBlogCount() {
  return BLOGS.length;
}