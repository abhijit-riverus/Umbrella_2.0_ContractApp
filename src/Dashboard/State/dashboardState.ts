export default interface DashboardState {
    initialFileIds: number[];
    jurisdictionData: JurisdictionData[];
    uploadedByData: UploadedByData[];
    contractTypeData: ContractTypeData[];
    dashboardTableData: DashboardTableData[];
    filteredFileIds: number[];
    savedFilters: string[];
    jurisdictionLoader: boolean;
    uploadedByLoader: boolean;
    contractTypeLoader: boolean;
    dashboardTableLoader: boolean;
    dashboardLoader: boolean;
}

export interface JurisdictionData {
    jurisdiction: string;
    count: number;
}

export interface UploadedByData {
    name: string;
    email: string;
    count: number;
}

export interface ContractTypeData {
    contractType: string;
    count: number;
}

export interface DashboardTableData {
    fileId: number;
    name: string;
    title: string;
    effectiveDate: string;
    jurisdiction: string[];
}

export interface DashboardFilterStructure {
    label: string;
    value: string;
}

export function defaultDashboardState(): DashboardState {
    return {
        initialFileIds: [],
        jurisdictionData: [],
        uploadedByData: [],
        contractTypeData: [],
        jurisdictionLoader: false,
        uploadedByLoader: false,
        contractTypeLoader: false,
        dashboardTableLoader: false,
        dashboardTableData: [],
        filteredFileIds: [],
        savedFilters: [],
        dashboardLoader: false
    }
}