
"use client";

import * as React from "react";
import type { OptimalConfiguration } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { explainRecommendation } from "@/ai/flows/explain-recommendation";
import type { ExplainRecommendationInput } from "@/ai/flows/explain-recommendation";
import { useToast } from "@/hooks/use-toast";
import { Zap, DollarSign, BarChart, Lightbulb, Loader2 } from "lucide-react";

interface ConfigurationCardProps {
  config: OptimalConfiguration;
  originalRequirements: string;
}

export function ConfigurationCard({ config, originalRequirements }: ConfigurationCardProps) {
  const [isExplanationDialogOpen, setIsExplanationDialogOpen] = React.useState(false);
  const [explanation, setExplanation] = React.useState<string | null>(null);
  const [isExplanationLoading, setIsExplanationLoading] = React.useState(false);
  const { toast } = useToast();

  const handleExplainClick = async () => {
    if (!originalRequirements) {
      toast({
        title: "Context Missing",
        description: "Original requirements are needed to generate an explanation.",
        variant: "destructive",
      });
      return;
    }

    setIsExplanationLoading(true);
    setExplanation(null); // Clear previous explanation

    try {
      const recommendationText = `${config.provider} ${config.service}: ${config.configuration}. Cost: ${config.costEstimate}. Performance: ${config.performanceNotes}`;
      const input: ExplainRecommendationInput = {
        recommendation: recommendationText,
        context: originalRequirements,
      };
      const output = await explainRecommendation(input);
      setExplanation(output.explanation);
    } catch (error) {
      console.error("Error fetching AI explanation:", error);
      toast({
        title: "Error",
        description: "Failed to get AI explanation. Please try again.",
        variant: "destructive",
      });
      setExplanation("Failed to load explanation.");
    } finally {
      setIsExplanationLoading(false);
    }
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="text-primary" />
          {config.provider} - {config.service}
        </CardTitle>
        <CardDescription>{config.configuration}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 flex-grow">
        <div className="flex items-center gap-2 text-sm">
          <DollarSign size={18} className="text-green-600" />
          <p><span className="font-semibold">Cost Estimate:</span> {config.costEstimate}</p>
        </div>
        <div className="flex items-start gap-2 text-sm">
          <BarChart size={18} className="text-blue-600 mt-1" />
          <p><span className="font-semibold">Performance:</span> {config.performanceNotes}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Badge variant="secondary">{config.provider}</Badge>
        <Dialog open={isExplanationDialogOpen} onOpenChange={setIsExplanationDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" onClick={handleExplainClick} aria-label={`Explain ${config.service} recommendation`}>
              <Lightbulb className="mr-2 h-4 w-4" />
              Explain
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Lightbulb className="text-accent" />
                AI Explanation for {config.provider} {config.service}
              </DialogTitle>
              <DialogDescription>
                Detailed insights into why this configuration was recommended based on your requirements: "{originalRequirements}"
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] p-1 pr-4 my-4 rounded-md border">
              {isExplanationLoading ? (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="mr-2 h-8 w-8 animate-spin text-primary" />
                  <p className="text-muted-foreground">Generating explanation...</p>
                </div>
              ) : (
                <div className="prose prose-sm max-w-none whitespace-pre-wrap p-4">
                  {explanation || "No explanation available."}
                </div>
              )}
            </ScrollArea>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
