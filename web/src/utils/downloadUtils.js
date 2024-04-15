export const downloadFile = (exportFile) => {
  const blob = new Blob([exportFile.data], { type: exportFile.fileType });
  const url = window.URL.createObjectURL(blob); // Create a URL for the blob
  const a = document.createElement("a"); // Create an <a> element
  a.href = url; // Set the href of the <a> element to the blob URL
  a.download = exportFile.fileName; // Set the download attribute to the file name
  document.body.appendChild(a); // Append the <a> element to the body
  a.click(); // Programmatically click the <a> element to start the download
  a.remove(); // Remove the <a> element from the DOM
}
