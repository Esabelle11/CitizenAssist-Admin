import { useEffect, useState } from "react";

import {get} from "./service";

import { IncidentDispatch } from "@/types";

export function useHooks() {
  const [rules, setRules] = useState<IncidentDispatch[]>([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    const data = await get();
    setRules(data);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  return {
    rules,
    loading,
    refresh,
  };
}

