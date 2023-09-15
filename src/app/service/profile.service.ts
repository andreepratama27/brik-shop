export async function getMe() {
  try {
    const response = await fetch("/api/auth/me");
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}

export async function destroyMe() {
  try {
    const response = await fetch("/api/auth/logout");
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}
