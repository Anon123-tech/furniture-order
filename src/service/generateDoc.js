import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import Docxtemplater from 'docxtemplater'
import {saveAs} from 'file-saver';

export default function generateDoc(data, templateURL, outputFileName) {
    loadFile(templateURL, function (error, content) {
        if (error) {
            throw error
        }
        let zip = new JSZip(content);
        let doc = new Docxtemplater().loadZip(zip);
        doc.setData(data);
        try {
            doc.render()
        } catch (error) {
            console.log(JSON.stringify(error.toString()));
            // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
            throw error;
        }
        let out = doc.getZip().generate({
            type: "blob",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        }); //Output the document using Data-URI
        saveAs(out, `${outputFileName}.docx`)
    });

}

function loadFile(url, callback) {
    JSZipUtils.getBinaryContent(url, callback);
}
