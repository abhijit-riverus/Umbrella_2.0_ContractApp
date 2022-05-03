import React from 'react';
import { AppliedFilters } from '../State/AggregatesState';

interface Props {
    childFilters: AppliedFilters[];
    isChild: boolean;
    path: string;
    deleteFilter: (path: string) => void;
}

export default class ChildFilter extends React.Component<Props> {

    render() {
        let { childFilters, isChild, path, deleteFilter } = this.props;
        return (
            <div style={{ display: 'inline-flex' }}>
                {childFilters.map((type, i) =>
                    <div key={i} className="my-2">
                        <div id={!isChild ? "searched-query" : ""} className="tag-basic-btn btn">
                            {type.v.length === 0 ? type.a : type.i}
                            <span onClick={() => deleteFilter(path + '/' + type.i)} className="pl-2 cursor-pointer">
                                <img src="/static_images/filter-delete-icon.svg" alt='delete' />
                            </span>
                            {type.v.length > 0 && <ChildFilter deleteFilter={deleteFilter} path={path + '/' + type.i} childFilters={type.v} isChild={true} />}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}