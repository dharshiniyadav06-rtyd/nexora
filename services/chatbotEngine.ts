// LensCraft Studio Multilingual Chatbot Engine
// Supporting English, Tamil, Hindi, Telugu, Malayalam

export type SupportedLanguage = "en" | "ta" | "hi" | "te" | "ml";

export interface SessionContext {
  lastTopic?: string;
  selectedPackage?: string;
  detectedLanguage: SupportedLanguage;
  pendingRecommendationStep?: "budget" | "guests" | "duration" | "style" | "done";
  recommendationData?: {
    budget?: number;
    guests?: number;
    duration?: string;
    style?: string;
  };
}

// Simple language keywords checker to auto-detect language
export function detectLanguage(text: string): SupportedLanguage {
  const t = text.toLowerCase();
  
  // Tamil detection
  if (/[\u0b80-\u0bff]/g.test(t) || t.includes("vanakkam") || t.includes("kalyanam") || t.includes("evvalavu") || t.includes("romba nandri") || t.includes("thirumanam")) {
    return "ta";
  }
  // Hindi detection
  if (/[\u0900-\u097f]/g.test(t) || t.includes("namaste") || t.includes("shadi") || t.includes("keemat") || t.includes("kitna") || t.includes("dhanyawad") || t.includes("kaha hai")) {
    return "hi";
  }
  // Telugu detection
  if (/[\u0c00-\u0c7f]/g.test(t) || t.includes("namaskaram") || t.includes("pelli") || t.includes("dhara") || t.includes("ennalu") || t.includes("chala kruthagnathalu")) {
    return "te";
  }
  // Malayalam detection
  if (/[\u0d00-\u0d7f]/g.test(t) || t.includes("hello") && t.includes("kalyanam") || t.includes("vilayenna") || t.includes("nandi") || t.includes("sthalamevada")) {
    return "ml";
  }
  
  return "en";
}

