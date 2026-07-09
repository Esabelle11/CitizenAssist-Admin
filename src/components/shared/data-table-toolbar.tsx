"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./search-bar";

interface DataTableToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onAdd?: () => void;
  addLabel?: string;
  children?: React.ReactNode;
}

export function DataTableToolbar({
  search,
  onSearchChange,
  onAdd,
  addLabel,
  children,
}: DataTableToolbarProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <SearchBar value={search} onChange={onSearchChange} />
        {children}
      </div>
      {onAdd && (
        <Button onClick={onAdd}>
          <Plus className="h-4 w-4" />
          {addLabel}
        </Button>
      )}
    </div>
  );
}
