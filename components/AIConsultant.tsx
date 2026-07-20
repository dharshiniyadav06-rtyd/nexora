'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { X, Send, Aperture, ChevronRight, Minimize2, Globe } from 'lucide-react';
import { queryFAQ, detectLanguage, SupportedLanguage, SessionContext } from '@/services/chatbotEngine';

interface Message {
  role: 'assistant' | 'user';
  text: string;
}

const WELCOME_MESSAGES: { [lang in SupportedLanguage]: Message[] } = {
  en: [
    {
      role: 'assistant',
      text: `👋 Welcome to LensCraft Studio!\n\nI'm your AI Wedding Consultant. I can help you:\n• Compare Packages\n• Calculate Custom Budget\n• Check Available Dates\n• Recommend Photography Tiers\n\nHow can I assist you today?`
    }
  ],
  ta: [
    {
      role: 'assistant',
      text: `👋 லென்ஸ்கிராஃப்ட் ஸ்டுடியோவிற்கு வரவேற்கிறோம்!\n\nநான் உங்கள் AI திருமண ஆலோசகர். நான் உங்களுக்கு உதவ முடியும்:\n• பேக்கேஜ்களை ஒப்பிடுதல்\n• பட்ஜெட்டை கணக்கிடுதல்\n• தேதிகளை சரிபார்த்தல்\n\nஇன்று நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?`
    }
  ],
  hi: [
    {
      role: 'assistant',
      text: `👋 लेंसक्राफ्ट स्टूडियो में आपका स्वागत है!\n\nमैं आपका AI विवाह सलाहकार हूँ। मैं आपकी सहायता कर सकता हूँ:\n• पैकेजों की तुलना करने में\n• बजट का अनुमान लगाने में\n• उपलब्ध तिथियों की जांच करने में\n\nआज मैं आपकी क्या सहायता कर सकता हूँ?`
    }
  ],
  te: [
    {
      role: 'assistant',
      text: `👋 లెన్స్‌క్రాఫ్ట్ స్టూడియోకి స్వాగతం!\n\nనేను మీ AI వెడ్డింగ్ కన్సల్టెంట్. నేను మీకు సహాయం చేయగలను:\n• ప్యాకేజీలను పోల్చడం\n• బడ్జెట్‌ను లెక్కించడం\n• అందుబాటులో ఉన్న తేదీలను తనిఖీ చేయడం\n\nనేను మీకు ఈ రోజు ఎలా సహాయపడగలను?`
    }
  ],
  ml: [
    {
      role: 'assistant',
      text: `👋 ലെൻസ്ക്രാഫ്റ്റ് സ്റ്റുഡിയോയിലേക്ക് സ്വാഗതം!\n\nഞാൻ നിങ്ങളുടെ AI വെഡ്ഡിംഗ് കൺസൾട്ടന്റാണ്. ഞാൻ നിങ്ങളെ സഹായിക്കാം:\n• പാക്കേജുകൾ താരതമ്യം ചെയ്യാൻ\n• ബഡ്ജറ്റ് കണക്കാക്കാൻ\n• ലഭ്യമായ തീയതികൾ പരിശോധിക്കാൻ\n\nഇന്ന് ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കണം?`
    }
  ]
};

