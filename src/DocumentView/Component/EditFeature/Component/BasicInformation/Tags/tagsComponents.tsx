import Tooltip from '@material-ui/core/Tooltip';
import React, { Component } from 'react';
import { isNullOrUndefined } from 'is-what';
import Scrollable from '../../../../../../UniversalComponents/Scrollable/scrollable';
import { TagData } from '../../../../../State/documentState';
import { DarkTooltip } from '../../../../documentInsights';
import {
    tag_nature_tooltip,
    tag_type_tooltip,
    nature_tag_color,
    type_tag_color,
    tag_groups_tooltip,
} from '../../../../Utils/docUtils';
import OtherTags from './otherTags';
import Select, { ActionMeta, OnChangeValue, StylesConfig } from 'react-select';

const userGroupStyles: StylesConfig<groupOption, true> = {
    multiValue: (base, state) => {
        return state.data.isFixed ? { ...base, backgroundColor: 'gray' } : base;
    },
    multiValueLabel: (base, state) => {
        return state.data.isFixed ? { ...base, fontWeight: 'bold', color: 'white', paddingRight: 6 } : base;
    },
    multiValueRemove: (base, state) => {
        return state.data.isFixed ? { ...base, display: 'none' } : base;
    },
};
interface Props {
    tagNature: TagData[];
    tagType: TagData[];
    listOtherTags: () => void;
    otherTags: TagData[];
    getNature: (natureTagId: number) => void;
    getType: (typeTagId: number) => void;
    getOthers: (othersTagId: number[]) => void;
    createOtherTags: (name: string) => void;
    storeOtherTags: (storedOtherTags: any) => void;
    tags: any[];
    newTagData: TagData;
    storedOtherTags: any;
    otherTagsLoader: boolean;
    readonly allUserGroups: readonly groupOption[];
    readonly selectedUserGroups: readonly groupOption[];
    onUserGroupChange: (value: OnChangeValue<groupOption, true>, actionMeta: ActionMeta<groupOption>) => void;
}

interface State {
    nature: string;
    type: string;
    otherTagsId: number[];
    expandNature: boolean;
    expandType: boolean;
    readonly allUserGroups: readonly groupOption[];
    readonly selectedUserGroups: readonly groupOption[];
}
export interface groupOption {
    readonly value: string;
    readonly label: string;
    readonly isFixed?: boolean;
}

