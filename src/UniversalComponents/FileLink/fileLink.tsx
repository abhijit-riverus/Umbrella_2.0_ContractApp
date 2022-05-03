import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    fileId: number;
    title: string;
    newTab: boolean;
}

export default class FileLink extends React.Component<Props, {}> {
    render() {
        var { title, fileId, newTab } = this.props;
        if (fileId === 0) {
            return (
                <span>{this.props.children}</span>
            );
        } else {
            return (
                <Link target={newTab ? '_blank' : ''} to={'/caseview/' + encodeURIComponent(title) + '/' + btoa('fileId=' + fileId)}>
                    {this.props.children}
                </Link>
            );
        }

    }
}