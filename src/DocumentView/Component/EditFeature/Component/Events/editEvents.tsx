import React, { Component } from 'react';
import Scrollable from '../../../../../UniversalComponents/Scrollable/scrollable';
import { editedEvent, EventData, eventInfo, LinkEventRequest, phraseInfo, tableInfo } from '../../../../State/documentState';
import { deleteEventFromEventArray, getHighlightedEventsFromChild, getPhraseEventsFromEventArray, getTableCellEventsFromEventArray } from '../../../Utils/docUtils';


interface Props {
    dataPointName: string;
    saveHighlightedDataPoint: (dataPointName: string) => void;
    editOptionSelected: (editOptionSelected: boolean) => void;
    savedInsight: any;
    editPresent: (newLinkedEventsRequest: LinkEventRequest) => void;
    savedHighlightedPhrases: phraseInfo[] | null;
    saveHighlightedPhrases: (savedHighlightedPhrases: phraseInfo[] | null) => void;
    phraseEditOptionSelected: boolean;
    savePhraseEditOption: (phraseEditOptionSelected: boolean) => void;
    phraseInDeleteMode: phraseInfo | null;
    phraseDeleteStatus: boolean;
    saveDeletePhrase: (phraseInDeleteMode: phraseInfo | null, phraseDeleteStatus: boolean) => void;
    phraseInAddMode: phraseInfo | null;
    phraseAddStatus: boolean;
    saveAddPhrase: (phraseInAddMode: phraseInfo | null, phraseAddStatus: boolean) => void;
    savedHighlightedTableCells: tableInfo[] | null;
    saveHighlightedTableCells: (savedHighlightedTableCells: tableInfo[] | null) => void;
    savedEvents: EventData[];
    newEventData: EventData;
    listEvents: (event: string) => void;
    createNewEvent: (name: string, eventPoint: string) => void;
    savedHighlightedEvents: eventInfo[] | null;
    saveHighlightedEvents: (savedHighlightedEvents: eventInfo[] | null) => void;
    eventInAddEdit: eventInfo | null;
    saveEventInAddEdit: (eventInAddEdit: eventInfo | null) => void;
    eventEditingStatus: boolean;
    saveEventEditingStatus: (eventEditingStatus: boolean) => void;
}

interface State {
    expandEvent: boolean;
    searchTerm: string;
    matchedEvents: EventData[];
    eventInAddMode: eventInfo | null;
}


