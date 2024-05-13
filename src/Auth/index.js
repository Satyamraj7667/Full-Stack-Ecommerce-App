
export const isLoggedIn = () => {
    let data = localStorage.getItem("data");
    if(data != null){
        return true;
    }
    else{
        return false;
    }
}

export const doLogin = (data) =>{
    localStorage.setItem("data",JSON.stringify(data));

    
};

export const doLogout = () =>{
    localStorage.removeItem("data");
    
   
};
export const getCurrentUserToken = () =>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data")).jwtToken;
    }
    else{
        return undefined;
    }

};

export const getCurrentUserEmail = () =>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data")).username;
    }
    else{
        return undefined;
    }
};
export const getCurrentUserUserId = () =>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data")).userid;
    }
    else{
        return undefined;
    }
};
export const getCurrentUserRole = () =>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data")).role;
    }
    else{
        return undefined;
    }
};
export const getCurrentUserFirstName = () =>{
    try{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data")).firstname;
    }
    else{
        return undefined;
    }
    }
    catch (error){
      console.log(error);
    }
};