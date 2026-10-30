// Lightweight inline line-icon set. Stroke-based, inherits currentColor.
const paths = {
  // UI
  phone: <path d="M6.6 3.5 4.3 4C3.5 4.2 3 5 3.1 5.8c.5 4 2.4 7.6 5.3 10.5s6.5 4.8 10.5 5.3c.8.1 1.6-.4 1.8-1.2l.5-2.3c.2-.8-.2-1.6-1-1.9l-2.9-1.1c-.6-.2-1.3-.1-1.7.4l-.9 1c-2-1.1-3.7-2.8-4.8-4.8l1-.9c.5-.4.6-1.1.4-1.7L10.4 5c-.3-.8-1.1-1.2-1.9-1z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7 8 6 8-6" /></>,
  pin: <><path d="M12 21s-6.5-5.3-6.5-10.3A6.5 6.5 0 0 1 12 4a6.5 6.5 0 0 1 6.5 6.7C18.5 15.7 12 21 12 21z" /><circle cx="12" cy="10.5" r="2.4" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 1.8" /></>,
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronLeft: <path d="m14 6-6 6 6 6" />,
  chevronRight: <path d="m10 6 6 6-6 6" />,
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  heart: <path d="M12 20.6s-8.2-5-8.2-11.2A4.6 4.6 0 0 1 12 6.6a4.6 4.6 0 0 1 8.2 2.8c0 6.2-8.2 11.2-8.2 11.2z" />,
  roofHeart: <><path d="M12 20.6s-8.2-5-8.2-11.2A4.6 4.6 0 0 1 12 6.6a4.6 4.6 0 0 1 8.2 2.8c0 6.2-8.2 11.2-8.2 11.2z" /><path d="M8.7 12.9 12 10.1l3.3 2.8" /><path d="M9.8 12v3.4h4.4V12" /></>,
  shield: <><path d="M12 3.5 5 6v5c0 4.5 3 7.8 7 9.5 4-1.7 7-5 7-9.5V6z" /><path d="m9 12 2 2 4-4" /></>,
  users: <><circle cx="9" cy="8" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><path d="M16 5.5a3 3 0 0 1 0 5.8M15.5 19a5.5 5.5 0 0 0-1.6-3.9" /></>,
  leaf: <><path d="M5 19c0-8 6-13 14-13 0 8-5 14-13 14-1 0-1-.5-1-1z" /><path d="M5 19 12 12" /></>,
  share: <><circle cx="6" cy="12" r="2.3" /><circle cx="17" cy="6" r="2.3" /><circle cx="17" cy="18" r="2.3" /><path d="m8 11 7-4M8 13l7 4" /></>,
  // Service icons
  'personal-care': <><path d="M12 11.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /><path d="M5 20a7 7 0 0 1 14 0" /><path d="m16.5 11.5 1.3 1.3 2.4-2.4" /></>,
  'companion-care': <><circle cx="8.5" cy="9" r="2.3" /><circle cx="15.5" cy="9" r="2.3" /><path d="M4.5 19a4 4 0 0 1 8 0M11.5 19a4 4 0 0 1 8 0" /></>,
  homemaking: <><path d="M4 11 12 4l8 7" /><path d="M6 10v9h12v-9" /><path d="M10 19v-5h4v5" /></>,
  'meal-preparation': <><path d="M6 3v7a2 2 0 0 0 2 2v9M6 3v4M9 3v4M18 3c-1.5 0-2.5 2-2.5 5s1 4 2.5 4v9" /></>,
  'respite-care': <><path d="M3 13a9 9 0 0 1 18 0" /><path d="M3 13h18" /><path d="M12 4v2M6 7 7 8M18 7l-1 1" /><path d="M3 17h18" /></>,
  'everyday-assistance': <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V3h6v1" /><path d="m8.5 11 1.5 1.5L13 9.5" /><path d="M8.5 16 10 17.5l3-3" /></>,
  'dementia-care': <><path d="M9.5 20v-2.3A6.5 6.5 0 1 1 16 9.5c0 1.6-.6 2.6-1.4 3.6-.6.8-1.1 1.5-1.1 2.6V18" /><path d="M9.5 18h4" /></>,
};

export default function Icon({ name, size = 22, className = '', title, ...rest }) {
  const content = paths[name] || paths.check;
  return (
    <svg
      className={`ic ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : 'true'}
      role={title ? 'img' : undefined}
      {...rest}
    >
      {title && <title>{title}</title>}
      {content}
    </svg>
  );
}
