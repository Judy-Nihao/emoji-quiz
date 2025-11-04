import { motion } from "motion/react";
import { Button } from "./ui/button";
import type { Topic } from "../constants";

interface TopicSelectionProps {
  topics: Topic[];
  onSelectTopic: (topicId: string) => void;
  onBack: () => void;
}

export const TopicSelection = ({ topics, onSelectTopic, onBack }: TopicSelectionProps) => {
  return (
    <div className="flex items-center justify-center p-4 bg-[#B4BFBE] h-app overflow-auto">
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-2xl"
      >
        {/* Main window */}
        <div className="gbc-panel-outer-thick">
          <div className="gbc-window">
            
            {/* Header bar */}
            <div className="gbc-header p-3 mb-1 flex items-center gap-3">
            <Button
              onClick={onBack}
              className="gbc-button flex items-center justify-center pb-2 bg-white text-black p-2 text-[10px] min-w-[48px] min-h-[48px]"
            >
              ◀
            </Button>
            
            <h1 className="flex-1 text-center text-xs md:text-lg leading-loose">
              SELECT
            </h1>
            </div>

            {/* Content */}
            <div className="gbc-content">
            
              {/* Instruction */}
              <div className="gbc-bar p-2 mb-4">
                <p className="text-center text-[10px] md:text-xs leading-loose text-black">
                  PICK TOPIC
                </p>
              </div>

            {/* Topic menu - GBC style list */}
            <div className="space-y-3">
              {topics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => onSelectTopic(topic.id)}
                    className="w-full text-left group gbc-button bg-white p-3 relative"
                  >
                    {/* Selection arrow - hidden by default, shown on hover */}
                    <motion.span
                      className="absolute left-2 opacity-0 group-hover:opacity-100 text-lg"
                    >
                      ▶
                    </motion.span>
                    
                    <div className="flex items-center gap-3 ml-8">
                      <div className="text-3xl md:text-4xl">
                        {topic.emoji}
                      </div>
                      
                      <div className="flex-1">
                        <div className="bg-black text-white px-2 py-1 mb-1">
                          <h3 className="text-xs md:text-sm leading-normal">
                            {topic.name.toUpperCase()}
                          </h3>
                        </div>
                        
                        <p className="text-[10px] leading-normal text-[#8B9594]">
                          {topic.description.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
