import {NextFunction, Request, Response} from "express";
import {sequelize} from "../database/config/config";
import {initModels} from "../database/models/init-models";
import {resError, responseDeleted} from "../utils";
import cloud from "../utils/cloudinary.config";

export const createPortfolio = async (request: Request, response: Response, next: NextFunction): Promise<void | Response> => {
  try {
    const name = String(request.body.name);
    const userId = Number(request.body.user.id);

    const transaction = await sequelize.transaction()
    try {
      const portfolio = await initModels(sequelize).Portfolios.create({
        name
      }, {transaction})
      await initModels(sequelize).UserToPortfolio.create({
        user_id: userId,
        portfolio_id: portfolio.id
      }, {transaction})
      await transaction.commit();
      response.status(201).json(portfolio)
    } catch (e) {
      await transaction.rollback();
      resError('Something went wrong', next);
    }
  } catch (err) {
    resError('Something went wrong', next);
  }
};

export const uploadImage = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    const user_id = Number(request.body.user.id);
    const portfolioId = Number(request.params.id);
    const fileStr = request.body?.imageBase64;
    const description = String(request.body.description);

    const uploadResponse = await cloud.uploader.upload(fileStr, {
      gravity: 'face',
      crop: 'crop',
      height: 300,
      width: 300,
      folder: `cuddly-barnacle/${process.env.BUCKET}/${user_id}/portfolio${portfolioId}`,
      public_id: new Date().getTime().toString()
    });

    const transaction = await sequelize.transaction()
    try {
      const image = await initModels(sequelize).Images.create({
          image_url: String(uploadResponse.secure_url),
          description,
        }, {
          transaction
        }
      );
      await initModels(sequelize).ImageToPortfolio.create({
        image_id: image.id, portfolio_id: portfolioId
      }, {transaction})
      await transaction.commit()
      response.status(201).json({message: "Success", photo_url: uploadResponse.secure_url});
    } catch (e) {
      await transaction.rollback()
      resError('Something went wrong', next);
    }
  } catch (e) {
    resError('Something went wrong', next);
  }
};

export const deletePortfolio = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    const portfolioId = Number(request.params.id);
    await initModels(sequelize).Portfolios.destroy({
      where: {
        id: portfolioId
      }
    })
    responseDeleted(response)
  } catch (e) {
    resError('Something went wrong', next);
  }
};
