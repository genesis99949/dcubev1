"use client";

import type React from "react";

/** An in-page link that also tells another section what was picked (see ./events.ts). */
export function EventLink({
  event,
  detail,
  href,
  className,
  children,
}: {
  event: string;
  detail: string;
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className={className} onClick={() => window.dispatchEvent(new CustomEvent(event, { detail }))}>
      {children}
    </a>
  );
}
