"use client";
import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

// Modernized balloon palette
const BALLOON_COLORS = [
  "from-pink-400 to-rose-500 shadow-rose-600",
  "from-yellow-300 to-amber-400 shadow-amber-500",
  "from-blue-400 to-sky-500 shadow-sky-600",
  "from-green-400 to-emerald-500 shadow-emerald-600",
  "from-purple-400 to-fuchsia-500 shadow-fuchsia-600",
];

// 🎉 Confetti piece component
const ConfettiBurst = ({ x, y }) => {
  const pieces = Array.from({ length: 12 });
  return (
    <div
      className="absolute"
      style={{ left: x, top: y, pointerEvents: "none" }}
    >
      {pieces.map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-sm opacity-90"
          style={{
            backgroundColor: `hsl(${Math.random() * 360}, 80%, 60%)`,
            animation: `confetti-burst 800ms ease-out forwards`,
            animationDelay: `${Math.random() * 100}ms`,
            transform: `rotate(${Math.random() * 360}deg)`,
            left: "0",
            top: "0",
          }}
        />
      ))}
    </div>
  );
};

// 🎈 Balloon component
const Balloon = ({ index, color, onPop }) => {
  const [popped, setPopped] = useState(false);
  const animationDuration = `${10 + (index % 5) * 2}s`;
  const animationDelay = `${index * 0.8}s`;

  // Handle pop event
  const handleAnimationEnd = (e) => {
    if (e.animationName === "float-up") {
      setPopped(true);
      onPop?.(); // Trigger confetti burst
    }
  };

  if (popped) return null;

  return (
    <div
      onAnimationEnd={handleAnimationEnd}
      className={`
        absolute left-[${Math.random() * 90}%] bottom-[-100px]
        w-12 h-16 bg-gradient-to-br ${color}
        rounded-[60%_60%_50%_50%/70%_70%_40%_40%]
        shadow-lg opacity-0 animate-float-up transform
      `}
      style={{
        animationDuration,
        animationDelay,
      }}
    >
      {/* Shine */}
      <div className="absolute top-2 left-3 w-3 h-5 bg-white/50 rounded-full blur-[1px] opacity-80" />

      {/* Knot */}
      <div
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0
          border-l-[4px] border-r-[4px] border-t-[6px]
          border-l-transparent border-r-transparent border-t-gray-800/60"
      />

      {/* String */}
      <div className="absolute -bottom-7 left-1/2 w-[1px] h-8 bg-gray-700/50 animate-string-sway" />
    </div>
  );
};

export default function BirthdayBalloons() {
  const [isVisible, setIsVisible] = useState(false);
  const [isBirthday, setIsBirthday] = useState(false);
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    const today = new Date();
    const isTodayTheBirthday = today.getMonth() === 9 && today.getDate() === 15;
    setIsBirthday(isTodayTheBirthday);

    if (isTodayTheBirthday) {
      setTimeout(() => setIsVisible(true), 300);
    }
  }, []);

  const handleBalloonPop = () => {
    // Random confetti burst around the top area
    const x = `${Math.random() * 90}vw`;
    const y = `${Math.random() * 20}vh`;
    const id = Math.random().toString(36).substring(7);
    setConfetti((prev) => [...prev, { id, x, y }]);
    setTimeout(
      () => setConfetti((prev) => prev.filter((c) => c.id !== id)),
      1000
    );
  };

  if (!isBirthday) return null;

  return (
    <>
      {/* Balloons Layer */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 overflow-hidden pointer-events-none z-[9999] transition-all duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <Balloon
            key={i}
            index={i}
            color={BALLOON_COLORS[i % BALLOON_COLORS.length]}
            onPop={handleBalloonPop}
          />
        ))}
        {confetti.map((c) => (
          <ConfettiBurst key={c.id} x={c.x} y={c.y} />
        ))}
      </div>

      {/* Header */}
      <div
        className={`fixed top-0 left-0 right-0 p-4 text-center 
        bg-gradient-to-r from-yellow-200/80 to-amber-300/80
        backdrop-blur-sm text-gray-900 font-semibold text-sm
        shadow-md z-[10000] rounded-b-2xl border-b border-amber-400/40
        transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
        }`}
      >
        <Sparkles className="inline-block w-4 h-4 mr-2 text-amber-700 animate-pulse" />
        Happy Birthday, Praise! 🎉🎂💛
      </div>

      {/* Inline CSS Animations */}
      <style jsx global>{`
        @keyframes float-up {
          0% {
            transform: translateY(100vh) scale(0.9);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translateY(-30vh) scale(1);
          }
          100% {
            transform: translateY(-120vh) scale(1.1);
            opacity: 0;
          }
        }

        @keyframes string-sway {
          0%,
          100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(2deg);
          }
        }

        @keyframes confetti-burst {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(
                calc(-40px + 80px * var(--rand-x, 0.5)),
                calc(60px + 40px * var(--rand-y, 0.5))
              )
              rotate(720deg) scale(0.8);
            opacity: 0;
          }
        }

        .animate-float-up {
          animation: float-up ease-in-out forwards;
        }

        .animate-string-sway {
          animation: string-sway 2s ease-in-out infinite;
          transform-origin: top center;
        }
      `}</style>
    </>
  );
}
