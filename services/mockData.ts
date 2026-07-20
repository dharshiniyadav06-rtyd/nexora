export interface WeddingStory {
  id: string;
  title: string;
  coupleName: string;
  weddingDate: string;
  venue: string;
  location: string;
  city: string;
  state: string;
  style: string;
  tags: string[];
  heroImage: string;
  coupleIntroduction: string;
  timeline: {
    time: string;
    title: string;
    description: string;
    image: string;
  }[];
  highlights: {
    title: string;
    description: string;
    image: string;
  }[];
  gallery: {
    id: string;
    url: string;
    category: string;
    lens: string;
    lighting: string;
    style: string;
  }[];
  behindTheScenes: {
    title: string;
    image: string;
  }[];
  vendors: {
    venue: string;
    decorator: string;
    makeup: string;
    planner: string;
  };
  packageUsed: {
    name: string;
    coverage: string;
    price: string;
  };
  testimonial: {
    quote: string;
    author: string;
  };
}

export interface PackageTier {
  id: string;
  name: string;
  description: string;
  price: string;
  coverage: string;
  photographers: string;
  features: string[];
  recommended: boolean;
  deliveryTime: string;
}

export const packagesData: PackageTier[] = [
  {
    id: "pkg-silver",
    name: "Silver",
    description: "Perfect for intimate celebrations and micro weddings.",
    price: "₹1,20,000",
    coverage: "6 Hours",
    photographers: "1 Traditional + 1 Candid Photographer",
    features: [
      "High-Resolution Edited Digital Images (200+)",
      "Premium Leatherette Album (30 Pages)",
      "Standard Color Grading",
      "Next-Day Highlight Previews (5 Images)",
      "Personalized Web Gallery (1 Year Active)",
      "Online Planning Consultation"
    ],
    recommended: false,
    deliveryTime: "45 Days"
  },
  {
    id: "pkg-gold",
    name: "Gold",
    description: "The standard coverage package for traditional wedding events.",
    price: "₹2,20,000",
    coverage: "12 Hours / Full Day",
    photographers: "2 Candid + 1 Traditional Photographer + 1 Videographer",
    features: [
      "High-Resolution Edited Digital Images (400+)",
      "Luxury Handcrafted Linen Album (40 Pages)",
      "Cinematic Highlights Video (3-5 mins)",
      "Live Streaming (1 YouTube Private Link)",
      "Drone Aerial Coverage (Venue Shoot)",
      "Next-Day Highlight Previews (15 Images)",
      "Personalized Web Gallery (3 Years Active)",
      "In-person Styling & Flow Planning Session"
    ],
    recommended: false,
    deliveryTime: "30 Days"
  },
  {
    id: "pkg-platinum",
    name: "Platinum",
    description: "Highly recommended. Comprehensive luxury coverage with rich cinematic video.",
    price: "₹3,50,000",
    coverage: "Multi-Day Coverage (Up to 18 Hours)",
    photographers: "2 Candid + 2 Traditional Photographers + 2 Cinematographers",
    features: [
      "Unlimited High-Resolution Edited Images (600+)",
      "Two Premium Handcrafted Glass Albums (40 Pages each)",
      "Luxury Parent Mini-Albums (2 Copies)",
      "Cinematic Wedding Film (10-15 mins)",
      "Full Video Documentaries (Traditional Cut)",
      "Drone Coverage (Photos + Cinematic Reels)",
      "Pre-Wedding Couple Shoot (3-4 Hours)",
      "Live Streaming (Multi-camera setup)",
      "Same-Day Edit Teaser Video (60 secs)",
      "Lifetime Personalized Web Gallery Access",
      "VIP Dedicated Support & Pre-Production Crew"
    ],
    recommended: true,
    deliveryTime: "20 Days"
  },
  {
    id: "pkg-signature",
    name: "Signature",
    description: "An exclusive, bespoke visual narrative curated personally by our chief photographer.",
    price: "₹5,00,000",
    coverage: "Full Wedding Week Coverage",
    photographers: "Chief Photographer + 3 Candid + 2 Traditional + 3 Cinematographers",
    features: [
      "Custom Editorial Fine-Art Album Collection",
      "Bespoke Glass Box Packaging & USB Kit",
      "Cinematic Feature Film (25-30 mins)",
      "4K Ultra HD Drone Aerial Cinematography",
      "Pre-Wedding & Post-Wedding Shoots (Any South Indian location)",
      "Live Multi-Channel High Definition Broadcast",
      "Same-Day Edit Reel played at the Reception",
      "Canvas Prints of Signature Portraits (3 Large Frames)",
      "Priority Handpicked Retouching & Album Layout Design",
      "Dedicated Client Coordinator & Unlimited Consultation Hours",
      "Complimentary Anniversary Photo Session"
    ],
    recommended: false,
    deliveryTime: "15 Days"
  }
];

