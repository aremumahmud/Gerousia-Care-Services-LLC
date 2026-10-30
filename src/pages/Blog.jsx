import { useMemo, useState } from 'react';
import Seo from '../components/Seo.jsx';
import Icon from '../components/Icon.jsx';
import PostCard from '../components/ui/PostCard.jsx';
import { Link } from 'react-router-dom';
import { Container, Kicker, SectionHead } from '../components/ui/Section.jsx';
import CtaBand from '../components/sections/CtaBand.jsx';
import { posts, categories } from '../data/posts.js';
import { formatDate } from '../utils/format.js';
import {
  websiteSchema,
  breadcrumbSchema,
} from '../utils/structuredData.js';

const PAGE_SIZE = 6;

export default function Blog() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);

  const featured = posts[0];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesCat = category === 'All' || p.category === category;
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.excerpt || '').toLowerCase().includes(q) ||
        (p.metaDescription || '').toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [query, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const resetPage = (fn) => (val) => {
    fn(val);
    setPage(1);
  };

  return (
    <div className="page active">
      <Seo
        title="Blog | Home Care Tips for Austin & San Antonio Families"
        description="Guidance for families exploring non-medical home care in Austin and San Antonio, TX — from everyday caregiving tips to planning a parent’s care."
        keywords="home care blog, senior care tips Austin, caregiver advice San Antonio, dementia care tips, aging parents"
        jsonLd={[
          websiteSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
          ]),
        ]}
      />

      <section className="page-hero">
        <Container>
          <Kicker>From our blog</Kicker>
          <h1>Home Care Tips for Austin &amp; San Antonio Families</h1>
          <p className="lead">
            Practical, compassionate guidance for families supporting an aging
            parent, spouse or loved one at home.
          </p>
        </Container>
      </section>

      {/* Featured post */}
      {category === 'All' && !query && current === 1 && (
        <section className="sec white">
          <Container>
            <Link className="featured-post" to={`/blog/${featured.slug}`}>
              <div className="featured-art">
                <img
                  src={`/images/${featured.image}`}
                  alt=""
                  width="760"
                  height="480"
                />
              </div>
              <div className="featured-copy">
                <span className="tag">Featured · {featured.category}</span>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <span className="meta">
                  {formatDate(featured.publishDate)} · {featured.readTime}
                </span>
                <span className="more">
                  Read article <Icon name="arrow" size={16} />
                </span>
              </div>
            </Link>
          </Container>
        </section>
      )}

      {/* Controls + grid */}
      <section className="sec tint">
        <Container>
          <SectionHead kicker="All articles" heading="Browse our guidance" />

          <div className="blog-controls">
            <div className="blog-search">
              <Icon name="pin" size={18} className="sr-only" />
              <label htmlFor="blog-q" className="sr-only">
                Search articles
              </label>
              <input
                id="blog-q"
                type="search"
                placeholder="Search articles…"
                value={query}
                onChange={(e) => resetPage(setQuery)(e.target.value)}
              />
            </div>
            <div className="blog-cats" role="group" aria-label="Filter by category">
              {['All', ...categories].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`cat-chip ${category === cat ? 'on' : ''}`.trim()}
                  aria-pressed={category === cat}
                  onClick={() => resetPage(setCategory)(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {visible.length === 0 ? (
            <p className="center no-results">
              No articles match your search. Try a different term or category.
            </p>
          ) : (
            <div className="post-grid">
              {visible.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav className="pagination" aria-label="Blog pagination">
              <button
                className="page-btn"
                disabled={current === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <Icon name="chevronLeft" size={18} /> Prev
              </button>
              <span className="page-info">
                Page {current} of {totalPages}
              </span>
              <button
                className="page-btn"
                disabled={current === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next <Icon name="chevronRight" size={18} />
              </button>
            </nav>
          )}
        </Container>
      </section>

      <CtaBand />
    </div>
  );
}
