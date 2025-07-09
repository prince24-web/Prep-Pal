const API_BASE_URL = "http://localhost:3000/api";

class AuthAPI {
    async makeRequest(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const config = {
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
            ...options,
        };

        if (options.body) {
            config.body = JSON.stringify(options.body);
        }

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                // Handle specific error cases
                if (response.status === 500) {
                    if (data.message === "Database connection not available") {
                        throw new Error(
                            "Backend is not properly configured. Please check the environment variables."
                        );
                    }
                    throw new Error(data.message || "Server error occurred");
                }
                throw new Error(
                    data.message || data.error || "An error occurred"
                );
            }

            return data;
        } catch (error) {
            if (error.name === "TypeError" && error.message.includes("fetch")) {
                throw new Error(
                    "Cannot connect to backend server. Please make sure the backend is running on http://localhost:3000"
                );
            }
            throw error;
        }
    }

    async login(email, password) {
        return this.makeRequest("/auth/login", {
            method: "POST",
            body: { email, password },
        });
    }

    async register(email, password, username) {
        return this.makeRequest("/auth/register", {
            method: "POST",
            body: { email, password, username },
        });
    }

    async googleAuth(redirectTo) {
        return this.makeRequest("/auth/google", {
            method: "POST",
            body: { redirectTo },
        });
    }

    async getCurrentUser(token) {
        return this.makeRequest("/users/me", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    async getSummaries(token) {
        return this.makeRequest("/summarize", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    async getFlashcards(token) {
        return this.makeRequest("/flashcards", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
}

export const authAPI = new AuthAPI();
