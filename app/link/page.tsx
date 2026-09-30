import { getVisibleLinks } from "@/lib/links";
import { SITE_URL } from "@/lib/site";
import LinkTree from "./LinkTree";

// Edits in the admin call revalidatePath("/link"); this is the safety net.
export const revalidate = 60;

export default async function LinkPage() {
  const links = await getVisibleLinks();

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Siavash Ghanbari",
    alternateName: "Sia",
    url: SITE_URL,
    image: `${SITE_URL}/sia-portrait.webp`,
    jobTitle: "Principal Software Engineer",
    address: { "@type": "PostalAddress", addressLocality: "Berlin", addressCountry: "DE" },
    sameAs: links.map((l) => l.url),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // JSON.stringify output with "<" escaped cannot break out of the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <LinkTree links={links} />
    </>
  );
}
