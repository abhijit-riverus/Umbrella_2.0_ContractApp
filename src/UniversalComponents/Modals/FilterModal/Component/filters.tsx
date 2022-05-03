import * as React from 'react';
import { AdvancedFilter, AdvancedFilterChild } from '../../../../Analysis/State/analysisState';
import { generateFilterHighlightArray } from '../../../../Utils/GeneralUtil/genUtils';
import Scrollable from '../../../Scrollable/scrollable';

interface Props {
    advancedFilters: AdvancedFilter[];
    generateFilterStructure: (childLabel: string, activeValue: string) => void;
    resetFlag: boolean;
    setResetFlag: (resetFlag: boolean) => void;
    sendFilterHighlights: (filterHighlights: string[]) => void;
}

interface State {
    clickedFilterList: string[];
    activeJurisdiction: string;
    filterHighlights: string[];
}

export default class Filters extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            clickedFilterList: [],
            activeJurisdiction: '',
            filterHighlights: []
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        let { resetFlag, advancedFilters, sendFilterHighlights } = nextProps;
        if (this.props.resetFlag !== resetFlag && resetFlag) {
            this.setState({ clickedFilterList: [] })
        }
        if (this.props.advancedFilters !== advancedFilters) {
            this.setState({ filterHighlights: generateFilterHighlightArray(advancedFilters) });
            sendFilterHighlights(generateFilterHighlightArray(advancedFilters));
        }
    }

    render() {
        let { advancedFilters } = this.props;
        let { clickedFilterList, filterHighlights } = this.state;
        return (
            <>
                <div className="row">
                    <div className="col-md-12 col-12">
                        <div className="col-md-12 filter-header">
                            Filters
                        </div>
                    </div>
                </div>
                {advancedFilters.length > 0 && advancedFilters.map((filter: AdvancedFilter, i: number) =>
                    <div className="row" key={i}>
                        <div className="col-md-12 col-12">
                            <div className="col-md-12 ind-filter-header" onClick={() => this.pushFilters(filter.label)}
                                style={{ borderLeft: filterHighlights.includes(filter.label) ? '4px solid #996C84' : 'none' }}>
                                {filter.label}
                                <img src="/static_images/ind-filter-arrow.svg" alt="arrow" style={{ transform: clickedFilterList.indexOf(filter.label) !== -1 ? 'rotate(180deg)' : 'none' }} />
                            </div>
                            {clickedFilterList.indexOf(filter.label) !== -1 && filter.value.map((ind: AdvancedFilterChild, i: number) =>
                                <div key={i}>
                                    <div className="col-md-12 ind-filter-list">
                                        {ind.childLabel}&nbsp;:
                                    {this.renderChildren(filter.label, ind.childLabel, ind.childValue, ind.activeValue)}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </>
        );
    }

    pushFilters(label: string) {
        let { clickedFilterList } = this.state;
        let clicked = clickedFilterList;
        let filterIndex = clickedFilterList.indexOf(label);
        if (filterIndex !== -1) {
            clicked.splice(filterIndex, 1);
            this.setState({ clickedFilterList: clicked });
        } else {
            clicked.push(label);
            this.setState({ clickedFilterList: clicked });
        }
    }

    selectFilter = (childLabel: string, ch: string) => {
        let { generateFilterStructure, setResetFlag } = this.props;
        setResetFlag(false);
        generateFilterStructure(childLabel, ch);
    }

    renderChildren(parentLabel: string, childLabel: string, childValue: string[], activeValue: string) {
        switch (childLabel) {
            case 'Jurisdiction': {
                return (
                    <div className="mt-2">
                        <Scrollable maxHeight={200}>
                            {childValue.map((ch: string, i: number) =>
                                <div key={i} className="ind-filter-items" onClick={() => this.selectFilter(childLabel, activeValue === ch ? '' : ch)}>
                                    <img src={activeValue === ch ? "/static_images/radio-active.svg" : "/static_images/radio-inactive.svg"} alt="filter-icn" />&nbsp;&nbsp;
                                <span>{ch}</span>
                                </div>
                            )}
                        </Scrollable>
                    </div>
                )
            }
            default: {
                return (
                    <span className="switch-container ml-4">
                        {childValue.map((ch: string, i: number) =>
                            <span key={i} className="switch-filter-items" onClick={() => this.selectFilter(childLabel === 'Present' ? parentLabel : childLabel, ch)}>
                                <span className={activeValue === ch ? "switch-active" : "switch-inactive"}>{ch}</span>
                            </span>
                        )}
                    </span>
                )
            }
        }
    }
}