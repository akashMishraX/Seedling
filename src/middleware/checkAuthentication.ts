import jwt from 'jsonwebtoken';

const SECERT_KEY = process.env.SECERT_KEY || "";

export async function verifyJWTToken(token:string,SECERT_KEY:string) {
    if (!token) { 
        return null;
    }
    try {
        return jwt.verify(token,SECERT_KEY);
    } catch (error) {
        return null
    }
    
}

