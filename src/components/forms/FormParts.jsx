import Icon from '../Icon.jsx';

// Hidden honeypot field — real users never fill it; bots often do.
export function Honeypot({ value, onChange }) {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}>
      <label>
        Do not fill this field
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
}

export function FormStatus({ status, message }) {
  if (!message) return null;
  if (status === 'success') {
    return (
      <p className="form-msg form-ok" role="status">
        <Icon name="check" size={18} /> {message}
      </p>
    );
  }
  if (status === 'error') {
    return (
      <p className="form-msg form-error" role="alert">
        {message}
      </p>
    );
  }
  return null;
}
