import { isNullOrUndefined } from 'is-what';
import {
    DataPoints,
    Child,
    LinkParagraphRequest,
    InsightsInterface,
    BiPointDataMode,
    sentenceInfo,
    phraseInfo,
    tableInfo,
    dateInfo,
    eventInfo,
    EventData,
} from '../../State/documentState';

export const highlight_yellow = '#FFEDAD';
export const highlight_lilac = '#D5A9CE';
export const nature_tag_color = '#BA0748';
export const type_tag_color = '#253586';
export const others_tag_color = '#076532';
export const groups_tag_color = 'gray';
export const tag_tooltip =
    'Mark your documents with relevant tags like ‘Amendment’, ‘Master Agreement’, ‘Security Agreement’, ‘Collaboration Agreement’ etc. You can also add custom tags used within your organization.';
export const tag_nature_tooltip = 'Add the nature of the file (eg. Amendment, Master Agreement, Invoice etc.)';
export const tag_type_tooltip = 'Add the type of file (eg. Lease, Loan, Employment Agreement etc.)';
export const tag_others_tooltip = 'See customs tags used in your organization and add more if you want!';
export const tag_groups_tooltip = 'Add groups to this file for access permissions.';
export const separateComponent = ['Tags', 'Contracting Parties', 'Consent Authority'];
export const editableComponent = [
    'Title',
    'Tags',
    'Contracting Parties',
    'Start Dates',
    'End Dates',
    'Duration',
    'Force Majeure',
    'Subletting/Assignment',
    'Renewal',
    'Confidentiality',
    'Payment Obligations',
    'eventsOfDefault',
    'Notice Obligations',
    'Non-compete clause',
    'Non-solicitation clause',
    'Insurance clause',
    'Change of Control',
    'Indemnity/Reimbursements/Costs',
    'Confidentiality Duration',
    'Confidentiality Nature',
    'Non Compete Duration',
    'Non Compete Territory',
    'Non Solicitation Duration',
    'Payment Duration',
    'Term clause',
    'Termination clause',
    'Governing Law clause',
    'Termination at Convenience',
    'Lock-in Period',
    'Jurisdiction',
    'Events Covered',
    'Amount',
    'Limitation Of Liability',
    'Limitation Of Liability Amount',
    'Termination Event',
    'Events Of Default Event',
    'Dispute Resolution',
    'Dispute Resolution Arbitration',
    'Dispute Resolution Conciliation',
    'Dispute Resolution Mediation',
    'Dispute Resolution Negotiation',
    'Dispute Resolution Others',
    'Dispute Resolution Panel',
    'Dispute Resolution Venue',
    'Dispute Resolution Act/Statute',
    'Other Obligations',
    'General Definitions',
    'Consent Clause',
    'Subletting/Assignment Notice Info',
    'Subletting/Assignment Consent Info',
    'Change of Control Definition',
    'Change of Control Termination',
    'Change of Control Consent',
    'Change of Control Notice',
    'Change of Control Payment',
    'Indemnity/Reimbursements/Costs Payer',
    'Indemnity/Reimbursements/Costs Payee',
    'Indemnity/Reimbursements/Costs Triggering Event',
    'Indemnity/Reimbursements/Costs Extent of Cost',
    'Indemnity/Reimbursements/Costs Amount',
    'Consent Regulatory',
    'Consent Authority',
];

export const editableIndividualBIs = ['Consent Regulatory', 'Consent Authority'];

export const paraLevelComponents = [
    'Start Dates',
    'End Dates',
    'Duration',
    'Force Majeure',
    'Subletting/Assignment',
    'Renewal',
    'eventsOfDefault',
    'Insurance clause',
    'Indemnity/Reimbursements/Costs',
    'Term clause',
    'Governing Law clause',
    'Termination at Convenience',
    'Lock-in Period',
    'Dispute Resolution',
    'Dispute Resolution Arbitration',
    'Dispute Resolution Conciliation',
    'Dispute Resolution Mediation',
    'Dispute Resolution Negotiation',
    'Dispute Resolution Others',
    'Change of Control Definition',
];

export const sentenceLevelComponents = [
    'Termination clause',
    'Confidentiality',
    'Non-compete clause',
    'Non-solicitation clause',
    'Notice Obligations',
    'Payment Obligations',
    'Change of Control',
    'Limitation Of Liability',
    'Other Obligations',
    'Change of Control Termination',
    'Change of Control Consent',
    'Change of Control Notice',
    'Change of Control Payment',
    'Auto-Renewal',
    'Notice for Auto-Renewal',
];

export const phraseLevelComponents = [
    'Confidentiality Duration',
    'Confidentiality Nature',
    'Amount',
    'Events Covered',
    'Non Compete Duration',
    'Non Compete Territory',
    'Non Solicitation Duration',
    'Jurisdiction',
    'Payment Duration',
    'Limitation Of Liability Amount',
    'Dispute Resolution Panel',
    'Dispute Resolution Venue',
    'Dispute Resolution Act/Statute',
    'Indemnity/Reimbursements/Costs Payer',
    'Indemnity/Reimbursements/Costs Payee',
    'Indemnity/Reimbursements/Costs Triggering Event',
    'Indemnity/Reimbursements/Costs Extent of Cost',
    'Indemnity/Reimbursements/Costs Amount',
    'General Definitions',
    'Renewal Notice Reference Date',
    'Renewal Notice Duration',
];

export const phraseLevelMapping: any = {
    'Confidentiality Duration': 'Duration',
    'Confidentiality Nature': 'Nature',
    Jurisdiction: 'Jurisdiction',
    'Non Compete Duration': 'Duration',
    'Non Compete Territory': 'Territory',
    'Non Solicitation Duration': 'Duration',
    Amount: 'Amount',
    'Events Covered': 'Events Covered',
    'Payment Duration': 'Duration',
    'Limitation Of Liability Amount': 'Amount',
    'Indemnity/Reimbursements/Costs Extent of Cost': 'Extent of Costs',
    'Indemnity/Reimbursements/Costs Payer': 'Payer',
    'Indemnity/Reimbursements/Costs Payee': 'Payee',
    'Indemnity/Reimbursements/Costs Triggering Event': 'Triggering Event',
    'Indemnity/Reimbursements/Costs Amount': 'Cap',
    'Dispute Resolution Panel': 'Panel',
    'Dispute Resolution Venue': 'Venue',
    'Dispute Resolution Act/Statute': 'Act/Statute',
    'General Definitions': 'General Definitions',
};

export const phraseBiMap: any = {
    'Confidentiality Duration': 'duration',
    'Confidentiality Nature': 'nature',
    Jurisdiction: 'jurisdiction',
    'Non Compete Duration': 'duration',
    'Non Compete Territory': 'jurisdiction',
    'Non Solicitation Duration': 'duration',
    'Non Solicitation Territory': 'jurisdiction',
    'Payment Duration': 'duration',
    Amount: 'amount',
    'Events Covered': 'force_majeure_event',
    'Limitation Of Liability Amount': 'amount',
    'Indemnity/Reimbursements/Costs Payer': 'Payer',
    'Indemnity/Reimbursements/Costs Payee': 'Payee',
    'Indemnity/Reimbursements/Costs Amount': 'amount',
};

