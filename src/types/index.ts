export interface JwtPayload {
    userType: string;
    username: string;
    password: string;
}

export interface userData {
    usertype: string;
    username: string;
    password: string;
    SECRET_KEY: string;
}
export interface resResult {
    response : string | null,
    error : string | null,
}    

export type Token = string;