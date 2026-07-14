import { useEffect, useState } from "react";

import {create,get,update_row,remove_row} from "./service";

import {AdminUser}from "@/types";

export function useHooks() {
  const [rules, setRules] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    const data = await get();
    setRules(data);
    setLoading(false);
  }

  async function add(payload: Partial<AdminUser>) {
    await create(payload);
    await refresh();
  }

  async function remove(id:string){
    await remove_row(id);
    await refresh();
  }
  async function update(id:string,data:Partial<AdminUser>){
    await update_row(id,data);
    await refresh();
  }

  useEffect(() => {
    refresh();
  }, []);

  return {
    rules,
    loading,
    refresh,
    add,
    remove,
    update
  };
}

