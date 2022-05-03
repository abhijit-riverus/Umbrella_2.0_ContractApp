import React from "react";
import { LibraryTagFilterStructure } from "../../State/documentLibraryState";


interface Props {
    initialFileIds: number[];
    getDocumentHierarchy: (sort: string, order: string, fileIds: number[]) => void;
    applyLibraryTagFilters: (appliedLibraryTagFilters: LibraryTagFilterStructure[], initialFileIds: number[]) => void;
}

interface State {
    
}

export class NoFiltersMatched extends React.Component<Props, State> {
    
    constructor(props: Props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <div className="row">
                <div className="col-md-12 mt-5 text-center">
                    <div className="empty-filter-tag-message">No files found containing the tag </div>
                    <img className="img-fluid" src="/static_images/empty-filters-img.svg" alt="no-filters-matched" />
                    <div className="empty-filters-message">Try reducing the number of filters applied</div>
                    <div className="reset-filters-tag cursor-pointer" onClick={()=> this.resetTagFilters()} >Reset filters</div>
                </div>
            </div>
        );
    }

    resetTagFilters(){
        let {initialFileIds} = this.props;
        this.props.applyLibraryTagFilters([], initialFileIds);
    }
}