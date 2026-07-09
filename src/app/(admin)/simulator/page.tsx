"use client";

import { useState } from "react";
import { FlaskConical, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label, Textarea } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n/context";
import { agencyRoutings } from "@/lib/mock-data";
import { urgencyColor } from "@/lib/utils";
import type { SimulatorResult } from "@/types";

function simulateRouting(input: string): SimulatorResult | null {
  const lower = input.toLowerCase();
  if (!lower.trim()) return null;

  let bestMatch = agencyRoutings[0];
  let matchedKeywords: string[] = [];

  for (const rule of agencyRoutings) {
    const matches = rule.keywords.filter((kw) => lower.includes(kw.toLowerCase()));
    if (matches.length > matchedKeywords.length) {
      matchedKeywords = matches;
      bestMatch = rule;
    }
  }

  const confidence = matchedKeywords.length > 0 ? Math.min(0.6 + matchedKeywords.length * 0.15, 0.98) : 0.3;

  return {
    category: bestMatch.category_code.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) + " Issue",
    agency: bestMatch.agency_name,
    urgency: bestMatch.default_urgency,
    confidence,
    matched_keywords: matchedKeywords,
  };
}

export default function SimulatorPage() {
  const { t } = useI18n();
  const sim = t.simulator;
  const [input, setInput] = useState('My street has a broken street light');
  const [result, setResult] = useState<SimulatorResult | null>(null);

  const handleRun = () => {
    setResult(simulateRouting(input));
  };

  return (
    <>
      <PageHeader title={sim.title} subtitle={sim.subtitle} />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{sim.input}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="sim-input">Citizen Report</Label>
              <Textarea
                id="sim-input"
                className="mt-2 min-h-[120px]"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={sim.placeholder}
              />
            </div>
            <Button onClick={handleRun}>
              <FlaskConical className="h-4 w-4" />
              {sim.runSimulation}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              {sim.output}
              {result && <ArrowRight className="h-4 w-4 text-gray-400" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {result ? (
              <dl className="space-y-4">
                <div className="flex justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
                  <dt className="text-sm text-gray-500">{sim.category}</dt>
                  <dd className="font-medium">{result.category}</dd>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
                  <dt className="text-sm text-gray-500">{sim.agency}</dt>
                  <dd className="font-medium">{result.agency}</dd>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
                  <dt className="text-sm text-gray-500">{sim.urgency}</dt>
                  <dd>
                    <Badge className={urgencyColor(result.urgency)}>{result.urgency}</Badge>
                  </dd>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
                  <dt className="text-sm text-gray-500">{sim.confidence}</dt>
                  <dd className="font-medium">{(result.confidence * 100).toFixed(0)}%</dd>
                </div>
                <div>
                  <dt className="mb-2 text-sm text-gray-500">{sim.matchedKeywords}</dt>
                  <dd className="flex flex-wrap gap-1">
                    {result.matched_keywords.length > 0 ? (
                      result.matched_keywords.map((kw) => (
                        <Badge key={kw} className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          {kw}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-gray-400">No keywords matched</span>
                    )}
                  </dd>
                </div>
              </dl>
            ) : (
              <p className="text-sm text-gray-400">Run a simulation to see routing results</p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
