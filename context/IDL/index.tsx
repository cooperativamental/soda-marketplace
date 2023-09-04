import {
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { message } from "@tauri-apps/api/dialog";
import PopUp from "@/components/PopUp";
import EventEmitter from "events";

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
          alert={{
            text: "Overwrite IDL?",
            cancel: () => setConfirmation(
              false
            ),
            confirm: (e: EventEmitter) => {
              cleanProject()
              setConfirmation(false)
            }
          }}
        />
      }

    </IDLContext.Provider>
  );
};

const useIDL = () => useContext(IDLContext);

export { IDLProvider, useIDL };
