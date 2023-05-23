import Image from 'next/image';
import image from '../public/error-handling.png';

const Notes = () => {
  return (
    <div className='mt-40 mx-auto max-w-screen-md space-y-4 pb-32'>
      <h2 className='text-4xl font-bold text-center tracking-tight !mb-16 text-slate-700'>
        Some Notes About the Solution
      </h2>

      <h3 className='text-2xl font-bold tracking-tight text-slate-800 !mt-8'>Form Handling and Validation</h3>
      <p>
        React-Hook-form is used for client-side validation. It catches all errors, even if user change input types
        through dev tools.
      </p>
      <div className='rounded-2xl !my-12 overflow-hidden shadow-2xl shadow-slate-400 isolate p-4 bg-slate-50'>
        <Image src={image} alt='' className='rounded-lg' />
      </div>
      <p>
        I used zod as thee validator. Zod also provides great typescript supports that become very helpful as the
        project grows, especially when you want to have one source of validation for backend and the frontend.
      </p>
      <p>
        Moreover, React-hook-form has many helpful features, such as the state of submission or validation that I used
        to render related information accordingly. This way, I don&apos;t need to handle the state of form with useState
        and useEffects and I can be confident I don&apos;t shoot myself in the foot!
      </p>
      <p>
        The submit function is wired to onInput of the form, so if any element is changed, form validation and submit
        (if valid) are called.
      </p>
      <h3 className='text-2xl font-bold tracking-tight text-slate-800 !mt-8'>Performance and Debounced Inputs</h3>
      <p>
        I added a 500 ms debounce time to prevent requests to server, while user is dragging the sliders. It means in
        case of a change, the validation and submission are called if no change happens after 500 ms.
      </p>

      <h3 className='text-2xl font-bold tracking-tight text-slate-800 !mt-8'>Testing the UI</h3>
      <p>
        Unit tests and end-to-end test are very helpful when the app is matured and stabilized. In those cases, react
        unit-tests of end-to-end tests can help to prevent bugs when we add new features to the application.{' '}
      </p>
      <p>
        But, when the application is in the early stage and is being changed rapidly, manual tests are more helpful.
      </p>
      <p>
        In developing this project, I tested the validation by entering invalid inputs and Tested the responsiveness in
        Firefox responsive mode. In addition typescript type checking and eslint are used to reduce human error in the
        build time. Moreover build test are always necessary and is done for this project.
      </p>

      <h3 className='text-2xl font-bold tracking-tight !mt-8'>Responsiveness</h3>
      <p>
        Columns are stacked in small screens, using grid auto-fit feature. Some large texts become smaller to avoid
        overflow. Plus, the default tailwind breakpoint is overridden with rem value, so the layout is not messed up
        when a user has set a large font in its settings.
      </p>
      <h3 className='text-2xl font-bold tracking-tight text-slate-800 !mt-8'>Loading State and Server Errors</h3>
      <p>
        All these states are derived from react-hook-form library. In case of an error, no request is sent to the
        server.
      </p>
      <h3 className='text-2xl font-bold tracking-tight text-slate-800 '>Accessibility</h3>
      <p>
        a11y is always my concern. Many small things are put in place so I can make sure every user can use this app.
        Some of them are:
      </p>
      <ul className='list-disc list-inside'>
        <li>
          Making sure colors have more than 4.5 contrast ratio with their background. Some of the texts have more
          contrast in comparison with the design reference. This is intended for a11y.
        </li>
        <li>Adding small sr-only texts so users with screen readers can better understand content.</li>
        <li>
          Using output element for the result, so each time the result is changed, it is announced for users with screen
          readers.
        </li>
        <li>
          Adding appropriated ara attributes, like role alert to error messages, so they are announced when they are
          mounted.
        </li>
        <li>
          Making slider thumbs and radio buttons bigger in small screens, so users with touch screens can interact with
          them easily.
        </li>
        <li>
          Slider max and min labels are put at the top on mobile screens, so users still can read them while adjusting
          the slider.
        </li>
      </ul>
    </div>
  );
};

export default Notes;
