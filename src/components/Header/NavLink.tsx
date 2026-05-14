'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  href: string;
  label: string;
  fullWidth?: boolean;
  small?: boolean;
};

const NavLink = ({ href, label, fullWidth = false, small = false }: Props) => {
  const pathname = usePathname();

  const isActive =
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      style={{
        position: 'relative',

        display: fullWidth ? 'flex' : 'inline-flex',

        alignItems: 'center',

        justifyContent: fullWidth ? 'flex-start' : 'center',

        width: fullWidth ? '100%' : 'auto',

        padding: small ? '6px 10px' : '8px 16px',

        borderRadius: '12px',

        border: isActive ? '1px solid rgba(144, 202, 249, 0.24)' : '1px solid transparent',

        fontSize: small ? '14px' : '15px',

        fontWeight: 500,

        lineHeight: 1.2,

        textDecoration: 'none',

        color: isActive
          ? 'var(--mui-palette-primary-main)'
          : small
            ? 'var(--mui-palette-text-secondary)'
            : 'var(--mui-palette-text-primary)',

        backgroundColor: isActive ? 'rgba(144, 202, 249, 0.12)' : 'transparent',

        transition: 'background-color 160ms ease, border-color 160ms ease, color 160ms ease',
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = 'transparent';
        }
      }}
    >
      {label}
    </Link>
  );
};

export default NavLink;
