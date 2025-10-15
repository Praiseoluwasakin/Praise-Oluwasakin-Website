"use client";
import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react"; // Reusing an existing icon

// 🎈 Balloon shapes and colors
const BALLOON_STYLES = [
  { color: "bg-red-500", shadow: "shadow-red-700", start: "left-10" },
  {
    color: "bg-yellow-400",
    shadow: "shadow-yellow-600",
    start: "right-10",
    delay: "delay-500",
  },
  {
    color: "bg-blue-500",
    shadow: "shadow-blue-700",
    start: "left-40",
    delay: "delay-1000",
  },
  {
    color: "bg-green-500",
    shadow: "shadow-green-700",
    start: "right-40",
    delay: "delay-1500",
  },
];

// Reusable Tailwind classes for animation
// Note: We'll need to define the 'float-up' keyframes in your main CSS or a style block.
const BASE_BALLOON_CLASS =
  "absolute w-12 h-16 rounded-t-full rounded-b-[40%] animate-float-up opacity-0";
const STRING_CLASS =
  "absolute -bottom-2 left-1/2 -ml-px w-0.5 h-6 bg-gray-700/80";

const Balloon = ({ style, index }) => {
  // Calculates animation duration and delay for staggered, non-uniform look
  const duration = `duration-[${4 + (index % 3)}s]`;
  const delay = `delay-[${(index % 4) * 500}ms]`;

  // The 'string' is a tiny triangle at the bottom point
  const knot = (
    <div
      className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 
      border-l-[4px] border-r-[4px] border-t-[8px] 
      border-l-transparent border-r-transparent ${style.shadow} opacity-90`}
    />
  );

  return (
    <div
      className={`
        ${BASE_BALLOON_CLASS} 
        ${style.color} 
        ${style.start} 
        ${duration} 
        ${delay} 
        transition-opacity
      `}
      style={{
        animationDuration: `${10 + (index % 4) * 2}s`, // 10s to 16s float duration
        animationDelay: `${index * 0.5}s`, // Staggered start delay
        bottom: `-${20 + index * 5}px`, // Start position just off-screen
      }}
    >
      {/* Light spot for shine effect */}
      <div className="absolute top-2 left-3 w-3 h-3 rounded-full bg-white/70" />
      {/* Balloon knot/string attachment */}
      {knot}
      <div className={STRING_CLASS} />
    </div>
  );
};

export default function BirthdayBalloons() {
  const [isBirthday, setIsBirthday] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const today = new Date();
    // Check if the current date is October 15th (Month is 0-indexed, so October is 9)
    const isTodayTheBirthday = today.getMonth() === 9 && today.getDate() === 15;

    setIsBirthday(isTodayTheBirthday);

    if (isTodayTheBirthday) {
      // Simple confetti message pop-up
      console.log("Happy Birthday! Activating website celebration mode. 🥳");

      // Use a timeout to fade in the balloons after component mounts
      const timer = setTimeout(() => setIsVisible(true), 50);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isBirthday) {
    return null; // Don't render anything if it's not the birthday
  }

  // Render a festive message and the balloons
  return (
    <>
      {/* The main container for the balloons */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 pointer-events-none overflow-hidden z-[9999] transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Render a bunch of balloons with varied styles */}
        {Array(20)
          .fill()
          .map((_, i) => (
            <Balloon
              key={i}
              index={i}
              style={BALLOON_STYLES[i % BALLOON_STYLES.length]}
            />
          ))}
      </div>

      {/* Optional: Add a subtle overlay message */}
      <div
        className={`fixed top-0 left-0 right-0 p-3 text-center bg-yellow-400/80 backdrop-blur-sm text-gray-900 font-bold text-sm z-[10000] transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <Sparkles className="inline-block w-4 h-4 mr-2 -mt-0.5" />
        Happy Birthday, Praise! 🥳
      </div>
    </>
  );
}
