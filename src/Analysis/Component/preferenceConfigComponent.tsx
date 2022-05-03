import Tooltip from '@material-ui/core/Tooltip';
import React, { Component } from 'react';
import Scrollable from '../../UniversalComponents/Scrollable/scrollable';
import { ConfigItem } from '../State/analysisState';

interface Props {
    tableConfig: ConfigItem[];
    updatePreference: (display: boolean, columnName: string, refreshTable?: boolean) => void;
}

interface State {
    buttonClicked: boolean;
    somethingHidden: boolean;
}

class PreferenceConfigComponent extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            buttonClicked: false,
            somethingHidden: false
        }
    }

    componentDidMount() {
        this.checkForHidden(this.props.tableConfig);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (this.props.tableConfig !== nextProps.tableConfig) {
            this.checkForHidden(nextProps.tableConfig);
        }
    }

    checkForHidden(tableConfig: ConfigItem[]) {
        this.setState({ somethingHidden: false });
        tableConfig.forEach((el: ConfigItem) => {
            if (!el.display) {
                this.setState({ somethingHidden: true });
            }
        })
    }

    getSelectedPreferenceCount = (tableConfig: ConfigItem[]) => {
        let count = tableConfig.filter((configName) => {
            return configName.display === true;
        }).length;
        return count;
    }

    render() {
        let { tableConfig, updatePreference } = this.props;
        let { buttonClicked, somethingHidden } = this.state;
        return (
            <div className={"docname-input"}>
                <span onClick={() => this.setState({ buttonClicked: !buttonClicked })} className="cursor-pointer float-left placeholder" style={this.getSelectedPreferenceCount(tableConfig) > 0 ? { width: '-webkit-fill-available', color: 'black' } : { width: '-webkit-fill-available' }}> {this.getSelectedPreferenceCount(tableConfig) > 0 ? <> {this.getSelectedPreferenceCount(tableConfig)} Selected </> : <>Select data points</>}
                    <i className={buttonClicked === true ? "fa fa-angle-up float-right" : "fa fa-angle-down float-right"}></i>
                </span>
                {/* <button type="button" style={{ border: somethingHidden ? '2px solid #88305F' : 'none' }} className="upload-yellow-btn configure-btn" onClick={() => this.setState({ buttonClicked: !buttonClicked })}>Configure
                   &nbsp;<img src="/static_images/config-arrow.svg" alt="down-arrow" />
                </button> */}
                {buttonClicked &&
                    <div className="preference-config-container" style={{ position: 'relative', width: '100%', top: '-0.5vh' }}>
                        <Scrollable maxHeight={260}>
                            {tableConfig.map((conf, i) =>
                                <div className="row config-item" key={i}>
                                    <div className="col-md-3 cursor-pointer" style={{ textAlign: 'left' }} onClick={() => updatePreference(!conf.display, conf.item, false)}>
                                        <span className="config-display">
                                            <img src={conf.display ? "/static_images/selected-preference.svg" : "/static_images/unselected-preference.svg"} alt="display" />
                                        </span>
                                    </div>
                                    <div className="col-md-9 pl-0" style={{ textAlign: 'left' }}>
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
}

export default PreferenceConfigComponent;