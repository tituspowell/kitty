import ExplainPleaseButton from './ExplainPleaseButton';

const Footer = ({ modalText }: { modalText: string }) => {
  return (
    <section className='m-2 mb-4'>
      <ExplainPleaseButton text={modalText} />
    </section>
  );
};

export default Footer;
