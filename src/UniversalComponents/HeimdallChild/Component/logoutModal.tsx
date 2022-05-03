import React, { PureComponent, ReactNode } from 'react'

interface Props {}
interface State {}

export default class LogoutModal extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            
        }
    }

    render(): ReactNode {
        return (
            <div id="logout-modal">
                <div className="row">
                    <div className="col-md-2" id="signout-modal-img">
                        <img src="/static_images/signout-modal-icon.svg" />
                        </div>
                        <div className="col-md-10">
                            Signing you out...
                            <p id="signout-para">We hope to see you soon!</p>
                        </div>
                    </div>
            </div>
        )
    }
}
