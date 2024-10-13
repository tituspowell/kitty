import ExplainPleaseButton from './ExplainPleaseButton';

const Footer = ({ modalText }: { modalText: string[] }) => {
  return (
    <section className='m-2 mb-4 md:mb-8'>
      <ExplainPleaseButton text={modalText} />
    </section>
  );
};

export default Footer;
