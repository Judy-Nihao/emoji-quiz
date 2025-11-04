import { motion } from "motion/react";

interface ScoreboardProps {
  correct: number;
  wrong: number;
  current: number;
  total: number;
}

export const Scoreboard = ({ correct, wrong, current, total }: ScoreboardProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {/* Top row: OK and NG */}
      <div className="flex gap-2">
        {/* Correct count - GBC stats style */}
        <motion.div
          whileHover={{ y: -2 }}
          className="gbc-panel-outer-thin"
        >
          <div className="gbc-stat-box px-2 py-1 min-w-[60px]">
            <div className="text-sm mb-0.5">
              ✓
            </div>
            <div className="text-[8px] mb-0.5 leading-none text-[#8B9594]">
              OK
            </div>
            <div className="text-sm text-black">
              {correct}
            </div>
          </div>
        </motion.div>
        
        {/* Wrong count */}
        <motion.div
          whileHover={{ y: -2 }}
          className="gbc-panel-outer-thin"
        >
          <div className="gbc-stat-box px-2 py-1 min-w-[60px]">
            <div className="text-sm mb-0.5">
              ✗
            </div>
            <div className="text-[8px] mb-0.5 leading-none text-[#8B9594]">
              NG
            </div>
            <div className="text-sm text-black">
              {wrong}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom row: Question progress - full width to match above */}
      <motion.div
        whileHover={{ y: -2 }}
        className="gbc-panel-outer-thin w-full max-w-[136px]"
      >
        <div className="gbc-stat-box px-2 py-1">
          <div className="text-sm mb-0.5">
            #
          </div>
          <div className="text-[8px] mb-0.5 leading-none text-[#8B9594]">
            NO.
          </div>
          <div className="text-sm text-black">
            {current}/{total}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