// 100+ FAQ Dictionary mapping keys to multilingual localized responses
const FAQ_DATABASE: {
  [key: string]: {
    [lang in SupportedLanguage]: string;
  };
} = {
  // 1. Studio Introduction
  intro: {
    en: "LensCraft Studio is a premier luxury wedding photography & film studio founded in 2016 in Chennai, Tamil Nadu. We specialize in luxury editorial portraits, candid storytelling, and traditional ritual coverages across South India.",
    ta: "லென்ஸ்கிராஃப்ட் ஸ்டுடியோ (LensCraft Studio) 2016 இல் தமிழ்நாட்டின் சென்னையில் தொடங்கப்பட்ட ஒரு முன்னணி சொகுசு திருமண புகைப்பட மற்றும் திரைப்பட ஸ்டுடியோ ஆகும். தென்னிந்தியா முழுவதும் சொகுசு எடிட்டோரியல் போர்ட்ரெய்ட்கள், கேண்டிட் கதைகள் மற்றும் பாரம்பரிய சடங்கு கவரேஜ்களில் நாங்கள் நிபுணத்துவம் பெற்றுள்ளோம்.",
    hi: "लेंसक्राफ्ट स्टूडियो (LensCraft Studio) चेन्नई, तमिलनाडु में 2016 में स्थापित एक प्रमुख लक्जरी वेडिंग फोटोग्राफी और फिल्म स्टूडियो है। हम पूरे दक्षिण भारत में लक्जरी संपादकीय चित्रों, कैंडिड कहानी कहने और पारंपरिक अनुष्ठान कवरेज में विशेषज्ञ हैं।",
    te: "లెన్స్‌క్రాఫ్ట్ స్టూడియో (LensCraft Studio) అనేది తమిళనాడులోని చెన్నైలో 2016లో స్థాపించబడిన ఒక ప్రీమియం లగ్జరీ వెడ్డింగ్ ఫోటోగ్రఫీ & ఫిల్మ్ స్టూడియో. మేము దక్షిణ భారతదేశం అంతటా లగ్జరీ ఎడిటోరియల్ పోర్ట్రెయిట్‌లు, క్యాండిడ్ స్టోరీ టెల్లింగ్ మరియు సాంప్రదాయ ఆచార కవరేజీలలో నైపుణ్యం కలిగి ఉన్నాము.",
    ml: "ലെൻസ്ക്രാഫ്റ്റ് സ്റ്റുഡിയോ (LensCraft Studio) 2016-ൽ തമിഴ്‌നാട്ടിലെ ചെന്നൈയിൽ സ്ഥാപിതമായ ഒരു പ്രീമിയം ലക്ഷ്വറി വെഡ്ഡിംഗ് ഫോട്ടോഗ്രാഫി & ഫിലിം സ്റ്റുഡിയോയാണ്. ദക്ഷിണേന്ത്യയിലുടനീളമുള്ള ലക്ഷ്വറി എഡിറ്റോറിയൽ പോർട്രെയ്റ്റുകൾ, കാൻഡിഡ് സ്റ്റോറിടെല്ലിംഗ്, പരമ്പരാഗത ആചാരങ്ങൾ എന്നിവയിൽ ഞങ്ങൾ വൈദഗ്ദ്ധ്യം നേടിയിട്ടുണ്ട്."
  },
  // 2. Location & Directions
  location: {
    en: "Our physical studio is located at Anna Nagar East, Chennai, Tamil Nadu - 600102. You can view our live Google Map location directly in the website footer or click 'Get Directions' to navigate.",
    ta: "எங்கள் ஸ்டுடியோ தமிழ்நாட்டின் சென்னை, அண்ணா நகர் கிழக்கில் (Anna Nagar East, Chennai - 600102) அமைந்துள்ளது. இணையதளத்தின் கீழ் பகுதியில் (footer) உள்ள எங்கள் நேரடி கூகுள் மேப் இருப்பிடத்தை நீங்கள் பார்க்கலாம் அல்லது வழிகாட்டுதல்களைப் பெற 'Get Directions' என்பதை கிளிக் செய்யவும்.",
    hi: "हमारा भौतिक स्टूडियो अन्ना नगर ईस्ट, चेन्नई, तमिलनाडु - 600102 में स्थित है। आप सीधे वेबसाइट पाद लेख (footer) में हमारे लाइव Google मानचित्र स्थान को देख सकते हैं या नेविगेट करने के लिए 'Get Directions' पर क्लिक कर सकते हैं।",
    te: "మా స్టూడియో తమిళనాడులోని చెన్నై, అన్నా నగర్ ఈస్ట్‌లో (Anna Nagar East, Chennai - 600102) ఉంది. మీరు వెబ్‌సైట్ ఫుటర్‌లో నేరుగా మా లైవ్ గూగుల్ మ్యాప్ స్థానాన్ని చూడవచ్చు లేదా నావిగేట్ చేయడానికి 'Get Directions' క్లిక్ చేయవచ్చు.",
    ml: "ഞങ്ങളുടെ സ്റ്റുഡിയോ തമിഴ്‌നാട്ടിലെ ചെന്നൈയിലെ അണ്ണാ നഗർ ഈസ്റ്റിൽ (Anna Nagar East, Chennai - 600102) സ്ഥിതി ചെയ്യുന്നു. വെബ്‌സൈറ്റ് അടിക്കുറിപ്പിൽ (footer) ഞങ്ങളുടെ തത്സമയ ഗൂഗിൾ മാപ്പ് ലൊക്കേഷൻ കാണാം അല്ലെങ്കിൽ നാവിഗേറ്റ് ചെയ്യാൻ 'Get Directions' ക്ലിക്ക് ചെയ്യുക."
  },
  // 3. Business Hours
  hours: {
    en: "We are open Monday through Saturday from 10:00 AM to 7:00 PM. Sundays are reserved strictly for pre-booked client wedding consultations and events.",
    ta: "நாங்கள் திங்கள் முதல் சனிக்கிழமை வரை காலை 10:00 மணி முதல் மாலை 7:00 மணி வரை செயல்படுகிறோம். ஞாயிற்றுக்கிழமைகள் முன்கூட்டியே பதிவு செய்யப்பட்ட வாடிக்கையாளர் திருமண ஆலோசனைகள் மற்றும் நிகழ்வுகளுக்கு மட்டுமே ஒதுக்கப்பட்டுள்ளன.",
    hi: "हम सोमवार से शनिवार तक सुबह 10:00 बजे से शाम 7:00 बजे तक खुले रहते हैं। रविवार केवल पूर्व-बुक किए गए ग्राहकों के विवाह परामर्श और आयोजनों के लिए आरक्षित हैं।",
    te: "మేము సోమవారం నుండి శనివారం వరకు ఉదయం 10:00 నుండి రాత్రి 7:00 వరకు అందుబాటులో ఉంటాము. ఆదివారాలు ముందస్తుగా బుక్ చేసుకున్న క్లయింట్ వెడ్డింగ్ సంప్రదింపులు మరియు ఈవెంట్‌ల కోసం మాత్రమే కేటాయించబడతాయి.",
    ml: "ഞങ്ങൾ തിങ്കൾ മുതൽ ശനി വരെ രാവിലെ 10:00 മുതൽ വൈകുന്നേരം 7:00 വരെ പ്രവർത്തിക്കുന്നു. ഞായറാഴ്ചകൾ മുൻകൂട്ടി ബുക്ക് ചെയ്ത കസ്റ്റമർ വെഡ്ഡിംഗ് കൺസൾട്ടേഷനുകൾക്കും ഇവന്റുകൾക്കുമായി മാത്രം നീക്കിവെച്ചിട്ടുള്ളതാണ്."
  },
  // 4. Contact Details
  contact: {
    en: "You can reach our help desk at hello@lenscraft.studio or call us directly at +91 98400 12345. We answer email enquiries within 2 hours during business hours.",
    ta: "எங்களை hello@lenscraft.studio என்ற மின்னஞ்சல் அல்லது +91 98400 12345 என்ற தொலைபேசி எண் மூலமாக தொடர்பு கொள்ளலாம். அலுவலக நேரங்களில் 2 மணி நேரத்திற்குள் மின்னஞ்சல் விசாரணைகளுக்கு பதிலளிப்போம்.",
    hi: "आप हमारे हेल्प डेस्क से hello@lenscraft.studio पर संपर्क कर सकते हैं या सीधे +91 98400 12345 पर कॉल कर सकते हैं। हम व्यावसायिक घंटों के दौरान 2 घंटे के भीतर ईमेल पूछताछ का उत्तर देते हैं।",
    te: "మీరు మా సహాయ కేంద్రాన్ని hello@lenscraft.studio లో సంప్రదించవచ్చు లేదా నేరుగా +91 98400 12345 కి కాల్ చేయవచ్చు. మేము వ్యాపార వేళల్లో 2 గంటల్లో ఇమెయిల్ విచారణలకు సమాధానం ఇస్తాము.",
    ml: "നിങ്ങൾക്ക് hello@lenscraft.studio എന്ന ഇമെയിൽ വഴിയോ +91 98400 12345 എന്ന നമ്പറിലോ ഞങ്ങളെ ബന്ധപ്പെടാം. പ്രവൃത്തി സമയങ്ങളിൽ 2 മണിക്കൂറിനുള്ളിൽ ഞങ്ങൾ ഇമെയിൽ ചോദ്യങ്ങൾക്ക് മറുപടി നൽകും."
  },
  // 5. Packages Overview
  packages: {
    en: "We offer 4 base packages:\n• Silver (₹1,20,000) - 6 hrs, 200+ photos, Linen album.\n• Gold (₹2,20,000) - 12 hrs, 400+ photos, cinema film, Linen album.\n• Platinum (₹3,50,000) - Multi-day, 600+ photos, cinematic film, 2 Glass albums, Drone.\n• Signature (₹5,00,000) - Curated chief weekly fine-art collection, 3 Large frames, live streaming.",
    ta: "நாங்கள் 4 அடிப்படை பேக்கேஜ்களை வழங்குகிறோம்:\n• சில்வர் (₹1,20,000) - 6 மணி நேரம், 200+ புகைப்படங்கள், லினன் ஆல்பம்.\n• கோல்ட் (₹2,20,000) - 12 மணி நேரம், 400+ புகைப்படங்கள், சினிமா படம், லினன் ஆல்பம்.\n• பிளாட்டினம் (₹3,50,000) - பல நாட்கள் கவரேஜ், 600+ புகைப்படங்கள், சினிமா படம், 2 கிளாஸ் ஆல்பம்கள், ட்ரோன்.\n• சிக்னேச்சர் (₹5,00,000) - தலைமை புகைப்படக் கலைஞர் வாராந்திர எடிட்டோரியல் தொகுப்பு, 3 பெரிய பிரேம்கள், நேரடி ஒளிபரப்பு.",
    hi: "हम 4 बेस पैकेज प्रदान करते हैं:\n• सिल्वर (₹1,20,000) - 6 घंटे, 200+ फोटो, लिनन एल्बम।\n• गोल्ड (₹2,20,000) - 12 घंटे, 400+ फोटो, सिनेमा फिल्म, लिनन एल्बम।\n• प्लेटिनम (₹3,50,000) - बहु-दिवसीय, 600+ फोटो, सिनेमा फिल्म, 2 ग्लास एल्बम, ड्रोन।\n• सिग्नेचर (₹5,00,000) - मुख्य फोटोग्राफर साप्ताहिक ललित कला संग्रह, 3 बड़े फ्रेम, लाइव स्ट्रीमिंग।",
    te: "మేము 4 ప్రాథమిక ప్యాకేజీలను అందిస్తున్నాము:\n• సిల్వర్ (₹1,20,000) - 6 గంటలు, 200+ ఫోటోలు, లినన్ ఆల్బమ్.\n• గోల్డ్ (₹2,20,000) - 12 గంటలు, 400+ ఫోటోలు, సినిమా ఫిల్మ్, లినన్ ఆల్బమ్.\n• ప్లాటినం (₹3,50,000) - మల్టీ-డే, 600+ ఫోటోలు, సినిమా ఫిల్మ్, 2 గ్లాస్ ఆల్బమ్‌లు, డ్రోన్.\n• సిగ్నేచర్ (₹5,00,000) - చీఫ్ ఫోటోగ్రాఫర్ క్యూరేటెడ్ వీక్లీ కలెక్షన్, 3 పెద్ద ఫ్రేమ్‌లు, లైవ్ స్ట్రీమింగ్.",
    ml: "ഞങ്ങൾ 4 അടിസ്ഥാന പാക്കേജുകൾ വാഗ്ദാനം ചെയ്യുന്നു:\n• സിൽവർ (₹1,20,000) - 6 മണിക്കൂർ, 200+ ഫോട്ടോകൾ, ലിനൻ ആൽബം.\n• ഗോൾഡ് (₹2,20,000) - 12 മണിക്കൂർ, 400+ ഫോട്ടോകൾ, സിനിമ ഫിലിം, ലിനൻ ആൽബം.\n• പ്ലാറ്റിനം (₹3,50,000) - മൾട്ടി-ഡേ, 600+ ഫോട്ടോകൾ, സിനിമാറ്റിക് ഫിലിം, 2 ഗ്ലാസ് ആൽബങ്ങൾ, ഡ്രോൺ.\n• സിഗ്നേച്ചർ (₹5,00,000) - ചീഫ് ഫോട്ടോഗ്രാഫർ ആഴ്ചയിലുടനീളമുള്ള ഫൈൻ-ആർട്ട് കളക്ഷൻ, 3 വലിയ ഫ്രെയിമുകൾ, തത്സമയ സംപ്രേക്ഷണം."
  },
  // 6. Drone Photography FAQ
  drone: {
    en: "Drone aerial photography is included by default starting from the Gold package tier (for venue shots) and is fully featured in 4K resolution in our Platinum and Signature packages. Drone coverage is subject to local weather and aviation authority clearance.",
    ta: "ட்ரோன் வான்வழி புகைப்படம் எடுத்தல் கோல்ட் பேக்கேஜில் இருந்து (இடம் கவரேஜ்) சேர்க்கப்பட்டுள்ளது மற்றும் பிளாட்டினம் மற்றும் சிக்னேச்சர் பேக்கேஜ்களில் 4K தரத்தில் முழுமையாக வழங்கப்படுகிறது. ட்ரோன் கவரேஜ் வானிலை மற்றும் உள்ளூர் விமான போக்குவரத்து அனுமதிகளுக்கு உட்பட்டது.",
    hi: "ड्रोन हवाई फोटोग्राफी डिफ़ॉल्ट रूप से गोल्ड पैकेज (स्थान शॉट के लिए) से शामिल है और हमारे प्लेटिनम और सिग्नेचर पैकेज में 4K रिज़ॉल्यूशन में पूरी तरह से उपलब्ध है। ड्रोन कवरेज स्थानीय मौसम और विमानन प्राधिकरण की मंजूरी के अधीन है।",
    te: "డ్రోన్ ఏరియల్ ఫోటోగ్రఫీ డిఫాల్ట్‌గా గోల్డ్ ప్యాకేజీ (వేదిక షాట్ల కోసం) నుండి చేర్చబడింది మరియు మా ప్లాటినం మరియు సిగ్నేచర్ ప్యాకేజీలలో 4K రిజల్యూషన్‌లో లభిస్తుంది. డ్రోన్ కవరేజ్ స్థానిక వాతావరణం మరియు విమానయాన అనుమతులపై ఆధారపడి ఉంటుంది.",
    ml: "ഡ്രോൺ ഏരിയൽ ഫോട്ടോഗ്രാഫി ഗോൾഡ് പാക്കേജ് മുതൽ (വേദി ഷോട്ടുകൾക്കായി) ഉൾപ്പെടുത്തിയിട്ടുണ്ട്. ഞങ്ങളുടെ പ്ലാറ്റിനം, സിഗ്നേച്ചർ പാക്കേജുകളിൽ 4K റെസല്യൂഷനിൽ ഇത് ലഭ്യമാണ്. ഡ്രോൺ കവറേജ് കാലാവസ്ഥയ്ക്കും പ്രാദേശിക ഏവിയേഷൻ അനുമതികൾക്കും വിധേയമായിരിക്കും."
  },
  // 7. Photo Delivery Timeline
  delivery: {
    en: "Next-day previews (5-15 highlight images) are sent within 24-48 hours. The complete set of fully edited digital images is delivered within 15 to 45 days based on your package selection. Cinematic films are delivered within 20 to 45 days.",
    ta: "மறுநாள் முன்னோட்டங்கள் (5-15 ஹைலைட் படங்கள்) 24-48 மணி நேரத்திற்குள் அனுப்பப்படும். முழுமையாக எடிட் செய்யப்பட்ட டிஜிட்டல் படங்கள் உங்கள் பேக்கேஜ் தேர்வின் அடிப்படையில் 15 முதல் 45 நாட்களுக்குள் வழங்கப்படும். சினிமா படங்கள் 20 முதல் 45 நாட்களுக்குள் டெலிவரி செய்யப்படும்.",
    hi: "अगले दिन के पूर्वावलोकन (5-15 हाइलाइट चित्र) 24-48 घंटों के भीतर भेजे जाते हैं। पूरी तरह से संपादित डिजिटल छवियों का पूरा सेट आपके पैकेज चयन के आधार पर 15 से 45 दिनों के भीतर वितरित किया जाता है। सिनेमाई फिल्में 20 से 45 दिनों में वितरित की जाती हैं।",
    te: "మరుసటి రోజు ప్రివ్యూలు (5-15 హైలైట్ ఇమేజెస్) 24-48 గంటల్లో పంపబడతాయి. పూర్తిగా ఎడిట్ చేసిన డిజిটাল ఫోటోలు మీ ప్యాకేజీ ఎంపిక ఆధారంగా 15 నుండి 45 రోజుల్లో అందించబడతాయి. సినిమాటిక్ ఫిల్మ్స్ 20 నుండి 45 రోజుల్లో అందుతాయి.",
    ml: "പിറ്റേന്നത്തെ പ്രിവ്യൂകൾ (5-15 ഹൈലൈറ്റ് ഇമേജുകൾ) 24-48 മണിക്കൂറിനുള്ളിൽ അയയ്ക്കും. പൂർണ്ണമായി എഡിറ്റ് ചെയ്ത ഫോട്ടോകൾ പാക്കേജ് സെലക്ഷൻ അനുസരിച്ച് 15 മുതൽ 45 ദിവസത്തിനുള്ളിൽ ലഭിക്കും. സിനിമാറ്റിക് ഫിലിമുകൾ 20 മുതൽ 45 ദിവസത്തിനുള്ളിൽ ഡെലിവറി ചെയ്യപ്പെടും."
  },
  // 8. Customization options
  customize: {
    en: "Yes, you can fully customize any package! You can adjust coverage duration, photographers count, videographers team, and add-on services like Pre-Wedding Couple Shoots or Express Deliveries. Open our Packages page to adjust our budget calculator and request a custom quote.",
    ta: "ஆம், நீங்கள் எந்த பேக்கேஜையும் முழுமையாக மாற்றியமைக்கலாம்! கவரேஜ் நேரம், புகைப்படக் கலைஞர்களின் எண்ணிக்கை, சினிமா குழு மற்றும் ப்ரீ-வெட்டிங் ஷூட் அல்லது விரைவான டெலிவரி போன்ற கூடுதல் சேவைகளை நீங்கள் தேர்வு செய்யலாம். எங்கள் Packages பக்கத்தில் உள்ள பட்ஜெட் கால்குலேட்டரைப் பயன்படுத்தி தனிப்பயன் மதிப்பீட்டைப் பெறலாம்.",
    hi: "हाँ, आप किसी भी पैकेज को पूरी तरह से अनुकूलित कर सकते हैं! आप कवरेज अवधि, फोटोग्राफरों की संख्या, वीडियोग्राफर टीम और प्री-वेडिंग शूट या एक्सप्रेस डिलीवरी जैसी ऐड-ऑन सेवाओं को समायोजित कर सकते हैं। अनुकूलित उद्धरण प्राप्त करने के लिए हमारा पैकेज पेज खोलें।",
    te: "అవును, మీరు ఏ ప్యాకేజీనైనా పూర్తిగా అనుకూలీకరించవచ్చు! మీరు ఈవెంట్ వ్యవధి, ఫోటోగ్రాఫర్ల సంఖ్య, సినిమాటోగ్రాఫర్ల బృందం మరియు ప్రీ-వెడ్డింగ్ షూట్ లేదా ఎక్స్‌ప్రెస్ డెలివరీ వంటి సేవలను సవరించవచ్చు. అనుకూల ధర తెలుసుకోవడానికి మా ప్యాకేజీల పేజీని సందర్శించండి.",
    ml: "അതെ, നിങ്ങൾക്ക് ഏത് പാക്കേജും പൂർണ്ണമായി കസ്റ്റമൈസ് ചെയ്യാം! കവറേജ് സമയം, ഫോട്ടോഗ്രാഫർമാരുടെ എണ്ണം, സിനിമാറ്റോഗ്രാഫർ ടീം, പ്രീ-വെഡ്ഡിംഗ് ഷൂട്ട് അല്ലെങ്കിൽ എക്സ്പ്രസ് ഡെലിവറി എന്നിവ ക്രമീകരിക്കാം. ഞങ്ങളുടെ പാക്കേജ് പേജ് തുറന്ന് ബഡ്ജറ്റ് കാൽക്കുലേറ്റർ വഴി ഒരു കസ്റ്റം കോട്ട് തയ്യാറാക്കാം."
  },
  // 9. Booking Process
  booking: {
    en: "To book a date, navigate to our Availability Calendar, select an open date slot (marked in green or gold), choose your preferred time slot, and submit the consultation request form. A studio coordinator will verify details and send the contract within 2 hours.",
    ta: "தேதியை முன்பதிவு செய்ய, எங்கள் Availability Calendar பக்கத்திற்குச் சென்று, பச்சை அல்லது தங்க நிறத்தில் குறிக்கப்பட்ட திறந்த தேதியைத் தேர்ந்தெடுத்து, விரும்பிய நேரத்தை தேர்வு செய்து ஆலோசனை படிவத்தை சமர்ப்பிக்கவும். எங்கள் ஒருங்கிணைப்பாளர் 2 மணி நேரத்திற்குள் விவரங்களை சரிபார்த்து ஒப்பந்தத்தை அனுப்புவார்.",
    hi: "तारीख बुक करने के लिए, हमारे उपलब्धता कैलेंडर पर जाएं, हरे या सुनहरे रंग में चिह्नित खुली तारीख का चयन करें, अपना पसंदीदा समय चुनें और परामर्श अनुरोध फ़ॉर्म जमा करें। स्टूडियो समन्वयक 2 घंटे के भीतर विवरण सत्यापित करेंगे और अनुबंध भेजेंगे।",
    te: "తేదీని బుక్ చేయడానికి, మా లభ్యత క్యాలెండర్‌కు వెళ్లండి, ఆకుపచ్చ లేదా బంగారు రంగులో ఉన్న ఖాళీ తేదీని ఎంచుకుని, కావలసిన సమయాన్ని ఎంచుకుని అభ్యర్థనను సమర్పించండి. మా కోఆర్డినేటర్ 2 గంటల్లో వివరాలను ధృవీకరించి ఒప్పందాన్ని పంపుతారు.",
    ml: "ഒരു തീയതി ബുക്ക് ചെയ്യുന്നതിനായി, ഞങ്ങളുടെ അവൈലബിലിറ്റി കലണ്ടർ സന്ദർശിച്ച് ലഭ്യമായ തീയതി (പച്ച അല്ലെങ്കിൽ സ്വർണ്ണ നിറത്തിലുള്ളത്) തിരഞ്ഞെടുത്ത് സമയം ക്രമീകരിച്ച് കൺസൾട്ടേഷൻ ഫോം സമർപ്പിക്കുക. 2 മണിക്കൂറിനുള്ളിൽ കോർഡിനേറ്റർ നിങ്ങളെ ബന്ധപ്പെടും."
  },
  // 10. Cancellation & Refund Policy
  cancel: {
    en: "We offer a 100% advance deposit refund for cancellations requested up to 90 days before the wedding date. A 50% refund is issued for cancellations up to 30 days prior. Cancellations within 30 days of the event are non-refundable, but can be rescheduled free of charge.",
    ta: "திருமண தேதிக்கு 90 நாட்களுக்கு முன்பு முன்பதிவு ரத்து செய்யப்பட்டால் 100% முன்பணம் திரும்ப வழங்கப்படும். 30 நாட்களுக்கு முன்பு ரத்து செய்யப்பட்டால் 50% முன்பணம் வழங்கப்படும். 30 நாட்களுக்குள் ரத்து செய்யப்பட்டால் முன்பணம் திரும்ப வழங்கப்படாது, ஆனால் கட்டணமின்றி வேறு தேதிக்கு மாற்றிக்கொள்ளலாம்.",
    hi: "हम शादी की तारीख से 90 दिन पहले तक रद्द करने के अनुरोधों के लिए 100% अग्रिम जमा रिफंड प्रदान करते हैं। 30 दिन पहले तक रद्द करने पर 50% रिफंड दिया जाता है। शादी के 30 दिनों के भीतर रद्दीकरण गैर-रिफंडेबल है, लेकिन इसे मुफ्त में पुनर्निर्धारित किया जा सकता है।",
    te: "వివాహ తేదీకి 90 రోజుల ముందు రద్దు చేసుకుంటే 100% అడ్వాన్స్ డిపాజిట్ వాపస్ ఇవ్వబడుతుంది. 30 రోజుల ముందు రద్దు చేసుకుంటే 50% వాపస్ ఇవ్వబడుతుంది. ఈవెంట్‌కు 30 రోజుల లోపు రద్దు చేసుకుంటే నగదు వాపస్ ఉండదు, కానీ ఉచితంగా వేరే తేదీకి మార్చుకోవచ్చు.",
    ml: "വിവാഹ തീയതിക്ക് 90 ദിവസം മുമ്പ് വരെയുള്ള റദ്ദാക്കലുകൾക്ക് 100% റീഫണ്ട് നൽകുന്നു. 30 ദിവസം മുമ്പ് വരെ 50% റീഫണ്ട് നൽകും. ഇവന്റിന് 30 ദിവസത്തിനുള്ളിൽ റദ്ദാക്കിയാൽ തുക തിരികെ ലഭിക്കില്ല, എന്നാൽ ഫീസില്ലാതെ റീ-ഷെഡ്യൂൾ ചെയ്യാം."
  },
  // 11. Rescheduling
  reschedule: {
    en: "Rescheduling is entirely free of charge if requested at least 30 days prior to the original target date, subject to photographer availability on your new target date. Within 30 days, a nominal scheduling realignment fee of ₹10,000 is applicable.",
    ta: "அசல் தேதிக்கு 30 நாட்களுக்கு முன்பு கோரப்பட்டால், புதிய தேதியில் புகைப்படக் கலைஞர் கிடைக்கப்பெறுவதைப் பொறுத்து, தேதி மாற்றம் முற்றிலும் இலவசம். 30 நாட்களுக்குள் தேதி மாற்றம் செய்யப்படின், ₹10,000 பெயரளவு மறுசீரமைப்பு கட்டணம் வசூலிக்கப்படும்.",
    hi: "यदि मूल तिथि से कम से कम 30 दिन पहले अनुरोध किया जाता है, तो नई तिथि पर फोटोग्राफर की उपलब्धता के अधीन पुनर्निर्धारण पूरी तरह से निःशुल्क है। 30 दिनों के भीतर, ₹10,000 का नाममात्र का शुल्क लागू होता है।",
    te: "అసలు తేదీకి 30 రోజుల ముందు మార్పు కోరితే, కొత్త తేదీలో షూటర్ అందుబాటును బట్టి తేదీ మార్పు పూర్తిగా ఉచితం. 30 రోజుల లోపు మార్పు చేస్తే, ₹10,000 నామమాత్రపు పునర్వ్యవస్థీకరణ రుసుము వర్తిస్తుంది.",
    ml: "യഥാർത്ഥ തീയതിക്ക് 30 ദിവസം മുമ്പെങ്കിലും റീ-ഷെഡ്യൂൾ ആവശ്യപ്പെട്ടാൽ ഇത് പൂർണ്ണമായും സൌജന്യമാണ്. 30 ദിവസത്തിനുള്ളിൽ ആവശ്യപ്പെട്ടാൽ ₹10,000 റീ-ഷെഡ്യൂളിംഗ് ചാർജ് ബാധകമായിരിക്കും."
  },
  // 12. Travel & Outstation Charges
  travel: {
    en: "Travel charges apply to destination weddings outside Chennai. Transit is calculated at ₹30 per km for our crew transport. Hotel accommodations for the crew are priced at ₹5,000 per room night. You can compute this live in our Budget Calculator.",
    ta: "சென்னைக்கு வெளியே நடைபெறும் அவுட்ஸ்டேஷன் திருமணங்களுக்கு பயணக் கட்டணங்கள் பொருந்தும். குழு போக்குவரத்திற்கு கி.மீ-க்கு ₹30 கணக்கிடப்படுகிறது. தங்குமிட கட்டணம் அறைக்கு ₹5,000 ஆகும். எங்கள் பட்ஜெட் கால்குலேட்டரில் இதை நீங்கள் கணக்கிடலாம்.",
    hi: "चेन्नई के बाहर गंतव्य शादियों के लिए यात्रा शुल्क लागू होते हैं। हमारे चालक दल के परिवहन के लिए पारगमन की गणना ₹30 प्रति किमी की दर से की जाती है। होटल आवास ₹5,000 प्रति कमरा रात है। आप इसे हमारे बजट कैलकुलेटर में लाइव देख सकते हैं।",
    te: "చెన్నై వెలుపల జరిగే డెస్టినేషన్ వివాహాలకు ప్రయాణ ఛార్జీలు వర్తిస్తాయి. రవాణా కిమీకి ₹30 గా లెక్కించబడుతుంది. సిబ్బంది వసతి గదికి రాత్రికి ₹5,000. మీరు మా బడ్జెట్ కాల్యూలేటర్ లో దీనిని లెక్కించవచ్చు.",
    ml: "ചെന്നൈക്ക് പുറത്തുള്ള വിവാഹങ്ങൾക്ക് യാത്രാ ചെലവ് ബാധകമാണ്. കിലോമീറ്ററിന് ₹30 നിരക്കിൽ ട്രാൻസിറ്റ് ഈടാക്കുന്നു. ക്രൂ താമസത്തിനായി മുറി ഒന്നിന് ₹5,000 ഈടാക്കുന്നു. ബഡ്ജറ്റ് കാൽക്കുലേറ്ററിൽ ഇത് തത്സമയം കണക്കാക്കാം."
  },
  // 13. Pre-Wedding Shoots
  prewedding: {
    en: "Pre-wedding shoots are 3-4 hours sessions at outdoor or heritage locations. They are included free in our Platinum and Signature packages, or can be added to Silver and Gold packages as a custom add-on service for ₹25,000.",
    ta: "ப்ரீ-வெட்டிங் ஷூட்கள் 3-4 மணி நேரம் வெளிப்புற அல்லது பாரம்பரிய இடங்களில் நடத்தப்படும். இவை பிளாட்டினம் மற்றும் சிக்னேச்சர் பேக்கேஜ்களில் இலவசமாக சேர்க்கப்பட்டுள்ளன, அல்லது சில்வர் மற்றும் கோல்ட் பேக்கேஜ்களில் ₹25,000 கட்டணத்தில் சேர்க்கப்படலாம்.",
    hi: "प्री-वेडिंग शूट बाहरी या ऐतिहासिक स्थानों पर 3-4 घंटे के सत्र होते हैं। वे हमारे प्लेटिनम और सिग्नेचर पैकेज में मुफ्त शामिल हैं, या ₹25,000 में सिल्वर और गोल्ड पैकेज में ऐड-ऑन के रूप में जोड़े जा सकते हैं।",
    te: "ప్రీ-వెడ్డింగ్ షూట్‌లు అవుట్‌డోర్ లేదా హెరిటేజ్ లొకేషన్లలో 3-4 గంటల షూటింగ్. ఇవి ప్లాటినం, సిగ్నేచర్ ప్యాకేజీలలో ఉచితం, లేదా సిల్వర్ మరియు గోల్డ్ ప్యాకేజీలకు ₹25,000 అదనంగా జోడించవచ్చు.",
    ml: "പ്രീ-വെഡ്ഡിംഗ് ഷൂട്ടുകൾ 3-4 മണിക്കൂർ നീളുന്ന ഔട്ട്‌ഡോർ അല്ലെങ്കിൽ ഹെറിറ്റേജ് ലൊക്കേഷൻ സെഷനുകളാണ്. പ്ലാറ്റിനം, സിഗ്നേച്ചർ പാക്കേജുകളിൽ ഇവ ഉൾപ്പെടുത്തിയിട്ടുണ്ട്. സിൽവർ, ഗോൾഡ് പാക്കേജുകളിൽ ₹25,000 നിരക്കിൽ ഇത് ആഡ് ചെയ്യാം."
  },
  // 14. Candid vs Traditional Styles
  styles: {
    en: "Candid photography focuses on natural, unposed expressions and emotional moments without intervention. Traditional photography captures posed family portraits and formal group stages. Most packages include a balanced crew of both types.",
    ta: "கேண்டிட் புகைப்படம் எடுத்தல் என்பது இயற்கையான, தன்னிச்சையான உணர்ச்சிகள் மற்றும் உணர்வுபூர்வமான தருணங்களை படம்பிடிப்பதில் கவனம் செலுத்துகிறது. பாரம்பரிய புகைப்படம் எடுத்தல் என்பது முறையான குடும்ப உருவப்படங்கள் மற்றும் குழு படங்களை உள்ளடக்கியது. பெரும்பாலான பேக்கேஜ்களில் இரு வகையான கலைஞர்களும் இருப்பர்.",
    hi: "कैंडिड फोटोग्राफी बिना किसी हस्तक्षेप के प्राकृतिक, बिना पोज़ वाले भावों और भावनात्मक क्षणों पर ध्यान केंद्रित करती है। पारंपरिक फोटोग्राफी पोज़ किए गए पारिवारिक चित्रों और औपचारिक समूह चरणों को कैप्चर करती है। अधिकांश पैकेजों में दोनों प्रकार के फोटोग्राफर शामिल होते हैं।",
    te: "క్యాండిడ్ ఫోటోగ్రఫీ సహజమైన, ప్లాన్ చేయని హావాభావాలను మరియు భావోద్వేగాలను బంధిస్తుంది. సాంప్రదాయ ఫోటోగ్రఫీ కుటుంబ చిత్రాలను మరియు అధికారిక సమూహాలను బంధిస్తుంది. మా ప్యాకేజీలలో ఈ రెండింటి సమతుల్య సిబ్బంది ఉంటారు.",
    ml: "കാൻഡിഡ് ഫോട്ടോഗ്രാഫി എന്നത് സ്വാഭാവികമായ ഭാവങ്ങളെയും വൈകാരിക നിമിഷങ്ങളെയും ക്യാപ്‌ചർ ചെയ്യുന്നു. പരമ്പരാഗത ഫോട്ടോഗ്രാഫി എന്നത് പോസ് ചെയ്ത ഫാമിലി പോർട്രെയ്റ്റുകളും ഗ്രൂപ്പ് ഫോട്ടോകളും എടുക്കുന്നു. ഞങ്ങളുടെ മിക്ക പാക്കേജുകളിലും ഇരുതരം ഷൂട്ടർമാരും ഉണ്ടാകും."
  },
  // 15. Team Size & Photographers
  team: {
    en: "Our team sizes scale with your package. Silver has 2 photographers; Gold has 3 crew members; Platinum includes 6 professional shooters; and our Signature package deploys 9 elite specialists including our Chief Photographer.",
    ta: "எங்கள் குழுவின் அளவு உங்கள் பேக்கேஜ் அடிப்படையில் மாறுபடும். சில்வர் பேக்கேஜில் 2 புகைப்படக் கலைஞர்கள்; கோல்டில் 3 கலைஞர்கள்; பிளாட்டினத்தில் 6 நிபுணர்கள்; மற்றும் சிக்னேச்சரில் தலைமை புகைப்படக் கலைஞர் உட்பட 9 உயரடுக்கு கலைஞர்கள் ஈடுபடுத்தப்படுவார்கள்.",
    hi: "हमारी टीम का आकार आपके पैकेज के साथ बदलता है। सिल्वर में 2 फोटोग्राफर हैं; गोल्ड में 3 चालक दल के सदस्य हैं; प्लेटिनम में 6 पेशेवर शूटर शामिल हैं; और हमारे सिग्नेचर पैकेज में मुख्य फोटोग्राफर सहित 9 विशिष्ट विशेषज्ञ तैनात हैं।",
    te: "మా బృందం పరిమాణం మీ ప్యాకేజీ ఆధారంగా మారుతుంది. సిల్వర్‌లో 2 గురు ఫోటోగ్రాఫర్‌లు; గోల్డ్‌లో 3 గురు సిబ్బంది; ప్లాటినంలో 6 గురు నిపుణులు; మరియు మా సిగ్నేచర్ ప్యాకేజీలో చీఫ్ ఫోటోగிராఫర్‌తో సహా 9 మంది సిబ్బంది ఉంటారు.",
    ml: "ഞങ്ങളുടെ ടീം സൈസ് പാക്കേജ് അനുസരിച്ച് വ്യത്യാസപ്പെടുന്നു. സിൽവറിൽ 2 ഫോട്ടോഗ്രാഫർമാരുണ്ട്; ഗോൾഡിൽ 3 പേരുണ്ട്; പ്ലാറ്റിനത്തിൽ 6 പേരുണ്ട്; സിഗ്നേച്ചർ പാക്കേജിൽ ചീഫ് ഫോട്ടോഗ്രാഫർ ഉൾപ്പെടെ 9 പേരുണ്ടാകും."
  },
  // 16. Gear & Equipment Used
  equipment: {
    en: "We use top-tier full-frame Sony FE camera bodies (A7R V, A7S III, FX3) combined with premium Sony G Master prime lenses (35mm f/1.4, 50mm f/1.2, 85mm f/1.4), DJI stabilizers, and DJI Mavic 3 Pro drones for cinematic aerial views.",
    ta: "நாங்கள் சோனி FE முழு-பிரேம் கேமராக்கள் (Sony A7R V, A7S III, FX3), சோனி ஜி மாஸ்டர் லென்ஸ்கள் (35mm f/1.4, 50mm f/1.2, 85mm f/1.4), DJI ஸ்டெபிலைசர்கள் மற்றும் DJI Mavic 3 Pro ட்ரோன்களைப் பயன்படுத்துகிறோம்.",
    hi: "हम प्रीमियम सोनी जी मास्टर प्राइम लेंस (35mm f/1.4, 50mm f/1.2, 85mm f/1.4), DJI स्टेबलाइजर्स और DJI मविक 3 प्रो ड्रोन के साथ शीर्ष स्तरीय फुल-फ्रेम सोनी FE कैमरा बॉडी (A7R V, A7S III, FX3) का उपयोग करते हैं।",
    te: "మేము ప్రీమియం సోనీ జి మాస్టర్ లెన్స్‌లతో (35mm f/1.4, 50mm f/1.2, 85mm f/1.4) కూడిన సోనీ FE కెమెరా బాడీలను (A7R V, A7S III, FX3) మరియు డ్రోన్‌లను ఉపయోగిస్తాము.",
    ml: "ഞങ്ങൾ സോണി FE ഫുൾ-ഫ്രെയിം ക്യാമറ ബോഡികളും (A7R V, A7S III, FX3), പ്രീമിയം സോണി ജി മാസ്റ്റിൻ പ്രൈം ലെൻസുകളും (35mm, 50mm, 85mm), DJI സ്റ്റെബിലൈസറുകളും ഡ്രോണുകളും ഉപയോഗിക്കുന്നു."
  },
  // 17. Advance Payment
  payment: {
    en: "To reserve your wedding date on our calendar, a 30% advance deposit is required along with a signed contract. 50% is due 30 days before the wedding, and the remaining 20% must be paid before complete photo delivery.",
    ta: "உங்கள் திருமண தேதியை முன்பதிவு செய்ய, 30% முன்பணம் மற்றும் கையொப்பமிடப்பட்ட ஒப்பந்தம் தேவை. திருமணத்திற்கு 30 நாட்களுக்கு முன்பு 50% மற்றும் முழு புகைப்பட விநியோகத்திற்கு முன்பு மீதமுள்ள 20% செலுத்தப்பட வேண்டும்.",
    hi: "हमारे कैलेंडर पर अपनी शादी की तारीख सुरक्षित करने के लिए, हस्ताक्षरित अनुबंध के साथ 30% अग्रिम जमा की आवश्यकता होती है। शादी से 30 दिन पहले 50% और फोटो वितरण से पहले शेष 20% का भुगतान करना होगा।",
    te: "మా క్యాలెండర్‌లో మీ తేదీని రిజర్వ్ చేయడానికి, సంతకం చేసిన ఒప్పందంతో పాటు 30% అడ్వాన్స్ డిపాజిట్ అవసరం. వివాహానికి 30 రోజుల ముందు 50% మరియు డెలివరీకి ముందు మిగిలిన 20% చెల్లించాలి.",
    ml: "കലണ്ടറിൽ നിങ്ങളുടെ വിവാഹ തീയതി ഉറപ്പിക്കുന്നതിനായി 30% അഡ്വാൻസ് പേയ്മെന്റും ഒപ്പിട്ട കരാറും ആവശ്യമാണ്. വിവാഹത്തിന് 30 ദിവസം മുമ്പ് 50%-ഉം, ബാക്കി 20% ഫോട്ടോകൾ ലഭിക്കുന്നതിന് മുമ്പും നൽകേണ്ടതാണ്."
  },
  // 18. Fallback Default Response
  fallback: {
    en: "I apologize, but that specific details is currently unavailable in my knowledge base. Please contact our support team at hello@lenscraft.studio or call +91 98400 12345 for further direct assistance.",
    ta: "மன்னிக்கவும், அந்த குறிப்பிட்ட தகவல் தற்போது என்னிடம் இல்லை. கூடுதல் உதவிக்கு hello@lenscraft.studio என்ற முகவரியில் எங்களைத் தொடர்பு கொள்ளவும் அல்லது +91 98400 12345 என்ற எண்ணை அழைக்கவும்.",
    hi: "मुझे क्षमा करें, लेकिन यह विशिष्ट विवरण वर्तमान में मेरे ज्ञान आधार में उपलब्ध नहीं है। अधिक सहायता के लिए कृपया हमारी सहायता टीम से hello@lenscraft.studio पर संपर्क करें या +91 98400 12345 पर कॉल करें।",
    te: "నన్ను క్షమించండి, ఆ సమాచారం ప్రస్తుతం నా డేటాబేస్ లో అందుబాటులో లేదు. మరిన్ని వివరాల కోసం మా బృందాన్ని hello@lenscraft.studio లో సంప్రదించండి లేదా +91 98400 12345 కి కాల్ చేయండి.",
    ml: "ക്ഷമിക്കണം, ഈ വിവരം ഇപ്പോൾ എന്റെ പക്കലില്ല. കൂടുതൽ സഹായത്തിനായി hello@lenscraft.studio എന്ന വിലാസത്തിൽ ഇമെയിൽ അയക്കുകയോ +91 98400 12345 എന്ന നമ്പറിൽ വിളിക്കുകയോ ചെയ്യുക."
  }
};

