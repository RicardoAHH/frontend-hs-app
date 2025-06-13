import instance from ".";

export async function cambioContraseña(body) {
  try {
    const { data, status } = await instance.put('api/v1/auth/change-password', body);
    return { data, status };
  } catch (error) {
    throw error;
  }
}
