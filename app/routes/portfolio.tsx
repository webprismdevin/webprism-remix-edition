import { Link } from "@remix-run/react";
import { IconArrowLeft } from "@tabler/icons-react";

export default function Portfolio() {
  return (
    <div className="relative">
      <div className="absolute top-4 left-4">
        <Link to="/" className="flex items-center gap-2 text-white">
          <IconArrowLeft /> Back to home
        </Link>
      </div>
      <div className="block md:hidden h-full text-white max-w-[1200px] mx-auto py-20 px-5 text-center">
        <h2  className="text-2xl font-heading uppercase font-bold">Mobile browsers don't like Figma embeds 😢</h2>
        <a className="text-cyan-500 mt-10 block" href="https://www.figma.com/file/PIl7WC6I3e2C6ia7Hgwf3S/Our-Portfolio?type=design&node-id=0%3A1&mode=design&t=by1sgsi916eVVua9-1">
          Click here to see our work →
        </a>
      </div>
      <div className="relative h-full text-white max-w-[1200px] mx-auto py-20 space-y-10 hidden md:block">
        <section>
          <div>
            <h2 className="text-4xl md:text-6xl font-bold font-heading uppercase text-center mb-4">
              Landing Pages
            </h2>
          </div>
          <iframe
            style={{
              border: "1px solid rgba(0, 0, 0, 0.1)",
              minHeight: "700px",
            }}
            width="100%"
            height="100%"
            src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FPIl7WC6I3e2C6ia7Hgwf3S%2FOur-Portfolio%3Ftype%3Ddesign%26node-id%3D0%253A1%26mode%3Ddesign%26t%3DQlvhqj9Pl8HwpwFm-1"
            allowFullScreen
          ></iframe>
        </section>
        <section>
          <div>
            <h2 className="text-4xl md:text-6xl font-bold font-heading uppercase text-center mb-4">
              Home Pages
            </h2>
          </div>
          <iframe
            style={{
              border: "1px solid rgba(0, 0, 0, 0.1)",
              minHeight: "700px",
            }}
            width="100%"
            height="100%"
            src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FPIl7WC6I3e2C6ia7Hgwf3S%2FOur-Portfolio%3Ftype%3Ddesign%26node-id%3D7%253A5132%26mode%3Ddesign%26t%3DQlvhqj9Pl8HwpwFm-1"
            allowFullScreen
          ></iframe>
        </section>
        <section>
          <div>
            <h2 className="text-4xl md:text-6xl font-bold font-heading uppercase text-center mb-4">
              Product Pages
            </h2>
          </div>
          <iframe
            style={{
              border: "1px solid rgba(0, 0, 0, 0.1)",
              minHeight: "700px",
            }}
            width="100%"
            height="100%"
            src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FPIl7WC6I3e2C6ia7Hgwf3S%2FOur-Portfolio%3Ftype%3Ddesign%26node-id%3D7%253A717%26mode%3Ddesign%26t%3DQlvhqj9Pl8HwpwFm-1"
            allowFullScreen
          ></iframe>
        </section>
        <section>
          <div>
            <h2 className="text-4xl md:text-6xl font-bold font-heading uppercase text-center mb-4">
              Non-Ecommerce Landing Pages
            </h2>
          </div>
          <iframe
            style={{
              border: "1px solid rgba(0, 0, 0, 0.1)",
              minHeight: "700px",
            }}
            width="100%"
            height="100%"
            src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FPIl7WC6I3e2C6ia7Hgwf3S%2FOur-Portfolio%3Ftype%3Ddesign%26node-id%3D15%253A926%26mode%3Ddesign%26t%3DQlvhqj9Pl8HwpwFm-1"
            allowFullScreen
          ></iframe>
        </section>
        <div
          dangerouslySetInnerHTML={{
            __html: `<style>.embed_documentation_footer--documentationFooter--cRlI0{display: none !important;}</style>`,
          }}
        />
      </div>
    </div>
  );
}
