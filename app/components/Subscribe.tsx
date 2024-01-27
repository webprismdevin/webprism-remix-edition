import { Form, useFetcher } from "@remix-run/react";
import { Button } from "./Button";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

type EmailFetcher = {
  message: string;
  status: 200 | 400;
};

export const EmailForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const fetcher = useFetcher<EmailFetcher>();
  const isSubmitting = fetcher.state !== "idle";

  useEffect(() => {
    if (fetcher.data?.status === 200) {
      localStorage.setItem("subscribed", "true");
      onSuccess && onSuccess();
    }
  }, [fetcher.state]);

  return (
    <fetcher.Form
      action="/resource/subscribe"
      className="grid grid-cols-2 md:grid-cols-6 gap-3 max-w-prose mx-auto"
    >
      <input
        name="name"
        type="text"
        placeholder="First name"
        className="border-2 border-black/10 rounded-sm py-2 px-2 col-span-1 md:col-span-2"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="border-2 border-black/10 rounded-sm py-2 px-2 col-span-1 md:col-span-3"
      />
      <Button
        disabled={isSubmitting}
        as="button"
        type="submit"
        className="col-span-2 md:col-span-1"
      >
        Submit
      </Button>
    </fetcher.Form>
  );
};

export function Subscribe() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasClosed =
      sessionStorage.getItem("subscribeClosed") == "true" ?? false;
    const hasSubscribed = localStorage.getItem("subscribed") == "true" ?? false;
    if (!hasClosed || !hasSubscribed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("subscribeClosed", "true");
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        open={isOpen}
        onClose={setIsOpen}
      >
        <Dialog.Overlay
          className="fixed inset-0 bg-black/50"
          onClick={handleClose}
        />
        <Transition.Child
          as={Fragment}
          enter="transform transition ease-in-out duration-500 sm:duration-700"
          enterFrom="translate-y-full"
          enterTo="translate-y-0"
          leave="transform transition ease-in-out duration-500 sm:duration-700"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
        >
          <div className="bg-white p-6 rounded-t-lg border-t border-black/10 w-full h-auto fixed bottom-0">
            <div className="text-center mb-3">
              <h3 className="text-3xl font-heading">
                Get updates on new swipe pages and articles!
              </h3>
              <p>No spam. Just design inspiration & ecom insights.</p>
            </div>
            <EmailForm onSuccess={handleClose} />
            <div className="flex justify-center mt-4">
              <button onClick={handleClose} className="text-xs">
                No thanks
              </button>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