export const sentenceBiMap: any = {
    'Change of Control Termination': 'Termination',
    'Change of Control Consent': 'Consent',
    'Change of Control Notice': 'Notice',
    'Change of Control Payment': 'Payment',
};

export const paraBiMap: any = {
    'Dispute Resolution Arbitration': 'Arbitration',
    'Dispute Resolution Conciliation': 'Conciliation',
    'Dispute Resolution Mediation': 'Mediation',
    'Dispute Resolution Negotiation': 'Negotiation',
    'Dispute Resolution Others': 'Others',
    'Change of Control Definition': 'definition',
};

export const dataForMap: any = {
    'Consent Clause': 'clause',
    'Consent Regulatory': 'regulatory',
    'Consent Authority': 'authority',
};

export const unClickableBI = [
    'Title',
    'Tags',
    'Contracting Parties',
    'Force Majeure',
    'Subletting/Assignment',
    'Renewal',
    'Confidentiality',
    'Payment Obligations',
    'Notice Obligations',
    'Non-compete clause',
    'Non-solicitation clause',
    'Insurance clause',
    'Change of Control',
    'Indemnity/Reimbursements/Costs',
    'eventsOfDefault',
    'Term clause',
    'Termination clause',
    'Governing Law clause',
    'Limitation Of Liability',
    'Dispute Resolution',
    'Change of Control Definition',
    'Change of Control Termination',
    'Change of Control Consent',
    'Change of Control Notice',
    'Change of Control Payment',
    'Indemnity/Reimbursements/Costs Payer',
    'Indemnity/Reimbursements/Costs Payee',
    'Indemnity/Reimbursements/Costs Triggering Event',
    'Indemnity/Reimbursements/Costs Extent of Cost',
    'Other Obligations',
    'Subletting/Assignment',
    'Subletting/Assignment Notice Info',
    'Subletting/Assignment Consent Info',
    'General Definitions',
    'Indemnity/Reimbursements/Costs Amount',
    'Consent Clause',
    'Consent Regulatory',
    'Consent Authority',
    'Auto-Renewal',
    'Notice for Auto-Renewal',
    'Renewal Notice Reference Date',
    'Renewal Notice Duration',
    'Start Dates',
    'End Dates',
    'Duration',
    'Payment Obligations Payee',
    'Amount',
    'Payment Duration',
    'Payment Obligations Payment For',
    'Limitation Of Liability Amount',
];

export const hideBIValue = [
    'Start Dates',
    'End Dates',
    'Duration',
    'Payment Duration',
    'Renewal Notice Duration',
    'Non Compete Duration',
    'Non Solicitation Duration',
    'Confidentiality Duration',
    'Amount',
    'Indemnity/Reimbursements/Costs Amount',
    'Limitation Of Liability Amount',
];

export const omitBIBackground = ['Title', 'Tags', 'Contracting Parties', 'Regulatory', 'Authority'];

export const alternateNewBIs = [
    'Change of Control',
    'Change of Control Definition',
    'Change of Control Termination',
    'Change of Control Consent',
    'Change of Control Notice',
    'Change of Control Payment',
    'Indemnity/Reimbursements/Costs',
    'Indemnity/Reimbursements/Costs Payer',
    'Indemnity/Reimbursements/Costs Payee',
    'Indemnity/Reimbursements/Costs Triggering Event',
    'Indemnity/Reimbursements/Costs Extent of Cost',
    'Other Obligations',
    'Subletting/Assignment',
    'Subletting/Assignment Notice Info',
    'Subletting/Assignment Consent Info',
    'Indemnity/Reimbursements/Costs Amount',
    'General Definitions',
    'Consent Clause',
    'Auto-Renewal',
    'Notice for Auto-Renewal',
    'Renewal Notice Reference Date',
    'Renewal Notice Duration',
    'Start Dates',
    'End Dates',
    'Duration',
    'Amount',
    'Payment Duration',
    'Non Compete Duration',
    'Non Solicitation Duration',
    'Indemnity/Reimbursements/Costs Amount',
    'Limitation Of Liability Amount',
    'Renewal Notice Duration',
    'Renewal Notice Reference Date',
    'Payment Obligations',
    'Confidentiality Duration',
];

export const normalizedBIs = [
    'Start Dates',
    'End Dates',
    'Duration',
    'Amount',
    'Payment Duration',
    'Non Compete Duration',
    'Non Solicitation Duration',
    'Indemnity/Reimbursements/Costs Amount',
    'Limitation Of Liability Amount',
    'Renewal Notice Duration',
    'Renewal Notice Reference Date',
    'Confidentiality Duration',
];

export const normalizedDateBIs = ['Start Dates', 'End Dates', 'Renewal Notice Reference Date'];
export const normalizedDurationBIs = [
    'Duration',
    'Payment Duration',
    'Renewal Notice Duration',
    'Non Compete Duration',
    'Non Solicitation Duration',
    'Confidentiality Duration',
];
export const normalizedAmountBIs = [
    'Amount',
    'Indemnity/Reimbursements/Costs Amount',
    'Limitation Of Liability Amount',
];

export const editableNormalizedComponents = [
    'Duration',
    'Payment Duration',
    'Non Compete Duration',
    'Non Solicitation Duration',
    'Confidentiality Duration',
    'Amount',
    'Indemnity/Reimbursements/Costs Amount',
    'Limitation Of Liability Amount',
];

export const separateUnclickableBI = ['Tags', 'Contracting Parties'];

export const singleParaLinking = ['Start Dates', 'End Dates', 'Duration', 'Lock-in Period'];
export const termDateComponents = ['Start Dates', 'End Dates', 'Duration'];

export const multipleParaLinking = [
    'Force Majeure',
    'Subletting/Assignment',
    'Renewal',
    'Indemnity/Reimbursements/Costs',
    'Insurance clause',
    'eventsOfDefault',
    'Term clause',
    'Governing Law clause',
    'Termination at Convenience',
    'Dispute Resolution',
    'Dispute Resolution Arbitration',
    'Dispute Resolution Conciliation',
    'Dispute Resolution Mediation',
    'Dispute Resolution Negotiation',
    'Dispute Resolution Others',
    'Change of Control Definition',
];

export const singleSentenceLinking = [
    'Subletting/Assignment Notice Info',
    'Subletting/Assignment Consent Info',
    'Consent Clause',
];

export const dateBiMap: any = {
    'Start Dates': 'date',
    'End Dates': 'date',
    Duration: 'duration',
};

export const disputeResolutionModeBi = ['Arbitration', 'Conciliation', 'Mediation', 'Negotiation', 'Others'];
export const eventListComponents = ['Termination Event', 'Events Of Default Event'];

export const eventBiMap: any = {
    'Termination Event': 'termination',
    'Events Of Default Event': 'eventsofdefault',
};

export function normalizeDates(dateString: string) {
    let splitString = dateString.split('-');
    return splitString[2] + '-' + getMonthName(splitString[1]) + '-' + splitString[0];
}

