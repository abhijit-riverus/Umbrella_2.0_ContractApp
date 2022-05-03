import React from 'react';
import HashLoader from "react-spinners/HashLoader";

interface Props {
    count: number;
    countLoader: boolean;
    searchLoader: boolean;
    filterLoader: boolean;
    searchTerm: string;
}

export default function SearchModuleHeader(props: Props) {
    let { count, searchTerm, countLoader, searchLoader, filterLoader } = props;
    return (
        <div className="row">
            <div className="col-12 mt-5 mb-2 results-for">
                <div className="row" >
                    {(filterLoader || searchLoader || countLoader) ? <HashLoader size={20} color={'#88305F'} /> : <span style={{ fontWeight: 'bold' }}>{count}</span>}&nbsp;&nbsp;
                    <span>Results for</span> &nbsp;
                    <span style={{ fontWeight: 'bold' }}>'{searchTerm}'</span>&nbsp;
                </div>
            </div>
        </div>
    );
}