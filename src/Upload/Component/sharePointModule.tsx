import React, { Component } from 'react';
// // import styles from './ReactSpFx.module.scss';
// import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
// import { GraphFileBrowser } from '@microsoft/file-browser';

// export interface Props {
//     userToken: string;
//     context: any;
// }

// export interface IReactItem {
//     ID: string,
//     Title: string,
//     Address: string
// }

// declare global {
//     interface Window { _graphToken: any; }
// }

// export default class SharePointModule extends React.Component<Props> {
//     public constructor(props: Props) {
//         super(props);
//         window._graphToken = props.userToken;
//     }

//     public getAuthenticationToken(): Promise<string> {
//         return new Promise(resolve => {
//             resolve(
//                 window._graphToken
//             );
//         });
//     }

//     componentDidMount() {
//         var reactHandler = this;
//         this.props.context.spHttpClient.get(`${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('TestList')/items?select=ID,Title,Address`,
//             SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
//                 response.json().then((responseJSON: any) => {
//                     reactHandler.setState({
//                         items: responseJSON.value
//                     });
//                 });
//             });
//     }

//     render() {
//         return (
//             // <div className={styles.reactSpFx}>
//             //     <div className={styles.container}>
//                 // </div>
//                 <GraphFileBrowser
//                     getAuthenticationToken={this.getAuthenticationToken}
//                     endpoint='https://graph.microsoft.com/v1.0/sites/tenant.sharepoint.com,xxxx-b669-x-x-x,xxxx-x-x-x-x'
//                     onSuccess={(selectedKeys: any[]) => console.log(selectedKeys)}
//                     onCancel={(err: Error) => console.log(err.message)}
//                 />
//             // </div>
//         );
//     }
// }
