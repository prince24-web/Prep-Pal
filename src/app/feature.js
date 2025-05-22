"use client"
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, FileText, Sparkles } from "lucide-react";

const tools = [
  {
    title: "Summarize Notes",
    description: "Upload long PDF notes and get clean, summarized key points.",
    icon: <FileText className="w-8 h-8 text-purple-600" />,
    color: "bg-purple-100",
  },
  {
    title: "Smart Quiz",
    description: "Automatically generate quizzes from your content.",
    icon: <Sparkles className="w-8 h-8 text-pink-500" />,
    color: "bg-pink-100",
  },
  {
    title: "AI Assistant",
    description: "Ask follow-up questions on your notes with smart AI help.",
    icon: <CheckCircle className="w-8 h-8 text-purple-500" />,
    color: "bg-purple-200",
  },
];

export default function Features() {
  return (
    <div className="min-h-screen bg-white text-black py-16 px-4 md:px-20">
      <h2 className="text-4xl font-bold mb-10 text-center">PrepPal Tools</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="rounded-3xl shadow-xl overflow-hidden bg-white p-6"
          >
            <div>
              <div
                className={`rounded-xl ${tool.color} w-16 h-16 flex items-center justify-center mb-4`}
              >
                {tool.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
              <p className="text-sm text-gray-600">{tool.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
