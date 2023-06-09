import type { NextPage } from 'next';
import React, { DOMAttributes, useState } from 'react';
import { z } from 'zod';
import { useForm, useWatch, SubmitHandler, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorMessage } from '@hookform/error-message';
import Button from '../components/Button';
import { formatNumber } from '../utils/formatter';
import { debounce } from '../utils/debounce';
import errorIcon from '../public/error-icon.svg';
import Image from 'next/image';
import Notes from '../components/Notes';

const schema = z.object({
  principal: z
    .string()
    .min(1, 'Please provide the Principal.')
    .regex(/^\d+$/, 'Please provide a number for the Purchase Price.')
    .refine((val) => Number(val) >= 50000 && Number(val) <= 2500000, {
      message: 'The Purchase Price should be between 50K and 2.5M.',
    }),
  annualInterestRate: z
    .string()
    .min(1, 'Please provide the Interest Rate.')
    .regex(/^\d*\.?\d*$/, 'Please provide a number for the Interest Rate')
    .refine((val) => Number(val) >= 0 && Number(val) <= 25, {
      message: 'The Interest Rate should be between 0 and 25 percent.',
    }),
  termOfLoan: z
    .string()
    .min(1, 'Please select the Term of Loan.')
    .regex(/^\d+$/, 'Please provide a number for the Term of Loan.')
    .refine((val) => Number(val) >= 20 && Number(val) <= 30, {
      message: 'The Term of Loan should be between 20 and 30 years.',
    }),
});

type FormValues = z.infer<typeof schema>;
const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful, isSubmitted },
    setError,
    watch,
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      principal: '250000',
      annualInterestRate: '1.5',
      termOfLoan: '25',
    },
  });
  const [monthlyPayment, setMonthlyPayment] = useState<string>('');

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    setMonthlyPayment('');
    const queryString = new URLSearchParams(values);
    const res = await fetch('/api/mortgageCalculation?' + queryString, {
      method: 'POST',
    });
    if (!res.ok) setError('root.submit', { message: 'Network response was not ok' });
    const data = await res.json();
    if (data.error) setError('root.submit', { message: data.error });
    if (!data.monthlyPayment) setError('root.submit', { message: 'No date received. Please Try Again.' });
    setMonthlyPayment(data.monthlyPayment);
  };

  const termOfLoan = useWatch({ control, name: 'termOfLoan' });

  const debouncedOnInput = debounce(handleSubmit(onSubmit), 500);

  return (
    <div className=' p-4 '>
      <div className='max-w-screen-lg mx-auto '>
        <h1 className='font-bold mt-8 text-2xl'>Get started with Digital Credit Experience</h1>
        <p className='mt-2 text-xs text-slate-500 font-bold'>Qualify or apply your mortgage in minutes</p>

        <div
          className='mt-8 grid gap-8'
          style={{ gridTemplateColumns: 'repeat(auto-fit , minmax(min(100% , 30rem), 1fr))' }}
        >
          <form
            id='mortgage-calculator-form'
            className='grid gap-8'
            onInput={debouncedOnInput}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className='grid gap-2  focus-within:ring-purple-300'>
              <label htmlFor='price' className='grid text-slate-400 font-medium text-sm'>
                Purchase Price
              </label>
              <p className='font-medium text-4xl mb-2' aria-hidden>
                <span>$</span>
                {formatNumber(Number(watch('principal')))}
              </p>
              <div className='flex flex-col  sm:flex-col-reverse'>
                <p className='flex justify-between'>
                  <span>
                    <span className='sr-only'>From</span> $50K
                  </span>
                  <span>
                    <span className='sr-only'>From</span> $2.5M
                  </span>
                </p>
                <input
                  id='price'
                  type='range'
                  min='50000'
                  max='2500000'
                  step='50000'
                  className='text-blue-600'
                  {...register('principal')}
                  // onChange={(e) => debounce(() => register('principal').onChange(e), 5000)}
                />
              </div>
            </div>
            <div className='grid gap-2 focus-within:ring-purple-300'>
              <label htmlFor='interest' className='grid text-slate-400 font-bold text-sm  '>
                Interest Rate
              </label>
              <p aria-hidden className='font-medium text-4xl mb-2'>
                {watch('annualInterestRate') }%
              </p>
              <div className='flex flex-col  sm:flex-col-reverse'>
                <p className='flex justify-between'>
                  <span>
                    <span className='sr-only'>From</span> 0
                  </span>
                  <span>
                    <span className='sr-only'>to</span> 25%
                  </span>
                </p>
                <input
                  type='range'
                  id='interest'
                  min='0'
                  max='25'
                  step='0.5'
                  className=' text-blue-600'
                  {...register('annualInterestRate')}
                />
              </div>
            </div>
            <fieldset className='grid gap-4 focus-within:ring-purple-300'>
              <legend className='mb-4 text-slate-400 font-bold text-sm'>Period</legend>
              <label className='flex items-center gap-3 font-medium '>
                <input
                  {...register('termOfLoan')}
                  type='radio'
                  value='20'
                  className='w-8 h-8 sm:w-6 sm:h-6 text-purple-900 '
                  style={{ accentColor: 'currentColor' }}
                  id='termOfLoan-20'
                />
                20 Years
              </label>
              <label className='flex items-center gap-3 font-medium '>
                <input
                  {...register('termOfLoan')}
                  type='radio'
                  value='25'
                  className='w-8 h-8 sm:w-6 sm:h-6 text-purple-900'
                  style={{ accentColor: 'currentColor' }}
                  id='termOfLoan-25'
                />
                25 Years
              </label>
              <label className='flex items-center gap-3 font-medium'>
                <input
                  {...register('termOfLoan')}
                  type='radio'
                  value='30'
                  className='w-8 h-8 sm:w-6 sm:h-6 text-purple-900'
                  style={{ accentColor: 'currentColor' }}
                  id='termOfLoan-30'
                />
                30 Years
              </label>
            </fieldset>
          </form>
          <div
            className='block  bg-slate-100 rounded-3xl shadow-2xl shadow-blue-200 font-bold  '
            style={{ minHeight: '18rem' }}
          >
            {isSubmitting && <Loading />}
            {!isSubmitting && !isSubmitted && <InitialScreen />}
            {!isSubmitting && isSubmitted && !isSubmitSuccessful && <Errors errors={errors} />}
            {!isSubmitting && isSubmitted && isSubmitSuccessful && <Output monthlyPayment={monthlyPayment} />}
          </div>
        </div>
      </div>
      <Notes />
    </div>
  );
};

