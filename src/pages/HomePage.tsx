import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/site';
import { servicesData } from '../data/services';
import { techStackList } from '../data/process';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { Hero } from '../../components/hero';
import { WorkList } from '../components/sections/WorkList';
import { ProcessStepper } from '../components/sections/ProcessStepper';
import { ContactForm } from '../components/sections/ContactForm';
import { SEO } from '../components/ui/SEO';
import { getOrganizationSchema, getWebSiteSchema } from '../lib/seo';
import { gsap, registerGsapPlugins } from '../lib/gsap';

const homeServices = servicesData.filter(({ id }) => id !== 'automation-systems');
const capabilities = ['Web platforms', 'Mobile apps', 'Product design', 'Backend systems', 'AI integration', 'Automation'];

export const HomePage: React.FC = () => {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scope.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    registerGsapPlugins();
    const root = scope.current.closest('.home-theme') ?? scope.current;
    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro
        .from('[data-hero="eyebrow"]', { opacity: 0, y: 10, duration: 0.35 }, '-=0.15')
        .from('[data-hero="title"]', { opacity: 0, y: 20, duration: 0.48 }, '-=0.12')
        .from('[data-hero="copy"]', { opacity: 0, y: 14, duration: 0.38 }, '-=0.2')
        .from('[data-hero="actions"] > *', { opacity: 0, y: 10, duration: 0.32, stagger: 0.07 }, '-=0.18')
        .from('[data-hero="visual"]', { opacity: 0, y: 20, duration: 0.55 }, '-=0.1');

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
        title="ExDevX | Web, Mobile & AI Development Agency in Pune"
        description="ExDevX designs and builds high-leverage web platforms, mobile apps, automation systems and AI integrations for growing businesses. Based in Pune, Maharashtra."
        schema={[getOrganizationSchema(), getWebSiteSchema()]}
      />

      <Hero
        className="home-hero"
        badge="Independent digital agency · Maharashtra, India"
        title="We build digital experiences that move businesses forward."
        primary={{ label: 'Start a project', href: '/contact' }}
        secondary={{ label: 'Explore our work', href: '#work' }}
        media={
          <figure data-hero="visual" className="home-shot">
            <div className="home-shot-bar">configshell.antideploy.com</div>
            <img
              src="/work/configshell.png"
              width={1440}
              height={900}
              alt="The ConfigShell website: pick a Linux distribution, browse applications and build a selection to install."
              fetchPriority="high"
              decoding="async"
            />
            <figcaption><span>ConfigShell, a live ExDevX developer tool.</span><a href="https://configshell.antideploy.com/" target="_blank" rel="noopener noreferrer">Open the site<span className="sr-only"> (opens in a new tab)</span></a></figcaption>
          </figure>
        }
      >
        ExDevX turns ambitious ideas into thoughtful websites, applications and digital products built for real work.
      </Hero>
      <section className="home-capabilities" id="capabilities" aria-label="Agency capabilities">
        <Container size="wide">
          <p>One team designs, builds and deploys your product, from the first sketch to the live release.</p>
          <ul>{capabilities.map((label) => <li key={label}>{label}</li>)}</ul>
        </Container>
      </section>

      <Section id="services" tone="surface" className="home-section">
        <Container size="wide">
          <div data-reveal><SectionHeading title="Everything you need to build what’s next." description="Clear thinking, careful engineering and a product experience made for the people who use it." /></div>
          <ul className="home-list" data-reveal-group>
            {homeServices.map((service) => (
              <li className="home-row" key={service.id}>
                <div>
                  <h3><Link to={`/services#${service.id}`} className="focus-ring">{service.title}</Link></h3>
                  <p className="home-row-desc">{service.shortDescription}</p>
                </div>
                <ul className="home-row-meta" aria-label={`${service.title} deliverables`}>{service.deliverables.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <WorkList />

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
          <div className="home-about-layout" data-reveal><h2 id="home-about-title">Built with care. Delivered with clarity.</h2><div><p>We design, engineer and deliver practical digital products with a focus on quality, clear communication and maintainable systems.</p><p>From discovery through deployment, we work closely with you to make the product useful, dependable and ready for what comes next.</p><Button to="/about" variant="ghost" size="sm">Meet ExDevX</Button></div></div>
        </Container>
      </section>

      <section className="home-contact-cta" aria-labelledby="home-contact-title">
        <Container size="wide"><div className="home-cta-panel"><div data-reveal><h2 id="home-contact-title">Let’s turn it into something real.</h2><p>Tell us what you’re thinking. We’ll help shape the next step.</p></div><div data-reveal><Button to="/contact" size="md">Start a project</Button></div></div></Container>
      </section>

      <Section id="contact" className="home-contact-section">
        <Container>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5" data-reveal>
              <p className="mb-3 text-sm font-medium text-[var(--accent-bright)]">Contact</p>
              <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-[var(--dark)] sm:text-4xl">Tell us what you’re building.</h2>
              <p className="mt-4 max-w-md leading-relaxed text-[var(--text)]">Send a few details about your project, or reach us directly at <a className="text-[var(--accent-bright)] underline underline-offset-4" href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.</p>
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
