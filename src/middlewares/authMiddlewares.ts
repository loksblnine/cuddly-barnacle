import jwt, {JwtPayload} from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";
import {initModels} from "../database/models/init-models";
import {sequelize} from "../database/config/config";
import {Users} from "../database/models/users";
import {resError} from "../utils";

export const authMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const accessToken = String(request?.headers?.authorization?.split(' ')[1]);
  const refreshToken = String(request.body.refreshToken);
  try {
    if (!accessToken && !refreshToken) {
      resError('Bad request', next);
      return;
    }
    const decoded = jwt.verify(accessToken, String(process.env.SECRET_KEY)) as JwtPayload;
    if (decoded) {
      request.body.user = decoded;
      next();
    }
  } catch (err: any) {
    try {
      if (err.toString().includes("expired")) {
        const decoded = jwt.verify(refreshToken, String(process.env.SECRET_KEY)) as JwtPayload;
        if (decoded) {
          const user: any = await initModels(sequelize).Tokens.findOne({
            where: {
              token_id: decoded.id,
            },
            raw: true,
            include: [{
              model: Users,
              as: 'user',
              attributes: ["email"]
            }]
          });
          if (!user) {
            resError('Forbidden', next);
            return;
          }
          request.body.user = {
            id: user?.user_id,
            email: user["user.email"],
            role: decoded.role_id
          };
          next();
        }
      } else {
        resError('Unauthorized', next);
        return;
      }
    } catch (e) {
      resError('Something went wrong', next);
      return;
    }
  }
};

export const isUserAuthMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    const token = String(request?.headers?.authorization?.split(' ')[1]);
    if (!token) {
      resError('Unauthorized', next);
      return;
    }
    const decoded = jwt.verify(token, String(process.env.SECRET_KEY)) as JwtPayload;
    if (decoded?.role && decoded?.uid) {
      const tokenValid = await initModels(sequelize).Tokens.findOne({
        where: {
          token_id: String(decoded.uid),
          user_id: Number(decoded.id)
        }
      })
      if (tokenValid) {
        request.body.user = decoded;
        next();
      } else {
        resError('Forbidden', next);
        return;
      }
    } else {
      resError('Forbidden', next);
      return;
    }
  } catch (e) {
    return resError('Something went wrong', next);
  }
};

export const isUserMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    const token = String(request?.headers?.authorization?.split(' ')[1]);
    if (!token) {
      resError('Unauthorized', next);
      return;
    }
    request.body.user = jwt.decode(token)
    next()
  } catch (e) {
    resError('Something went wrong', next);
    return;
  }
}
