import { LoaderFunction, json } from "@remix-run/node";
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

  resend.contacts.create({
    email,
    firstName: name,
    unsubscribed: false,
    audienceId: "4c0b84d5-bc07-430b-ab93-a2e42ca3e6c3",
  });

  return json(
    {
      message: "Success",
      status: 200,
    },
    {
      status: 200,
    }
  );
};
