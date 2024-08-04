export const createAuthSlice = (set) => ({   // a function that will stores info from autherization
  userInfo: undefined,
  setUserInfo: (userInfo) => set({ userInfo }),
});
