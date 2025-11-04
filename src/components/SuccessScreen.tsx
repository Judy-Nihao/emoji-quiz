import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

interface SuccessScreenProps {
  emoji: string;
  onContinue: () => void;
}

export const SuccessScreen = ({ emoji, onContinue }: SuccessScreenProps) => {
  const [showEmoji, setShowEmoji] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowEmoji(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black/70 p-4"
      onClick={onContinue}
    >
      {/* GBC-style success window */}
      <motion.div
        className="gbc-panel-outer mx-4 w-full max-w-md bg-[#4CAF50]"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 0.4 }}
        style={{ padding: '4px' }}
      >
        <div className="border-[3px] border-black bg-[#D4DEDD] p-1 shadow-[inset_-2px_-2px_0_#306230,inset_2px_2px_0_#FFF]">
          {/* Header */}
          <div className="gbc-header mb-1 p-3">
            <motion.h2
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="text-center text-sm leading-loose md:text-lg"
            >
              CORRECT!
            </motion.h2>
          </div>

          {/* Content */}
          <div className="gbc-content flex flex-col gap-4">
            {/* Message box - GBC dialogue style */}
            <div className="gbc-bar p-3">
              <p className="text-center text-xs leading-loose text-black md:text-sm">
                A CRITICAL
                <br />
                HIT!
              </p>
            </div>

            {/* Emoji reveal with simple flip */}
            <div className="perspective-1000">
              <motion.div
                className="relative mx-auto mb-4 text-6xl md:text-7xl"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: showEmoji ? 180 : 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Front: silhouette */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <div className="brightness-0 filter">{emoji}</div>
                </motion.div>

                {/* Back: revealed emoji */}
                <motion.div
                  className="flex items-center justify-center"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {emoji}
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            {/* Continue prompt */}
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="gbc-bar p-2"
            >
              <p className="text-center text-[10px] leading-loose text-black">
                TAP TO GO ON
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
