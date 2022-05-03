import React, { PureComponent } from 'react'
import { AnalysisPoints } from '../State/analysisState'
import { truncateFileName } from '../../Utils/DataModifierUtil/dataModUtil';
import { isNullOrUndefined } from 'is-what';
import { History } from 'history';
import { ColumnHeaderStructure, generateTableHeaders, TableHeaderStructure } from '../../Utils/GeneralUtil/genUtils';
import AnalysisComp from './AnalysisComponents/analysisComp';
import { DarkTooltip } from '../../DocumentView/Component/documentInsights';

interface Props {
    analysisObject: AnalysisPoints[];
    history: History;
    setModal: (data: any[], dataPoint: string, documentName: string, dataType?: string) => void;
}

interface State {
    scrollTable: string;
    rightWidth: number;
    leftWidth: string;
    tableHeaders: TableHeaderStructure[];
    columnHeaders: ColumnHeaderStructure[];
}

export default class AnalysisTable extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)
        let tableWidth;
        if (window.screen.width < 800) {
            tableWidth = 310
        } else if (window.screen.width < 1000) {
            tableWidth = 550
        } else if (window.screen.width < 1300) {
            tableWidth = 680
        } else if (window.screen.width < 1500) {
            tableWidth = 830
        } else {
            tableWidth = 990
        }
        this.state = {
            scrollTable: "right",
            rightWidth: tableWidth,
            leftWidth: "",
            tableHeaders: [],
            columnHeaders: []
        }
    }

    componentDidMount() {
        let header = generateTableHeaders(this.props.analysisObject[0]);
        this.setState({ tableHeaders: header.tableHeader, columnHeaders: header.columnHeader });
    }

    componentWillReceiveProps(nextProps: Props) {
        let { analysisObject } = nextProps;
        if (JSON.stringify(analysisObject) !== JSON.stringify(this.props.analysisObject)) {
            let header = generateTableHeaders(nextProps.analysisObject[0]);
            this.setState({ tableHeaders: header.tableHeader, columnHeaders: header.columnHeader });
        }
    }

    render() {
        let { analysisObject, setModal, history } = this.props;
        let { rightWidth, tableHeaders, columnHeaders } = this.state;
        return (
            <div className="analysis-table-div">
                <div style={{ width: "500px" }}>
                    <table id="analysis-table-left" onMouseOver={() => this.setState({ scrollTable: "left" })} onTouchStart={() => this.setState({ scrollTable: "left" })}>
                        <thead>
                            <tr>
                                <th colSpan={2} style={{ lineHeight: '26px' }}>
                                    <p className="mr-0 mb-0">&nbsp;</p>
                                </th>
                            </tr>
                            <tr>
                                <th className="analysis-subheading" style={{ minWidth: '220px' }}>Name</th>
                                <th className="analysis-subheading" style={{ minWidth: '170px' }}>Title</th>
                            </tr>
                        </thead>
                        <tbody onScroll={this.tableScrollL} id="Av">
                            {analysisObject.length > 0 && analysisObject.map((item, i) =>
                                <tr id="analysis-table-row" key={i}>
                                    <td style={{ minWidth: '220px', display: 'flex', alignItems: 'center' }}>
                                        {item.name.length > 15 ?
                                            <DarkTooltip title={item.name} placement="right-end">
                                                <span style={{ display: 'initial', cursor: 'pointer' }} className="name-style dotted-line"
                                                    onClick={() => window.open('/document/analysis/' + btoa(item.fileId.toString()), "_blank")}>
                                                    {truncateFileName(item.name)}
                                                </span>
                                            </DarkTooltip>
                                            :
                                            <span className="name-style" style={{ display: 'initial', cursor: 'pointer' }} onClick={() => window.open('/document/analysis/' + btoa(item.fileId.toString()), "_blank")}>
                                                {item.name}
                                            </span>
                                        }
                                        <span className="pl-2 cursor-pointer" onClick={() => window.open('/document/analysis/' + btoa(item.fileId.toString()), "_blank")}>
                                            <img src="/static_images/new-tab-purple.svg" alt="new-tab" />
                                        </span>
                                    </td>
                                    <td id="analysis-table-td-2" style={{ minWidth: '150px' }}>
                                        <span className="title-style" style={{ justifyContent: 'left' }}>
                                            {!isNullOrUndefined(item.title) && item.title.length > 0 ?
                                                (item.title.length > 20
                                                    ?
                                                    <DarkTooltip title={item.title} placement="right-end" >
                                                        <span className="dotted-line">
                                                            {item.title.slice(0, 18) + '...'}
                                                        </span>
                                                    </DarkTooltip>
                                                    :
                                                    <span>
                                                        {item.title}
                                                    </span>) :
                                                <>
                                                    <span className="mailto-riverus" style={{ fontSize: '12px' }}
                                                        onClick={() => history.push({ pathname: '/document/analysis/' + btoa(item.fileId.toString()), state: { clause: 'Basic Information', bi: 'Title' } })}>
                                                        Add&nbsp;
                                                    <img src="/static_images/new-tab-purple.svg" />
                                                    </span>
                                                </>}
                                        </span>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div style={{ width: "100%" }}>
                    <table id="analysis-table">
                        <thead id="Tv" onScroll={this.tableScrollT} onMouseOver={() => this.setState({ scrollTable: "top" })} onTouchStart={() => this.setState({ scrollTable: "top" })} style={{ width: rightWidth - 20 + 'px' }}>
                            <tr>
                                {tableHeaders.map((data, i) =>
                                    <th colSpan={data.colSpan} key={i}>
                                        <p className="analysis-tab">{data.header}</p>
                                    </th>
                                )}
                            </tr>
                            <tr>
                                {columnHeaders.map((data, i) =>
                                    <th className="analysis-subheading" key={i} style={{ minWidth: data.colSpan }}>
                                        {data.header}
                                    </th>
                                )}
                            </tr>
                        </thead>

                        <tbody id="Bv" onScroll={this.tableScrollR} onMouseOver={() => this.setState({ scrollTable: "right" })}
                            onTouchStart={() => this.setState({ scrollTable: "right" })} style={{ width: rightWidth + 'px' }}>
                            <AnalysisComp analysisData={analysisObject} setModal={setModal}
                                columnHeaders={columnHeaders} history={history} />
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    tableScrollL = () => {
        let { scrollTable } = this.state;
        let Right = document.getElementById('Bv');
        let Left = document.getElementById('Av');
        if (!isNullOrUndefined(Left) && !isNullOrUndefined(Right)) {
            if (scrollTable === "left") {
                Right.scrollTop = Left.scrollTop;
            }
        }
    }

    tableScrollR = () => {
        let { scrollTable } = this.state;
        let Right = document.getElementById('Bv');
        let Left = document.getElementById('Av');
        let Top = document.getElementById('Tv');
        if (!isNullOrUndefined(Left) && !isNullOrUndefined(Right) && !isNullOrUndefined(Top)) {
            if (scrollTable === "right") {
                Left.scrollTop = Right.scrollTop;
                Top.scrollLeft = Right.scrollLeft;
            }
        }
    }

    tableScrollT = () => {
        let { scrollTable } = this.state;
        let Right = document.getElementById('Bv');
        let Top = document.getElementById('Tv');
        if (!isNullOrUndefined(Right) && !isNullOrUndefined(Top)) {
            if (scrollTable === "top") {
                Right.scrollLeft = Top.scrollLeft;
            }
        }
    }
}