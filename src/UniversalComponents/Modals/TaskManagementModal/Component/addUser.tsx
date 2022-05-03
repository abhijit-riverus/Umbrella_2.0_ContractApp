import * as React from 'react';
import ReactDOM from 'react-dom';
import { updateNamespaceExportDeclaration } from 'typescript';
import { isNullOrUndefined } from 'is-what';
import Scrollable from '../../../Scrollable/scrollable';
import { UserData } from '../State/taskManagementState';
import onClickOutside from "react-onclickoutside";

interface Props {
    getUserData: () => void;
    userData: UserData[];
    insertUser: (userID: UserData) => void;
    removeUser: (userData: UserData) => void;
    hideAddUser: boolean;
    addedUsers: UserData[],
    setHideAddUser: (hideAddUser: boolean) => void;
}

interface State {
    term: string;
    selectedUser: number;
    value: string;
    showUserDD: boolean;
    suggestUserData: UserData[];

}

class AddUser extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            term: '',
            selectedUser: 0,
            value: '',
            showUserDD: false,
            suggestUserData: []
        }

    }

    handleClickOutside = () => {
        //console.log('onClickOutside() method called')
        this.props.setHideAddUser(true);
    }

    render() {
        let { userData, insertUser, hideAddUser, addedUsers } = this.props;
        let { suggestUserData } = this.state;
        return (
            <div className="row" id="add-user-container" hidden={hideAddUser}>
                <div className="col-md-12 user-search-text">
                    <input type="text" id="user-search" value={this.state.value} placeholder="Enter a name or email address"
                        onChange={(e) => this.getUserSuggestion(e.target.value)}></input>
                </div>
                <div className="col-md-12" id="user-suggestion-container">

                    {
                        addedUsers.length > 0 ? <>
                            <div className="col-md-12 pl-0 title">Added</div>
                            {
                                addedUsers.map((user, key) =>
                                    <div className="row user-data">
                                        <div className="col-md-2">
                                            <div className="avatar-circle-sm" style={{ backgroundColor: user.code }} >
                                                <span className="initials">{user.aliasName.toUpperCase()}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-8 user-name">
                                            {user.name}
                                        </div>
                                        <div className="col-md-2 mt-1 float-right" onClick={() => this.removeSelectedUser(user)}>
                                            <img src="/static_images/close-modal-icn.svg" alt="close" />
                                        </div>
                                    </div>
                                )
                            }
                        </>
                            :
                            <></>
                    }

                    {suggestUserData.length > 0 ?
                        <>
                            <div className="col-md-12 pl-0 title">Suggestions</div>
                            <Scrollable maxHeight={200}>
                                {
                                    suggestUserData.map((user, key) =>
                                        addedUsers.includes(user) === false &&
                                        <div className="row user-data" onClick={() => this.setSelectedUser(user)}>
                                            <div className="col-md-2">
                                                <div className="avatar-circle-sm" style={{ backgroundColor: user.code }} >
                                                    <span className="initials">{user.aliasName.toUpperCase()}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-10 user-name">
                                                {user.name}
                                            </div>
                                        </div>
                                    )
                                }
                            </Scrollable>
                        </>
                        : userData.length > 0 ?
                            <>
                                <div className="col-md-12 pl-0 title">Others</div>
                                <Scrollable maxHeight={200}>
                                    {
                                        userData.map((user, key) =>
                                            addedUsers.includes(user) === false &&
                                            <div className="row user-data" onClick={() => this.setSelectedUser(user)}>
                                                <div className="col-md-2">
                                                    <div className="avatar-circle-sm" style={{ backgroundColor: user.code }} >
                                                        <span className="initials">{user.aliasName.toUpperCase()}</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-10 user-name">
                                                    {user.name}
                                                </div>
                                            </div>
                                        )
                                    }
                                </Scrollable>
                            </>
                            :
                            <>
                                <div className="col-md-12">
                                    No users found!!
                            </div>
                            </>

                    }
                </div>
            </div>
        );
    }

    setSelectedUser(ud: UserData) {
        // this.setState({ selectedUser: ud.id, value: '', showUserDD: false });
        this.props.insertUser(ud);
        this.setState({ suggestUserData: [] });
    }

    removeSelectedUser(ud: UserData) {
        this.props.removeUser(ud);
    }

    getUserSuggestion(term: string) {
        if (term !== null || term !== '') {
            this.setState({ term: term, value: term });
        }
        let usersDataCopy = [...this.props.userData];
        let filteredUD: UserData[] = usersDataCopy.filter((user: UserData) => new RegExp('(' + term + ')', 'i').test(user.name));
        this.setState({ suggestUserData: filteredUD });
    }
}

export default onClickOutside(AddUser);