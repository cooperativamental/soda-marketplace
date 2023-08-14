

const saveIDLFile = (IDL:any) => {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(IDL)], {type:"application/json"})
  );
    // Example: Create a download link and trigger the click event
    const downloadLink = document.createElement('a');

    downloadLink.href = url;
    downloadLink.download = `${IDL.name || " "}.json`;
    downloadLink.click();

}

export default saveIDLFile;