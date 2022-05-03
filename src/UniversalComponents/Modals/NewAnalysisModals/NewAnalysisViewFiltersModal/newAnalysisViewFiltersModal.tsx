import React, { Component } from 'react'
import { DarkTooltip } from '../../../../DocumentView/Component/documentInsights';
import { truncateString } from '../../../../Utils/DataModifierUtil/dataModUtil';
import Scrollable from '../../../Scrollable/scrollable';

interface Props {
    title: string;
    list: string[];
    pageType: string;
}
interface State {
}

export default class NewAnalysisViewFiltersModal extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        let {title, list, pageType} = this.props;
        return (
            <>
                <div className="row modal" id="newAnalysisViewFiltersModal" aria-labelledby="newAnalysisViewFiltersModal" aria-hidden="true" data-backdrop="false"
                    style={{ backdropFilter: 'none', background: 'transparent' }}>
                    <div className="col-md-12 modal-dialog" style={pageType === 'newAnalysis' ? {width: '25%', top:'26%', right: '20%'}: {width: '25%', top:'62%', right: '20%'}}>
                        <div className="row">
                            <div className="col-md-12 modal-content" style={{ borderRadius: '10px' }}>
                                <div className="row">
                                    <div className="modal-body modal-title mb-0">
                                        <div className="col-md-12 my-2">
                                            <div className="row" style={{ borderBottom: '1px solid #808080', padding: '5px 0px 8px 0px' }}>
                                                <div className="col-md-10">
                                                    <span className="modal-docname">{title}&nbsp;{list.length}</span>
                                                </div>
                                                <div className="col-md-2" style={{marginTop: '-4px'}}>
                                                    <span id="analysis-btn-outside-click" data-dismiss="modal"  style={{ outline: 'none', cursor: 'pointer', float: 'right' }}>
                                                        <img src="/static_images/gray-close-modal-icn.svg" />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 mb-2">
                                                    <Scrollable maxHeight={200}>
                                                        <>
                                                            {list.length > 0 && list.map((listItem: string, key: number) =>
                                                                <div className="row" key={key}>
                                                                    <DarkTooltip title={listItem} placement="right-end">
                                                                        <div className="col-md-12 px-3 new-analysis-filter-text">
                                                                            {truncateString(listItem, 50)}
                                                                        </div>
                                                                    </DarkTooltip>
                                                                </div>
                                                            )}
                                                        </>
                                                    </Scrollable>
                                                </div>
                                            </div>
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
            
