import { useForm } from '../../hooks/useForm.js';
import { isValidEmail, isValidPhone, isRequired } from '../../utils/validation.js';
import Field from './Field.jsx';
import { Honeypot, FormStatus } from './FormParts.jsx';

const positionOptions = [
  { value: '', label: 'Select a position…' },
  'Caregiver / Personal Care Attendant',
  'Companion',
  'Homemaker',
  'Other',
];
const availabilityOptions = [
  { value: '', label: 'Select availability…' },
  'Days',
  'Nights',
  'Weekends',
  'Flexible',
];
const experienceOptions = [
  { value: '', label: 'Select experience…' },
  'None yet',
  'Less than 1 year',
  '1–3 years',
  '3–5 years',
  '5+ years',
];

const rules = {
  name: (v) => (!isRequired(v) ? 'Please enter your name' : ''),
  phone: (v) => (!isRequired(v) ? 'Please enter your phone number' : !isValidPhone(v) ? 'Enter a valid phone number' : ''),
  email: (v) => (!isRequired(v) ? 'Please enter your email' : !isValidEmail(v) ? 'Enter a valid email' : ''),
};

export default function CareersForm() {
  const f = useForm(
    { name: '', phone: '', email: '', position: '', availability: '', experience: '', message: '' },
    rules,
    '/api/careers'
  );

  return (
    <form className="form card" onSubmit={f.handleSubmit} noValidate>
      <div className="row">
        <Field label="Full name" name="name" value={f.values.name} onChange={f.handleChange}
          onBlur={f.handleBlur} error={f.touched.name && f.errors.name} required autoComplete="name" />
        <Field label="Phone" name="phone" type="tel" value={f.values.phone} onChange={f.handleChange}
          onBlur={f.handleBlur} error={f.touched.phone && f.errors.phone} required autoComplete="tel" />
      </div>

      <Field label="Email" name="email" type="email" value={f.values.email} onChange={f.handleChange}
        onBlur={f.handleBlur} error={f.touched.email && f.errors.email} required autoComplete="email" />

      <div className="row">
        <Field label="Position" name="position" type="select" value={f.values.position}
          onChange={f.handleChange} options={positionOptions} />
        <Field label="Availability" name="availability" type="select" value={f.values.availability}
          onChange={f.handleChange} options={availabilityOptions} />
      </div>

      <Field label="Caregiving experience" name="experience" type="select" value={f.values.experience}
        onChange={f.handleChange} options={experienceOptions} />

      <Field label="Tell us about yourself" name="message" type="textarea" rows={5}
        value={f.values.message} onChange={f.handleChange} />

      <Honeypot value={f.values._gotcha} onChange={f.handleChange} />

      <button className="btn btn-primary" type="submit" disabled={f.status === 'submitting'}>
        {f.status === 'submitting' ? 'Submitting…' : 'Submit application'}
      </button>
      <FormStatus status={f.status} message={f.serverMessage} />
    </form>
  );
}
