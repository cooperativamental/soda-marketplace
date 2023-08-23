import {
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { message } from "@tauri-apps/api/dialog";
import PopUp from "@/components/PopUp";

const IDLContext = createContext<any>({
  IDL: {
    instructions: [],
    accounts: [],
    types: [],
    events: [],
    errors: [],
  },
  cleanProject: () => { }

});

const IDLProvider = ({ children }: { children: ReactNode }) => {
  const [IDL, setIDL] = useState<any>({
    name: "",
    version: "0.1.0",
    instructions: [],
    accounts: [],
    types: [],
    events: [],
    errors: [],
    metadata: undefined,
  });
  const [clear, setClear] = useState(false)
  const [confirmation, setConfirmation] = useState(false)

  const cleanProject = () => {
    setIDL({
      name: "",
      version: "0.1.0",
      instructions: [],
      accounts: [],
      types: [],
      events: [],
      errors: [],
      metadata: undefined
    })
    setClear(true)
  }



  return (
    <IDLContext.Provider value={{ IDL, setIDL, cleanProject: () => { setConfirmation(true) }, setClear, clear }}>
      {children}
      {
        confirmation &&
        <PopUp
          closePopUp={() => setConfirmation(false)}
        >
          <div className="flex flex-col p-5 items-center gap-5">
            <p className="text-white">Sure to delete?</p>
            <div className="flex gap-4">
              <button
                onClick={() => setConfirmation(
                  false
                )}
                className="text-white bg-red-custom px-5 rounded-xl h-10"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  cleanProject()
                  setConfirmation(false)
                }}
                className="text-white bg-green-custom px-5 rounded-xl h-10"
              >
                Yes
              </button>
            </div>
          </div>
        </PopUp>
      }

    </IDLContext.Provider>
  );
};

const useIDL = () => useContext(IDLContext);

export { IDLProvider, useIDL };
