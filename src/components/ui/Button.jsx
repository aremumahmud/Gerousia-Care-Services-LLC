import { Link } from 'react-router-dom';
import Icon from '../Icon.jsx';

const isExternal = (href) =>
  typeof href === 'string' &&
  /^(https?:|tel:|mailto:|#)/.test(href);

/**
 * Unified button/link. Renders a router <Link> for internal paths,
 * a plain <a> for tel/mailto/external, or a <button> when onClick only.
 */
export default function Button({
  href,
  children,
  variant = 'primary',
  withArrow = false,
  icon,
  className = '',
  ...rest
}) {
  const cls = `btn btn-${variant} ${className}`.trim();
  const inner = (
    <>
      {icon && <Icon name={icon} size={18} />}
      {children}
      {withArrow && <Icon name="arrow" size={18} />}
    </>
  );

  if (href && isExternal(href)) {
    return (
      <a href={href} className={cls} {...rest}>
        {inner}
      </a>
    );
  }
  if (href) {
    return (
      <Link to={href} className={cls} {...rest}>
        {inner}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {inner}
    </button>
  );
}
