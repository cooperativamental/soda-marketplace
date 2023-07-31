import { ask } from '@tauri-apps/api/dialog';

const cleanProject = (setIDL: Function) => {
    return async () => {
      const confirmation = await confirm('Are you sure? This will close your previus project');
      if (!confirmation)
        return;
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
  }
  
export default cleanProject;