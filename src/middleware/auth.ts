import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
// Get jwt from header

export function getTokenFromHeader(req: Request): string {
    const authorization = req.headers.authorization;

    if (authorization) {
        return authorization.split(' ')[1];
    }
    return null;
}

export async function getUserId(req: Request): Promise<string> {
    const token = getTokenFromHeader(req);
    const payload = verify(token, process.env.JWT_SECRET) as any;   

    return payload.userId;
}