import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import "../Design/template.scss"
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
interface Props {
    open: boolean;
    onClose: () => void;
    templateLink: any;
    fileName: string;
    type: string;
}
const DocViewerDialog = (props: Props) => {

    const [open, setOpen] = useState(false);
    const [documents, setDocuments] = useState<any[]>([]);

    useEffect(() => {
        if (props.fileName.includes('Template')) {
            setDocuments([{ uri: require('../../Assets/NDA_Template.pdf') }]);
        } else {
            setDocuments([{ uri: require('../../Assets/Consultancy_agreement_template.pdf') }]);
        }
    }, [props.templateLink, props.fileName])

    useEffect(() => {
        setOpen(props.open)
    }, [props.open]);



    const handleClose = () => {
        setOpen(false);
        props.onClose();
    };
    return (
        <Dialog fullScreen={true} fullWidth={true} open={open} onClose={handleClose}>
            <DialogTitle>
                <div className="row">
                    <div className="col-md-11">Document Viewer</div>
                    <div onClick={handleClose} className="col-md-1 close-icn"><img src="/static_images/close-modal-icn.svg" alt="close_icon" /></div>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <div>
                    <p>{props.fileName}</p>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card mb-3">
                            <div className="card-header">
                                <h5>Basic Details</h5>
                            </div>
                            <div className="card-body">
                                {props.type == 'template' && <form>
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    </div>
                                    <div className="form-group">
                                        <label>Contracting Party 1</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    </div>
                                    <div className="form-group">
                                        <label>Contracting Party 1 Address</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    </div>
                                    <div className="form-group">
                                        <label>Contracting Party 2</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    </div>
                                    <div className="form-group">
                                        <label>Contracting Party 2 Address</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    </div>
                                </form>}
                                {
                                    props.type == 'draft' && <form>
                                        <div className="form-group">
                                            <label htmlFor="">Start Date</label>
                                            <input type="date" name="date" id="date" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>Contracting Party 1</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        </div>
                                        <div className="form-group">
                                            <label>Legal Entity 1 Registration Number</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        </div>
                                        <div className="form-group">
                                            <label>Incorporation Country</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        </div>
                                        <div className="form-group">
                                            <label>Contracting Party 1 Address</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        </div>
                                        <div className="form-group">
                                            <label>Contracting Party 2</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        </div>
                                        <div className="form-group">
                                            <label>Legal Entity 2 Registration Number</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        </div>
                                        <div className="form-group">
                                            <label>Contracting Party 2 Address</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        </div>
                                    </form>
                                }
                            </div>
                        </div>
                        {props.type == 'template' && <div className="card">
                            <div className="card-header">
                                <h5>Term</h5>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Start Date</label>
                                        <input type="date" className="form-control" name="date" id="date" />
                                    </div>
                                    <div className="form-group">
                                        <label>Duration</label>
                                        <input type="date" className="form-control" name="date" id="date" />
                                    </div>
                                </form>
                            </div>
                        </div>}
                        {props.type == 'draft' && <div className='card mb-3'>
                            <div className="card-header">
                                <h5>Termination</h5>
                            </div>
                            <div className="card-body">
                                <form >
                                    <div className="form-group">
                                        <div className="form-group">
                                            <label>Termination Event</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        }
                        {props.type == 'draft' && <div className='card mb-3'>
                            <div className="card-header">
                                <h5>Non Compete Clause</h5>
                            </div>
                            <div className="card-body">
                                <form >
                                    <label htmlFor="">Duration</label>
                                    <div className="input-group">
                                        <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        <div className="input-group-append">
                                            <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">Dropdown</button>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="#">Month</a>
                                                <a className="dropdown-item" href="#">Year</a>
                                                <a className="dropdown-item" href="#">Day(s)</a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        }
                        {props.type == 'draft' && <div className='card mb-3'>
                            <div className="card-header">
                                <h5>Non Solicitation Clause</h5>
                            </div>
                            <div className="card-body">
                                <form >
                                    <label htmlFor="">Duration</label>
                                    <div className="input-group">
                                        <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        <div className="input-group-append">
                                            <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">Dropdown</button>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="#">Month</a>
                                                <a className="dropdown-item" href="#">Year</a>
                                                <a className="dropdown-item" href="#">Day(s)</a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        }
                    </div>
                    <div className="col-md-6">
                        <DocViewer config={{
                            header: {
                                disableFileName: true,
                                retainURLParams: false
                            }
                        }} documents={documents} pluginRenderers={DocViewerRenderers} />
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Ok</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DocViewerDialog