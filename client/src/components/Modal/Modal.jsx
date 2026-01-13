import React from "react";

export function ModalBody({ children }) {
  return (
    <div className="relative p-6 flex-auto">
      {children}
    </div>
  )
}

export function ModalFooter({ children }) {
  return (
    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
      {children}
    </div>
  )
}

export function Modal({ modalTitle, children, showModal, onCloseModal }) {
  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative my-6 mx-auto w-full max-w-md">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-2xl font-semibold">
                    {modalTitle}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={onCloseModal}
                  >
                    <span className="bg-transparent text-black opacity-3 h-6 w-6 text-1xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {children}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
