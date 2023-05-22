import '../styles/globals.css';
import Header from '../components/Header';
import type { AppProps } from 'next/app';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/900.css';
// If loading a variable font, you don't need to specify the font weight


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="h-full text-slate-700">
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;

type Props = {
  children: React.ReactNode;
  [key: string]: any;
};

const Footer = ({ children, ...props }: Props) => {
  return <div {...props}>{children}</div>;
};
