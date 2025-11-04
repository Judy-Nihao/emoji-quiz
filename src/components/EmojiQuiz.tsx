import { motion } from "motion/react";
import { Button } from "./ui/button";

interface EmojiQuizProps {
  emoji: string;
  options: string[];
  onAnswer: (answer: string) => void;
  disabled: boolean;
}

export const EmojiQuiz = ({ emoji, options, onAnswer, disabled }: EmojiQuizProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Question display - GBC battle screen style */}
        <div className="gbc-panel-outer-thick mb-3">
          <div className="gbc-window">
            
            {/* Header */}
            <div className="gbc-header p-1.5 mb-1">
              <h2 className="text-center text-xs md:text-sm leading-snug">
                WHO AM I?
              </h2>
            </div>
            
            {/* Silhouette display */}
            <div className="gbc-content p-4">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative flex items-center justify-center"
            >
              {/* Silhouette */}
              <div className="text-6xl md:text-8xl filter brightness-0">
                {emoji}
              </div>
              
              {/* Question marks - pixel style */}
              <div className="absolute -top-1 -left-1 text-2xl md:text-3xl text-black">
                ?
              </div>
              <div className="absolute -top-1 -right-1 text-2xl md:text-3xl text-black">
                ?
              </div>
            </motion.div>
          </div>

            {/* Prompt */}
            <div className="gbc-inner-subtle p-1.5 mt-1">
              <p className="text-center text-[10px] md:text-xs leading-snug text-black">
                CHOOSE!
              </p>
            </div>
          </div>
        </div>

        {/* Answer menu - GBC battle menu style */}
        <div className="gbc-panel-outer-thick">
          <div className="gbc-content p-1.5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {options.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    onClick={() => onAnswer(option)}
                    disabled={disabled}
                    className="w-full text-left py-3 md:py-4 px-3 group relative gbc-button text-[10px] md:text-xs leading-loose bg-white text-black"
                  >
                    {/* Arrow indicator */}
                    <span className="absolute left-2 opacity-0 group-hover:opacity-100">
                      ▶
                    </span>
                    
                    <span className="ml-4 block">{option.toUpperCase()}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
