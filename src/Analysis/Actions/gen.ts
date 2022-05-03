import { GETANALYSIS, GETANALYSIS_SUCCESS, GETANALYSIS_FAILURE, GetAnalysis, GetAnalysisSuccess, GetAnalysisFailure, GetAnalysisFileId, GETANALYSISFILEID, GetAnalysisFileIdSuccess, GetAnalysisFileIdFailure, GETANALYSISFILEID_SUCCESS, GETANALYSISFILEID_FAILURE, GetGeneralFilter, GETGENERALFILTER, GetGeneralFilterSuccess, GETGENERALFILTER_SUCCESS, GetGeneralFilterFailure, GETGENERALFILTER_FAILURE, ApplyGeneralFilter, APPLYGENERALFILTER, ApplyGeneralFilterSuccess, APPLYGENERALFILTER_SUCCESS, ApplyGeneralFilterFailure, APPLYGENERALFILTER_FAILURE, APPLYADVANCEDFILTER_FAILURE, GetAdvancedFilter, GETADVANCEDFILTER, GetAdvancedFilterSuccess, GETADVANCEDFILTER_SUCCESS, GetAdvancedFilterFailure, GETADVANCEDFILTER_FAILURE, ApplyAdvancedFilter, APPLYADVANCEDFILTER, ApplyAdvancedFilterSuccess, APPLYADVANCEDFILTER_SUCCESS, ApplyAdvancedFilterFailure, SAVEAPPLIEDFILTER, SaveAppliedFilters, ResetFlag, RESETFLAG, GetTableConfig, GetTableConfigSuccess, GETTABLECONFIG, GETTABLECONFIG_SUCCESS, UpdatePreference, UPDATEPREFERENCE, UpdatePreferenceSuccess, UPDATEPREFERENCE_SUCCESS, GenerateReport, GenerateReportSuccess, GenerateReportFailure, GENERATEREPORT_SUCCESS, GENERATEREPORT_FAILURE, GENERATEREPORT, SaveAdvancedFilterStructure, SAVEADVANCEDFILTERSTRUCTURE, SaveAppliedFiltersList, SAVEAPPLIEDFILTERSLIST, GETANALYSISFILTERCONFIG, GetAnalysisFilterConfig, GETANALYSISFILTERCONFIG_SUCCESS, GETANALYSISFILTERCONFIG_FAILURE, GetAnalysisFilterConfigSuccess, GetAnalysisFilterConfigFailure, GetFilterAggregate, GetFilterAggregateSuccess, GetFilterAggregateFailure, GETFILTERAGGREGATE_FAILURE, GETFILTERAGGREGATE_SUCCESS, GETFILTERAGGREGATE, GetFilteredCount, GETFILTEREDCOUNT, GetFilteredCountSuccess, GETFILTEREDCOUNT_SUCCESS, GETFILTEREDCOUNT_FAILURE, GetFilteredCountFailure, ApplyAnalysisFilter, APPLYANALYSISFILTER, ApplyAnalysisFilterSuccess, APPLYANALYSISFILTER_SUCCESS, APPLYANALYSISFILTER_FAILURE, ApplyAnalysisFilterFailure, SaveFilterClauseType, SAVEFILTERCLAUSETYPE, SaveOperatorList, SAVEOPERATORLIST, SaveClauseAggregate, SAVECLAUSEAGGREGATE, SaveValueAggregate, SAVEVALUEAGGREGATE, SaveAnalysisFiltersList, SAVEANALYSISFILTERSLIST, SaveCurrentEditingFilterId, SAVECURRENTEDITINGFILTERID, SaveFilteredCount, SAVEFILTEREDCOUNT } from "./def";
import { AnalysisPoints, AdvancedFilter, FilterStructure, ConfigItem, LocalFilterStructure, FilterConfigStructure, FilterAggregateStructure, AnalysisFilterStructure, OperatorInfo } from "../State/analysisState";
import { IntermediateFilterStructure } from "../../Utils/GeneralUtil/genUtils";

