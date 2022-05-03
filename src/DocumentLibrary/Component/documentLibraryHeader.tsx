import React, { Component, useState } from 'react';
import { BasicFileInfo } from '../State/documentLibraryState';
import { getTagIconPath } from './Utils/libraryUtils';

interface Props {
    filesAtRootLevel: BasicFileInfo[];
    saveMultipleSelectedFiles: (saveMultipleSelectedFiles: BasicFileInfo[]) => void;
    applySorting: (sort: string, order: string, titleOrder: boolean, dateOrder: boolean) => void;
    sortBy: string;
    titleOrder: boolean;
    dateOrder: boolean;
}

interface State {
    // sortBy: string;
    // titleOrder: boolean;
    // dateOrder: boolean;
    isActive: boolean;
}

export default class DocumentLibraryHeader extends Component < Props, State > {

    constructor(props: Props) {
        super(props)

        this.state = {
            // sortBy: 'date', // date or title
            // titleOrder: true, // false == descending or true == ascending
            // dateOrder: false, // false == descending or true == ascending
            isActive: false,
        }

    }

    setSorting = (sortBy: string, titleOrder: boolean, dateOrder: boolean) => {
        // let { sortBy, titleOrder, dateOrder } = this.props;
        let { applySorting } = this.props;
        switch(sortBy){
            case 'date': {
                if(dateOrder === true){
                    applySorting(sortBy, 'ascending', titleOrder, dateOrder);
                    break;
                } else {
                    applySorting(sortBy, 'descending', titleOrder, dateOrder);
                    break;
                }
            }
            case 'title': {
                if(titleOrder === true){
                    applySorting(sortBy, 'ascending', titleOrder, dateOrder);
                    break;
                } else {
                    applySorting(sortBy, 'descending', titleOrder, dateOrder);
                    break;
                }
            }
        }
    }

    render(){
    let { saveMultipleSelectedFiles, filesAtRootLevel, titleOrder, dateOrder, sortBy } = this.props;
    let { isActive} = this.state;
    // const [isActive, setActive] = useState(false);
    return (
        <>
        {/* // <div className="row">
        //     <div className="col-md-12">
                // <div className="col-md-12 library-header-container"> */}
                    {/* <div className="col-md-12 mb-1 px-0"> */}
                    <div className="col-md-3 document-library-sorting-option" >
                        <div className="row">
                            <div className="col-md-2 pr-0">
                                <input type="checkbox" id="all_files" value="all_files" checked={isActive === true ? true : false} 
                                onChange={(e) => saveMultipleSelectedFiles(onToggleCheckbox(isActive, filesAtRootLevel, () => this.setState({isActive: !isActive})))} />
                            </div>
                            <div className="col-md-10 pl-0 cursor-pointer" onClick={() => this.setSorting('title', !titleOrder, false)}>
                                <label className={"cursor-pointer"} htmlFor={"all_files"} >
                                    &nbsp;Title&nbsp;{ sortBy === 'title' ? 
                                    titleOrder === false
                                        ? <img className="cursor-pointer" src="/static_images/up-arrow.svg" />
                                        : <img src="/static_images/down-arrow.svg" />
                                    : <></>
                                    }
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 document-library-non-sorting-option ml-2" style={{marginBottom: '.5rem'}}>
                        Parties
                    </div>
                    <div className='col-md-1 pl-2 document-library-sorting-option cursor-pointer' style={{marginBottom: '.5rem'}} 
                    onClick={() => this.setSorting('date', false, !dateOrder)}>
                        Start date&nbsp;{ sortBy === 'date' ? 
                            dateOrder === false
                            ? <img src="/static_images/up-arrow.svg" />
                            : <img src="/static_images/down-arrow.svg" />
                            : <></>
                            }
                    </div>
                    <div className='col-md-4 document-library-non-sorting-option' style={{marginBottom: '.5rem'}}>
                        Tags
                    </div>
                    <div className='col-md-1 document-library-non-sorting-option' style={{marginBottom: '.5rem'}}>
                        Actions
                    </div>
                    {/* <div className="col-md-9">
                        <span className="mr-5">
                            Actions
                                </span>
                        <span className="mr-4">
                            Tags
                                </span>
                        <span className="mr-4">
                            <img src={getTagIconPath(1)} />&nbsp;Nature
                                </span>
                        <span className="mr-4">
                            <img src={getTagIconPath(2)} />&nbsp;Type
                                </span>
                        <span className="mr-4">
                            <img src={getTagIconPath(3)} />&nbsp;Group
                                </span>
                    </div> */}
                {/* // </div>
        //     </div>

        // </div> */}
        </>

    );
    }
}

function onToggleCheckbox(isChecked: boolean, filesAtRootLevel: BasicFileInfo[], setActive: any) {
    let editedIds: BasicFileInfo[] = [];
    if (isChecked === true) {
        editedIds = [];
    } else {
        editedIds = filesAtRootLevel;
    }
    setActive();
    return editedIds;
}

