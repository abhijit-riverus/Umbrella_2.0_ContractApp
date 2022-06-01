import React from "react";
import { History } from "history";
import { FileInfo, FileList } from "../../Upload/State/uploadState";

interface Props {
  history: History;
  isLoggedIn: boolean;
  getUserUploads: () => void;
  userUploads: FileList[];
}

export default class IntroPage extends React.Component<Props> {
  componentDidMount() {
    return this.props.history.push("/dashboard");
  }

  /* componentWillReceiveProps(nextProps: Props) {
        // setTimeout(() => {
        // else redirect to my dashboard
        if (this.props.userUploads !== nextProps.userUploads) {
            if (nextProps.userUploads.length > 0) {
                return this.props.history.push("/dashboard");
            } else {
                return this.props.history.push("/addfiles");
            }
        }
        // }, 3000);
    } */

  render() {
    return <div />;
  }
}
