import React, { Component } from 'react';
import Scrollable from '../../../../../UniversalComponents/Scrollable/scrollable';
import { CurrencyType, editedPhrases, LinkPhraseRequest, phraseInfo } from '../../../../State/documentState';
import { getCurrencyPhraseFromChild, phraseBiMap } from '../../../Utils/docUtils';

interface Props {
    savedInsight: any;
    currencyList: CurrencyType[];
    dataPointName: string;
    editPhrasesRequest: (newPhraseRequest: LinkPhraseRequest) => void;
    clearNormalizedEdit: () => void;
}

interface State {
    currency: string;
    hideOptions: boolean;
    selectedOption: CurrencyType;
}

export default class AmountAddEdit extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            currency: '',
            hideOptions: false,
            selectedOption: {
                currencyTypeId: -1,
                currencyName: '',
                currencyType: ''
            }
        }
    }

    componentDidMount() {
        let { savedInsight, currencyList } = this.props;
        let selectedCurrency: phraseInfo = getCurrencyPhraseFromChild(savedInsight);
        this.setState({
            currency: (selectedCurrency.total !== undefined && selectedCurrency.total !== -1) ? '' + selectedCurrency.total : '',
            selectedOption: (selectedCurrency.currency_typeid !== undefined && selectedCurrency.currency_typeid) !== -1 ? currencyList.filter((item)=> item.currencyTypeId === selectedCurrency.currency_typeid)[0] : this.state.selectedOption
        });
    }
    
    setCurrency = (currency: CurrencyType) => {
        this.setState({selectedOption: currency, hideOptions: false});
    }

    render() {
         let { currencyList } = this.props;
         let { currency, hideOptions, selectedOption } = this.state;
        return (
            <div className="row">
                <div className="col-md-12" id="currency-container">
                    <div className="row">
                        <div className="col-md-3 py-2" style={{marginLeft: '10px'}}>
                            Amount
                        </div>
                        <div className="col-md-3 py-2">
                            <input type="text" className="currency-input" value={currency === '-1' ? '' : currency} placeholder="Enter no." onChange={(e) => this.setCurrencyValue(e)} style={{ width: '100%' }} />
                        </div>
                        <div className="col-md-3 py-2">
                            <span className="filter-modal-input" style={{ background: 'white', border: '1px solid #DDDDD' }}  onClick={() => this.setState({ hideOptions: !this.state.hideOptions})} >
                                <input type="text" className="modal-input" placeholder="Select currency" style={{ width: '100%', border: 'none', outline: 'none' }} value={selectedOption.currencyName === '' ? '' : selectedOption.currencyName } readOnly  />
                                <img src="/static_images/tag-dropdown-active.svg" alt="dropdown" style={{ transform: hideOptions ? 'rotate(180deg)' : 'none', zIndex: 1 }} />
                            </span>
                            {hideOptions &&
                                <div className="col-md-12 filter-modal-autocomplete-container" style={{ margin: 0, paddingLeft: "2px"  }}>
                                    <Scrollable maxHeight={100}>
                                        {currencyList.map((currencyItem, i)=>
                                            <div className="filter-modal-input-suggestion cursor-pointer" key={i} onClick={() => this.setCurrency(currencyItem)} >{currencyItem.currencyName}</div>
                                        )}
                                    </Scrollable>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className="col-md-10 align-right">
                            <span className="add-datapoint" style={{ textDecoration: 'none' }} onClick={() => this.onCancel()}>Cancel</span>
                            {currency.length > 0 && selectedOption.currencyTypeId > -1 ?
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

    setCurrencyValue(event: any){
        let { currency } = this.state;
        let value = event.target.value;
        let currencyString: string = currency;
        if(value.length === 0){
            currencyString = '';
        } else {
            if(!isNaN(value) && value.length > 0){ 
               let currencyValue: number = Number(value);
               currencyString = '' + currencyValue; 
            }
        }
        this.setState({ currency: currencyString });
    }

    onSave(){
        let { currency, selectedOption } = this.state;
        let {savedInsight, dataPointName} = this.props;
        let tempPhraseRequest: LinkPhraseRequest = { mode: "", editedPhrases: { upsert: [], deleted: [], bi: '' } };

        let selectedCurrency: phraseInfo = getCurrencyPhraseFromChild(savedInsight);

        let upsertPhrases: phraseInfo[] = [
            {
                paraId: selectedCurrency.paraId,
                startWordId: selectedCurrency.startWordId,
                endWordId: selectedCurrency.endWordId,
                startSentenceId: selectedCurrency.startSentenceId,
                endSentenceId: selectedCurrency.endSentenceId,
                rowId: selectedCurrency.rowId,
                columnId: selectedCurrency.columnId,
                phrase: selectedCurrency.phrase,
                total: currency.length > 0 ? Number(currency) : selectedCurrency.total,
                currency_typeid: selectedOption.currencyTypeId !== -1 ? selectedOption.currencyTypeId : selectedCurrency.currency_typeid,
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
            currency: '',
            hideOptions: true,
            selectedOption: {
                currencyTypeId: -1,
                currencyName: '',
                currencyType: '',
            }
        });
    }
}
