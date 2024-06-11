const product = {
    namespaced: true,
    store: () => ({
        idProduct: 1,
        infoProduct: {},
    }),
    getters:{},
    mutations: {
        setProduct(state, id) {
            state.idProduct = id;
        },
        setInfoProduct(state, id) {
            state.infoProduct = id;
        }
    },
    actions: {},
}

export default product;