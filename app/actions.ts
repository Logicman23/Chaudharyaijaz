"use server";

export type SubscribeState = {
  status: "idle" | "success" | "error";
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Newsletter / volunteer sign-up.
 *
 * Posts the sign-up as JSON to NEWSLETTER_WEBHOOK_URL. That one variable can point
 * at whichever list the campaign uses:
 *   - Zapier / Make "Catch Hook" → Mailchimp, Google Sheets, WhatsApp broadcast
 *   - A Resend Audiences or Mailchimp API proxy
 * Until it is set, sign-ups are refused with a clear message rather than being
 * silently dropped.
 */
export async function subscribe(_prev: SubscribeState, formData: FormData): Promise<SubscribeState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const name = String(formData.get("name") ?? "").trim().slice(0, 100);
  const volunteer = formData.get("volunteer") === "on";

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const webhook = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!webhook) {
    console.warn("[subscribe] NEWSLETTER_WEBHOOK_URL is not set — sign-up not stored:", email);
    return {
      status: "error",
      message: "Sign-ups open soon. Meanwhile, follow us on Facebook for updates.",
    };
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, volunteer, source: "website", at: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error("[subscribe]", err);
    return { status: "error", message: "Something went wrong. Please try again in a moment." };
  }

  return {
    status: "success",
    message: volunteer
      ? "Welcome to the movement! Our team will contact you about volunteering."
      : "You're in. Updates from Chaudhary Aijaz are on their way.",
  };
}
