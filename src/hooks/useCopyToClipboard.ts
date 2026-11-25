import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Copies text to the clipboard and exposes a transient `copied` flag
 * that resets after `resetAfterMs` milliseconds.
 */
export function useCopyToClipboard(resetAfterMs = 1500) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const copy = useCallback(
    (text: string) => {
      navigator.clipboard.writeText(text);
      setCopied(true);
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setCopied(false), resetAfterMs);
    },
    [resetAfterMs],
  );

  return { copied, copy };
}
