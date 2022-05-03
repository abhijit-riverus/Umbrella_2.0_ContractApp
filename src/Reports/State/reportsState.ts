import { AnalysisFilterStructure } from "../../Analysis/State/analysisState";
import { NewAnalysisFilterStructure } from "../../NewAnalysis/State/newAnalysisState";

export default interface ReportsState {
    reportsTableData: ReportsTableData[];
    deleteSuccess: boolean;
    reportsTableLoader: boolean;
    deleteReportStatus: number;
    uniqueReportId: number;
    reportName: string;
    savedConfigurationData: SavedConfigurationData[];
    reportSortBy: string;
    reportSortOrder: string;
    deleteSavedConfigStatus: number;
    deleteSavedConfigId: number;
    deleteSavedConfigName: string;
}

export interface ReportsTableData {
    id: string;
    name: string;
    location: string;
    email: string;
    createdon: string;
    count: string;
    preferences: string[];
    filter: AnalysisFilterStructure[];
}

export interface SavedConfigurationData {
    id: string;
    title: string;
    description: string;
    type: string;
    last_result_count: string;
    last_result_count_timestamp: string;
    createdon: string;
    createdby: string;
    filter: NewAnalysisFilterStructure[];
}

export function defaultReportsState(): ReportsState {
    return{
        reportsTableData: [],
        deleteSuccess: false,
        reportsTableLoader: false,
        deleteReportStatus: -1,
        uniqueReportId: -1,
        reportName: '',
        savedConfigurationData: [],
        reportSortBy: 'date',
        reportSortOrder: 'descending',
        deleteSavedConfigStatus: -1,
        deleteSavedConfigId: -1,
        deleteSavedConfigName: ''
    }
}