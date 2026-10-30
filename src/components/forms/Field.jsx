// Accessible form field wrapper for input / textarea / select.
export default function Field({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  required = false,
  options,
  rows = 4,
  autoComplete,
  placeholder,
  min,
}) {
  const id = `f-${name}`;
  const errId = `${id}-err`;
  const describedBy = error ? errId : undefined;

  const shared = {
    id,
    name,
    value,
    onChange,
    onBlur,
    required,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': describedBy,
    autoComplete,
    placeholder,
  };

  return (
    <label htmlFor={id}>
      <span>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </span>

      {type === 'textarea' ? (
        <textarea {...shared} rows={rows} />
      ) : type === 'select' ? (
        <select {...shared}>
          {options.map((opt) => {
            const o = typeof opt === 'string' ? { value: opt, label: opt } : opt;
            return (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            );
          })}
        </select>
      ) : (
        <input {...shared} type={type} min={min} />
      )}

      {error && (
        <span className="field-err" id={errId} role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
