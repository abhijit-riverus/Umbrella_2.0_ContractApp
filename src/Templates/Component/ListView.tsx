import React, { useState } from 'react';
import BarLoader from '../../UniversalComponents/Loader/barLoader';
import Scrollable from '../../UniversalComponents/Scrollable/scrollable';
import { TemplateData } from '../State/templateState';
import ListViewHeader from './listViewHeader';
import ListViewTable from './ListViewTable';

interface Props {
    templateData: TemplateData[]
}
const ListView = (props: Props) => {

    const [loader, setLoader] = useState(false);
    const setSortAndOrder = () => { };
    const getAllTemplatesData = () => {
        let template: TemplateData = {
            name: 'Template 1',
            templateType: 'NDA',
            owner: ['Abhijit'],
            createdOn: '26 Jan 2021',
            lastUsed: '',
            templateLink: "../../Assets/NDA_Template.docx"
        };
        return [template]
    };
    const getAllTasksData = () => { return [] };

    return (
        <>
            <div className="col-md-12 p-0" style={{}}>
                <div className="row" style={{ borderBottom: '1px solid #E1E1E1', marginLeft: '0rem', marginRight: '0rem', backgroundColor: 'white' }}>
                    <ListViewHeader setSortAndOrder={setSortAndOrder} getAllTasksData={getAllTasksData} />
                </div>
                <Scrollable maxHeight={420}>
                    <div className="row mr-2" style={{ marginBottom: '200px' }}>
                        {loader === true ? <BarLoader />
                            :
                            <ListViewTable templatesData={props.templateData}
                            />
                        }
                    </div>
                </Scrollable>
            </div>
        </>
    )
}

export default ListView;