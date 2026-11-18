// A phone or tablet, including an iPad, whose Safari reports itself as a Mac
// ("Macintosh" user agent) but has a touch screen. Call only in the browser.
export function isTouchDevice(): boolean {
  const ua = navigator.userAgent;
  if (/Android|iPhone|iPad|iPod|Mobile/i.test(ua)) return true;
  if (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1) return true;
  return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}
