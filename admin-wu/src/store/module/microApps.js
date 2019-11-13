export default {
  state: {
    microAppHtml:"",
    loading:false
  },
  mutations: {
    setMicroAppHtml(state,microAppHtml){
      state.microAppHtml = microAppHtml;
    },
    setLoading(state,loading){
      state.loading = loading;
    },
  },
  getters: {
  
  },
  actions:{
  
  }
}