export function normalizedTermClauseData(datString: any) {
    let returnStr: LinkParagraphRequest[] = [];
    datString.forEach((el: any) => {
        returnStr.push({
            data: el.name,
            mode: el.mode,
        });
    });
    return returnStr;
}

export function normalizeTermClauseDataNew(datString: any) {
    let returnStr: LinkParagraphRequest[] = [];
    datString.forEach((el: any) => {
        let tempParaId: number[] | null = [];
        if (el.dataPoints.paraId === null) {
            tempParaId = null;
        } else {
            tempParaId.push(el.dataPoints.paraId);
        }
        returnStr.push({
            data: el.name,
            mode: el.mode,
            paraId: tempParaId,
        });
    });
    return returnStr;
}

function getMonthName(str: string) {
    switch (str) {
        case '01': {
            return 'JAN';
        }
        case '02': {
            return 'FEB';
        }
        case '03': {
            return 'MAR';
        }
        case '04': {
            return 'APR';
        }
        case '05': {
            return 'MAY';
        }
        case '06': {
            return 'JUN';
        }
        case '07': {
            return 'JUL';
        }
        case '08': {
            return 'AUG';
        }
        case '09': {
            return 'SEP';
        }
        case '10': {
            return 'OCT';
        }
        case '11': {
            return 'NOV';
        }
        case '12': {
            return 'DEC';
        }
        default: {
            return str;
        }
    }
}

export function getBreadcrumbText(linkedPage: string) {
    switch (linkedPage) {
        case 'addfiles': {
            return 'Add Files';
        }
        case 'documentlibrary': {
            return 'Document Library';
        }
        case 'clauselibrary': {
            return 'Clause Library';
        }
        default: {
            let str1 = linkedPage.slice(0, 1);
            let str2 = linkedPage.slice(1, linkedPage.length);
            return str1.toUpperCase() + str2;
        }
    }
}

export function simulateScroll(tempArray: string[], typeClicked: string) {
    document.documentElement.style.scrollBehavior = 'smooth';
    if (typeClicked === 'clause') {
        for (let i = 0; i < tempArray.length; i++) {
            let paraHeader = document.getElementById(tempArray[i]);
            if (!isNullOrUndefined(paraHeader)) {
                paraHeader.style.background = highlight_yellow;
            }
        }
    } else {
        for (let i = 0; i < tempArray.length; i++) {
            for (let j = 0; j < tempArray[i].length; j++) {
                let wordHeader = document.getElementById(tempArray[i][j]);
                if (!isNullOrUndefined(wordHeader)) {
                    wordHeader.style.background = highlight_lilac;
                }
            }
        }
    }
}

export function createChildDataPointsAggregate(childValue: AuxArrayInterface[]) {
    let childAggregate: any[] = [];
    for (let i = 0; i < childValue.length; i++) {
        childAggregate.push(childValue[i].dataPoints);
    }
    return childAggregate;
}

export function getParentHighlights(dataPoints: DataPoints[]) {
    let dataPointsArray: string[] = [];
    let auxString = '';
    for (let i = 0; i < dataPoints.length; i++) {
        if (dataPoints[i].paraId !== -1 && dataPoints[i].paraId !== null) {
            auxString = 'p' + dataPoints[i].paraId;
            if (
                dataPoints[i].rowId !== undefined &&
                dataPoints[i].rowId !== null &&
                dataPoints[i].rowId !== -1 &&
                dataPoints[i].columnId !== undefined &&
                dataPoints[i].columnId !== null &&
                dataPoints[i].columnId !== -1
            ) {
                //only for paraid,rowid,columnid
                auxString += ';r' + dataPoints[i].rowId + ';c' + dataPoints[i].columnId;
                dataPointsArray.push(auxString);
                continue;
            }
            dataPointsArray.push(auxString);
        }
        if (dataPoints[i].startWordId !== -1 && dataPoints[i].startWordId !== null) {
            dataPointsArray.pop(); //Pop last element when next level is present.
            if (dataPoints[i].paraId !== -1) {
                //set here again to paraIndex, then add wordIndex
                auxString = 'p' + dataPoints[i].paraId;
            }
            if (dataPoints[i].endWordId !== -1 && dataPoints[i].endWordId !== dataPoints[i].startWordId) {
                for (let k = dataPoints[i].startWordId; k <= dataPoints[i].endWordId; k++) {
                    let interMediateStr = auxString + ';w' + k;
                    dataPointsArray.push(interMediateStr);
                }
            } else {
                auxString += ';w' + dataPoints[i].startWordId;
                dataPointsArray.push(auxString);
            }
        }
        if (
            dataPoints[i].startSentenceId !== -1 &&
            dataPoints[i].startSentenceId !== null &&
            (dataPoints[i].startWordId === null || dataPoints[i].startWordId < 0)
        ) {
            dataPointsArray.pop(); //Pop last element when next level is present.
            if (dataPoints[i].endSentenceId !== -1 && dataPoints[i].endSentenceId !== dataPoints[i].startSentenceId) {
                for (let k = dataPoints[i].startSentenceId; k <= dataPoints[i].endSentenceId; k++) {
                    let interMediateStr = auxString + ';s' + k;
                    dataPointsArray.push(interMediateStr);
                }
            } else {
                auxString += ';s' + dataPoints[i].startSentenceId;
                dataPointsArray.push(auxString);
            }
        }
    }
    return dataPointsArray;
}

export interface AuxArrayInterface {
    name: string;
    dataPoints: string[];
}

// export interface AuxArrayInterface {
//     name: string;
//     // dataPoints: string[];
//     dataPoints: ChildDataPoints; //For handling cases where a child having multiple instances point to same data points.
// }

export function getChildHighlights(child: Child[]) {
    let auxArray: AuxArrayInterface[] = [];
    let auxString = '';
    for (let i = 0; i < child.length; i++) {
        let dataPointsArray: string[] = [];
        if (child[i].dataPoints.paraId !== -1 && child[i].dataPoints.paraId !== null) {
            auxString = 'p' + child[i].dataPoints.paraId;
            if (
                child[i].dataPoints.rowId !== undefined &&
                child[i].dataPoints.rowId !== null &&
                child[i].dataPoints.rowId !== -1 &&
                child[i].dataPoints.columnId !== undefined &&
                child[i].dataPoints.columnId !== null &&
                child[i].dataPoints.columnId !== -1
            ) {
                //only for paraid,rowid,columnid
                auxString += ';r' + child[i].dataPoints.rowId + ';c' + child[i].dataPoints.columnId;
                dataPointsArray.push(auxString);
                auxArray.push({
                    name: child[i].name,
                    dataPoints: dataPointsArray,
                });
                continue;
            }
            dataPointsArray.push(auxString);
        }
        if (child[i].dataPoints.startWordId !== -1 && child[i].dataPoints.startWordId !== null) {
            dataPointsArray.pop(); //Pop last element when next level is present.
            if (child[i].dataPoints.paraId !== -1) {
                //set here again to paraIndex, then add wordIndex
                auxString = 'p' + child[i].dataPoints.paraId;
            }
            if (
                child[i].dataPoints.endWordId !== -1 &&
                child[i].dataPoints.endWordId !== child[i].dataPoints.startWordId
            ) {
                for (let k = child[i].dataPoints.startWordId; k <= child[i].dataPoints.endWordId; k++) {
                    let interMediateStr = auxString + ';w' + k;
                    dataPointsArray.push(interMediateStr);
                }
            } else {
                auxString += ';w' + child[i].dataPoints.startWordId;
                dataPointsArray.push(auxString);
            }
        }
        if (
            child[i].dataPoints.startSentenceId !== -1 &&
            child[i].dataPoints.startSentenceId !== null &&
            (child[i].dataPoints.startWordId === null || child[i].dataPoints.startWordId < 0)
        ) {
            dataPointsArray.pop(); //Pop last element when next level is present.
            if (
                child[i].dataPoints.endSentenceId !== -1 &&
                child[i].dataPoints.endSentenceId !== null &&
                child[i].dataPoints.endSentenceId !== child[i].dataPoints.startSentenceId
            ) {
                for (let k = child[i].dataPoints.startSentenceId; k <= child[i].dataPoints.endSentenceId; k++) {
                    let interMediateStr = auxString + ';s' + k;
                    dataPointsArray.push(interMediateStr);
                }
            } else {
                auxString += ';s' + child[i].dataPoints.startSentenceId;
                dataPointsArray.push(auxString);
            }
        }
        auxArray.push({
            name: child[i].name,
            dataPoints: dataPointsArray,
        });
    }
    return auxArray;
}

