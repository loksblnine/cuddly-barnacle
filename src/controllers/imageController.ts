import {NextFunction, Request, Response} from "express";
import {initModels, Portfolios,} from "../database/models/init-models";
import {sequelize} from "../database/config/config";
import {resError, responseDeleted} from "../utils";

export const deleteImage = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    const imageId = Number(request.params.id);
    await initModels(sequelize).Images.destroy({
      where: {
        id: imageId
      }
    })
    responseDeleted(response)
  } catch (e) {
    resError('Something went wrong', next);
  }
};

export const getFeed = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    const limit = Number(request.query.limit) || 10;
    const offset = Number(request.query.offset) || 0;
    const dateOrder = String(request.query.dateOrder) === "ASC" ? "ASC" : "DESC";
    const feed = await initModels(sequelize).Images.findAll({
      limit,
      offset,
      order: [['createdAt', dateOrder]],
      attributes: ["description", "image_url", "createdAt"],
      include: [{
        model: Portfolios,
        as: 'portfolios'
      }]
    })
    response.status(200).json(feed)
  } catch (e) {
    resError('Something went wrong', next);
  }
}