const SUGGESTED_QUESTIONS: { [lang in SupportedLanguage]: string[] } = {
  en: [
    "Which package is best for my wedding?",
    "What is included in the Gold package?",
    "Is my wedding date available?",
    "Can I customize a package?",
    "Do you provide drone photography?",
    "How much will my wedding photography cost?",
    "How many photographers will cover my event?",
    "How can I book an appointment?",
    "Where is your studio located?",
    "How long will photo delivery take?"
  ],
  ta: [
    "என் திருமணத்திற்கு எந்த பேக்கேஜ் சிறந்தது?",
    "கோல்ட் பேக்கேஜில் என்ன சேர்க்கப்பட்டுள்ளது?",
    "என் திருமண தேதி கிடைக்குமா?",
    "நான் ஒரு பேக்கேஜை தனிப்பயனாக்கலாமா?",
    "ட்ரோன் புகைப்படம் வழங்குகிறீர்களா?",
    "திருமண புகைப்படத்திற்கான செலவு எவ்வளவு?",
    "எத்தனை புகைப்படக் கலைஞர்கள் வருவார்கள்?",
    "நான் எவ்வாறு சந்திப்பை முன்பதிவு செய்வது?",
    "உங்கள் ஸ்டுடியோ எங்குள்ளது?",
    "புகைப்படங்கள் கிடைக்க எவ்வளவு நாட்கள் ஆகும்?"
  ],
  hi: [
    "मेरी शादी के लिए कौन सा पैकेज सबसे अच्छा है?",
    "गोल्ड पैकेज में क्या शामिल है?",
    "क्या मेरी शादी की तारीख उपलब्ध है?",
    "क्या मैं पैकेज को कस्टमाइज़ कर सकता हूँ?",
    "क्या आप ड्रोन फोटोग्राफी प्रदान करते हैं?",
    "मेरी शादी की फोटोग्राफी की लागत कितनी होगी?",
    "कितने फोटोग्राफर मेरे इवेंट को कवर करेंगे?",
    "मैं अपॉइंटमेंट कैसे बुक कर सकता हूँ?",
    "आपका स्टूडियो कहाँ स्थित है?",
    "फोटो डिलीवरी में कितना समय लगेगा?"
  ],
  te: [
    "నా పెళ్లికి ఏ ప్యాకేజీ ఉత్తమం?",
    "గోల్డ్ ప్యాకేజీలో ఏముంటుంది?",
    "నా పెళ్లి తేదీ ఖాళీగా ఉందా?",
    "నేను ప్యాకేజీని మార్చుకోవచ్చా?",
    "మీరు డ్రోన్ ఫోటోగ్రఫీ ఇస్తారా?",
    "నా పెళ్లి ఫోటోగ్రఫీకి ఎంత ఖర్చవుతుంది?",
    "ఎంత మంది ఫోటోగ്രാఫర్లు వస్తారు?",
    "నేను అపాయింట్‌మెంట్ ఎలా బుక్ చేయాలి?",
    "మీ స్టுడియో ఎక్కడ ఉంది?",
    "ఫోటోలు రావడానికి ఎంత సమయం పడుతుంది?"
  ],
  ml: [
    "എന്റെ വിവാഹത്തിന് ഏത് പാക്കേജാണ് നല്ലത്?",
    "ഗോൾഡ് പാക്കേജിൽ എന്തൊക്കെ ഉൾപ്പെടുന്നു?",
    "എന്റെ വിവാഹ തീയതി ലഭ്യമാണോ?",
    "എനിക്ക് പാക്കേജ് മാറ്റാൻ കഴിയുമോ?",
    "നിങ്ങൾ ഡ്രോൺ ഫോട്ടോഗ്രാഫി നൽകുമോ?",
    "എന്റെ വെഡ്ഡിംഗ് ഫോട്ടോഗ്രാഫിക്ക് എത്ര ചിലവാകും?",
    "എത്ര ഫോട്ടോഗ്രാഫർമാർ ഉണ്ടാകും?",
    "ഞാൻ എങ്ങനെ ബുക്കിംഗ് ചെയ്യും?",
    "നിങ്ങളുടെ സ്റ്റുഡിയോ എവിടെയാണ്?",
    "ഫോട്ടോകൾ ലഭിക്കാൻ എത്ര സമയമെടുക്കും?"
  ]
};

const quickActions = [
  { label: 'Explore Packages', href: '/packages' },
  { label: 'Calculate Budget', href: '/packages#calculator' },
  { label: 'Check Dates', href: '/calendar' },
  { label: 'Book Consultation', href: '/calendar' },
];

