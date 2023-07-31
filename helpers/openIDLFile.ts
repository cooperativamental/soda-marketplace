import { open } from "@tauri-apps/api/dialog";
import { message } from "@tauri-apps/api/dialog";
import { readTextFile } from "@tauri-apps/api/fs";

const openIDLFile = async (event: any, IDL: any, setIDL: Function) => {
  console.log("execute")
  const fileReader = new FileReader();
  fileReader.readAsText(event.target.files[0], "UTF-8");
  fileReader.onload = (e: any) => {
    console.log("e.target.result", e.target.result);
    setIDL(JSON.parse(e.target.result))
  };
  // const idl = await readTextFile();
  // console.log(idl);
  // const parsed = JSON.parse(idl);
  // setIDL({
  //   version: parsed.version,
  //   name: parsed.name,
  //   instructions: parsed.instructions ? parsed.instructions : [],
  //   accounts: parsed.accounts ? parsed.accounts : [],
  //   types: parsed.types ? parsed.types : [],
  //   events: parsed.events ? parsed.events : [],
  //   errors: parsed.errors ? parsed.errors : [],
  //   metadata: parsed.metadata
  // })


}

export default openIDLFile;