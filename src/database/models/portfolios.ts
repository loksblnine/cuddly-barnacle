import * as Sequelize from 'sequelize';
import {DataTypes, Model, Optional} from 'sequelize';
import type {ImageToPortfolio, ImageToPortfolioId} from './imageToPortfolio';
import type {Images, ImagesId} from './images';
import type {UserToPortfolio, UserToPortfolioId} from './userToPortfolio';
import type {Users, UsersId} from './users';

export interface PortfoliosAttributes {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PortfoliosPk = "id";
export type PortfoliosId = Portfolios[PortfoliosPk];
export type PortfoliosOptionalAttributes = "id" | "createdAt" | "updatedAt";
export type PortfoliosCreationAttributes = Optional<PortfoliosAttributes, PortfoliosOptionalAttributes>;

export class Portfolios extends Model<PortfoliosAttributes, PortfoliosCreationAttributes> implements PortfoliosAttributes {
  id!: number;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;

  // Portfolios hasMany ImageToPortfolio via portfolio_id
  imageToPortfolios!: ImageToPortfolio[];
  getImageToPortfolios!: Sequelize.HasManyGetAssociationsMixin<ImageToPortfolio>;
  setImageToPortfolios!: Sequelize.HasManySetAssociationsMixin<ImageToPortfolio, ImageToPortfolioId>;
  addImageToPortfolio!: Sequelize.HasManyAddAssociationMixin<ImageToPortfolio, ImageToPortfolioId>;
  addImageToPortfolios!: Sequelize.HasManyAddAssociationsMixin<ImageToPortfolio, ImageToPortfolioId>;
  createImageToPortfolio!: Sequelize.HasManyCreateAssociationMixin<ImageToPortfolio>;
  removeImageToPortfolio!: Sequelize.HasManyRemoveAssociationMixin<ImageToPortfolio, ImageToPortfolioId>;
  removeImageToPortfolios!: Sequelize.HasManyRemoveAssociationsMixin<ImageToPortfolio, ImageToPortfolioId>;
  hasImageToPortfolio!: Sequelize.HasManyHasAssociationMixin<ImageToPortfolio, ImageToPortfolioId>;
  hasImageToPortfolios!: Sequelize.HasManyHasAssociationsMixin<ImageToPortfolio, ImageToPortfolioId>;
  countImageToPortfolios!: Sequelize.HasManyCountAssociationsMixin;
  // Portfolios belongsToMany Images via portfolio_id and image_id
  image_id_images!: Images[];
  getImage_id_images!: Sequelize.BelongsToManyGetAssociationsMixin<Images>;
  setImage_id_images!: Sequelize.BelongsToManySetAssociationsMixin<Images, ImagesId>;
  addImage_id_image!: Sequelize.BelongsToManyAddAssociationMixin<Images, ImagesId>;
  addImage_id_images!: Sequelize.BelongsToManyAddAssociationsMixin<Images, ImagesId>;
  createImage_id_image!: Sequelize.BelongsToManyCreateAssociationMixin<Images>;
  removeImage_id_image!: Sequelize.BelongsToManyRemoveAssociationMixin<Images, ImagesId>;
  removeImage_id_images!: Sequelize.BelongsToManyRemoveAssociationsMixin<Images, ImagesId>;
  hasImage_id_image!: Sequelize.BelongsToManyHasAssociationMixin<Images, ImagesId>;
  hasImage_id_images!: Sequelize.BelongsToManyHasAssociationsMixin<Images, ImagesId>;
  countImage_id_images!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Portfolios hasMany UserToPortfolio via portfolio_id
  userToPortfolios!: UserToPortfolio[];
  getUserToPortfolios!: Sequelize.HasManyGetAssociationsMixin<UserToPortfolio>;
  setUserToPortfolios!: Sequelize.HasManySetAssociationsMixin<UserToPortfolio, UserToPortfolioId>;
  addUserToPortfolio!: Sequelize.HasManyAddAssociationMixin<UserToPortfolio, UserToPortfolioId>;
  addUserToPortfolios!: Sequelize.HasManyAddAssociationsMixin<UserToPortfolio, UserToPortfolioId>;
  createUserToPortfolio!: Sequelize.HasManyCreateAssociationMixin<UserToPortfolio>;
  removeUserToPortfolio!: Sequelize.HasManyRemoveAssociationMixin<UserToPortfolio, UserToPortfolioId>;
  removeUserToPortfolios!: Sequelize.HasManyRemoveAssociationsMixin<UserToPortfolio, UserToPortfolioId>;
  hasUserToPortfolio!: Sequelize.HasManyHasAssociationMixin<UserToPortfolio, UserToPortfolioId>;
  hasUserToPortfolios!: Sequelize.HasManyHasAssociationsMixin<UserToPortfolio, UserToPortfolioId>;
  countUserToPortfolios!: Sequelize.HasManyCountAssociationsMixin;
  // Portfolios belongsToMany Users via portfolio_id and user_id
  user_id_users!: Users[];
  getUser_id_users!: Sequelize.BelongsToManyGetAssociationsMixin<Users>;
  setUser_id_users!: Sequelize.BelongsToManySetAssociationsMixin<Users, UsersId>;
  addUser_id_user!: Sequelize.BelongsToManyAddAssociationMixin<Users, UsersId>;
  addUser_id_users!: Sequelize.BelongsToManyAddAssociationsMixin<Users, UsersId>;
  createUser_id_user!: Sequelize.BelongsToManyCreateAssociationMixin<Users>;
  removeUser_id_user!: Sequelize.BelongsToManyRemoveAssociationMixin<Users, UsersId>;
  removeUser_id_users!: Sequelize.BelongsToManyRemoveAssociationsMixin<Users, UsersId>;
  hasUser_id_user!: Sequelize.BelongsToManyHasAssociationMixin<Users, UsersId>;
  hasUser_id_users!: Sequelize.BelongsToManyHasAssociationsMixin<Users, UsersId>;
  countUser_id_users!: Sequelize.BelongsToManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Portfolios {
    return Portfolios.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.fn('now')
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.fn('now')
      }
    }, {
      sequelize,
      tableName: 'portfolios',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: "portfolios_pkey",
          unique: true,
          fields: [
            {name: "id"},
          ]
        },
      ]
    });
  }
}
