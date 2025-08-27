import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls the window to the top whenever the route (pathname) changes.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // “instant” = no animation; use “smooth” if you want a gentle scroll
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null; // renders nothing
}
