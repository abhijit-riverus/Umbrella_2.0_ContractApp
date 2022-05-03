import * as React from 'react';
import { isNullOrUndefined } from 'is-what';
import { TermDate } from '../../../Analysis/State/analysisState';
import { PartyData, TagData } from '../../../DocumentView/State/documentState';
import { getBackgroundColor } from '../../../Utils/GeneralUtil/genUtils';
import Scrollable from '../../Scrollable/scrollable';

interface Props {
    analysisModalData: any[];
    dataPoint: string;
    documentName: string;
    dataType?: string;
}

export default class AnalysisTableModal extends React.Component<Props> {
    componentDidMount() {
        document.addEventListener('mouseup', this.handleOutsideClick, false);
    }

    handleOutsideClick = (e: MouseEvent) => {
        let outsideDiv = document.getElementById('analysisTableModal');
        if (!isNullOrUndefined(outsideDiv)) {
            if (e.target === outsideDiv) {
                document.getElementById("analysis-btn-outside-click")?.click();
            }
        }
    }

    render() {
        let { dataPoint, documentName, dataType } = this.props;
        return (
            <div className="col-md-12 col-12">
                <div className="row modal" id="analysisTableModal" aria-labelledby="analysisTableModal" aria-hidden="true" data-backdrop="false"
                    style={{ backdropFilter: 'none', background: 'transparent' }}>
                    <div className="col-md-12 modal-dialog" style={{ width: '30%', top: '48%', left: '17%' }}>
                        <div className="row">
                            <div className="col-md-12 modal-content" style={{ borderRadius: '10px' }}>
                                <div className="row">
                                    <div className="modal-body modal-title mb-0">
                                        <div className="col-md-12 mt-3">
                                            <div className="row">
                                                <div className="col-md-10">
                                                    <span className="modal-docname">{documentName}</span>
                                                </div>
                                                <div className="col-md-2">
                                                    <span id="analysis-btn-outside-click" data-dismiss="modal" style={{ outline: 'none', cursor: 'pointer', float: 'right' }}><img src="/static_images/close-analysismodal-icn.svg" /></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 modal-body modal-subtitle" id="analysis-modal-id">{dataPoint}</div>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        {this.switchRender(dataType)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    switchRender(dataPoint: string | undefined) {
        let { analysisModalData } = this.props;
        switch (dataPoint) {
            case 'termDate': {
                return (
                    <Scrollable maxHeight={200} mode={"dark"}>
                        <div className="row">
                            {analysisModalData.map((data: TermDate, i: number) =>
                                <div className="col-md-12 modal-body modal-subtitle pt-2" key={i} style={{ textAlign: 'left', borderBottom: '1px solid #4E4E4E' }}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <span>{i + 1}.&nbsp;</span>
                                            <span className="modal-docname" style={{ float: 'inherit' }}>{data.date}</span>&nbsp;&nbsp;
                                                {/* <span className="cursor-pointer"><img src="/static_images/new-tab-yellow.svg" alt="new-tab" /></span> */}
                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '4.5%' }}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                {data.heading !== null && data.heading.length > 0 && <div className="modal-docname mb-1" style={{ fontSize: '13px' }}>{data.heading}</div>}<br />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12" style={{ fontSize: '12px' }}>
                                                {data.para}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Scrollable>
                )
            }
            /*
            case 'tags': {
                return (
                    <Scrollable maxHeight={150} mode={"dark"}>
                        <div className="row">
                            {analysisModalData.map((data: TagData, i: number) =>
                                <div className="col-md-12 modal-body modal-subtitle pt-2" key={i} style={{ textAlign: 'left', borderBottom: '1px solid #4E4E4E', fontSize: '12px' }}>
                                    <span>{i + 1}.&nbsp;</span><span className="tag-label" style={{ background: getBackgroundColor(data.id) }}>{data.name}</span>
                                </div>
                            )}
                        </div>
                    </Scrollable>
                )
            }
            case 'parties': {
                return (
                    <Scrollable maxHeight={150} mode={"dark"}>
                        <div className="row">
                            {analysisModalData.map((data: PartyData, i: number) =>
                                <div className="col-md-12 modal-body modal-subtitle pt-2" key={i} style={{ textAlign: 'left', borderBottom: '1px solid #4E4E4E', fontSize: '12px' }}>
                                    <span>{i + 1}.&nbsp;</span>{data.partyName}<br />
                                    {data.partyType !== '' && <span style={{ marginLeft: '3%' }}>{'(' + data.partyType + ')'}</span>}
                                </div>
                            )}
                        </div>
                    </Scrollable>
                )
            }
            case 'present': {
                return (
                    <Scrollable maxHeight={200} mode={"dark"}>
                        <div className="row">
                            {analysisModalData.map((data: PresentData, i: number) =>
                                <div className="col-md-12 modal-body modal-subtitle pt-2" key={i} style={{ textAlign: 'left', borderBottom: '1px solid #4E4E4E' }}>
                                    <div style={{ marginLeft: '4.5%' }}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                {data.heading !== null && data.heading.length > 0 && <div className="modal-docname mb-1" style={{ fontSize: '12px' }}>{data.heading}</div>}<br />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12" style={{ fontSize: '13px' }}>
                                                <span>{i + 1}.&nbsp;</span>{data.sentence}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Scrollable>
                )
            } */
            default: {
                return (
                    <Scrollable maxHeight={200} mode={"dark"}>
                        <div className="row">
                            {analysisModalData.map((data: string, i: number) =>
                                <div className="col-md-12 modal-body modal-subtitle pt-2" key={i} style={{ textAlign: 'left', borderBottom: '1px solid #4E4E4E', fontSize: '12px' }}>
                                    <span>{i + 1}.&nbsp;</span>{data}
                                </div>
                            )}
                        </div>
                    </Scrollable>
                )
            }
        }
    }

}