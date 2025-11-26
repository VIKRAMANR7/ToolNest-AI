import { PricingTable } from "@clerk/clerk-react";

export default function Plan() {
  return (
    <section className="bg-gray-50 px-4 py-20 sm:px-20 xl:px-32">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Choose Your Plan</h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Start free and scale as you grow. Pick the plan that fits your content creation workflow.
        </p>
      </div>

      <div className="mx-auto max-w-5xl">
        <PricingTable />
      </div>
    </section>
  );
}
