import instance from ".";
export async function getUsers() {
    try {
        const { data, status } = await instance.get('/api/v1/users')
        return { data, status }
    } catch (error) {
        throw error
    }
}



export async function getUserInfo(userId) {
    try {
        const { data, status } = await instance.get(`api/v1/users/${userId}`)
        return { data, status }
    } catch (error) {
        throw error
    }
}


