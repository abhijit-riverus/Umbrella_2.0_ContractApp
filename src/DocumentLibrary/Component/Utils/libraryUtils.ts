import { nature_tag_color, others_tag_color, type_tag_color } from "../../../DocumentView/Component/Utils/docUtils";
import { BasicFileInfo, ChildrenFileInfo, DocumentHierarchyData, LibraryTagData, LibraryTagFilterStructure, ParentFileInfo, TagInfo } from "../../State/documentLibraryState";

export function getTagIconPath(categoryId: number) {
    let tag_src = '';
    if(categoryId === 1){
        tag_src = "/static_images/nature-tag-icn.svg";
    }else if( categoryId === 2){
        tag_src = "/static_images/type-tag-icn.svg";
    }else if(categoryId ===3 ){
        tag_src = "/static_images/group-tag-icn.svg";
    }
    return tag_src; 
}

export function getTagColor(tagCategory: string){
    let tag_bg_color = ''; 
    if(tagCategory === "nature"){
        tag_bg_color = nature_tag_color;
    } else if (tagCategory === "type"){
        tag_bg_color = type_tag_color;
    } else if (tagCategory === "others"){
        tag_bg_color = others_tag_color;
    }
    return tag_bg_color;
}

export function getTagColorById(tagCategoryId: number){
    let tag_bg_color = ''; 
    if(tagCategoryId === 1){
        tag_bg_color = nature_tag_color;
    } else if (tagCategoryId === 2){
        tag_bg_color = type_tag_color;
    } else if (tagCategoryId === 3){
        tag_bg_color = others_tag_color;
    }
    return tag_bg_color;
}

export function getCategoryId(categoryName: string){
    let categoryId: number = -1;
    if(categoryName === "nature"){
        categoryId = 1;
    }else if (categoryName === "type"){
        categoryId = 2;
    } else if(categoryName == "others") {
        categoryId = 3;
    }
    return categoryId;
}

export function getAllFilesAtRoot(documentHierarchy: DocumentHierarchyData[]){
    let filesAtRootLevel: BasicFileInfo[] = [];
    for(let i = 0; i < documentHierarchy.length; i++){
        if(documentHierarchy[i].levelId === 0){
            filesAtRootLevel.push({
                fileId: documentHierarchy[i].fileId,
                fileName: documentHierarchy[i].fileName,
                levelId: documentHierarchy[i].levelId
            })
        }
    }
    return filesAtRootLevel;
}

export function editLibraryTagFilters( appliedLibraryTagFilters: LibraryTagFilterStructure[], selectedTag: TagInfo) {
    let editedLibraryTagFilters: LibraryTagFilterStructure[] = [];
    let tagExists =  false;
    for(let i = 0; i < appliedLibraryTagFilters.length; i++){
        if(appliedLibraryTagFilters[i].tagId === selectedTag.tagId){
            tagExists =  true;
            continue;
        }
        editedLibraryTagFilters.push({
            tagId: appliedLibraryTagFilters[i].tagId,
            tagName: appliedLibraryTagFilters[i].tagName
        });
    }
    if(tagExists === false) {
        editedLibraryTagFilters.push({
            tagId: selectedTag.tagId,
            tagName: selectedTag.tagName
        }); 
    }
    return editedLibraryTagFilters;
}

export function isTagAlreadySelected(tag: LibraryTagData, tagArray: LibraryTagFilterStructure[]){
    let tagAlreadyExists: boolean = false;
    for(let i = 0; i < tagArray.length; i++){
        if(tag.id === tagArray[i].tagId && tag.name === tagArray[i].tagName){
            tagAlreadyExists = true;
            break;
        }
    }
    return tagAlreadyExists;
}

export function getAppliedTagFilterCountText(tagArray: LibraryTagFilterStructure[]){
    let appliedTagFilterCount: string = '';
    if(tagArray.length === 0 || tagArray === undefined || tagArray === null ){
        appliedTagFilterCount = '';
    } else if(tagArray.length === 1 ){
        appliedTagFilterCount = ''+ tagArray[0].tagName + '';
    }else {
        let appliedCount: number = 0;
        for(let i = tagArray.length - 1; i >= 0 ; i--){
            if( i === tagArray.length - 1){
                appliedTagFilterCount = tagArray[i].tagName; 
            }else {
                appliedCount += 1;
            }
        }
        if(appliedCount > 0){
            appliedTagFilterCount += ' + ' + appliedCount;
        }
    }
    return appliedTagFilterCount;
}

