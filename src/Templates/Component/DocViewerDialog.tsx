import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import "../Design/template.scss"
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
interface Props {
    open: boolean;
    onClose: () => void;
}
const DocViewerDialog = (props: Props) => {

    const [open, setOpen] = useState(false);
    const [documents, setDocuments] = useState<any[]>([]);

    useEffect(() => {
        setOpen(props.open)
    }, [props.open]);

    useEffect(() => {
        setDocuments([{ uri: require('../../Assets/NDA_Template.docx') }])
    }, [])


    const handleClose = () => {
        setOpen(false);
        props.onClose();
    };
    return (
        <Dialog fullWidth={true} open={open} onClose={handleClose}>
            <DialogTitle>
                <div className="row">
                    <div className="col-md-11">Document Viewer</div>
                    <div onClick={handleClose} className="col-md-1 close-icn"><img src="/static_images/close-modal-icn.svg" alt="close_icon" /></div>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <DocViewer documents={documents} pluginRenderers={DocViewerRenderers} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Ok</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DocViewerDialog