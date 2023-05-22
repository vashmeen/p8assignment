import Link from 'next/link';
import { HambergerMenu } from 'iconsax-react';
import logo from '../public/p8Wordmark_sm.svg';
import Image from 'next/image';
const Header = () => {
  return (
    <header className='bg-white shadow-lg px-4'>
      <div className='flex gap justify-between  mx-auto max-w-screen-lg py-3 '>
        <Link href='/'>
          <a className='flex items-center'>
            <Image src={logo} alt='' />
            <span className='sr-only'>Home Page</span>
          </a>
        </Link>

        <button>
          <HambergerMenu size='32' />
          <span className='sr-only'>Toggle Side Menu</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
