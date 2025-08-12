const API_URL = "http://localhost:3005/api";

interface LoginData {
    email: string;
    password: string;
    rememberMe: boolean;
}

interface RegisterData {
    userName: string;
    email: string;
    password: string;
    isAdmin?: boolean;
}

export const login = async (data: LoginData) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Login failed");
    }

    const result = await response.json();
    localStorage.setItem("token", result.token);
    return result;
};

export const register = async (data: RegisterData) => {
    const response = await fetch(`${API_URL}/user/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Registration failed");
    }

    return await response.json();
};

export const logout = async () => {
    localStorage.removeItem("token");
    await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: 'include',
    });
};

export const getUserDetails = async () => {
    try {
        const response = await fetch(`${API_URL}/user/me`, {
            method: "GET",
            credentials: "include",
        });

        if (response.status === 401) {
            localStorage.removeItem("token");
            throw new Error("Session expired");
        }

        if (!response.ok) {
            throw new Error("Failed to fetch user details");
        }

        return await response.json();
    } catch (err) {
        localStorage.removeItem("token"); // Clear token on failure
        throw err;
    }
};