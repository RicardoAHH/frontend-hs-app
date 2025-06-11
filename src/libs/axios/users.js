import instance from ".";

export async function getUsers() {
    try {
        const { data, status } = await instance.get('/api/v1/users')
        return { data, status }
    } catch (error) {
        throw error
    }
}