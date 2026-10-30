import { useParams, Navigate, Link } from 'react-router-dom';
import Seo from '../../components/Seo.jsx';
import Icon from '../../components/Icon.jsx';
import Breadcrumbs from '../../components/ui/Breadcrumbs.jsx';
import PostCard from '../../components/ui/PostCard.jsx';
import { Container } from '../../components/ui/Section.jsx';
import CtaBand from '../../components/sections/CtaBand.jsx';
import { posts, getPost } from '../../data/posts.js';
import { business } from '../../data/business.js';
import { formatDate } from '../../utils/format.js';
import {
  blogPostingSchema,
  breadcrumbSchema,
} from '../../utils/structuredData.js';

function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2>{block.text}</h2>;
    case 'h3':
      return <h3>{block.text}</h3>;
    case 'quote':
      return <blockquote>{block.text}</blockquote>;
    case 'ul':
      return (
        <ul>
          {block.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol>
          {block.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ol>
      );
    default:
      return <p>{block.text}</p>;
  }
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);
  if (!post) return <Navigate to="/blog" replace />;

  const index = posts.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? posts[index - 1] : null;
  const next = index < posts.length - 1 ? posts[index + 1] : null;

  const related = posts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);
  const fallbackRelated = posts.filter((p) => p.slug !== slug).slice(0, 3);
  const relatedPosts = related.length ? related : fallbackRelated;

  const shareUrl = `${business.url}/blog/${post.slug}`;

  return (
    <div className="page active is-post">
      <Seo
        title={post.metaTitle?.replace(` | ${business.name}`, '') || post.title}
        description={post.metaDescription}
        keywords={`${post.category}, home care Austin, home care San Antonio, ${post.title}`}
        image={`/images/${post.image}`}
        type="article"
        jsonLd={[
          blogPostingSchema(post),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <section className="page-hero">
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Home', path: '/' },
              { name: 'Blog', path: '/blog' },
              { name: post.title },
            ]}
          />
          {post.category && <span className="tag">{post.category}</span>}
          <h1>{post.title}</h1>
          <p className="meta post-byline">
            By {post.author} · {formatDate(post.publishDate)} · {post.readTime}
          </p>
        </Container>
      </section>

      <section className="sec white">
        <Container className="with-side">
          <article className="content prose">
            <img
              className="post-hero-img"
              src={`/images/${post.image}`}
              alt={post.title}
              width="760"
              height="420"
            />
            {post.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}

            {/* Share */}
            <div className="share">
              <span className="share-label">
                <Icon name="share" size={18} /> Share this article
              </span>
              <div className="share-links">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                >
                  Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on X"
                >
                  X
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                >
                  LinkedIn
                </a>
                <a
                  href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareUrl)}`}
                  aria-label="Share by email"
                >
                  Email
                </a>
              </div>
            </div>

            {/* Prev / Next */}
            <nav className="pn" aria-label="More articles">
              {prev ? (
                <Link to={`/blog/${prev.slug}`}>
                  <small>
                    <Icon name="chevronLeft" size={14} /> Previous
                  </small>
                  <strong>{prev.title}</strong>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link to={`/blog/${next.slug}`} className="pn-next">
                  <small>
                    Next <Icon name="chevronRight" size={14} />
                  </small>
                  <strong>{next.title}</strong>
                </Link>
              )}
            </nav>
          </article>

          <aside className="side">
            <div className="side-card call-card">
              <h3>Talk with us about care</h3>
              <p>Compassionate non-medical home care in {business.areaServed.join(' & ')}.</p>
              <a className="btn btn-gold" href={business.phoneHref}>
                <Icon name="phone" size={18} /> {business.phone}
              </a>
              <Link className="btn btn-outline" to="/request-consultation">
                Request Consultation
              </Link>
            </div>
          </aside>
        </Container>
      </section>

      {/* Related */}
      <section className="sec tint related">
        <Container>
          <h2 className="center">Related articles</h2>
          <div className="post-grid">
            {relatedPosts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </div>
  );
}
