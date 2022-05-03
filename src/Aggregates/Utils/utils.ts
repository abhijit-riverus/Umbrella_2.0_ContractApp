import { FilterConfig, AggregateState, AppliedFilters } from "../State/AggregatesState";

export default class AggregateUtils {
    public static generateAggregateSkeleton(config: FilterConfig[]) {
        let aggregates: AggregateState[] = []
        for (let i = 0; i < config.length; i++) {
            aggregates.push({
                label: config[i].label,
                value: config[i].type,
                type: config[i].type,
                children: [],
                path: '',
                alias: '',
                countValue: 0,
                childrenCount: 0,
                level: config[i].baseLevel
            });
        }
        return aggregates;
    }

    public static modifyFilters(filters: AppliedFilters[]) {
        if (filters.length > 0) {
            if (filters[0].i === '' && filters[0].o === '') {
                return filters;
            } else {
                return [{
                    i: '',
                    o: '',
                    v: filters
                }];
            }
        } else {
            return [{
                i: 'main_search_content',
                o: 'AND',
                v: filters
            }];
        }
    }

    public static addFilter(filters: AppliedFilters[], toApply: string, path: string, operator: string, type: string, alias: string, display: boolean, permission: boolean) {
        var actual = toApply;
        if (filters.length > 0) {
            var typeIndex = filters.findIndex((el) => { return el.i === this.getParent(path)[0]; });
            if (typeIndex > -1) {
                var parentArray = this.getParent(path);
                var toModify = filters;
                for (var i = 0; i < parentArray.length; i++) {
                    toModify = this.findPosition(toModify, parentArray[i], operator, actual, type, actual, alias, display, permission);
                }
            } else {
                filters.push({
                    i: this.getParent(path)[0],
                    v: [],
                    o: operator,
                    a: this.getParent(path)[0] === actual ? alias : '',
                });
                this.addFilter(filters, toApply, path, operator, type, alias, display, permission);
            }

        } else {
            // no filters present;
            filters.push({
                i: this.getParent(path)[0],
                v: [],
                o: operator,
                // r: type,
                // p: permission,
                // m: false,
                a: this.getParent(path)[0] === actual ? alias : ''
                // d: display
            });
            this.addFilter(filters, toApply, path, operator, type, alias, display, permission);
        }
        return filters;
    }
    public static findPosition(filters: AppliedFilters[], identifier: string, operator: string, actual: string, type: string, toApply: string, alias: string, display: boolean, permission: boolean) {
        var findIndex = filters.findIndex((el) => { return el.i === identifier; });
        if (findIndex > -1) {
            return filters[findIndex].v;
        } else {
            let idx = this.pushFilter(filters, identifier, operator, identifier === actual ? 'manual' : 'auto', type, toApply, alias, display, permission);
            return filters[idx].v;
        }
    }
    public static pushFilter(filters: AppliedFilters[], value: string, operator: string, mode: string, type: string, toApply: string, alias: string, display: boolean, permission: boolean) {
        filters.push({
            i: value,
            o: operator,
            v: [],
            a: alias
        });
        return filters.length - 1;
    }

    public static getParent(path: string) {
        var parentArray: string[] = [];
        if (path.includes('/')) {
            parentArray = path.split('/');
        } else {
            parentArray = [path];
        }
        return parentArray;
    }
    public static getSectionValue(value: string, type: string) {
        var res;
        if (type === 'path') {
            if (value.includes('//')) {
                res = value.split('//')[0];
            } else {
                res = value;
            }
        } else {
            if (value.includes('//')) {
                res = value.split('//')[1];
            } else {
                res = value;
            }
        }
        return res;
    }

    public static orphanLastChild(targetPath: string, count: number) {  // For slicing remaining terms in path: s_w_c/test/esop --> test/esop --> esop
        let path: string = '';
        if (targetPath.includes('/')) {
            let splitArray = targetPath.split('/');
            path = splitArray.slice(splitArray.length - count, splitArray.length).join('/');
        } else {
            path = targetPath;
        }
        return path;
    }

    public static deleteByPath(filters: AppliedFilters[], path: string, level: number) {
        var parentArray = this.getParent(path.replace(/\/\//g, '/')); // replace condition added for proper working of deleteFilter
        // go through all filters
        for (var i = 0; i < filters.length; i++) {
            // if component at the current level of the full path matches the value of the nested filter structure
            if (parentArray[level] === filters[i].i) {
                // move below and recursively call the same function adding a level
                this.deleteByPath(filters[i].v, path, level + 1);
                // If current filter has no children, it's the last filter
                // If the current filter was manually added, it's a directly removable filter
                if (filters[i].v.length === 0) {
                    // If no delete operation has taken place before (+children count is zero), directly remove
                    // if (ref.deleteCount === 0) {
                    //     filters.splice(i, 1);
                    //     ref.deleteCount++;
                    // } else if (!filters[i].m) {
                    // Else a delete op has taken place and this is an automatically 
                    // added filter (+ it's children count is zero)
                    filters.splice(i, 1);
                    // ref.deleteCount++;
                    // }
                }
                break; // no need to match again
            }
            // break;
        }
    }
}
