import { Link } from 'react-router-dom';
import { portfolioProjectsData } from '../../data/projects';
import { Container } from '../ui/Container';

/** Selected work as a ruled list. Every row links to the real project. */
export function WorkList() {
  return (
    <section id="work" className="home-work" aria-labelledby="home-work-title">
      <Container size="wide">
        <div className="home-work-heading" data-reveal>
          <div>
            <h2 id="home-work-title">Selected work</h2>
            <p className="home-work-intro">A selection of platforms, products and tools we’ve built.</p>
          </div>
          <Link to="/work" className="home-all-work focus-ring">All projects</Link>
        </div>
        <ol className="home-list" data-reveal-group>
          {portfolioProjectsData.map((project, index) => {
            const href = project.caseStudyUrl ?? project.liveUrl;
            const title = project.caseStudyUrl
              ? <Link to={project.caseStudyUrl} className="focus-ring">{project.title}</Link>
              : <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="focus-ring">{project.title}<span className="sr-only"> (opens in a new tab)</span></a>;
            return (
              <li className="home-row" key={project.slug}>
                <span className="home-row-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <p className="home-row-kind">{project.category}</p>
                  <h3>{href ? title : project.title}</h3>
                  <p className="home-row-desc">{project.summary}</p>
                </div>
                {project.stack && <ul className="home-row-meta" aria-label={`${project.title} stack`}>{project.stack.slice(0, 4).map((item) => <li key={item}>{item}</li>)}</ul>}
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
