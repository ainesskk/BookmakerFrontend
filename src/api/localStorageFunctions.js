export async function setToken(token) {
    localStorage.setItem("token", token);
}

export async function getToken() {
    return localStorage.getItem("token");
}

export async function setData(userData){
    localStorage.setItem("userData", JSON.stringify(userData));
}

export async function getData(){
    const userInfo = JSON.parse(localStorage.getItem('userData'));
    if (userInfo) {
        return userInfo;
    } else {
        return null;
    }
}

export async function getLogin(){
    const userInfo = JSON.parse(localStorage.getItem('userData'));
    if (userInfo) {
        return userInfo.username;
    } else {
        return null;
    }
}

export function setEditData(changedData){
    const userInfo = JSON.parse(localStorage.getItem('userData'));
    const newInfo = {
        balance: userInfo.balance,
        birthDate: changedData.birthDate,
        email: changedData.email,
        fullName: changedData.fullName,
        password: userInfo.password,
        phone: changedData.phone,
        role: userInfo.role,
        username: userInfo.username,
    }
    localStorage.setItem("userData", JSON.stringify(newInfo));
}

export function setEditBalance(newBalance){
    const userInfo = JSON.parse(localStorage.getItem('userData'));
    const newInfo = {
        balance: newBalance,
        birthDate: userInfo.birthDate,
        email: userInfo.email,
        fullName: userInfo.fullName,
        password: userInfo.password,
        phone: userInfo.phone,
        role: userInfo.role,
        username: userInfo.username,
    }
    localStorage.setItem("userData", JSON.stringify(newInfo));
}
