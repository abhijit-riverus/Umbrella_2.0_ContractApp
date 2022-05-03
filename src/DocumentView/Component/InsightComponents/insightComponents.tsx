import React, { Component } from 'react';
import { Child } from '../../State/documentState';
import AuthoritiesInsights from './authoritiesInsights';
import PartiesInsights from './partiesInsights';
import TagInsights from './tagInsights';

interface Props {
    label: string;
    insight: Child[];
    fileId: Number;
}

export default class InsightComponents extends Component<Props> {
    render() {
        let { label, insight } = this.props;
        switch (label) {
            case 'Tags': {
                return <TagInsights tags={insight} fileId={this.props.fileId} />;
            }
            case 'Contracting Parties': {
                return <PartiesInsights parties={insight} />;
            }
            case 'Consent Authority': {
                return <AuthoritiesInsights authorities={insight} />;
            }
            default: {
                return <div />;
            }
        }
    }
}
