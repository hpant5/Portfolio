'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const apiKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (apiKey && apiKey !== 'YOUR_KEY_HERE') {
      // Use Web3Forms if key is configured
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: apiKey,
            name: form.name,
            email: form.email,
            message: form.message,
            subject: `Portfolio Contact: ${form.name}`,
          }),
        });
        if (res.ok) {
          setStatus('sent');
          setForm({ name: '', email: '', message: '' });
          setTimeout(() => setStatus('idle'), 4000);
          return;
        }
      } catch {}
    }

    // Fallback: open mailto with pre-filled content
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.open(`mailto:hpant.data@gmail.com?subject=${subject}&body=${body}`, '_self');
    setStatus('sent');
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-input"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-input"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Message</label>
        <textarea
          className="form-input form-textarea"
          placeholder="Tell me about your project or opportunity..."
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary form-submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : status === 'sent' ? '✓ Message Sent!' : 'Send Message'}
      </button>
    </form>
  );
}
