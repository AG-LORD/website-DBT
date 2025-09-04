import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "./utils/createPageUrl";  // relative import fixed
import { 
  Home, 
  BookOpen, 
  CheckCircle2, 
  Trophy, 
  Users, 
  BarChart3, 
  Globe,
  Menu,
  X,
  ShieldCheck,
  Award,
  MapPin,
  Star,
  Gift
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";  // relative import fixed
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";


const navigationItems = [
  {
    title: "Home",
    url: createPageUrl("Home"),
    icon: Home,
  },
  {
    title: "Learn About DBT",
    url: createPageUrl("Learn"),
    icon: BookOpen,
  },
  {
    title: "Check DBT Status",
    url: createPageUrl("SelfCheck"),
    icon: CheckCircle2,
  },
  {
    title: "DBT Schemes",
    url: createPageUrl("Schemes"),
    icon: Gift,
  },
  {
    title: "Take Quiz",
    url: createPageUrl("Quiz"),
    icon: Trophy,
  },
  {
    title: "Achievements",
    url: createPageUrl("Achievements"),
    icon: Star,
  },
  {
    title: "Find Banks",
    url: createPageUrl("FindBank"),
    icon: MapPin,
  },
  {
    title: "Teacher Dashboard",
    url: createPageUrl("TeacherDashboard"),
    icon: Users,
  },
  {
    title: "Admin Dashboard", 
    url: createPageUrl("AdminDashboard"),
    icon: BarChart3,
  }
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage(prev => prev === "en" ? "hi" : "en");
  };

  const getPageTitle = () => {
    const titles = {
      en: {
        "Home": "DBT Buddy",
        "Learn": "Learn About DBT", 
        "SelfCheck": "Check DBT Status",
        "Schemes": "DBT Schemes",
        "Quiz": "DBT Quiz",
        "Achievements": "Achievements",
        "FindBank": "Find Banks",
        "TeacherDashboard": "Teacher Dashboard",
        "AdminDashboard": "Admin Dashboard"
      },
      hi: {
        "Home": "डीबीटी मित्र",
        "Learn": "डीबीटी के बारे में जानें",
        "SelfCheck": "डीबीटी स्थिति जांचें",
        "Schemes": "डीबीटी योजनाएं", 
        "Quiz": "डीबीटी क्विज़",
        "Achievements": "उपलब्धियां",
        "FindBank": "बैंक खोजें",
        "TeacherDashboard": "शिक्षक डैशबोर्ड",
        "AdminDashboard": "एडमिन डैशबोर्ड"
      }
    };
    return titles[language][currentPageName] || "DBT Buddy";
  };

  return (
    <SidebarProvider>
      <style>{`
        :root {
          --primary-orange: #D9531E;
          --primary-blue: #283B4F;
          --secondary-blue: #3A87AD;
          --accent-red: #C44A4A;
          --background-light: #f8f9fa;
          --text-dark: #333333;
          --text-light: #FFFFFF;
          --border-color: #dee2e6;
        }
      `}</style>
      <div className="min-h-screen flex w-full bg-[var(--background-light)] text-[var(--text-dark)]">
        <Sidebar className="border-r border-[var(--border-color)] bg-white">
          <SidebarHeader className="border-b border-[var(--border-color)] p-4 bg-[var(--primary-blue)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--primary-orange)] rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-white text-lg">
                  {language === "en" ? "DBT Buddy" : "डीबीटी मित्र"}
                </h2>
                <p className="text-xs text-gray-300">
                  {language === "en" ? "Scholarship Readiness Check" : "छात्रवृत्ति तैयारी जांच"}
                </p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 py-2">
                {language === "en" ? "Navigation" : "नेवीगेशन"}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-orange-50 hover:text-[var(--primary-orange)] transition-all duration-200 rounded-lg mb-1 ${
                          location.pathname === item.url ? 'bg-orange-100 text-[var(--primary-orange)] font-semibold' : 'text-[var(--primary-blue)]'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">
                            {language === "en" ? item.title : {
                              "Home": "होम",
                              "Learn About DBT": "डीबीटी सीखें", 
                              "Check DBT Status": "डीबीटी जांचें",
                              "DBT Schemes": "डीबीटी योजनाएं",
                              "Take Quiz": "क्विज़ लें",
                              "Achievements": "उपलब्धियां",
                              "Find Banks": "बैंक खोजें",
                              "Teacher Dashboard": "शिक्षक डैशबोर्ड",
                              "Admin Dashboard": "एडमिन डैशबोर्ड"
                            }[item.title] || item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-4">
              <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 py-2">
                {language === "en" ? "Quick Info" : "त्वरित जानकारी"}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-4 py-3 space-y-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-[var(--secondary-blue)]">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="font-medium">
                        {language === "en" ? "Privacy First" : "गोपनीयता प्राथमिकता"}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--secondary-blue)] opacity-80 mt-1">
                      {language === "en" ? "No Aadhaar data stored" : "कोई आधार डेटा संग्रहीत नहीं"}
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-[var(--primary-orange)]">
                      <Award className="w-4 h-4" />
                      <span className="font-medium">
                        {language === "en" ? "Learn & Earn Badges" : "सीखें और बैज अर्जित करें"}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--primary-orange)] opacity-80 mt-1">
                      {language === "en" ? "Complete quiz for rewards" : "पुरस्कार के लिए क्विज़ पूरा करें"}
                    </p>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-[var(--border-color)] p-4 bg-gray-50">
            <Button
              variant="outline"
              onClick={toggleLanguage}
              className="w-full flex items-center gap-2 border-[var(--primary-blue)] text-[var(--primary-blue)] hover:bg-[var(--primary-blue)] hover:text-white"
            >
              <Globe className="w-4 h-4" />
              <span>{language === "en" ? "हिंदी" : "English"}</span>
            </Button>
            <div className="mt-3 text-center">
              <Badge variant="outline" className="text-xs border-[var(--border-color)]">
                SIH 2024 - PS #25059
              </Badge>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white border-b border-[var(--border-color)] px-6 py-4 md:hidden shadow-sm">
            <div className="flex items-center justify-between">
              <SidebarTrigger className="hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-bold text-[var(--primary-blue)]">{getPageTitle()}</h1>
              <Button variant="ghost" size="sm" onClick={toggleLanguage} className="text-[var(--primary-blue)]">
                <Globe className="w-4 h-4" />
              </Button>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}