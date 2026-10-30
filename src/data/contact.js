// Contact page content.
export const contactContent = {
  "page": "contact",
  "meta": {
    "route": "/contact",
    "title": "Contact Us | Gerousia Care Services, Austin & San Antonio",
    "description": "Contact Gerousia Care Services in Austin, TX. Call (586) 356-3509 about upcoming non-medical home care in Austin and San Antonio."
  },
  "sections": [
    {
      "type": "hero",
      "breadcrumb": [
        "Home",
        "Contact"
      ],
      "kicker": "Get in touch",
      "heading": "Reach the Gerousia team",
      "lead": "Whether you’re exploring support for yourself or someone you love, we welcome the opportunity to learn what matters to you. Contact us about upcoming services."
    },
    {
      "type": "contact_details",
      "rows": [
        {
          "label": "Call us",
          "value": "(586) 356-3509",
          "href": "tel:+15863563509"
        },
        {
          "label": "Email",
          "value": "alexconner2323@gmail.com"
        },
        {
          "label": "Office",
          "value": "Hill Terrace, Austin, TX"
        },
        {
          "label": "Hours",
          "value": "[OFFICE HOURS]"
        },
        {
          "label": "Planned service area",
          "value": "Austin & San Antonio, Texas"
        }
      ]
    },
    {
      "type": "contact_form",
      "heading": "Talk With Us About Care",
      "intro": "Tell us what matters to you and we’ll follow up to talk it through.",
      "form": {
        "formName": "contact",
        "action": "[FORM ENDPOINT]",
        "method": "post",
        "fields": [
          {
            "label": "Your name",
            "name": "name",
            "type": "text",
            "required": true,
            "autocomplete": "name",
            "placeholder": "First and last name"
          },
          {
            "label": "Phone",
            "name": "phone",
            "type": "tel",
            "required": true,
            "autocomplete": "tel",
            "placeholder": "(000) 000-0000"
          },
          {
            "label": "Email",
            "name": "email",
            "type": "email",
            "required": false,
            "autocomplete": "email",
            "placeholder": "you@email.com"
          },
          {
            "label": "Care needed",
            "name": "service",
            "type": "select",
            "required": false,
            "options": [
              "Select a service…",
              "Personal Care With Dignity",
              "Meaningful Companionship",
              "Comfort at Home",
              "Meals Made Personal",
              "Support for Family Caregivers",
              "Everyday Assistance",
              "Dementia & Alzheimer’s Care",
              "Not sure yet"
            ]
          },
          {
            "label": "How can we help?",
            "name": "message",
            "type": "textarea",
            "required": false,
            "rows": 4,
            "placeholder": "Please do not include detailed medical information in this form."
          }
        ],
        "submitLabel": "Send Request"
      }
    },
    {
      "type": "cta_band",
      "heading": "Let’s Talk About Care",
      "body": "Whether you’re exploring support for yourself or someone you love, we welcome the opportunity to learn what matters to you. Contact us about upcoming services.",
      "area": "Planned service area: Austin and San Antonio, Texas.",
      "buttons": [
        {
          "label": "Talk With Us About Care",
          "href": "/contact"
        },
        {
          "label": "Call (586) 356-3509",
          "href": "tel:+15863563509"
        }
      ]
    }
  ],
  "mapPlaceholder": null,
  "faq": null,
  "notes": "No map placeholder and no FAQ present on the contact page. Office hours shown as literal placeholder token [OFFICE HOURS]."
};

export default contactContent;
