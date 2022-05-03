import React, { Component } from 'react';
import FileLink from '../../../UniversalComponents/FileLink/fileLink';

interface Props {
    title: string;
    uniqueFileId: number;
}

export default class Title extends Component<Props> {
    render() {
        let { title, uniqueFileId } = this.props;
        return (
            <>
                <span className="title" dangerouslySetInnerHTML={{ __html: title }} onClick={() => window.open('/document/documentlibrary/' + btoa(uniqueFileId.toString()), "_blank")} />&nbsp;&nbsp;
                <img onClick={() => window.open('/document/documentlibrary/' + btoa(uniqueFileId.toString()), "_blank")} className="cursor-pointer" style={{ marginTop: '-3px' }}
                    src="/static_images/new-tab-purple-big.svg" alt="new tab" />
            </>
        );
    }
}