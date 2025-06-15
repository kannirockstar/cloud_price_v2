"use client";

import * as React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ServiceRegionSelector } from "@/components/selectors/service-region-selector";
import { PricingTable } from "@/components/pricing/pricing-table";
import { AiConfigTool } from "@/components/ai/ai-config-tool";
import { CLOUD_SERVICE_CATEGORIES, CLOUD_REGIONS, MOCK_PRICING_DATA } from "@/lib/constants";
import type { PricingEntry } from "@/types";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  const [selectedServiceCategory, setSelectedServiceCategory] = React.useState(CLOUD_SERVICE_CATEGORIES[0]);
  const [selectedRegion, setSelectedRegion] = React.useState(CLOUD_REGIONS[0]);
  
  // In a real app, this would be fetched, e.g., in a useEffect or server component
  const [pricingData, setPricingData] = React.useState<PricingEntry[]>(MOCK_PRICING_DATA);
  const [isLoading, setIsLoading] = React.useState(false); 

  // Mock data loading and overall timestamp
  // In a real app, this would come from your data fetching logic
  const [overallLastUpdatedTimestamp, setOverallLastUpdatedTimestamp] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Simulate fetching data and setting an overall update timestamp
    setIsLoading(true);
    // Find the most recent timestamp from all mock data to simulate an "overall" update
    if (MOCK_PRICING_DATA.length > 0) {
      const mostRecentTimestamp = MOCK_PRICING_DATA.reduce((latest, current) => {
        return new Date(current.dataTimestamp) > new Date(latest) ? current.dataTimestamp : latest;
      }, MOCK_PRICING_DATA[0].dataTimestamp);
      setOverallLastUpdatedTimestamp(mostRecentTimestamp);
    }
    setPricingData(MOCK_PRICING_DATA); // Use mock data directly
    setIsLoading(false);
  }, []);


  const filteredPricingData = React.useMemo(() => {
    return pricingData.filter(
      (entry) =>
        entry.serviceCategory === selectedServiceCategory &&
        entry.region === selectedRegion
    );
  }, [pricingData, selectedServiceCategory, selectedRegion]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-headline text-primary mb-2">
            Optimize Your Cloud Spend
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Compare real-time* pricing across major cloud providers and leverage AI to find the most cost-effective configurations for your needs.
          </p>
          <p className="text-xs text-muted-foreground mt-1">*Pricing data is illustrative and updated periodically.</p>
        </div>

        <section id="ai-config-tool" className="mb-12">
          <AiConfigTool />
        </section>

        <Separator className="my-12" />

        <section id="price-comparison" className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-headline mb-2">
              Dynamic Price Comparison
            </h2>
            <p className="text-md text-muted-foreground">
              Select a service category and region to view and compare pricing details.
            </p>
          </div>
          <ServiceRegionSelector
            selectedServiceCategory={selectedServiceCategory}
            onServiceCategoryChange={setSelectedServiceCategory}
            selectedRegion={selectedRegion}
            onRegionChange={setSelectedRegion}
          />
          <PricingTable 
            data={filteredPricingData} 
            isLoading={isLoading} 
            overallLastUpdatedTimestamp={overallLastUpdatedTimestamp}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}
