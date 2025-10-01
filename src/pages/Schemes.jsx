import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Crown, Zap, Book, Medal, Target, Star, Trophy } from "lucide-react";
import { motion } from "framer-motion";

export default function Schemes() {
  const [progressValue, setProgressValue] = useState(60);
  const [language, setLanguage] = useState("en");

  const content = {
    en: {
      title: "Popular Scholarship Schemes",
      description:
        "Explore available scholarship schemes and their eligibility criteria."
    },
    hi: {
      title: "लोकप्रिय छात्रवृत्ति योजनाएं",
      description: "उपलब्ध छात्रवृत्ति योजनाओं और उनकी पात्रता मानदंडों को देखें।"
    }
  };

  const currentContent = content[language];

  const schemes = [
    {
      id: "post-matric",
      name: "Post-Matric Scholarship",
      description:
        "For SC/ST/OBC students studying Class 11 & above. Income limit: < ₹2.5 lakh.",
      icon: Trophy,
      color: "bg-yellow-500",
      rarity: "Common"
    },
    {
      id: "merit-cum-means",
      name: "Merit-cum-Means Scholarship",
      description:
        "For students pursuing technical/professional UG/PG courses. Income limit: < ₹2.5 lakh.",
      icon: Crown,
      color: "bg-purple-500",
      rarity: "Rare"
    },
    {
      id: "eklavyascholar",
      name: "Eklavya Scholarship",
      description:
        "For Maharashtra graduate students with ≥ 60% marks. Income limit: < ₹75,000.",
      icon: Zap,
      color: "bg-orange-500",
      rarity: "Uncommon"
    },
    {
      id: "hostel-allowance",
      name: "Hostel Maintenance Allowance",
      description:
        "For students staying in hostels. Income limit: < ₹8 lakh.",
      icon: Book,
      color: "bg-blue-500",
      rarity: "Common"
    },
    {
      id: "dbt-ready",
      name: "DBT Ready Champion",
      description: "Complete your DBT readiness check.",
      icon: Medal,
      color: "bg-red-500",
      rarity: "Rare"
    },
  ];

  const getRarityColor = (rarity) => {
    const colors = {
      Common: "bg-gray-400",
      Uncommon: "bg-green-500",
      Rare: "bg-blue-600",
      Epic: "bg-purple-600",
      Legendary: "bg-orange-600"
    };
    return colors[rarity] || "bg-gray-400";
  };

  return (
    <div className="min-h-screen p-6 bg-[var(--background-light)]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[var(--primary-blue)]">
            {currentContent.title}
          </h1>
          <p className="text-gray-600 mt-2">{currentContent.description}</p>

          {/* Language toggle */}
          <div className="mt-4 flex justify-center space-x-4">
            <Button
              variant={language === "en" ? "default" : "ghost"}
              onClick={() => setLanguage("en")}
              className={`px-6 rounded-full ${
                language === "en"
                  ? "bg-[var(--primary-blue)] text-white"
                  : "text-gray-700"
              }`}
            >
              English
            </Button>
            <Button
              variant={language === "hi" ? "default" : "ghost"}
              onClick={() => setLanguage("hi")}
              className={`px-6 rounded-full ${
                language === "hi"
                  ? "bg-[var(--primary-blue)] text-white"
                  : "text-gray-700"
              }`}
            >
              हिंदी
            </Button>
          </div>
        </div>

        {/* Progress bar example */}
        <Card className="mb-8 bg-gradient-to-r from-[var(--primary-blue)] to-[var(--secondary-blue)] text-white border-none">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">{language === "en" ? "Your Progress" : "आपकी प्रगति"}</h2>
            <progress
              value={progressValue}
              max="100"
              className="w-full h-4 rounded bg-white/30"
            />
            <p className="mt-2">{progressValue}% {language === "en" ? "Complete" : "पूरा हुआ"}</p>
          </CardContent>
        </Card>

        {/* Schemes Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {schemes.map((scheme) => {
            const Icon = scheme.icon;
            return (
              <motion.div
                key={scheme.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border border-gray-300 p-4 rounded-lg">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className={`${scheme.color} p-3 rounded-xl`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold">{scheme.name}</h3>
                  </div>
                  <p className="text-gray-700 mb-2">{scheme.description}</p>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getRarityColor(scheme.rarity)} text-white`}>
                      {language === 'en' ? scheme.rarity : {
                        Common: "सामान्य",
                        Uncommon: "असामान्य",
                        Rare: "दुर्लभ",
                        Epic: "महाकाव्य",
                        Legendary: "पौराणिक",
                      }[scheme.rarity] ?? scheme.rarity}
                    </Badge>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
