# Sound Effects Guide

## Overview
This emoji quiz game is designed to include playful sound effects to enhance the Pokémon "Who Am I?" experience. While the visual design is complete, sound effects would need to be implemented using the Web Audio API or a library like Howler.js.

## Recommended Sound Effects

### 1. Correct Answer
- **Sound**: Cheerful chime or "ding!" sound
- **Trigger**: When user selects the correct answer
- **Volume**: Medium-high
- **Example**: A rising musical note sequence (like Pokémon evolution sound)

### 2. Wrong Answer
- **Sound**: Gentle "oops" or descending notes
- **Trigger**: When user selects an incorrect answer
- **Volume**: Medium
- **Example**: A playful "boing" or "whomp whomp" sound

### 3. Timer Countdown (Urgent)
- **Sound**: Quick tick-tock or beeping
- **Trigger**: When timer reaches 3 seconds or less
- **Volume**: Medium-low (should not be overwhelming)
- **Example**: Gentle beeps that increase in frequency

### 4. Timeout
- **Sound**: Buzzer or alarm sound
- **Trigger**: When timer reaches 0
- **Volume**: Medium
- **Example**: Classic game show buzzer sound

### 5. Card Flip
- **Sound**: Swoosh or flip sound
- **Trigger**: When the emoji card flips to reveal the answer
- **Volume**: Low-medium
- **Example**: Paper flip or whoosh sound effect

### 6. Button Clicks
- **Sound**: Light pop or click
- **Trigger**: Any button press (topic selection, start game, etc.)
- **Volume**: Low
- **Example**: Soft "pop" or "click" sound

### 7. Success Screen
- **Sound**: Celebration music or fanfare
- **Trigger**: When success screen appears
- **Volume**: Medium
- **Example**: Short celebratory jingle with sparkle sounds

### 8. Game Over
- **Sound**: Victory fanfare (for good scores) or gentle ending music
- **Trigger**: When reaching the game over screen
- **Volume**: Medium
- **Example**: Triumphant music for perfect scores, encouraging music for lower scores

## Implementation Notes

### Using Howler.js (Recommended)
```javascript
import { Howl } from 'howler';

const correctSound = new Howl({
  src: ['/sounds/correct.mp3'],
  volume: 0.7
});

const wrongSound = new Howl({
  src: ['/sounds/wrong.mp3'],
  volume: 0.5
});

// Play on correct answer
correctSound.play();
```

### Using Web Audio API
```javascript
const audioContext = new AudioContext();

function playSound(frequency, duration) {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = frequency;
  gainNode.gain.value = 0.3;
  
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
}
```

## Sound File Sources
- **Free Resources**: 
  - Freesound.org
  - Zapsplat.com
  - Pixabay (Audio section)
  - YouTube Audio Library

## User Preferences
Consider adding:
- Mute/unmute button
- Volume slider
- Sound effects on/off toggle in settings

---

**Note**: This game currently focuses on visual design and animations. Sound effects can be added as an enhancement in future versions.
