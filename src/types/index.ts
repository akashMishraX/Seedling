
export interface blueprint {
    usertype: string;
    username: string;
    password: string;
    SECRET_KEY: string ;
    response : string | null;
    error : string | null;
    TOKEN_KEY : string | null;
}

export type userData = Pick<blueprint,'usertype'| 'username'|'password'|'SECRET_KEY'>
export type JwtPayload = Pick<blueprint,'usertype'| 'username'|'password'>
export type key = Pick<blueprint,'SECRET_KEY'>
export type resResult = Pick<blueprint,'response'| 'error'>
export type Token = Pick<blueprint,'TOKEN_KEY'>