import { Tooltip } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import DocViewerDialog from '../../Templates/Component/DocViewerDialog';
import "../Design/draft.scss";
import { ContractData } from '../State/DraftState';
interface Props {
    draftContractData: ContractData[]
}
const ListViewTable = (props: Props) => {

    const [open, setOpen] = useState(false);
    const [draftLink, setDraftLink] = useState("");
    const [draftContracts, setDraftContracts] = useState<ContractData[]>([]);
    const [fileName, setFileName] = useState("");

    useEffect(() => {
        setDraftContracts(props.draftContractData);
    }, [props.draftContractData]);

    const getExtraCount = (numberOfAssociates: number) => {
        let extraCount = numberOfAssociates - 3;
        return '+' + extraCount;
    }

    const extractName = (name: string) => {
        const stringArr = name.split(" ");
        return stringArr[0][0].toUpperCase() + stringArr[1][0].toUpperCase()
    }

    const openDocViewer = (draft: ContractData) => {
        setOpen(true);
        setDraftLink(draft.link);
        setFileName(draft.contractName);
    };

    const handleClose = () => {
        setOpen(false)
    }
    return (
        <>
            {draftContracts.map((draftContract: ContractData, key: number) =>
                <div onClick={() => openDocViewer(draftContract)} key={key} className="col-md-12" style={{ borderBottom: '1px solid #E1E1E1', height: '45px', backgroundColor: 'white' }}>
                    <div className="row template-list-view-table">
                        <div className="col-md-1">
                            <Tooltip title={draftContract.projectName} arrow>
                                <div className='text-overflow'>
                                    {
                                        (draftContract.projectName.length == 0) && <img src="/static_images/empty-dash.svg"></img>
                                    }
                                    {draftContract.projectName.length > 0 && draftContract.projectName[0]}
                                </div>
                            </Tooltip>
                        </div>
                        <div className="col-md-2">
                            <Tooltip title={draftContract.contractName} arrow>
                                <div className='text-overflow'>
                                    {
                                        (draftContract.contractName === null || draftContract.contractName === '') && <img src="/static_images/empty-dash.svg"></img>
                                    }

                                    {draftContract.contractName !== null &&
                                        draftContract.contractName
                                    }
                                </div>
                            </Tooltip>
                        </div>
                        <div className="col-md-2">
                            <div className='text-overflow'>
                                {(draftContract.contractType === null || draftContract.contractType === '') ? <img src="/static_images/empty-dash.svg"></img> : draftContract.contractType}
                            </div>
                        </div>
                        <div className="col-md-2">
                            <Tooltip title={draftContract.counterPartyName.join(', ')} arrow>
                                <div className='text-overflow'>
                                    <span>{(draftContract.counterPartyName.length == 0) ? <img src="/static_images/empty-dash.svg"></img> : draftContract.counterPartyName[0]}</span>
                                    <span>{draftContract.counterPartyName.length > 1 && ' +'}{draftContract.counterPartyName.length > 1 && draftContract.counterPartyName.length - 1}</span>

                                </div>
                            </Tooltip>
                        </div>
                        <div className="col-md-1">
                            <div className='text-overflow'>
                                {draftContract.owner.length === 0 && <img src="/static_images/empty-dash.svg"></img>}
                                {draftContract.owner.length < 3 &&
                                    draftContract.owner.map((user: any, key: number) =>
                                        <div className="avatar-circle-sm" style={{ marginLeft: key > 0 ? '0.5rem' : '', backgroundColor: user.hexCode }} >
                                            <span className="initials">{extractName(user)}</span>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-md-1">
                            <div>
                                {(draftContract.created === null || draftContract.created === '') ? <img src="/static_images/empty-dash.svg"></img> : draftContract.created}
                            </div>
                        </div>
                        <div className="col-md-2" style={{ paddingLeft: "50px" }}>
                            <div>
                                {(draftContract.status === null || draftContract.status === '') ? <img src="/static_images/empty-dash.svg"></img> : draftContract.status}
                            </div>
                        </div>
                        <div className="col-md-1">
                            <div>
                                {(draftContract.created === null || draftContract.created === '') ? <img src="/static_images/empty-dash.svg"></img> : draftContract.deadline}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {open && <DocViewerDialog type='draft' fileName={fileName} open={open} onClose={handleClose} templateLink={'../../Assets/NDA_Template.docx'} />}
        </>
    )
}

export default ListViewTable

