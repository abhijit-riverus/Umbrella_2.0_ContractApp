import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, Tab, Tabs, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SideNavbar from "../../UniversalComponents/SideNavbar/Container/sideNavBarCon";
import "../Design/draft.scss";
import { ContractData } from "../State/DraftState";
import DraftListView from "./DraftListView";

interface Props {
    history: History;
    pageWatcher: (page: string) => void;
}

interface Project {
    name: string;
}

interface CounterParty {
    orgName: string;
    orgContactName: string;
    email: string;
}

interface Signatory {
    contactName: string;
    email: string;
}

const DraftComponent = (props: Props) => {
    useEffect(() => {
        props.pageWatcher("draftingreview");
    }, []);

    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);
    const [selectContractFrom, setSelectContractFrom] = useState('exec');
    const [projects, setProjects] = useState<Project[]>([{ name: '' }]);
    const [counterParties, setCounterParties] = useState<CounterParty[]>([{ orgContactName: '', orgName: '', email: "" }]);
    const [signatories, setSignatories] = useState<Signatory[]>([{ contactName: '', email: '' }]);
    const [draftContracts, setDraftContracts] = useState<ContractData[]>([]);
    const [contractName, setContractName] = useState('');
    const [contractType, setContractType] = useState('');
    const [deadline, setDeadline] = useState('');

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };
    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    const handleClose = () => {
        setOpen(false);
        setProjects([{ name: 'nda' }]);
        setCounterParties([{ orgContactName: '', orgName: '', email: "" }])
        setSignatories([{ contactName: '', email: '' }]);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSelectContractFrom = (event: any) => {
        setSelectContractFrom(event.target.value);
    };
    const generateTopHeader = () => {
        return (<>
            <h3>Drafting and Review</h3>
            <div className="row mb-5">
                <div className="col-md-8">
                    <div className="draft-row">
                        <div className="draft-count-box">
                            <p className="draft-count">70</p>
                            <p className="margin-0">TOTAL CONTRACTS</p>
                        </div>
                        <div className="draft-count-box">
                            <p className="draft-count">20</p>
                            <p className="margin-0">MY CONTRACTS</p>
                        </div>
                        <div className="draft-count-box">
                            <p className="draft-count">35</p>
                            <p className="margin-0">APPROVED</p>
                        </div>
                        <div className="draft-count-box">
                            <p className="draft-count">15</p>
                            <p className="margin-0">APPROVED</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="row justify-content-end" style={{ marginRight: '20px' }}>
                        <button onClick={handleClickOpen} type="button" className="btn btn-warning create-btn">+ Start a Draft</button>
                    </div>
                </div>
            </div>
        </>
        );
    }

    function TabPanel(props: any) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box p={0}>
                        <div>{children}</div>
                    </Box>
                )}
            </div>
        );
    }

    const handleProjectType = (event: any, index: number) => {
        let data = [...projects];
        data[index].name = event.target.value;
        setProjects(data);
    }

    const addProjects = () => {
        let newField: Project = { name: '' }
        setProjects([...projects, newField]);
    }

    const deleteProject = (index: number) => {
        let data = [...projects];
        data.splice(index, 1);
        setProjects(data);
    }

    const handleOrgName = (event: any, index: number) => {
        let data = [...counterParties];
        data[index].orgName = event.target.value;
        setCounterParties(data);
    }

    const handleContactName = (event: any, index: number) => {
        let data = [...counterParties];
        data[index].orgContactName = event.target.value;
        setCounterParties(data);
    }
    const handleEmail = (event: any, index: number) => {
        let data = [...counterParties];
        data[index].email = event.target.value;
        setCounterParties(data);
    }

    const addCounterParty = () => {
        let newField: CounterParty = { orgContactName: '', orgName: '', email: "" };
        setCounterParties([...counterParties, newField]);
    }

    const deleteCounterParty = (index: number) => {
        let data = [...counterParties];
        data.splice(index, 1);
        setCounterParties(data);
    }

    const addSignatory = () => {
        let newField: Signatory = { contactName: '', email: '' };
        setSignatories([...signatories, newField])
    }

    const handleSignatoryContact = (event: any, index: number) => {
        let data = [...signatories];
        data[index].contactName = event.target.value;
        setSignatories(data);
    }

    const handleSignatoryEmail = (event: any, index: number) => {
        let data = [...signatories];
        data[index].email = event.target.value;
        setSignatories(data);
    }

    const handleContractName = (event: any) => {
        setContractName(event.target.value);
    }

    const handleContractType = (event: any) => {
        setContractType(event.target.value);
    }

    const handleDeadline = (event: any) => {
        console.log(event.target);
        setDeadline(event.target.value);
    }

    const handleSubmit = () => {
        if (selectContractFrom == 'exec') {
            let draftContract: ContractData = {
                projectName: projects.map((project) => project.name),
                contractName: contractName,
                contractType: contractType,
                counterPartyName: counterParties.map(party => party.orgContactName),
                owner: ['Abhijit Barick'],
                created: new Date().toLocaleDateString(),
                status: '',
                deadline: new Date(deadline).toLocaleDateString()
            }
            setDraftContracts([...draftContracts, draftContract]);
        }
        handleClose();
    }
    return (
        <div className="row">
            <div className="col-md-1" style={{ zIndex: 2 }}>
                <SideNavbar history={props.history} />
            </div>
            <div className="col-md-11 mt-6">
                {generateTopHeader()}
                <div className="ROOT">
                    <AppBar position="static">
                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                            <Tab disableRipple label="All" {...a11yProps(0)} />
                            <Tab disableRipple label="Completed" {...a11yProps(1)} />
                            <Tab disableRipple label="In-progress" {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <DraftListView draftContractData={draftContracts} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <DraftListView draftContractData={draftContracts} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <DraftListView draftContractData={draftContracts} />
                    </TabPanel>
                </div>
            </div>
            <Dialog scroll={'paper'} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    <div className="row">
                        <div className="col-md-6">
                            Contract Drafting Form
                        </div>
                        <div className="col-md-5">
                            <div className="row">
                                <span className="col-md-7">Created By </span>
                                <div className="col-md-5">
                                    <div className="avatar-circle-sm" >
                                        <span style={{ top: "0" }} className="initials">AB</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div onClick={handleClose} className="col-md-1">
                            <img src="/static_images/close-modal-icn.svg" alt="close_icon" />
                        </div>
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        Create Contract from
                    </DialogContentText>
                    <div className="row mb-3">
                        <div className="col-md-8">
                            <FormControl variant="outlined" className="formControl" fullWidth={true}>
                                <InputLabel id="demo-simple-select-outlined-label">Create Contract from</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={selectContractFrom}
                                    onChange={handleSelectContractFrom}
                                    fullWidth={true}
                                    label="Create Contract from"
                                >
                                    <MenuItem value={'exec'}>Executed Contract</MenuItem>
                                    <MenuItem value={'earlierDraft'}>Earlier Draft</MenuItem>
                                    <MenuItem value={'template'}>Template</MenuItem>
                                    <MenuItem value={'upload'}>Upload New</MenuItem>
                                    <MenuItem value={'blank'}>Blank</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="col-md-4 align-self-center">
                            {selectContractFrom == 'upload' && <button type="button" className="btn btn-warning create-btn">Upload</button>}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-8">
                            {(selectContractFrom == 'earlierDraft' || selectContractFrom == 'exec') && <div>
                                <DialogContentText>
                                    Select Contract
                                </DialogContentText>
                                <FormControl variant="outlined" className="formControl" fullWidth={true}>
                                    <InputLabel id="demo-simple-select-outlined-label">Select Contract</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        fullWidth={true}
                                        label="Select Contract"
                                        value={contractName}
                                        onChange={handleContractName}
                                    >
                                        <MenuItem value={'Contract 1'}>Contract 1</MenuItem>
                                        <MenuItem value={'Contract 2'}>Contract 2</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>}
                            {selectContractFrom == 'template' && <div>
                                <DialogContentText>
                                    Select Template
                                </DialogContentText>
                                <FormControl variant="outlined" className="formControl" fullWidth={true}>
                                    <InputLabel id="demo-simple-select-outlined-label">Create Template</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        fullWidth={true}
                                        label="Create Template"
                                    >
                                        <MenuItem value={'Template 1'}>Template 1</MenuItem>
                                        <MenuItem value={'Template 2'}>Template 2</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>}
                            {selectContractFrom == 'blank' && <div>
                                <DialogContentText>Name the draft</DialogContentText>
                                <TextField value={contractName} onChange={handleContractName} fullWidth={true} id="outlined-basic" label="Enter Name" variant="outlined" />
                            </div>}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-8">
                            <DialogContentText>Type</DialogContentText>
                            <FormControl variant="outlined" className="formControl" fullWidth={true}>
                                <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    fullWidth={true}
                                    label="Type"
                                    onChange={handleContractType}
                                    value={contractType}
                                >
                                    <MenuItem value={'NDA'}>NDA</MenuItem>
                                    <MenuItem value={'License Agreement'}>License Agreement</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="row">
                                <DialogContentText className="col-md-10">Project</DialogContentText>
                                <div className="col-md-2"><Button onClick={addProjects} color="secondary">+ Add</Button></div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-9">
                            {projects.map((project, index) => (
                                <div key={index} className="row">
                                    <div className="col-md-11">
                                        <TextField onChange={(event) => handleProjectType(event, index)} value={project.name} fullWidth={true} className="mb-2" id="outlined-basic" label="Project name" variant="outlined" />
                                    </div>
                                    {projects.length > 1 && <div className="col-md-1">
                                        <img onClick={() => deleteProject(index)} className="delete-icon" src="/static_images/checklist-delete-icn.svg" alt="close_icon" />
                                    </div>}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="row">
                                <DialogContentText className="col-md-10">Details of Counter Parties</DialogContentText>
                                <div className="col-md-2"><Button onClick={addCounterParty} color="secondary">+ Add</Button></div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-9">
                            {counterParties.map((party, index) => (
                                <div className="row" key={index}>
                                    <div className="col-md-1">{index + 1}.</div>
                                    <div className="col-md-10">
                                        <TextField onChange={(event) => handleOrgName(event, index)} value={party.orgName} fullWidth={true} className="mb-2" id="outlined-basic" label="Organisation name" variant="outlined" />
                                        <TextField onChange={(event) => handleContactName(event, index)} value={party.orgContactName} fullWidth={true} className="mb-2" id="outlined-basic" label="Contact name" variant="outlined" />
                                        <TextField onChange={(event) => handleEmail(event, index)} value={party.email} fullWidth={true} className="mb-2" id="outlined-basic" label="E-mail" variant="outlined" />
                                    </div>
                                    {counterParties.length > 1 && <div className="col-md-1">
                                        <img onClick={() => deleteCounterParty(index)} className="delete-icon" src="/static_images/checklist-delete-icn.svg" alt="close_icon" />
                                    </div>}
                                </div>
                            ))}

                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-8">
                            <DialogContentText>Collaborators</DialogContentText>
                            <div className="row">
                                <div className="col-md-2"><Button color="secondary">+ Add</Button></div>
                                <div className="col-md-10"><div className="avatar-circle-sm" >
                                    <span className="initials">AB</span>
                                </div></div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-8">
                            <DialogContentText>Approvers</DialogContentText>
                            <div className="row">
                                <div className="col-md-2"><Button color="secondary">+ Add</Button></div>
                                <div className="col-md-10"><div className="avatar-circle-sm" >
                                    <span className="initials">AB</span>
                                </div></div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-8">
                            <div className="row">
                                <DialogContentText className="col-md-10">Signatories</DialogContentText>
                                <div onClick={addSignatory} className="col-md-2"><Button color="secondary">+ Add</Button></div>
                            </div>
                            {signatories.map((signatory, index) => (
                                <div className="row" key={index}>
                                    <div className="col-md-1">{index + 1}.</div>
                                    <div className="col-md-11">
                                        <TextField onChange={(event) => handleSignatoryContact(event, index)} value={signatory.contactName} fullWidth={true} className="mb-2" id="outlined-basic" label="Contact name" variant="outlined" />
                                        <TextField onChange={(event) => handleSignatoryEmail(event, index)} value={signatory.email} fullWidth={true} className="mb-2" id="outlined-basic" label="E-mail" variant="outlined" />
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-8">
                            <DialogContentText>Deadline</DialogContentText>
                            <TextField value={deadline} onChange={handleDeadline} type={"date"} fullWidth={true} className="mb-2" id="outlined-basic" variant="outlined" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-8">
                            <DialogContentText>Notify</DialogContentText>
                            <div className="row">
                                <div className="col-md-2"><Button color="secondary">+ Add</Button></div>
                                <div className="col-md-10"><div className="avatar-circle-sm" >
                                    <span className="initials">AB</span>
                                </div></div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button className="cancel-btn" onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <button onClick={handleSubmit} type="button" className="btn btn-warning create-btn save-btn">Save</button>
                </DialogActions>
            </Dialog>
        </div>
    )
};


export default DraftComponent;