import Link from 'next/link';
import Image from 'next/image';
import { getPayload } from 'payload';
import config from '@payload-config';

function getPageHref(page: any) {
  if (!page) return '#';

  if (page.slug === 'home') return '/';

  return `/${page.fullPath || page.slug}`;
}

export async function Header() {
  const payload = await getPayload({ config });

  const header = await payload.findGlobal({
    slug: 'header',
    depth: 2,
  });

  const logo = typeof header.logo === 'object' ? header.logo : null;

  return (
    <header>
      <Link href="/">
        {logo?.url ? (
          <Image src={logo.url} alt={logo.alt || 'Logo'} priority width={120} height={45} />
        ) : (
          'Logo'
        )}
      </Link>

      <nav>
        <ul>
          {header.navItems?.map((item) => {
            const page = typeof item.page === 'object' ? item.page : null;

            return (
              <li key={item.id}>
                <Link href={getPageHref(page)}>{item.label}</Link>

                {!!item.children?.length && (
                  <ul>
                    {item.children.map((child) => {
                      const childPage = typeof child.page === 'object' ? child.page : null;

                      return (
                        <li key={child.id}>
                          <Link href={getPageHref(childPage)}>{child.label}</Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
