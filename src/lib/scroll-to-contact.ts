import type { MouseEvent } from "react";

/** Scroll to the contact section without adding `#contact` to the URL. */
export function scrollToContact(): void {
  document.getElementById("contact")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

/** Use on homepage CTAs: stay on `/` and scroll; from other routes, navigate home. */
export function handleContactClick(e: MouseEvent<HTMLAnchorElement>): void {
  const onHome =
    typeof window !== "undefined" &&
    (window.location.pathname === "/" || window.location.pathname === "");

  if (onHome) {
    e.preventDefault();
    scrollToContact();
  }
}
