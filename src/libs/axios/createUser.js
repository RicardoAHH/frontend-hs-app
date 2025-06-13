import instance from ".";
export async function createUsers(body) {
    try {
        const { data, status } = await instance.post('/api/v1/users',body)
        return { data, status }
    } catch (error) {
        throw error
    }
}
