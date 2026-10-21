import { useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projectsData } from '../../data/projects';
import { Container } from '../ui/Container';

export function WorkCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const move = (direction: number) => track.current?.scrollBy({ left: direction * (track.current.clientWidth * 0.78), behavior: 'smooth' });

  return (
    <section id="work" className="home-work" aria-labelledby="home-work-title">
      <Container size="wide">
        <div className="home-work-heading" data-reveal>
          <div>
            <p className="home-eyebrow">Selected work</p>
            <h2 id="home-work-title">Selected Work</h2>
            <p className="home-work-intro">A selection of platforms, products and tools we’ve built.</p>
          </div>
          <Link to="/work" className="home-all-work focus-ring">All projects <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
        <div className="home-carousel" role="region" aria-roledescription="carousel" aria-label="Selected projects">
          <div className="home-carousel-track" ref={track} tabIndex={0} onKeyDown={(event) => {
            if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
            if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
          }}>
            {projectsData.map((project, index) => (
              <article className="home-work-card" data-reveal key={project.slug}>
                <div className={`home-work-art home-work-art-${index + 1}`} aria-hidden="true">
                  <span className="home-art-mark">{project.title}</span>
                  <span className="home-art-index">0{index + 1}</span>
                  <span className="home-art-lines" />
                </div>
                <div className="home-work-card-copy">
                  <div><p>{project.category}</p><h3>{project.title}</h3><span>{project.summary}</span></div>
                  <Link to={`/work/${project.slug}`} aria-label={`Read the ${project.title} case study`} className="home-card-link focus-ring"><ArrowUpRight size={19} aria-hidden="true" /></Link>
                  <p className="home-work-stack">{project.stack.slice(0, 4).join(' · ')}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="home-carousel-controls">
            <button type="button" onClick={() => move(-1)} aria-label="Previous projects"><ArrowLeft size={16} aria-hidden="true" /></button>
            <button type="button" onClick={() => move(1)} aria-label="Next projects"><ArrowRight size={16} aria-hidden="true" /></button>
          </div>
        </div>
      </Container>
    </section>
  );
}
