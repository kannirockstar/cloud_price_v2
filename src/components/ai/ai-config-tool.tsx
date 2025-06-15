"use client";

import * as React from "react";
import { suggestConfiguration } from "@/ai/flows/suggest-configuration";
import type { SuggestConfigurationInput, SuggestConfigurationOutput } from "@/ai/flows/suggest-configuration";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ConfigurationCard } from "./configuration-card";
import { Loader2, Sparkles } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


export function AiConfigTool() {
  const [requirements, setRequirements] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<SuggestConfigurationOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!requirements.trim()) {
      toast({
        title: "Input Required",
        description: "Please describe your cloud configuration requirements.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const input: SuggestConfigurationInput = { requirements };
      const output = await suggestConfiguration(input);
      setResult(output);
    } catch (error) {
      console.error("Error fetching AI configuration:", error);
      toast({
        title: "Error",
        description: "Failed to get AI configuration suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-headline">
          <Sparkles className="text-accent" size={28} />
          AI Configuration Advisor
        </CardTitle>
        <CardDescription>
          Describe your cloud needs (e.g., "Run a web server for a small blog", "Store 1TB of backups") and our AI will suggest optimal configurations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="requirements-input" className="text-lg">Your Requirements</Label>
            <Textarea
              id="requirements-input"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="e.g., Need a scalable database for a mobile app with 10,000 users, prioritizing low latency in Europe."
              rows={4}
              className="mt-2"
              aria-label="Cloud configuration requirements"
            />
          </div>
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Getting Suggestions...
              </>
            ) : (
              "Get AI Suggestions"
            )}
          </Button>
        </form>

        {result && (
          <div className="mt-8 space-y-6">
            <h3 className="text-xl font-semibold font-headline">AI Recommendations:</h3>
            
            {result.reasoning && (
               <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="reasoning">
                  <AccordionTrigger className="text-lg font-medium hover:no-underline">AI Reasoning</AccordionTrigger>
                  <AccordionContent className="prose prose-sm max-w-none text-muted-foreground">
                    <p>{result.reasoning}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            {result.optimalConfigurations && result.optimalConfigurations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {result.optimalConfigurations.map((config, index) => (
                  <ConfigurationCard key={index} config={config} originalRequirements={requirements} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No specific configurations were found based on your input. Try rephrasing or adding more details.</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
