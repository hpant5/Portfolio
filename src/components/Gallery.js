'use client';

import { useState } from 'react';
import Image from 'next/image';

const ChevL = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevR = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export default function Gallery({ images, captions }) {
  const [active, setActive] = useState(0);
  if (!images || images.length === 0) return null;

  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);
  const next = () => setActive((i) => (i + 1) % images.length);

  return (
    <div className="gallery">
      <div className="gallery-frame">
        <div className="gallery-bar">
          <span />
          <span />
          <span />
        </div>
        <div className="gallery-viewport">
          <Image
            src={images[active]}
            alt={captions?.[active] || ''}
            width={1400}
            height={800}
            className="gallery-img"
            quality={90}
            priority={active === 0}
          />
          {images.length > 1 && (
            <>
              <button className="gallery-arrow gallery-arrow-l" onClick={prev} aria-label="Previous">
                <ChevL />
              </button>
              <button className="gallery-arrow gallery-arrow-r" onClick={next} aria-label="Next">
                <ChevR />
              </button>
            </>
          )}
        </div>
      </div>
      <div className="gallery-info">
        {captions?.[active] ? <span className="gallery-caption">{captions[active]}</span> : <span />}
        {images.length > 1 && (
          <div className="gallery-pips">
            {images.map((_, i) => (
              <button
                key={i}
                className={`gallery-pip${i === active ? ' active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Image ${i + 1}`}
              />
            ))}
            <span className="gallery-count">
              {active + 1} / {images.length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
