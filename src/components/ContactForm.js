'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, sent, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // Using Web3Forms - free, no signup needed for basic use
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'YOUR_KEY_HERE',
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
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
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
      {status === 'error' && <p className="form-error">Something went wrong. Try emailing directly at hpant.data@gmail.com</p>}
    </form>
  );
}