export default class EditEvents extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            expandEvent: false,
            searchTerm: '',
            matchedEvents: this.props.savedEvents,
            eventInAddMode: null
        };
    }

    componentWillReceiveProps(nextProps: Props){
        if(this.props.savedEvents !== nextProps.savedEvents && nextProps.savedEvents.length !== 0){
            this.setState({matchedEvents: nextProps.savedEvents, searchTerm: ''});
        }
        if(this.props.eventInAddEdit !== nextProps.eventInAddEdit){
            if(nextProps.eventInAddEdit !== null && nextProps.eventInAddEdit.eventId === -1){
                if(this.state.eventInAddMode !== nextProps.eventInAddEdit){
                    this.setState({eventInAddMode: nextProps.eventInAddEdit});
                }
            }
        }
        if(this.props.newEventData !== nextProps.newEventData){
            let eventTerm = '';
            if(nextProps.dataPointName === 'Termination Event'){
                eventTerm = 'termination';
            }else if(nextProps.dataPointName === 'Events Of Default Event'){
                eventTerm = 'eventsofdefault';
            }
            nextProps.listEvents(eventTerm);
        }
    }

    componentDidMount(){
        let eventTerm = '';
        if(this.props.dataPointName === 'Termination Event'){
            eventTerm = 'termination';
        }else if(this.props.dataPointName === 'Events Of Default Event'){
            eventTerm = 'eventsofdefault';
        }
        this.props.listEvents(eventTerm);
        let eventHighlights = getHighlightedEventsFromChild(this.props.savedInsight);
        if(eventHighlights === null || eventHighlights.length === 0){
            this.props.saveHighlightedEvents(null);
        }else {
            this.props.saveHighlightedEvents(eventHighlights);
        }
    }

    //Function to call on Change of Text in event textbox
    getSuggestedEvents(event: any){
        let {expandEvent} = this.state;
        let {savedEvents} = this.props;
        event.preventDefault();
        if(expandEvent === true){
            let searchEventName = event.target.value; 
            this.setState({searchTerm: searchEventName });
            if(searchEventName === ''){
                this.setState({matchedEvents: savedEvents});
            }else{
                if(savedEvents !== null){
                    //filter matched events
                    let eventsList = savedEvents;
                    let filteredEvents = eventsList.filter((e)=> e.eventName.trim().toLowerCase().indexOf(searchEventName.trim().toLowerCase()) > -1 );
                    this.setState({matchedEvents: filteredEvents});
                }else {
                    this.setState({matchedEvents: savedEvents});
                }
            }  
        }      
    }

    render() {
        return (
            <div className="row toc-content toc-content-default">
                <div className="col-md-12">
                    <div className="row mt-1">
                        <div className="col-md-12 m-0 bi-label-clickable" style={{ fontWeight: 600 }}>
                            Create list
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3 edit-title-header">
                            Add events to your contract here...
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 bi-label-clickable edit-date-title">
                            {this.props.dataPointName} 
                        </div>
                        <div className="col-md-8">
                            {this.getEvents()}
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="col-md-12">
                            <span className="mr-2">
                                <img alt='active' src='/static_images/checkbox_active.svg' className="filter-select-asset cursor-pointer " />
                            </span>&nbsp;&nbsp;
                            Share feedback with Riverus.
                        </div>
                    </div> */}
                    {this.saveOrCancel()}
                </div>
            </div>
        );
    }

    getEvents(){
        let {expandEvent, matchedEvents, searchTerm, eventInAddMode} = this.state;
        let {newEventData, savedEvents, listEvents, createNewEvent, savedHighlightedEvents} = this.props;
        if(savedHighlightedEvents !== null && savedHighlightedEvents.length > 0){
            return (
                <>            
                    {savedHighlightedEvents.map((eventIter, i)=>
                        <div className="row" key={i}>
                            <div className="col-md-1 mx-0 px-0" style={{textAlign: 'right'}} >{(i+1.)}</div>
                            <div className="col-md-8 pr-0 my-1 tag-selection-header" style={{ color: '#4D4D4D' }}>
                                <input type="text" className="tag-input" value={eventIter.eventName} style={{ width: '100%' }} readOnly onChange={() => { }} />
                            </div>
                            <div className="col-md-3 align-right">
                                <img className='cursor-pointer' src="/static_images/less-parties.svg" alt="remove-icon" onClick={() => this.addOrRemovePhrase('remove', eventIter)} />
                            </div>
                            {this.linkPhraseToEvent(eventIter)}
                        </div>
                    )}
                    
                    <div className='row'>
                        <div className='col-md-8 pr-0 my-1 tag-selection-header'>
                            {(eventInAddMode === null || eventInAddMode.eventName === '') ?
                                <>
                                    <div className="col-md-12">
                                        <span className="tag-input" style={{ background: 'white', border: '1px solid #DDDDDD' }} >
                                            <input type="text" className="tag-input" placeholder="Select one tag" style={{ width: '100%', border: 'none', outline: 'none' }} value={this.state.searchTerm}  onChange={(e)=>this.getSuggestedEvents(e)} maxLength={50} />
                                            <img src="/static_images/tag-dropdown-active.svg" alt="dropdown" onClick={() => this.setState({ expandEvent: !this.state.expandEvent, matchedEvents: savedEvents })} style={{ transform: expandEvent ? 'rotate(180deg)' : 'none', zIndex: 1 }} />
                                        </span>
                                    </div>
        
                                    {expandEvent &&
                                        <div className="col-md-12 tag-autocomplete-container" style={{ margin: 0 }}>
                                            <Scrollable maxHeight={100}>
                                                {this.isSearchMatched(searchTerm, matchedEvents) === false && searchTerm !== '' && 
                                                    <div className="tag-input-suggestion">
                                                        <div style={{ color: '#808080', fontSize: '9px' }}>
                                                            This event does not exist
                                                            </div>
                                                            <div className="cursor-pointer">
                                                                <div style={{ color: '#88305F', fontSize: '10px' }} onClick={() => this.createAndAddNewEvent(searchTerm)}>
                                                                Create Event +
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                {matchedEvents.map((event, i)=>
                                                    <div className="tag-input-suggestion cursor-pointer" key={i} onClick={() => this.setEvent(event)}>{event.eventName}</div>
                                                )}
                                            </Scrollable>
                                        </div>
                                    }
                                </>
                                :
                                <div className="col-md-12">
                                    <span className="tag-input" style={{ width: '93%', outline: 'none', background: '#E2E2E2', border: '1px solid #DDDDDD' }} >
                                        <input type="text" className="tag-input" readOnly value={eventInAddMode.eventName}  style={{ width: '100%', border: 'none', outline: 'none', background: '#E2E2E2' }} onChange={(e)=>this.getSuggestedEvents(e)}  />
                                        <img src="/static_images/tag-dropdown-active.svg" alt="dropdown" onClick={() => this.setState({ expandEvent: !this.state.expandEvent, matchedEvents: savedEvents, searchTerm: '', eventInAddMode: null })} style={{ transform: expandEvent ? 'rotate(180deg)' : 'none', zIndex: 1 }} />
                                    </span>
                                </div>
                            }
                            {this.linkPhraseToEvent(eventInAddMode)}
                        </div>
                        <div className='col-md-4 align-right'>
                            {eventInAddMode !== null && eventInAddMode.paraId !== null && eventInAddMode.paraId !== -1 ?
                                    <img className='cursor-pointer' src="/static_images/more-parties.svg" alt="add-more" onClick={() => this.addOrRemovePhrase('add', eventInAddMode)} />
                                    : <img src="/static_images/more-parties-disabled.svg" alt="add-more" />
                                }
                        </div>
                    </div>
                </>
            );
        }else{
            return (
                <div className='row'>
                    <div className='col-md-8 pr-0 my-1 tag-selection-header'>
                        {(eventInAddMode === null || eventInAddMode.eventName === '') ?
                            <>
                                <div className="col-md-12">
                                    <span className="tag-input" style={{ background: 'white', border: '1px solid #DDDDDD' }} /* onClick={() => this.setState({ expandEvent: !this.state.expandEvent, matchedEvents: savedEvents })} */>
                                        <input type="text" className="tag-input" placeholder="Select one tag" style={{ width: '100%', border: 'none', outline: 'none' }} value={this.state.searchTerm}  onChange={(e)=>this.getSuggestedEvents(e)} maxLength={50} />
                                        <img src="/static_images/tag-dropdown-active.svg" alt="dropdown" onClick={() => this.setState({ expandEvent: !this.state.expandEvent, matchedEvents: savedEvents })} style={{ transform: expandEvent ? 'rotate(180deg)' : 'none', zIndex: 1 }} />
                                    </span>
                                </div>
    
                                {expandEvent &&
                                    <div className="col-md-12 tag-autocomplete-container" style={{ margin: 0 }}>
                                        <Scrollable maxHeight={100}>
                                            {this.isSearchMatched(searchTerm, matchedEvents) === false && searchTerm !== '' && 
                                                <div className="tag-input-suggestion">
                                                    <div style={{ color: '#808080', fontSize: '9px' }}>
                                                        This event does not exist
                                                        </div>
                                                        <div className="cursor-pointer">
                                                            <div style={{ color: '#88305F', fontSize: '10px' }} onClick={() => this.createAndAddNewEvent(searchTerm)}>
                                                            Create Event +
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            {matchedEvents.map((event, i)=>
                                                <div className="tag-input-suggestion cursor-pointer" key={i} onClick={() => this.setEvent(event)}>{event.eventName}</div>
                                            )}
                                        </Scrollable>
                                    </div>
                                }
                            </>
                            :
                            <div className="col-md-12">
                                <span className="tag-input" style={{ width: '93%', outline: 'none', background: '#E2E2E2', border: '1px solid #DDDDDD' }} >
                                    <input type="text" className="tag-input" readOnly value={eventInAddMode.eventName}  style={{ width: '100%', border: 'none', outline: 'none', background: '#E2E2E2' }} onChange={(e)=>this.getSuggestedEvents(e)}  />
                                    <img src="/static_images/tag-dropdown-active.svg" alt="dropdown" onClick={() => this.setState({ expandEvent: !this.state.expandEvent, matchedEvents: savedEvents, searchTerm: '', eventInAddMode: null })} style={{ transform: expandEvent ? 'rotate(180deg)' : 'none', zIndex: 1 }} />
                                </span>
                            </div>
                        }
                        {this.linkPhraseToEvent(eventInAddMode)}
                    </div>
                    <div className='col-md-4 align-right'>
                        {eventInAddMode !== null && eventInAddMode.paraId !== null && eventInAddMode.paraId !== -1 ?
                                <img className='cursor-pointer' src="/static_images/more-parties.svg" alt="add-more" onClick={() => this.addOrRemovePhrase('add', eventInAddMode)} />
                                : <img src="/static_images/more-parties-disabled.svg" alt="add-more" />
                            }
                    </div>
                </div>
            );
        }
        
    }

    isSearchMatched(searchTerm: string, eventArray: EventData[] | null){
        if(eventArray !== null && eventArray.length === 1){
            let filteredEvents = eventArray.filter((event)=> event.eventName.trim().toLowerCase() === searchTerm.trim().toLowerCase());
            if(filteredEvents.length > 0) {return true;}
        }
        return false;
    }

    createAndAddNewEvent(searchTerm: string){
        if(this.props.dataPointName === 'Termination Event'){
            this.props.createNewEvent(searchTerm, 'termination');
        }else if(this.props.dataPointName === 'Events Of Default Event'){
            this.props.createNewEvent(searchTerm, 'eventsofdefault');
        }
    }

    saveOrCancel = () => {
        return(
            <div className="row my-2">
                <div className="col-md-5" />
                <div className="col-md-7">
                    <span className="add-datapoint" style={{ textDecoration: 'none' }} onClick={() => this.onCancel()}>Cancel</span>
                    {this.getSaveStatus() ? 
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
        );
    }

    getSaveStatus(){
        let { savedHighlightedEvents } = this.props;
        let {eventInAddMode} = this.state;
        let isSavedEventsLinked: boolean = false;
        if(savedHighlightedEvents !== null && savedHighlightedEvents.length > 0 ){
            if(savedHighlightedEvents.findIndex((event)=> (event.paraId === null || event.paraId === -1)) === -1 ){
                isSavedEventsLinked = true;
            }
        }else if(savedHighlightedEvents === null || savedHighlightedEvents.length === 0){
            isSavedEventsLinked = true;
        }
        let isNewEventsLinked = false;
        if(eventInAddMode !== null){
            if(eventInAddMode.paraId !== null && eventInAddMode.paraId !== -1){
                isNewEventsLinked = true;
            }
        }else if(eventInAddMode === null){
            isNewEventsLinked = true;
        }
        if(isSavedEventsLinked === true && isNewEventsLinked === true){
            return true;
        }
        return false;
    }

    linkPhraseToEvent = (eventString: eventInfo | null) => {
        let { eventInAddEdit, eventEditingStatus } = this.props;
        if(eventString !== null){
            if(eventEditingStatus === true && eventInAddEdit !== null && eventString.eventHighlightId === eventInAddEdit.eventHighlightId) {
                if(eventInAddEdit.paraId !== null && eventInAddEdit.paraId > -1){
                    return (
                        <div className="row">
                            <div className="col-md-10">
                                <span className="link-to" style={{ color: '#C1C1C1' }}>
                                    Edit linked phrase(s)
                                </span>
                            </div>
                            <div className="col-md-2 pr-0 display-flex" >
                                <span className="linked-para-count">
                                    {1}
                                </span>
                            </div>
                        </div>
                    )
                } else {
                    return(
                        <div className="row">
                            <div className="col-md-12">
                                <span className="link-to cursor-pointer" style={{ color: '#C1C1C1' }} >
                                    Link to phrase(s)
                                </span>
                            </div>
                            <div className="col-md-12 link-to-info">
                                    Please highlight the phrase on the document, you wish to link to this data point and click on save.
                            </div>
                        </div>
                    )
                }
            }

            if((eventInAddEdit !== null && eventInAddEdit.eventHighlightId !== eventString.eventHighlightId) || (eventInAddEdit === null)){
                if(eventString.paraId !== null && eventString.paraId > -1 && eventString.phrase !== ''){
                    return (
                        <div className="row">
                            <div className="col-md-12">
                                <span className="link-to cursor-pointer" style={{ color: '#88305F' }} onClick={()=> this.editLinkedPhrase(eventString)}>
                                    Edit linked phrase(s)
                                </span>
                            </div>
                        </div>
                    )
                }else if(eventString.eventName !== '' && (eventString.paraId === null || eventString.paraId === -1)) {
                    return (
                        <div className="row">
                            <div className="col-md-12">
                                <span className="link-to cursor-pointer" style={{ color: '#88305F' }}
                                    onClick={() => this.linkToPhrase(eventString)} >
                                    Link to phrase(s)
                                </span>
                            </div>
                        </div>
                    )
                }
            }
        }
    }

    linkToPhrase(eventInfo: eventInfo){
        this.props.savePhraseEditOption(true); //confirm
        this.props.saveEventEditingStatus(true);
        this.props.saveDeletePhrase(null, false);
        this.props.saveAddPhrase(null, false);
        this.props.saveHighlightedDataPoint(this.props.dataPointName);
        this.props.saveEventInAddEdit(eventInfo);
        this.props.editOptionSelected(true);
    }

    editLinkedPhrase(eventInfo: eventInfo){
        this.props.editOptionSelected(true);
        //if table cell highlight
        let scrollToElement = '';
        if(eventInfo.paraId !== null && eventInfo.paraId !== -1 && eventInfo.rowId !== null && eventInfo.rowId !== -1 && eventInfo.columnId !== null && eventInfo.columnId !== -1){
            let tempTableCell = {
                paraId: eventInfo.paraId,
                rowId: eventInfo.rowId,
                columnId: eventInfo.columnId
            }
            scrollToElement = 'p'+eventInfo.paraId+';r'+eventInfo.rowId+';c'+eventInfo.columnId;
            
            this.props.saveHighlightedTableCells([tempTableCell]);

        }else if(eventInfo.paraId !== null && eventInfo.paraId !== -1 && eventInfo.startWordId !== null && eventInfo.startWordId !== -1 && eventInfo.endWordId !== null && eventInfo.endWordId !== -1 && (eventInfo.rowId === null || eventInfo.rowId === -1) && (eventInfo.columnId === null || eventInfo.columnId === -1)){
            scrollToElement = 'p' + eventInfo.paraId + ';w' + eventInfo.startWordId;
            this.props.saveHighlightedTableCells(null);
        }

        let scrollElementId = document.getElementById(scrollToElement);
        scrollElementId !== undefined && scrollElementId !== null && scrollElementId.scrollIntoView({block: 'center'});

        //make a phraseInfo object
        let phraseEventInfo: phraseInfo = {
            paraId: eventInfo.paraId,
            startSentenceId: eventInfo.sentenceId,
            endSentenceId: eventInfo.sentenceId,
            startWordId: eventInfo.startWordId,
            endWordId: eventInfo.endWordId,
            rowId: eventInfo.rowId,
            columnId: eventInfo.columnId,
            phrase: eventInfo.phrase
        };
        this.props.saveDeletePhrase(phraseEventInfo, true);
        this.props.saveEventInAddEdit(eventInfo);
        this.props.editOptionSelected(true);
        this.props.saveHighlightedDataPoint(this.props.dataPointName);
    }

    addOrRemovePhrase(action: string, eventInfo: eventInfo | null){
        let {eventInAddMode} = this.state;
        let {savedHighlightedEvents} = this.props;
        this.props.saveAddPhrase(null, false);
        this.props.saveDeletePhrase(null, false);
        this.props.saveHighlightedTableCells(null);
        this.props.saveEventInAddEdit(null);
        this.props.saveEventEditingStatus(false);
        this.props.savePhraseEditOption(false);

        if(action === 'add'){
            if(eventInfo !== null){
                
                let tempHiglightedEvents = savedHighlightedEvents !== null ? savedHighlightedEvents : [];
                let addedHighlightedEvent = eventInAddMode;
                if(addedHighlightedEvent !== null){
                    addedHighlightedEvent.eventHighlightId = tempHiglightedEvents.length;
                    tempHiglightedEvents.push(addedHighlightedEvent);
                    this.props.saveHighlightedEvents(tempHiglightedEvents);
                }
                this.setState({eventInAddMode: null});
            }
            
        }else if(action === 'remove'){
            if(eventInfo !== null){
                if(savedHighlightedEvents !== null ){
                    let tempFilteredEvents = deleteEventFromEventArray(eventInfo, savedHighlightedEvents);
                    this.props.saveHighlightedEvents(tempFilteredEvents);
                }
            }
        }
    }

    setEvent(event: EventData){
        let {savedEvents} = this.props;
        //Add event in eventInAddMode state, with localEventId as -1
        let newEventInAddMode: eventInfo = {eventHighlightId: -1, eventId: event.eventId, eventName: event.eventName, paraId: -1, sentenceId: -1, startWordId: -1, endWordId: -1, rowId: -1, columnId: -1, phrase: '' }; 
        this.setState({eventInAddMode: newEventInAddMode, searchTerm: '', matchedEvents: savedEvents, expandEvent: false});
    }

    onSave(){
        let {eventInAddEdit, savedHighlightedEvents, dataPointName} = this.props;
        let {eventInAddMode} = this.state;
        let tempHighlightedEvents = savedHighlightedEvents !== null ? savedHighlightedEvents : [];
        if(eventInAddMode !== null && eventInAddMode.eventName !== ''){
            tempHighlightedEvents.push(eventInAddMode);
        }

        let oldHighlightedEvents = getHighlightedEventsFromChild(this.props.savedInsight);
        let changedHighlightedEvents = tempHighlightedEvents;
        let oldHighlightedEventPhrases = getPhraseEventsFromEventArray(oldHighlightedEvents);
        let changedHighlightedEventPhrases = getPhraseEventsFromEventArray(changedHighlightedEvents);
        let oldHighlightedEventTableCells = getTableCellEventsFromEventArray(oldHighlightedEvents);
        let changedHighlightedEventTableCells = getTableCellEventsFromEventArray(changedHighlightedEvents);

        let editedEventPhrases = this.getAddedDeletedEventPhrases(oldHighlightedEventPhrases, changedHighlightedEventPhrases);
        let editedEventTableCells = this.getAddedDeletedEventTableCells(oldHighlightedEventTableCells, changedHighlightedEventTableCells);

        let addedDeletedHighlightedEvents = this.mergeAddedDeletedHighlightedEvent(editedEventPhrases, editedEventTableCells);

        let newEventRequest: LinkEventRequest ={
            editedEvents: addedDeletedHighlightedEvents,
            mode: 'manual'
        }

        this.props.editPresent(newEventRequest);
        this.props.saveHighlightedTableCells(null);
        this.props.saveHighlightedPhrases(null);
        this.props.saveDeletePhrase(null, false);
        this.props.saveAddPhrase(null, false);
        this.props.savePhraseEditOption(false);
        this.props.saveEventInAddEdit(null);
        this.props.saveEventEditingStatus(false);
        this.props.saveHighlightedEvents(null);
        this.props.editOptionSelected(false);
        this.setState({ expandEvent: false, searchTerm: '', eventInAddMode: null});

    }

    onCancel(){
        this.props.saveHighlightedTableCells(null);
        this.props.saveHighlightedPhrases(null);
        this.props.saveDeletePhrase(null, false);
        this.props.saveAddPhrase(null, false);
        this.props.savePhraseEditOption(false);
        this.props.saveEventInAddEdit(null);
        this.props.saveEventEditingStatus(false);
        this.props.saveHighlightedEvents(null);
        this.props.editOptionSelected(false);
        this.setState({ expandEvent: false, searchTerm: '', eventInAddMode: null});
    }

    getAddedDeletedEventPhrases(previousEventPhrases: eventInfo[], changedEventPhrases: eventInfo[]){
        let addedEventPhrases: eventInfo[] = [];
        let deletedEventPhrases: eventInfo[] = [];

        if(previousEventPhrases.length !== 0){
            if(changedEventPhrases !== null && changedEventPhrases.length > 0){
                //get newly added phrases
                for(let i = 0; i < changedEventPhrases.length; i++){
                    let exists = false;
                    for(let j = 0; j < previousEventPhrases.length; j++){
                        if(changedEventPhrases[i].eventId === previousEventPhrases[j].eventId &&  changedEventPhrases[i].paraId === previousEventPhrases[j].paraId && previousEventPhrases[j].startWordId === changedEventPhrases[i].endWordId && previousEventPhrases[j].endWordId === changedEventPhrases[i].endWordId){
                            exists = true;
                            break;
                        }
                    }
                    if(exists === false){
                        addedEventPhrases.push(changedEventPhrases[i]);
                    }
                }

                //get deleted phrases
                for(let i = 0; i < previousEventPhrases.length; i++){
                    let exists = false;
                    for(let j = 0; j < changedEventPhrases.length; j++){
                        if(previousEventPhrases[i].eventId === changedEventPhrases[j].eventId && previousEventPhrases[i].paraId === changedEventPhrases[j].paraId && previousEventPhrases[i].startWordId === changedEventPhrases[j].startWordId && previousEventPhrases[i].endWordId === changedEventPhrases[j].endWordId){
                            exists = true;
                            break;
                        }
                    }
                    if(exists === false){
                        deletedEventPhrases.push(previousEventPhrases[i]);
                    }
                }
            } else if(changedEventPhrases.length === 0){
                for(let i = 0; i < previousEventPhrases.length; i++){
                    deletedEventPhrases.push(previousEventPhrases[i]);
                }                
            }
        }else {
            if(changedEventPhrases !== null && changedEventPhrases.length > 0){
                for(let i = 0; i < changedEventPhrases.length; i++){
                    addedEventPhrases.push(changedEventPhrases[i]);
                }
            }
        }
        
        let editedEventPhrases: editedEvent = {
            upsert: addedEventPhrases,
            deleted: deletedEventPhrases,
            bi: ''
        }
        return editedEventPhrases;
    }

    getAddedDeletedEventTableCells(previousEventTableCells: eventInfo[], changedEventTableCells: eventInfo[]){
        let addedEventTableCells: eventInfo[] = [];
        let deletedEventTableCells: eventInfo[] = [];

        if(previousEventTableCells.length > 0){
            if(changedEventTableCells.length > 0){
                //newly added
                for(let i = 0; i < changedEventTableCells.length; i++){
                    let addedCellExists = false;
                    for(let j = 0; j < previousEventTableCells.length; j++){
                        if(changedEventTableCells[i].eventId === previousEventTableCells[j].eventId && changedEventTableCells[i].paraId === previousEventTableCells[j].paraId && changedEventTableCells[i].rowId === previousEventTableCells[j].rowId && changedEventTableCells[i].columnId === previousEventTableCells[j].columnId){
                            addedCellExists = true;
                            break;
                        }
                    }
                    if(addedCellExists === false){
                        addedEventTableCells.push(changedEventTableCells[i]);
                    }
                }

                //deleted elements
                for(let i = 0; i < previousEventTableCells.length; i++){
                    let deletedCellExists = false;
                    for(let j = 0; j < changedEventTableCells.length; j++){
                        if(previousEventTableCells[i].eventId === changedEventTableCells[j].eventId && previousEventTableCells[i].paraId === changedEventTableCells[j].paraId && previousEventTableCells[i].rowId === changedEventTableCells[j].rowId && previousEventTableCells[i].columnId === changedEventTableCells[j].columnId){
                            deletedCellExists = true;
                            break;
                        }
                    }
                    if(deletedCellExists === false){
                        deletedEventTableCells.push(previousEventTableCells[i]);
                    }
                }
            }else{
                //previous deleted
                for(let i = 0; i < previousEventTableCells.length; i++){
                    deletedEventTableCells.push(previousEventTableCells[i]);
                }
            }
        }else{
            //all newly added
            if(changedEventTableCells.length > 0){
                for(let i = 0; i < changedEventTableCells.length; i++){
                    addedEventTableCells.push(changedEventTableCells[i]);
                }
            }
        }
        
        let editedEventTableCells: editedEvent = {
            upsert: addedEventTableCells,
            deleted: deletedEventTableCells,
            bi: ''
        }
        return editedEventTableCells;
    }

    mergeAddedDeletedHighlightedEvent(firstHighlightedEvents: editedEvent, secondHighlightedEvents: editedEvent){
        let upsertHighlightedEvents: eventInfo[] = firstHighlightedEvents.upsert.concat(secondHighlightedEvents.upsert);
        let deletedHighlightedEvents: eventInfo[] = firstHighlightedEvents.deleted.concat(secondHighlightedEvents.deleted);

        let mergeHighlightedEvents: editedEvent = {
            upsert: upsertHighlightedEvents,
            deleted: deletedHighlightedEvents,
            bi: 'event'
        }
        return mergeHighlightedEvents;
    }
 
}