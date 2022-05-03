import { timeStamp } from 'console';
import * as React from 'react';
import { isNullOrUndefined } from 'is-what';
import { DarkTooltip } from '../../../../DocumentView/Component/documentInsights';
import { truncateFileName, truncateString, truncateTaskName } from '../../../../Utils/DataModifierUtil/dataModUtil';
import Scrollable from '../../../Scrollable/scrollable';
import { CurrentTask, BIType, BISentence, ClauseType } from '../State/taskManagementState';

interface Props {
    currentTask: CurrentTask;
    biType: BIType[];
    biSentence: BISentence;
    fileID: number;
    getBIType: (clauseType: string) => void;
    getBISentence: (fileiID: number, biColumnName: string) => void;
    insertClauseType: (clauseType: string) => void;
    insertBIType: (biType: BIType) => void;
    insertLinkedText: (linkedText: string) => void;
    clauseTypeState: string;
    clauseType: ClauseType[];
    biTypeState: string;
    linkedTextState: string;
    selectedBITypeValue: string;
    editModeOn?: boolean;
    contractName?: string; //coming from editTask as currentTask is not being set during editTask
    contractID?: number; //coming from editTask as currentTask is not being set during editTask
    biTypeLoader: boolean;
    biTextLoader: boolean;
    origin?: string; // insights or infobar
    displayErrorMessage: boolean;
}

interface State {
    initialClauseType: string;
    initialBITypeIndex: string;
    initialLinkedTextIndex: string;
    hideClauseTypeOptions: boolean;
    hideBITypeOptions: boolean;
    hideTextLinkOptions: boolean;
    enableBIType: boolean;
    enableTextLink: boolean;
    freezeClauseType: boolean;

}

export default class Link extends React.Component<Props, State> {

    constructor(props: Props) {
        // console.log(`5`);
        super(props);

        this.state = {
            initialClauseType: '',
            initialBITypeIndex: '',
            initialLinkedTextIndex: '',
            hideClauseTypeOptions: true,
            hideBITypeOptions: true,
            hideTextLinkOptions: true,
            enableBIType: false,
            enableTextLink: false,
            freezeClauseType: false,
        }

        this.updateBISentences = this.updateBISentences.bind(this);
        this.updateLinkedText = this.updateLinkedText.bind(this);
    }

    componentDidMount() {
        // console.log(`1 Link mounted - ${this.props.currentTask.name}`);
    }

    componentWillUnmount() {
        // Is not being called
    }

    componentWillReceiveProps(nextProps: Props) {

        if (this.props.currentTask.name !== nextProps.currentTask.name) {
            this.setState({
                initialClauseType: nextProps.currentTask.name,
                enableTextLink: false
            })

            // Update the BI Types
            this.props.getBIType(nextProps.currentTask.name);

            this.props.insertClauseType(nextProps.currentTask.name);
        }
    }

    updateBISentences(biIndex: string) {

        // Set value of drop down
        this.setState({
            initialBITypeIndex: biIndex
        });


        const biValue = this.props.biType.filter(el => el.id == parseInt(biIndex))[0].columnName;
        const biType = this.props.biType.filter(el => el.id == parseInt(biIndex))[0];

        // Insert BI Type to state
        this.props.insertBIType(biType);

        // Get BI Sentence for new value
        this.props.getBISentence(this.props.fileID, biValue);
    }

    updateLinkedText(linkedTextID: string) {

        // Set value of drop down
        this.setState({
            initialLinkedTextIndex: linkedTextID
        })

        this.props.insertLinkedText(this.props.biSentence.sentences[parseInt(linkedTextID)]);
    }

