import {
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { message } from "@tauri-apps/api/dialog";

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

  const cleanProject = () => {
    if (confirm('Are you sure? This will close your previus project')) {
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
    };
    setClear(true)
  }



  return (
    <IDLContext.Provider value={{ IDL, setIDL, cleanProject, setClear, clear }}>
      {children}
    </IDLContext.Provider>
  );
};

const useIDL = () => useContext(IDLContext);

export { IDLProvider, useIDL };
