import { Link } from 'react-router-dom';

// items: [{ name, path }] — last item is the current page (no link).
export default function Breadcrumbs({ items }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={item.path || item.name}>
            {last || !item.path ? (
              <span className="crumb-cur" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link to={item.path}>{item.name}</Link>
            )}
            {!last && <span aria-hidden="true"> › </span>}
          </span>
        );
      })}
    </nav>
  );
}