export function addOrRemoveFiles(currentFile: BasicFileInfo, fileArray: BasicFileInfo[]) {
    let editedFileArray: BasicFileInfo[] = [];
    let exists = false;
    if(fileArray.length === 0){
        editedFileArray.push(currentFile);
    }else {
        for(let i = 0; i < fileArray.length; i++) {
            if(currentFile.fileId === fileArray[i].fileId){
                exists = true;
                continue;
            }
            editedFileArray.push(fileArray[i]);
        }
        if(exists === false){
            editedFileArray.push(currentFile);
        }
    }
    return editedFileArray;
}

export function addOrRemoveFileIds(fileId: number, fileArray: number[]) {
    let editedFileArray: number[] = [];
    let exists = false;
    if(fileArray.length === 0){
        editedFileArray.push(fileId);
    }else {
        for(let i = 0; i < fileArray.length; i++) {
            if(fileId === fileArray[i]){
                exists = true;
                continue;
            }
            editedFileArray.push(fileArray[i]);
        }
        if(exists === false){
            editedFileArray.push(fileId);
        }
    }
    return editedFileArray;
}

export function sortTagsByFilters(appliedTagFilters: LibraryTagFilterStructure[], tags: LibraryTagData[]): LibraryTagData[] {
    let appliedTags: LibraryTagData[] =[];
    let unfilteredTags: LibraryTagData[] = [];
    for(let i = 0; i < tags.length; i++){
        let filteredTags = appliedTagFilters.filter((tag)=> tag.tagId === tags[i].id);
        if(filteredTags.length > 0){
            appliedTags.push(tags[i]);
            continue;
        }
        unfilteredTags.push(tags[i])
    }
    let sortedTags: LibraryTagData[] = appliedTags.concat(unfilteredTags);
    return sortedTags;
}

export function getSortedParentFileList(parentFileList: ParentFileInfo[]) {
    let sortedParentFileList: ParentFileInfo[] = [];
    let matchedParentFileList: ParentFileInfo[] = []; 
    for(let i = 0; i < parentFileList.length; i++){
        if(parentFileList[i].isParent === 1){
            matchedParentFileList.push(parentFileList[i]);
            continue;
        }
        sortedParentFileList.push(parentFileList[i]);
    }
    sortedParentFileList = matchedParentFileList.concat(sortedParentFileList);
    return sortedParentFileList;
}

export function editParentInFileList(parentFile: ParentFileInfo, fileList: ParentFileInfo[]) {
    let parentFileList: ParentFileInfo[] = [];
    let editedParentFile: ParentFileInfo = {
        fileId: -1,
        fileName: '',
        levelId: -1,
        isParent: 0
    }
    for(let i = 0; i < fileList.length; i++){
        if(fileList[i].fileId === parentFile.fileId){
            editedParentFile = fileList[i];
            editedParentFile.isParent = 1;
        }else {
            editedParentFile = fileList[i];
            editedParentFile.isParent = 0;
        }
        parentFileList.push(editedParentFile);
    }
    return parentFileList;
}

export function getParentFileFromList(parentFileList: ParentFileInfo[]){
    let existingParentFile: ParentFileInfo = {
        fileId: -1,
        fileName: '',
        levelId: -1,
        isParent: 0
    } 
    for(let i = 0; i < parentFileList.length; i++){
        if(parentFileList[i].isParent === 1){
            existingParentFile = parentFileList[i];
            break;
        }
    }
    return existingParentFile;
}

export function getSortedChildrenFileList(childrenFileList: ChildrenFileInfo[]) {
    let sortedChildrenFileList: ChildrenFileInfo[] = [];
    let matchedChildrenFileList: ChildrenFileInfo[] = []; 
    for(let i = 0; i < childrenFileList.length; i++){
        if(childrenFileList[i].isChild === true){
            matchedChildrenFileList.push(childrenFileList[i]);
            continue;
        }
        sortedChildrenFileList.push(childrenFileList[i]);
    }
    sortedChildrenFileList = matchedChildrenFileList.concat(sortedChildrenFileList);
    return sortedChildrenFileList;
}

