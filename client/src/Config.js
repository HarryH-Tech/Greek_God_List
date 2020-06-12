import axios from "axios";
const apiURL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_NODE_API
    : "";

//    console.log("API URL IN CONFIG = ", apiURL);

//************USED IN HEADER*************//
export const signOut = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
    return axios.get(apiURL + "/signout");
  }
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }

  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

/**************USED IN SIGNUP*********/
export const signUp = (userDetails) => {
  return axios
    .post(apiURL + "/signup", userDetails)
    .catch((error) => {
      return error.response.data;
    })
    .then((res) => {
      return res;
    });
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

/**************USED IN SIGN IN *************/
export const signIn = (userDetails) => {
  console.log(userDetails);
  return axios
    .post(apiURL + "/signin", userDetails)
    .catch((error) => {
      return error.response.data;
    })
    .then((res) => {
      return res;
    });
};

//************USED IN GOD LISTS *************//
export const getAllGods = () => {
  return axios.get(apiURL + "/gods").then((res) => {
    return res.data;
  });
};

//************USED IN ADMIN LIST **************//
export const deleteMultipleGods = (godIds) => {
  return axios.delete(apiURL + "/gods/delete_gods/" + godIds);
};

//************USED IN ADD GOD **********//
export const addGod = (godDetails) => {
  return axios.post(apiURL + "/gods/add_god", godDetails).then((res) => {
    return res;
  });
};

/**********USED IN DELETE MODAL ******/
export const deleteGod = (id) => {
  console.log(id);
  return axios.delete(apiURL + "/gods/delete_god/" + id);
};

/**********USED IN EDIT MODAL ******/
export const confirmEdit = async (id, details) => {
  return await axios
    .put(apiURL + "/gods/update_god/" + id, details)
    .then((res) => {
      return res;
    })
    .catch((err) => err);
};
