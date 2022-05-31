export const setLocalStorage = (key, value) => {
  if (window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
export const removeLocalStorage = (key) => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};
export const getLocalStorage = (key) => {
  if (window !== "undefined") {
    return JSON.parse(localStorage.getItem(key));
  }
};
export const setKeyCloakRealmOnLS = (realm) => {
  if (realm) {
    // console.log(realm);
    // console.log("iiiiiiiirealm", realm);
    setLocalStorage("kcRealm", realm);
  }
};
export const getKeyCloakRealmFromLS = () => {
  const realmName = getLocalStorage("kcRealm");

  return realmName;
};
export const removeKeyCloakRealmOnLS = () => {
  removeLocalStorage("kcRealm");
};

export const setUserId = (key, value) => {
  if (window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

export const getUserId = (key) => {
  if (window !== "undefined") {
    return JSON.parse(localStorage.getItem(key));
  }
};
