// Window events between homepage sections (static site, no shared state).

/** A pricing card's "Start with this": detail = package id. The contact form picks it up. */
export const PACKAGE_EVENT = "site:package";

/** A service tile's "See prices": detail = service name. The pricing switch turns to it. */
export const SERVICE_EVENT = "site:service";
