import { LanguageCode } from "@/types/market";

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  taglineSub: string;
  navDashboard: string;
  navExplorer: string;
  navCompare: string;
  navAdvisor: string;
  navTrends: string;
  navAlerts: string;
  navMyCrops: string;
  navFavorites: string;
  navTransport: string;
  heroTitle: string;
  heroSub: string;
  heroBtnPrimary: string;
  heroBtnSecondary: string;
  greetingAfternoon: string;
  findBestMarketBtn: string;
  compareBeforeYouGo: string;
  selectCrop: string;
  enterQuantity: string;
  enterLocation: string;
  calculateBtn: string;
  grossValue: string;
  transportCost: string;
  netValue: string;
  marketScore: string;
  whyRecommendation: string;
  dataSourceLabel: string;
  demoDataBadge: string;
  lastUpdatedLabel: string;
  disclaimer: string;
}

export const TRANSLATIONS: Record<LanguageCode, TranslationDictionary> = {
  en: {
    appName: "AgriMitra AI",
    tagline: "Know the market. Choose smarter. Earn better.",
    taglineSub: "AI-powered agricultural decision support for Indian farmers.",
    navDashboard: "Dashboard",
    navExplorer: "Market Explorer",
    navCompare: "Compare Markets",
    navAdvisor: "AI Market Advisor",
    navTrends: "Price Trends",
    navAlerts: "Market Alerts",
    navMyCrops: "My Crops",
    navFavorites: "Favorite Markets",
    navTransport: "Transport Calculator",
    heroTitle: "Make smarter crop-selling decisions with AI.",
    heroSub: "Compare mandi prices, arrivals and market trends in one simple place.",
    heroBtnPrimary: "Explore Market Prices",
    heroBtnSecondary: "Try AI Market Advisor",
    greetingAfternoon: "Good afternoon 🌾",
    findBestMarketBtn: "Find the best market for my crop",
    compareBeforeYouGo: "Compare Before You Go to the Mandi",
    selectCrop: "Select Crop",
    enterQuantity: "Enter Quantity (Quintals)",
    enterLocation: "Your Village / Town Location",
    calculateBtn: "Compare Markets & Returns",
    grossValue: "Gross Value",
    transportCost: "Estimated Transport Cost",
    netValue: "Estimated Value After Transport",
    marketScore: "Market Score",
    whyRecommendation: "Why this recommendation?",
    dataSourceLabel: "Data Source",
    demoDataBadge: "Demo / Historical Market Data",
    lastUpdatedLabel: "Last Updated",
    disclaimer: "Estimates only. Actual auction prices and fees at the mandi may vary. Never claims guaranteed profit.",
  },
  te: {
    appName: "అగ్రిమిత్ర AI (AgriMitra AI)",
    tagline: "మార్కెట్‌ని అర్థం చేసుకోండి. తెలివిగా ఎంచుకోండి. ఎక్కువ సంపాదించండి.",
    taglineSub: "రైతుల కోసం కృత్రిమ మేధస్సు ఆధారిత మార్కెట్ సమాచారం.",
    navDashboard: "డాష్‌బోర్డ్ (Dashboard)",
    navExplorer: "మార్కెట్ ఎక్స్‌ప్లోరర్",
    navCompare: "మార్కెట్ల పోలిక (Compare)",
    navAdvisor: "AI మార్కెట్ అడ్వైజర్",
    navTrends: "ధరల ధోరణి (Trends)",
    navAlerts: "హెచ్చరికలు (Alerts)",
    navMyCrops: "నా పంటలు (My Crops)",
    navFavorites: "నా ఇష్టమైన మార్కెట్లు",
    navTransport: "రవాణా క్యాలిక్యులేటర్",
    heroTitle: "AI సహాయంతో పంట అమ్మకాల్లో ఉత్తమ నిర్ణయాలు తీసుకోండి.",
    heroSub: "వివిధ మండిల ధరలు, దిగుబడులు మరియు ధోరణులను ఒకే చోట పోల్చి చూడండి.",
    heroBtnPrimary: "మార్కెట్ ధరలు చూడండి",
    heroBtnSecondary: "AI అడ్వైజర్‌ని అడగండి",
    greetingAfternoon: "శుభ మధ్యాహ్నం 🌾",
    findBestMarketBtn: "నా పంటకు ఉత్తమ మార్కెట్ వెతకండి",
    compareBeforeYouGo: "మండికి వెళ్లేముందు పోల్చి చూడండి",
    selectCrop: "పంటను ఎంచుకోండి",
    enterQuantity: "పరిమాణం (క్వింటాళ్లలో)",
    enterLocation: "మీ గ్రామం / ప్రాంతం",
    calculateBtn: "మార్కెట్ లాభాలను పోల్చండి",
    grossValue: "మొత్తం పంట విలువ",
    transportCost: "అంచనా రవాణా ఖర్చు",
    netValue: "రవాణా తర్వాత నికర ఆదాయం",
    marketScore: "మార్కెట్ స్కోర్",
    whyRecommendation: "ఈ సిఫార్సు ఎందుకు?",
    dataSourceLabel: "సమాచార మూలం",
    demoDataBadge: "డెమో / చారిత్రక మార్కెట్ డేటా",
    lastUpdatedLabel: "చివరిగా అప్‌డేట్ చేసిన సమయం",
    disclaimer: "ఇవి అంచనాలు మాత్రమే. మండిలోని వేలం మరియు రుసుములను బట్టి చివరి ధర మారవచ్చు.",
  },
  kn: {
    appName: "ಅಗ್ರಿಮಿತ್ರ AI (AgriMitra AI)",
    tagline: "ಮಾರುಕಟ್ಟೆ ತಿಳಿಯಿರಿ. ಬುದ್ಧಿವಂತಿಕೆಯಿಂದ ಆಯ್ಕೆಮಾಡಿ. ಉತ್ತಮ ಗಳಿಕೆ ಮಾಡಿ.",
    taglineSub: "ರೈತರಿಗಾಗಿ AI ಚಾಲಿತ ಮಾರುಕಟ್ಟೆ ನಿರ್ಧಾರ ಬೆಂಬಲ.",
    navDashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ (Dashboard)",
    navExplorer: "ಮಾರುಕಟ್ಟೆ ಶೋಧಕ",
    navCompare: "ಮಾರುಕಟ್ಟೆ ಹೋಲಿಕೆ",
    navAdvisor: "AI ಮಾರುಕಟ್ಟೆ ಸಲಹೆಗಾರ",
    navTrends: "ಬೆಲೆ ಪ್ರವೃತ್ತಿಗಳು (Trends)",
    navAlerts: "ಮಾರುಕಟ್ಟೆ ಎಚ್ಚರಿಕೆಗಳು",
    navMyCrops: "ನನ್ನ ಬೆಳೆಗಳು (My Crops)",
    navFavorites: "ನೆಚ್ಚಿನ ಮಾರುಕಟ್ಟೆಗಳು",
    navTransport: "ಸಾರಿಗೆ ಕ್ಯಾಲ್ಕುಲೇಟರ್",
    heroTitle: "AI ಜೊತೆಗೆ ಉತ್ತಮ ಬೆಳೆ ಮಾರಾಟ ನಿರ್ಧಾರಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ.",
    heroSub: "ಮಂಡಿ ಬೆಲೆಗಳು, ಆವಕ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಪ್ರವೃತ್ತಿಗಳನ್ನು ಒಂದೇ ಸರಳ ಸ್ಥಳದಲ್ಲಿ ಹೋಲಿಕೆ ಮಾಡಿ.",
    heroBtnPrimary: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳನ್ನು ನೋಡಿ",
    heroBtnSecondary: "AI ಸಲಹೆಗಾರನನ್ನು ಕೇಳಿ",
    greetingAfternoon: "ಶುಭ ಮಧ್ಯಾಹ್ನ 🌾",
    findBestMarketBtn: "ನನ್ನ ಬೆಳೆಗೆ ಅತ್ಯುತ್ತಮ ಮಾರುಕಟ್ಟೆ ಹುಡುಕಿ",
    compareBeforeYouGo: "ಮಂಡಿಗೆ ಹೋಗುವ ಮೊದಲು ಹೋಲಿಕೆ ಮಾಡಿ",
    selectCrop: "ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    enterQuantity: "ಪ್ರಮಾಣ (ಕ್ವಿಂಟಾಲ್‌ನಲ್ಲಿ)",
    enterLocation: "ನಿಮ್ಮ ಊರು / ಸ್ಥಳ",
    calculateBtn: "ಮಾರುಕಟ್ಟೆಗಳನ್ನು ಹೋಲಿಕೆ ಮಾಡಿ",
    grossValue: "ಒಟ್ಟು ಅಂದಾಜು ಮೌಲ್ಯ",
    transportCost: "ಅಂದಾಜು ಸಾರಿಗೆ ವೆಚ್ಚ",
    netValue: "ಸಾರಿಗೆ ನಂತರದ ನಿವ್ವಳ ಮೌಲ್ಯ",
    marketScore: "ಮಾರುಕಟ್ಟೆ ಸ್ಕೋರ್",
    whyRecommendation: "ಈ ಸಲಹೆ ಏಕೆ?",
    dataSourceLabel: "ಡೇಟಾ ಮೂಲ",
    demoDataBadge: "ಡೆಮೊ / ಐತಿಹಾಸಿಕ ಮಾರುಕಟ್ಟೆ ಡೇಟಾ",
    lastUpdatedLabel: "ಕೊನೆಯದಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ",
    disclaimer: "ಇವು ಅಂದಾಜುಗಳು ಮಾತ್ರ. ಮಂಡಿಯಲ್ಲಿನ ಹರಾಜು ಬೆಲೆಗಳು ವ್ಯತ್ಯಾಸವಾಗಬಹುದು.",
  },
  hi: {
    appName: "कृषि मित्र AI (AgriMitra AI)",
    tagline: "बाज़ार समझें। सही चुनें। बेहतर कमाएं।",
    taglineSub: "भारतीय किसानों के लिए एआई-संचालित मंडी निर्णय सहायता।",
    navDashboard: "डैशबोर्ड (Dashboard)",
    navExplorer: "मार्केट एक्सप्लोरर",
    navCompare: "मंडी तुलना (Compare)",
    navAdvisor: "AI मार्केट एडवाइजर",
    navTrends: "मूल्य रुझान (Trends)",
    navAlerts: "मार्केट अलर्ट",
    navMyCrops: "मेरी फसलें (My Crops)",
    navFavorites: "पसंदीदा मंडियां",
    navTransport: "परिवहन कैलकुलेटर",
    heroTitle: "AI के साथ फसल बेचने का सही और स्मार्ट निर्णय लें।",
    heroSub: "विभिन्न मंडियों के भाव, आवक और रुझान एक ही आसान जगह पर तुलना करें।",
    heroBtnPrimary: "मंडी भाव देखें",
    heroBtnSecondary: "AI सलाहकार से पूछें",
    greetingAfternoon: "शुभ अपराह्न 🌾",
    findBestMarketBtn: "मेरी फसल के लिए सबसे अच्छी मंडी खोजें",
    compareBeforeYouGo: "मंडी जाने से पहले तुलना करें",
    selectCrop: "फसल चुनें",
    enterQuantity: "मात्रा (क्विंटल में)",
    enterLocation: "आपका गांव / स्थान",
    calculateBtn: "मंडी और लाभ की तुलना करें",
    grossValue: "अनुमानित कुल मूल्य",
    transportCost: "अनुमानित परिवहन खर्च",
    netValue: "परिवहन के बाद शुद्ध लाभ",
    marketScore: "मार्केट स्कोर",
    whyRecommendation: "यह सिफारिश क्यों?",
    dataSourceLabel: "डेटा स्रोत",
    demoDataBadge: "डेमो / ऐतिहासिक बाजार डेटा",
    lastUpdatedLabel: "अंतिम अपडेट",
    disclaimer: "केवल अनुमानित आंकड़े। मंडी में अंतिम बोली और शुल्क भिन्न हो सकते हैं।",
  },
};
