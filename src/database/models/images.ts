import * as Sequelize from 'sequelize';
import {DataTypes, Model, Optional} from 'sequelize';
import type {ImageToPortfolio, ImageToPortfolioId} from './imageToPortfolio';
import type {Portfolios, PortfoliosId} from './portfolios';

export interface ImagesAttributes {
  id: number;
  description: string;
  image_url: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ImagesPk = "id";
export type ImagesId = Images[ImagesPk];
export type ImagesOptionalAttributes = "id";
export type ImagesCreationAttributes = Optional<ImagesAttributes, ImagesOptionalAttributes>;

export class Images extends Model<ImagesAttributes, ImagesCreationAttributes> implements ImagesAttributes {
  id!: number;
  description!: string;
  image_url!: string;
  createdAt!: Date;
  updatedAt!: Date;

  // Images hasMany ImageToPortfolio via image_id
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
  // Images belongsToMany Portfolios via image_id and portfolio_id
  portfolio_id_portfolios!: Portfolios[];
  getPortfolio_id_portfolios!: Sequelize.BelongsToManyGetAssociationsMixin<Portfolios>;
  setPortfolio_id_portfolios!: Sequelize.BelongsToManySetAssociationsMixin<Portfolios, PortfoliosId>;
  addPortfolio_id_portfolio!: Sequelize.BelongsToManyAddAssociationMixin<Portfolios, PortfoliosId>;
  addPortfolio_id_portfolios!: Sequelize.BelongsToManyAddAssociationsMixin<Portfolios, PortfoliosId>;
  createPortfolio_id_portfolio!: Sequelize.BelongsToManyCreateAssociationMixin<Portfolios>;
  removePortfolio_id_portfolio!: Sequelize.BelongsToManyRemoveAssociationMixin<Portfolios, PortfoliosId>;
  removePortfolio_id_portfolios!: Sequelize.BelongsToManyRemoveAssociationsMixin<Portfolios, PortfoliosId>;
  hasPortfolio_id_portfolio!: Sequelize.BelongsToManyHasAssociationMixin<Portfolios, PortfoliosId>;
  hasPortfolio_id_portfolios!: Sequelize.BelongsToManyHasAssociationsMixin<Portfolios, PortfoliosId>;
  countPortfolio_id_portfolios!: Sequelize.BelongsToManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Images {
    return Images.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      image_url: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: "images_image_url_key"
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
      tableName: 'images',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: "images_image_url_key",
          unique: true,
          fields: [
            {name: "image_url"},
          ]
        },
        {
          name: "images_pkey",
          unique: true,
          fields: [
            {name: "id"},
          ]
        },
      ]
    });
  }
}
