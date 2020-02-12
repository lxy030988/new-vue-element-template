import { getTreeNow, getTreeArr } from "@/utils/treeOperations";

const state = {
  navs: [
    {
      id: 1,
      parentId: 0,
      icon: "home",
      path: "/dashboard",
      name: "系统首页"
    },
    {
      id: 4,
      parentId: 0,
      icon: "facilities",
      path: "4",
      name: "基础设施",
      children: [
        {
          id: 26,
          parentId: 4,
          path: "/device",
          name: "设备管理"
        },
        {
          id: 27,
          parentId: 4,
          path: "/lane",
          name: "车道管理"
        }
      ]
    },
    {
      id: 1000,
      parentId: 0,
      icon: "404",
      path: "/404",
      name: "404",
      hidden: true
    },
    {
      id: 1001,
      parentId: 0,
      icon: "403",
      path: "/403",
      name: "403",
      hidden: true
    }
  ],
  crumbs: []
};

const mutations = {
  setCrumbs: (state, path) => {
    const now = getTreeNow(state.navs, path);
    state.crumbs = getTreeArr(state.navs, now, []);
  },
  setNavs: (state, navs) => {
    state.navs = navs;
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
