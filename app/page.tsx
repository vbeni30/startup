import { Approach } from "@/components/approach";
import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Transformation } from "@/components/transformation";
import { readComparisonQuery } from "@/lib/comparison";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const view = readComparisonQuery({ device: params.device, compare: params.compare });

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Transformation initialDevice={view.device} initialCompare={view.compare} />
        <Approach />
      </main>
      <SiteFooter />
    </>
  );
}
