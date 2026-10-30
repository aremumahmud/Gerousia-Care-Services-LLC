import { useForm } from '../../hooks/useForm.js';
import { isValidEmail } from '../../utils/validation.js';
import { Honeypot, FormStatus } from './FormParts.jsx';
import Icon from '../Icon.jsx';

const rules = {
  email: (v) => (!v?.trim() ? 'Email is required' : !isValidEmail(v) ? 'Enter a valid email' : ''),
};

export default function NewsletterForm() {
  const f = useForm({ email: '' }, rules, '/api/newsletter');

  return (
    <form className="news-form" onSubmit={f.handleSubmit} noValidate>
      <h3 className="news-h">Care tips for families</h3>
      <p className="news-p">
        Occasional guidance for Austin &amp; San Antonio families. No spam.
      </p>
      <div className="news-row">
        <label htmlFor="news-email" className="sr-only">
          Email address
        </label>
        <input
          id="news-email"
          type="email"
          name="email"
          placeholder="you@email.com"
          value={f.values.email}
          onChange={f.handleChange}
          onBlur={f.handleBlur}
          aria-invalid={f.errors.email ? 'true' : undefined}
          required
        />
        <button className="btn btn-gold" type="submit" disabled={f.status === 'submitting'}>
          {f.status === 'submitting' ? 'Joining…' : <Icon name="arrow" size={18} />}
        </button>
      </div>
      {f.errors.email && (
        <span className="field-err" role="alert">
          {f.errors.email}
        </span>
      )}
      <Honeypot value={f.values._gotcha} onChange={f.handleChange} />
      <FormStatus status={f.status} message={f.serverMessage} />
    </form>
  );
}
