"use client";

import * as React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { PricingEntry, CloudProvider } from "@/types";
import { ArrowUpDown, Cloud, Database, HardDrive, Server, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow, isBefore, subDays } from 'date-fns';

interface PricingTableProps {
  data: PricingEntry[];
  isLoading: boolean;
  overallLastUpdatedTimestamp: string | null; // Timestamp of the last data fetch operation
}

type SortKey = keyof PricingEntry | null;

const ProviderIcon: React.FC<{ provider: CloudProvider }> = ({ provider }) => {
  switch (provider) {
    case 'AWS':
      return <Cloud className="inline-block mr-2 text-orange-500" size={20} aria-label="AWS Logo Placeholder" />;
    case 'Azure':
      return <Cloud className="inline-block mr-2 text-blue-500" size={20} aria-label="Azure Logo Placeholder" />;
    case 'GCP':
      return <Cloud className="inline-block mr-2 text-green-500" size={20} aria-label="GCP Logo Placeholder" />;
    default:
      return <Cloud className="inline-block mr-2 text-gray-500" size={20} />;
  }
};

const ServiceCategoryIcon: React.FC<{ category: string }> = ({ category }) => {
  switch (category.toLowerCase()) {
    case 'compute':
      return <Server className="inline-block mr-1" size={16} />;
    case 'storage':
      return <HardDrive className="inline-block mr-1" size={16} />;
    case 'database':
      return <Database className="inline-block mr-1" size={16} />;
    default:
      return <Info className="inline-block mr-1" size={16} />;
  }
};

export function PricingTable({ data, isLoading, overallLastUpdatedTimestamp }: PricingTableProps) {
  const [filter, setFilter] = React.useState("");
  const [sortConfig, setSortConfig] = React.useState<{ key: SortKey; direction: "ascending" | "descending" } | null>(null);

  const handleSort = (key: SortKey) => {
    if (!key) return;
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig !== null && sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        const valA = a[sortConfig.key!];
        const valB = b[sortConfig.key!];

        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortConfig.direction === "ascending" ? valA - valB : valB - valA;
        }
        if (typeof valA === 'string' && typeof valB === 'string') {
          return sortConfig.direction === "ascending" ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);
  
  const filteredData = React.useMemo(() => {
    return sortedData.filter((entry) =>
      Object.values(entry).some(val =>
        String(val).toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [sortedData, filter]);

  const isDataStale = (timestamp: string): boolean => {
    return isBefore(new Date(timestamp), subDays(new Date(), 1)); // Stale if older than 1 day
  };
  
  const oldestDataPointTimestamp = React.useMemo(() => {
    if (data.length === 0) return null;
    return data.reduce((oldest, current) => 
      new Date(current.dataTimestamp) < new Date(oldest.dataTimestamp) ? current : oldest
    ).dataTimestamp;
  }, [data]);

  const overallStale = overallLastUpdatedTimestamp ? isDataStale(overallLastUpdatedTimestamp) : (oldestDataPointTimestamp ? isDataStale(oldestDataPointTimestamp) : false);

  if (isLoading) {
    return <div className="text-center py-10">Loading pricing data...</div>;
  }

  return (
    <div className="bg-card p-6 rounded-lg shadow-lg">
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Input
          placeholder="Filter services..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
          aria-label="Filter pricing table"
        />
         {overallLastUpdatedTimestamp && (
           <Badge variant={overallStale ? "destructive" : "secondary"} className="whitespace-nowrap">
             {overallStale && <AlertTriangle size={14} className="mr-1 inline" />}
             Data last refreshed: {formatDistanceToNow(new Date(overallLastUpdatedTimestamp), { addSuffix: true })}
           </Badge>
         )}
      </div>

      {filteredData.length === 0 && !filter && (
         <Alert>
           <Info className="h-4 w-4" />
           <AlertTitle>No Data Available</AlertTitle>
           <AlertDescription>
             There is no pricing data matching your current selection. Try adjusting the service category or region.
           </AlertDescription>
         </Alert>
      )}
      {filteredData.length === 0 && filter && (
         <Alert>
           <Info className="h-4 w-4" />
           <AlertTitle>No Results Found</AlertTitle>
           <AlertDescription>
             Your filter "{filter}" did not match any services. Try a different search term.
           </AlertDescription>
         </Alert>
      )}

      {filteredData.length > 0 && (
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>
              Displayed prices are estimates. Always verify with the official cloud provider for the most current pricing.
              Individual data points may have different update times.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("provider")} className="px-1">
                    Provider <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("serviceName")} className="px-1">
                    Service <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Instance/SKU</TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("region")} className="px-1">
                    Region <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button variant="ghost" onClick={() => handleSort("price")} className="px-1">
                    Price <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((entry) => {
                const entryStale = isDataStale(entry.dataTimestamp);
                return (
                  <TableRow key={entry.id} className={entryStale ? "opacity-70" : ""}>
                    <TableCell className="font-medium whitespace-nowrap">
                      <ProviderIcon provider={entry.provider} />
                      {entry.provider}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <ServiceCategoryIcon category={entry.serviceCategory} />
                      {entry.serviceName}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{entry.instanceType || "N/A"}</TableCell>
                    <TableCell>{entry.region}</TableCell>
                    <TableCell className="text-right font-mono">
                      ${entry.price.toFixed(entry.priceUnit.toLowerCase().includes('gb') ? 3 : 4)}
                    </TableCell>
                    <TableCell>{entry.priceUnit}</TableCell>
                    <TableCell className="min-w-[200px]">{entry.features.join(", ")}</TableCell>
                    <TableCell className="text-xs whitespace-nowrap">
                      {entryStale && <AlertTriangle size={14} className="mr-1 inline text-destructive" />}
                      {formatDistanceToNow(new Date(entry.dataTimestamp), { addSuffix: true })}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
