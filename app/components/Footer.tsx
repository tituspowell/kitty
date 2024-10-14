import { ProfileIconWithClass } from '../icons';
import { theme } from '../styles/theme';
import ExplainPleaseButton from './ExplainPleaseButton';

const externalWebsite = 'https://www.tituspowell.com';

const Footer = ({ modalText }: { modalText: string[] }) => {
  return (
    <section className='m-2 mb-4 md:mb-8'>
      <ExplainPleaseButton text={modalText} />
      <a
        href={externalWebsite}
        className='flex w-full place-content-end'
        target='_blank'
        rel='noopener noreferrer'
      >
        <ProfileIconWithClass className={`${theme.text.highContrast}`} />
      </a>
    </section>
  );
};

export default Footer;
