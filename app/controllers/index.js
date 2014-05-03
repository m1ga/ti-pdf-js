// opening a pdf file on android using pdf.js

// get the html file
var file = String(Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "index.html").read());
// get the pdf location
var pdf = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "pdf.pdf");
// change the html to open the custom pdf file
file = file.replace(/pdffile/gi, pdf.nativePath);

$.webview.html = file;
$.index.open();
