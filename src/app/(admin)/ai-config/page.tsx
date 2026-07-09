"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { PageHeader } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label, Textarea, Input, Select } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";
import { aiConfig } from "@/lib/mock-data";

export default function AIConfigPage() {
  const { t } = useI18n();
  const cfg = t.aiConfig;
  const [config, setConfig] = useState(aiConfig);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      <PageHeader title={cfg.title} subtitle={cfg.subtitle} />
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{cfg.systemPrompt}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="prompt">{cfg.systemPrompt}</Label>
            <Textarea
              id="prompt"
              className="mt-2 min-h-[160px] font-mono text-sm"
              value={config.system_prompt}
              onChange={(e) => setConfig({ ...config, system_prompt: e.target.value })}
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="temperature">{cfg.temperature}</Label>
              <Input
                id="temperature"
                type="number"
                step="0.1"
                min="0"
                max="2"
                className="mt-2"
                value={config.response_temperature}
                onChange={(e) => setConfig({ ...config, response_temperature: parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="maxTokens">{cfg.maxTokens}</Label>
              <Input
                id="maxTokens"
                type="number"
                className="mt-2"
                value={config.max_tokens}
                onChange={(e) => setConfig({ ...config, max_tokens: parseInt(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="threshold">{cfg.classificationThreshold}</Label>
              <Input
                id="threshold"
                type="number"
                step="0.05"
                min="0"
                max="1"
                className="mt-2"
                value={config.classification_threshold}
                onChange={(e) => setConfig({ ...config, classification_threshold: parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="languages">{cfg.supportedLanguages}</Label>
              <Select
                id="languages"
                className="mt-2"
                value={config.supported_languages.join(",")}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    supported_languages: e.target.value.split(",") as ("en" | "ms")[],
                  })
                }
              >
                <option value="en,ms">English & Malay</option>
                <option value="en">English only</option>
                <option value="ms">Malay only</option>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              id="gps"
              type="checkbox"
              checked={config.enable_gps_prompt}
              onChange={(e) => setConfig({ ...config, enable_gps_prompt: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor="gps">{cfg.enableGpsPrompt}</Label>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={handleSave}>
              <Save className="h-4 w-4" />
              {t.common.save}
            </Button>
            {saved && <span className="text-sm text-green-600">Configuration saved!</span>}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
