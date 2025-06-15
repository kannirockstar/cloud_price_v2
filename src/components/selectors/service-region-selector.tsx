"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CLOUD_SERVICE_CATEGORIES, CLOUD_REGIONS } from "@/lib/constants";

interface ServiceRegionSelectorProps {
  selectedServiceCategory: string;
  onServiceCategoryChange: (service: string) => void;
  selectedRegion: string;
  onRegionChange: (region: string) => void;
}

export function ServiceRegionSelector({
  selectedServiceCategory,
  onServiceCategoryChange,
  selectedRegion,
  onRegionChange,
}: ServiceRegionSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 bg-card rounded-lg shadow">
      <div>
        <Label htmlFor="service-category-select" className="block mb-2 text-sm font-medium text-foreground">
          Service Category
        </Label>
        <Select value={selectedServiceCategory} onValueChange={onServiceCategoryChange}>
          <SelectTrigger id="service-category-select" className="w-full">
            <SelectValue placeholder="Select a service category" />
          </SelectTrigger>
          <SelectContent>
            {CLOUD_SERVICE_CATEGORIES.map((service) => (
              <SelectItem key={service} value={service}>
                {service}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="region-select" className="block mb-2 text-sm font-medium text-foreground">
          Region
        </Label>
        <Select value={selectedRegion} onValueChange={onRegionChange}>
          <SelectTrigger id="region-select" className="w-full">
            <SelectValue placeholder="Select a region" />
          </SelectTrigger>
          <SelectContent>
            {CLOUD_REGIONS.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
