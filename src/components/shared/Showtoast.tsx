"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function ShowToast() {
  const params = useSearchParams();
  const router = useRouter();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    //
    //
    const status = params.get("status");
    if (status === "success") {
      toast.success("✅ Project created successfully!");
    } else if (status === "error") {
      toast.error("❌ Something went wrong!");
    }

    // Remove status from URL to avoid repeated toast
    if (status) {
      const newParams = new URLSearchParams(params.toString());
      newParams.delete("status");
      router.replace(`${window.location.pathname}?${newParams.toString()}`);
    }
  }, [params, router]);

  return null; // single parent JSX
}
