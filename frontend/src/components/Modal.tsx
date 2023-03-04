import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Fragment, ReactNode, useState } from "react";

type Props = {
  body: (fechar: () => void) => ReactNode;
  title: string;
  builder?: (abrir: () => void) => ReactNode;
  bgColor?: string;
  maxWidth?: string;
};

export default function DialogModal({
  body,
  title,
  builder,
  bgColor = "",
  maxWidth = "",
}: Props) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      {builder && builder(openModal)}
      {!builder && (
        <div>
          <button
            type="button"
            onClick={openModal}
          >
          </button>
        </div>
      )}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`w-full ${maxWidth.length === 0
                    ? "max-w-lg"
                    : maxWidth
                    } transform overflow-hidden rounded-2xl ${bgColor.length === 0
                      ? "bg-white"
                      : bgColor
                    } p-6 text-left align-middle shadow-xl transition-all`}
                >
                  <Dialog.Title
                    as="h3"
                    className="flex items-center justify-between text-lg font-bold leading-6 text-gray-900"
                  >
                    {title}
                    <XMarkIcon
                      className="flex-row h-4 w-4 hover:text-red-500 cursor-pointer"
                      onClick={closeModal}
                    />
                  </Dialog.Title>
                  <div className="mt-2">
                    {body(closeModal)}
                  </div>
                  <div className="mt-4"></div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}