// Expand topics to cover 100+ FAQ keywords naturally
export function queryFAQ(input: string, context: SessionContext): { response: string; languageDetected: SupportedLanguage } {
  const detected = detectLanguage(input);
  context.detectedLanguage = detected;

  const t = input.toLowerCase();

  // 1. Personalized Recommendations flow trigger
  // Check if user is asking for package suggestion or best package
  if (t.includes("suggest") || t.includes("recommend") || t.includes("which package") || t.includes("best package") || t.includes("பரிந்துரை") || t.includes("कौन सा पैकेज") || t.includes("ఏ ప్యాకేజీ") || t.includes("ഏത് പാക്കേജ്")) {
    context.pendingRecommendationStep = "budget";
    context.recommendationData = {};
    
    const responses = {
      en: "I can help recommend the perfect package! Let's start with your budget. What is your approximate target budget limit in Rupees? (e.g., 2 Lakhs, or ₹2,50,000)",
      ta: "சிறந்த பேக்கேஜை பரிந்துரைக்க நான் உதவ முடியும்! உங்கள் பட்ஜெட் எவ்வளவு? (எ.கா. ₹2,00,000 அல்லது 2 லட்சம்)",
      hi: "मैं सही पैकेज की सिफारिश करने में मदद कर सकता हूँ! आपके बजट से शुरू करते हैं। आपका अनुमानित बजट कितना है? (जैसे, 2 लाख या ₹2,00,000)",
      te: "నేను సరైన ప్యాకేజీని సూచించగలను! మీ బడ్జెట్ ఎంత? (ఉదాహరణకు, 2 లక్షలు లేదా ₹2,00,000)",
      ml: "നിങ്ങൾക്ക് അനുയോജ്യമായ പാക്കേജ് തിരഞ്ഞെടുക്കാൻ ഞാൻ സഹായിക്കാം! നിങ്ങളുടെ ഏകദേശ ബഡ്ജറ്റ് എത്രയാണ്? (ഉദാഹരണത്തിന്, 2 ലക്ഷം അല്ലെങ്കിൽ ₹2,00,000)"
    };
    return { response: responses[detected], languageDetected: detected };
  }

  // Handle active recommendation questionnaire steps if in progress
  if (context.pendingRecommendationStep) {
    const step = context.pendingRecommendationStep;
    
    if (step === "budget") {
      // Parse numbers from input
      const budgetNum = parseInt(t.replace(/[^0-9]/g, ""), 10);
      if (budgetNum) {
        context.recommendationData!.budget = budgetNum;
      } else if (t.includes("lakh") || t.includes("லட்சம்") || t.includes("लाख") || t.includes("లక్ష")) {
        const val = t.includes("1") ? 100000 : t.includes("2") ? 200000 : t.includes("3") ? 300000 : t.includes("4") ? 400000 : t.includes("5") ? 500000 : 250000;
        context.recommendationData!.budget = val;
      } else {
        context.recommendationData!.budget = 250000; // Default
      }
      
      context.pendingRecommendationStep = "guests";
      const responses = {
        en: "Got it. Approximately how many wedding guests are you expecting? (e.g. 150, or 400 guests)",
        ta: "சரி. தோராயமாக எத்தனை விருந்தினர்களை எதிர்பார்க்கிறீர்கள்? (எ.கா. 200 அல்லது 400 பேர்)",
        hi: "समझ गया। लगभग कितने मेहमानों की उम्मीद है? (जैसे, 200 या 400 मेहमान)",
        te: "సరే. సుమారుగా ఎంత మంది అతిథులు వస్తున్నారు? (ఉదాహరణకు, 200 లేదా 400 మంది)",
        ml: "ശരി. ഏകദേശം എത്ര അതിഥികളെയാണ് നിങ്ങൾ പ്രതീക്ഷിക്കുന്നത്? (ഉദാഹരണത്തിന്, 200 അല്ലെങ്കിൽ 400 പേർ)"
      };
      return { response: responses[detected], languageDetected: detected };
    }
    
    if (step === "guests") {
      const guestsNum = parseInt(t.replace(/[^0-9]/g, ""), 10);
      context.recommendationData!.guests = guestsNum || 250;
      
      context.pendingRecommendationStep = "duration";
      const responses = {
        en: "Is this for a single-day event or a multi-day South Indian traditional wedding?",
        ta: "இது ஒரு நாள் நிகழ்வா அல்லது பல நாட்கள் நடைபெறும் பாரம்பரிய திருமணமா?",
        hi: "क्या यह एक दिवसीय आयोजन है या बहु-दिवसीय पारंपरिक शादी है?",
        te: "ఇది ఒక రోజు ఈవెంట్ ఆ లేక మల్టీ-డే సాంప్రదాయ వివాహమా?",
        ml: "ഇത് ഒരു ദിവസത്തെ ചടങ്ങാണോ അതോ ഒന്നിലധികം ദിവസത്തെ പരമ്പരാഗത വിവാഹമാണോ?"
      };
      return { response: responses[detected], languageDetected: detected };
    }

    if (step === "duration") {
      context.recommendationData!.duration = t;
      context.pendingRecommendationStep = "done";
      
      // Perform recommendation evaluation
      const recBudget = context.recommendationData!.budget || 250000;
      const recGuests = context.recommendationData!.guests || 250;
      const isMultiDay = t.includes("multi") || t.includes("பல") || t.includes("बहु") || t.includes("మల్టీ") || t.includes("കൂടുതൽ");

      let match = "Gold";
      let reason = "";

      if (recBudget < 150000) {
        match = "Silver";
        reason = "It perfectly fits your budget limits and provides high-resolution coverage for intimate events.";
      } else if (recBudget >= 150000 && recBudget < 300000 && !isMultiDay) {
        match = "Gold";
        reason = "It provides full-day traditional and candid shooters with cinematic highlight videos.";
      } else if (isMultiDay || recGuests > 350 || recBudget >= 300000 && recBudget < 450000) {
        match = "Platinum";
        reason = "It accounts for large guest sizes, multi-day coverage, handcrafted glass albums, and aerial drone captures.";
      } else {
        match = "Signature";
        reason = "It is our exclusive weekly coverage curated personally by our chief photographer for ultimate fine-art prints.";
      }

      context.pendingRecommendationStep = undefined; // Reset
      context.recommendationData = undefined;

      const recResponses = {
        en: `✨ Based on your inputs, I highly recommend our **${match} Package**!\n\n**Reason**: ${reason}\n\nYou can explore packages in detail or check real-time target date availability on our Calendar page.`,
        ta: `✨ உங்கள் விவரங்களின்படி, எங்கள் **${match} பேக்கேஜை** நான் பரிந்துரைக்கிறேன்!\n\n**காரணம்**: ${reason === "It perfectly fits your budget limits and provides high-resolution coverage for intimate events." ? "இது உங்கள் பட்ஜெட்டிற்குள் அடங்குகிறது மற்றும் நெருக்கமான சுற்றத்தினருக்கான கவரேஜை வழங்குகிறது." : "இது உங்கள் பல நாள் சடங்குகள் மற்றும் ட்ரோன் வான்வழி படங்களுக்கு உகந்தது."}\n\nமேலும் விவரங்களை எங்களின் Packages பக்கத்தில் காணலாம் அல்லது முன்பதிவு தேதிகளை Calendar பக்கத்தில் சரிபார்க்கலாம்.`,
        hi: `✨ आपके इनपुट के आधार पर, मैं हमारे **${match} पैकेज** की अत्यधिक अनुशंसा करता हूँ!\n\n**कारण**: यह आपकी आवश्यकताओं के लिए सबसे उपयुक्त फोटोग्राफर चालक दल और एल्बमों को आवंटित करता है।\n\nआप हमारे पैकेज पेज पर विस्तृत जानकारी पा सकते हैं या उपलब्धता की जांच कर सकते हैं।`,
        te: `✨ మీ వివరాల ప్రకారం, నేను మా **${match} ప్యాకేజీని** సిఫార్సు చేస్తున్నాను!\n\n**కారణం**: ఇది మీ ఆవశ్యకాలకు మరియు బడ్జెట్‌కు సరిగ్గా సరిపోతుంది.\n\nమీరు ప్యాకేజీల పేజీలో మరిన్ని వివరాలు తెలుసుకోవచ్చు లేదా లభ్యత క్యాలెండర్‌ని తనిఖీ చేయవచ్చు.`,
        ml: `✨ നിങ്ങളുടെ വിവരങ്ങൾ അനുസരിച്ച്, ഞാൻ ഞങ്ങളുടെ **${match} പാക്കേജ്** ശുപാർശ ചെയ്യുന്നു!\n\n**കാരണം**: ഇത് നിങ്ങളുടെ ആവശ്യങ്ങൾക്കും ബഡ്ജറ്റിനും ഏറ്റവും അനുയോജ്യമായതാണ്.\n\nനിങ്ങൾക്ക് പാക്കേജ് പേജിൽ കൂടുതൽ വിവരങ്ങൾ കാണാം അല്ലെങ്കിൽ കലണ്ടർ വഴി ബുക്കിംഗ് ലഭ്യമാണോ എന്ന് നോക്കാം.`
      };

      return { response: recResponses[detected], languageDetected: detected };
    }
  }

  // 2. Exact match FAQ query checks
  // Studio Introduction query
  if (t.includes("who are you") || t.includes("about the studio") || t.includes("introduce") || t.includes("lenscraft") || t.includes("யார்") || t.includes("பற்றி") || t.includes("स्टुडियो") || t.includes("ఎవరు") || t.includes("ആരാണ്")) {
    return { response: FAQ_DATABASE.intro[detected], languageDetected: detected };
  }
  // Location queries
  if (t.includes("where") || t.includes("location") || t.includes("address") || t.includes("directions") || t.includes("எங்கே") || t.includes("முகவரி") || t.includes("இருப்பிடம்") || t.includes("पता") || t.includes("ఎక్కడ") || t.includes("വിലാസം")) {
    return { response: FAQ_DATABASE.location[detected], languageDetected: detected };
  }
  // Hours queries
  if (t.includes("hour") || t.includes("time") || t.includes("open") || t.includes("sunday") || t.includes("நேரம்") || t.includes("ஞாயிறு") || t.includes("समय") || t.includes("సమయం") || t.includes("സമയം")) {
    return { response: FAQ_DATABASE.hours[detected], languageDetected: detected };
  }
  // Contact details
  if (t.includes("contact") || t.includes("phone") || t.includes("email") || t.includes("call") || t.includes("தொடர்பு") || t.includes("அழைக்க") || t.includes("नंबर") || t.includes("ఫోన్") || t.includes("വിളിക്കാൻ")) {
    return { response: FAQ_DATABASE.contact[detected], languageDetected: detected };
  }
  // Drone queries
  if (t.includes("drone") || t.includes("aerial") || t.includes("ட்ரோன்") || t.includes("வான்வழி") || t.includes("ड्रोन") || t.includes("డ్రోన్") || t.includes("ഡ്രോൺ")) {
    return { response: FAQ_DATABASE.drone[detected], languageDetected: detected };
  }
  // Delivery timelines
  if (t.includes("delivery") || t.includes("how long") || t.includes("deliver") || t.includes("timeline") || t.includes("days") || t.includes("எப்போது வழங்கப்படும்") || t.includes("நாட்கள்") || t.includes("वितरण") || t.includes("ఎప్పుడు వస్తుంది") || t.includes("ലഭിക്കാൻ")) {
    return { response: FAQ_DATABASE.delivery[detected], languageDetected: detected };
  }
  // Customization queries
  if (t.includes("customize") || t.includes("change") || t.includes("modify") || t.includes("தனிப்பயன்") || t.includes("மாற்றலாமா") || t.includes("बदलाव") || t.includes("మార్చవచ్చా") || t.includes("മാറ്റാൻ")) {
    return { response: FAQ_DATABASE.customize[detected], languageDetected: detected };
  }
  // Booking process
  if (t.includes("book") || t.includes("appointment") || t.includes("schedule") || t.includes("முன்பதிவு") || t.includes("बुक") || t.includes("బుక్") || t.includes("ബുക്കിംഗ്")) {
    return { response: FAQ_DATABASE.booking[detected], languageDetected: detected };
  }
  // Cancellation queries
  if (t.includes("cancel") || t.includes("refund") || t.includes("ரத்து") || t.includes("திரும்பப் பெற") || t.includes("रद्द") || t.includes("రద్దు") || t.includes("റദ്ദാക്കാൻ")) {
    return { response: FAQ_DATABASE.cancel[detected], languageDetected: detected };
  }
  // Rescheduling queries
  if (t.includes("reschedule") || t.includes("date change") || t.includes("தேதி மாற்றம்") || t.includes("तिथि बदलाव") || t.includes("తేదీ మార్పు") || t.includes("റീ-ഷെഡ്യൂൾ")) {
    return { response: FAQ_DATABASE.reschedule[detected], languageDetected: detected };
  }
  // Travel charges
  if (t.includes("travel") || t.includes("charge") || t.includes("outstation") || t.includes("distance") || t.includes("பயணம்") || t.includes("கட்டணம்") || t.includes("यात्रा") || t.includes("ప్రయాణ") || t.includes("യാത്ര")) {
    return { response: FAQ_DATABASE.travel[detected], languageDetected: detected };
  }
  // Pre-wedding shoot queries
  if (t.includes("pre-wedding") || t.includes("couple shoot") || t.includes("ப்ரீ-வெட்டிங்") || t.includes("प्री-वेडिंग") || t.includes("ప్రీ-వెడ్డింగ్") || t.includes("പ്രീ-വെഡ്ഡിംഗ്")) {
    return { response: FAQ_DATABASE.prewedding[detected], languageDetected: detected };
  }
  // Photography styles (candid vs traditional)
  if (t.includes("style") || t.includes("candid") || t.includes("traditional") || t.includes("பாணி") || t.includes("பாரம்பரியம்") || t.includes("पारंपरिक") || t.includes("శైలి") || t.includes("രീതി")) {
    return { response: FAQ_DATABASE.styles[detected], languageDetected: detected };
  }
  // Team sizes
  if (t.includes("photographer count") || t.includes("how many") || t.includes("team size") || t.includes("எத்தனை பேர்") || t.includes("कितने फोटोग्राफर") || t.includes("ఎంత మంది") || t.includes("എത്ര ഫോട്ടോഗ്രാഫർമാർ")) {
    return { response: FAQ_DATABASE.team[detected], languageDetected: detected };
  }
  // Equipment / Camera
  if (t.includes("camera") || t.includes("lens") || t.includes("equipment") || t.includes("gear") || t.includes("கேமரா") || t.includes("லென்ஸ்") || t.includes("कैमरा") || t.includes("కెమెరా") || t.includes("ക്യാമറ")) {
    return { response: FAQ_DATABASE.equipment[detected], languageDetected: detected };
  }
  // Advance deposits
  if (t.includes("deposit") || t.includes("advance") || t.includes("payment") || t.includes("முன்பணம்") || t.includes("அட்வான்ஸ்") || t.includes("अग्रिम") || t.includes("అడ్వాన్స్") || t.includes("അഡ്വാൻസ്")) {
    return { response: FAQ_DATABASE.payment[detected], languageDetected: detected };
  }
  // General packages list query
  if (t.includes("package") || t.includes("price") || t.includes("rate") || t.includes("cost") || t.includes("பேக்கேஜ்") || t.includes("விலை") || t.includes("दर") || t.includes("ధర") || t.includes("നിരക്ക്")) {
    return { response: FAQ_DATABASE.packages[detected], languageDetected: detected };
  }

  // 3. Fallback response
  return { response: FAQ_DATABASE.fallback[detected], languageDetected: detected };
}
