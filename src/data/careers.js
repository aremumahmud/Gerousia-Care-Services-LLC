// Careers page content (positions, requirements, culture).
export const careersContent = {
  "page": "careers",
  "meta": {
    "route": "/careers",
    "title": "Caregiver Jobs in Austin & San Antonio, TX | Gerousia Care Services",
    "description": "Caregiver, companion and homemaker jobs in Austin and San Antonio, TX. Gerousia Care Services welcomes interest from caregivers as we prepare to begin services."
  },
  "sections": [
    {
      "type": "hero",
      "breadcrumb": [
        "Home",
        "Careers"
      ],
      "kicker": "Careers",
      "heading": "Caregiver Jobs in Austin & San Antonio, TX",
      "lead": "Caregivers are the heart of home care."
    },
    {
      "type": "intro",
      "photoPlaceholder": "Gerousia caregiver arriving at a client’s home (1600 × 700 px)",
      "body": [
        "Caregivers are the heart of home care. If you believe every person deserves to be heard, valued, and treated with dignity, we would love to hear from you.",
        "As we prepare to begin services in Austin and San Antonio, we welcome interest from kind, dependable people who take pride in making someone’s day better."
      ]
    },
    {
      "type": "open_positions",
      "positions": [
        {
          "title": "Caregivers & Personal Care Attendants",
          "meta": "Austin & San Antonio · Non-medical home care",
          "location": "Austin & San Antonio",
          "careType": "Non-medical home care",
          "whatYouWillDoHeading": "What you will do",
          "whatYouWillDo": [
            "Help clients with bathing, grooming, dressing and toileting",
            "Prepare meals and give medication reminders",
            "Support clients living with dementia with patience",
            "Keep families and the office informed"
          ]
        },
        {
          "title": "Companions & Homemakers",
          "meta": "Austin & San Antonio · Non-medical home care",
          "location": "Austin & San Antonio",
          "careType": "Non-medical home care",
          "whatYouWillDoHeading": "What you will do",
          "whatYouWillDo": [
            "Provide conversation, reading and activities clients enjoy",
            "Help with light housekeeping, laundry and linen changes",
            "Help with errands and organizing appointments",
            "Notice changes and report them to the office"
          ]
        }
      ]
    },
    {
      "type": "requirements",
      "heading": "What we look for",
      "items": [
        "A kind, patient and respectful attitude",
        "Dependability and good communication",
        "Caregiving experience is a plus",
        "Willingness to learn and follow service plans",
        "Ability to travel to clients in Austin or San Antonio"
      ]
    },
    {
      "type": "application_cta",
      "heading": "Apply to join our team",
      "headingId": "apply",
      "form": {
        "formName": "careers",
        "action": "[FORM ENDPOINT]",
        "method": "post",
        "fields": [
          {
            "label": "Full name",
            "name": "name",
            "type": "text",
            "required": true,
            "autocomplete": "name"
          },
          {
            "label": "Phone",
            "name": "phone",
            "type": "tel",
            "required": true,
            "autocomplete": "tel"
          },
          {
            "label": "Email",
            "name": "email",
            "type": "email",
            "required": true,
            "autocomplete": "email"
          },
          {
            "label": "Position",
            "name": "position",
            "type": "select",
            "required": false,
            "options": [
              "Caregiver / Personal Care Attendant",
              "Companion",
              "Homemaker",
              "Other"
            ]
          },
          {
            "label": "Availability",
            "name": "availability",
            "type": "select",
            "required": false,
            "options": [
              "Days",
              "Nights",
              "Weekends",
              "Flexible"
            ]
          },
          {
            "label": "Caregiving experience",
            "name": "experience",
            "type": "select",
            "required": false,
            "options": [
              "None yet",
              "Less than 1 year",
              "1–3 years",
              "3–5 years",
              "5+ years"
            ]
          },
          {
            "label": "Tell us about yourself",
            "name": "message",
            "type": "textarea",
            "required": false,
            "rows": 5
          }
        ],
        "submitLabel": "Submit application"
      }
    },
    {
      "type": "sidebar",
      "cards": [
        {
          "heading": "Questions about working with us?",
          "body": "Call our office to ask about open roles.",
          "cta": {
            "label": "(586) 356-3509",
            "href": "tel:+15863563509"
          }
        },
        {
          "heading": "Why join Gerousia",
          "items": [
            "Meaningful one-on-one care",
            "Clients and families who value you",
            "A team that respects your time",
            "Planned service area: Austin and San Antonio"
          ]
        }
      ]
    }
  ]
};

export default careersContent;
