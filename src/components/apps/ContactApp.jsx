import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import emailjs from "@emailjs/browser";
import { Github, Linkedin, Mail } from "lucide-react";

export function ContactApp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    gsap.from(".contact-field", {
      opacity: 0,
      y: 20,
      stagger: 0.15,
      duration: 0.5,
    });
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    emailjs
      .send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        "YOUR_PUBLIC_KEY"
      )
      .then(
        () => {
          setStatus("sent");
          setForm({ name: "", email: "", subject: "", message: "" });
          setErrors({});
        },
        () => setStatus("error")
      );
  };

  return (
    <div className="p-6 overflow-auto" ref={containerRef}>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div className="contact-field">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            className={`w-full px-3 py-2 rounded-lg border ${errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200`}
            placeholder="Your name"
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name}</p>
          )}
        </div>
        <div className="contact-field">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            className={`w-full px-3 py-2 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200`}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>
        <div className="contact-field">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Subject
          </label>
          <input
            type="text"
            value={form.subject}
            onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
            className={`w-full px-3 py-2 rounded-lg border ${errors.subject ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200`}
            placeholder="Subject"
          />
          {errors.subject && (
            <p className="text-xs text-red-500 mt-1">{errors.subject}</p>
          )}
        </div>
        <div className="contact-field">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Message
          </label>
          <textarea
            value={form.message}
            onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
            rows={4}
            className={`w-full px-3 py-2 rounded-lg border ${errors.message ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 resize-none`}
            placeholder="Your message"
          />
          {errors.message && (
            <p className="text-xs text-red-500 mt-1">{errors.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="contact-field w-full py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 disabled:opacity-50"
        >
          {status === "sending"
            ? "Sending..."
            : status === "sent"
              ? "Sent!"
              : status === "error"
                ? "Error — try again"
                : "Send"}
        </button>
      </form>

      <div className="contact-field flex gap-4 mt-8">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="GitHub"
        >
          <Github className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </a>
        <a
          href="mailto:you@example.com"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Email"
        >
          <Mail className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </a>
      </div>
    </div>
  );
}
