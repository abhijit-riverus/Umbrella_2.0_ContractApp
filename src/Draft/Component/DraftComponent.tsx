import React, { useEffect } from "react";
import SideNavbar from "../../UniversalComponents/SideNavbar/Container/sideNavBarCon";
import "../Design/draft.scss";
import DraftListView from "./DraftListView";

interface Props {
    history: History;
    pageWatcher: (page: string) => void;
}

const DraftComponent = (props: Props) => {
    useEffect(() => {
        props.pageWatcher("draftingreview");
    }, []);

    const generateTopHeader = () => {
        return (<>
            <h3>Drafting and Review</h3>
            <div className="row mb-5">
                <div className="col-md-6">
                    <div className="draft-row">
                        <div className="draft-count-box">
                            <p className="draft-count">72</p>
                            <p className="margin-0">TOTAL TEMPLATES</p>
                        </div>
                        <div className="draft-count-box">
                            <p className="draft-count">72</p>
                            <p className="margin-0">SYSTEM TEMPLATES</p>
                        </div>
                        <div className="draft-count-box">
                            <p className="draft-count">72</p>
                            <p className="margin-0">MY TEMPLATES</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row justify-content-end" style={{ marginRight: '20px' }}>
                        <button type="button" className="btn btn-warning create-btn">+ Start a Draft</button>
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
                {DraftListView()}
            </div>
        </div>
    )
};


export default DraftComponent;