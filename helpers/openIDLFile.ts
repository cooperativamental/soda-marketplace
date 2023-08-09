import { open } from "@tauri-apps/api/dialog";
import { message } from "@tauri-apps/api/dialog";
import { readTextFile } from "@tauri-apps/api/fs";

const openIDLFile = async (event: any, IDL: any, setIDL: Function) => {
  const fileReader = new FileReader();
  fileReader.readAsText(event.target.files[0], "UTF-8");
  fileReader.onload = (e: any) => {
    setIDL(JSON.parse(e.target.result))
  };
}

export default openIDLFile;