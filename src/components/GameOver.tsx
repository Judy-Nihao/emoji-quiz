import { motion } from "motion/react";
import { Button } from "./ui/button";

interface GameOverProps {
  correct: number;
  wrong: number;
  total: number;
  onRestart: () => void;
  topicName?: string;
  topicEmoji?: string;
}

export const GameOver = ({ correct, wrong, total, onRestart, topicName, topicEmoji }: GameOverProps) => {
  const percentage = Math.round((correct / total) * 100);
  const isPerfect = correct === total;
  const isGood = percentage >= 70;
  
  return (
    <div className="flex items-center justify-center p-4 bg-[#B4BFBE] h-app overflow-auto">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-lg"
      >
        {/* Results window */}
        <div className="gbc-panel-outer-thick">
          <div className="gbc-window">
            
            {/* Header */}
            <div className="gbc-header p-3 mb-1">
              <h1 className="text-center text-base md:text-xl leading-loose">
                {isPerfect ? "PERFECT!" : isGood ? "GREAT!" : "COMPLETE!"}
              </h1>
            </div>

            {/* Content */}
            <div className="gbc-content">
              {/* Trophy */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-center mb-4"
              >
                <div className="text-6xl md:text-7xl inline-block">
                  {isPerfect ? "🏆" : isGood ? "⭐" : "🎮"}
                </div>
              </motion.div>

              {/* Topic info */}
              {topicName && topicEmoji && (
                <div className="gbc-bar p-2 mb-3">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl md:text-3xl">
                      {topicEmoji}
                    </span>
                    <p className="text-xs md:text-sm leading-normal text-black">
                      {topicName.toUpperCase()}
                    </p>
                  </div>
                </div>
              )}

              {/* Message */}
              <div className="gbc-bar p-3 mb-4">
                <p className="text-xs md:text-sm text-center leading-loose text-black whitespace-pre-line">
                  {isPerfect 
                    ? "YOU'RE A\nMASTER!" 
                    : isGood 
                    ? "WELL DONE!" 
                    : "KEEP\nTRAINING!"}
                </p>
              </div>

              {/* Score display - GBC stats style */}
              <div className="gbc-inner-subtle p-3 mb-4">
                <div className="text-center mb-3">
                  <p className="text-[10px] leading-normal text-[#8B9594]">
                    FINAL SCORE
                  </p>
                </div>
                
                <div className="space-y-2 text-xs leading-loose text-black">
                <div className="flex justify-between items-center">
                  <span>OK</span>
                  <div className="gbc-score-value">
                    {correct}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>NG</span>
                  <div className="gbc-score-value">
                    {wrong}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>RATE</span>
                  <div className="gbc-score-value">
                    {percentage}%
                  </div>
                </div>
              </div>

                {/* Star rating */}
                <div className="flex justify-center gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className={`text-xl ${
                        i < Math.round(percentage / 20) ? 'opacity-100' : 'opacity-20'
                      }`}
                    >
                      ★
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Retry button */}
              <Button
                onClick={onRestart}
                className="w-full py-6 md:py-8 text-xs md:text-sm gbc-button bg-black text-white leading-loose"
              >
                PLAY AGAIN
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
