import React from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";

export default function SchoolStats({ title, value, icon: Icon, bgColor, trend }) {
  return (
    <Card className="relative overflow-hidden bg-white border border-[var(--border-color)]">
      <div className={`absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8 ${bgColor} rounded-full opacity-10`} />
      <CardHeader className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <CardTitle className="text-3xl font-bold mt-2 text-[var(--primary-blue)]">
              {value}
            </CardTitle>
          </div>
          <div className={`p-3 rounded-lg ${bgColor} bg-opacity-20`}>
            <Icon className={`w-6 h-6 ${bgColor.replace('bg-', 'text-')}`} />
          </div>
        </div>
        {trend && (
          <p className="text-xs text-gray-500 mt-2">{trend}</p>
        )}
      </CardHeader>
    </Card>
  );
}