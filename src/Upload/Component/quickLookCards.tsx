import React, { Component } from 'react';

interface Props {
    title: string;
    subTitle: string;
    selectedFilter: string;
    selectFilter: (selectedFilter: string) => void;
    isClickable: boolean;
    source?: string;
}

export const SubTitle: any = {
    "totalUploads": "Total Uploads",
    "processed": "Processed",
    "uploadSize": "Upload Size",
    "all": "Document",
    "noForceMajeure": "No Force Majeure",
    "noAssignment": "No Assignment",
    "totalDocuments": "Total Documents",
    // "allDocuments": "Total Documents",
    "unreviewed": "Unreviewed",
    "reviewed": "Reviewed",
    "withTasks": "With Tasks",
    "withoutTasks": "Without Tasks",
}

export default class QuickLookCard extends Component<Props> {
    selectFilter = (filter: string) => {
        let { isClickable, selectFilter } = this.props;
        if (isClickable) {
            selectFilter(filter)
        }
    }
    render() {
        let { title, subTitle, selectedFilter, selectFilter, isClickable, source } = this.props;
        return (
            <div className="row">
                <div className={!isClickable ? "col-md-12 quick-look-card-container-disable" : selectedFilter === subTitle ? "col-md-12 quick-look-card-container-active" : "col-md-12 quick-look-card-container"} 
                onClick={() => this.selectFilter(subTitle)} style={source === 'documentLibrary' ? { maxWidth: '58%', padding: '2% 3%' } : {}}>
                    <div className="row">
                        <div className="col-md-12 quick-look-title">
                            {title}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 quick-look-sub-title mt-2">
                            {SubTitle[subTitle]}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}