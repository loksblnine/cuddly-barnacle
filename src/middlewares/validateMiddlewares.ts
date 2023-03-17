/**
 * validateMiddleware.ts
 * */

import {NextFunction, Request, Response} from "express";
import {IValidationError} from "../types";
import {resError, validateEmail, validateName, validatePassword} from "../utils";
import {Images, initModels, Portfolios} from "../database/models/init-models";
import {sequelize} from "../database/config/config";

export const validateEmailMiddleware = (request: Request, response: Response, next: NextFunction): void => {
  try {
    const email = String(request.body.email);
    const errors: IValidationError = {};
    if (!email) {
      errors.email = "Email is required.";
    }
    if (!validateEmail(email)) {
      errors.email = "Use valid email.";
    }
    if (Object.getOwnPropertyNames(errors).length === 0) {
      next();
    } else {
      resError('Conflict', next);
    }
  } catch (e) {
    resError('Forbidden', next);
  }
};

export const validatePasswordMiddleware = (request: Request, response: Response, next: NextFunction): void => {
  try {
    const password = request.body.newPassword ? String(request.body.newPassword) : request.body.password;
    const errors: IValidationError = {};
    if (!password) {
      errors.password = "Password is required.";
    }
    if (!validatePassword(password)) {
      errors.password = "Use valid password.";
    }
    if (Object.getOwnPropertyNames(errors).length === 0) {
      next();
    } else {
      resError('Conflict', next);
    }
  } catch (e) {
    resError('Forbidden', next);
  }
};

export const validateNameMiddleware = (request: Request, response: Response, next: NextFunction): void => {
  try {
    const firstName = String(request.body.firstName);
    const errors: IValidationError = {};
    if (!firstName) {
      errors.name = "Name is required.";
    }
    if (!validateName(firstName)) {
      errors.name = "Use valid name.";
    }
    if (Object.getOwnPropertyNames(errors).length === 0) {
      next();
    } else {
      resError('Conflict', next);
    }
  } catch (e) {
    resError('Forbidden', next);
  }
};

export const isUserExist = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    const email = String(request.body.email);
    const existed = await initModels(sequelize).Users.findOne({
      where: {
        email
      }
    });
    if (existed) {
      resError('Conflict', next);
    }
    next()
  } catch (e) {
    resError('Forbidden', next);
  }
}

export const isUsersPortfolio = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = Number(request.body.user.id);
    const portfolioId = Number(request.params.id);
    const existed = await initModels(sequelize).UserToPortfolio.findOne({
      where: {
        user_id: userId,
        portfolio_id: portfolioId
      }
    });
    if (existed) {
      return next()
    }
    resError('Bad request', next);
  } catch (e) {
    resError('Forbidden', next);
  }
}

export const isUsersImage = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = Number(request.body.user.id);
    const imageId = Number(request.params.id);
    const existed = await initModels(sequelize).UserToPortfolio.findOne({
      where: {
        user_id: userId,
      },
      include: [{
        model: Portfolios,
        as: 'portfolio',
        include: [{
          model: Images,
          as: 'image_id_images',
          where: {
            id: imageId
          }
        }]
      }]
    });
    if (existed?.portfolio) {
      return next()
    }
    resError('Bad request', next);
  } catch (e) {
    resError('Forbidden', next);
  }
}
