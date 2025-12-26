// Authentication utility functions for Officer Portal

export interface OfficerUser {
    id: string
    email: string
    fullName: string
    token: string;
    role: "SUPER_ADMIN" | "ADMIN" | "OPERATOR" | "OFFICER"
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
    if (typeof window === "undefined") return false
    const token = localStorage.getItem("officerToken")
    return !!token
}

// Get current user from localStorage
export function getUser(): OfficerUser | null {
    if (typeof window === "undefined") return null
    const userStr = localStorage.getItem("officerUser")
    if (!userStr) return null
    try {
        return JSON.parse(userStr) as OfficerUser
    } catch {
        return null
    }
}

// Get auth token
export function getToken(): string | null {
    if (typeof window === "undefined") return null
    return localStorage.getItem("officerToken")
}

// Save auth data after login
export function saveAuthData(token: string, user: OfficerUser): void {
    localStorage.setItem("officerToken", token)
    localStorage.setItem("officerUser", JSON.stringify(user))
}

// Clear auth data on logout
export function clearAuthData(): void {
    localStorage.removeItem("officerToken")
    localStorage.removeItem("officerUser")
}

// Logout function
export function logout(): void {
    clearAuthData()
    if (typeof window !== "undefined") {
        window.location.href = "/officer/login"
    }
}

// Get user initials for avatar
export function getUserInitials(fullName: string): string {
    const names = fullName.split(" ")
    if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase()
    }
    return fullName.substring(0, 2).toUpperCase()
}

// Role-based permission checks
export function canManageOfficers(role: OfficerUser["role"]): boolean {
    return role === "SUPER_ADMIN" || role === "ADMIN"
}

export function canManageReports(role: OfficerUser["role"]): boolean {
    return role === "SUPER_ADMIN" || role === "ADMIN" || role === "OPERATOR"
}


// export type OfficerUser = {
// token: string;
// role: "SUPER_ADMIN" | "ADMIN" | "OPERATOR";
// };

export function getOfficerUser(): OfficerUser | null {
    if (typeof window === "undefined") return null;

    const raw = localStorage.getItem("officerUser");
    return raw ? JSON.parse(raw) : null;
}