export function detectMultipleInstances(children: AuxArrayInterface[]) {
    let dataPointsArray: string[] = [];
    let tempArray: AuxArrayInterface[] = [];
    for (let i = 0; i < children.length; i++) {
        if (tempArray.length === 0) {
            //Initial
            tempArray.push({
                name: children[i].name,
                dataPoints: children[i].dataPoints,
            });
        } else {
            let index = tempArray.findIndex((el) => {
                return el.name === children[i].name;
            });
            if (index > -1) {
                dataPointsArray.push(children[i].dataPoints[0]);
                tempArray[index].dataPoints = dataPointsArray;
            } else {
                tempArray.push({
                    name: children[i].name,
                    dataPoints: children[i].dataPoints,
                });
            }
        }
    }
    return tempArray;
}

export function getDatapointScrollString(dataPoints: DataPoints) {
    let auxString = '';
    if (dataPoints.paraId !== -1 && dataPoints.paraId !== null) {
        auxString = 'p' + dataPoints.paraId;
        if (
            dataPoints.rowId !== undefined &&
            dataPoints.rowId !== null &&
            dataPoints.rowId !== -1 &&
            dataPoints.columnId !== undefined &&
            dataPoints.columnId !== null &&
            dataPoints.columnId !== -1
        ) {
            //only for paraid,rowid,columnid
            auxString += ';r' + dataPoints.rowId + ';c' + dataPoints.columnId;
            return auxString;
        }
    }
    if (
        dataPoints.startSentenceId !== -1 &&
        dataPoints.startSentenceId !== null &&
        (dataPoints.startWordId === null || dataPoints.startWordId < 0)
    ) {
        auxString += ';s' + dataPoints.startSentenceId;
        return auxString;
    }
    if (dataPoints.startWordId !== -1 && dataPoints.startWordId !== null) {
        auxString += ';w' + dataPoints.startWordId;
        return auxString;
    }

    return auxString;
}

export function resetAllBiPointDataModes(insights: InsightsInterface[]) {
    let biPointDataType: BiPointDataMode[] = [];

    for (let i = 0; i < insights.length; i++) {
        for (let j = 0; j < insights[i].children.length; j++) {
            biPointDataType.push({
                biDataPointName: insights[i].children[j].childLabel,
                isDataOriginal: false,
            });
        }
    }
    return biPointDataType;
}

export function getParasFromChild(savedChildInsight: any) {
    let tempArr: number[] = [];
    if (savedChildInsight.length > 0) {
        for (let i = 0; i < savedChildInsight.length; i++) {
            if (i === 0 && savedChildInsight[i].name === 'No') {
                return [];
            } else {
                if (
                    savedChildInsight[i].dataPoints.paraId !== undefined &&
                    savedChildInsight[i].dataPoints.paraId !== null
                ) {
                    if (
                        (savedChildInsight[i].dataPoints.rowId === null ||
                            savedChildInsight[i].dataPoints.rowId === -1) &&
                        (savedChildInsight[i].dataPoints.columnId === null ||
                            savedChildInsight[i].dataPoints.columnId === -1)
                    ) {
                        tempArr.push(savedChildInsight[i].dataPoints.paraId);
                    }
                } else {
                    return [];
                }
            }
        }
    }
    return tempArr;
}

export function getSingleText(savedChildInsight: any) {
    let tempText = '';
    if (savedChildInsight.length > 0) {
        tempText = savedChildInsight[0].name;
    }
    return tempText;
}

export function getSingleParaIdFromChild(savedChildInsight: any) {
    let tempParaId = -1;
    if (savedChildInsight.length > 0) {
        if (
            savedChildInsight[0].dataPoints.paraId !== undefined &&
            savedChildInsight[0].dataPoints.paraId !== null &&
            savedChildInsight[0].dataPoints.paraId !== -1
        ) {
            if (
                (savedChildInsight[0].dataPoints.rowId === null || savedChildInsight[0].dataPoints.rowId === -1) &&
                (savedChildInsight[0].dataPoints.columnId === null || savedChildInsight[0].dataPoints.columnId === -1)
            ) {
                tempParaId = savedChildInsight[0].dataPoints.paraId;
            }
        }
    }
    return tempParaId;
}

export function getSingleTableCellFromChild(savedChildInsight: any) {
    let tempSingleTableCell: tableInfo | null = null;
    if (savedChildInsight.length > 0) {
        if (
            savedChildInsight[0].dataPoints.paraId !== undefined &&
            savedChildInsight[0].dataPoints.paraId !== null &&
            savedChildInsight[0].dataPoints.paraId !== -1
        ) {
            if (
                savedChildInsight[0].dataPoints.rowId !== undefined &&
                savedChildInsight[0].dataPoints.rowId !== null &&
                savedChildInsight[0].dataPoints.rowId !== -1 &&
                savedChildInsight[0].dataPoints.columnId !== undefined &&
                savedChildInsight[0].dataPoints.columnId !== null &&
                savedChildInsight[0].dataPoints.columnId !== -1
            ) {
                tempSingleTableCell = {
                    paraId: savedChildInsight[0].dataPoints.paraId,
                    rowId: savedChildInsight[0].dataPoints.rowId,
                    columnId: savedChildInsight[0].dataPoints.columnId,
                };
            }
        }
    }
    return tempSingleTableCell;
}

