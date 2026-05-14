import Link from 'next/link';
import Image from 'next/image';

import { getPayload } from 'payload';
import config from '@payload-config';

import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import NavLink from '@/components/Header/NavLink';

function getPageHref(page: any) {
  if (!page) return '#';

  if (page.slug === 'home') return '/';

  return `/${page.fullPath || page.slug}`;
}

const Header = async () => {
  const payload = await getPayload({ config });

  const header = await payload.findGlobal({
    slug: 'header',
    depth: 2,
  });

  const logo = typeof header.logo === 'object' ? header.logo : null;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            minHeight: 72,
            display: 'flex',
            justifyContent: 'space-between',
            gap: 4,
          }}
        >
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            {logo?.url ? (
              <Image
                src={logo.url}
                alt={logo.alt || 'Logo'}
                priority
                width={120}
                height={45}
                style={{ objectFit: 'contain' }}
              />
            ) : (
              <Typography variant="h6">Logo</Typography>
            )}
          </Link>

          <Box
            component="nav"
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box
              component="ul"
              sx={{
                m: 0,
                p: 0,
                listStyle: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              {header.navItems?.map((item) => {
                const page = typeof item.page === 'object' ? item.page : null;
                const hasChildren = !!item.children?.length;

                return (
                  <Box
                    key={item.id}
                    component="li"
                    sx={{
                      position: 'relative',

                      '&:hover > ul': {
                        opacity: 1,
                        visibility: 'visible',
                        transform: 'translateY(0)',
                        pointerEvents: 'auto',
                      },
                    }}
                  >
                    <NavLink href={getPageHref(page)} label={item.label} />

                    {hasChildren && (
                      <Box
                        component="ul"
                        sx={{
                          position: 'absolute',
                          top: '100%',
                          right: 0,
                          zIndex: 10,

                          minWidth: 220,
                          m: 0,
                          mt: 1,
                          p: 1,
                          listStyle: 'none',

                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 2,
                          backgroundColor: 'background.paper',
                          boxShadow: 6,

                          opacity: 0,
                          visibility: 'hidden',
                          transform: 'translateY(8px)',
                          pointerEvents: 'none',
                          transition:
                            'opacity 160ms ease, transform 160ms ease, visibility 160ms ease',
                        }}
                      >
                        {item?.children?.map((child) => {
                          const childPage = typeof child.page === 'object' ? child.page : null;

                          return (
                            <Box key={child.id} component="li">
                              <NavLink
                                href={getPageHref(childPage)}
                                label={child.label}
                                fullWidth
                                small
                              />
                            </Box>
                          );
                        })}
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
