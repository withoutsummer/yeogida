// api/LogoutApi.js
export const logoutUser = async (token) => {
    const url = 'https://yeogida.net/users/logout';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.ok) {
        return { success: true };
    } else if (response.status === 401) {
        throw new Error('Invalid or expired token.');
    } else {
        throw new Error('An error occurred while logging out.');
    }
};
