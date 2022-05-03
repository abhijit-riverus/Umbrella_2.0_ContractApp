import React, { Component } from 'react';
import Scrollable from '../../../../../UniversalComponents/Scrollable/scrollable';
import { DurationType, editedPhrases, LinkPhraseRequest, phraseInfo } from '../../../../State/documentState';
import { getDurationPhraseFromChild, phraseBiMap } from '../../../Utils/docUtils';

interface Props {
    savedInsight: any;
    durationList: DurationType[];
    dataPointName: string;
    editPhrasesRequest: (newPhraseRequest: LinkPhraseRequest) => void;
    clearNormalizedEdit: () => void;
}

interface State {
    duration: string;
    hideOptions: boolean;
    selectedOption: DurationType;
}

export default class DurationAddEdit extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            duration: '',
            hideOptions: false,
            selectedOption: {
                durationTypeId: -1,
                durationName: '',
                durationType: ''
            }
        }
    }

    componentDidMount() {
        let { savedInsight, durationList } = this.props;
        let selectedDuration: phraseInfo = getDurationPhraseFromChild(savedInsight);
        this.setState({
            duration: (selectedDuration.durationValue !== undefined && selectedDuration.durationValue !== -1) ? '' + selectedDuration.durationValue : '',
            selectedOption: (selectedDuration.durationTypeId !== undefined && selectedDuration.durationTypeId) !== -1 ? durationList.filter((item)=> item.durationTypeId === selectedDuration.durationTypeId)[0] : this.state.selectedOption
        });
    }
    
    setDuration = (duration: DurationType) => {
        this.setState({selectedOption: duration, hideOptions: false});
    }

    render() {
         let { durationList } = this.props;
         let { duration, hideOptions, selectedOption } = this.state;
        return (
            <div className="row">
                <div className="col-md-12" id="duration-container">
                    <div className="row">
                        <div className="col-md-3 py-2" style={{marginLeft: '10px'}}>
                            Duration
                        </div>
                        <div className="col-md-3 py-2">
                            <input type="text" className="duration-input" value={duration === '-1' ? '' : duration} placeholder="Enter no." onChange={(e) => this.setDurationValue(e)} style={{ width: '100%' }} />
                        </div>
                        <div className="col-md-3 py-2">
                            <span className="filter-modal-input" style={{ background: 'white', border: '1px solid #DDDDD' }}  onClick={() => this.setState({ hideOptions: !this.state.hideOptions})} >
                                <input type="text" className="modal-input" placeholder="Select duration" style={{ width: '100%', border: 'none', outline: 'none' }} value={selectedOption.durationName === '' ? '' : selectedOption.durationName } readOnly  />
                                <img src="/static_images/tag-dropdown-active.svg" alt="dropdown" style={{ transform: hideOptions ? 'rotate(180deg)' : 'none', zIndex: 1 }} />
                            </span>
                            {hideOptions &&
                                <div className="col-md-12 filter-modal-autocomplete-container" style={{ margin: 0, paddingLeft: "2px"  }}>
                                    <Scrollable maxHeight={100}>
                                        {durationList.map((durationItem, i)=>
                                            <div className="filter-modal-input-suggestion cursor-pointer" key={i} onClick={() => this.setDuration(durationItem)} >{durationItem.durationName}</div>
                                        )}
                                    </Scrollable>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className="col-md-10 align-right">
                            <span className="add-datapoint" style={{ textDecoration: 'none' }} onClick={() => this.onCancel()}>Cancel</span>
                            {duration.length > 0 && selectedOption.durationTypeId > -1 ?
                                <span className="upload-yellow-btn ml-4" id="save-btn"
                                    onClick={() => this.onSave()}>
                                    Save
                                </span>
                                :
                                <span className="upload-disable-btn ml-4" id="save-btn">
                                    Save
                                </span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    setDurationValue(event: any){
        let { duration } = this.state;
        let value = event.target.value;
        let durationString: string = duration;
        if(value.length === 0){
            durationString = '';
        } else {
            if(!isNaN(value) && value.length > 0){ 
               let durationValue: number = Number(value);
               durationString = '' + durationValue; 
            }
        }
        this.setState({ duration: durationString });
    }

    onSave(){
        let { duration, selectedOption } = this.state;
        let {savedInsight, dataPointName} = this.props;
        let tempPhraseRequest: LinkPhraseRequest = { mode: "", editedPhrases: { upsert: [], deleted: [], bi: '' } };

        let selectedDuration: phraseInfo = getDurationPhraseFromChild(savedInsight);

        let upsertPhrases: phraseInfo[] = [
            {
                paraId: selectedDuration.paraId,
                startWordId: selectedDuration.startWordId,
                endWordId: selectedDuration.endWordId,
                startSentenceId: selectedDuration.startSentenceId,
                endSentenceId: selectedDuration.endSentenceId,
                rowId: selectedDuration.rowId,
                columnId: selectedDuration.columnId,
                phrase: selectedDuration.phrase,
                durationValue: duration.length > 0 ? Number(duration) : selectedDuration.durationValue,
                durationTypeId: selectedOption.durationTypeId !== -1 ? selectedOption.durationTypeId : selectedDuration.durationTypeId,
            }
        ];

        let addedDeletedPhrases: editedPhrases = { 
            upsert: upsertPhrases, 
            deleted: [], 
            bi: phraseBiMap[dataPointName]
        };

        tempPhraseRequest = {
            editedPhrases: addedDeletedPhrases,
            mode: 'manual'
        }

        this.props.editPhrasesRequest(tempPhraseRequest);
        this.props.clearNormalizedEdit();
    }

    onCancel(){
        //Close normallized add/edit for current datapoint
        this.props.clearNormalizedEdit();
        this.setState({
            duration: '',
            hideOptions: true,
            selectedOption: {
                durationTypeId: -1,
                durationName: '',
                durationType: '',
            }
        });
    }
}
