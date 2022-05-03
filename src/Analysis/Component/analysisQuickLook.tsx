import React, { PureComponent, ReactNode } from 'react'
import QuickLookCard from '../../Upload/Component/quickLookCards'

interface Props {
    selectedFilter: string;
    selectFilter: (selectedFilter: string) => void;
    generalFilter: any;
}
interface State {
    filter: GeneralFilter[];
}

interface GeneralFilter {
    key: string;
    value: number;
}

export default class AnalysisQuickLook extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            filter: []
        }
    }
    componentDidMount() {
        let { generalFilter } = this.props;
        let filter: GeneralFilter[] = [];
        for (let k in generalFilter) {
            let data: GeneralFilter = {
                key: "",
                value: 0
            }
            data.key = k;
            data.value = generalFilter[k];
            filter.push(data)
        }
        this.setState({ filter: filter })
    }

    componentWillReceiveProps(NextProps: Props) {
        if (this.props.generalFilter !== NextProps.generalFilter) {
            let filter: GeneralFilter[] = [];
            for (let k in NextProps.generalFilter) {
                let data: GeneralFilter = {
                    key: "",
                    value: 0
                }
                data.key = k;
                data.value = NextProps.generalFilter[k];
                filter.push(data)
            }
            this.setState({ filter: filter })
        }
    }

    render() {
        let { selectedFilter, selectFilter } = this.props;
        let { filter } = this.state;
        return (
            <div className="row">
                {filter.map((data, i) =>
                    <div className="col-md-3" key={i}>
                        <QuickLookCard title={data.value.toString()} subTitle={data.key} selectedFilter={selectedFilter} selectFilter={selectFilter} isClickable={data.value > 0 ? true : false} />
                    </div>
                )}
            </div>
        )
    }
}
