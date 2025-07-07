import { componentMetadata } from "../../config/componentRegistry";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import styles from "./add-component-modal.module.scss";


export default function AddComponentModal({ isOpen, onClose, onAdd, renderedComponents }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className={`relative z-50`} onClose={onClose}>
        {/* Fondo oscurecido */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={`fixed inset-0 bg-opacity-50`} />
        </Transition.Child>

        {/* Contenedor del modal */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className={`${styles.main_dialog} flex min-h-full items-center justify-center p-4`}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={`${styles.main_dialog_content} default-format w-full max-w-4xl transform overflow-hidden rounded-2xl p-6 shadow-xl transition-all`}>
                <Dialog.Title className="text-lg font-medium mb-4">
                  Add Component
                </Dialog.Title>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(componentMetadata).map(([key, comp]) => {
                    const isAdded = renderedComponents.includes(key);

                    return (
                      <div
                        key={key}
                        className={`relative group border rounded-lg overflow-hidden transition ${
                          isAdded ? 'opacity-50 cursor-default' : 'cursor-pointer hover:shadow-lg'
                        }`}
                        onClick={() => {
                          if (!isAdded) {
                            onAdd(key);
                            onClose();
                          }
                        }}
                      >
                        <img
                          src={comp.preview}
                          alt={comp.name}
                          className="w-full h-40 object-cover"
                        />

                        {!isAdded && (
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                            <span className="text-white text-2xl font-bold">+</span>
                          </div>
                        )}

                        {isAdded && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">Already in use</span>
                          </div>
                        )}

                        <p className="p-2 text-center font-semibold">{comp.name}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 text-right">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-md text-sm font-medium cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

