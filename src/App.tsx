import { useState, useCallback } from "react";
import { StartScreen } from "./components/StartScreen";
import { TopicSelection } from "./components/TopicSelection";
import { EmojiQuiz } from "./components/EmojiQuiz";
import { SuccessScreen } from "./components/SuccessScreen";
import { ErrorScreen } from "./components/ErrorScreen";
import { GameOver } from "./components/GameOver";
import { Timer } from "./components/Timer";
import { Scoreboard } from "./components/Scoreboard";
import { Button } from "./components/ui/button";
import { ArrowLeft } from "lucide-react";
import { EMOJI_CATEGORIES, TOPICS } from "./constants";

type GameState = "start" | "topic" | "playing" | "success" | "error" | "gameover";

interface Question {
  emoji: string;
  name: string;
  options: string[];
}

const App = () => {
  const [gameState, setGameState] = useState<GameState>("start");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [answerDisabled, setAnswerDisabled] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);

  const TOTAL_QUESTIONS = 10;
  const TIMER_DURATION = 10;

  // Generate random questions based on selected topic
  const generateQuestions = useCallback((topicId: string) => {
    const emojiPool = EMOJI_CATEGORIES[topicId as keyof typeof EMOJI_CATEGORIES];
    
    // If pool has fewer items than total questions, use all items
    const numQuestions = Math.min(TOTAL_QUESTIONS, emojiPool.length);
    const shuffled = [...emojiPool].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, numQuestions);
    
    const questionsWithOptions = selected.map((item) => {
      const wrongOptions = emojiPool
        .filter((e) => e.emoji !== item.emoji)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((e) => e.name);
      
      const allOptions = [item.name, ...wrongOptions].sort(() => Math.random() - 0.5);
      
      return {
        emoji: item.emoji,
        name: item.name,
        options: allOptions,
      };
    });
    
    return questionsWithOptions;
  }, []);

  const handleTopicSelect = useCallback((topicId: string) => {
    setSelectedTopic(topicId);
    const newQuestions = generateQuestions(topicId);
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setCorrectCount(0);
    setWrongCount(0);
    setGameState("playing");
    setTimerKey(0);
    setIsTimerActive(true);
    setAnswerDisabled(false);
    setIsTimeout(false);
  }, [generateQuestions]);

  const goToTopicSelection = () => {
    setGameState("topic");
  };

  const backToStart = () => {
    setGameState("start");
    setSelectedTopic(null);
  };

  const handleAnswer = (answer: string) => {
    if (answerDisabled) return;
    
    setAnswerDisabled(true);
    setIsTimerActive(false);
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.name;
    
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      setGameState("success");
    } else {
      setWrongCount((prev) => prev + 1);
      setIsTimeout(false);
      setGameState("error");
    }
  };

  const handleTimeout = () => {
    if (gameState !== "playing") return;
    
    setAnswerDisabled(true);
    setIsTimerActive(false);
    setWrongCount((prev) => prev + 1);
    setIsTimeout(true);
    setGameState("error");
  };

  const handleContinue = () => {
    if (currentQuestionIndex + 1 >= questions.length) {
      setGameState("gameover");
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimerKey((prev) => prev + 1);
      setIsTimerActive(true);
      setAnswerDisabled(false);
      setIsTimeout(false);
      setGameState("playing");
    }
  };

  if (gameState === "start") {
    return <StartScreen onStart={goToTopicSelection} />;
  }

  if (gameState === "topic") {
    return (
      <TopicSelection
        topics={TOPICS}
        onSelectTopic={handleTopicSelect}
        onBack={backToStart}
      />
    );
  }

  if (gameState === "gameover") {
    const currentTopic = TOPICS.find(t => t.id === selectedTopic);
    return (
      <GameOver
        correct={correctCount}
        wrong={wrongCount}
        total={questions.length}
        onRestart={goToTopicSelection}
        topicName={currentTopic?.name}
        topicEmoji={currentTopic?.emoji}
      />
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentTopic = TOPICS.find(t => t.id === selectedTopic);

  return (
    <div className="flex flex-col justify-center p-3 py-4 md:py-5 bg-[#B4BFBE] h-app overflow-auto">
      <div className="max-w-4xl mx-auto w-full">
        <div className="mb-3 md:mb-4 flex items-start justify-between flex-wrap gap-2 md:gap-3">
          <Button
            onClick={goToTopicSelection}
            className="px-4 py-2 text-xs md:text-sm gbc-button bg-black text-white leading-normal mt-1"
          >
            <ArrowLeft size={12} className="mr-2 inline" />
            BACK
          </Button>
          
          <div className="flex-1 flex justify-center">
            {currentTopic && (
            <div className="gbc-panel-outer-thin">
              <div className="gbc-topic-display">
                <span className="text-2xl md:text-3xl">
                  {currentTopic.emoji}
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#8B9594] leading-tight">
                    TOPIC
                  </span>
                  <span className="text-xs md:text-sm text-black leading-normal">
                    {currentTopic.name.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            )}
          </div>
          
          <div className="w-[80px] hidden lg:block"></div>
        </div>
        
        <div className="mb-3 md:mb-4">
          <Scoreboard
            correct={correctCount}
            wrong={wrongCount}
            current={currentQuestionIndex + 1}
            total={questions.length}
          />
        </div>

        <div className="flex justify-center mb-3 md:mb-4">
          <Timer
            key={timerKey}
            duration={TIMER_DURATION}
            onTimeout={handleTimeout}
            isActive={isTimerActive}
          />
        </div>

        {currentQuestion && (
          <EmojiQuiz
            emoji={currentQuestion.emoji}
            options={currentQuestion.options}
            onAnswer={handleAnswer}
            disabled={answerDisabled}
          />
        )}

        {gameState === "success" && currentQuestion && (
          <SuccessScreen
            emoji={currentQuestion.emoji}
            onContinue={handleContinue}
          />
        )}

        {gameState === "error" && currentQuestion && (
          <ErrorScreen
            emoji={currentQuestion.emoji}
            isTimeout={isTimeout}
            onContinue={handleContinue}
          />
        )}
      </div>
    </div>
  );
};

export default App;
