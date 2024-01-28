import { LoaderFunction, json } from "@remix-run/node";
import WelcomeEmail from "emails/welcome";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_TOKEN);

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const email = url.searchParams.get("email");
  const name = url.searchParams.get("name");

  if (!email || !name) {
    return json(
      {
        message: "Missing email or name",
        status: 400,
      },
      {
        status: 400,
      }
    );
  }

  const { data, error } = await resend.contacts.create({
    email,
    firstName: name,
    unsubscribed: false,
    audienceId: "4c0b84d5-bc07-430b-ab93-a2e42ca3e6c3",
  });

  
  if (error) {
    return json(
      {
        message: error.message,
        status: 400,
      },
      {
        status: 400,
      }
    );
  }

  const { data: data2, error: error2 } = await resend.emails.send({
    from: "Devin @ WEBPRISM <devin@webprism.co>",
    to: [email],
    subject: "Thanks for joining us!",
    react: <WelcomeEmail firstName={name} />,
  });

  return json(
    {
      message: "Thanks for joining us!",
      status: 200,
    },
    {
      status: 200,
    }
  );
};