    render() {

        let { currentTask, insertClauseType, insertLinkedText, biType, biSentence, fileID,
            clauseTypeState, clauseType, getBIType, getBISentence, insertBIType, biTypeState,
            linkedTextState, selectedBITypeValue, editModeOn, contractName, contractID, biTypeLoader, biTextLoader, origin, displayErrorMessage } = this.props;

        let { hideClauseTypeOptions, hideBITypeOptions, hideTextLinkOptions, enableBIType, enableTextLink, freezeClauseType, initialClauseType } = this.state

        let biv: any[] = [];
        biType.map(el => {
            biv.push(<option value={el.id}>{el.biType}</option>)
        });

        let bit: any[] = [];

        biSentence.sentences.map((el, index) => {
            bit.push(<option value={index}>{el}</option>);
        });

        // console.log(`4`);


        return (
            <>

                <div className="row" id="link-container">
                    <div className="col-md-12 mt-2 contract-name">
                        {/* <a>{currentTask.contractName}</a> */}
                        {editModeOn === true ?
                            !isNullOrUndefined(contractName) && contractName.length > 15 && !isNullOrUndefined(contractID) ?
                                <DarkTooltip title={contractName} placement="right-end">
                                    <span style={{ display: 'initial', cursor: 'pointer' }}
                                    // onClick={() => window.open('/document/analysis/' + btoa(contractID.toString()), "_blank")}
                                    >
                                        {truncateFileName(contractName)}
                                    </span>
                                </DarkTooltip>
                                :
                                <span style={{ display: 'initial', cursor: 'pointer' }}
                                // onClick={() => window.open('/document/analysis/' + btoa(contractID.toString()), "_blank")}
                                >
                                    {contractName}
                                </span>
                            :
                            currentTask.contractName !== null && currentTask.contractName.length > 15 ?
                                <DarkTooltip title={currentTask.contractName} placement="right-end">
                                    <span style={{ display: 'initial', cursor: 'pointer' }}
                                    // onClick={() => window.open('/document/analysis/' + btoa(fileID.toString()), "_blank")}
                                    >
                                        {truncateFileName(currentTask.contractName)}
                                    </span>
                                </DarkTooltip>
                                :
                                <span style={{ display: 'initial', cursor: 'pointer' }}
                                // onClick={() => window.open('/document/analysis/' + btoa(fileID.toString()), "_blank")}
                                >
                                    {currentTask.contractName}
                                </span>
                        }
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-4">
                        {/*<select name="clause-type" id="clause-type" style={{ width: '165px'}}></select>*/}
                        {
                            editModeOn == true ?
                                <div className="clause-type-container" id="clause-type-input-disabled"
                                style={{ backgroundColor: displayErrorMessage === true && clauseTypeState === '' ? '#ffdddd' : '', border: displayErrorMessage === true && clauseTypeState.length === 0 ? '2px solid #c00000' : '' }}
                                >
                                    { clauseTypeState == null || clauseTypeState === '' ? 'Clause Type' : clauseTypeState.length > 15 ? truncateTaskName(clauseTypeState) : clauseTypeState}
                                    <span className="float-right" style={{ padding: '0px 6px' }}>
                                        <img src="/static_images/tag-dropdown-inactive.svg" alt="dropdown" />
                                    </span>
                                </div>
                                : !isNullOrUndefined(origin) && origin === 'insight' ?
                                    <div className="clause-type-container" id="clause-type-input-disabled"
                                    style={{ backgroundColor: displayErrorMessage === true && clauseTypeState === '' ? '#ffdddd' : '', border: displayErrorMessage === true && clauseTypeState.length === 0 ? '2px solid #c00000' : '' }}
                                    >
                                        {initialClauseType === '' ? 'Select Clause Type' : initialClauseType.length > 15 ? truncateTaskName(initialClauseType) : initialClauseType}
                                        <span className="float-right" style={{ padding: '0px 6px' }}>
                                            <img src="/static_images/tag-dropdown-inactive.svg" alt="dropdown" />
                                        </span>
                                    </div>

                                    :

                                    <div className="clause-type-container" id="clause-type-input" 
                                    onClick={() => this.setState({ hideClauseTypeOptions: !hideClauseTypeOptions })}
                                    style={{ backgroundColor: displayErrorMessage === true && clauseTypeState === '' ? '#ffdddd' : '', border: displayErrorMessage === true && clauseTypeState.length === 0 ? '2px solid #c00000' : '' }}
                                    >
                                        {clauseTypeState === '' ? 'Select Clause Type' : clauseTypeState.length > 15 ? truncateTaskName(clauseTypeState) : clauseTypeState}
                                        <span className="float-right" style={{ padding: '0px 6px' }}>
                                            <img src="/static_images/tag-dropdown-active.svg" alt="dropdown" />
                                        </span>
                                    </div>
                        }

                        <div id="clause-type-options-container" className="col-md-12 clause-type-options" style={{ width: '100%' }} hidden={hideClauseTypeOptions}>
                            <Scrollable maxHeight={100} padding={false}>

                                {clauseType.length > 0 && clauseType.map((type, key) =>
                                    <p onClick={(e) => this.setState({ hideClauseTypeOptions: !hideClauseTypeOptions, enableBIType: true }, () => {
                                        insertClauseType(type.name);
                                        getBIType(type.name);
                                        insertBIType({
                                            id: 0,
                                            biType: '',
                                            columnName: ''
                                        });
                                        insertLinkedText('');
                                    }
                                    )} style={{ padding: '3px 10px 3px', marginBottom: 'auto' }}>{type.name}</p>
                                )}
                            </Scrollable>

                        </div>
                        {/* <div id="clause-type"
                            onChange={(e) => insertClauseType(currentTask.name)}>{clauseType}<span className="float-right" style={{ padding: '0px 6px' }}>
                                <img src="/static_images/tag-dropdown-active.svg" alt="dropdown" />
                            </span>
                        </div> */}
                    </div>
                    <div className="col-md-4 ml-4">
                        {
                            editModeOn === true ?
                                <div className="bi-type-container" id="bi-type-input-disabled"
                                style={{ backgroundColor: displayErrorMessage === true && selectedBITypeValue === '' ? '#ffdddd' : '', border: displayErrorMessage === true && selectedBITypeValue.length === 0 ? '2px solid #c00000' : '' }}
                                >
                                    {selectedBITypeValue == null || selectedBITypeValue === '' ? 'BI type' : selectedBITypeValue.length > 15 ? truncateTaskName(selectedBITypeValue) : selectedBITypeValue}
                                    <span className="float-right" style={{ padding: '0px 6px' }}>
                                        <img src="/static_images/tag-dropdown-inactive.svg" alt="dropdown" />
                                    </span>
                                </div>
                                : !isNullOrUndefined(origin) && origin === 'insight' ?
                                    <div className="bi-type-container" id="bi-type-input" 
                                    onClick={() => this.setState({ hideBITypeOptions: !hideBITypeOptions })}
                                    style={{ backgroundColor: displayErrorMessage === true && selectedBITypeValue === '' ? '#ffdddd' : '', border: displayErrorMessage === true && selectedBITypeValue.length === 0 ? '2px solid #c00000' : '' }}
                                    >
                                        {selectedBITypeValue === '' ? 'Select BI type' : selectedBITypeValue.length > 15 ? truncateTaskName(selectedBITypeValue) : selectedBITypeValue}
                                        <span className="float-right" style={{ padding: '0px 6px' }}>
                                            {
                                                biTypeLoader === true
                                                    ? <img src="/static_images/small-loader.svg" />
                                                    : <img src="/static_images/tag-dropdown-active.svg" alt="dropdown" />
                                            }

                                        </span>
                                    </div>
                                    : <div className="bi-type-container" 
                                    id={enableBIType === false ? "bi-type-input-disabled" : "bi-type-input"} 
                                    onClick={() => this.setState({ hideBITypeOptions: !hideBITypeOptions })}
                                    style={{ backgroundColor: displayErrorMessage === true && selectedBITypeValue === '' ? '#ffdddd' : '', border: displayErrorMessage === true && selectedBITypeValue.length === 0 ? '2px solid #c00000' : '' }}
                                    >
                                        {selectedBITypeValue === '' ? 'Select BI type' : selectedBITypeValue.length > 15 ? truncateTaskName(selectedBITypeValue) : selectedBITypeValue}
                                        <span className="float-right" style={{ padding: '0px 6px' }}>
                                            {
                                                enableBIType === false ?
                                                    <img src="/static_images/tag-dropdown-inactive.svg" alt="dropdown" />

                                                    : biTypeLoader === true
                                                        ? <img src="/static_images/small-loader.svg" />
                                                        : <img src="/static_images/tag-dropdown-active.svg" alt="dropdown" />
                                            }

                                        </span>
                                    </div>
                        }

                        <div id="bi-type-options-container" className="col-md-12 bi-type-options" style={{ width: '100%' }} hidden={hideBITypeOptions}>
                            <Scrollable maxHeight={100} padding={false}>

                                {biType.length > 0 && biType.map((type, key) =>
                                    <p onClick={(e) => this.setState({ hideBITypeOptions: !hideBITypeOptions, enableTextLink: true }, () => {
                                        insertBIType(type);
                                        getBISentence(fileID, type.columnName);
                                        insertLinkedText('');
                                    }
                                    )} style={{ padding: '3px 10px 3px', marginBottom: 'auto' }}>{type.biType}</p>
                                )}
                            </Scrollable>

                        </div>
                        {/* <select name="bi-type" id="bi-type"
                            className="bi-type" onChange={(e) => this.updateBISentences(e.target.value)}
                            // value={this.state.initialBITypeIndex}
                            value="BI type"
                        >{biv}
                        </select> */}
                    </div>
                    <div className="col-md-4 col-4"></div>
                </div>
                <div className="row">
                    <div className="col-md-12 mt-4">
                        {
                            editModeOn === true ?
                                <div className="text-link-container" id="text-link-input-disabled"
                                style={{ backgroundColor: displayErrorMessage === true && linkedTextState === '' ? '#ffdddd' : '', border: displayErrorMessage === true && linkedTextState.length === 0 ? '2px solid #c00000' : '' }}
                                >
                                    {linkedTextState === '' ? 'Link To Text'
                                        : linkedTextState.length > 50 ?
                                            truncateString(linkedTextState, 50) : linkedTextState}
                                    <span className="float-right" style={{ padding: '0px 6px' }}>
                                        <img src="/static_images/tag-dropdown-inactive.svg" alt="dropdown" />
                                    </span>
                                </div>
                                :
                                <div className="text-link-container" 
                                id={enableTextLink === false ? "text-link-input-disabled" : "text-link-input"} 
                                onClick={() => this.setState({ hideTextLinkOptions: !hideTextLinkOptions })}
                                style={{ backgroundColor: displayErrorMessage === true && linkedTextState === '' ? '#ffdddd' : '', border: displayErrorMessage === true && linkedTextState.length === 0 ? '2px solid #c00000' : '' }}
                                >
                                    {linkedTextState === '' ? 'Select Link To Text'
                                        : linkedTextState.length > 50 ?
                                            truncateString(linkedTextState, 50) : linkedTextState}
                                    <span className="float-right" style={{ padding: '0px 6px' }}>
                                        {enableTextLink === false
                                            ? <img src="/static_images/tag-dropdown-inactive.svg" alt="dropdown" />
                                            : biTextLoader === true
                                                ? <img src="/static_images/small-loader.svg" />
                                                : <img src="/static_images/tag-dropdown-active.svg" alt="dropdown" />
                                        }
                                    </span>
                                </div>

                        }
                        <div id="text-link-options-container" className="col-md-12 text-link-options" style={{ width: '94%' }} hidden={hideTextLinkOptions}>
                            <Scrollable maxHeight={100} padding={false}>

                                {biSentence.sentences.length > 0 && biSentence.sentences.map((sentence, key) =>
                                    sentence !== '' && <p onClick={(e) => this.setState({ hideTextLinkOptions: !hideTextLinkOptions }, () => insertLinkedText(sentence))} style={{ padding: '3px 10px 3px', marginBottom: 'auto' }}>{sentence}</p>
                                )}
                            </Scrollable>
                        </div>
                        {/* <select name="text-link" id="text-link"
                            onChange={(e) => this.updateLinkedText(e.target.value)}
                            value={this.state.initialLinkedTextIndex}>
                            {bit}
                        </select> */}
                    </div>
                </div>

            </>
        );
    }
}