export default class TagComponents extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nature: '',
            type: '',
            otherTagsId: [],
            expandNature: false,
            expandType: false,
            allUserGroups: [],
            selectedUserGroups: [],
        };
    }

    componentDidMount() {
        let { tags } = this.props;
        if (tags.length > 0) {
            let savedNature = tags.filter((el) => {
                return el.dataPoints.categoryId === 1;
            })[0];
            !isNullOrUndefined(savedNature) && this.setState({ nature: savedNature.name });
            let savedType = tags.filter((el) => {
                return el.dataPoints.categoryId === 2;
            })[0];
            !isNullOrUndefined(savedType) && this.setState({ type: savedType.name });
        }
    }

    render() {
        let {
            tagNature,
            newTagData,
            tagType,
            otherTags,
            createOtherTags,
            listOtherTags,
            tags,
            storeOtherTags,
            storedOtherTags,
            otherTagsLoader,
        } = this.props;
        let { nature, type, expandNature, expandType } = this.state;
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="mb-4">
                        <div className="row">
                            <div className="col-md-12 tag-type-hoverable">
                                <DarkTooltip title={tag_nature_tooltip} placement="right-end">
                                    <span>Nature</span>
                                </DarkTooltip>
                            </div>
                            <div className="col-md-9 mb-1">
                                {nature.length > 0 ? (
                                    <div className="row">
                                        <div className="col-md-12">
                                            <span className="tag-input-disabled">
                                                <input
                                                    type="text"
                                                    readOnly
                                                    className="tag-input"
                                                    placeholder="Remove existing tag to add another"
                                                    style={{
                                                        width: '93%',
                                                        border: 'none',
                                                        outline: 'none',
                                                        background: '#E2E2E2',
                                                    }}
                                                />
                                                <img src="/static_images/tag-dropdown-inactive.svg" alt="dropdown" />
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <span
                                                    className="tag-input"
                                                    style={{ background: 'white', border: '1px solid #DDDDDD' }}
                                                    onClick={() =>
                                                        this.setState({ expandNature: !this.state.expandNature })
                                                    }
                                                >
                                                    <input
                                                        type="text"
                                                        readOnly
                                                        className="tag-input"
                                                        placeholder="Select one tag"
                                                        style={{ width: '100%', border: 'none', outline: 'none' }}
                                                    />
                                                    <img
                                                        src="/static_images/new-tag-dropdown-active.svg"
                                                        alt="dropdown"
                                                        style={{ transform: expandNature ? 'rotate(180deg)' : 'none' }}
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                        {expandNature && (
                                            <div className="row">
                                                <div
                                                    className="col-md-12 tag-autocomplete-container"
                                                    style={{ margin: 0 }}
                                                >
                                                    <Scrollable maxHeight={100}>
                                                        {tagNature.map((tag, i) => (
                                                            <div
                                                                className="tag-input-suggestion cursor-pointer"
                                                                style={{ fontSize: '14px' }}
                                                                key={i}
                                                                onClick={() => this.setTags(tag.name, 'Nature')}
                                                            >
                                                                {tag.name}
                                                            </div>
                                                        ))}
                                                    </Scrollable>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                        {nature.length > 0 && (
                            <div className="row">
                                {/* <div className="col-md-3" /> */}
                                <div className="col-md-12 tag-label">
                                    <span
                                        style={{ background: nature_tag_color, marginLeft: '0rem', padding: '0% 1%' }}
                                    >
                                        {nature}&nbsp;&nbsp;
                                        <img
                                            src="/static_images/new-remove-tag-label.svg"
                                            alt="remove"
                                            className="cursor-pointer"
                                            onClick={() => this.setTags('', 'Nature')}
                                        />
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <div className="row">
                            <div className="col-md-12 tag-type-hoverable">
                                <DarkTooltip title={tag_type_tooltip} placement="right-end">
                                    <span>Type</span>
                                </DarkTooltip>
                            </div>
                            <div className="col-md-9 mb-1">
                                {type.length > 0 ? (
                                    <div className="row">
                                        <div className="col-md-12">
                                            <span className="tag-input-disabled">
                                                <input
                                                    type="text"
                                                    readOnly
                                                    className="tag-input"
                                                    placeholder="Remove existing tag to add another"
                                                    style={{
                                                        width: '93%',
                                                        border: 'none',
                                                        outline: 'none',
                                                        background: '#E2E2E2',
                                                    }}
                                                />
                                                <img src="/static_images/tag-dropdown-inactive.svg" alt="dropdown" />
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <span
                                                    className="tag-input"
                                                    style={{ background: 'white', border: '1px solid #DDDDDD' }}
                                                    onClick={() =>
                                                        this.setState({ expandType: !this.state.expandType })
                                                    }
                                                >
                                                    <input
                                                        type="text"
                                                        readOnly
                                                        className="tag-input"
                                                        placeholder="Select one tag"
                                                        style={{ width: '100%', border: 'none', outline: 'none' }}
                                                    />
                                                    <img
                                                        src="/static_images/new-tag-dropdown-active.svg"
                                                        alt="dropdown"
                                                        style={{ transform: expandType ? 'rotate(180deg)' : 'none' }}
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                        {expandType && (
                                            <div className="row">
                                                <div
                                                    className="col-md-12 tag-autocomplete-container"
                                                    style={{ margin: 0 }}
                                                >
                                                    <Scrollable maxHeight={100}>
                                                        {tagType.map((tag, i) => (
                                                            <div
                                                                className="tag-input-suggestion cursor-pointer"
                                                                style={{ fontSize: '14px' }}
                                                                key={i}
                                                                onClick={() => this.setTags(tag.name, 'Type')}
                                                            >
                                                                {tag.name}
                                                            </div>
                                                        ))}
                                                    </Scrollable>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                        {type.length > 0 && (
                            <div className="row">
                                {/* <div className="col-md-3" /> */}
                                <div className="col-md-12 tag-label">
                                    <span style={{ background: type_tag_color, marginLeft: '0rem', padding: '0% 1%' }}>
                                        {type}&nbsp;&nbsp;
                                        <img
                                            src="/static_images/new-remove-tag-label.svg"
                                            alt="remove"
                                            className="cursor-pointer"
                                            onClick={() => this.setTags('', 'Type')}
                                        />
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* OTHERS TAG  */}
                    <div className="mb-4">
                        <OtherTags
                            storedOtherTags={storedOtherTags}
                            storeOtherTags={storeOtherTags}
                            newTagData={newTagData}
                            setTags={(e) => this.setTags(e, 'Others')}
                            tags={tags}
                            otherTags={otherTags}
                            createOtherTags={createOtherTags}
                            listOtherTags={listOtherTags}
                            selectedLibraryAction={''}
                            isBulkAction={false}
                            otherTagsLoader={otherTagsLoader}
                        />
                    </div>
                    {/* GROUPS DROPDOWN */}
                    <div className="tag-type-hoverable">
                        <DarkTooltip title={tag_groups_tooltip} placement="right-end">
                            <span>Groups</span>
                        </DarkTooltip>
                    </div>

                    <Select
                        value={this.props.selectedUserGroups}
                        isMulti
                        styles={userGroupStyles}
                        isClearable={this.state.selectedUserGroups.some((v) => !v.isFixed)}
                        name="Groups"
                        className="basic-multi-select"
                        classNamePrefix="Select Groups"
                        onChange={this.props.onUserGroupChange}
                        options={this.props.allUserGroups}
                    />
                </div>
            </div>
        );
    }

    setTags(e: any, category: string) {
        let { getNature, getType, tagNature, tagType, getOthers } = this.props;
        if (category === 'Nature') {
            this.setState({ nature: e });
            let index = tagNature.findIndex((el: TagData) => {
                return el.name === e;
            });
            if (index > -1) {
                getNature(tagNature[index].id);
            } else {
                getNature(-1);
            }
        } else if (category === 'Type') {
            this.setState({ type: e });
            let index = tagType.findIndex((el: TagData) => {
                return el.name === e;
            });
            if (index > -1) {
                getType(tagType[index].id);
            } else {
                getType(-1);
            }
        } else {
            let othersArray = this.state.otherTagsId;
            othersArray.push(e);
            this.setState({ otherTagsId: othersArray });
            getOthers(e);
        }
    }
}
