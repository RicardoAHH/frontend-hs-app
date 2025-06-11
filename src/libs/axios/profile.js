import instance from "."


export async function profile() {
    try {
        const { data, status } = await instance.get('api/v1/auth/profile')
        return { data, status }
    } catch (error) {
        throw error
    }
}