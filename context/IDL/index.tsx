import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  SetStateAction,
  useState,
  Dispatch,
  useRef,
} from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { message } from "@tauri-apps/api/dialog";

const IDLContext = createContext<any>({
  instructions: [],
  accounts: [],
  types: [],
  events: [],
  errors: [],
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


  return (
    <IDLContext.Provider value={{ IDL, setIDL }}>
      
      {children}
    </IDLContext.Provider>
  );
};

const useIDL = () => useContext(IDLContext);

export { IDLProvider, useIDL };
