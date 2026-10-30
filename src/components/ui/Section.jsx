import Icon from '../Icon.jsx';

export function Container({ children, className = '' }) {
  return <div className={`wrap ${className}`.trim()}>{children}</div>;
}

export function Section({ children, tone = '', className = '', ...rest }) {
  // tone: '' (white default via .sec), 'tint', 'white'
  return (
    <section className={`sec ${tone} ${className}`.trim()} {...rest}>
      {children}
    </section>
  );
}

export function Kicker({ children, centered = false }) {
  return (
    <p className={`kicker ${centered ? 'c' : ''}`.trim()}>
      <Icon name="roofHeart" className="km" />
      <span>{children}</span>
    </p>
  );
}

export function SectionHead({ kicker, heading, children, centered = true, as: Heading = 'h2' }) {
  return (
    <div className={`sec-head ${centered ? 'center' : ''}`.trim()}>
      {kicker && <Kicker centered={centered}>{kicker}</Kicker>}
      {heading && <Heading>{heading}</Heading>}
      {children}
    </div>
  );
}

export default Section;
