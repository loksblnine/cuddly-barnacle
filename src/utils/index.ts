/**
 * utils/index.ts
 * */

import jwt from "jsonwebtoken";
import {NextFunction, Response} from "express";
import {v4 as uuidv4} from "uuid";
import {initModels} from "../database/models/init-models";
import {sequelize} from "../database/config/config";

export const generateAccessToken = (id: number, email: string, role: number, uid: string, time: string): string => {
  return jwt.sign(
    {id, email, role, uid},
    String(process.env.SECRET_KEY),
    {
      expiresIn: time,
    }
  );
};

export const generateRefreshToken = (role_id: number, uid: string, time: string): { id: string; token: string } => {
  const payload = {
    id: uid,
    role_id
  };
  const token = jwt.sign(
    payload,
    String(process.env.SECRET_KEY),
    {
      expiresIn: time,
    }
  );
  return {
    token,
    id: payload.id
  };
};

export const procedureRegenerate = async (id: number, email: string, role: number, transaction?: any) => {
  const uid = uuidv4();
  const accessToken = generateAccessToken(id, email, role, uid, "2h");
  const refreshToken = generateRefreshToken(role, uid, "4h");
  await initModels(sequelize).Tokens.findOne({
    where: {
      user_id: id
    },
    transaction
  })
    // @ts-ignore
    .then((obj) => {
      if (obj) {
        return initModels(sequelize).Tokens.update({token_id: refreshToken.id}, {
          where: {
            user_id: id
          },
          transaction
        });
      }
      return initModels(sequelize).Tokens.create({user_id: id, token_id: refreshToken.id}, {transaction});
    });
  return {
    accessToken,
    refreshToken: refreshToken.token
  };
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailRegex.test(email);
};

export const validatePassword = (pass: string) => {
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
  return passRegex.test(pass);
};

export const validateName = (name: string) => {
  const nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{1,25}$/;
  return nameRegex.test(name);
};

export const resError = (message: string, next: NextFunction) => {
  next(new Error(message));
}

export const responseStatus401 = (response: Response): void => {
  response.status(401).json({message: "Unauthorized."});
};

export const responseStatus500 = (response: Response): void => {
  response.status(500).json({message: "Something went wrong."});
};

export const responseDeleted = (response: Response): void => {
  response.status(200).json({message: "Deleted."});
};
