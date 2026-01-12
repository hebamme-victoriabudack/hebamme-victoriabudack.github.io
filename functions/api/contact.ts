export async function onRequestPost({ request, env }: any) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const brevoResponse = await fetch(
      "https://api.brevo.com/v3/smtp/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": env.BREVO_API_KEY,
        },
        body: JSON.stringify({
          sender: {
            name: "Website Contact Form",
            email: "no-reply@yourdomain.com",
          },
          to: [
            {
              email: "you@yourdomain.com",
              name: "Website Owner",
            },
          ],
          replyTo: {
            email: email,
            name: name,
          },
          subject: `New contact message from ${name}`,
          htmlContent: `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
          `,
        }),
      }
    );

    if (!brevoResponse.ok) {
      const errorText = await brevoResponse.text();
      return new Response(
        JSON.stringify({ error: "Brevo API error", details: errorText }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Invalid request" }),
      { status: 500 }
    );
  }
}