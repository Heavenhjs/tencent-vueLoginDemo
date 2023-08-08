import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      uid: "",
      username: "",
      nickName: "",
      role: "",
    };
  },
  // 开启数据持久化
  // 全部持久化
  persist: true,
  // 自定义数据持久化
  // persist: {
  //   // 修改存储中使用的键名称，默认为当前 Store的 id
  //   key: "storekey",
  //   // 修改为 sessionStorage，默认为 localStorage
  //   storage: window.sessionStorage,
  //   // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
  //   paths: ["username"],
  // },
  /* 
        类似于组件的computed，用来封装计算属性，有缓存的功能
    */
  getters: {},
  /* 
        类似于methods,封装业务逻辑，修改state
    */
  actions: {
    setUser(data) {
      this.uid = data.uid;
      this.username = data.username;
      this.nickName = data.nickName;
      this.role = data.role;
    },
  },
});
