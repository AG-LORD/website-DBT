import React, { useState, useRef, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { ScrollArea } from "./components/ui/scroll-area";
import { Input } from "./components/ui/input";
import { InvokeLLM } from "./integrations/Core";

import {
  MessageCircle,
  X,
  Send,
  Book,
  FileText,
  CreditCard,
  Clock,
  Globe,
  Phone,
  ArrowLeft,
  Bot,
  CheckCircle2,
  ListChecks,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/ui/accordion";


export default function ChatBot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [currentView, setCurrentView] = useState("main");
  const [language, setLanguage] = useState("en");
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const scrollAreaRef = useRef(null);

  // Auto-scroll when messages or typing or view changes
  useEffect(() => {
    if (chatEndRef.current) {
      setTimeout(() => {
        chatEndRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 100);
    }
  }, [messages, isTyping, currentView]);

  // Focus input when chat opens
  useEffect(() => {
    if (isChatOpen && currentView === "chat") {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isChatOpen, currentView]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) {
      setIsFaqOpen(false);
      if (messages.length === 0) {
        setMessages([
          {
            id: Date.now(),
            type: "bot",
            content:
              language === "en"
                ? "👋 Hello! I'm DBT Buddy, your intelligent scholarship assistant. You can ask me anything about DBT, scholarships, or use the quick buttons below!"
                : "👋 नमस्ते! मैं डीबीटी मित्र हूं, आपका बुद्धिमान छात्रवृत्ति सहायक। आप मुझसे DBT, छात्रवृत्ति के बारे में कुछ भी पूछ सकते हैं या नीचे दिए गए त्वरित बटन का उपयोग कर सकते हैं!",
            timestamp: new Date(),
          },
        ]);
      }
    }
  };

  const toggleFaq = () => {
    setIsFaqOpen(!isFaqOpen);
    if (!isFaqOpen) setIsChatOpen(false);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: userInput,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsTyping(true);

    try {
      const context = `
You are DBT Buddy, an intelligent assistant for Direct Benefit Transfer (DBT) and scholarship related queries in India. You help students with:
1. DBT and scholarship information
2. Application processes
3. Document requirements
4. Banking and Aadhaar linking
5. Payment issues and delays
6. Portal navigation (NSP, MahaDBT)
7. Grievance procedures

Key Information:
- DBT requires Aadhaar-seeded bank accounts
- NSP (scholarships.gov.in) for central schemes
- MahaDBT for Maharashtra state schemes
- Common schemes: Post-Matric (SC/ST/OBC), Merit-cum-Means, etc.
- Income limits typically ₹2.5-8 lakh depending on scheme
- Documents needed: Aadhaar, Income cert, Caste cert, Bank passbook, etc.

Respond helpfully in ${
        language === "en" ? "English" : "Hindi"
      } and keep responses concise but informative.
`;

      const response = await InvokeLLM({
        prompt: `${context}\n\nUser Question: ${userInput}`,
        add_context_from_internet: false,
      });

      const botMessage = {
        id: Date.now() + 1,
        type: "bot",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        type: "bot",
        content:
          language === "en"
            ? "Sorry, I'm having trouble connecting right now. Please try again or use the quick buttons below."
            : "क्षमा करें, मुझे अभी कनेक्ट करने में समस्या हो रही है। कृपया फिर से कोशिश करें या नीचे दिए गए त्वरित बटन का उपयोग करें।",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickResponse = async (optionId) => {
    const quickMessage = {
      id: Date.now(),
      type: "user",
      content:
        mainOptions.find((opt) => opt.id === optionId)?.label[language] || optionId,
      timestamp: new Date(),
    };

    const botMessage = {
      id: Date.now() + 1,
      type: "bot",
      content: responses[language][optionId] || "Response not found.",
      timestamp: new Date(),
    };

    setCurrentView("chat");
    setMessages((prev) => [...prev, quickMessage, botMessage]);
  };

  const startNewChat = () => {
    setCurrentView("chat");
    setMessages([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const mainOptions = [
    {
      id: "schemes",
      icon: Book,
      label: {
        en: "📚 Scholarship Schemes & Eligibility",
        hi: "📚 छात्रवृत्ति योजनाएं और पात्रता",
      },
    },
    {
      id: "documents",
      icon: FileText,
      label: {
        en: "🧾 Document Requirements",
        hi: "🧾 दस्तावेज़ की आवश्यकताएं",
      },
    },
    {
      id: "banking",
      icon: CreditCard,
      label: {
        en: "🏦 Aadhaar Seeding & Bank Linking",
        hi: "🏦 आधार सीडिंग और बैंक लिंकिंग",
      },
    },
    {
      id: "delays",
      icon: Clock,
      label: {
        en: "⏳ Payment Delays / Rejections",
        hi: "⏳ भुगतान विलंब / अस्वीकरण",
      },
    },
    {
      id: "portal",
      icon: Globe,
      label: {
        en: "🌐 NSP / MahaDBT Portal Issues",
        hi: "🌐 NSP / MahaDBT पोर्टल समस्याएं",
      },
    },
    {
      id: "grievance",
      icon: Phone,
      label: {
        en: "📞 Lodge a Grievance",
        hi: "📞 शिकायत दर्ज करें",
      },
    },
  ];

  const responses = {
    en: {
      welcome:
        "👋 Hello! I'm DBT Buddy, your intelligent scholarship assistant. You can ask me anything about DBT, scholarships, or use the quick options below!",
      schemes: `Here’s an overview of popular DBT scholarships and their eligibility:

🎓 Central Schemes (via NSP):
- Post-Matric Scholarship for SC/ST/OBC Students
  👉 For students studying in Class 11 & above, parental income < ₹2.5 lakh.
- Merit-cum-Means Scholarship for Professional & Technical Courses
  👉 For students pursuing UG/PG technical courses, income < ₹2.5 lakh.
- National Fellowship & Scholarship for Higher Education of ST Students
  👉 For ST students pursuing MPhil/PhD, income < ₹6 lakh.

🏫 State Schemes (via MahaDBT):
- Government of Maharashtra Post-Matric Scholarship (SC/OBC/SBC/VJNT)
  👉 Income limit: ₹2.5 – ₹8 lakh depending on category.
- Eklavya Scholarship
  👉 For graduate students securing ≥ 60% marks, income < ₹75,000.
- Dr. Panjabrao Deshmukh Hostel Maintenance Allowance
  👉 For students in hostels, income < ₹8 lakh.

ℹ️ Tip: Always check your portal (NSP/MahaDBT) for updated scheme details.

Would you like me to share ➡️ *Required Documents* for applying?`,
      documents: `📑 Common documents required for most DBT scholarships:

1. Aadhaar Card (linked with bank account)
2. Caste Certificate (SC/ST/OBC/VJNT/SBC – as applicable)
3. Income Certificate (issued by competent authority, usually Tahsildar)
4. Domicile Certificate (for state schemes)
5. Marksheet of previous qualifying examination
6. Fee Receipt / Admission Proof (college/institute)
7. Bank Passbook (first page scan with IFSC & account number visible)
8. Bonafide Certificate from Institute
9. Disability Certificate (if applicable)

⚠️ Note: Documents must be clear scans, in PDF/JPEG format, under the size limits set by NSP/MahaDBT.

Do you want to know about ➡️ *Aadhaar & Bank Linking* next?`,
      banking: `🏦 To receive DBT benefits, your Aadhaar must be seeded with your bank account. Here’s how:

✅ Step 1: Visit your bank branch with Aadhaar & passbook.
✅ Step 2: Fill Aadhaar seeding form & submit.
✅ Step 3: You will get a confirmation SMS once linked.

📌 Check Aadhaar-Bank linking status:
- Go to UIDAI website ➡️ “Check Aadhaar-Bank Mapping”
- Or dial *999*9# from your Aadhaar-linked mobile.

⚠️ Important: Only *one bank account* can be mapped for DBT at a time. If you change banks, update Aadhaar seeding immediately.

👉 Would you like me to explain ➡️ *Why Payments Get Delayed or Rejected*?`,
      delays: `⚠️ Common reasons for DBT payment delays or rejections:

1. Aadhaar not linked with bank account.
2. Bank account inactive or closed.
3. Name mismatch between Aadhaar, bank account & application.
4. Incorrect IFSC or account number entered.
5. Documents not verified by institute or district officer.
6. Late submission of application.

💡 What to do:
- Verify Aadhaar-bank linking at UIDAI portal.
- Check “Application/Payment Status” on NSP/MahaDBT portal.
- Contact your institute nodal officer for pending verification.
- If rejected by PFMS/bank, update details and re-submit.

👉 Would you like to know ➡️ *Portal Login & Technical Issues*?`,
      portal: `🌐 Facing portal issues? Here are common problems & fixes:

🔑 Login Issues:
- Forgotten password ➡️ use “Forgot Password” option with registered email/phone.
- Account locked ➡️ wait 24 hrs, then reset.

📤 Application Not Submitting:
- Check internet speed & browser compatibility (use Chrome/Edge).
- Clear cache/cookies.
- Ensure documents are under size/format limits.

⏳ Application Under Verification for Long:
- Institute/district officer delays are common.
- Visit your institute’s scholarship cell to request faster approval.

📞 Technical Support:
- NSP Helpdesk: 0120-6619540, helpdesk@nsp.gov.in
- MahaDBT Helpdesk: 022-49150800, mahadbt.helpdesk@maharashtra.gov.in

👉 Still stuck? You can ➡️ *Lodge a Grievance*.`,
      grievance: `📢 If your issue isn’t resolved, you can raise a grievance:

🖥️ Online:
- NSP Grievance Portal: https://scholarships.gov.in
- MahaDBT Grievance Form: https://mahadbtmahait.gov.in

📞 Helplines:
- NSP: 0120-6619540
- MahaDBT: 022-49150800

📧 Email:
- NSP: helpdesk@nsp.gov.in
- MahaDBT: mahadbt.helpdesk@maharashtra.gov.in

📌 Keep ready: Application ID, Aadhaar, bank details, and scheme name.

I hope this helps! Do you want to ➡️ *Go Back to Main Menu*?`,
    },
    hi: {
      // Hindi translations truncated for brevity (use your full Hindi text here)
      welcome: "👋 नमस्ते! मैं डीबीटी मित्र हूं...",
      schemes: "...",
      documents: "...",
      banking: "...",
      delays: "...",
      portal: "...",
      grievance: "...",
    },
  };

  const faqs = {
    en: {
      "📝 Application Related": [
        {
          q: "When is the last date to apply for scholarships?",
          a: "→ Dates vary every year; check NSP/MahaDBT portal notice section.",
        },
        // ... more FAQs
      ],
      // ... more categories
    },
    hi: {
      // Hindi FAQs here
    },
  };

  return (
    <>
      {/* Chat Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-6 right-6 z-50"
      >
        <Button
          onClick={toggleChat}
          className="w-16 h-16 rounded-full bg-[var(--primary-orange)] hover:bg-orange-700 shadow-xl border-2 border-white transition-all duration-300"
        >
          <AnimatePresence mode="wait">
            {isChatOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-6 h-6 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* FAQ Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-6 right-20 z-50"
      >
        <Button
          onClick={toggleFaq}
          className="w-14 h-14 rounded-full bg-[var(--primary-orange)] hover:bg-orange-700 shadow-xl border-2 border-white transition-all duration-300"
        >
          <ListChecks className="w-6 h-6 text-white" />
        </Button>
      </motion.div>

      {/* Chat Interface */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed top-24 right-6 w-96 h-[600px] z-40 shadow-2xl"
          >
            {/* ...Chat UI as per your code */}
            {/* See your detailed chat UI JSX here */}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAQ Interface */}
      <AnimatePresence>
        {isFaqOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed top-24 right-6 w-96 h-[600px] z-40 shadow-2xl"
          >
            {/* ...FAQ UI as per your code */}
            {/* See your detailed FAQ UI JSX here */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
