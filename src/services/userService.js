import { httpAxios } from "@/helper/httpHelper";


export async function addUser(user) {
    const result = await httpAxios
        .post("/api/users", user)
        .then((response) => response.data);
    return result
}

export async function logout() {
    const result = await httpAxios
        .post("/api/logout")
        .then((response) => response.data);
    return result
}