import * as React from 'react';
import { FilterStructure } from '../../../../Analysis/State/analysisState';

interface Props {
    initialFileIds: number[];
    count: number;
    fileIds: number[];
    getAdvancedFilters: (fileIds: number[]) => void;
    applyAdvancedFilters: (fileIds: number[], filterStructure: FilterStructure) => void;
    closeModal: () => void;
    setResetFlag: (resetFlag: boolean) => void;
    filterHighlights: string[];
}

interface State {
    resetFlag: boolean;
}

export default class FiltersCount extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            resetFlag: false
        }
    }

    render() {
        let { count, filterHighlights } = this.props;
        if (filterHighlights.length === 0) {
            return (
                <div className="row">
                    <div className="col-md-12 filter-count-header" style={{ lineHeight: '70px' }}>
                        <img src="/static_images/no-preference-icn.svg" style={{ padding: '2%' }} /> &nbsp;&nbsp;
                        Select some preferences to get started...
                    </div>
                </div>
            )
        } else {
            return (
                <>
                    <div className="row">
                        <div className="col-md-12 filter-count-header" style={{ lineHeight: '55px' }}>
                            <img src="/static_images/preference-icn.svg" style={{ padding: '2%', textAlign: 'left' }} /> &nbsp;&nbsp;
                                <span className="filter-count">{count}</span>&nbsp;&nbsp;Results
                                <hr className="count-hr" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 filter-count-header py-3" style={{ display: 'flex', justifyContent: 'center' }}>
                            {count > 0 ? <button className="upload-yellow-btn" data-dismiss="modal" onClick={() => this.clickApply()}>Apply</button>
                                :
                                <button disabled className="upload-disable-btn">Apply</button>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 filter-count-header mt-2" style={{ display: 'flex', justifyContent: 'center' }}>
                            <span className="reset-filter cursor-pointer" onClick={() => this.resetFilter()}>Reset Filters</span>
                        </div>
                    </div>
                </>
            )
        }
    }

    resetFilter = () => {
        let { getAdvancedFilters, applyAdvancedFilters, initialFileIds, setResetFlag } = this.props;
        applyAdvancedFilters(initialFileIds, { i: 'filter', o: 'AND', v: [] });
        getAdvancedFilters(initialFileIds);
        this.setState({ resetFlag: true });
        setResetFlag(true);
    }

    clickApply() {
        let { closeModal, count } = this.props;
        if (count > 0) {
            closeModal();
        }
    }
}