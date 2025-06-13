import instance from "."


export async function deleteUser(userId) {
    try {
        const { data, status } = await instance.delete(`api/v1/users/${userId}`)
        return { data, status }
    } catch (error) {
        throw error
    }
}