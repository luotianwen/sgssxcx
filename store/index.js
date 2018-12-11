import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        forcedLogin: false,
        hasLogin: false,
        userName: "",
		tokenId:"",
		headImg:"",
		integral:"",
		nickName:""
    },
    mutations: {
        login(state, userName,tokenId,headImg,integral,nickName) {
            state.userName = userName;
			state.tokenId = tokenId;
			state.headImg = headImg;
			state.integral = integral;
			state.nickName = nickName;
            state.hasLogin = true;
        },
        logout(state) {
            state.userName =""
			state.tokenId = ""
			state.headImg = ""
			state.integral ="";
			state.nickName ="";
            state.hasLogin = false;
        }
    }
})

export default store
