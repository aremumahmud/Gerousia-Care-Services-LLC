// Posts form data to a serverless endpoint and normalizes the response.
export async function submitForm(endpoint, payload) {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    let data = {};
    try {
      data = await res.json();
    } catch {
      /* non-JSON response */
    }

    if (!res.ok) {
      return {
        ok: false,
        error:
          data.error ||
          'Something went wrong sending your message. Please call us instead.',
        fieldErrors: data.fieldErrors || null,
      };
    }
    return { ok: true, message: data.message || 'Thank you — we’ll be in touch soon.' };
  } catch {
    return {
      ok: false,
      error:
        'We couldn’t reach the server. Please check your connection or call us directly.',
    };
  }
}
