import { motion } from "motion/react";
import { Button } from "./ui/button";

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <div className="flex items-center justify-center p-4 bg-[#B4BFBE] h-app overflow-auto">
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-xl"
      >
        {/* Main GBC-style window */}
        <div className="gbc-panel-outer-thick">
          <div className="gbc-window">
            
            {/* Title bar - GBC style */}
            <div className="gbc-header p-3 mb-1">
              <motion.h1
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-center text-base md:text-2xl leading-loose tracking-[2px]"
              >
                WHO AM I?
              </motion.h1>
            </div>

            {/* Main content area */}
            <div className="gbc-content">
            
            {/* Mascot - pixelated emoji */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-center mb-4"
            >
              <div className="text-6xl md:text-7xl inline-block contrast-[1.2]">
                🤔
              </div>
            </motion.div>

            {/* Subtitle */}
            <div className="gbc-bar p-2 mb-3">
              <p className="text-center text-xs md:text-sm leading-loose text-black">
                EMOJI QUIZ
              </p>
            </div>

            {/* Info box - GBC dialogue style */}
            <div className="gbc-inner-subtle p-3 mb-4">
              <ul className="space-y-2 text-[10px] md:text-xs leading-loose text-black">
                <li className="flex items-center"><span className="mr-2">▸</span><span>10 QUESTIONS</span></li>
                <li className="flex items-center"><span className="mr-2">▸</span><span>10 SEC EACH</span></li>
                <li className="flex items-center"><span className="mr-2">▸</span><span>4 CHOICES</span></li>
                <li className="flex items-center"><span className="mr-2">▸</span><span>BE THE BEST</span></li>
              </ul>
            </div>

            {/* Start button - GBC menu style */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={onStart}
                className="w-full py-6 md:py-8 text-sm md:text-base relative gbc-button bg-black text-white leading-loose"
              >
                <motion.span
                  animate={{ opacity: [1, 0.6, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="flex items-center justify-center gap-2"
                >
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0L12 7L0 14V0Z" fill="currentColor"/>
                  </svg>
                  <span>START</span>
                </motion.span>
              </Button>
            </motion.div>

            {/* Prompt text */}
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-center mt-4 text-[10px] leading-loose text-[#8B9594]"
            >
              PRESS START
            </motion.p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