export default class AnalysisActionGenerator {
    public static getAnalysis(fileIds: number[]): GetAnalysis {
        return {
            type: GETANALYSIS,
            payload: {
                fileIds: fileIds
            }
        };
    }
    public static getAnalysisSuccess(analysisObject: AnalysisPoints[]): GetAnalysisSuccess {
        return {
            type: GETANALYSIS_SUCCESS,
            payload: {
                analysisObject: analysisObject
            }
        };
    }
    public static getAnalysisFailure(): GetAnalysisFailure {
        return {
            type: GETANALYSIS_FAILURE
        };
    }
    public static getAnalysisFileId(): GetAnalysisFileId {
        return {
            type: GETANALYSISFILEID
        };
    }
    public static getAnalysisFileIdSuccess(analysisFileIds: number[]): GetAnalysisFileIdSuccess {
        return {
            type: GETANALYSISFILEID_SUCCESS,
            payload: {
                analysisFileIds: analysisFileIds
            }
        };
    }
    public static getAnalysisFileIdFailure(): GetAnalysisFileIdFailure {
        return {
            type: GETANALYSISFILEID_FAILURE
        };
    }
    public static getGeneralFilter(fileIds: number[]): GetGeneralFilter {
        return {
            type: GETGENERALFILTER,
            payload: {
                fileIds: fileIds
            }
        }
    }
    public static getGeneralFilterSuccess(generalFilter: any): GetGeneralFilterSuccess {
        return {
            type: GETGENERALFILTER_SUCCESS,
            payload: {
                generalFilter: generalFilter
            }
        }
    }
    public static getGeneralFilterFailure(): GetGeneralFilterFailure {
        return {
            type: GETGENERALFILTER_FAILURE
        }
    }
    public static applyGeneralFilter(fileIds: number[], filterType: string): ApplyGeneralFilter {
        return {
            type: APPLYGENERALFILTER,
            payload: {
                filterIds: fileIds,
                filterType: filterType
            }
        }
    }
    public static applyGeneralFilterSuccess(analysisFileIds: number[]): ApplyGeneralFilterSuccess {
        return {
            type: APPLYGENERALFILTER_SUCCESS,
            payload: {
                analysisFileIds: analysisFileIds
            }
        }
    }
    public static applyGeneralFilterFailure(): ApplyGeneralFilterFailure {
        return {
            type: APPLYGENERALFILTER_FAILURE
        }
    }
    public static getAdvancedFilter(fileIds: number[]): GetAdvancedFilter {
        return {
            type: GETADVANCEDFILTER,
            payload: {
                fileIds: fileIds
            }
        }
    }
    public static getAdvancedFilterSuccess(advancedFilter: AdvancedFilter[]): GetAdvancedFilterSuccess {
        return {
            type: GETADVANCEDFILTER_SUCCESS,
            payload: {
                advancedFilter: advancedFilter
            }
        }
    }
    public static getAdvancedFilterFailure(): GetAdvancedFilterFailure {
        return {
            type: GETADVANCEDFILTER_FAILURE
        }
    }
    public static applyAdvancedFilter(fileIds: number[], filterStructure: FilterStructure): ApplyAdvancedFilter {
        return {
            type: APPLYADVANCEDFILTER,
            payload: {
                filterIds: fileIds,
                filterStructure: filterStructure
            }
        }
    }
    public static applyAdvancedFilterSuccess(advFileIds: number[], count: number, advancedFilter: AdvancedFilter[]): ApplyAdvancedFilterSuccess {
        return {
            type: APPLYADVANCEDFILTER_SUCCESS,
            payload: {
                advFileIds: advFileIds,
                count: count,
                advancedFilter: advancedFilter
            }
        }
    }
    public static applyAdvancedFilterFailure(): ApplyAdvancedFilterFailure {
        return {
            type: APPLYADVANCEDFILTER_FAILURE
        }
    }
    public static saveAppliedFilters(savedAppliedFilter: IntermediateFilterStructure[]): SaveAppliedFilters {
        return {
            type: SAVEAPPLIEDFILTER,
            payload: {
                savedAppliedFilter: savedAppliedFilter
            }
        }
    }
    public static resetFlag(resetFlag: boolean): ResetFlag {
        return {
            type: RESETFLAG,
            payload: {
                resetFlag: resetFlag
            }
        }
    }
    public static getTableConfig(): GetTableConfig {
        return {
            type: GETTABLECONFIG
        };
    }
    public static getTableConfigSuccess(tableConfig: ConfigItem[]): GetTableConfigSuccess {
        return {
            type: GETTABLECONFIG_SUCCESS,
            payload: {
                tableConfig: tableConfig
            }
        };
    }
    public static updatePreference(display: boolean, columnName: string, refreshTable?: boolean): UpdatePreference {
        return {
            type: UPDATEPREFERENCE,
            payload: {
                display: display,
                columnName: columnName,
                refreshTable: refreshTable,
            }
        };
    }
    public static updatePreferenceSuccess(refreshTable: boolean): UpdatePreferenceSuccess {
        return {
            type: UPDATEPREFERENCE_SUCCESS,
            payload: {
                refreshTable: refreshTable,
            }
        };
    }

    public static generateReport(name: string, filter: AnalysisFilterStructure[], fileIds: number[], preference: string[]): GenerateReport {
        return{
            type: GENERATEREPORT,
            payload:{
                name: name,
                filter: filter,
                fileIds: fileIds,
                preference: preference
            }
        };
    }

    public static generateReportSuccess(csvLink: string): GenerateReportSuccess {
        return{
            type: GENERATEREPORT_SUCCESS,
            payload:{
                csvLink: csvLink
            }
        };
    }

    public static generateReportFailure(): GenerateReportFailure {
        return{
            type: GENERATEREPORT_FAILURE,
        };
    }

