import React, { useEffect, useState } from 'react'
import { DarkTooltip } from '../../DocumentView/Component/documentInsights';
import { getDueDateFormat } from '../../Utils/DataModifierUtil/dataModUtil';
import { TemplateData } from '../State/templateState';
import "../Design/template.scss";
import DocViewerDialog from './DocViewerDialog';
import { Tooltip } from '@material-ui/core';
interface Props {
    templatesData: TemplateData[]
}
const ListViewTable = (props: Props) => {

    const [templates, setTempates] = useState<TemplateData[]>([]);
    const [open, setOpen] = useState(false);
    const [templateLink, setTemplateLink] = useState("");
    const [fileName, setFileName] = useState("");
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

    const openDocViewer = (template: TemplateData) => {
        setOpen(true);
        setTemplateLink(template.templateLink);
        setFileName(template.name);
    };

    const handleClose = () => {
        setOpen(false)
    }
    return (
        <>
            {templates.map((template: TemplateData, key: number) =>
                <div onClick={() => openDocViewer(template)} key={key} className="col-md-12 template-list-view mb-2" style={{ marginLeft: '0.8rem', height: '45px', backgroundColor: key % 2 != 0 ? 'white' : 'rgba(0,0,0,.04)' }}>
                    <div className="row template-list-view-table">
                        <div className="col-md-3">
                            <Tooltip title={template.name} arrow>
                                <div className='text-overflow text-purple'>
                                    {
                                        (template.name === null || template.name === '') && <img src="/static_images/empty-dash.svg"></img>
                                    }
                                    {template.name !== null && template.name}
                                </div>
                            </Tooltip>
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
                                        <div className="template-avatar-circle-sm" style={{ marginLeft: '8px' }} >
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
            {open && <DocViewerDialog type='template' open={open} onClose={handleClose} fileName={fileName} templateLink={'../../Assets/NDA_Template.docx'} />}
        </>
    )
}

export default ListViewTable

