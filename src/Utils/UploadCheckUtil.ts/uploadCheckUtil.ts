const supportedTypes = ['.pdf', '.docx', '.doc', '.txt'];

export interface UploadValidityObject {
    exceededFileNameArray: string[];
    unsupportedFiles: string[];
    acceptedFiles: any[];
}

let returnObject: UploadValidityObject = {
    exceededFileNameArray: [],
    unsupportedFiles: [],
    acceptedFiles: []
};

export const regexp = /((.)+)\.(([a-z])+)/gi;
let sizeLimit = 100000000; //100Mb

export function generateFileNameArray(files: any) {
    let totalFiles: string[] = [];
    for (let x = 0; x < files.length; x++) {
        totalFiles.push(files[x].name);
    }
    return totalFiles;
}

export function sucessfullyUploadedFiles(totalFiles: File[], duplicateFiles: string[], uploadValidityObject: UploadValidityObject) {
    let sucessfullFiles: number = 0;
    let commonFiles: string[] = [];
    for (let i = 0; i < uploadValidityObject.unsupportedFiles.length; i++) {
        for (let j = 0; j < uploadValidityObject.exceededFileNameArray.length; j++) {
            if (uploadValidityObject.unsupportedFiles[i] === uploadValidityObject.exceededFileNameArray[j]) {
                commonFiles.push(uploadValidityObject.unsupportedFiles[i]);
            }
        }
    }
    sucessfullFiles = totalFiles.length - uploadValidityObject.exceededFileNameArray.length - uploadValidityObject.unsupportedFiles.length - duplicateFiles.length + commonFiles.length;
    return sucessfullFiles;
}

export function checkUploadValidity(files: any) {
    let exceededFileNameArray: string[] = [];
    let unsupportedFiles: string[] = [];
    let acceptedFiles: any[] = [];
    for (let x = 0; x < files.length; x++) {
        let matches = [];
        let match;
        while (match = regexp.exec(files[x].name)) {
            matches.push(match[1]);
        }
        let fileType = files[x].name.replace(matches[0], '').toLowerCase();
        if (supportedTypes.indexOf(fileType) === -1) {
            unsupportedFiles.push(files[x].name);
        }
        if (files[x].size > sizeLimit) {
            exceededFileNameArray.push(files[x].name);
        }
    }
    for (let x = 0; x < files.length; x++) {
        if (exceededFileNameArray.findIndex((el: string) => { return el === files[x].name }) === -1) {
            if (unsupportedFiles.findIndex((el: string) => { return el === files[x].name }) === -1) {
                acceptedFiles.push(files[x]);
            }
        }
    }
    returnObject = {
        exceededFileNameArray: exceededFileNameArray,
        unsupportedFiles: unsupportedFiles,
        acceptedFiles: acceptedFiles
    }
    return returnObject;
}

export function getMimeType(str: string) {
    let matches = [];
    let match;
    while (match = regexp.exec(str)) {
      matches.push(match[1]);
    }
    let returnType = str.replace(matches[0], '');
    return returnType.toLowerCase();
  }