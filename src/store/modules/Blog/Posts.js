import api from "@/api";


const Posts = ({
    namespaced: true,
    state: () => ({

        categories: null,

    }),
    getters: {

        categories(state) {
            return state.categories
        },
    },
    mutations: {

        setCategories(state, value) {
            state.categories = value
        },

    },
    actions: {

        getDataPosts({commit}) {
            api.get('/api/admin/posts/create')
                .then(res => {
                    commit('setCategories', res.data.categories)
                })
        },

    },
})

export default Posts
