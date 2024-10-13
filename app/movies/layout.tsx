import Footer from '../components/Footer';
import { moviesAppExplanation } from '../explanationTexts';

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The flex styling below is to control the Footer and make it appear at the bottom of the screen.
  // The parent layout has 'min-h-screen' to make sure the display fills the screen. It has two children,
  // the navbar, which we don't want to expand, and then everything else here, which is wrapped in
  // 'flex-grow'. The footer is nested here rather than at the top level where the header is because
  // the home page shouldn't have it. We want everything but the footer to expand here too, hence
  // another flex wrapping child elements marked with flex-grow.
  return (
    <section className='flex-grow flex flex-col'>
      <div className='flex-grow'>{children}</div>
      <Footer modalText={moviesAppExplanation} />
    </section>
  );
}
