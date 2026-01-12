export async function onRequestPost({ request, env }: any) {
  try {
    const data = await request.json();

    const { name, email, message, company } = data;

    // Honeypot spam check
    if (company) {
      return new Response("OK", { status: 200 });
    }

    // Validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400 }
      );
    }

    // Send email via Brevo
    const brevoResponse = await fetch(
      "https://api.brevo.com/v3/smtp/email",
      {
        method: "POST",
        headers: {
          "accept": "application/json",
          "api-key": env.BREVO_API_KEY,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: {
            email: env.BREVO_SENDER_EMAIL,
            name: "Website Contact Form",
          },
          to: [
            {
              email: env.CONTACT_RECEIVER_EMAIL,
              name: "Site Owner",
            },
          ],
          replyTo: {
            email: email,
            name: name,
          },
          subject: `New contact message from ${name}`,
          htmlContent: `
            <h3>Neues Kontaktformular</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>E-Mail:</strong> ${email}</p>
            <p><strong>Nachricht:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
          `,
        }),
      }
    );

    if (!brevoResponse.ok) {
      const errorText = await brevoResponse.text();
      console.error("Brevo error:", errorText);

      return new Response(
        JSON.stringify({ error: "Failed to send email" }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
}