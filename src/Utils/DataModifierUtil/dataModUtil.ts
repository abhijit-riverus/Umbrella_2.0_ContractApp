export function getUploadedTime(date: string) {
    let currentDate = new Date();
    let statusDate = new Date(date);
    let time = currentDate.getTime() - statusDate.getTime();
    let days = Math.round(time / (1000 * 3600 * 24));
    if (days === 0) {
        return "Today";
    }
    else if (days === 1) {
        return "Yesterday";
    }
    else {
        return getDate(date)
    }
}

export function getDateFormat(dateOfUpload: string) {
    var date, newdate, a: any, value;
    var monthNames = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    if (dateOfUpload !== null) {
        date = dateOfUpload.split('T')[0];
        date = date.toLocaleString();
        date = date.toString();
        a = date.split('-')[1];
        newdate = date.split('-');
        value = newdate[2] + '/' + monthNames[a - 1] + '/' + newdate[0];
    }
    return value;
}

export function getCommentTimeFormat(commentTime: string) {
    var date, newdate, a: any, value: string = '';
    var monthNames = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    if (commentTime !== null) {
        date = commentTime.split('T')[0];
        date = date.toLocaleString();
        value = date.toString();
        // a = date.split('-')[1];
        // newdate = date.split('-');
        // value = newdate[0] + '-' + monthNames[a - 1] + '-' + newdate[2];
    }
    return getUploadedTime(value);
}

export function getDueDateFormat(dueDate: string) {
    var newdate, date, month, year, value;
    if (dueDate !== null) {
        newdate = dueDate.split('-');
        date = newdate[2];
        month = newdate[1];
        year = newdate[0];
        value = date + '/' + month + '/' + year;
    }
    return value;
}

export function getDate(dateOfUpload: string) {
    var date, newdate, a: any, value;
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    if (dateOfUpload !== null) {
        date = dateOfUpload.split('T')[0];
        date = date.toLocaleString();
        date = date.toString();
        a = date.split('-')[1];
        newdate = date.split('-');
        value = newdate[2] + ' ' + ' ' + monthNames[a - 1] + ' ' + newdate[0];
    }
    return value;
}

export function getDashboardDate(effDate: string) {
    let eff = effDate + '';
    let splitStr = eff.split('-');
    let day = splitStr[2];
    let month = splitStr[1];
    let year = splitStr[0];
    let value = day + '/' + month + '/' + year;
    return value;
}

export function getTermDate(termDate: string) {
    let monthArray = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    let date = termDate + '';
    let splitStr = date.split('-');
    let month = "" + (monthArray.indexOf(splitStr[1]) + 1);
    let day = splitStr[0];
    let year = splitStr[2];
    let value = day + '/' + month + '/' + year;
    return value;
}

export function humanFileSize(bytes: any, si = false, dp = 1) {
    const thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    const units = si
        ? ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;

    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);
    return bytes.toFixed(dp) + ' ' + units[u];
}

export function capitalizeFirstLetter(name: string) {
    if (name === "addfiles") {
        return "Add Files"
    } else if (name === "documentlibrary") {
        return "Document Library"
    } else if (name === "clauselibrary") {
        return "Clause Library"
    } else if (name === "dataDictionary") {
        return "Data Dictionary"
    } else if (name === "draftingreview") {
        return "Drafting & Review"
    } else {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
}

export function truncateFileName(name: string) {
    let str1 = name.slice(0, 12);
    let len = name.length;
    let str2 = name.slice(len - 4, len);
    if (len > 15) {
        return str1 + '....' + str2;
    } else {
        return name;
    }
}

export function truncateTaskName(name: string) {
    let str1 = name.slice(0, 15);
    let len = name.length;
    if (len > 15) {
        return str1 + '...';
    } else {
        return name;
    }
}

export function truncateString(name: string, size: number) {
    let str1 = name.slice(0, size + 1);
    let len = name.length;
    if (len > size) {
        return str1 + '...';
    } else {
        return name;
    }
}

export function getTodaysDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    let todaysDate = dd + '/' + mm + '/' + yyyy;
    return todaysDate;
}

//to copy text in clipboard
export function textCopyToClipboard(text: string) {
    var input = document.createElement('textarea');
    input.innerHTML = text;
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand('copy');
    document.body.removeChild(input);
    return result;
}

export function getNormalizedDateToDateString(dateValue: string) {
    //2020-02-01 to 2 FEB 2020
    let dateArray = dateValue.split('-');
    let monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let day: string = dateArray[2];
    let year: string = dateArray[0];
    let month: string = '';
    let monthIndex: number = parseInt(dateArray[1], 10);
    monthIndex = monthIndex - 1;
    month = monthArray[monthIndex];
    let dateString: string = day + ' ' + month + ' ' + year;
    return dateString;
}