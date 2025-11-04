import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface TimerProps {
  duration: number;
  onTimeout: () => void;
  isActive: boolean;
}

export const Timer = ({ duration, onTimeout, isActive }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!isActive) return;

    if (timeLeft <= 0) {
      onTimeout();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isActive, onTimeout]);

  const isUrgent = timeLeft <= 3;

  return (
    <motion.div
      animate={isUrgent ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 0.5, repeat: isUrgent ? Infinity : 0 }}
      className={`gbc-panel-outer inline-block ${isUrgent ? 'bg-[#FFC107]' : 'bg-[#B4BFBE]'}`}
      style={{ padding: '3px' }}
    >
      <div className="bg-white border-2 border-black flex items-center gap-2 px-2.5 py-1.5"
           style={{ boxShadow: 'inset 2px 2px 0 #8B9594, inset -2px -2px 0 #D4DEDD' }}>
        {/* Timer icon */}
        <div className="text-lg md:text-xl">
          ⏰
        </div>
        
        {/* Time display */}
        <div>
          <div className="text-[8px] mb-0.5 leading-none text-[#8B9594]">
            TIME
          </div>
          <motion.div 
            className={`text-lg md:text-xl ${isUrgent ? 'text-[#E53935]' : 'text-black'}`}
            animate={isUrgent ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5, repeat: isUrgent ? Infinity : 0 }}
          >
            {timeLeft}
          </motion.div>
        </div>
        
        {/* Progress bar - GBC HP bar style */}
        <div className="hidden md:block">
          <div className="w-[90px] h-2.5 bg-[#D4DEDD] border-2 border-black p-px">
            <div 
              className={`h-full transition-all duration-300 ${isUrgent ? 'bg-[#E53935]' : 'bg-[#4CAF50]'}`}
              style={{
                width: `${(timeLeft / duration) * 100}%`,
                boxShadow: isUrgent ? 'none' : 'inset -1px -1px 0 #306230'
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
