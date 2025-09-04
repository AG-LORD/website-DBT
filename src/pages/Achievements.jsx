import React, { useState, useEffect } from "react";
import { Achievement } from "../entities/Achievement";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { 
  Trophy, 
  Star, 
  Award, 
  Target,
  CheckCircle2,
  Book,
  Users,
  Zap,
  Crown,
  Medal
} from "lucide-react";
import { motion } from "framer-motion";

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [userStats, setUserStats] = useState({
    totalPoints: 0,
    level: 1,
    progressToNext: 0
  });
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    const userAchievements = await Achievement.list("-earned_date");
    setAchievements(userAchievements);
    
    // Calculate user stats
    const totalPoints = userAchievements.reduce((sum, ach) => sum + (ach.points_earned || 0), 0);
    const level = Math.floor(totalPoints / 100) + 1;
    const progressToNext = (totalPoints % 100);
    
    setUserStats({ totalPoints, level, progressToNext });
  };

  const availableAchievements = {
    en: [
      {
        id: "quiz_master",
        name: "Quiz Master",
        description: "Complete your first DBT knowledge quiz",
        icon: Trophy,
        color: "bg-yellow-500",
        points: 50,
        criteria: "Complete any quiz",
        rarity: "Common"
      },
      {
        id: "perfect_scholar",
        name: "Perfect Scholar",
        description: "Score 100% on a DBT quiz",
        icon: Crown,
        color: "bg-purple-500",
        points: 100,
        criteria: "Score 100% on quiz",
        rarity: "Rare"
      },
      {
        id: "learning_streak",
        name: "Learning Streak",
        description: "Visit the learning section 5 days in a row",
        icon: Zap,
        color: "bg-orange-500",
        points: 75,
        criteria: "5-day learning streak",
        rarity: "Uncommon"
      },
      {
        id: "scheme_explorer",
        name: "Scheme Explorer",
        description: "Explore all DBT scheme categories",
        icon: Book,
        color: "bg-blue-500",
        points: 60,
        criteria: "View all scheme types",
        rarity: "Common"
      },
      {
        id: "dbt_ready",
        name: "DBT Ready Champion",
        description: "Complete your DBT readiness check",
        icon: CheckCircle2,
        color: "bg-green-500",
        points: 80,
        criteria: "Complete DBT status check",
        rarity: "Uncommon"
      },
      {
        id: "helper",
        name: "Community Helper",
        description: "Share DBT Buddy with 5 friends",
        icon: Users,
        color: "bg-pink-500",
        points: 120,
        criteria: "Share with 5 friends",
        rarity: "Epic"
      },
      {
        id: "speed_learner",
        name: "Speed Learner",
        description: "Complete quiz in under 2 minutes",
        icon: Medal,
        color: "bg-red-500",
        points: 90,
        criteria: "Quiz completed <2 minutes",
        rarity: "Rare"
      }
    ],
    hi: [
      {
        id: "quiz_master",
        name: "क्विज़ मास्टर",
        description: "अपना पहला डीबीटी ज्ञान क्विज़ पूरा करें",
        icon: Trophy,
        color: "bg-yellow-500",
        points: 50,
        criteria: "कोई भी क्विज़ पूरा करें",
        rarity: "सामान्य"
      }
      // ... other achievements translated
    ]
  };

  const getRarityColor = (rarity) => {
    const colors = {
      "Common": "bg-gray-500",
      "Uncommon": "bg-green-500", 
      "Rare": "bg-blue-500",
      "Epic": "bg-purple-500",
      "Legendary": "bg-orange-500",
      "सामान्य": "bg-gray-500",
      "असामान्य": "bg-green-500",
      "दुर्लभ": "bg-blue-500",
      "महाकाव्य": "bg-purple-500",
      "पौराणिक": "bg-orange-500"
    };
    return colors[rarity] || "bg-gray-500";
  };

  const content = {
    en: {
      title: "Achievements & Badges",
      subtitle: "Track your learning progress and unlock rewards",
      yourLevel: "Your Level",
      totalPoints: "Total Points",
      nextLevel: "Next Level",
      unlocked: "Unlocked",
      locked: "Locked",
      progress: "Progress"
    },
    hi: {
      title: "उपलब्धियां और बैज",
      subtitle: "अपनी शिक्षा प्रगति को ट्रैक करें और पुरस्कार अनलॉक करें",
      yourLevel: "आपका स्तर",
      totalPoints: "कुल अंक",
      nextLevel: "अगला स्तर",
      unlocked: "अनलॉक्ड",
      locked: "लॉक्ड",
      progress: "प्रगति"
    }
  };

  const currentContent = content[language];
  const currentAchievements = availableAchievements[language];
  const earnedAchievements = achievements.map(a => a.achievement_type);

  return (
    <div className="min-h-screen bg-[var(--background-light)] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary-blue)] mb-4">
            {currentContent.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {currentContent.subtitle}
          </p>
          
          {/* Language Toggle */}
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-full p-1 shadow-md border border-[var(--border-color)]">
              <Button
                variant={language === "en" ? "default" : "ghost"}
                onClick={() => setLanguage("en")}
                className={`rounded-full px-6 ${language === 'en' ? 'bg-[var(--primary-blue)] text-white hover:bg-blue-900' : 'text-gray-700'}`}
              >
                English
              </Button>
              <Button
                variant={language === "hi" ? "default" : "ghost"}
                onClick={() => setLanguage("hi")}
                className={`rounded-full px-6 ${language === 'hi' ? 'bg-[var(--primary-blue)] text-white hover:bg-blue-900' : 'text-gray-700'}`}
              >
                हिंदी
              </Button>
            </div>
          </div>
        </div>

        {/* User Progress */}
        <Card className="mb-8 bg-gradient-to-r from-[var(--primary-blue)] to-[var(--secondary-blue)] text-white border-none">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-1">{userStats.level}</h3>
                <p className="text-white/80">{currentContent.yourLevel}</p>
              </div>
              
              <div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-1">{userStats.totalPoints}</h3>
                <p className="text-white/80">{currentContent.totalPoints}</p>
              </div>
              
              <div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="mb-2">
                  <Progress 
                    value={userStats.progressToNext} 
                    className="h-3 bg-white/20 [&>div]:bg-[var(--primary-orange)]" 
                  />
                </div>
                <p className="text-white/80">{userStats.progressToNext}/100 {currentContent.nextLevel}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentAchievements.map((achievement, index) => {
            const isUnlocked = earnedAchievements.includes(achievement.id);
            
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`relative overflow-hidden border-2 transition-all duration-300 ${
                  isUnlocked 
                    ? 'border-[var(--primary-orange)] bg-gradient-to-br from-orange-50 to-yellow-50 shadow-lg' 
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  {isUnlocked && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-[var(--primary-orange)] text-white">
                        {currentContent.unlocked}
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 ${achievement.color} rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                      !isUnlocked ? 'grayscale opacity-50' : ''
                    }`}>
                      <achievement.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <CardTitle className={`text-lg ${isUnlocked ? 'text-[var(--primary-blue)]' : 'text-gray-500'}`}>
                      {achievement.name}
                    </CardTitle>
                    
                    <div className="flex justify-center gap-2 mt-2">
                      <Badge className={`${getRarityColor(achievement.rarity)} text-white text-xs`}>
                        {achievement.rarity}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        +{achievement.points} {language === "en" ? "points" : "अंक"}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="text-center">
                    <p className={`text-sm mb-4 ${isUnlocked ? 'text-gray-700' : 'text-gray-500'}`}>
                      {achievement.description}
                    </p>
                    
                    <div className={`text-xs p-3 rounded-lg ${
                      isUnlocked ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <strong>{language === "en" ? "Criteria: " : "मापदंड: "}</strong>
                      {achievement.criteria}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Achievement Stats */}
        <Card className="mt-12 bg-white border border-[var(--border-color)]">
          <CardHeader>
            <CardTitle className="text-[var(--primary-blue)] text-center">
              {currentContent.progress}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div className="p-4">
                <div className="text-3xl font-bold text-[var(--primary-blue)] mb-2">
                  {earnedAchievements.length}
                </div>
                <p className="text-gray-600 text-sm">
                  {language === "en" ? "Achievements Unlocked" : "अनलॉक की गई उपलब्धियां"}
                </p>
              </div>
              
              <div className="p-4">
                <div className="text-3xl font-bold text-[var(--secondary-blue)] mb-2">
                  {Math.round((earnedAchievements.length / currentAchievements.length) * 100)}%
                </div>
                <p className="text-gray-600 text-sm">
                  {language === "en" ? "Completion Rate" : "पूर्णता दर"}
                </p>
              </div>
              
              <div className="p-4">
                <div className="text-3xl font-bold text-[var(--primary-orange)] mb-2">
                  {userStats.level}
                </div>
                <p className="text-gray-600 text-sm">
                  {language === "en" ? "Current Level" : "वर्तमान स्तर"}
                </p>
              </div>
              
              <div className="p-4">
                <div className="text-3xl font-bold text-green-500 mb-2">
                  {100 - userStats.progressToNext}
                </div>
                <p className="text-gray-600 text-sm">
                  {language === "en" ? "Points to Next Level" : "अगले स्तर तक अंक"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
