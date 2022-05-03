import { dateInfo, LinkDateRequest, LinkParagraphRequest, LinkParaRequest, LinkPhraseRequest, LinkSentenceRequest, paraInfo, phraseInfo, sentenceInfo } from "../../State/documentState";
import { assignmentInfoBiValue } from "../EditFeature/Component/CustomAddEdit/assignmentInfoAddEdit";
import { regulatoryMap } from "../EditFeature/Component/CustomAddEdit/consentAddEdit";
import { dataForMap, dateBiMap, paraBiMap, paraLevelComponents, phraseBiMap, phraseLevelComponents, sentenceBiMap, sentenceLevelComponents, singleParaLinking } from "./docUtils";


export function deleteInsight(clause: any, childLabel: string) {
    if(clause !== undefined){
        if(childLabel === 'General Definitions'){
            let tempDefinitionClause: phraseInfo[] = [];
            tempDefinitionClause.push({
                paraId: clause.dataPoints.paraId,
                startSentenceId: clause.dataPoints.startSentenceId,
                endSentenceId: clause.dataPoints.endSentenceId,
                rowId: clause.dataPoints.rowId,
                columnId: clause.dataPoints.columnId,
                startWordId: clause.dataPoints.startWordId,
                endWordId: clause.dataPoints.endWordId,
                phrase: clause.dataPoints.highlightedText,
                definedword: clause.dataPoints.definedWord
            });

            let deleteRequest: LinkPhraseRequest = {
                mode: 'manual',
                editedPhrases: {
                    upsert: [],
                    deleted: tempDefinitionClause,
                    bi: ''
                }
            }
            return deleteRequest;  

        } else if(childLabel === 'Consent Clause') {
            let tempConsentClause: sentenceInfo[] = [];
            let regulatory: string = 'No';
            let authorityText: string = '';
            if(clause.dataPoints.groupedBiData[0].childLabel === 'Consent Regulatory'){
                let regulatoryInfo = clause.dataPoints.groupedBiData[0].childValue;
                if( regulatoryInfo.name !== undefined ){
                    regulatory = regulatoryInfo[0].name;
                } else {

                }
                
            }
            if( clause.dataPoints.groupedBiData[1].childLabel === 'Consent Authority'){
                let authorityInfo = clause.dataPoints.groupedBiData[1].childValue;
                if(authorityInfo.name !== undefined){
                    authorityText = authorityInfo[0].name;
                }
            }
            tempConsentClause.push({
                paraId: clause.dataPoints.paraId,
                sentenceId: clause.dataPoints.startSentenceId,
                rowId: clause.dataPoints.rowId,
                columnId: clause.dataPoints.columnId,
                startWordId: -1,
                endWordId: -1,
                typestring: regulatoryMap[regulatory],
                phrase: authorityText
            });
            let deleteRequest: LinkSentenceRequest = {
                mode: 'manual',
                editedSentences: {
                    upsert: [],
                    deleted: tempConsentClause,
                    dataFor: dataForMap[childLabel]
                }
            }
            return deleteRequest;  

        } else if (childLabel === 'Subletting/Assignment Notice Info' || childLabel === 'Subletting/Assignment Consent Info') {
            let tempAssignmentInfoClause: sentenceInfo[] = [];
            tempAssignmentInfoClause.push({
                paraId: clause.dataPoints.paraId,
                sentenceId: clause.dataPoints.startSentenceId,
                rowId: clause.dataPoints.rowId,
                columnId: clause.dataPoints.columnId,
                requirement: clause.dataPoints.requirement 
            });
            let deleteRequest: LinkSentenceRequest = {
                mode: 'manual',
                editedSentences: {
                    upsert: [],
                    deleted: tempAssignmentInfoClause,
                    bi: assignmentInfoBiValue[childLabel]
                }
            }
            return deleteRequest;  

        } else if(phraseLevelComponents.indexOf(childLabel) > -1) {
            let tempPhraseClause: phraseInfo[] = [];
            tempPhraseClause.push({
                paraId: clause.dataPoints.paraId,
                startWordId: clause.dataPoints.startWordId,
                endWordId: clause.dataPoints.endWordId,
                startSentenceId: clause.dataPoints.startSentenceId,
                endSentenceId: clause.dataPoints.endSentenceId,
                rowId: clause.dataPoints.rowId,
                columnId: clause.dataPoints.columnId,
                phrase: clause.dataPoints.highlightedText
            });
            let deleteRequest: LinkPhraseRequest = {
                mode: 'manual',
                editedPhrases: {
                    upsert: [],
                    deleted: tempPhraseClause,
                    bi: phraseBiMap[childLabel]
                }
            }
            return deleteRequest;

        } else if( sentenceLevelComponents.indexOf(childLabel) > -1) {
            let tempSentenceClause: sentenceInfo[] = [];
            tempSentenceClause.push({
                paraId: clause.dataPoints.paraId,
                sentenceId: clause.dataPoints.startSentenceId,
                rowId: clause.dataPoints.rowId,
                columnId: clause.dataPoints.columnId,
            });
            let deleteRequest: LinkSentenceRequest = {
                data: 'Yes',
                mode: 'manual',
                editedSentences: {
                    upsert: [],
                    deleted: tempSentenceClause,
                    bi: sentenceBiMap[childLabel]
                }
            }
            return deleteRequest;

        } else if( paraLevelComponents.indexOf(childLabel) > -1 && singleParaLinking.indexOf(childLabel) < 0 ) {
            let tempParaClause: paraInfo[] = [];
            tempParaClause.push({
                paraId: clause.dataPoints.paraId,
                rowId: clause.dataPoints.rowId,
                columnId: clause.dataPoints.columnId
            });
            let deleteRequest: LinkParaRequest = {
                data: 'Yes',
                mode: 'manual',
                editedParas: {
                    upsert: [],
                    deleted: tempParaClause,
                    bi: paraBiMap[childLabel]
                }
            }
            return deleteRequest;
        } else if(childLabel === 'Start Dates' || childLabel === 'End Dates' ){
            let tempDateClause: dateInfo[] = [];
            tempDateClause.push({
                dateId: -1,
                phrase: clause.dataPoints.headerData.date,
                paraId: clause.dataPoints.paraId,
                rowId: clause.dataPoints.rowId,
                columnId: clause.dataPoints.columnId
            });
            let deleteRequest: LinkDateRequest = {
                data: 'Yes',
                mode: 'manual',
                editedDates: {
                    upsert: [],
                    deleted: tempDateClause,
                    bi: dateBiMap[childLabel] 
                }
            }
            return deleteRequest;
        } else if (childLabel === 'Duration'){
            let tempDateClause: dateInfo[] = [];
            tempDateClause.push({
                dateId: -1,
                phrase: clause.name,
                paraId: clause.dataPoints.paraId,
                rowId: clause.dataPoints.rowId,
                columnId: clause.dataPoints.columnId,
                duration_value: clause.dataPoints.headerData.durationValue,
                duration_typeid: clause.dataPoints.headerData.durationTypeId,
            });
            let deleteRequest: LinkDateRequest = {
                data: 'Yes',
                mode: 'manual',
                editedDates: {
                    upsert: [],
                    deleted: tempDateClause,
                    bi: dateBiMap[childLabel] 
                }
            }
            return deleteRequest;
        }
    }
    return null;
}