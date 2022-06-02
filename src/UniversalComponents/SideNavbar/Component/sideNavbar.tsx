import React, { Component } from 'react';
import { History } from 'history';
import { capitalizeFirstLetter } from '../../../Utils/DataModifierUtil/dataModUtil';
import { STYLLUS, UMBRELLA } from '../../HeimdallChild/Actions/definitions';
import { platform } from 'os';

interface Props {
    pageType: string;
    history: History;
    platform: string;
    gotoStyllus: () => void;
}

interface IconState {
    icon: string;
    name: string;
    text: string;
}

interface State {
    iconsList: IconState[];
    selectedTab: string;
    styllusIconsList: IconState[];
}

export class SideNavbar extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            iconsList: [
                {
                    icon: '/static_images/dashboard-icn.svg',
                    name: 'dashboard',
                    text: 'Monitor your contracts here'
                },
                {
                    icon: '/static_images/tasks-icn.svg',
                    name: 'tasks',
                    text: 'Manage your tasks here'
                },
                {
                    icon: '/static_images/document-library-icn.svg',
                    name: 'documentlibrary',
                    text: 'Access Document Library here'
                },
                {
                    icon: '/static_images/clause-library-icn.svg',
                    name: 'clauselibrary',
                    text: 'Access Clause Library here'
                },
                {
                    icon: '/static_images/addfiles-icn.svg',
                    name: 'addfiles',
                    text: 'Upload new files here'
                }, {
                    icon: '/static_images/uploads-icn.svg',
                    name: 'uploads',
                    text: 'Access your processed files here'
                },
                /*  {
                     icon: '/static_images/analysis-icn.svg',
                     name: 'analysis',
                     text: 'Get macro insights using filters here'
                 }, */
                {
                    icon: '/static_images/analysis-icn.svg',
                    name: 'analysis',
                    text: 'Get macro insights using filters here'
                },
                {
                    icon: '/static_images/reports-icn.svg',
                    name: 'reports',
                    text: 'View your reports here'
                }
            ],
            selectedTab: props.pageType,
            styllusIconsList: [
                {
                    icon: '/static_images/draft-icn.svg',
                    name: 'draftingreview',
                    text: 'Manage your drafts here'
                },
                {
                    icon: '/static_images/clause-library.svg',
                    name: 'clauselibrary',
                    text: 'Access Clause Library here'
                },
                {
                    icon: '/static_images/template_icn.svg',
                    name: 'templates',
                    text: 'Manage your template here'
                },
                {
                    icon: '/static_images/dictionary-icn.svg',
                    name: 'dataDictionary',
                    text: 'Manage your template here'
                },
                {
                    icon: '/static_images/approval-icn.svg',
                    name: 'approvals',
                    text: 'Manage your template here'
                },
                {
                    icon: '/static_images/signature-icn.svg',
                    name: 'signatures',
                    text: 'Manage your template here'
                }
            ],
        };
    }

    componentDidMount() {
        if (window.location.href.includes('templates') || window.location.href.includes('draftingreview')) {
            this.props.gotoStyllus();
        }
    }

    setClassName(iconName: string) {
        let className = '';
        if (iconName == 'clauselibrary') {
            className = 'sidenav-title p-3 ht-79';
        } else if (iconName == 'dataDictionary' || iconName == 'signatures') {
            className = 'sidenav-title p-3 pt-0';
        } else if (iconName == 'approvals') {
            className = "sidenav-title p-3 pt-0 ht-59";
        } else className = "sidenav-title p-3";

        if (iconName == this.props.pageType) {
            className = className.replace('sidenav-title', 'sidenav-title-active');
        }
        return className;
    }
    render() {
        let { iconsList, styllusIconsList } = this.state;
        let { pageType, platform } = this.props;
        switch (pageType) {
            case 'document': {
                return (
                    // <div className="row" >
                    <div className="pl-0 sidenav-layout" style={{ width: '3.5%', zIndex: 2 }}>
                        <div>
                            <div className="mt-4 sidenav-theme">
                                {iconsList.map((icon, i) =>
                                    <div key={i}>
                                        <div className="tooltip sidenav-title-layout cursor-pointer">
                                            <span className="tooltiptext" style={{ width: 'max-content' }}>{icon.text}</span>
                                            <div id="collapsed-menubar" className={icon.name === pageType ? "sidenav-title-active p-3" : "sidenav-title p-3"} onClick={() => this.selectTab(icon.name)}>
                                                <img src={icon.name === pageType ? icon.icon.replace('.svg', '-active.svg') : icon.icon} alt="navbar-img" /><br />
                                            </div>
                                            {/* {i === 3 && <hr style={{ border: '0.5px solid #D3D3D3' }}></hr>} */}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    // </div>
                );
            }
            default: {
                return (
                    <div className="row" >
                        <div className="col-md-1 pl-0 sidenav-layout">
                            <div className="row">
                                <div className="col-md-12 mt-4 sidenav-theme">
                                    {platform == UMBRELLA && iconsList.map((icon, i) =>
                                        <div className="row" key={i}>
                                            <div className="col-md-12 tooltip sidenav-title-layout cursor-pointer">
                                                <span className="tooltiptext">{icon.text}</span>
                                                <div className={(pageType === 'documentlibrary' || pageType === 'clauselibrary') && icon.name === pageType ? 'sidenav-title-active p-1' : icon.name === pageType ? "sidenav-title-active p-3" : (icon.name === 'documentlibrary' || icon.name === 'clauselibrary') ? "sidenav-title p-1" : "sidenav-title p-3"} onClick={() => this.selectTab(icon.name)}>
                                                    <span><img src={icon.name === pageType ? icon.icon.replace('.svg', '-active.svg') : icon.icon} alt="navbar-img" /></span><br />
                                                    <span className={icon.name === pageType ? 'sidenav-text-active' : 'sidenav-text'}>{capitalizeFirstLetter(icon.name)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {platform == STYLLUS && styllusIconsList.map((icon, i) =>
                                        <div className="row" key={i}>
                                            <div className="col-md-12 tooltip sidenav-title-layout cursor-pointer">
                                                <span className="tooltiptext">{icon.text}</span>
                                                <div className={this.setClassName(icon.name)} onClick={() => (icon.name == 'templates' || icon.name == 'draftingreview') && this.selectTab(icon.name)}>
                                                    <span><img src={icon.name === pageType ? icon.icon.replace('.svg', '-active.svg') : icon.icon} alt="navbar-img" /></span><br />
                                                    <span className={icon.name === pageType ? 'sidenav-text-active' : 'sidenav-text'}>{capitalizeFirstLetter(icon.name)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
    }
    selectTab = (name: string) => {
        this.setState({ selectedTab: name });
        // name === 'addfiles' ? window.location.href = "/addfiles" : this.props.history.push('/' + name.toLowerCase())
        name === 'addfiles' || name === 'dashboard' ? window.location.href = "/" + name : this.props.history.push('/' + name.toLowerCase())

    }
}

//menu Item
// iconsList: [{
//     icon: '/static_images/dashboard-icn.svg',
//     name: 'dashboard'
// },{
//     icon: '/static_images/analysis-icn.svg',
//     name: 'analysis'
// }, {
//     icon: '/static_images/project-icn.svg',
//     name: 'project'
// }, {
//     icon: '/static_images/addfiles-icn.svg',
//     name: 'addfiles'
// }, {
//     icon: '/static_images/uploads-icn.svg',
//     name: 'uploads'
// },{
//     icon: '/static_images/settings-icn.svg',
//     name: 'settings'
// }, {
//     icon: '/static_images/subscriptions-icn.svg',
//     name: 'subscriptions'
// }],