export interface DatabaseUser {
    id: string;
    username: string;
    password: string;
}

export interface SessionType {
    id: string;
    expires_at: string;
    user_id: string;
}