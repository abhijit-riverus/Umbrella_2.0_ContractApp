import React, { Component } from 'react'
import { isNullOrUndefined } from 'is-what';
import { AdvancedFilter, FilterStructure } from '../../../Analysis/State/analysisState';
import { getUserNameInitials } from '../../../TaskManagement/Component/Utils/taskManagementUtils';
import { AssociateGroup } from '../../../TaskManagement/State/taskManagementPageState';
import { createAuxInterface, createFilterStructure, IntermediateFilterStructure } from '../../../Utils/GeneralUtil/genUtils';

interface Props {
    title: string;
    numberOfMembers: number;
    associateGroup: AssociateGroup[]
}
interface State {

}

export default class TaskManagementTablemodal extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {

        }
    }

    render() {
        let { title, numberOfMembers, associateGroup } = this.props;
        return (
            <>
                <div className="row modal" id="taskManagementTableModal" aria-labelledby="taskManagementTableModal" aria-hidden="true" data-backdrop="false"
                    style={{ backdropFilter: 'none', background: 'transparent' }}>
                    <div className="col-md-12 modal-dialog" style={{ width: '14%', top: '35%', left: '8%' }}>
                        <div className="row">
                            <div className="col-md-12 modal-content" style={{ borderRadius: '10px' }}>
                                <div className="row">
                                    <div className="modal-body modal-title mb-0">
                                        <div className="col-md-12 mt-3">
                                            <div className="row" style={{ borderBottom: '1px solid #808080' }}>
                                                <div className="col-md-10">
                                                    <span className="modal-docname">{title}</span>
                                                </div>
                                                <div className="col-md-2">
                                                    <span id="analysis-btn-outside-click" data-dismiss="modal" style={{ outline: 'none', cursor: 'pointer', float: 'right' }}><img src="/static_images/close-analysismodal-icn.svg" /></span>
                                                </div>
                                                <div className="col-md-10" style={{ marginTop: '-10px', marginBottom: '5px', textAlign: 'left' }}>
                                                    <span className="label" style={{ textDecoration: 'none' }}>{numberOfMembers} members</span>
                                                </div>
                                            </div>
                                            {
                                                associateGroup.length > 0 && associateGroup.map((user: AssociateGroup, key: number) =>
                                                    <div className="row associate-group">
                                                        <div className="col-md-3">
                                                            <div className="avatar-circle-sm" style={{ backgroundColor: user.hexCode }} >
                                                                <span className="initials">{getUserNameInitials(user.name)}</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-9 member-name">
                                                            {user.name}
                                                        </div>
                                                    </div>
                                                )
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}