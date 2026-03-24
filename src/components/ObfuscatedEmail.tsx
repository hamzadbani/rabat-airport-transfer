import { useMemo } from 'react';

/** Base64 for em.taxi.maroc@gmail.com - use this prop to avoid plaintext in source */
export const CONTACT_EMAIL_ENCODED = 'ZW0udGF4aS5tYXJvY0BnbWFpbC5jb20=';

/**
 * Renders an email link. The address is passed base64-encoded so it does not
 * appear as plaintext in the HTML/source (reduces spam harvesting).
 */
const ObfuscatedEmail = ({
  encoded,
  className,
  children,
  title,
}: {
  encoded: string;
  className?: string;
  children?: React.ReactNode;
  title?: string;
}) => {
  const email = useMemo(() => {
    if (typeof atob === 'undefined') return '';
    try {
      return atob(encoded);
    } catch {
      return '';
    }
  }, [encoded]);

  const display = children ?? email;

  return (
    <a
      href={email ? `mailto:${email}` : '#'}
      className={className}
      title={title}
      aria-label={title ?? (email ? `Email: ${email}` : 'Contact by email')}
    >
      {display}
    </a>
  );
};

/** Renders only the decoded email text (no link). Use inside an ObfuscatedEmail wrapper to avoid nested links. */
export function ObfuscatedEmailDisplay({ encoded }: { encoded: string }) {
  const email = useMemo(() => {
    if (typeof atob === 'undefined') return '';
    try {
      return atob(encoded);
    } catch {
      return '';
    }
  }, [encoded]);
  return <span>{email}</span>;
}

export default ObfuscatedEmail;
