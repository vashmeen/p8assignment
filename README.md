This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Your Task

Your task can be found here:
[CodeExercise.pdf](https://github.com/Produce8/P8FrontendAssignment/files/7866197/CodeExercise.pdf)

**The task**

Please build the mockup from the document above in a copy of the repository provided, getting as close as possible to the mockup visually. The repository has an api available already to get the calculated monthly payment based on the inputs, which you should use to get the calculated monthly payment. Feel free to use any component library to help you get started. The font is Inter (https://fonts.google.com/specimen/Inter), and the logo is included in the provided repository.

**Things to think about**
- What happens if the server returns an error?
- What happens while waiting for a response?
- How can this be made accessible?
- How would you display this on a mobile device?
- What kind of tests can you write for this UI?

## The Mortgage API

There is an API route available at /api/mortgageCalculation which will take the following query parameters:

```
principal: [number]
annualInterestRate: [number]
termOfLoan: [number]
```

if you POST to that endpoint, you will receive a monthly payment calculation in response that will look like this:

```
monthlyPayment: [number]
```

If there is an error, the response will look like this:

```
error: [string]
```

