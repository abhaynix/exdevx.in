import React, { useEffect, useRef } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Code2, Layers3, Smartphone, Sparkles, Workflow, PenTool, Search } from 'lucide-react';
import { siteConfig } from '../data/site';
import { servicesData } from '../data/services';
import { techStackList } from '../data/process';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { Hero } from '../../components/hero';
import { ServiceCard } from '../components/ui/ServiceCard';
import { WorkCarousel } from '../components/sections/WorkCarousel';
import { ProcessStepper } from '../components/sections/ProcessStepper';
import { ContactForm } from '../components/sections/ContactForm';
import { SEO } from '../components/ui/SEO';
import { getOrganizationSchema, getWebSiteSchema } from '../lib/seo';
import { gsap, registerGsapPlugins } from '../lib/gsap';

const homeServices = servicesData.filter(({ id }) => id !== 'automation-systems');
const capabilities = [
  { label: 'Web platforms', icon: Code2 },
  { label: 'Mobile apps', icon: Smartphone },
  { label: 'Product design', icon: PenTool },
  { label: 'Backend systems', icon: Layers3 },
  { label: 'AI integration', icon: Sparkles },
  { label: 'Automation', icon: Workflow },
];

export const HomePage: React.FC = () => {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scope.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    registerGsapPlugins();
    const root = scope.current.closest('.home-theme') ?? scope.current;
    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro
        .from('[data-hero="eyebrow"]', { opacity: 0, y: 10, scale: 0.98, duration: 0.35 }, '-=0.15')
        .from('[data-hero-line]', { opacity: 0, y: 24, duration: 0.48, stagger: 0.07 }, '-=0.12')
        .from('[data-hero="copy"]', { opacity: 0, y: 14, duration: 0.38 }, '-=0.2')
        .from('[data-hero="actions"] > *', { opacity: 0, y: 10, duration: 0.32, stagger: 0.07 }, '-=0.18')
        .from('[data-hero="visual"]', { opacity: 0, y: 24, scale: 0.985, duration: 0.55 }, '-=0.1');

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 16,
          duration: 0.42,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: { trigger: element, start: 'top 86%', once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
        gsap.from(group.children, {
          opacity: 0,
          y: 16,
          duration: 0.42,
          stagger: 0.06,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: { trigger: group, start: 'top 84%', once: true },
        });
      });
      gsap.from('.home-theme footer .grid > *', {
        opacity: 0,
        y: 14,
        duration: 0.42,
        stagger: 0.06,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: '.home-theme footer', start: 'top 90%', once: true },
      });
    }, root);
    return () => context.revert();
  }, []);

  return (
    <div ref={scope} className="home-motion-scope">
      <SEO
        title="ExDevX | Web, Mobile & AI Development"
        description="ExDevX designs and builds web platforms, mobile apps, automation systems and AI integrations for businesses. Based in Maharashtra, India."
        schema={[getOrganizationSchema(), getWebSiteSchema()]}
      />

      <Hero
        className="home-hero"
        badge="Independent digital agency · Maharashtra, India"
        title={<><span data-hero-line>We build digital</span><span data-hero-line>experiences that move</span><span data-hero-line>businesses forward.</span></>}
        primary={{ label: 'Start a project', href: '/contact' }}
        secondary={{ label: 'Explore our work', href: '#work' }}
        media={
          <div data-hero="visual" className="home-hero-visual" aria-label="A preview of an ExDev digital product dashboard">
            <div className="home-arc" aria-hidden="true"><span data-hero="glow" /></div>
            <div className="home-dashboard">
              <div className="home-dashboard-top"><span className="home-dashboard-logo">ExDevX</span><span>Project collaboration</span></div>
              <div className="home-dashboard-heading"><div><small>ILLUSTRATIVE WORKFLOW</small><h2>How we work together</h2></div></div>
              <div className="home-dashboard-metrics">
                <div><small>DISCOVER</small><strong>Scope</strong><span>Understand the need</span></div>
                <div><small>DESIGN</small><strong>Shape</strong><span>Plan the experience</span></div>
                <div><small>DELIVER</small><strong>Build <em>→ launch</em></strong><span>Make it work in the world</span></div>
              </div>
              <div className="home-dashboard-panels">
                <div className="home-dashboard-projects"><div className="home-panel-title"><strong>Clear project stages</strong><span>Illustrative</span></div>{[['01', 'Discover', 'Goals, users and constraints'], ['02', 'Design', 'Scope and shape the solution'], ['03', 'Deliver', 'Build, review and launch']].map(([number, stage, detail]) => <div className="home-project-row" key={stage}><b>{number}</b><span><strong>{stage}</strong><small>{detail}</small></span></div>)}</div>
              </div>
            </div>
          </div>
        }
      >
        ExDevX turns ambitious ideas into thoughtful websites, applications and digital products built for real work.
      </Hero>
      <div className="home-hero-scroll"><a className="home-scroll-cue" href="#capabilities"><span>Scroll to explore</span><ArrowDown size={14} aria-hidden="true" /></a></div>

      <section className="home-capabilities" id="capabilities" aria-label="Agency capabilities">
        <Container size="wide">
          <div className="home-capabilities-label"><span>Designing. Building. Shipping.</span><p>One team from the first sketch to the live product.</p></div>
          <ul>{capabilities.map(({ label, icon: Icon }) => <li key={label}><Icon size={16} aria-hidden="true" /><span>{label}</span></li>)}</ul>
        </Container>
      </section>

      <Section id="services" tone="surface" className="home-section">
        <Container size="wide">
          <div data-reveal><SectionHeading title="Everything you need to build what’s next." description="Clear thinking, careful engineering and a product experience made for the people who use it." /></div>
          <div className="home-services-grid" data-reveal-group>
            {homeServices.map((service) => <div key={service.id}><ServiceCard service={service} /></div>)}
          </div>
        </Container>
      </Section>

      <WorkCarousel />

      <Section id="process" tone="surface" className="home-section">
        <Container size="wide"><div data-reveal><ProcessStepper /></div></Container>
      </Section>

      <section className="home-approach" aria-labelledby="home-approach-title">
        <Container size="wide">
          <div className="home-approach-intro" data-reveal><h2 id="home-approach-title">The right tools for the work at hand.</h2><p>We choose dependable tools around your product’s needs, then keep the architecture clear enough to grow with it.</p></div>
          <div className="home-stack-groups" data-reveal-group>
            {[
              ['Frontend', ['React', 'Next.js', 'TypeScript']],
              ['Backend & data', ['Node.js', 'Python', 'FastAPI', 'PostgreSQL']],
              ['Mobile & infrastructure', ['React Native', 'Expo', 'Docker', 'AWS']],
              ['AI & automation', ['Gemini API', 'LLM integrations', 'Workflow automation']],
            ].map(([category, items]) => <div className="home-stack-group" key={category as string}><span>{category as string}</span><p>{(items as string[]).join('　·　')}</p></div>)}
          </div>
          <span className="sr-only">Current capabilities include {techStackList.map(({ name }) => name).join(', ')}.</span>
        </Container>
      </section>

      <section className="home-about" aria-labelledby="home-about-title">
        <Container size="wide">
          <div className="home-about-layout" data-reveal><h2 id="home-about-title">Built with care. Delivered with clarity.</h2><div><p>We design, engineer and deliver practical digital products with a focus on quality, clear communication and maintainable systems.</p><p>From discovery through deployment, we work closely with you to make the product useful, dependable and ready for what comes next.</p><Button to="/about" variant="ghost" size="sm">Meet ExDevX <ArrowRight size={15} aria-hidden="true" /></Button></div></div>
        </Container>
      </section>

      <section className="home-contact-cta" aria-labelledby="home-contact-title">
        <Container size="wide"><div className="home-cta-panel"><span className="home-cta-light" data-reveal aria-hidden="true" /><div data-reveal><h2 id="home-contact-title">Let’s turn it into something real.</h2><p>Tell us what you’re thinking. We’ll help shape the next step.</p></div><div data-reveal><Button to="/contact" size="md" iconRight={null} className="home-primary-button">Start a project <ArrowUpRight size={16} aria-hidden="true" /></Button></div></div></Container>
      </section>

      <Section id="contact" className="home-contact-section">
        <Container>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5" data-reveal>
              <p className="mb-3 text-sm font-medium text-[var(--accent-bright)]">Contact</p>
              <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">Tell us what you’re building.</h2>
              <p className="mt-4 max-w-md leading-relaxed text-white/70">Send a few details about your project, or reach us directly at <a className="text-[var(--accent-bright)] underline underline-offset-4" href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.</p>
              <a className="mt-3 inline-block text-[var(--accent-bright)] underline underline-offset-4" href={siteConfig.contact.whatsappFormatted} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a>
            </div>
            <div className="lg:col-span-7" data-reveal><ContactForm /></div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default HomePage;
