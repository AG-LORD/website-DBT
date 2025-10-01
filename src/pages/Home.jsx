
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils/createPageUrl";                 // relative path corrected
import { Button } from "../components/ui/button";                      // relative path corrected
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";  // relative path corrected
import { Badge } from "../components/ui/badge";                        // relative path corrected
import { 
  CheckCircle2, 
  BookOpen, 
  Trophy, 
  Users, 
  ArrowRight,
  Shield,
  Zap,
  Heart
} from "lucide-react";

export default function Home() {
  const features = [
  {
    icon: CheckCircle2,
    title: "Check DBT Readiness",
    description: "Verify if your bank account is ready for direct scholarship transfers",
    href: createPageUrl("SelfCheck"),
    color: "bg-[var(--secondary-blue)]"
  },
  {
    icon: BookOpen,
    title: "Learn About DBT",
    description: "Understand the difference between Aadhaar-linked and DBT-enabled accounts",
    href: createPageUrl("Learn"),
    color: "bg-[var(--primary-blue)]"
  },
  {
    icon: Trophy,
    title: "Take the Quiz",
    description: "Test your knowledge and earn DBT Hero badges",
    href: createPageUrl("Quiz"),
    color: "bg-green-500" // Kept green for quiz trophy
  },
  {
    icon: Users,
    title: "For Teachers",
    description: "Manage student data and track DBT readiness across your school",
    href: createPageUrl("TeacherDashboard"),
    color: "bg-[var(--primary-orange)]"
  }];


  const benefits = [
  {
    icon: Shield,
    title: "Privacy Protected",
    description: "Your Aadhaar data is never stored. We use Virtual ID simulation only."
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get immediate feedback on your DBT readiness status."
  },
  {
    icon: Heart,
    title: "Student Focused",
    description: "Designed specifically for students seeking scholarship support."
  }];


  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative px-6 py-16 md:py-24 overflow-hidden bg-[var(--background-light)] border-b border-[var(--border-color)]">
        <div className="relative max-w-6xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-[var(--secondary-blue)] border-blue-200">
            SIH 2024 Problem Statement #25059
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-[var(--primary-blue)] mb-6">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-[var(--primary-orange)] to-orange-500 bg-clip-text text-transparent">
              DBT Buddy
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your complete guide to understanding and checking Direct Benefit Transfer (DBT) 
            readiness for scholarships. No more delays, no more confusion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("SelfCheck")}>
              <Button size="lg" className="bg-[var(--primary-orange)] hover:bg-orange-700 text-white px-8 py-3 text-lg">
                Check My DBT Status
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to={createPageUrl("Learn")}>
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg border-[var(--primary-blue)] text-[var(--primary-blue)] hover:bg-[var(--primary-blue)] hover:text-white">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-blue)] mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600">
              Tools and resources to ensure you're ready for scholarship transfers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) =>
            <Link key={index} to={feature.href}>
                <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-2 border-transparent hover:border-[var(--primary-orange)] bg-[var(--background-light)]">
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 py-16 bg-[var(--background-light)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-blue)] mb-4">
              Why Choose DBT Buddy?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) =>
            <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[var(--primary-blue)] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 py-16 bg-[var(--primary-blue)]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of students who have successfully verified their DBT readiness
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("SelfCheck")}>
              <Button size="lg" className="bg-[var(--primary-orange)] hover:bg-orange-600 px-8 py-3 text-lg">
                Start DBT Check
              </Button>
            </Link>
            <Link to={createPageUrl("Learn")}>
              <Button size="lg" variant="outline" className="bg-background text-[#1d1616] px-8 py-3 text-lg font-medium inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-11 rounded-md border-white hover:bg-white hover:text-[var(--primary-blue)]">
                Learn First
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white px-6 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-[var(--primary-blue)] rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">DBT Buddy</span>
          </div>
          <p className="text-gray-400 mb-4">
            Developed for Smart India Hackathon 2024 | Ministry of Social Justice & Empowerment
          </p>
          <p className="text-sm text-gray-500">
            © 2024 DBT Buddy. Enhancing student awareness for Direct Benefit Transfer readiness.
          </p>
        </div>
      </footer>
    </div>);

}