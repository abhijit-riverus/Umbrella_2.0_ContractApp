import * as React from 'react';
export interface Props {
    handleChange: (type: string) => void;
    sortType: string;
    sortTypeList: string[];
    isMobile: boolean;
}

const displayDictionary: any = {
    'name': 'Name',
    'relevance': 'Relevance'
};
const iconDictionary: any = {
    'relevance': {
        'active': '/static_images/latest_active.svg',
        'inactive': '/static_images/latest_inactive.svg'
    },
    'name': {
        'active': '/static_images/popularity_active.svg',
        'inactive': '/static_images/popularity_inactive.svg'
    }
};

export default class SortBar extends React.Component<Props, {}> {
    intermediate(type: string) {
        if (type === this.props.sortType) {
            return;
        } else {
            this.props.handleChange(type);
        }
    }
    render() {
        let { sortType, isMobile } = this.props;
        if (isMobile) {
            return (
                <div className="col-12">
                    <div className="row sorting-card" >
                        <div className="col-2 pr-0" id="sort-row">
                            Sort by:
                        </div>
                        <div className="col-10" id="sort-row">
                            <div className="row">
                                {this.props.sortTypeList.map((sort, i) =>
                                    <div className="col-3" key={i} style={{ display: 'inline-flex', marginRight: i === 0 ? '9%' : '0' }}>
                                        <img alt='icon' src={this.props.sortType === sort ? iconDictionary[sort]['active'] : iconDictionary[sort]['inactive']} />
                                        <span className="sort-menus mx-1" style={{ color: sortType === sort ? '#2B518E' : '#6D6E71' }}
                                            onClick={() => { this.intermediate(sort); }}>{displayDictionary[sort]}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="col-md-12">
                    <div className="row sorting-card" >
                        <div className="col-md-1" id="sort-row">
                            Sort by:
                    </div>
                        <div className="col-md-11" id="sort-row">
                            <div className="row">
                                {this.props.sortTypeList.map((sort, i) =>
                                    <div className="col-md-2" key={i} style={{ textAlign: 'center' }}>
                                        <img alt='icon' src={this.props.sortType === sort ? iconDictionary[sort]['active'] : iconDictionary[sort]['inactive']} />&nbsp;&nbsp;
                                     <span className="sort-menus" style={{ color: sortType === sort ? '#2B518E' : '#6D6E71' }} onClick={() => { this.intermediate(sort); }}>{displayDictionary[sort]}</span>
                                    </div>
                                )}
                                <div className="col-md-5" />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}