export function getChildrenFileFromList(childrenFileList: ChildrenFileInfo[]){
    let existingChildrenFile: ChildrenFileInfo[] = [];
    for(let i = 0; i < childrenFileList.length; i++){
        if(childrenFileList[i].isChild === true){
            existingChildrenFile.push(childrenFileList[i]);
        }
    }
    return existingChildrenFile;
}

export function editChildrenInFileList(childFile: ChildrenFileInfo, childrenFileList: ChildrenFileInfo[]){
    let editedChildrenFileList: ChildrenFileInfo[] = [];
    let editedChild: ChildrenFileInfo= {fileId: -1, fileName: '', levelId: -1 ,isChild: false, parentExists: false};
    for(let i = 0; i < childrenFileList.length; i++){
        if(childrenFileList[i].fileId === childFile.fileId){
            editedChild = {
                fileId: childrenFileList[i].fileId,
                fileName: childrenFileList[i].fileName,
                levelId: childrenFileList[i].levelId,
                isChild: !childrenFileList[i].isChild,
                parentExists: (childrenFileList[i].parentExists === true && childrenFileList[i].isChild === true) ? false : true
            }
        }else {
            editedChild = childrenFileList[i];
        }
        editedChildrenFileList.push(editedChild);
    }
    return editedChildrenFileList;
}

export function getFileIdsFromFiles(filesInfo: BasicFileInfo[]){
    let fileIds: number[] = [];
    for(let i = 0; i < filesInfo.length; i++){
        fileIds.push(filesInfo[i].fileId);
    }
    return fileIds;
}

export function isFileArrayAtRootLevel(fileArray: BasicFileInfo[]){
    let isRootLevel: boolean = true;
    for(let i = 0; i < fileArray.length; i++){
        if(fileArray[i].levelId !== 0){
           isRootLevel = false;
           break; 
        }
    }
    return isRootLevel;
}