export function getSentencesFromChild(savedChildInsight: any) {
    let tempArr: sentenceInfo[] = [];
    if (savedChildInsight.length > 0) {
        for (let i = 0; i < savedChildInsight.length; i++) {
            if (i === 0 && savedChildInsight[i].name === 'No') {
                tempArr = [];
                break;
            } else {
                if (savedChildInsight[i].dataPoints.paraId !== undefined) {
                    if (
                        savedChildInsight[i].dataPoints.startSentenceId !== undefined &&
                        savedChildInsight[i].dataPoints.startSentenceId !== null &&
                        savedChildInsight[i].dataPoints.startSentenceId !== -1 &&
                        (savedChildInsight[i].dataPoints.startWordId === null ||
                            savedChildInsight[i].dataPoints.startWordId < 0)
                    ) {
                        let paraId =
                            savedChildInsight[i].dataPoints.paraId === null
                                ? null
                                : Number(savedChildInsight[i].dataPoints.paraId);
                        let sentenceId = savedChildInsight[i].dataPoints.startSentenceId;
                        let rowId = savedChildInsight[i].dataPoints.rowId;
                        let columnId = savedChildInsight[i].dataPoints.columnId;
                        tempArr.push({
                            paraId: paraId,
                            sentenceId: sentenceId,
                            rowId: rowId,
                            columnId: columnId,
                        });
                    }
                }
            }
        }
    }
    return tempArr;
}

export function hasSentence(sentencesInfo: sentenceInfo[] | null, paraIndex: number, sentenceIndex: number): boolean {
    if (sentencesInfo === null || sentencesInfo.length === 0) {
        return false;
    } else {
        for (let i = 0; i < sentencesInfo.length; i++) {
            if (sentencesInfo[i].paraId === paraIndex && sentencesInfo[i].sentenceId === sentenceIndex) {
                return true;
            }
        }
    }
    return false;
}

export function deleteSentence(
    sentencesInfo: sentenceInfo[] | null,
    paraIndex: number,
    sentenceIndex: number,
): sentenceInfo[] | null {
    let tempSentences: sentenceInfo[] | null = [];
    if (sentencesInfo === null || sentencesInfo.length === 0) {
        tempSentences = sentencesInfo;
    } else {
        for (let i = 0; i < sentencesInfo.length; i++) {
            if (sentencesInfo[i].paraId === paraIndex && sentencesInfo[i].sentenceId === sentenceIndex) {
                continue;
            }
            tempSentences.push(sentencesInfo[i]);
        }
    }
    return tempSentences;
}

export function hasWord(phrasesInfo: phraseInfo[] | null, paraIndex: number, wordIndex: number): boolean {
    let hasWord: boolean = false;
    if (phrasesInfo === null || phrasesInfo.length === 0) {
        hasWord = false;
    } else if (phrasesInfo !== null) {
        for (let i = 0; i < phrasesInfo.length; i++) {
            if (phrasesInfo[i].paraId === paraIndex && phrasesInfo[i].paraId !== -1) {
                if (phrasesInfo[i].startWordId !== -1 && phrasesInfo[i].endWordId !== -1) {
                    if (phrasesInfo[i].startWordId === wordIndex || phrasesInfo[i].endWordId === wordIndex) {
                        hasWord = true;
                        break;
                    } else if (phrasesInfo[i].startWordId < wordIndex && phrasesInfo[i].endWordId > wordIndex) {
                        hasWord = true;
                        break;
                    }
                }
            }
        }
    }
    return hasWord;
}

export function isWordInPhrase(paraIndex: number, wordIndex: number, phraseInfo: phraseInfo | null): boolean {
    let wordInPhrase: boolean = false;
    if (phraseInfo === null) {
        wordInPhrase = false;
    } else {
        if (phraseInfo !== null) {
            if (phraseInfo.paraId === paraIndex) {
                if (phraseInfo.startWordId === wordIndex || phraseInfo.endWordId === wordIndex) {
                    wordInPhrase = true;
                } else if (phraseInfo.startWordId < wordIndex && phraseInfo.endWordId > wordIndex) {
                    wordInPhrase = true;
                }
            }
        }
    }
    return wordInPhrase;
}

export function isStartWordInPhrase(paraIndex: number, wordIndex: number, phraseInfo: phraseInfo | null): boolean {
    let isEndWordInPhrase: boolean = false;
    if (phraseInfo === null) {
        isEndWordInPhrase = false;
    } else {
        if (phraseInfo !== null) {
            if (phraseInfo.paraId === paraIndex) {
                if (phraseInfo.startWordId === wordIndex) {
                    isEndWordInPhrase = true;
                }
            }
        }
    }
    return isEndWordInPhrase;
}

export function isEndWordInPhrase(paraIndex: number, wordIndex: number, phraseInfo: phraseInfo | null): boolean {
    let isEndWordInPhrase: boolean = false;
    if (phraseInfo === null) {
        isEndWordInPhrase = false;
    } else {
        if (phraseInfo !== null) {
            if (phraseInfo.paraId === paraIndex) {
                if (phraseInfo.endWordId === wordIndex) {
                    isEndWordInPhrase = true;
                }
            }
        }
    }
    return isEndWordInPhrase;
}

export function deletePhrase(phrasesInfo: phraseInfo[] | null, paraIndex: number, wordIndex: number) {
    let tempPhrases: phraseInfo[] | null = [];
    if (phrasesInfo === null || phrasesInfo.length === 0) {
        tempPhrases = phrasesInfo;
    } else if (phrasesInfo !== null) {
        for (let i = 0; i < phrasesInfo.length; i++) {
            if (phrasesInfo[i].paraId === paraIndex && phrasesInfo[i].paraId !== -1) {
                if (phrasesInfo[i].startWordId !== -1 && phrasesInfo[i].endWordId !== -1) {
                    if (phrasesInfo[i].startWordId === wordIndex || phrasesInfo[i].endWordId === wordIndex) {
                        continue;
                    } else if (phrasesInfo[i].startWordId < wordIndex && phrasesInfo[i].endWordId > wordIndex) {
                        continue;
                    } else {
                        tempPhrases.push(phrasesInfo[i]);
                        continue;
                    }
                }
            } else if (phrasesInfo[i].paraId !== paraIndex && phrasesInfo[i].paraId !== -1) {
                tempPhrases.push(phrasesInfo[i]);
            }
        }
    }
    return tempPhrases;
}

export function deletePhraseFromPhraseArray(phraseInfo: phraseInfo, phrases: phraseInfo[] | null) {
    let tempPhrases: phraseInfo[] = [];
    if (phrases === null || phrases.length === 0) {
        tempPhrases = [];
    } else {
        for (let i = 0; i < phrases.length; i++) {
            if (phrases[i].paraId === phraseInfo.paraId) {
                if (
                    phrases[i].rowId !== null &&
                    phrases[i].rowId !== -1 &&
                    phrases[i].rowId === phraseInfo.rowId &&
                    phrases[i].columnId !== null &&
                    phrases[i].columnId !== -1 &&
                    phrases[i].columnId === phraseInfo.columnId
                ) {
                    continue;
                } else if (
                    (phrases[i].rowId === null || phrases[i].rowId === -1) &&
                    (phrases[i].columnId === null || phrases[i].columnId === -1) &&
                    phrases[i].startWordId === phraseInfo.startWordId &&
                    phrases[i].endWordId === phraseInfo.endWordId
                ) {
                    continue;
                }
            }
            tempPhrases.push(phrases[i]);
        }
    }
    return tempPhrases;
}