export default Home;

const InitialScreen = () => {
  return (
    <p className=' text-slate-500 h-full flex flex-col items-center justify-center'>Select the mortgage you like.</p>
  );
};
const Loading = () => {
  return (
    <p className=' text-slate-500 h-full flex flex-col items-center justify-center' role='alert'>
      Calculating...
    </p>
  );
};
const Errors = ({ errors }: { errors: FieldErrors<FormValues> }) => {
  return (
    <div className=' text-red-700  h-full flex flex-col items-center justify-center gap-2 bg-red-100 rounded-3xl'>
      <Image src={errorIcon} alt='' width={50} height={50} />
      <div>
        <ErrorMessage errors={errors} name='annualInterestRate' as='p' role='alert' />
        <ErrorMessage errors={errors} name='termOfLoan' as='p' role='alert' />
        <ErrorMessage errors={errors} name='principal' as='p' role='alert' />
        {/*  @ts-ignore */}
        <ErrorMessage errors={errors} name='root.serverError' as='p' role='alert' />
        {/* about the type error:  react-hook-form introduced the server errors recently but has not supported it in type script */}
      </div>
    </div>
  );
};

const Output = ({ monthlyPayment }: { monthlyPayment: string }) => {
  return (
    <div className='h-full flex flex-col items-center justify-center  relative'>
      <output
        htmlFor='principal annualInterestRate termOfLoan   '
        form='mortgage-calculator-form'
        className='p-8 py-16 h-full flex flex-col items-center justify-between '
      >
        <span className='block  text-slate-500'>Your total monthly payment will be</span>
        <Price amount={Number(monthlyPayment)} currency='USD' currencySign='$' />
        <span className='sr-only'>per month</span>
        <span aria-hidden className='block text-slate-500 '>
          /month
        </span>
        <span className='sr-only'>To apply, press the apply button below.</span>
      </output>
      <Button className=' absolute bottom-0  translate-y-1/2 font-normal'>Apply Today</Button>
    </div>
  );
};

const Price = ({
  amount,
  currency,
  currencySign = '$',
}: {
  amount: number;
  currency: string;
  currencySign: string;
}) => {
  const cents = amount % 10;
  const int = amount - (amount % 10);

  return (
    <span className='text-center'>
      <span className='sr-only'>
        {int} dollars {cents && <>and {cents}</>}
      </span>
      <span className='font-bold' aria-hidden='true'>
        <span className='text-xl sm:text-4xl  align-top '>{currencySign}</span>
        <span className='text-4xl sm:text-7xl font-black'>{formatNumber(int)}</span>
        {cents && <span className='text-xl  sm:text-4xl align-top '>{cents.toFixed(0).padStart(2, '0')}</span>}
      </span>
    </span>
  );
};
