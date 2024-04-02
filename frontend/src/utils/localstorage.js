export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("access_token");
  localStorage.removeItem("image");
};