export function getPhrasesFromChild(savedChildInsight: any) {
    let tempArr: phraseInfo[] = [];
    if (savedChildInsight.length > 0) {
        for (let i = 0; i < savedChildInsight.length; i++) {
            if (
                savedChildInsight[i].dataPoints.paraId !== undefined &&
                savedChildInsight[i].dataPoints.paraId !== null
            ) {
                if (
                    savedChildInsight[i].dataPoints.rowId !== undefined &&
                    savedChildInsight[i].dataPoints.rowId !== null &&
                    savedChildInsight[i].dataPoints.rowId !== -1 &&
                    savedChildInsight[i].dataPoints.columnId !== undefined &&
                    savedChildInsight[i].dataPoints.columnId !== null &&
                    savedChildInsight[i].dataPoints.columnId !== -1
                ) {
                    tempArr.push({
                        paraId: savedChildInsight[i].dataPoints.paraId,
                        startWordId: -1,
                        endWordId: -1,
                        startSentenceId: -1,
                        endSentenceId: -1,
                        rowId: savedChildInsight[i].dataPoints.rowId,
                        columnId: savedChildInsight[i].dataPoints.columnId,
                        phrase: savedChildInsight[i].name,
                    });
                    continue;
                } else if (
                    savedChildInsight[i].dataPoints.startWordId !== undefined &&
                    savedChildInsight[i].dataPoints.startWordId !== null &&
                    savedChildInsight[i].dataPoints.startWordId !== -1 &&
                    savedChildInsight[i].dataPoints.endWordId !== null &&
                    savedChildInsight[i].dataPoints.endWordid !== -1 &&
                    (savedChildInsight[i].dataPoints.rowId === null || savedChildInsight[i].dataPoints.rowId === -1) &&
                    (savedChildInsight[i].dataPoints.columnId === null ||
                        savedChildInsight[i].dataPoints.columnId === -1)
                ) {
                    let paraId = Number(savedChildInsight[i].dataPoints.paraId);
                    let startWordId = Number(savedChildInsight[i].dataPoints.startWordId);
                    let endWordId = Number(savedChildInsight[i].dataPoints.endWordId);
                    let startSentenceId = savedChildInsight[i].dataPoints.startSentenceId;
                    let endSentenceId = savedChildInsight[i].dataPoints.endSentenceId;
                    let rowId = savedChildInsight[i].dataPoints.rowId;
                    let columnId = savedChildInsight[i].dataPoints.columnId;
                    let phrase: string = savedChildInsight[i].name;
                    tempArr.push({
                        paraId: paraId,
                        startWordId: startWordId,
                        endWordId: endWordId,
                        startSentenceId: startSentenceId,
                        endSentenceId: endSentenceId,
                        rowId: rowId,
                        columnId: columnId,
                        phrase: phrase,
                    });
                }
            }
        }
    }
    return tempArr;
}

export function hasTableCell(
    paraIndex: number,
    rowIndex: number,
    columnIndex: number,
    savedHighlightedTableCells: tableInfo[] | null,
) {
    let hasTableCell: boolean = false;
    if (savedHighlightedTableCells === null || savedHighlightedTableCells.length === 0) {
        hasTableCell = false;
    } else {
        for (let i = 0; i < savedHighlightedTableCells.length; i++) {
            if (
                savedHighlightedTableCells[i].paraId === paraIndex &&
                savedHighlightedTableCells[i].rowId === rowIndex &&
                savedHighlightedTableCells[i].columnId === columnIndex
            ) {
                hasTableCell = true;
                break;
            }
        }
    }
    return hasTableCell;
}

export function getTableCellsFromChild(savedChildInsight: any) {
    let tempTableCellsArr: tableInfo[] = [];
    if (savedChildInsight.length > 0) {
        for (let i = 0; i < savedChildInsight.length; i++) {
            if (i === 0 && savedChildInsight[i].name === 'No') {
                tempTableCellsArr = [];
                break;
            } else {
                if (
                    savedChildInsight[i].dataPoints.paraId !== undefined &&
                    savedChildInsight[i].dataPoints.paraId !== null
                ) {
                    if (
                        savedChildInsight[i].dataPoints.rowId !== null &&
                        savedChildInsight[i].dataPoints.rowId !== undefined &&
                        savedChildInsight[i].dataPoints.columnId !== undefined &&
                        savedChildInsight[i].dataPoints.columnId !== null
                    ) {
                        tempTableCellsArr.push({
                            paraId: savedChildInsight[i].dataPoints.paraId,
                            rowId: savedChildInsight[i].dataPoints.rowId,
                            columnId: savedChildInsight[i].dataPoints.columnId,
                        });
                    }
                }
            }
        }
    }
    return tempTableCellsArr;
}

export function deleteTableCell(
    savedHighlightedTableCells: tableInfo[],
    paraIndex: number,
    rowIndex: number,
    columnIndex: number,
) {
    let filteredTableCells: tableInfo[] = [];
    if (savedHighlightedTableCells.length > 0) {
        for (let i = 0; i < savedHighlightedTableCells.length; i++) {
            if (
                savedHighlightedTableCells[i].paraId === paraIndex &&
                savedHighlightedTableCells[i].rowId === rowIndex &&
                savedHighlightedTableCells[i].columnId === columnIndex
            ) {
                continue;
            }
            filteredTableCells.push(savedHighlightedTableCells[i]);
        }
    }
    return filteredTableCells;
}

export function deleteTableCellFromPhraseArray(
    paraIndex: number,
    rowIndex: number,
    columnIndex: number,
    savedHighlightedPhrases: phraseInfo[],
) {
    let tempHighlightedPhrases: phraseInfo[] = [];
    if (savedHighlightedPhrases.length > 0) {
        for (let i = 0; i < savedHighlightedPhrases.length; i++) {
            if (
                savedHighlightedPhrases[i].paraId === paraIndex &&
                savedHighlightedPhrases[i].rowId === rowIndex &&
                savedHighlightedPhrases[i].columnId === columnIndex
            ) {
                continue;
            }
            tempHighlightedPhrases.push(savedHighlightedPhrases[i]);
        }
    }
    return tempHighlightedPhrases;
}

export function isTableCell(phraseInfo: phraseInfo) {
    let isTableCell: boolean = false;
    if (
        phraseInfo.paraId !== undefined &&
        phraseInfo.paraId !== null &&
        phraseInfo.paraId !== -1 &&
        phraseInfo.rowId !== undefined &&
        phraseInfo.rowId !== null &&
        phraseInfo.rowId !== -1 &&
        phraseInfo.columnId !== undefined &&
        phraseInfo.columnId !== null &&
        phraseInfo.columnId !== -1
    ) {
        isTableCell = true;
    }
    return isTableCell;
}

