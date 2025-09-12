
function login() {
    const loginForm = document.getElementById("login_form");
  
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      try {
        fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        })
          .then((response) => {
            console.log(response);
            if (response.ok) {
              console.log("Login successfully");
              return response.json();
            } else {
              console.log("Login failed");
            }
          })
          .then((data) => {
            console.log(data);
            localStorage.setItem("accessToken", data.accessToken);
          })
          .catch((err) => {
            console.error("error:", err);
          });
      } catch (error) {
        console.log(error);
      }
    });
  }
  
async function getAdmins() {
    let accessToken = localStorage.getItem("accessToken");
  
    const accessTokenExpTime = getTokenExpTime(accessToken);
    console.log("accessTokenExpTime:", accessTokenExpTime);
    if (accessTokenExpTime) {
      const currentTime = new Date();
      if (currentTime < accessTokenExpTime) {
        console.log("AccessToken faol");
      } else {
        console.log("Access tokenni vaqti chiqib ketdi");
        accessToken = await refreshToken();
      }
    } else {
      console.log("AccessToken chiqish vaqti berilmagan");
    }
  
    fetch("http://47.84.199.94:3000/api/admin", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Request failed with status:", response.status);
        }
      })
      .then((adminData) => {
        console.log(adminData);
        displayAdmins(adminData.data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
}
  
async function getOper() {
    let accessToken = localStorage.getItem("accessToken")

    const accessTokenExpTime = getTokenExpTime(accessToken)
    if(accessTokenExpTime){
        const currentTime = new Date()
        if(currentTime<accessTokenExpTime){
            console.log("AccessesToken faol");
        } else{
            console.log("AccessToken vaqti chqib ketti");
            accessToken = await refreshToken()
        }
    } else {
        console.log("AccessToken chiqish vaqti berilmagan");
    }

    fetch("http://47.84.199.94:3000/api/operation",{
        method: "Get",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    })
    .then((response)=>{
        if(response.ok){
            return response.json()
        } else {
            console.log("Request failed with status: ", response.status);        
        }
    })
    .then((oper) => {
        console.log(oper);
        displayOper(oper.data)
    })
    .catch((error)=>{
        console.log("Error: ", error);
    })
}

async function getOrder() {
    let accessToken = localStorage.getItem("accessToken")

    const accessTokenExpTime = getTokenExpTime(accessToken)
    if(accessTokenExpTime){
      const currentTime = new Date()
      if(currentTime < accessTokenExpTime){
        console.log("AccessToken faol");
      }else {
        console.log("Accesstoken vaqti chqib ketgan");
        accessToken = await refreshToken()
      }
    }else{
      console.log("AccessToken chqish vati berilmagan vaqti berilmagan");
    }

    fetch("http://47.84.199.94:3000/api/order",{
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    })
    .then((response)=>{
      console.log(response);
      
      if(response.ok){
        return response.json()
      }else{
        console.log("Request failed with status: ", response.status);
      }
    })
    .then((orderData)=>{
      console.log(orderData);
      displayOrder(orderData.data)
    })
}

function displayAdmins(adminData) {
    const adminsList = document.getElementById("list-admins");
    adminData.forEach((admin) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${admin.full_name} - ${admin.email}`;
      adminsList.appendChild(listItem);
    });
}

function displayOper(operData){
    const operList = document.getElementById("list-oper")
    operData.forEach((oper)=>{
        const listItem = document.createElement("li")
        listItem.textContent = `${oper.operation_date} - ${oper.description}`
        operList.appendChild(listItem)
    })
}

function displayOrder(orederData){
  const orderList = document.getElementById("list-order")
  orederData.forEach((order)=>{
    const listItem = document.createElement("li")
    listItem.textContent = `${order.product_link} - ${order.sum}`
    orderList.appendChild(listItem)
  })
}
  
function getTokenExpTime(token) {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
  
    if (decodedToken.exp) {
      return new Date(decodedToken.exp * 1000);
    }
    return null;
}
  
async function refreshToken() {
    const loginUrl = "/login";
    try {
      const response = await fetch("http://localhost:3000/api/auth/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
  
      if (data.error && data.error == "jwt expired") {
        console.log("Refresh tokenning vaqti chiqib ketgan");
        return window.location.replace(loginUrl);
      }
      console.log("Tokenlar refresh token yordami yangilandi");
      localStorage.setItem("accessToken", data.accessToken);
      return data.accessToken;
    } catch (error) {
      console.log(error);
      return window.location.replace(loginUrl);
    }
}
  