    public static saveAdvancedFilterStructure(advancedFilterStructure: FilterStructure): SaveAdvancedFilterStructure {
        return {
            type: SAVEADVANCEDFILTERSTRUCTURE,
            payload: {
                advancedFilterStructure: advancedFilterStructure
            }
        }
    }
    public static saveAppliedFiltersList(appliedFiltersList: LocalFilterStructure[]): SaveAppliedFiltersList {
        return {
            type: SAVEAPPLIEDFILTERSLIST,
            payload: {
                appliedFiltersList: appliedFiltersList
            }
        }
    }
    public static saveCurrentEditingFilterId(currentEditingFilterId: number): SaveCurrentEditingFilterId {
        return {
            type: SAVECURRENTEDITINGFILTERID,
            payload: {
                currentEditingFilterId: currentEditingFilterId
            }
        }
    }
    public static getAnalysisFilterConfig(): GetAnalysisFilterConfig {
        return {
            type: GETANALYSISFILTERCONFIG
        }
    }
    public static getAnalysisFilterConfigSuccess(savedFilterConfig: FilterConfigStructure[]): GetAnalysisFilterConfigSuccess {
        return {
            type: GETANALYSISFILTERCONFIG_SUCCESS,
            payload: {
                savedFilterConfig: savedFilterConfig
            }
        }
    }
    public static getAnalysisFilterConfigFailure(): GetAnalysisFilterConfigFailure {
        return {
            type: GETANALYSISFILTERCONFIG_FAILURE
        }
    }
    public static getFilterAggregate(value: string, level: number, segment: string, page: string): GetFilterAggregate {
        return {
            type: GETFILTERAGGREGATE,
            payload: {
                value: value,
                level: level,
                segment: segment,
                page: page
            }
        }
    }
    public static getFilterAggregateSuccess(savedFilterAggregate: FilterAggregateStructure[]): GetFilterAggregateSuccess {
        return {
            type: GETFILTERAGGREGATE_SUCCESS,
            payload: {
                savedFilterAggregate: savedFilterAggregate
            }
        }
    }
    public static getFilterAggregateFailure(): GetFilterAggregateFailure {
        return {
            type: GETFILTERAGGREGATE_FAILURE
        }
    }
    public static getFilteredCount(savedAnalysisFiltersList: AnalysisFilterStructure[]): GetFilteredCount {
        return {
            type: GETFILTEREDCOUNT,
            payload: {
                savedAnalysisFiltersList: savedAnalysisFiltersList
            }
        }
    }
    public static getFilteredCountSuccess(count: number): GetFilteredCountSuccess {
        return {
            type: GETFILTEREDCOUNT_SUCCESS,
            payload: {
                count: count
            }
        }
    }
    public static getFilteredCountFailure(): GetFilteredCountFailure {
        return {
            type: GETFILTEREDCOUNT_FAILURE
        }
    }
    public static applyAnalysisFilter(sort: string, filter: AnalysisFilterStructure[]): ApplyAnalysisFilter {
        return {
            type: APPLYANALYSISFILTER,
            payload: {
                sort: sort,
                filter: filter
            }
        }
    }
    public static applyAnalysisFilterSuccess(analysisFileIds: number[]): ApplyAnalysisFilterSuccess {
        return {
            type: APPLYANALYSISFILTER_SUCCESS,
            payload: {
                analysisFileIds: analysisFileIds
            }
        }
    }
    public static applyAnalysisFilterFailure(): ApplyAnalysisFilterFailure {
        return {
            type: APPLYANALYSISFILTER_FAILURE
        }
    }
    public static saveFilterClauseType(savedFilterClauseType: string): SaveFilterClauseType {
        return {
            type: SAVEFILTERCLAUSETYPE,
            payload: {
                savedFilterClauseType: savedFilterClauseType
            }
        }
    }
    public static saveClauseAggregate(savedClauseAggregate: FilterAggregateStructure[]): SaveClauseAggregate {
        return {
            type: SAVECLAUSEAGGREGATE,
            payload: {
                savedClauseAggregate: savedClauseAggregate
            }
        }
    }
    public static saveValueAggregate(savedValueAggregate: FilterAggregateStructure[]): SaveValueAggregate {
        return {
            type: SAVEVALUEAGGREGATE,
            payload: {
                savedValueAggregate: savedValueAggregate
            }
        }
    }
    public static saveOperatorList(savedOperatorList: OperatorInfo[]): SaveOperatorList {
        return {
            type: SAVEOPERATORLIST,
            payload: {
                savedOperatorList: savedOperatorList
            }
        }
    }
    public static saveAnalysisFiltersList(savedAnalysisFiltersList: AnalysisFilterStructure[]): SaveAnalysisFiltersList {
        return {
            type: SAVEANALYSISFILTERSLIST,
            payload: {
                savedAnalysisFiltersList: savedAnalysisFiltersList
            }
        }
    }
    public static saveFilteredCount(filteredCount: number): SaveFilteredCount {
        return {
            type: SAVEFILTEREDCOUNT,
            payload: {
                filteredCount: filteredCount
            }
        }
    }
}