export function filterPhrasesFromPhrasesArray(phraseInfo: phraseInfo[]) {
    let tempFilteredPhrases: phraseInfo[] = [];
    if (phraseInfo !== null && phraseInfo.length > 0) {
        for (let i = 0; i < phraseInfo.length; i++) {
            if (
                phraseInfo[i].paraId !== undefined &&
                phraseInfo[i].paraId !== null &&
                phraseInfo[i].paraId !== -1 &&
                (phraseInfo[i].rowId === -1 || phraseInfo[i].rowId === null) &&
                (phraseInfo[i].columnId === -1 || phraseInfo[i].columnId === null)
            ) {
                if (
                    phraseInfo[i].startWordId !== undefined &&
                    phraseInfo[i].startWordId !== null &&
                    phraseInfo[i].startWordId !== -1 &&
                    phraseInfo[i].endWordId !== undefined &&
                    phraseInfo[i].endWordId !== null &&
                    phraseInfo[i].endWordId !== -1
                ) {
                    tempFilteredPhrases.push(phraseInfo[i]);
                }
            }
        }
    }
    return tempFilteredPhrases;
}

export function filterTableCellsFromPhraseArray(phraseInfo: phraseInfo[]) {
    let tempTableCellPhrases: phraseInfo[] = [];
    if (phraseInfo !== null && phraseInfo.length > 0) {
        for (let i = 0; i < phraseInfo.length; i++) {
            if (
                phraseInfo[i].paraId !== undefined &&
                phraseInfo[i].paraId !== null &&
                phraseInfo[i].paraId !== -1 &&
                phraseInfo[i].rowId !== undefined &&
                phraseInfo[i].rowId !== null &&
                phraseInfo[i].rowId !== -1
            ) {
                tempTableCellPhrases.push(phraseInfo[i]);
            }
        }
    }
    return tempTableCellPhrases;
}

export function getDatesFromChild(savedChildInsight: any) {
    let tempDateArray: dateInfo[] = [];
    if (savedChildInsight !== null && savedChildInsight.length > 0) {
        for (let i = 0; i < savedChildInsight.length; i++) {
            tempDateArray.push({
                dateId: i,
                phrase: savedChildInsight[i].name,
                paraId: savedChildInsight[i].dataPoints.paraId,
                rowId: savedChildInsight[i].dataPoints.rowId,
                columnId: savedChildInsight[i].dataPoints.columnId,
            });
        }
    }
    return tempDateArray;
}

export function getTermDurationFromChildArray(savedChildInsight: any) {
    let tempTermDuration: dateInfo = {
        dateId: -1,
        phrase: '',
        paraId: -1,
        rowId: -1,
        columnId: -1,
        duration_value: -1,
        duration_typeid: -1,
    };
    if (savedChildInsight !== null && savedChildInsight.length > 0) {
        tempTermDuration = {
            dateId: -1,
            phrase: savedChildInsight[0].name,
            paraId: savedChildInsight[0].dataPoints.paraId,
            rowId: savedChildInsight[0].dataPoints.rowId,
            columnId: savedChildInsight[0].dataPoints.columnId,
            duration_value: savedChildInsight[0].dataPoints.headerData.durationValue,
            duration_typeid: savedChildInsight[0].dataPoints.headerData.durationTypeId,
        };
    }
    return tempTermDuration;
}

export function deleteDateFromDateArray(dateInfo: dateInfo, dateArray: dateInfo[]) {
    let tempFilteredDates: dateInfo[] = [];
    if (dateArray.length > 0) {
        for (let i = 0; i < dateArray.length; i++) {
            if (
                dateArray[i].dateId === dateInfo.dateId &&
                dateArray[i].phrase === dateInfo.phrase &&
                dateArray[i].paraId === dateInfo.paraId
            ) {
                continue;
            }
            tempFilteredDates.push(dateArray[i]);
        }
    }
    return tempFilteredDates;
}

export function getFilteredDatePhrases(dateArray: dateInfo[]) {
    let tempFilteredDatePhrases: dateInfo[] = [];
    for (let i = 0; i < dateArray.length; i++) {
        if (
            dateArray[i].phrase !== '' &&
            (dateArray[i].paraId === null || dateArray[i].paraId === -1) &&
            (dateArray[i].rowId === null || dateArray[i].rowId === -1) &&
            (dateArray[i].columnId === null || dateArray[i].columnId === -1)
        ) {
            tempFilteredDatePhrases.push(dateArray[i]);
        }
    }
    return tempFilteredDatePhrases;
}

export function getFilteredDateParas(dateArray: dateInfo[]) {
    let tempFilteredDateParas: dateInfo[] = [];
    for (let i = 0; i < dateArray.length; i++) {
        if (
            dateArray[i].phrase !== '' &&
            dateArray[i].paraId !== null &&
            dateArray[i].paraId !== -1 &&
            (dateArray[i].rowId === null || dateArray[i].rowId === -1) &&
            (dateArray[i].columnId === null || dateArray[i].columnId === -1)
        ) {
            tempFilteredDateParas.push(dateArray[i]);
        }
    }
    return tempFilteredDateParas;
}

export function getFilteredDateTableCells(dateArray: dateInfo[]) {
    let tempFilteredDateTableCells: dateInfo[] = [];
    for (let i = 0; i < dateArray.length; i++) {
        if (
            dateArray[i].phrase !== '' &&
            dateArray[i].paraId !== null &&
            dateArray[i].paraId !== -1 &&
            dateArray[i].rowId !== null &&
            dateArray[i].rowId !== -1 &&
            dateArray[i].columnId !== null &&
            dateArray[i].columnId !== -1
        ) {
            tempFilteredDateTableCells.push(dateArray[i]);
        }
    }
    return tempFilteredDateTableCells;
}

export function getEventDataFromEventResult(queryResult: any) {
    let testEvents: EventData[] = [];

    if (queryResult !== null && queryResult.length > 0) {
        testEvents = [];
        for (let i = 0; i < queryResult.length; i++) {
            testEvents.push({
                eventId: queryResult[i].id,
                eventName: queryResult[i].event_name,
            });
        }
    }
    return testEvents;
}

export function getHighlightedEventsFromChild(savedChildInsights: any) {
    let tempHighlightedEvents: eventInfo[] = [];
    if (savedChildInsights !== null && savedChildInsights.length > 0) {
        for (let i = 0; i < savedChildInsights.length; i++) {
            tempHighlightedEvents.push({
                eventHighlightId: i,
                eventId: savedChildInsights[i].eventId,
                eventName: savedChildInsights[i].name,
                paraId: savedChildInsights[i].dataPoints.paraId,
                sentenceId: savedChildInsights[i].dataPoints.sentenceId,
                startWordId: savedChildInsights[i].dataPoints.startWordId,
                endWordId: savedChildInsights[i].dataPoints.endWordId,
                rowId: savedChildInsights[i].dataPoints.rowId,
                columnId: savedChildInsights[i].dataPoints.columnId,
                phrase: '',
            });
        }
    }
    return tempHighlightedEvents;
}

export function deletePhraseFromEventArray(eventInfo: eventInfo, eventArray: eventInfo[]) {
    let tempChangedHighlightedEvents: eventInfo[] = [];
    if (eventArray.length > 0) {
        for (let i = 0; i < eventArray.length; i++) {
            if (
                eventArray[i].eventId === eventInfo.eventId &&
                eventArray[i].eventName === eventInfo.eventName &&
                eventArray[i].paraId === eventInfo.paraId &&
                eventArray[i].startWordId === eventInfo.startWordId &&
                eventArray[i].endWordId === eventInfo.endWordId
            ) {
                let tempHighlightedEvent: eventInfo = eventArray[i];
                tempHighlightedEvent.paraId = -1;
                tempHighlightedEvent.startWordId = -1;
                tempHighlightedEvent.endWordId = -1;
                tempChangedHighlightedEvents.push(tempHighlightedEvent);
            } else {
                tempChangedHighlightedEvents.push(eventArray[i]);
            }
        }
    }
    return tempChangedHighlightedEvents;
}

