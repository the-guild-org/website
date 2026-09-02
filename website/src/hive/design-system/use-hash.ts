"use client";

import { useEffect, useState } from "react";

export function useHash() {
  const [hash, setHash] = useState("");

  useEffect(() => {
    const handleHashChange = () => setHash(location.hash.replace("#", ""));
    handleHashChange();

    globalThis.addEventListener("hashchange", handleHashChange);
    return () => globalThis.removeEventListener("hashchange", handleHashChange);
  }, []);

  return hash;
}
