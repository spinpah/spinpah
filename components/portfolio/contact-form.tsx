"use client";

import React from "react";

const inputStyle = (hasError: boolean): React.CSSProperties => ({
  width: "100%",
  background: "var(--input-bg)",
  color: "var(--ink)",
  border: `1.5px solid ${hasError ? "#D64545" : "var(--border2)"}`,
  borderRadius: 10,
  padding: "16px 18px",
  fontSize: 15,
  fontFamily: "var(--font-archivo), Archivo, sans-serif",
  outline: "none",
});

const errStyle: React.CSSProperties = {
  color: "#D64545",
  fontSize: 12,
  marginTop: 5,
  paddingLeft: 6,
};

export default function ContactForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [errors, setErrors] = React.useState<{
    name?: string;
    email?: string;
    desc?: string;
    form?: string;
  }>({});
  const [sending, setSending] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const validate = () => {
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = "Please add your name";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      errs.email = "That email doesn't look right";
    if (desc.trim().length < 10)
      errs.desc = "Tell me a bit more about the project (10+ characters)";
    return errs;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message: desc }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to send");
      }
      setSent(true);
    } catch (err) {
      setErrors({
        form:
          err instanceof Error
            ? err.message
            : "Something went wrong , please email me directly.",
      });
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div
        style={{
          background: "var(--card)",
          borderRadius: 12,
          padding: "48px 36px",
          textAlign: "center",
          boxShadow: "0 12px 36px var(--shadowc)",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "var(--teal-tint)",
            color: "var(--teal-ink)",
            display: "grid",
            placeItems: "center",
            fontSize: 24,
            margin: "0 auto 18px",
          }}
        >
          ✓
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>
          Message sent!
        </div>
        <p style={{ fontSize: 15, color: "var(--muted)", margin: "10px 0 0" }}>
          Thanks , I&apos;ll reply within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      style={{ display: "flex", flexDirection: "column", gap: 14 }}
      noValidate
    >
      <div>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle(!!errors.name)}
        />
        {errors.name && <div style={errStyle}>{errors.name}</div>}
      </div>
      <div>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle(!!errors.email)}
        />
        {errors.email && <div style={errStyle}>{errors.email}</div>}
      </div>
      <div>
        <textarea
          placeholder="Describe your project…"
          rows={4}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          style={{ ...inputStyle(!!errors.desc), resize: "vertical" }}
        />
        {errors.desc && <div style={errStyle}>{errors.desc}</div>}
      </div>
      {errors.form && <div style={errStyle}>{errors.form}</div>}
      <button
        type="submit"
        disabled={sending}
        className="pf-btn"
        style={{
          fontSize: 15,
          padding: "17px 28px",
          justifyContent: "center",
          opacity: sending ? 0.6 : 1,
          cursor: sending ? "default" : "pointer",
        }}
      >
        {sending ? "Sending…" : "Send message →"}
      </button>
    </form>
  );
}
