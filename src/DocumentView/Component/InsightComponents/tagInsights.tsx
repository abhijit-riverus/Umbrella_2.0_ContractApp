import React from 'react';
import { Child } from '../../State/documentState';
import { nature_tag_color, type_tag_color, others_tag_color, groups_tag_color } from '../Utils/docUtils';
import { SITE_API_BY_REALM_NAME } from '../../../Configuration/global';
import { getKeyCloakRealmFromLS, getLocalStorage } from '../../../Authentication/Actions/authentication';
import axios from 'axios';
const SITEAPI = SITE_API_BY_REALM_NAME(getKeyCloakRealmFromLS());

interface Props {
    tags: Child[];
    fileId: Number;
}
export interface groupOption {
    readonly value: string;
    readonly label: string;
    readonly isFixed?: boolean;
}
interface State {
    natureTag: string;
    typeTag: string;
    otherTags: string[];
    readonly selectedUserGroups: readonly groupOption[];
}

export default class TagInsights extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            natureTag: '',
            typeTag: '',
            otherTags: [],
            selectedUserGroups: [],
        };
    }
    handleGetUserGroupsByFile = async () => {
        const fileId = this.props.fileId;
        console.log(
            '🚀 ~ file: tags.tsx ~ line 126 ~ Tags ~ handleGetUserGroupsByFile= ~ fileId',
            SITEAPI + 'user/groups/file/:' + fileId,
        );
        const accessToken = await getLocalStorage('accessToken');
        axios
            .get(SITEAPI + 'user/groups/file/' + fileId, { headers: { Authorization: `Bearer ${accessToken}` } })
            .then((response) => {
                if (response?.data?.code === 'success') {
                    const userGroups = response.data.queryResult;
                    console.log('🚀 ~ file: tags.tsx ~ line 132 ~ Tags ~ .then ~ userGroups', userGroups);
                    this.setState({
                        selectedUserGroups: userGroups
                            ? userGroups.map((group: any) => {
                                  return {
                                      value: group.name,
                                      label: group.name,
                                      isFixed: group.name === 'file-manager' ? true : false,
                                  };
                              })
                            : [],
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    componentDidMount() {
        this.categorizeTags(this.props.tags);
        this.handleGetUserGroupsByFile();
    }

    componentWillReceiveProps(nextProps: Props) {
        if (this.props.tags !== nextProps.tags) {
            this.categorizeTags(nextProps.tags);
        }
    }

    render() {
        let { natureTag, typeTag, otherTags, selectedUserGroups } = this.state;
        return (
            <>
                <div className="col-md-12 mt-1 mb-2 pl-0 tag-insights-container" style={{ marginLeft: '4%' }}>
                    <div className="row">
                        {natureTag !== '' && (
                            <div className="my-1 tag-label">
                                <span style={{ background: nature_tag_color }}>{natureTag}</span>
                            </div>
                        )}
                        {typeTag !== '' && (
                            <div className="my-1 tag-label">
                                <span style={{ background: type_tag_color }}>{typeTag}</span>
                            </div>
                        )}
                        {otherTags.length > 0 && (
                            <>
                                {otherTags.map((tag, i) => (
                                    <div className="my-1 tag-label">
                                        <span style={{ background: others_tag_color }}>{tag}</span>
                                    </div>
                                ))}
                            </>
                        )}
                        {selectedUserGroups.length > 0 && (
                            <>
                                {selectedUserGroups.map((tag, i) => (
                                    <div className="my-1 tag-label">
                                        <span style={{ background: groups_tag_color }}>{tag.value}</span>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </>
        );
    }

    categorizeTags(tags: Child[]) {
        let tagArray = tags as any[];
        let natureTag = '';
        let typeTag = '';
        let otherTags: string[] = [];
        this.setState({ natureTag: '', typeTag: '', otherTags: [] });
        for (let i = 0; i < tags.length; i++) {
            switch (tagArray[i].dataPoints.categoryId) {
                case 1: {
                    natureTag = tagArray[i].name;
                    this.setState({ natureTag: natureTag });
                    break;
                }
                case 2: {
                    typeTag = tagArray[i].name;
                    this.setState({ typeTag: typeTag });
                    break;
                }
                case 3: {
                    otherTags.push(tagArray[i].name);
                    this.setState({ otherTags: otherTags });
                    break;
                }
                default: {
                    //do nothing
                }
            }
        }
    }
}
