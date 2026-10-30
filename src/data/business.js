// Centralized business information — single source of truth across the site.
export const business = {
  name: 'Gerousia Care Services',
  legalName: 'Gerousia Care Services LLC',
  slogan: 'Compassionate care. Familiar surroundings. Peace of mind.',
  tagline: 'Home care named for the honor of growing older.',
  description:
    'Compassionate, non-medical home care for older adults, veterans and adults living with disabilities. Planned service area: Austin and San Antonio, Texas.',
  shortDescription:
    'Compassionate, non-medical home care planned for Austin and San Antonio, TX.',

  // Contact
  phone: '(586) 356-3509',
  phoneHref: 'tel:+15863563509',
  email: 'alexconner2323@gmail.com',
  emailHref: 'mailto:alexconner2323@gmail.com',

  // Location
  address: {
    street: 'Hill Terrace',
    locality: 'Austin',
    region: 'TX',
    country: 'US',
  },
  addressText: 'Hill Terrace, Austin, TX',
  areaServed: ['Austin, TX', 'San Antonio, TX'],
  serviceAreaNote:
    'Serving families across the Austin and San Antonio, Texas areas.',

  // Hours (update when confirmed by the client)
  hours: 'By appointment — phone answered 7 days a week',

  // Founder
  founder: {
    name: 'Alexander Conner',
    role: 'Founder',
    note:
      'A U.S. military veteran whose service shaped how he understands responsibility, dignity and care.',
  },

  // Brand
  url: 'https://gerousiacareservices.com',
  logo: '/images/logo.webp',
  ogImage: '/images/home-hero.jpg',
  themeColor: '#0E3156',

  // Social (none confirmed yet — add URLs here to surface them in the footer)
  social: [],
};

export default business;
