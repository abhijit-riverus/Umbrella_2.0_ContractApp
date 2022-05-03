import React, { Component } from 'react';
import { isNullOrUndefined } from 'is-what';
import { CheckList } from "../State/taskManagementState";


interface Props{
    checkList: CheckList[];
    insertCheckListItem: (item: string) => void;
    updateCheckListItem: (title: string, flag: boolean, updateType: string, id: number, editedTitle:string, index: number) => void;
}

interface State {
    isCompleted: boolean;
    currentTitle: string;
    enableEditMode: boolean;
    editTitle: string;
    editId: number;
    editIndex: number;
}

class Checklist extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        
        this.state = {
            isCompleted: false,
            currentTitle: '',
            editTitle: '',
            editId: 0,
            enableEditMode: false,
            editIndex: 0
        }
    }

    componentDidMount() {
        document.addEventListener('mouseup', this.handleOutsideClick, false)
    }

    handleOutsideClick = (e: MouseEvent) => {
        let outsideDiv = document.getElementById('checklist-input');
        if (!isNullOrUndefined(outsideDiv)) {
            if (e.target !== outsideDiv) {
                if(this.state.enableEditMode === true){
                        this.props.updateCheckListItem('',false, 'title', this.state.editId, this.state.editTitle, this.state.editIndex);
                        this.setState({editTitle: '', enableEditMode: false, editId: 0, editIndex: 0});
                } else {
                    if (this.state.currentTitle.length > 0) {
                        this.props.insertCheckListItem(this.state.currentTitle);
                        this.setState({currentTitle: ''})
                    }
                }
            }
        }
    }
    
    handleKeyBoard = (e: React.KeyboardEvent) => {
        let { currentTitle, isCompleted } = this.state;
        let { insertCheckListItem } = this.props;
        if (e.keyCode === 13) {
            if (currentTitle.length > 0) {
                insertCheckListItem(currentTitle);
                this.setState({currentTitle: ''})
            }
        }
    }

    handleKeyBoardForEditMode = (e: React.KeyboardEvent, index: number) => {
        let { editTitle, editId } = this.state;
        let { updateCheckListItem } = this.props;
        if (e.keyCode === 13) {
            if (editTitle.length > 0) {
                updateCheckListItem('',false, 'title', editId, editTitle, index);
                this.setState({editTitle: '', enableEditMode: false, editId: 0});
            }
        }
    }

    //checklist-delete-icn
    render() {
        let { checkList, insertCheckListItem, updateCheckListItem } = this.props;
        let { isCompleted, currentTitle, enableEditMode, editTitle, editId, editIndex } = this.state;

        return (
            <div className="col-md-12" id="checklist-container">
                <div className="col-md-12 pl-0">
                    <span className="label">Checklist</span>
                </div>
                    { checkList.length > 0 && checkList.map((item: CheckList, index: number) =>
                    item.title !== null && item.delete === false &&
                        <div className="col-md-12 pl-0 mt-2" style={{ }}>
                            <div className="col-md-12 round-checkbox">
                                <div className="col-md-1 p-0">
                                    <input type="checkbox" 
                                    id={"checkbox"+index} 
                                    onClick={(e) => updateCheckListItem(item.title,(e.target as HTMLInputElement).checked, 'checkbox', 0, '', index)}
                                    checked={item.flag}
                                    />
                                    <label htmlFor={"checkbox"+index}></label>
                                </div>
                                {/* <div className="col-md-11 p-0" style={{left: '-10px'}}>
                                    <input type="text" id="checklist-input"
                                    className="task-title-input float-left mr-1"
                                    placeholder="Add an item" 
                                    value={editTitle === '' ? item.title : editTitle} 
                                    onKeyDown={(e: any) => this.handleKeyBoard(e)} 
                                    onChange={(e) => this.setState({ editTitle: e.currentTarget.value })}
                                    />
                                </div> */}

                                <div className="col-md-10 p-0" style={{left: '-10px'}}>
                                    { enableEditMode === true
                                    ? editIndex === index
                                        ?
                                        <input type="text" id="checklist-input" className="task-title-input float-left mr-1"
                                            placeholder="Add an item" value={editTitle} 
                                            onKeyDown={(e: any) => this.handleKeyBoardForEditMode(e, index)} 
                                            onChange={(e) => this.setState({ editTitle : e.currentTarget.value })}
                                        />
                                        :
                                        <span id="checklist-item"
                                        className="task-title-input float-left mr-1"
                                        style={{textDecoration: item.flag === true ? 'line-through' : 'none'}} >{item.title}</span>
                                    :
                                    <span id="checklist-item"
                                    className="task-title-input float-left mr-1"
                                    style={{textDecoration: item.flag === true ? 'line-through' : 'none'}} 
                                    onClick={()=> this.setState({enableEditMode: !enableEditMode, editId: item.id, editTitle: item.title, editIndex: index}, () => document.getElementById('checklist-input')?.focus())}
                                    >{item.title}</span>
                                 }
                                </div>
                                <div className="col-md-1 cursor-pointer" onClick={(e)=> updateCheckListItem(item.title,(e.target as HTMLInputElement).checked, 'delete', item.id, '', index)}>
                                <img src="/static_images/checklist-delete-icn.svg" alt="close" />
                                </div>
                            </div>
                        </div>
                    )}
                <div className="col-md-12 pl-0 mt-2" style={{ }}>
                    <div className="col-md-12 round-checkbox">
                        <div className="col-md-1 p-0">
                            <input type="checkbox" 
                            id="checkbox" 
                            disabled/>
                            <label htmlFor="checkbox"></label>
                        </div>
                        <div className="col-md-11 p-0" style={{left: '-10px'}}>
                            <input type="text" id="checklist-input"
                            className="task-title-input float-left mr-1"
                            placeholder="Add an item" 
                            value={currentTitle} 
                            onKeyDown={(e: any) => this.handleKeyBoard(e)} 
                            onChange={(e) => this.setState({ currentTitle: e.currentTarget.value })}
                            />
                        </div>
                        
                    </div> 
                </div>
            </div>
        );
    }
}

export default Checklist;