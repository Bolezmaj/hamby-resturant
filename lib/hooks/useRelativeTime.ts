'use client';

import { useEffect, useState } from 'react';

const INTERVALS = [
  { label: 'upravo sad', seconds: 60 },
  { label: 'min', seconds: 3600, divisor: 60 },
  { label: 'h', seconds: 86400, divisor: 3600 },
  { label: 'd', seconds: 604800, divisor: 86400 },
] as const;

/** Formatira relativno vrijeme: "prije 3 min", "prije 2 h" */
function formatRelative(dateStr: string): string {
  const seconds = Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / 1000
  );

  if (seconds < 0) return 'upravo sad';

  for (const interval of INTERVALS) {
    if (seconds < interval.seconds) {
      if (!('divisor' in interval)) return interval.label;
      const count = Math.floor(seconds / interval.divisor);
      return `prije ${count} ${interval.label}`;
    }
  }

  return new Date(dateStr).toLocaleDateString('hr-HR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Hook koji ažurira relativno vrijeme svake minute */
export function useRelativeTime(dateStr: string): string {
  const [text, setText] = useState(() => formatRelative(dateStr));

  useEffect(() => {
    const interval = setInterval(() => {
      setText(formatRelative(dateStr));
    }, 30_000);

    return () => clearInterval(interval);
  }, [dateStr]);

  return text;
}
