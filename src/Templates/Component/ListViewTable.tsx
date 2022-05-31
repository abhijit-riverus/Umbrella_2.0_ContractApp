import React, { useEffect, useState } from 'react'
import { DarkTooltip } from '../../DocumentView/Component/documentInsights';
import { getDueDateFormat } from '../../Utils/DataModifierUtil/dataModUtil';
import { TemplateData } from '../State/templateState';
import "../Design/template.scss";
interface Props {
    templatesData: TemplateData[]
}
const ListViewTable = (props: Props) => {

    const [templates, setTempates] = useState<TemplateData[]>([]);
    useEffect(() => {
        setTempates(props.templatesData);
    }, [props.templatesData]);

    const getExtraCount = (numberOfAssociates: number) => {
        let extraCount = numberOfAssociates - 3;
        return '+' + extraCount;
    }
    return (
        <>
            {templates.map((template: TemplateData, key: number) =>
                <div key={key} className="col-md-12" style={{ borderBottom: '1px solid #E1E1E1', marginLeft: '0.8rem', height: '45px', backgroundColor: 'white' }}>
                    <div className="row template-list-view-table">
                        <div className="col-md-3">
                            <div style={{ paddingLeft: '1rem' }}>
                                {
                                    (template.name === null || template.name === '') && <img src="/static_images/empty-dash.svg"></img>
                                }
                                {template.name !== null && template.name}
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className='pl-2'>
                                {
                                    (template.templateType === null || template.templateType === '') && <img src="/static_images/empty-dash.svg"></img>
                                }

                                {template.templateType !== null &&
                                    template.templateType
                                }
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className='pl-2'>
                                {template.owner.length === 0 && <img src="/static_images/empty-dash.svg"></img>}
                                {template.owner.length < 3 &&
                                    template.owner.map((user: any, key: number) =>
                                        <div className="avatar-circle-sm" style={{ marginLeft: key > 0 ? '0.5rem' : '', backgroundColor: user.hexCode }} >
                                            <span className="initials">{user.split('')[0]}</span>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className='pl-2'>
                                {(template.createdOn === null || template.createdOn === '') ? <img src="/static_images/empty-dash.svg"></img> : template.createdOn}
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className='pl-2'>
                                {(template.lastUsed === null || template.lastUsed === '') ? <img src="/static_images/empty-dash.svg"></img> : template.lastUsed}
                            </div>
                        </div>
                    </div>
                </div>
            )}</>
    )
}

export default ListViewTable

