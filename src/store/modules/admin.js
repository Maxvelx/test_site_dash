import {createStore} from 'vuex'
import Posts from "@/store/modules/Blog/Posts";
import Main from "@/store/modules/Main/Main";


const store_admin = createStore({
    modules: {
        main: Main,
        post: Posts,
    }
})

export default store_admin