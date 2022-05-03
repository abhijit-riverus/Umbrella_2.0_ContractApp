import React, { Component } from 'react';

interface Props{
    selectedDataPoint: string;
    activeState: boolean;
}

interface State{
    isOriginalData: boolean;
}
export default class DataReset extends Component<Props, State> {
    constructor(props: Props){
        super(props);
        this.state={
            isOriginalData: false
        }
    }

    render(){
        let { isOriginalData } = this.state;
        return(
            <>
                <div className="col-md-12 py-1 switch-data-bar">
                    <div className="row">
                        <div className="col-md-8 px-2">
                            <span className="switch-data-label">Last edited on 30 May 2020 by Ankit Sinha</span>
                        </div>
                        <div className="col-md-4 px-1">
                            { isOriginalData 
                            ? <span className="switch-data-button" onClick={()=> this.switchToEditedData()} >Switch to edited data</span>
                            : <span className="switch-data-button" onClick={()=> this.switchToOriginalData()} >Switch to original data</span>}
                        </div>
                    </div>
                </div>
            </>
        );
    }

    switchToOriginalData() {
        this.setState({isOriginalData: true});
    }

    switchToEditedData(){
        this.setState({isOriginalData: false});
    }


    
}