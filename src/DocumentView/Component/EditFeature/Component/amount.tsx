import React, { Component } from 'react';
import { currencyInfoData, LinkPhraseRequest } from '../../../State/documentState';

interface Props {
    currencyInfo: currencyInfoData[];
    dataPointName: string;
    editPhrasesRequest: (newPhraseRequest: LinkPhraseRequest) => void;
}

interface State {
    amount: number;
    hideOptions: boolean;
    selectedOption: string;
}

export const currencyTestJSON = ["USD","%","INR", "CAD", "EUR", "GBP"]

class Amount extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            amount: 0,
            hideOptions: true,
            selectedOption: 'USD'
        }
    }
    
    setCurrency = (currency: currencyInfoData) => {
        this.setState({selectedOption: currency.data.currencyName});
    }

    render() {
        return (
            <div className="col-md-12" id="duration-container">
                <div className="row">
                <div className="col-md-3">
                    Amount
                </div>
                <div className="col-md-3">
                <input type="text" className="duration-input" value={this.state.amount} placeholder="Enter no."
                onChange={(e) => this.setState({ amount: +e.currentTarget.value })} style={{ width: '100%' }} />
                </div>
                <div className="col-md-3">
                <span onClick={() => this.setState({ hideOptions: !this.state.hideOptions })}>
                    { this.state.selectedOption } 
                </span>
                <div id="duration-options-container" hidden={this.state.hideOptions}>
                    {this.props.currencyInfo.map((currency: currencyInfoData, key) =>
                        <p onClick={() => this.setCurrency(currency)} >{currency.data.currencyName}</p>
                    )}
                </div>
                </div>
                </div>
            </div>
        );
    }
}

export default Amount;