// Tamil Nadu / South Indian premium wedding photography — verified public Unsplash URLs
export const weddingStoriesData: WeddingStory[] = [
  {
    id: "story-priya-arjun",
    title: "Priya & Arjun's Grand Madurai Temple Wedding",
    coupleName: "Priya & Arjun",
    weddingDate: "2026-01-14",
    venue: "Meenakshi Amman Temple Mandapam",
    location: "Madurai",
    city: "Madurai",
    state: "Tamil Nadu",
    style: "Traditional South Indian",
    tags: ["Tamil Brahmin Wedding", "Temple Wedding", "Kanchipuram Saree", "Traditional Rituals"],
    heroImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1600",
    coupleIntroduction: "Priya, a classical dancer, and Arjun, a civil engineer from Madurai, chose the sacred Meenakshi Amman temple grounds to celebrate their union. Adorned in a deep crimson Kanchipuram silk saree with antique gold zari, Priya personified the timeless grace of Tamil Nadu.",
    timeline: [
      {
        time: "05:00 AM",
        title: "Mangala Snanam & Nalangu",
        description: "The sacred turmeric bath at dawn, followed by the playful Nalangu games between the bride and groom's families.",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800"
      },
      {
        time: "08:30 AM",
        title: "Kashi Yatra",
        description: "Arjun's theatrical departure to Kashi was intercepted by Priya's father, who offered his daughter's hand in marriage.",
        image: "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?auto=format&fit=crop&q=80&w=800"
      },
      {
        time: "10:00 AM",
        title: "Oonjal Ceremony",
        description: "The couple swayed on a decorated swing as relatives sang traditional Kolattam songs and showered them with flowers.",
        image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800"
      },
      {
        time: "11:30 AM",
        title: "Jeelakarra Bellam & Saptapadi",
        description: "Sacred cumin-jaggery ritual followed by seven holy rounds around the sacred fire, accompanied by Vedic chanting.",
        image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800"
      }
    ],
    highlights: [
      {
        title: "Golden Oonjal Portrait",
        description: "A breathtaking frame of Priya's crimson Kanchipuram silk catching the morning light during the swing ceremony.",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Sacred Fire Silhouette",
        description: "The couple's silhouette framed against the sacred Homam fire — one of our most emotive editorial captures.",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800"
      }
    ],
    gallery: [
      { id: "pa-1", url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800", category: "Wedding", lens: "Sony FE 85mm f/1.4 GM", lighting: "Soft Morning Mandir Light", style: "Traditional" },
      { id: "pa-2", url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800", category: "Bridal Portrait", lens: "Sigma 85mm f/1.4 Art", lighting: "Diffused Window Light", style: "Editorial" },
      { id: "pa-3", url: "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?auto=format&fit=crop&q=80&w=800", category: "Wedding", lens: "Sony FE 50mm f/1.2 GM", lighting: "Natural Courtyard Light", style: "Candid" },
      { id: "pa-4", url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800", category: "Mehendi", lens: "Sony FE 90mm Macro", lighting: "Soft Daylight", style: "Documentary" },
      { id: "pa-5", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800", category: "Wedding", lens: "Sony FE 35mm f/1.4 GM", lighting: "Sunset Golden Hour", style: "Luxury" },
      { id: "pa-6", url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800", category: "Reception", lens: "Sony FE 24-70mm f/2.8", lighting: "Warm LED Ambient", style: "Luxury" }
    ],
    behindTheScenes: [
      { title: "Setting Up in the Temple Corridors", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800" },
      { title: "Drone Pre-flight Checks at Sunrise", image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800" }
    ],
    vendors: {
      venue: "Meenakshi Amman Temple Mandapam, Madurai",
      decorator: "Petal & Bloom Tamil Nadu Decor",
      makeup: "Radiant Bride by Kavitha",
      planner: "Heritage Weddings Madurai"
    },
    packageUsed: { name: "Platinum Package", coverage: "Multi-Day (18 Hours)", price: "₹3,50,000" },
    testimonial: {
      quote: "LensCraft captured not just our wedding but the very spirit of our Tamil traditions. The Oonjal frame is printed on a canvas in our living room — we receive compliments every day.",
      author: "Priya & Arjun, Madurai"
    }
  },
  {
    id: "story-divya-karthik",
    title: "Divya & Karthik's Elegant Kanchipuram Wedding",
    coupleName: "Divya & Karthik",
    weddingDate: "2026-02-20",
    venue: "Varadharaja Perumal Temple Hall",
    location: "Kanchipuram",
    city: "Kanchipuram",
    state: "Tamil Nadu",
    style: "Luxury Traditional",
    tags: ["Kanchipuram Saree", "Agamic Rituals", "Temple Town", "South Indian Brahmin"],
    heroImage: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1600",
    coupleIntroduction: "Divya, a chartered accountant, and Karthik, a software architect, chose the silk city of Kanchipuram — the birthplace of India's finest wedding sarees — to host their union. Divya wore a rare heritage Kanchipuram silk passed down three generations, setting the mood for a deeply soulful celebration.",
    timeline: [
      {
        time: "06:00 AM",
        title: "Muhurtham Preparations",
        description: "Divya was dressed by her mother and aunts in the antique Kanchipuram silk, with traditional Pattusaree draping techniques.",
        image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800"
      },
      {
        time: "09:00 AM",
        title: "Mapillai Azhaippu",
        description: "The grand welcome of the groom's procession with traditional Nadaswaram music echoing through the temple gopuram.",
        image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800"
      },
      {
        time: "11:00 AM",
        title: "Mangalsutra Thaali & Saptapadi",
        description: "Karthik tied the sacred Thaali as family elders showered the couple with akshadhai and flowers.",
        image: "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?auto=format&fit=crop&q=80&w=800"
      }
    ],
    highlights: [
      {
        title: "Heritage Silk in Golden Light",
        description: "Divya's three-generation Kanchipuram saree photographed in the temple's ancient pillar corridor at peak morning light.",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800"
      }
    ],
    gallery: [
      { id: "dk-1", url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800", category: "Wedding", lens: "Sony FE 50mm f/1.2 GM", lighting: "Temple Corridor Natural Light", style: "Traditional" },
      { id: "dk-2", url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800", category: "Bridal Portrait", lens: "Sigma Art 85mm f/1.4", lighting: "Soft Window Diffusion", style: "Editorial" },
      { id: "dk-3", url: "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?auto=format&fit=crop&q=80&w=800", category: "Wedding", lens: "Sony FE 35mm f/1.4 GM", lighting: "Warm Mandir Lamp Light", style: "Candid" },
      { id: "dk-4", url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800", category: "Reception", lens: "Sony FE 24-70mm f/2.8 GM", lighting: "LED Warm Ambient", style: "Luxury" }
    ],
    behindTheScenes: [
      { title: "Rigging Lights inside the Mandapam", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800" }
    ],
    vendors: {
      venue: "Varadharaja Perumal Temple Hall, Kanchipuram",
      decorator: "Ponnambalam Flower Decorations",
      makeup: "Bridal Glow Studio Kanchipuram",
      planner: "Silk City Events"
    },
    packageUsed: { name: "Gold Package", coverage: "12 Hours", price: "₹2,20,000" },
    testimonial: {
      quote: "Every frame they clicked feels like a painting. The corridor shot with the ancient pillars is beyond anything we imagined.",
      author: "Divya & Karthik, Kanchipuram"
    }
  },
  {
    id: "story-ananya-vikram",
    title: "Ananya & Vikram's Sunset Pondicherry Wedding",
    coupleName: "Ananya & Vikram",
    weddingDate: "2026-03-08",
    venue: "Alliance Française Heritage Garden",
    location: "Pondicherry",
    city: "Pondicherry",
    state: "Puducherry",
    style: "Luxury Editorial",
    tags: ["Coastal Wedding", "French Quarter", "Destination", "Candid Romance"],
    heroImage: "https://images.unsplash.com/photo-1544078751-58fed2b32c7a?auto=format&fit=crop&q=80&w=1600",
    coupleIntroduction: "Ananya, a fashion designer, and Vikram, an architect, chose Pondicherry's charming French Quarter for an intimate garden wedding. The colonial-era courtyard decorated with cascading white mogra garlands, vintage brass lanterns, and terracotta pots created an atmosphere of effortless luxury.",
    timeline: [
      {
        time: "04:00 PM",
        title: "Garden Welcome & Mehendi",
        description: "Guests gathered at the bougainvillea-lined entrance as the bride received her final mehendi touches under a canopy of jasmine.",
        image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800"
      },
      {
        time: "06:15 PM",
        title: "Heritage Archway Vows",
        description: "As the sun dipped below the Bay of Bengal, the couple exchanged garlands beneath a 200-year-old French colonial archway.",
        image: "https://images.unsplash.com/photo-1544078751-58fed2b32c7a?auto=format&fit=crop&q=80&w=800"
      },
      {
        time: "08:30 PM",
        title: "Candlelit Reception",
        description: "250 guests dined under vintage string lights while the couple's first dance echoed through the heritage garden.",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800"
      }
    ],
    highlights: [
      {
        title: "The Twilight First Look",
        description: "Vikram's expression as Ananya walked down the bougainvillea-lined aisle — raw, unposed, and absolutely priceless.",
        image: "https://images.unsplash.com/photo-1544078751-58fed2b32c7a?auto=format&fit=crop&q=80&w=800"
      }
    ],
    gallery: [
      { id: "av-1", url: "https://images.unsplash.com/photo-1544078751-58fed2b32c7a?auto=format&fit=crop&q=80&w=800", category: "Wedding", lens: "Sony FE 50mm f/1.2 GM", lighting: "Coastal Sunset Warmth", style: "Candid" },
      { id: "av-2", url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800", category: "Mehendi", lens: "Sony FE 90mm Macro", lighting: "Warm Garden Diffusion", style: "Documentary" },
      { id: "av-3", url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800", category: "Reception", lens: "Sony FE 35mm f/1.4 GM", lighting: "String Lights Bokeh", style: "Luxury" },
      { id: "av-4", url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800", category: "Couple Portrait", lens: "Sigma 85mm f/1.4 Art", lighting: "Golden Hour Backlight", style: "Editorial" }
    ],
    behindTheScenes: [
      { title: "Framing the Colonial Archway Shot", image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800" }
    ],
    vendors: {
      venue: "Alliance Française Heritage Garden, Pondicherry",
      decorator: "Bloom & Stone Pondicherry",
      makeup: "Soleil Bridal Studio",
      planner: "Heritage Weddings Pondy"
    },
    packageUsed: { name: "Platinum Package", coverage: "Multi-Day", price: "₹3,50,000" },
    testimonial: {
      quote: "They captured the raw magic of Pondicherry's light in ways that no description can do justice. Every time we look at those photos, we're right back in that garden.",
      author: "Ananya & Vikram, Pondicherry"
    }
  }
];

export const galleryImages = [
  { id: "g1", url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800", category: "Wedding", style: "Traditional", location: "Chennai", lens: "Sony FE 85mm f/1.4", lighting: "Morning Temple Light" },
  { id: "g2", url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800", category: "Bridal Portrait", style: "Editorial", location: "Coimbatore", lens: "Sigma 85mm f/1.4 Art", lighting: "Soft Studio Window" },
  { id: "g3", url: "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?auto=format&fit=crop&q=80&w=800", category: "Wedding", style: "Traditional", location: "Trichy", lens: "Sony FE 50mm f/1.2 GM", lighting: "Natural Courtyard" },
  { id: "g4", url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800", category: "Mehendi", style: "Documentary", location: "Madurai", lens: "Sony FE 90mm Macro", lighting: "Bright Daylight" },
  { id: "g5", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800", category: "Wedding", style: "Luxury", location: "Kanchipuram", lens: "Sony FE 35mm f/1.4 GM", lighting: "Sunset Backlight" },
  { id: "g6", url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800", category: "Reception", style: "Luxury", location: "Chennai", lens: "Sony FE 24-70mm f/2.8 GM", lighting: "Warm LED Ambient" },
  { id: "g7", url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800", category: "Engagement", style: "Candid", location: "Bengaluru", lens: "Sony FE 50mm f/1.2 GM", lighting: "Golden Hour" },
  { id: "g8", url: "https://images.unsplash.com/photo-1544078751-58fed2b32c7a?auto=format&fit=crop&q=80&w=800", category: "Couple Portrait", style: "Candid", location: "Pondicherry", lens: "Sigma 85mm f/1.4 Art", lighting: "Coastal Sunset" },
  { id: "g9", url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800", category: "Mehendi", style: "Documentary", location: "Coimbatore", lens: "Sony FE 90mm Macro", lighting: "Garden Diffusion" },
  { id: "g10", url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800", category: "Reception", style: "Luxury", location: "Hyderabad", lens: "Sony FE 35mm f/1.4 GM", lighting: "Event LED Bokeh" },
  { id: "g11", url: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800", category: "Wedding", style: "Editorial", location: "Mysuru", lens: "Sony FE 85mm f/1.4 GM", lighting: "Palace Interior Warm" },
  { id: "g12", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800", category: "Groom Portrait", style: "Editorial", location: "Chennai", lens: "Sony FE 85mm f/1.4 GM", lighting: "Dramatic Side Light" }
];

export const faqData = [
  {
    question: "How far in advance should we book LensCraft Studio?",
    answer: "We recommend booking 6 to 9 months in advance, especially for peak Tamil Nadu wedding seasons (November to February). This ensures we can lock your preferred date before the calendar fills up."
  },
  {
    question: "Do you shoot destination weddings outside Tamil Nadu?",
    answer: "Yes! We regularly cover destination weddings across South India — Pondicherry, Kochi, Mysuru, Coimbatore, Hyderabad and beyond. Travel and accommodation costs are calculated transparently in our Smart Budget Calculator."
  },
  {
    question: "What is your primary photography style?",
    answer: "We specialize in luxury editorial combined with pure candid storytelling. We deeply understand Tamil traditions — Kashi Yatra, Nalangu, Oonjal, Saptapadi — and frame them with cinematic precision."
  },
  {
    question: "When will we receive our wedding photos and films?",
    answer: "We deliver high-resolution highlight previews within 24-48 hours. The complete set of fully edited images and cinematic films is delivered in 15 to 45 days depending on the selected package tier."
  },
  {
    question: "Can we customize a package for a multi-day Tamil wedding?",
    answer: "Absolutely! Tamil weddings typically span 2-3 days. Our Platinum and Signature packages are specifically designed for multi-day coverage. You can use our Budget Calculator to build a custom quote."
  }
];