export default function AIConsultant() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<SupportedLanguage>('en');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Session Chatbot Context state
  const [chatContext, setChatContext] = useState<SessionContext>({
    detectedLanguage: 'en'
  });

  // Set initial welcome messages when language changes
  useEffect(() => {
    setMessages(WELCOME_MESSAGES[lang]);
    setChatContext((prev) => ({ ...prev, detectedLanguage: lang }));
  }, [lang]);

  // Show welcome tooltip on first visit
  useEffect(() => {
    const seen = sessionStorage.getItem('ai-welcome-seen');
    if (!seen) {
      const t = setTimeout(() => { setShowWelcome(true); }, 2500);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    if (open) {
      setShowWelcome(false);
      sessionStorage.setItem('ai-welcome-seen', '1');
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [open, messages]);

  const handleSendMessage = (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    // Detect language of user query
    const detectedLang = detectLanguage(trimmed);
    
    // Switch language in UI naturally if a different language is detected
    if (detectedLang !== lang && chatContext.pendingRecommendationStep === undefined) {
      setLang(detectedLang);
    }

    const userMsg: Message = { role: 'user', text: trimmed };
    
    // Call engine query FAQ with context
    const currentContext = { ...chatContext, detectedLanguage: detectedLang };
    const { response: aiText, languageDetected } = queryFAQ(trimmed, currentContext);
    
    const aiMsg: Message = { role: 'assistant', text: aiText };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setChatContext(currentContext);
    setInput('');
  };

  const selectLanguage = (newLang: SupportedLanguage) => {
    setLang(newLang);
  };

  return (
    <>
      {/* Welcome tooltip */}
      {showWelcome && !open && (
        <div
          className="fixed bottom-[92px] right-6 z-50 w-72 glass-card rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)] animate-fade-up cursor-pointer"
          onClick={() => { setOpen(true); setShowWelcome(false); }}
        >
          <button
            className="absolute top-2 right-2 text-[#F2E7D8]/60 hover:text-white"
            onClick={(e) => { e.stopPropagation(); setShowWelcome(false); }}
          >
            <X size={14} />
          </button>
          <p className="text-xs text-[#E5C687] font-semibold mb-1 uppercase tracking-wide">AI Wedding Consultant</p>
          <p className="text-sm text-[#F2E7D8]/90 leading-relaxed">
            Need help choosing a package or checking dates? I&apos;m here to assist! ✨
          </p>
          <div className="flex items-center gap-1 mt-2 text-xs text-[#E5C687] font-medium">
            <span>Start Chat</span>
            <ChevronRight size={12} />
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen((p) => !p)}
        aria-label="Open AI Wedding Consultant"
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gold-gradient flex items-center justify-center shadow-[0_4px_20px_rgba(212,175,55,0.5)] transition-all duration-300 hover:scale-110 ${
          open ? 'rotate-90' : 'animate-pulse-glow'
        }`}
      >
        {open ? (
          <X size={22} className="text-[#1F1713]" />
        ) : (
          <Aperture size={24} className="text-[#1F1713]" />
        )}
      </button>

      {/* Chat Panel */}
      <div
        className={`fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-96 h-[500px] flex flex-col rounded-3xl overflow-hidden glass-card luxury-shadow transition-all duration-400 ${
          open ? 'opacity-100 translate-y-0 pointer-events-auto scale-100' : 'opacity-0 translate-y-4 pointer-events-none scale-95'
        }`}
        style={{ transformOrigin: 'bottom right' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#D4AF37] to-[#E5C687]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#1F1713] flex items-center justify-center">
              <Aperture size={18} className="text-[#E5C687]" />
            </div>
            <div>
              <p className="text-[#1F1713] font-semibold text-sm leading-none">LensCraft AI</p>
              <p className="text-[#1F1713]/70 text-[10px] mt-1 font-medium uppercase tracking-wider">Wedding Consultant</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-[#1F1713]/70 hover:text-[#1F1713] transition-colors"
          >
            <Minimize2 size={18} />
          </button>
        </div>

        {/* Multilingual Selector Panel */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#2A1F1A]/85 border-b border-[rgba(229,198,135,0.15)] flex-shrink-0">
          <span className="text-[9px] uppercase tracking-widest text-[#F2E7D8]/60 flex items-center gap-1 font-semibold">
            <Globe size={11} className="text-[#E5C687]" /> Language / மொழி
          </span>
          <div className="flex gap-1.5 text-[9px] font-semibold">
            <button
              onClick={() => selectLanguage("en")}
              className={`px-2 py-0.5 rounded transition-all ${lang === 'en' ? 'bg-[#E5C687] text-[#1F1713]' : 'text-[#F2E7D8]/70 hover:text-white'}`}
            >
              EN
            </button>
            <button
              onClick={() => selectLanguage("ta")}
              className={`px-2 py-0.5 rounded transition-all ${lang === 'ta' ? 'bg-[#E5C687] text-[#1F1713]' : 'text-[#F2E7D8]/70 hover:text-white'}`}
            >
              தமிழ்
            </button>
            <button
              onClick={() => selectLanguage("hi")}
              className={`px-2 py-0.5 rounded transition-all ${lang === 'hi' ? 'bg-[#E5C687] text-[#1F1713]' : 'text-[#F2E7D8]/70 hover:text-white'}`}
            >
              हिंदी
            </button>
            <button
              onClick={() => selectLanguage("te")}
              className={`px-2 py-0.5 rounded transition-all ${lang === 'te' ? 'bg-[#E5C687] text-[#1F1713]' : 'text-[#F2E7D8]/70 hover:text-white'}`}
            >
              తెలుగు
            </button>
            <button
              onClick={() => selectLanguage("ml")}
              className={`px-2 py-0.5 rounded transition-all ${lang === 'ml' ? 'bg-[#E5C687] text-[#1F1713]' : 'text-[#F2E7D8]/70 hover:text-white'}`}
            >
              മലയാളം
            </button>
          </div>
        </div>

        {/* Suggested Questions Section */}
        <div className="bg-[#1F1713]/40 border-b border-[rgba(229,198,135,0.1)] px-4 py-2 flex flex-col gap-1 flex-shrink-0">
          <span className="text-[8px] uppercase tracking-wider text-[#F2E7D8]/50 font-bold">Suggested Questions</span>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {SUGGESTED_QUESTIONS[lang].map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="flex-shrink-0 text-[10px] bg-[#4B3628]/40 hover:bg-[#4B3628]/80 text-[#E5C687] border border-[rgba(229,198,135,0.15)] px-3 py-1 rounded-full transition-colors whitespace-nowrap font-light"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions Links */}
        <div className="flex gap-2 px-4 py-2.5 overflow-x-auto border-b border-[rgba(229,198,135,0.15)] bg-[#1F1713]/25 flex-shrink-0">
          {quickActions.map((a) => (
            <button
              key={a.label}
              onClick={() => { setOpen(false); router.push(a.href); }}
              className="flex-shrink-0 text-[9px] px-2.5 py-1 rounded-full border border-[rgba(229,198,135,0.3)] text-[#F2E7D8]/80 hover:text-[#E5C687] hover:bg-[#4B3628] transition-colors duration-200 whitespace-nowrap font-semibold uppercase tracking-wider"
            >
              {a.label}
            </button>
          ))}
        </div>

        {/* Messages History */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0 bg-[#1F1713]/10">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-[#D4AF37] to-[#A97142] text-[#1F1713] font-semibold rounded-br-sm shadow-md'
                    : 'bg-[#4B3628]/85 text-[#F2E7D8] border border-[rgba(229,198,135,0.15)] rounded-bl-sm shadow-xl'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="px-4 py-3 border-t border-[rgba(229,198,135,0.15)] bg-[#2A1F1A]/95 flex items-center gap-3 flex-shrink-0">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(input)}
            placeholder={
              lang === 'ta' ? "கேள்விகளைக் கேளுங்கள்..." :
              lang === 'hi' ? "प्रश्न पूछें..." :
              lang === 'te' ? "ప్రశ్న అడగండి..." :
              lang === 'ml' ? "ചോദിക്കൂ..." : "Ask about packages, dates..."
            }
            className="flex-1 bg-[#1F1713]/60 border border-[rgba(229,198,135,0.2)] rounded-xl px-4 py-2.5 text-xs text-[#F2E7D8] placeholder-[#F2E7D8]/40 focus:outline-none focus:border-[#E5C687] transition-colors duration-200"
          />
          <button
            onClick={() => handleSendMessage(input)}
            disabled={!input.trim()}
            className="w-9 h-9 rounded-xl gold-gradient flex items-center justify-center text-[#1F1713] disabled:opacity-40 hover:opacity-90 transition-opacity duration-200 flex-shrink-0"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </>
  );
}
