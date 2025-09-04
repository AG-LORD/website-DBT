import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";  // Relative import fixed
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart3 } from "lucide-react";

export default function DistrictOverview({ data, language, currentContent }) {
  return (
    <Card className="bg-white border border-[var(--border-color)]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[var(--primary-blue)]">
          <BarChart3 className="w-5 h-5" />
          {currentContent.overview}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={50}
            />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => [
                `${value}%`,
                language === "en" ? "Readiness" : "तैयारी"
              ]}
            />
            <Bar 
              dataKey="readiness" 
              fill="var(--primary-orange)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
