import { useState, useCallback } from 'react';
import { validateForm } from '../utils/validation.js';
import { submitForm } from '../utils/submitForm.js';

/**
 * Form state manager: values, per-field validation, async submit with
 * honeypot spam protection and duplicate-submit prevention.
 *
 * @param {object}   initial   initial field values
 * @param {object}   rules     map of field -> validator (value, values) => errMsg
 * @param {string}   endpoint  API endpoint to POST to
 */
export function useForm(initial, rules, endpoint) {
  const [values, setValues] = useState({ ...initial, _gotcha: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [serverMessage, setServerMessage] = useState('');

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: '' } : prev));
  }, []);

  const handleBlur = useCallback(
    (e) => {
      const { name } = e.target;
      setTouched((t) => ({ ...t, [name]: true }));
      if (rules[name]) {
        setValues((v) => {
          const msg = rules[name](v[name], v);
          setErrors((prev) => ({ ...prev, [name]: msg }));
          return v;
        });
      }
    },
    [rules]
  );

  const reset = useCallback(() => {
    setValues({ ...initial, _gotcha: '' });
    setErrors({});
    setTouched({});
  }, [initial]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (status === 'submitting') return; // prevent duplicate submit

      const found = validateForm(values, rules);
      setErrors(found);
      setTouched(
        Object.keys(rules).reduce((acc, k) => ({ ...acc, [k]: true }), {})
      );
      if (Object.values(found).some(Boolean)) {
        setStatus('error');
        setServerMessage('Please fix the highlighted fields and try again.');
        return;
      }

      // Honeypot: if filled, silently succeed (bot) without calling the API.
      if (values._gotcha) {
        setStatus('success');
        setServerMessage('Thank you — we’ll be in touch soon.');
        reset();
        return;
      }

      setStatus('submitting');
      setServerMessage('');
      const result = await submitForm(endpoint, values);

      if (result.ok) {
        setStatus('success');
        setServerMessage(result.message);
        reset();
      } else {
        setStatus('error');
        setServerMessage(result.error);
        if (result.fieldErrors) setErrors((p) => ({ ...p, ...result.fieldErrors }));
      }
    },
    [values, rules, endpoint, status, reset]
  );

  return {
    values,
    errors,
    touched,
    status,
    serverMessage,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValues,
  };
}

export default useForm;
