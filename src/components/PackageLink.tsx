"use client";

import type React from "react";
import { PACKAGE_EVENT } from "./ContactForm";

/** Jumps to the contact form and tells it which package was picked. */
export function PackageLink({
  id,
  href,
  className,
  children,
}: {
  id: string;
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className={className} onClick={() => window.dispatchEvent(new CustomEvent(PACKAGE_EVENT, { detail: id }))}>
      {children}
    </a>
  );
}
