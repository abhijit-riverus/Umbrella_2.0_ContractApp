import React, { useEffect, useState } from 'react'
import "../Design/draft.scss";
import { ContractData } from '../State/DraftState';
interface Props {
    draftContractData: ContractData[]
}
const ListViewTable = (props: Props) => {

    const [draftContracts, setDraftContracts] = useState<ContractData[]>([]);
    useEffect(() => {
        setDraftContracts(props.draftContractData);
    }, [props.draftContractData]);

    const getExtraCount = (numberOfAssociates: number) => {
        let extraCount = numberOfAssociates - 3;
        return '+' + extraCount;
    }
    return (
        <>
            {draftContracts.map((draftContract: ContractData, key: number) =>
                <div key={key} className="col-md-12" style={{ borderBottom: '1px solid #E1E1E1', marginLeft: '0.8rem', height: '45px', backgroundColor: 'white' }}>
                    <div className="row template-list-view-table">
                        <div className="col-md-1">
                            <div>
                                {
                                    (draftContract.projectName.length == 0) && <img src="/static_images/empty-dash.svg"></img>
                                }
                                {draftContract.projectName.length > 0 && draftContract.projectName[0]}
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div>
                                {
                                    (draftContract.contractName === null || draftContract.contractName === '') && <img src="/static_images/empty-dash.svg"></img>
                                }

                                {draftContract.contractName !== null &&
                                    draftContract.contractName
                                }
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div>
                                {(draftContract.contractType === null || draftContract.contractType === '') ? <img src="/static_images/empty-dash.svg"></img> : draftContract.contractType}
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div>
                                {(draftContract.counterPartyName.length == 0) ? <img src="/static_images/empty-dash.svg"></img> : draftContract.counterPartyName[0]}
                            </div>
                        </div>
                        <div className="col-md-1">
                            <div>
                                {draftContract.owner.length === 0 && <img src="/static_images/empty-dash.svg"></img>}
                                {draftContract.owner.length < 3 &&
                                    draftContract.owner.map((user: any, key: number) =>
                                        <div className="avatar-circle-sm" style={{ marginLeft: key > 0 ? '0.5rem' : '', backgroundColor: user.hexCode }} >
                                            <span className="initials">{user.split('')[0]}</span>
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
                        <div className="col-md-2">
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
            )}</>
    )
}

export default ListViewTable

