import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        forcedLogin: false,
        hasLogin: false,
        name: "",
		tokenId:"",
		headImg:"",
		integral:"",
		nickname:""
    },
    mutations: {
        login(state, name,tokenId,headImg,integral,nickname) {
            state.name = name;
			state.tokenId = tokenId;
			state.headImg = headImg;
			state.integral = integral;
			state.nickname = nickname;
            state.hasLogin = true;
        },
        logout(state) {
            state.name =""
			state.tokenId = ""
			state.headImg = ""
			state.integral ="";
			state.nickname ="";
            state.hasLogin = false;
        }
    }
})

export default store
