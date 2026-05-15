'use client';
import { useState, useEffect } from 'react';

const ROLES = [
  'Data Engineer',
  'AI Engineer',
  'Backend Developer'
];

export default function AnimatedRole() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = ROLES[currentRole];
    
    const typeSpeed = isDeleting ? 50 : 100; // Faster delete, slower type
    const pauseEnd = 2000; // Pause at end before deleting
    const pauseAfterDelete = 500; // Pause after delete before next word

    if (!isDeleting) {
      // Typing
      if (displayText.length < currentFullText.length) {
        const timer = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        }, typeSpeed);
        return () => clearTimeout(timer);
      } else {
        // Finished typing, pause then start deleting
        const timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseEnd);
        return () => clearTimeout(timer);
      }
    } else {
      // Deleting
      if (displayText.length > 0) {
        const timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, typeSpeed);
        return () => clearTimeout(timer);
      } else {
        // Finished deleting, move to next role
        const timer = setTimeout(() => {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % ROLES.length);
        }, pauseAfterDelete);
        return () => clearTimeout(timer);
      }
    }
  }, [displayText, isDeleting, currentRole]);

  return (
    <div className="hero-role">
      <span className="role-text">
        {displayText}
        <span className="cursor">|</span>
      </span>
    </div>
  );
}
