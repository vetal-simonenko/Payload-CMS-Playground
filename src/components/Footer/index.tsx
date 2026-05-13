import { getPayload } from 'payload';
import config from '@payload-config';

const Footer = async () => {
  const payload = await getPayload({ config });
  const footer = await payload.findGlobal({ slug: 'footer' });

  return (
    <footer>
      <p>{footer.copyright}</p>
    </footer>
  );
};

export default Footer;
