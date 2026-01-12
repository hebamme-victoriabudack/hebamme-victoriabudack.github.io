export async function POST({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: {
        name: "Hebamme Victoria Budack",
        email: process.env.BREVO_FROM_EMAIL || "info@hebamme-victoriabudack.de",
      },
      to: [
        {
          email: "info@hebamme-victoriabudack.de", // Your email
          name: "You",
        },
      ],
      subject: `Neue Nachricht von ${name}`,
      htmlContent: `
        <h2>Kontaktformular</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Nachricht:</strong> ${message}</p>
      `,
    }),
  });

  if (res.ok) {
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } else {
    const error = await res.json();
    console.error("Brevo error:", error);
    return new Response(JSON.stringify({ success: false, error: "Failed to send" }), { status: 500 });
  }
}