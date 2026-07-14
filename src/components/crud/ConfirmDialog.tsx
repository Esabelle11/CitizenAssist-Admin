"use client";

import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm(): void;
  onCancel(): void;
}


export function ConfirmDialog({
  open,
  title = "Confirm Delete",
  description ="Are you sure you want to remove this record?",
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) {return null;}
  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className=" w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">

        <h2 className="text-lg font-semibold">
          {title}
        </h2>
        <p className=" mt-2 text-sm text-gray-500">
          {description}
        </p>

        <div className=" mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel} disabled={loading}>
            {cancelText}
          </Button>

          <Button className="bg-red-600 hover:bg-red-700 text-white"
            onClick={onConfirm}
            disabled={loading}>
            
            {
              loading
              ?"Deleting..."
              :confirmText
            }

          </Button>
        </div>
      </div>
    </div>

  );

}