import React, { PureComponent, ReactNode } from 'react'
import QuickLookCard from '../../Upload/Component/quickLookCards'

interface Props {
    selectedFilter: string;
    selectFilter: (selectedFilter: string) => void;
    generalFilter: any;
    initialFileidsCount: number;
}
interface State {
    filter: GeneralFilter[];
}

interface GeneralFilter {
    key: string;
    value: number;
}

export default class DocumentLibraryQuickLook extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            filter: []
        }
    }
    componentDidMount() {
        let { generalFilter } = this.props;
        let filter: GeneralFilter[] = [];
        let data : GeneralFilter = {
            key: "totalDocuments",
            value: this.props.initialFileidsCount
        }
        filter.push(data);
        for (let k in generalFilter) {
            let data: GeneralFilter = {
                key: "",
                value: 0
            }
            if(k !== 'allDocuments'){
                data.key = k;
                data.value = generalFilter[k];
                filter.push(data)
            }
        }
        this.setState({ filter: filter })
    }

    componentWillReceiveProps(NextProps: Props) {
        if (this.props.generalFilter !== NextProps.generalFilter) {
            let filter: GeneralFilter[] = [];
            let data : GeneralFilter = {
                key: "totalDocuments",
                value: this.props.initialFileidsCount
            }
            filter.push(data);
            for (let k in NextProps.generalFilter) {
                let data: GeneralFilter = {
                    key: "",
                    value: 0
                }
                if(k !== 'allDocuments'){
                data.key = k;
                data.value = NextProps.generalFilter[k];
                filter.push(data);
                }
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
                    <div className="col-md-2" key={i} style={{ right: i > 0 ? i * 3 + 'vw' : '' }}>
                        <QuickLookCard title={data.value.toString()} subTitle={data.key} selectedFilter={selectedFilter} selectFilter={selectFilter} 
                        isClickable={data.key === 'totalDocuments' ? false : data.value > 0 ? true : false} source={'documentLibrary'} />
                    </div>
                )}
            </div>
        )
    }
}
