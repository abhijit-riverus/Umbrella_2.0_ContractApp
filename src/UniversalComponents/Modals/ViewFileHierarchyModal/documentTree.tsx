import React, { Component } from 'react'
import { FileHierarchy } from '../../../DocumentLibrary/State/documentLibraryState'

interface Props {
    documentChildren: FileHierarchy[];
    currentFileId: number;
    saveDocumentTree: (documentTree: FileHierarchy) => void;
}

interface State {
}


export default class DocumentTree extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
        }
    }   

    render(){
        let { documentChildren, currentFileId, saveDocumentTree } = this.props;
        return(
            <ul>
                {documentChildren.length > 0 && documentChildren.map((file, i) =>
                    <li key={i}>
                        <span className="document-tree-title-text cursor-pointer" style={{background: currentFileId === file.fileID ? '#FFF5D4' :'none' }} onClick={() => window.open('/document/documentlibrary/' + btoa(file.fileID.toString()), "_blank")}>
                            {file.fileName}
                        </span>
                        {file.children.length > 0 &&
                            <DocumentTree documentChildren={file.children} currentFileId={currentFileId} saveDocumentTree={saveDocumentTree} />
                        }
                    </li> 
                )}
            </ul>
        );
    }
}