export function replaceEventInEventArray(eventInfo: eventInfo, eventArray: eventInfo[]) {
    let tempChangedHighlightedEvents: eventInfo[] = [];
    if (eventArray.length > 0) {
        for (let i = 0; i < eventArray.length; i++) {
            if (eventInfo.eventHighlightId === eventArray[i].eventHighlightId) {
                tempChangedHighlightedEvents.push(eventInfo);
            } else {
                tempChangedHighlightedEvents.push(eventArray[i]);
            }
        }
    }
    return tempChangedHighlightedEvents;
}

export function deleteEventFromEventArray(eventInfo: eventInfo, eventArray: eventInfo[]) {
    let tempChangedHighlightedEvents: eventInfo[] = [];
    if (eventArray.length > 0) {
        for (let i = 0; i < eventArray.length; i++) {
            if (eventInfo.eventHighlightId === eventArray[i].eventHighlightId) {
                continue;
            }
            tempChangedHighlightedEvents.push(eventArray[i]);
        }
    }
    return tempChangedHighlightedEvents;
}

export function getPhraseEventsFromEventArray(eventArray: eventInfo[]) {
    let tempChangedHighlightedEventPhrases: eventInfo[] = [];
    for (let i = 0; i < eventArray.length; i++) {
        if (
            eventArray[i].paraId !== null &&
            eventArray[i].paraId !== -1 &&
            eventArray[i].startWordId !== null &&
            eventArray[i].startWordId !== -1 &&
            eventArray[i].endWordId !== null &&
            eventArray[i].endWordId !== -1
        ) {
            tempChangedHighlightedEventPhrases.push(eventArray[i]);
        }
    }
    return tempChangedHighlightedEventPhrases;
}

export function getTableCellEventsFromEventArray(eventArray: eventInfo[]) {
    let tempChangedHighlightedEventTableCells: eventInfo[] = [];
    for (let i = 0; i < eventArray.length; i++) {
        if (
            eventArray[i].paraId !== null &&
            eventArray[i].paraId !== -1 &&
            eventArray[i].rowId !== null &&
            eventArray[i].rowId !== -1 &&
            eventArray[i].columnId !== null &&
            eventArray[i].columnId !== -1
        ) {
            tempChangedHighlightedEventTableCells.push(eventArray[i]);
        }
    }
    return tempChangedHighlightedEventTableCells;
}

export function getAuthoritiesFromChild(savedChildInsight: any) {
    let tempArr: sentenceInfo[] = [];
    if (savedChildInsight.length > 0) {
        for (let i = 0; i < savedChildInsight.length; i++) {
            if (i === 0 && savedChildInsight[i].name === 'No') {
                tempArr = [];
                break;
            } else {
                if (savedChildInsight[i].dataPoints.paraId !== undefined) {
                    if (
                        savedChildInsight[i].dataPoints.startSentenceId !== undefined &&
                        savedChildInsight[i].dataPoints.startSentenceId !== null &&
                        savedChildInsight[i].dataPoints.startSentenceId !== -1 &&
                        (savedChildInsight[i].dataPoints.startWordId === null ||
                            savedChildInsight[i].dataPoints.startWordId < 0)
                    ) {
                        let paraId = savedChildInsight[i].dataPoints.paraId;
                        let sentenceId = savedChildInsight[i].dataPoints.startSentenceId;
                        let rowId = savedChildInsight[i].dataPoints.rowId;
                        let columnId = savedChildInsight[i].dataPoints.columnId;
                        tempArr.push({
                            paraId: paraId,
                            sentenceId: sentenceId,
                            rowId: rowId,
                            columnId: columnId,
                            startWordId: savedChildInsight[i].dataPoints.startWordId,
                            endWordId: savedChildInsight[i].dataPoints.endWordId,
                            phrase: savedChildInsight[i].name,
                            typestring: '',
                        });
                    }
                }
            }
        }
    }
    return tempArr;
}

export function getDurationPhraseFromChild(savedChildInsight: any) {
    let tempDateArray: phraseInfo = {
        paraId: -1,
        startWordId: -1,
        endWordId: -1,
        startSentenceId: -1,
        endSentenceId: -1,
        rowId: -1,
        columnId: -1,
        phrase: '',
        durationValue: -1,
        durationTypeId: -1,
    };
    if (savedChildInsight !== undefined && savedChildInsight !== null) {
        tempDateArray = {
            paraId: savedChildInsight.dataPoints.paraId,
            startWordId: savedChildInsight.dataPoints.startWordId,
            endWordId: savedChildInsight.dataPoints.endWordId,
            startSentenceId: savedChildInsight.dataPoints.startSentenceId,
            endSentenceId: savedChildInsight.dataPoints.endSentenceId,
            rowId: savedChildInsight.dataPoints.rowId,
            columnId: savedChildInsight.dataPoints.columnId,
            phrase: savedChildInsight.name,
            durationValue: savedChildInsight.dataPoints.headerData.durationValue,
            durationTypeId: savedChildInsight.dataPoints.headerData.durationTypeId,
        };
    }
    return tempDateArray;
}

export function getCurrencyPhraseFromChild(savedChildInsight: any) {
    let tempAmountArray: phraseInfo = {
        paraId: -1,
        startWordId: -1,
        endWordId: -1,
        startSentenceId: -1,
        endSentenceId: -1,
        rowId: -1,
        columnId: -1,
        phrase: '',
        total: -1,
        currency_typeid: -1,
    };
    if (savedChildInsight !== undefined && savedChildInsight !== null) {
        tempAmountArray = {
            paraId: savedChildInsight.dataPoints.paraId,
            startWordId: savedChildInsight.dataPoints.startWordId,
            endWordId: savedChildInsight.dataPoints.endWordId,
            startSentenceId: savedChildInsight.dataPoints.startSentenceId,
            endSentenceId: savedChildInsight.dataPoints.endSentenceId,
            rowId: savedChildInsight.dataPoints.rowId,
            columnId: savedChildInsight.dataPoints.columnId,
            phrase: savedChildInsight.name,
            total: savedChildInsight.dataPoints.headerData.amountValue,
            currency_typeid: savedChildInsight.dataPoints.headerData.amountTypeId,
        };
    }
    return tempAmountArray;
}

export function getTermDurationInfoFromChild(savedChildInsight: any) {
    let tempTermDuration: dateInfo = {
        dateId: -1,
        phrase: savedChildInsight.name,
        paraId: savedChildInsight.dataPoints.paraId,
        rowId: savedChildInsight.dataPoints.rowId,
        columnId: savedChildInsight.dataPoints.columnId,
        duration_value: savedChildInsight.dataPoints.headerData.durationValue,
        duration_typeid: savedChildInsight.dataPoints.headerData.durationTypeId,
    };
    return tempTermDuration;
}
