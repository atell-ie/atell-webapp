export default {
    /**
     * Get List Item for Id
     */
    getItemForId: (list: any, id: number) => {
        const index = list.byId[id];
        if (index == null) return {};
        return list.data[index];
    },
    /**
     * Get List Item Reducer is not used anywhere we can remove after your review.
     */
    // getItemReducer: (state: any, item: any) => {
    //     const next = { ...state, item };
    //     let index = next.byId[item.id];
    //     if (index == null) {
    //         index = next.data.length;
    //         next.byId[item.id] = index;
    //         next.data.push(item);
    //     } else {
    //         next.data[index] = item;
    //     }
    //     return next;
    // },
    /**
     * Get List Reducer
     * @description Map data array to { byId, data }
     */
    getReducer: (state: any, data: Array<any>) => ({
        ...state,
        byId: data.reduce(
            (p: any, c: any, i: number) => ({ ...p, [c.id]: i }),
            {}
        ),
        data,
    }),
    /**
     * Merge List Reducer
     * @description Merge state and data array to { byId, data }
     */
    mergeReducer: (state: any, data: Array<any>) => {
        const next = { ...state };
        data.forEach((item) => {
            let index = next.byId[item.id];
            if (index == null) {
                index = next.data.length;
                next.byId[item.id] = index;
                next.data.push(item);
            } else {
                next.data[index] = item;
            }
            if (next.item && next.item.id === item.id) {
                next.item = item;
            }
        });
        return next;
    },
};
