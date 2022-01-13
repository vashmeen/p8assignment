This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## The Mortgage API

There is an API route available at /mortgageCalculation which will take the following query parameters:

```
principal: [number]
annualInterestRate: [number]
termOfLoan: [number]
```

if you POST to that endpoint, you will receive a monthly payment calculation in response.
