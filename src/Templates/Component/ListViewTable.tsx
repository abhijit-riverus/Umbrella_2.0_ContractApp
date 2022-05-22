import React, { useEffect, useState } from 'react'
import { DarkTooltip } from '../../DocumentView/Component/documentInsights';
import { getDueDateFormat } from '../../Utils/DataModifierUtil/dataModUtil';
import { TemplateData } from '../State/templateState';
import "../Design/template.scss";
import DocViewerDialog from './DocViewerDialog';
interface Props {
    templatesData: TemplateData[]
}
const ListViewTable = (props: Props) => {

    const [templates, setTempates] = useState<TemplateData[]>([]);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setTempates(props.templatesData);
    }, [props.templatesData]);

    const getExtraCount = (numberOfAssociates: number) => {
        let extraCount = numberOfAssociates - 3;
        return '+' + extraCount;
    }

    const extractName = (name: string) => {
        const stringArr = name.split(" ");
        return stringArr[0][0].toUpperCase() + stringArr[1][0].toUpperCase()
    }

    const openDocViewer = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    }
    return (
        <>
            {templates.map((template: TemplateData, key: number) =>
                <div onClick={openDocViewer} key={key} className="col-md-12 template-list-view" style={{ borderBottom: '1px solid #E1E1E1', marginLeft: '0.8rem', height: '45px', backgroundColor: 'white' }}>
                    <div className="row template-list-view-table">
                        <div className="col-md-3">
                            <div>
                                {
                                    (template.name === null || template.name === '') && <img src="/static_images/empty-dash.svg"></img>
                                }
                                {template.name !== null && template.name}
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div>
                                {
                                    (template.templateType === null || template.templateType === '') && <img src="/static_images/empty-dash.svg"></img>
                                }

                                {template.templateType !== null &&
                                    template.templateType
                                }
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div>
                                {template.owner.length === 0 && <img src="/static_images/empty-dash.svg"></img>}
                                {template.owner.length < 3 &&
                                    template.owner.map((user: any, key: number) =>
                                        <div className="template-avatar-circle-sm" style={{ marginLeft: key > 0 ? '0.5rem' : '', backgroundColor: user.hexCode }} >
                                            <span className="initials">{extractName(user)}</span>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div>
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
            )}
            <DocViewerDialog open={open} onClose={handleClose} />
        </>
    )
}

export default ListViewTable

