import { Link } from 'react-router-dom';
import Icon from '../Icon.jsx';

export default function ServiceCard({ service }) {
  return (
    <Link className="svc-box" to={service.href}>
      <span className="circ" aria-hidden="true">
        <Icon name={service.iconKey} size={30} />
      </span>
      <h3>{service.shortTitle}</h3>
      <p>{service.blurb}</p>
      <span className="more">
        Learn more <Icon name="arrow" size={16} />
      </span>
    </Link>
  );
}
