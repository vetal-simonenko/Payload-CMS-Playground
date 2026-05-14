'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@mui/material';

type Props = {
  href: string;
  label: string;
  fullWidth?: boolean;
  small?: boolean;
};

const NavLink = ({ href, label, fullWidth = false, small = false }: Props) => {
  const pathname = usePathname();

  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <Link
      href={href}
      style={{
        display: fullWidth ? 'block' : 'inline-block',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <Button
        fullWidth={fullWidth}
        size={small ? 'small' : 'medium'}
        color="inherit"
        variant="text"
        sx={{
          justifyContent: fullWidth ? 'flex-start' : 'center',

          textTransform: 'none',
          fontWeight: isActive ? 700 : 500,

          color: isActive ? 'primary.main' : small ? 'text.secondary' : 'text.primary',

          backgroundColor: isActive ? 'action.selected' : 'transparent',

          transition: 'all 160ms ease',

          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
      >
        {label}
      </Button>
    </Link>
  );
};

export default NavLink;
