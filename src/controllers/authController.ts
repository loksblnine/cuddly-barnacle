/**
 * authController.ts
 * */

import {NextFunction, Request, Response} from "express";
import bcrypt from "bcrypt";
import {procedureRegenerate, resError, responseDeleted} from "../utils";
import {sequelize} from "../database/config/config";
import {initModels, UserSecrets} from "../database/models/init-models";

export const registerUser = async (request: Request, response: Response, next: NextFunction): Promise<void | Response> => {
  try {
    const email = String(request.body.email),
      password = String(request.body.password),
      role = 2,
      first_name = String(request.body.firstName);

    const encryptedPassword = await bcrypt.hash(password, 5);
    const t = await sequelize.transaction();
    try {
      const newUser = await initModels(sequelize).Users.create({
        email, first_name
      }, {
        transaction: t
      });

      await initModels(sequelize).UserSecrets.create({
        user_id: newUser.id, password: encryptedPassword, role_id: role
      }, {transaction: t});

      const result = await procedureRegenerate(newUser.id, email, role, t);
      await t.commit();
      return response.status(200).json({...result, user_id: newUser.id, role});
    } catch (e) {
      await t.rollback();
      resError('Something went wrong', next);
    }
  } catch (err) {
    resError('Something went wrong', next);
  }
};

export const loginUser = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const email = String(request.body.email),
      password = String(request.body.password);

    if (!(email && password)) {
      resError('Something went wrong', next);
      return;
    }
    const t = await sequelize.transaction();
    try {
      const user: any = await initModels(sequelize).Users.findOne({
        where: {
          email
        },
        include: [{
          model: UserSecrets,
          as: 'userSecrets',
          attributes: ['password', 'role_id']
        }],
        transaction: t
      }).then((res) => res?.toJSON());
      const role = user?.userSecrets[0]?.role_id;
      const passwordMatch = await bcrypt.compare(password, user?.userSecrets[0]?.password);
      if (passwordMatch) {
        const result = await procedureRegenerate(user.id, user.email, role, t);
        await t.commit();
        return response.status(200).json({...result, user_id: user.id, role});
      }
      await t.rollback();
      resError('Something went wrong', next);

    } catch (e) {
      await t.rollback();
      resError('Something went wrong', next);
    }
  } catch (err) {
    resError('Something went wrong', next);
  }
};

export const logoutUser = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const userId = String(request.body.user.id);
    await initModels(sequelize).Tokens.destroy({
      where: {
        user_id: userId
      }
    })
    return response.status(200).json({status: 'success'})
  } catch (e) {
    resError('Unauthorized', next);
  }
}

export const regenerateTokens = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    const {id, email, role} = request.body.user;
    const result = await procedureRegenerate(Number(id), email, Number(role));
    response.status(200).json({...result, user_id: id, role});
  } catch (e) {
    resError('Something went wrong', next);
  }
};

export const deleteAccount = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = Number(request.body.user.id);
    await initModels(sequelize).Users.destroy({
      where: {
        id: userId
      }
    })
    responseDeleted(response)
  } catch (e) {
    resError('Something went wrong', next);
  }
}