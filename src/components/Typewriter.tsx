import React, { useEffect, useState } from 'react';

interface TypewriterProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

function Typewriter({
  phrases,
  typingSpeed = 70,
  deletingSpeed = 40,
  pauseDuration = 2200,
}: TypewriterProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting && displayText === currentPhrase) {
      const pause = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(pause);
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        const nextLength = isDeleting ? displayText.length - 1 : displayText.length + 1;
        setDisplayText(currentPhrase.slice(0, nextLength));
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className="typewriter">
      {displayText}
      <span className="typewriter-cursor" aria-hidden="true">|</span>
    </span>
  );
}

export default Typewriter;
