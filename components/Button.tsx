import React from 'react';

type Props = React.ComponentPropsWithoutRef<'button'>;

const Button = ({ children, className, ...props }: Props) => {
  return (
    <button
      type='button'
      className={`text-white bg-purple-900 hover:bg-purple-800 focus:outline-none focus:ring-4 focus-visible:ring-purple-300 font-bold rounded-full text-xl px-6 py-3 text-center  ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
