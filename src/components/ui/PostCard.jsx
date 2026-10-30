import { Link } from 'react-router-dom';
import Icon from '../Icon.jsx';
import { formatDate } from '../../utils/format.js';

export default function PostCard({ post }) {
  return (
    <Link className="post-card" to={`/blog/${post.slug}`}>
      <img
        className="post-img"
        src={`/images/${post.image}`}
        alt=""
        loading="lazy"
        width="600"
        height="340"
      />
      {post.category && <span className="tag">{post.category}</span>}
      <h3>{post.title}</h3>
      <p>{post.metaDescription || post.excerpt}</p>
      <span className="post-foot">
        {post.publishDate && (
          <small className="meta">{formatDate(post.publishDate)}</small>
        )}
        <span className="more">
          Read article <Icon name="arrow" size={16} />
        </span>
      </span>
    </Link>
  );
}