export const documentHierarchyTestJSON: DocumentHierarchyData[] = [
    // {
// 		fileId: 100,
// 		fileName: 'Document0.pdf',
// 		levelId: 0,
// 		tags: [
//             {
// 				tagId: 11,
// 				tagName: 'Nature100',
// 				tagCategory: 'nature'
// 			},
// 			{
// 				tagId: 12,
// 				tagName: 'Type100',
// 				tagCategory: 'Type'
// 			},
// 			{
// 				tagId: 13,
// 				tagName: 'Group100',
// 				tagCategory: 'others'
// 			},
// 			{
// 				tagId: 14,
// 				tagName: 'Group100_1',
// 				tagCategory: 'others'
// 			}
//         ],
// 		children: [
// 			{
// 				fileId: 101,
// 				fileName: 'Document00.pdf',
// 				levelId: 1,
// 				tags: [
//                     {
//                         tagId: 15,
//                         tagName: 'Type101',
//                         tagCategory: 'nature'
//                     },
//                     {
//                         tagId: 16,
//                         tagName: 'Group101_2',
//                         tagCategory: 'others'
//                     }
//                 ],
// 				children: []
// 			}
// 		]
// 	},
// 	{
// 		fileId: 102,
// 		fileName: 'Document1.pdf',
// 		levelId: 0,
// 		tags: [],
// 		children: [
// 			{
// 				fileId: 103,
// 				fileName: 'Document10.pdf',
// 				levelId: 1,
// 				tags: [
//                     {
//                         tagId: 12,
//                         tagName: 'Type100',
//                         tagCategory: 'nature'
//                     },
//                     {
//                         tagId: 13,
//                         tagName: 'Group_100',
//                         tagCategory: 'type'
//                     }
//                 ],
// 				children: []
// 			},
// 			{
// 				fileId: 104,
// 				fileName: 'Document11.pdf',
// 				levelId: 1,
// 				tags: [
//                     {
//                         tagId: 1,
//                         tagName: "Amendment",
//                         tagCategory: "nature"
//                       },
//                       {
//                         tagId: 92,
//                         tagName: "customtag",
//                         tagCategory: "others"
//                       },
//                       {
//                         tagId: 46,
//                         tagName: "Test Others 6",
//                         tagCategory: "others"
//                       },
//                       {
//                         tagId: 161,
//                         tagName: "goood",
//                         tagCategory: "others"
//                       },
//                       {
//                         tagId: 159,
//                         tagName: "te",
//                         tagCategory: "others"
//                       },
//                       {
//                         tagId: 9,
//                         tagName: "Collaboration Agreement",
//                         tagCategory: "type"
//                       },
//                       {
//                         tagId: 157,
//                         tagName: "apple",
//                         tagCategory: "others"
//                       },
//                       {
//                         tagId: 156,
//                         tagName: "mango",
//                         tagCategory: "others"
//                       },
//                       {
//                         tagId: 154,
//                         tagName: "5",
//                         tagCategory: "others"
//                       },
//                       {
//                         tagId: 136,
//                         tagName: "test tag2",
//                         tagCategory: "others"
//                       },
//                       {
//                         tagId: 89,
//                         tagName: "Testing",
//                         tagCategory: "others"
//                       },
//                       {
//                         tagId: 58,
//                         tagName: "tagtag",
//                         tagCategory: "others"
//                       },
//                       {
//                         tagId: 56,
//                         tagName: "tag2",
//                         tagCategory: "others"
//                       },
//                       {
//                         tagId: 49,
//                         tagName: "tag1",
//                         tagCategory: "others"
//                       },
//                       {
//                         tagId: 158,
//                         tagName: "pineapple",
//                         tagCategory: "others"
//                       },
//                       {
//                         tagId: 65,
//                         tagName: "SDU",
//                         tagCategory: "others"
//                       },
//                       {
//                         tagId: 135,
//                         tagName: "test tag1",
//                         tagCategory: "others"
//                       }
//                 ],
// 				children: [
// 					{
// 						fileId: 105,
// 						fileName: 'Document110.pdf',
// 						levelId: 2,
// 						tags: [],
// 						children: []
// 					}
// 				]
// 			}
// 		]
// 	},
//     {
//         fileId: 106,
//         fileName: 'Document2.pdf',
//         levelId: 0,
//         tags: [
//             {
//                 tagId: 15,
//                 tagName: 'Type101',
//                 tagCategory: 'nature'
//             },
//             {
//                 tagId: 16,
//                 tagName: 'Group101_2',
//                 tagCategory: 'type'
//             },
//             {
//                 tagId: 15,
//                 tagName: 'Type101',
//                 tagCategory: 'others'
//             },
//             {
//                 tagId: 16,
//                 tagName: 'Group101_2',
//                 tagCategory: 'others'
//             },
//             {
//                 tagId: 15,
//                 tagName: 'Type101',
//                 tagCategory: 'others'
//             },
//             {
//                 tagId: 16,
//                 tagName: 'Group101_2',
//                 tagCategory: 'others'
//             },
//             {
//                 tagId: 15,
//                 tagName: 'Type101',
//                 tagCategory: 'others'
//             },
//             {
//                 tagId: 16,
//                 tagName: 'Group101_2',
//                 tagCategory: 'others'
//             },{
//                 tagId: 15,
//                 tagName: 'Type101',
//                 tagCategory: 'others'
//             },
//             {
//                 tagId: 16,
//                 tagName: 'Group101_2',
//                 tagCategory: 'others'
//             },
//             {
//                 tagId: 15,
//                 tagName: 'Type101',
//                 tagCategory: 'others'
//             },
//             {
//                 tagId: 16,
//                 tagName: 'Group101_2',
//                 tagCategory: 'others'
//             },
//             {
//                 tagId: 16,
//                 tagName: 'Group101_2',
//                 tagCategory: 'others'
//             },{
//                 tagId: 15,
//                 tagName: 'Type101',
//                 tagCategory: 'others'
//             },
//             {
//                 tagId: 16,
//                 tagName: 'Group101_2',
//                 tagCategory: 'others'
//             },
//             {
//                 tagId: 15,
//                 tagName: 'Type101',
//                 tagCategory: 'others'
//             },
//             {
//                 tagId: 16,
//                 tagName: 'Group101_2',
//                 tagCategory: 'others'
//             }
//         ],
//         children: [
//             {
//                 fileId: 107,
//                 fileName: 'Document20.pdf',
//                 levelId: 1,
//                 tags: [],
//                 children: [
//                     {
//                         fileId: 108,
//                         fileName: 'Document200.pdf',
//                         levelId: 2,
//                         tags: [],
//                         children: [
//                             {
//                                 fileId: 109,
//                                 fileName: 'Document2000.pdf',
//                                 levelId: 3,
//                                 tags: [],
//                                 children: [
//                                     {
//                                         fileId: 110,
//                                         fileName: 'Document20000.pdf',
//                                         levelId: 4,
//                                         tags: [],
//                                         children: [
//                                             {
//                                                 fileId: 111,
//                                                 fileName: 'Document200000.pdf',
//                                                 levelId: 5,
//                                                 tags: [],
//                                                 children: []
//                                             },
//                                             {
//                                                 fileId: 112,
//                                                 fileName: 'Document200001.pdf',
//                                                 levelId: 5,
//                                                 tags: [
//                                                     {
//                                                         tagId: 15,
//                                                         tagName: 'Type101',
//                                                         tagCategory: 'nature'
//                                                     },
//                                                     {
//                                                         tagId: 16,
//                                                         tagName: 'Group101_2',
//                                                         tagCategory: 'type'
//                                                     },
//                                                     {
//                                                         tagId: 15,
//                                                         tagName: 'Type101',
//                                                         tagCategory: 'others'
//                                                     },
//                                                     {
//                                                         tagId: 16,
//                                                         tagName: 'Group101_2',
//                                                         tagCategory: 'others'
//                                                     },
//                                                     {
//                                                         tagId: 15,
//                                                         tagName: 'Type101',
//                                                         tagCategory: 'others'
//                                                     },
//                                                     {
//                                                         tagId: 16,
//                                                         tagName: 'Group101_2',
//                                                         tagCategory: 'others'
//                                                     },
//                                                     {
//                                                         tagId: 15,
//                                                         tagName: 'Type101',
//                                                         tagCategory: 'others'
//                                                     },
//                                                     {
//                                                         tagId: 16,
//                                                         tagName: 'Group101_2',
//                                                         tagCategory: 'others'
//                                                     },{
//                                                         tagId: 15,
//                                                         tagName: 'Type101',
//                                                         tagCategory: 'others'
//                                                     },
//                                                     {
//                                                         tagId: 16,
//                                                         tagName: 'Group101_2',
//                                                         tagCategory: 'others'
//                                                     },
//                                                     {
//                                                         tagId: 15,
//                                                         tagName: 'Type101',
//                                                         tagCategory: 'others'
//                                                     },
//                                                     {
//                                                         tagId: 16,
//                                                         tagName: 'Group101_2',
//                                                         tagCategory: 'others'
//                                                     },
//                                                     {
//                                                         tagId: 16,
//                                                         tagName: 'Group101_2',
//                                                         tagCategory: 'others'
//                                                     },{
//                                                         tagId: 15,
//                                                         tagName: 'Type101',
//                                                         tagCategory: 'others'
//                                                     },
//                                                     {
//                                                         tagId: 16,
//                                                         tagName: 'Group101_2',
//                                                         tagCategory: 'others'
//                                                     },
//                                                     {
//                                                         tagId: 15,
//                                                         tagName: 'Type101',
//                                                         tagCategory: 'others'
//                                                     },
//                                                     {
//                                                         tagId: 16,
//                                                         tagName: 'Group101_2',
//                                                         tagCategory: 'others'
//                                                     }
//                                                 ],
//                                                 children: [
//                                                 ]
//                                             }
//                                         ]
//                                     },
//                                     {
//                                         fileId: 114,
//                                         fileName: 'Document20001.pdf',
//                                         levelId: 4,
//                                         tags: [],
//                                         children: []
//                                     }
//                                 ]
//                             }
//                         ]
//                     },
//                     {
//                         fileId: 115,
//                         fileName: 'Document201.pdf',
//                         levelId: 2,
//                         tags: [],
//                         children: []
//                     }
//                 ]
//             }
//         ]
//     }
]