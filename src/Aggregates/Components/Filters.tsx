import React from 'react';
import { isNullOrUndefined } from 'is-what';
import { AggregateState, AppliedFilters } from '../State/AggregatesState';

export interface Props {
    filter: AggregateState;
    appliedFilters: AppliedFilters[];
    maxValue: number;
    showChildren: boolean;
    expandList: string[];
    isAlias: boolean;
    expanding: boolean;
    fromSearch: boolean;
    uniqueFileIds: number[];
    savedFilterArray: string[];
    addFilter: (filters: AppliedFilters[], path: string, type: string, operator: string, value: string, alias: string) => void;
    getAggregates: (value: string, level: number, type: string, path: string, fileId: number[]) => void;
    deleteFilter: (filters: AppliedFilters[], path: string) => void;
    expandAggregate: (name: string) => void;
    savedAppliedFilter: (savedFilterArray: string[]) => void;
}

export interface State {
    trimLength: number;
    selectedName: string;
    cwrpCount: boolean;
}

export default class Filters extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            trimLength: 10,
            selectedName: '',
            cwrpCount: false
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        if (!this.state.cwrpCount) {
            let saved = this.getSavedFilterList(this.props.appliedFilters);
            this.props.savedAppliedFilter(saved);
        }
        this.setState({ cwrpCount: true })
    }


    getSavedFilterList(appliedFilters: AppliedFilters[]) {
        let arr: string[] = [];
        for (let k = 1; k < appliedFilters.length; k++) {
            for (let j = 0; j < appliedFilters[k].v.length; j++) {
                arr.push(appliedFilters[k].v[j].a);
            }
        }
        return arr;
    }

    intermediate(forFilter: string, path: string, type: string, level: number) {
        if (this.props.expandList.indexOf(forFilter) === -1) {
            this.props.getAggregates(path + '//' + forFilter, level, type, path, this.props.uniqueFileIds);
        }
        this.props.expandAggregate(forFilter);
        this.getIndentation(type);
    }

    getIndentation(type: string) {
        let value = type.split('_')[1];
        return parseInt(value, 10);
    }

    addOrDeleteFilter() {
        let { filter, appliedFilters, deleteFilter, addFilter, savedFilterArray } = this.props;
        if (savedFilterArray.indexOf(filter.alias) > -1) {
            deleteFilter(appliedFilters, filter.path)
            // delete filter
        } else {
            addFilter(appliedFilters, filter.path, filter.type, 'AND', filter.value, filter.alias)
            // addd filter
        }
    }
    render() {
        let { filter, getAggregates, savedFilterArray, savedAppliedFilter, fromSearch, maxValue, expanding, addFilter, expandAggregate, expandList, isAlias, deleteFilter, appliedFilters, uniqueFileIds } = this.props;
        let children = [];
        if (filter.childrenCount) {
            if (!isNullOrUndefined(filter.children)) {
                if (filter.children.length > 0) {
                    for (let i = 0; i < filter.children.length; i++) {
                        let child = filter.children[i];
                        children.push(<Filters savedAppliedFilter={savedAppliedFilter} savedFilterArray={savedFilterArray} uniqueFileIds={uniqueFileIds} fromSearch={fromSearch} expanding={expanding}
                            isAlias={isAlias} expandAggregate={expandAggregate} expandList={expandList}
                            showChildren={true} deleteFilter={deleteFilter} addFilter={addFilter}
                            getAggregates={getAggregates} maxValue={maxValue} appliedFilters={appliedFilters} filter={child} />);
                    }
                }
            }
        }
        return (
            <div className="filters-outer" style={{ borderLeft: this.getIndentation(filter.type) > 0 ? '' : '' }} >
                <>
                    <ul className="filters">
                        <li className="filter-list" onClick={() => this.addOrDeleteFilter()}>
                            <span onMouseLeave={() => { this.setState({ trimLength: 10 }) }} onMouseEnter={() => { this.setState({ trimLength: filter.value.length }) }}>
                                <span className="mr-2">
                                    <img alt='active' src={savedFilterArray.indexOf(filter.alias) > -1 ? '/static_images/checkbox_active.svg' : '/static_images/checkbox_neutral.svg'} className="filter-select-asset cursor-pointer " />
                                </span>
                                {this.trimName(filter.alias, savedFilterArray.indexOf(filter.alias) > -1)}
                                        &nbsp;&nbsp;
                                        <span id={savedFilterArray.indexOf(filter.alias) > -1 ? 'filter-value-count-active' : 'filter-value-default'}> ({filter.countValue})  &nbsp;&nbsp;</span>
                                {filter.childrenCount > 0 && <a data-toggle="tooltip" title="Click here to expand" id="expand-icon">
                                    {(expandList.indexOf(filter.value) > -1 && expanding) ? <i className="fas fa-hourglass-start" /> :
                                        <img alt='alias' onClick={() => { this.intermediate(filter.alias, filter.path, filter.type, filter.level) }} style={{ color: 'black' }} className="cursor-pointer" src={expandList.indexOf(filter.value) > -1 ? '/static_images/filter-compress-icon.svg' : '/static_images/filter-expand-icon.svg'} />}
                                </a>}
                            </span>
                            <div className="filter-nanobar" style={{ width: this.setNanoBarWidth() }} />
                        </li>
                    </ul>
                </>
                <div className="col-md-12">
                    {expandList.indexOf(filter.value) > -1 && children.map((x, k) => <React.Fragment key={k}>{x}</React.Fragment>)}
                </div>
            </div>
        );
    }
    setNanoBarWidth() {
        return (this.props.filter.countValue / this.props.maxValue * 100) + '%';
    }
    trimName(name: string, active: boolean) {
        return (
            <span id={active ? 'filter-value-active' : 'filter-value-default'}>
                {this.state.trimLength === 10 && name.length > 12 ?
                    name.substring(0, this.state.trimLength) + '...' : name}
            </span>
        );
    }
}