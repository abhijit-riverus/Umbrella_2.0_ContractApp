import React, { Component } from 'react'
import { DarkTooltip } from '../../../../DocumentView/Component/documentInsights';
import { truncateString } from '../../../../Utils/DataModifierUtil/dataModUtil';

interface Props {
    title: string;
    list: string[];
    removeSearch: (searchTerm: string) => void;
    pageType: string;
}
interface State {
}

export default class NewAnalysisViewSearchesModal extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        let {title, list, pageType } = this.props;
        return (
            <>
                <div className="row modal" id="newAnalysisViewSearchesModal" aria-labelledby="newAnalysisViewSearchesModal" aria-hidden="true" data-backdrop="false"
                    style={{ backdropFilter: 'none', background: 'transparent' }}>
                    <div className="col-md-12 modal-dialog" style={ pageType === 'newAnalysis' ? {width: '15%', top:'24%', left: '30%'}: {width: '15%', top:'61%', left: '15%'} }>
                        <div className="row">
                            <div className="col-md-12 modal-content" style={{ borderRadius: '10px' }}>
                                <div className="row">
                                    <div className="modal-body modal-title mb-0">
                                        <div className="col-md-12 my-2">
                                            <div className="row" style={{ borderBottom: '1px solid #808080' }}>
                                                <div className="col-md-10">
                                                    <span className="modal-docname">{title}</span>
                                                </div>
                                                <div className="col-md-2" style={{marginTop: '-4px'}}>
                                                    <span id="analysis-btn-outside-click" data-dismiss="modal"  style={{ outline: 'none', cursor: 'pointer', float: 'right' }}>
                                                        <img src="/static_images/gray-close-modal-icn.svg" />
                                                    </span>
                                                </div>
                                                <div className="col-md-10" style={{ marginTop: '-8px', textAlign: 'left' }}>
                                                    <span className="label" style={{ textDecoration: 'underline' }}>
                                                        {(list.length + 5) + ' total searches'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 mb-3">
                                                    {list.length > 0 && list.map((listItem: string, key: number) =>
                                                        <div className="row" key={key}>
                                                            <div className="col-md-12 px-3 mt-2 ml-0">
                                                                <span className="new-analysis-search-tile" style={{margin:"10px"}} >
                                                                    <DarkTooltip title={listItem} placement="left-end">
                                                                        <span className="cursor-pointer">
                                                                        {truncateString(listItem, 10)}
                                                                        &nbsp;<img className="cursor-pointer" data-dismiss="modal" src="/static_images/cross-cancel-icn.svg" alt="cancel" onClick={()=> this.props.removeSearch(listItem)} />
                                                                        </span>
                                                                    </DarkTooltip>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}
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
            
