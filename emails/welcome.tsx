import {
  Html,
  Tailwind,
  Body,
  Head,
  Container,
  Section,
  Img,
} from "@react-email/components";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://webprism.co"
    : "http://localhost:3000";

export default function WelcomeEmail({ firstName }: { firstName: string }) {
  return (
    <Html style={{ background: "#fafafa", fontFamily: "sans-serif" }}>
      <Head />
      <Tailwind>
        <Body className="max-w-prose mx-auto bg-white">
          <Container>
            <Section className="p-8">
              <Img className="mx-auto" src={baseUrl + "/webprism_logo.png"} />
            </Section>
            <Section className="p-8">
              <p>Hey, {firstName ?? "friend"}!</p>
              <p>
                Thanks for joining our newsletter! Here we talk about ecommerce
                design and share brands that inspire us as a creative agency.
              </p>
              <p>
                - Devin @{" "}
                <strong>
                  <a className="text-black" href="https://webprism.co">
                    WEBPRISM
                  </a>
                </strong>
              </p>
            </Section>
            <Section className="bg-[#141414]">
              <div className="p-8">
                <p className="text-white text-center">
                  <a className="text-white" href="https://webprism.co">
                    WEBPRISM
                  </a>{" "}
                  © <span>{new Date().getFullYear()}</span>
                </p>
              </div>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
