import React from 'react'
import { ContractData } from '../State/DraftState';
import ListViewHeader from './listViewHeader';
import ListViewTable from './ListViewTable';

interface Props {
    draftContractData: ContractData[];
}
const DraftListView = (props: Props) => {

    const setSortAndOrder = () => { };
    const getAllTemplatesData = () => {
        let template: any = {
            name: 'Template 1',
            templateType: 'NDA',
            owner: ['Abhijit'],
            createdOn: '26 Jan 2021',
            lastUsed: '2 days ago'
        };
        return [template]
    };
    const getAllTasksData = () => { return [] };
    return (
        <div className="col-md-12 p-0" style={{}}>
            <div className="row" style={{ marginLeft: '0rem', marginRight: '0rem', backgroundColor: 'white' }}>
                <ListViewHeader setSortAndOrder={setSortAndOrder} getAllTasksData={getAllTasksData} />
                <ListViewTable draftContractData={props.draftContractData} />
            </div>
        </div>
    )
}

export default DraftListView