import React, { Component } from 'react';
import { isNullOrUndefined } from 'is-what';
import { PartyData } from '../../../../State/documentState';
import SaveOrCancel from '../saveOrCancel';

interface Props {
    editOptionSelected: (editOptionSelected: boolean) => void;
    editParties: (parties: PartyData[]) => void;
    savedParties: PartyData[];
    saveHighlightedId: (highlightedId: number[] | null) => void;
}

interface State {
    partyDataString: PartyData[];
    partyName: string;
    partyType: string;
}

export default class Parties extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            partyDataString: props.savedParties,
            partyName: '',
            partyType: '',
        };
    }
    render() {
        let { editOptionSelected, saveHighlightedId } = this.props;
        return (
            <div className="row toc-content toc-content-default">
                <div className="col-md-12">
                    <div className="row mt-1">
                        <div className="col-md-12 m-0 bi-label-clickable mt-2" style={{ fontWeight: 600 }}>
                            Contracting parties
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3 edit-title-header">Add parties to your contract here...</div>
                    </div>
                    {this.getParties()}
                    {/* <div className="row">
                        <div className="col-md-12">
                            <span className="mr-2">
                                <img alt='active' src='/static_images/checkbox_active.svg' className="filter-select-asset cursor-pointer " />
                            </span>&nbsp;&nbsp;
                            Share feedback with Riverus.
                        </div>
                    </div> */}
                    <SaveOrCancel
                        enableHighlightOption={true}
                        dataPointName={'Parties'}
                        editOptionSelected={editOptionSelected}
                        editDataPoint={() => this.editParties()}
                        highlightedId={null}
                        enableSaveBtn={true}
                        saveHighlightedId={(highlightedId: number[] | null) => saveHighlightedId(highlightedId)}
                        handleSubmitSelectedUserGroups={() => {}}
                    />
                </div>
            </div>
        );
    }

    editParties() {
        let { partyDataString } = this.state;
        this.props.editParties(partyDataString);
        this.addOrRemoveParties('save');
    }

    getParties() {
        let { partyDataString, partyName, partyType } = this.state;
        if (partyDataString.length > 0) {
            return (
                <>
                    {partyDataString.map((party, i) => (
                        <div className="row my-1" key={i}>
                            <div className="col-md-12">
                                <input
                                    type="text"
                                    value={party.partyName !== '' ? party.partyName : ''}
                                    readOnly
                                    className="title-input"
                                    onChange={() => {}}
                                    style={{ width: '80%' }}
                                />
                            </div>
                            <div className="col-md-12 mt-2">
                                <input
                                    type="text"
                                    value={party.partyType !== '' ? party.partyType : ''}
                                    readOnly
                                    className="title-input"
                                    onChange={() => {}}
                                    style={{ width: '50%' }}
                                />
                            </div>
                            <div className="col-md-2 mt-2">
                                <img
                                    className="cursor-pointer"
                                    src="/static_images/less-parties.svg"
                                    alt="remove-icon"
                                    onClick={() => this.addOrRemoveParties('remove', party)}
                                />
                            </div>
                        </div>
                    ))}
                    <div className="row my-1">
                        <div className="col-md-12">
                            <input
                                type="text"
                                value={partyName !== '' ? partyName : ''}
                                className="title-input"
                                placeholder="Enter party name"
                                onChange={(e) => this.setState({ partyName: e.currentTarget.value })}
                                style={{ width: '80%' }}
                            />
                        </div>
                        <div className="col-md-12 mt-2">
                            <input
                                type="text"
                                value={partyType !== '' ? partyType : ''}
                                className="title-input"
                                placeholder="Enter party type"
                                onChange={(e) => this.setState({ partyType: e.currentTarget.value })}
                                style={{ width: '50%' }}
                            />
                        </div>
                        <div className="col-md-2 mt-2">
                            {partyName !== '' ? (
                                <img
                                    className="cursor-pointer"
                                    src="/static_images/more-parties.svg"
                                    alt="add-more"
                                    onClick={() => this.addOrRemoveParties('add')}
                                />
                            ) : (
                                <img src="/static_images/more-parties-disabled.svg" alt="add-more" />
                            )}
                        </div>
                    </div>
                </>
            );
        } else {
            return (
                <div className="row my-1">
                    <div className="col-md-12">
                        <input
                            type="text"
                            value={partyName !== '' ? partyName : ''}
                            className="title-input"
                            placeholder="Enter party name"
                            onChange={(e) => this.setState({ partyName: e.currentTarget.value })}
                            style={{ width: '80%' }}
                        />
                    </div>
                    <div className="col-md-12 mt-2">
                        <input
                            type="text"
                            value={partyType !== '' ? partyType : ''}
                            className="title-input"
                            placeholder="Enter party type"
                            onChange={(e) => this.setState({ partyType: e.currentTarget.value })}
                            style={{ width: '50%' }}
                        />
                    </div>
                    <div className="col-md-2 mt-2">
                        {partyName !== '' ? (
                            <img
                                className="cursor-pointer"
                                src="/static_images/more-parties.svg"
                                alt="add-more"
                                onClick={() => this.addOrRemoveParties('add')}
                            />
                        ) : (
                            <img src="/static_images/more-parties-disabled.svg" alt="add-more" />
                        )}
                    </div>
                </div>
            );
        }
    }

    addOrRemoveParties(action: string, name?: PartyData) {
        let { partyDataString, partyName, partyType } = this.state;
        let tempPartyList: PartyData[] = partyDataString;
        if (action === 'add') {
            tempPartyList.push({
                partyName: partyName,
                partyType: partyType,
                mode: 'manual',
            });
        } else if (action === 'remove' && !isNullOrUndefined(name)) {
            tempPartyList = tempPartyList.filter((el) => {
                return el !== name;
            });
        } else {
            if (partyName === '') {
                tempPartyList = tempPartyList.filter((el) => {
                    return el !== name;
                });
            } else {
                tempPartyList.push({
                    partyName: partyName,
                    partyType: partyType,
                    mode: 'manual',
                });
            }
        }
        this.setState({ partyDataString: tempPartyList });
        this.setState({ partyName: '', partyType: '' }); //Set back to default
    }
}
