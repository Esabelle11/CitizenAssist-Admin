"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CrudForm } from "./CrudForm";
import { CrudMode, FormFieldConfig } from "./types";

interface Props {
  open: boolean;
  mode: CrudMode;
  data: any;
  fields: FormFieldConfig[];
  onClose(): void;
  onSubmit(data: any): Promise<void>;
}

export function CrudDialog({
  open,
  mode,
  data,
  fields,
  onClose,
  onSubmit,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>
            {mode === "create"
              ? "Create"
              : mode === "edit"
              ? "Edit"
              : "View"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <CrudForm
            fields={fields}
            mode={mode}
            data={data}
            onClose={onClose}
            onSubmit={onSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
}