import Tooltip from '@material-ui/core/Tooltip';
import React, { Component } from 'react';
import { NewAnalysisTableConfig } from '../../../../NewAnalysis/State/newAnalysisState';
import { addOrRemoveNewTableConfigDatapoint } from '../../../../NewAnalysis/Utils/newAnalysisUtils';
import Scrollable from '../../../Scrollable/scrollable';

interface Props {
    tableConfig: NewAnalysisTableConfig[];
    updateSelectedDatapoints: (selectedDatapoints: string[]) => void;
}

interface State {
    expandDropdown: boolean;
    selectedDatapoints: string[];
}

class PreferenceConfigComponent extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            expandDropdown: false,
            selectedDatapoints: []
        }
    }

    render() {
        let { tableConfig } = this.props;
        let { expandDropdown, selectedDatapoints } = this.state;
        return (
            <div className={"docname-input"}>
                <span onClick={() => this.setState({ expandDropdown: !expandDropdown })} className="cursor-pointer float-left placeholder" style={selectedDatapoints.length > 0 ? { width: '-webkit-fill-available', color: 'black' } : { width: '-webkit-fill-available' }}> {selectedDatapoints.length > 0 ? <> {selectedDatapoints.length} Selected </> : <>Select data points</>}
                    <i className={expandDropdown === true ? "fa fa-angle-up float-right" : "fa fa-angle-down float-right"}></i>
                </span>
                {/* <button type="button" style={{ border: somethingHidden ? '2px solid #88305F' : 'none' }} className="upload-yellow-btn configure-btn" onClick={() => this.setState({ expandDropdown: !expandDropdown })}>Configure
                   &nbsp;<img src="/static_images/config-arrow.svg" alt="down-arrow" />
                </button> */}
                {expandDropdown &&
                    <div className="preference-config-container" style={{ position: 'relative', width: '100%', top: '-0.5vh' }}>
                        <Scrollable maxHeight={260}>
                            {tableConfig.map((conf: NewAnalysisTableConfig, i) =>
                                <div className="row config-item" key={i}>
                                    <div className="col-md-2 cursor-pointer" style={{ textAlign: 'left' }} onClick={() => this.updatePreference(conf)}>
                                        <span className="config-display">
                                            <img src={selectedDatapoints.indexOf(conf.item) > -1 ? "/static_images/selected-preference.svg" : "/static_images/unselected-preference.svg"} alt="display" />
                                        </span>
                                    </div>
                                    <div className="col-md-10 pl-0" style={{ textAlign: 'left' }}>
                                        {conf.item}
                                    </div>

                                </div>
                            )}
                        </Scrollable>
                    </div>
                }
            </div >
        );
    }

    updatePreference(datapoint: NewAnalysisTableConfig){
        let {tableConfig} = this.props;
        let { selectedDatapoints } = this.state;
        let tempSelectedDatapoints = addOrRemoveNewTableConfigDatapoint(datapoint, selectedDatapoints); 
        this.setState({selectedDatapoints: tempSelectedDatapoints});
        this.props.updateSelectedDatapoints(tempSelectedDatapoints);
    }
}

export default PreferenceConfigComponent;