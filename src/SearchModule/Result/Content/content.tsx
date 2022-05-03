import * as React from 'react';
import { isNullOrUndefined } from 'is-what';

interface Props {
    content: string;
}

export default function Content(props: Props) {
    var { content } = props;
    if (!isNullOrUndefined(content)) {
        return (
            <div className="row">
                <div className="col-md-12 mt-3 content" dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        );
    } else {
        return (
            <div className="row"/>
        );
    }

}