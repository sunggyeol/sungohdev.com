"use client";

import { useCallback, useState, type MouseEvent } from "react";
import { Mail } from "./social-icons/icons";

type MailIconProps = {
  // ROT13-encoded local-part and domain. Decoded only on user interaction.
  user: string;
  domain: string;
  size?: number;
};

function rot13(s: string) {
  return s.replace(/[a-zA-Z]/g, (c) => {
    const code = c.charCodeAt(0);
    const base = code <= 90 ? 65 : 97;
    return String.fromCharCode(((code - base + 13) % 26) + base);
  });
}

export default function MailIcon({ user, domain, size = 8 }: MailIconProps) {
  const [href, setHref] = useState<string | undefined>(undefined);

  const buildHref = useCallback(
    () => `mailto:${rot13(user)}@${rot13(domain)}`,
    [user, domain],
  );

  const reveal = useCallback(() => {
    setHref((current) => current ?? buildHref());
  }, [buildHref]);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (href) return;
      e.preventDefault();
      const next = buildHref();
      setHref(next);
      window.location.href = next;
    },
    [href, buildHref],
  );

  return (
    <a
      className="cursor-pointer text-sm text-gray-500 transition hover:text-gray-600"
      href={href}
      rel="noopener noreferrer"
      onMouseEnter={reveal}
      onFocus={reveal}
      onTouchStart={reveal}
      onContextMenu={reveal}
      onClick={handleClick}
    >
      <span className="sr-only">mail</span>
      <Mail
        className={`fill-current text-gray-700 hover:text-primary-500 dark:text-gray-200 dark:hover:text-primary-400 h-${size} w-${size}`}
      />
    </a>
  );
}
