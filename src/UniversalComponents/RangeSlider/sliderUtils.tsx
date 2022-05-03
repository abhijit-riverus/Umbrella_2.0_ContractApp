import { NewAnalysisFilterAggregate } from "../../NewAnalysis/State/newAnalysisState";

export function getDateIndex(dateString: string, dateAggregate: NewAnalysisFilterAggregate[]){
    let dateIndex: number = 0;
    for(let i = 0; i < dateAggregate.length; i++){
        if(dateString === dateAggregate[i].value){
            dateIndex = i;
            break;
        }
    }
    return dateIndex
}

//get min amount from amount strings
//get max amount from amount strings

