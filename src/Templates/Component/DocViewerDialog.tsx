import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react'
import "../Design/template.scss"
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { generateDocument } from './DocGenerate';
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
    const title = useRef<HTMLInputElement>(null);
    const party1 = useRef<HTMLInputElement>(null);
    const party2 = useRef<HTMLInputElement>(null);
    const party1address = useRef<HTMLInputElement>(null);
    const party2address = useRef<HTMLInputElement>(null);
    const date = useRef<HTMLInputElement>(null);
    const durationNum = useRef<HTMLInputElement>(null);
    const [durationLength, setDurationLength] = useState('');
    const confidentDurationNum = useRef<HTMLInputElement>(null);
    const [confidentDurationLength, setconfidentDurationLength] = useState('');
    const solicitDurationNum = useRef<HTMLInputElement>(null);
    const [solicitDurationLength, setsolicitDurationLength] = useState('');
    const country1 = useRef<HTMLInputElement>(null);
    const country2 = useRef<HTMLInputElement>(null);
    const [isInvalidParty, setInvalidParty] = useState(false);
    const [isInvalidPartyAdd, setInvalidPartyAdd] = useState(false);
    const [isError, setError] = useState(false);

    const discnotduration = useRef<HTMLInputElement>(null);
    const [discnotdurationLength, setdiscnotdurationLength] = useState('');

    const jurisdiction = useRef<HTMLInputElement>(null);
    const signatory1name = useRef<HTMLInputElement>(null);
    const signatory1designation = useRef<HTMLInputElement>(null);
    const signatory2name = useRef<HTMLInputElement>(null);
    const signatory2designation = useRef<HTMLInputElement>(null);

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

    const handleError = () => {
        let party = party1.current!.value;
        let partyAdd = party1address.current!.value
        if (party.length > 100) {
            setInvalidParty(true);
        } else {
            setInvalidParty(false);
        }
        if (partyAdd.length > 200) {
            setInvalidPartyAdd(true);
        } else {
            setInvalidPartyAdd(false);
        }
        if (party.length > 10 || partyAdd.length > 20) {
            setError(true);
        } else setError(false);
    }

    const handleSubmit = () => {
        let json: any = {
            Title: title.current?.value,
            party1: party1.current?.value,
            party1address: party1address.current?.value,
            party2: party2.current?.value,
            party2address: party2address.current?.value,
            contractstartdate: date.current?.value,
            contractduration: durationNum.current?.value + ' ' + durationLength,
            confidentialityduration: confidentDurationNum.current?.value + ' ' + confidentDurationLength,
            nonsolicitationduration: solicitDurationNum.current?.value + ' ' + solicitDurationLength,
            country1: country1.current?.value,
            country2: country2.current?.value,
            discnotcduration: discnotduration.current?.value,
            jurisdiction: jurisdiction.current?.value,
            signatory1name: signatory1name.current?.value,
            signatory1designation: signatory1designation.current?.value,
            signatory2name: signatory2name.current?.value,
            signatory2designation: signatory2designation.current?.value
        };

        if (isError) {
            return;
        }
        console.log(json);
        generateDocument(json, require("../../Assets/NDA_Template_3.docx"), props.fileName.split(".")[0]);
    }

    const setDuration = (event: any) => {
        setDurationLength(event.target.value);
    }

    const setConfidentDuration = (event: any) => {
        setconfidentDurationLength(event.target.value);
    }

    const setsolicitDuration = (event: any) => {
        setsolicitDurationLength(event.target.value);
    }

    const setdiscnotcduration = (event: any) => {
        setdiscnotdurationLength(event.target.value);
    }

    return (
        <Dialog fullScreen={true} fullWidth={true} open={open} onClose={handleClose}>
            <DialogTitle>
                <div className="row">
                    <div className="col-md-11">{props.type == 'template' ? 'Template View' : 'Contract Draft View'}</div>
                    <div onClick={handleClose} className="col-md-1 close-icn"><img src="/static_images/close-modal-icn.svg" alt="close_icon" /></div>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <div className="row">
                    <div className="col-md-6">
                        <div>
                            <p>{props.fileName}</p>
                        </div>
                        {props.type == 'template' &&
                            <div className="card mb-3">
                                <div className="card-header">
                                    Basic Information
                                </div>
                                <div className="card-body">
                                    <form>
                                        {/* <div className="form-group">
                                        <label>Title</label>
                                        <input ref={title} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    </div> */}
                                        <div className="form-group">
                                            <label>Enter the name of the first party to the contract</label>
                                            <input onChange={handleError} ref={party1} type="string" className={`form-control ${isInvalidParty ? 'is-invalid' : ''}`} id="exampleInputEmail1" aria-describedby="emailHelp" required />
                                            {isInvalidParty && <div id="validationServer03Feedback" className="invalid-feedback">
                                                Text should not be greater than 100 chars.
                                            </div>}
                                        </div>
                                        <div className="form-group">
                                            <label>Enter the address of Party 1</label>
                                            <input onChange={handleError} ref={party1address} type="text" className={`form-control ${isInvalidPartyAdd ? 'is-invalid' : ''}`} id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            {isInvalidPartyAdd && <div id="validationServer03Feedback" className="invalid-feedback">
                                                Text should not be greater than 200 chars.
                                            </div>}
                                        </div>
                                        <div className="form-group">
                                            <label>Enter the name of the second party to the contract</label>
                                            <input ref={party2} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        </div>
                                        <div className="form-group">
                                            <label>Enter the address of Party 2</label>
                                            <input ref={party2address} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        </div>
                                        <div className="form-group">
                                            <label>Enter the country in which the first party is incorporated</label>
                                            <input ref={country1} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        </div>
                                        <div className="form-group">
                                            <label>Enter the country in which the second party is incorporated</label>
                                            <input ref={country2} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        }
                        {
                            props.type == 'draft' && <form>
                                <div className="form-group">
                                    <label htmlFor="">Start Date</label>
                                    <input ref={date} type="date" name="date" id="date" className="form-control" />
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
                        {props.type == 'template' &&
                            <div className="card mb-3">
                                <div className="card-header">
                                    Term
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                            <label>Enter the date of commencement of the obligations of the parties to the contract</label>
                                            <input ref={date} type="date" className="form-control" name="date" id="date" />
                                        </div>
                                        <label htmlFor="">Enter the duration for which the contract is valid</label>
                                        <div className="input-group mb-3">
                                            <input ref={durationNum} type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            <div className="input-group-append">
                                                <FormControl style={{ 'minWidth': '104px' }} variant="outlined">
                                                    <InputLabel id="demo-simple-select-label">Duration</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={durationLength}
                                                        label="Duration"
                                                        onChange={setDuration}
                                                    >
                                                        <MenuItem value={'Month(s)'}>Month</MenuItem>
                                                        <MenuItem value={'Year(s)'}>Year</MenuItem>
                                                        <MenuItem value={'Days'}>Day(s)</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>
                                        <label htmlFor="">Enter duration of the period upto which confidentiality is required to be maintained</label>
                                        <div className="input-group mb-3">
                                            <input ref={confidentDurationNum} type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            <div className="input-group-append">
                                                <FormControl style={{ 'minWidth': '104px' }} variant="outlined">
                                                    <InputLabel id="demo-simple-select-label">Duration</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={confidentDurationLength}
                                                        label="Duration"
                                                        onChange={setConfidentDuration}
                                                    >
                                                        <MenuItem value={'Month(s)'}>Month</MenuItem>
                                                        <MenuItem value={'Year(s)'}>Year</MenuItem>
                                                        <MenuItem value={'Days'}>Day(s)</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>
                                        <label htmlFor="">Enter the period for which non solicitation covenant shall remain in force</label>
                                        <div className="input-group mb-3">
                                            <input ref={solicitDurationNum} type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            <div className="input-group-append">
                                                <FormControl style={{ 'minWidth': '104px' }} variant="outlined">
                                                    <InputLabel id="demo-simple-select-label">Duration</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={solicitDurationLength}
                                                        label="Duration"
                                                        onChange={setsolicitDuration}
                                                    >
                                                        <MenuItem value={'Month(s)'}>Month</MenuItem>
                                                        <MenuItem value={'Year(s)'}>Year</MenuItem>
                                                        <MenuItem value={'Days'}>Day(s)</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>
                                        <label htmlFor="">Enter the duration of advance notice to be given in case Receiving Party needs to disclose any confidential information pursuant to a court order</label>
                                        <div className="input-group mb-3">
                                            <input ref={discnotduration} type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            <div className="input-group-append">
                                                <FormControl style={{ 'minWidth': '104px' }} variant="outlined">
                                                    <InputLabel id="demo-simple-select-disabled-label">Duration</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-disabled-label"
                                                        id="demo-simple-select-disabled"
                                                        value='hours'
                                                        label="Duration"
                                                        onChange={setdiscnotcduration}
                                                    >
                                                        <MenuItem value={'hours'}>Hours</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        }
                        {props.type == 'template' &&
                            <>
                                <div className="card mb-3">
                                    <div className="card-header">
                                        Governing Law
                                        &    Jurisdiction
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="form-group">
                                                <label>Enter the place whose courts or tribunals will have jurisdiction to decide any legal dispute arising out of the contract</label>
                                                <input ref={jurisdiction} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            </div>

                                        </form>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header">
                                        Signatory Details
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="form-group">
                                                <label>Enter the name of the first signatory to the contract</label>
                                                <input ref={signatory1name} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            </div>
                                            <div className="form-group">
                                                <label>Enter the designation of the first signatory to the contract</label>
                                                <input ref={signatory1designation} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            </div>
                                            <div className="form-group">
                                                <label>Enter the name of the second signatory to the contract</label>
                                                <input ref={signatory2name} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            </div>
                                            <div className="form-group">
                                                <label>Enter the designation of the second signatory to the contract</label>
                                                <input ref={signatory2designation} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </>
                        }
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
                                disableHeader: false,
                                disableFileName: false,
                                retainURLParams: false
                            }
                        }} documents={documents} pluginRenderers={DocViewerRenderers} />
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Ok</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DocViewerDialog