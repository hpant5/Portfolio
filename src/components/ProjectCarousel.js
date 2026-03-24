'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Gallery from './Gallery';

const ExtIcon = () => (<svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M1 13L13 1M13 1H5M13 1V9" /></svg>);
const GHIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>);
const ChevL = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>);
const ChevR = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>);

function tagClass(t) {
  if (t === 'Hackathon Winner') return 'tag-winner';
  if (t === 'Hackathon') return 'tag-winner';
  if (t === 'Live') return 'tag-live';
  if (t === 'Building') return 'tag-building';
  if (t === 'Academic') return 'tag-academic';
  return 'tag-industry';
}

export default function ProjectCarousel({ projects }) {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  // Auto-scroll
  useEffect(() => {
    const el = trackRef.current;
    if (!el || paused) return;
    const interval = setInterval(() => {
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: 420, behavior: 'smooth' });
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [paused]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateArrows);
    updateArrows();
    return () => el.removeEventListener('scroll', updateArrows);
  }, [updateArrows]);

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 420, behavior: 'smooth' });
  };

  return (
    <div className="carousel-wrapper" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {canScrollLeft && (
        <button className="carousel-arrow carousel-arrow-l" onClick={() => scroll(-1)}><ChevL /></button>
      )}
      {canScrollRight && (
        <button className="carousel-arrow carousel-arrow-r" onClick={() => scroll(1)}><ChevR /></button>
      )}
      <div className="carousel-track" ref={trackRef}>
        {projects.map((p) => (
          <div key={p.id} className={`carousel-card${p.highlight ? ' highlight' : ''}`}>
            <div className="card-header">
              <span className="card-title">{p.title}</span>
              <span className={`tag ${tagClass(p.tag)}`}>{p.tag}</span>
            </div>
            {p.role && <p className="card-role">{p.role}</p>}
            <p className="card-desc">{p.desc}</p>
            <Gallery images={p.images} captions={p.captions} />
            <div className="card-footer">
              <div className="pills">{p.tech.map((t) => <span key={t} className="pill">{t}</span>)}</div>
              <div className="card-links">
                {p.github && (<a href={p.github} target="_blank" rel="noopener noreferrer"><GHIcon /> Code</a>)}
                {p.link && (<a href={p.link} target="_blank" rel="noopener noreferrer"><ExtIcon /> Live</a>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
