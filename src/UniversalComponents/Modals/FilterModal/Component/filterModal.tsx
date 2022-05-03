import * as React from 'react';
import Filters from './filters';
import FiltersCount from './filtersCount';
import { AdvancedFilter, FilterStructure } from '../../../../Analysis/State/analysisState';
import Scrollable from '../../../Scrollable/scrollable';
import { createFilterStructure, createAuxInterface, IntermediateFilterStructure } from '../../../../Utils/GeneralUtil/genUtils';

interface Props {
    initialFileIds: number[];
    fileIds: number[];
    advancedFilters: AdvancedFilter[];
    getAdvancedFilters: (fileIds: number[]) => void;
    applyAdvancedFilters: (fileIds: number[], filterStructure: FilterStructure) => void;
    count: number;
    filterIconClicked: boolean;
    saveAppliedFilters: (auxArray: IntermediateFilterStructure[]) => void;
    resetFlag: boolean;
    setResetFlag: (resetFlag: boolean) => void;
    savedAppliedFilter: IntermediateFilterStructure[];
    saveAdvancedFilterStructure: (advancedFilterStructure: FilterStructure) => void;
}

interface State {
    initialFilterStructure: FilterStructure;
    filterHighlights: string[];
}

export default class FilterModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            initialFilterStructure: {
                i: 'filter',
                o: 'AND',
                v: []
            },
            filterHighlights: []
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        let { getAdvancedFilters, fileIds, filterIconClicked } = this.props;
        if (filterIconClicked !== nextProps.filterIconClicked) {
            getAdvancedFilters(fileIds);
            this.setState({ initialFilterStructure: { i: '', o: 'AND', v: [] } })
        }
    }

    render() {
        let { advancedFilters, count, fileIds, applyAdvancedFilters, getAdvancedFilters, initialFileIds, resetFlag, setResetFlag } = this.props;
        let { filterHighlights } = this.state;
        return (
            <div className="col-md-12 col-12">
                <div className="modal" id="filterModal" aria-labelledby="filterModal" aria-hidden="true" data-backdrop="false">
                    <div className="modal-dialog modal-dialog-centered my-0" style={{ maxWidth: '97%' }}>
                        <div className="modal-content" style={{ paddingRight: '35px' }}>
                            <div className="row">
                                <div className="col-md-12">
                                    <Scrollable maxHeight={600}>
                                        <div className="row">
                                            <div className="col-md-7 mt-5 ml-4">
                                                <Filters advancedFilters={advancedFilters} resetFlag={resetFlag} setResetFlag={setResetFlag} sendFilterHighlights={(filterHighlights: string[]) => this.setState({ filterHighlights: filterHighlights })}
                                                    generateFilterStructure={(childLabel: string, activeValue: string) => this.generateFilterStructure(childLabel, activeValue)} />
                                            </div>
                                            <div className="col-md-4 mt-5 ml-4" style={{ position: 'fixed', right: '5%' }}>
                                                <FiltersCount initialFileIds={initialFileIds} count={count} fileIds={fileIds} applyAdvancedFilters={applyAdvancedFilters} filterHighlights={filterHighlights}
                                                    getAdvancedFilters={getAdvancedFilters} closeModal={() => this.clickApplyButton()}
                                                    setResetFlag={(reset: boolean) => { setResetFlag(reset); this.setState({ initialFilterStructure: { i: 'filter', o: 'AND', v: [] } }) }} />
                                            </div>
                                        </div>
                                    </Scrollable>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img className="cross-btn" src="/static_images/hide-filter-modal.svg" alt="hide-filter" data-dismiss="modal" style={{ marginLeft: '50%', marginTop: '-15px' }} onClick={() => window.location.reload()} />
                </div>
            </div>
        );
    }

    generateFilterStructure = (childLabel: string, activeValue: string) => {
        let { initialFilterStructure } = this.state;
        let { applyAdvancedFilters, fileIds, saveAdvancedFilterStructure } = this.props;
        let aux = initialFilterStructure;
        let toBePushed = createFilterStructure(initialFilterStructure, childLabel, activeValue)
        aux.v = toBePushed;
        applyAdvancedFilters(fileIds, aux);
        saveAdvancedFilterStructure(aux);
    }

    clickApplyButton = () => {
        let { advancedFilters, saveAppliedFilters } = this.props;
        let auxArray = createAuxInterface(advancedFilters);
        saveAppliedFilters(auxArray);
    }
}