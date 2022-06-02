import React, { useEffect, useRef, useState } from "react";
import SideNavbar from "../../UniversalComponents/SideNavbar/Container/sideNavBarCon";
import { History } from "history";
import "../Design/template.scss";
import ListView from "./ListView";
import { DialogActions, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem, Divider, TextField } from '@material-ui/core';
import { TemplateData } from "../State/templateState";

interface Props {
    history: History;
    pageWatcher: (page: string) => void;
}

const templateData: TemplateData[] = [
    { name: 'NDA Template (Mutual -Company Counterparty).docx', templateType: 'NDA', owner: ['Abhijit Barick'], lastUsed: '', createdOn: new Date().toDateString(), templateLink: "../../Assets/NDA_Template.docx" },
    { name: 'NDA_Template_2.docx', templateType: 'NDA', owner: ['Abhijit Barick'], lastUsed: '', createdOn: new Date().toDateString(), templateLink: "../../Assets/NDA_Template.docx" },
]

interface File {
    type: string;
    size: number;
    name: string;
}
const Template = (props: Props) => {
    useEffect(() => {
        props.pageWatcher("templates");
        setTempates([...templateData]);
    }, [])
    const [recentTemplate, setRecentTemplate] = useState([{ name: 'Template 1' }, { name: 'Template 1' }]);
    const [open, setOpen] = useState(false);

    const [selectTemplate, setSelectTemplate] = useState('');
    const [showTemplateForm, setShowTemplateForm] = useState(false);
    const [templateType, setTemplateType] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const fileInput = useRef<any>(null);
    const [templateName, setTemplateName] = useState('');
    const [templates, setTempates] = useState<TemplateData[]>([]);
    useEffect(() => {
        if (selectTemplate !== 'upload') {
            setShowTemplateForm(false);
        }
    }, [selectTemplate])


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleUpload = () => {
        fileInput.current.click();
    };

    const handleClose = () => {
        setUploadedFiles([]);
        setSelectTemplate('');
        setOpen(false);
    };

    const handleSelectTemplateFrom = (event: any) => {
        setSelectTemplate(event.target.value);
    };

    const handleTemplateType = (event: any) => {
        setTemplateType(event.target.value);
    }

    const handleTemplateName = (event: any) => {
        setTemplateName(event.target.value);
    }

    const handleSubmit = () => {
        if (selectTemplate == 'upload') {
            let template: TemplateData = { templateType: templateType, name: uploadedFiles[0].name, lastUsed: '', createdOn: new Date().toDateString(), owner: ['Abhijit Barick'], templateLink: "../../Assets/NDA_Template.docx" };
            setTempates([...templates, template]);
        }
        setUploadedFiles([]);
        setSelectTemplate('');
        setOpen(false);
    }
    const generateTopHeader = () => {
        return (<>
            <h3>Templates</h3>
            <div className="row mb-5">
                <div className="col-md-6">
                    <div className="template-row">
                        <div className="template-count-box">
                            <p className="template-count">2</p>
                            <p className="margin-0">TOTAL TEMPLATES</p>
                        </div>
                        <div className="template-count-box">
                            <p className="template-count">0</p>
                            <p className="margin-0">SYSTEM TEMPLATES</p>
                        </div>
                        <div className="template-count-box">
                            <p className="template-count">2</p>
                            <p className="margin-0">MY TEMPLATES</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row justify-content-end" style={{ marginRight: '20px' }}>
                        <button onClick={handleClickOpen} type="button" className="btn btn-warning create-btn">Request a Template</button>
                    </div>
                </div>
            </div>
        </>
        );
    }

    const handleOnChangeFileUpload = (post: any) => {
        let files_: File[] = [];
        const files = post.target.files;
        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                let file = post.target.files[i];
                let reader = new FileReader();
                if (file) {
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        files_.push({
                            name: file.name,
                            size: file.size,
                            type: file.type,
                        });
                    };
                }
            }
        }
        setShowTemplateForm(true);
        setUploadedFiles(files_);
        setTemplateName(files[0].name);
    };
    return (
        <div className="row">
            <div className="col-md-1" style={{ zIndex: 2 }}>
                <SideNavbar history={props.history} />
            </div>
            <div className="col-md-11 mt-6">
                {generateTopHeader()}
                {/* <p className="mt-3">Recent</p>
                <div className="row mb-3">
                    {recentTemplate.map((template) => (
                        <div className="col-md-2">
                            <div className="template-card p-2">
                                <div className="row">
                                    <div className="col-md-8">
                                        <p className="mb-0" style={{ color: '#88305F' }}>Template 1</p>
                                        <p className="mb-0" style={{ fontSize: '14px', color: '#666666' }}>NDA</p>
                                    </div>
                                    <div className="col-md-4 justify-content-end">
                                        <img className="template-icon" src="/static_images/template_icn-active.svg" alt="template_icn" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div> */}
                <ListView templateData={templates} />
            </div>
            <Dialog fullWidth={true} open={open} onClose={handleClose} aria-labelledby="customized-dialog-title">
                <DialogTitle id="customized-dialog-title">
                    <div className="row">
                        <div className="col-md-11">Request Form</div>
                        <div onClick={handleClose} className="col-md-1"><img src="/static_images/close-modal-icn.svg" alt="close_icon" /></div>
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                    <div className="row mb-3">
                        <div className="col-md-8">
                            <FormControl variant="outlined" className="formControl" fullWidth={true}>
                                <InputLabel id="demo-simple-select-outlined-label">Please create a template from</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={selectTemplate}
                                    onChange={handleSelectTemplateFrom}
                                    fullWidth={true}
                                    label="Please create a template from"
                                >
                                    <MenuItem value={'upload'}>Upload new template</MenuItem>
                                    <MenuItem value={'select'}>Select from Contract</MenuItem>
                                    <MenuItem value={'request'}>Request a template from Riverus</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="col-md-4 align-self-center">
                            {selectTemplate == 'upload' && <button onClick={handleUpload} type="button" className="btn btn-warning create-btn">Upload</button>}
                        </div>
                        <form encType="multipart/form-data">
                            <input
                                ref={fileInput}
                                style={{ visibility: "hidden", height: 0 }}
                                name="file"
                                id="file-input"
                                type="file"
                                accept=".pdf,.doc,.docx,.txt"
                                onChange={handleOnChangeFileUpload}
                            />
                        </form>
                    </div>
                    {showTemplateForm && <div className="row">
                        <div className="col-md-6">
                            <form className="formControl" noValidate>
                                <TextField onChange={handleTemplateName} fullWidth={true} id="outlined-basic" label="Template Name" value={templateName} variant="outlined" />
                            </form>
                        </div>
                        <div className="col-md-6">
                            <FormControl fullWidth={true} variant="outlined" className="formControl">
                                <InputLabel id="demo-simple-select-outlined-label">Template Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={templateType}
                                    onChange={handleTemplateType}
                                    label="Template Type"
                                >
                                    <MenuItem value={'NDA'}>NDA</MenuItem>
                                    <MenuItem value={'license'}>License Agreement</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>}
                    {selectTemplate == 'select' && <div className="row">
                        <div className="col-md-8">
                            <FormControl variant="outlined" className="formControl" fullWidth={true}>
                                <InputLabel id="demo-simple-select-outlined-label">Select from List of Contract</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    fullWidth={true}
                                    label="Select from List of Contract"
                                >
                                    <MenuItem value={'1'}>Contract 1</MenuItem>
                                    <MenuItem value={'2'}>Contract 2</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>}
                </DialogContent>
                <DialogActions>
                    <Button className="cancel-btn" onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <button onClick={handleSubmit} type="button" className="btn btn-warning create-btn save-btn">
                        Submit
                    </button>

                </DialogActions>
            </Dialog>
        </div>
    )
};

export default Template;