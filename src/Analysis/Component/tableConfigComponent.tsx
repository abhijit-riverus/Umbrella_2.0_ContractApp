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

class TableConfigComponent extends Component<Props, State> {
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

    render() {
        let { tableConfig, updatePreference } = this.props;
        let { buttonClicked, somethingHidden } = this.state;
        return (
            <div className="col-md-1">
                <button type="button" style={{ border: somethingHidden ? '2px solid #88305F' : 'none' }} className="upload-yellow-btn configure-btn" onClick={() => this.setState({ buttonClicked: !buttonClicked })}>Configure
                   &nbsp;<img src="/static_images/config-arrow.svg" alt="down-arrow" />
                </button>
                {buttonClicked &&
                    <div className="config-container">
                        <Scrollable maxHeight={260}>
                            {tableConfig.map((conf, i) =>
                                <div className="row config-item" key={i}>
                                    <div className="col-md-9 pl-0">
                                        {conf.item}
                                    </div>
                                    <div className="col-md-3 cursor-pointer" style={{ textAlign: 'right' }} onClick={() => updatePreference(!conf.display, conf.item, true)}>
                                        <Tooltip title={conf.display ? 'Hide Column' : 'Show Column'} placement="right-end">
                                            <span className="config-display">
                                                <img src={conf.display ? "/static_images/display.svg" : "/static_images/display-hidden.svg"} alt="display" />
                                            </span>
                                        </Tooltip>
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

export default TableConfigComponent;