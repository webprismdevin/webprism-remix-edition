import { z } from "zod";
// Adjust the import path according to your project structure
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ActionFunction, json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { Resend } from "resend";
import { IconLoader2 } from "@tabler/icons-react";

// Define your form schema
export const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  emailAddress: z.string().email("Invalid email address"),
  brandUrl: z.string().url("Invalid URL"),
  whatAreYouLookingFor: z.enum([
    "shopify store",
    "brand direction",
    "landing pages",
    "email design",
    "something else",
  ]),
  howDidYouHearAboutUs: z.string().optional(),
});

export const action: ActionFunction = async ({ request }) => {
  const resend = new Resend(process.env.RESEND_API_TOKEN);

  const formData = await request.formData();
  const result = contactFormSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return json(
      { errors: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  console.log({ result });

  const { data, error } = await resend.emails.send({
    from: "Website Form Submission <website@webprism.co>",
    to: ["devin@webprism.co"],
    subject: `👋 Website submission from ${result.data.firstName}`,
    html: `<div>
      <div>Name: ${result.data.firstName}</div>
      <div>Email: ${result.data.emailAddress}</div>
      <div>Brand URL: ${result.data.brandUrl}</div>
      <div>What they're looking for: ${result.data.whatAreYouLookingFor}</div>
      <div>How they heard about us: ${result.data.howDidYouHearAboutUs}</div>
    </div>`,
  });

  return json({ success: "Thank you for your submission!" }, { status: 200 });
};

export function ContactForm({ action }: { action?: string }) {
  const fetcher = useFetcher();
  const errors = fetcher.data?.errors;

  return (
    <fetcher.Form
      method="post"
      action={action ?? undefined}
      className="grid gap-cols-1 gap-4"
    >
      <div>
        <Label htmlFor="firstName">First Name</Label>
        <Input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="John"
        />
        {errors?.fullName && <p>{errors.fullName}</p>}
      </div>
      <div>
        <Label htmlFor="emailAddress">Email Address</Label>
        <Input
          type="email"
          name="emailAddress"
          id="emailAddress"
          placeholder="babayaga@continental.com"
        />
        {errors?.emailAddress && <p>{errors.emailAddress}</p>}
      </div>
      <div>
        <Label htmlFor="brandUrl">Brand URL</Label>
        <Input
          type="url"
          name="brandUrl"
          id="brandUrl"
          placeholder="thehightable.org"
        />
        {errors?.brandUrl && <p>{errors.brandUrl}</p>}
      </div>
      <div>
        <Label htmlFor="whatAreYouLookingFor">What are you looking for?</Label>
        <Select name="whatAreYouLookingFor">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="shopify store">Shopify Store</SelectItem>
            <SelectItem value="brand direction">Brand Direction</SelectItem>
            <SelectItem value="landing pages">Landing Pages</SelectItem>
            <SelectItem value="email design">Email Design</SelectItem>
            <SelectItem value="something else">Something else</SelectItem>
          </SelectContent>
        </Select>
        {errors?.whatAreYouLookingFor && <p>{errors.whatAreYouLookingFor}</p>}
      </div>
      <div>
        <Label htmlFor="howDidYouHearAboutUs">How did you hear about us?</Label>
        <Input
          type="text"
          name="howDidYouHearAboutUs"
          id="howDidYouHearAboutUs"
          placeholder="Who sent you? So we can say thanks 🙂"
        />
        {errors?.howDidYouHearAboutUs && <p>{errors.howDidYouHearAboutUs}</p>}
      </div>
      <Button type="submit" disabled={fetcher.state == "submitting"}>
        <span>Submit</span>
        {fetcher.state == "submitting" && (
          <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
      </Button>
      {fetcher.data?.success && (
        <p>You'll get an email from us shortly 🙂</p>
      )}
    </fetcher.Form>
  );
}
