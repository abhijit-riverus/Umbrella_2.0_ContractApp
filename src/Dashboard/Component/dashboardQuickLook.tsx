import React, { PureComponent } from 'react'
import DashboardQuickLookCard from './dashboardQuickLookCard';
import { JurisdictionData, UploadedByData, ContractTypeData, DashboardFilterStructure } from '../State/dashboardState';

interface Props {
    filter: string[];
    jurisdictionData: JurisdictionData[];
    uploadedByData: UploadedByData[];
    contractTypeData: ContractTypeData[];
    jurisdictionLoader: boolean;
    uploadedByLoader: boolean;
    contractTypeLoader: boolean;
    applyDashboardFilter: (fileIds: number[], filterStructure: DashboardFilterStructure[]) => void;
    initialFileIds: number[];
    saveDashboardFilters: (savedFilters: string[]) => void;
    savedFilters: string[];
}

export default class DashboardQuickLook extends PureComponent<Props> {
    render() {
        let { filter, jurisdictionData, uploadedByData, contractTypeData, jurisdictionLoader, uploadedByLoader, contractTypeLoader, applyDashboardFilter, saveDashboardFilters, initialFileIds, savedFilters } = this.props;
        return (
            <div className="row">
                <div className="col-md-12 mt-5">
                    <div className="row">
                        {filter.map((data, i) =>
                            <div className="col-md-4 pr-5" key={i}>
                                <DashboardQuickLookCard title={data} jurisdictionData={jurisdictionData} uploadedByData={uploadedByData} contractTypeData={contractTypeData} initialFileIds={initialFileIds} savedFilters={savedFilters}
                                    jurisdictionLoader={jurisdictionLoader} contractTypeLoader={contractTypeLoader} uploadedByLoader={uploadedByLoader} applyDashboardFilter={applyDashboardFilter} saveDashboardFilters={saveDashboardFilters} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
