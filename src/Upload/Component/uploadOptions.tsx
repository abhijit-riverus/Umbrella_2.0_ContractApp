import React, { Component } from "react";
import GooglePicker from 'react-google-picker';

interface Props {
    // onClick: (data: any) => void;
    onChange: (data: any) => void;
}

interface State {

}

var uploadOptions = [
    {
        name: 'Browse',
        icon: 'browse-btn-icon.svg'
    },
    {
        name: 'Google Drive',
        icon: 'gdrive-btn-icon.svg'
    },
    {
        name: 'Dropbox',
        icon: 'dropbox-btn-icon.svg'
    },
    {
        name: 'Sharepoint',
        icon: 'sharepoint-btn-icon.svg'
    },
]

export default class UploadOptions extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {

        }
    }
    render() {
        let {onChange}=this.props;
        return (
            <GooglePicker clientId={'197435648091-a16d5rk70lgsq3fe9qd13tocl091u6lh.apps.googleusercontent.com'}
                developerKey={'AIzaSyATTcF-rggGjlb0hO_tG7i5a8x9CFioKQ8'}
                scope={['https://www.googleapis.com/auth/drive.readonly']}
                onChange={(data: any) => {console.log('on change:', data); onChange(data)}}
                onAuthenticate={(token: any) => console.log('oauth token:', token)}
                onAuthFailed={(data: any) => console.log('on auth failed:', data)}
                multiselect={true}
                navHidden={true}
                authImmediate={false}
                mimeTypes={['image/png', 'image/jpeg', 'image/jpg', 'application/pdf']}
                viewId={'DOCS'}>
                <button type="button" className="col-md-12 upload-hollow-btn mb-2">
                    <span className="col-md-2"><img src={'/static_images/gdrive-btn-icon.svg'} alt="btn-img" /></span>
                    <span className="col-md-10">Google Drive</span>
                </button>
            </GooglePicker>
            );
    }
}