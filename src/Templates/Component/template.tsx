import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import SideNavbar from "../../UniversalComponents/SideNavbar/Container/sideNavBarCon";
import { History } from "history";
import "../Design/template.scss";
import ListView from "./ListView";
interface Props {
    history: History;
    pageWatcher: (page: string) => void;
}
const Template = (props: Props) => {
    console.log('template component');
    useEffect(() => {
        props.pageWatcher("templates");
    }, [])
    const [recentTemplate, setRecentTemplate] = useState([{ name: 'Template 1' }, { name: 'Template 1' }]);
    const generateTopHeader = () => {
        return (<>
            <h3>Templates</h3>
            <div className="row">
                <div className="col-md-6">
                    <div className="template-row">
                        <div className="template-count-box">
                            <p className="template-count">72</p>
                            <p className="margin-0">TOTAL TEMPLATES</p>
                        </div>
                        <div className="template-count-box">
                            <p className="template-count">72</p>
                            <p className="margin-0">SYSTEM TEMPLATES</p>
                        </div>
                        <div className="template-count-box">
                            <p className="template-count">72</p>
                            <p className="margin-0">MY TEMPLATES</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row justify-content-end" style={{ marginRight: '20px' }}>
                        <button type="button" className="btn btn-warning create-btn">+ Create Template</button>
                    </div>
                </div>
            </div>
        </>
        );
    }
    return (
        <div className="row">
            <div className="col-md-1" style={{ zIndex: 2 }}>
                <SideNavbar history={props.history} />
            </div>
            <div className="col-md-11 mt-6">
                {generateTopHeader()}
                <p className="mt-3">Recent</p>
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
                </div>
                {ListView()}
            </div>
        </div>
    )
};

export default Template;