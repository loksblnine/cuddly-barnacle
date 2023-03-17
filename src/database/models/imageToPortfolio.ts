import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import type { Images, ImagesId } from './images';
import type { Portfolios, PortfoliosId } from './portfolios';

export interface ImageToPortfolioAttributes {
  image_id: number;
  portfolio_id: number;
}

export type ImageToPortfolioPk = "image_id" | "portfolio_id";
export type ImageToPortfolioId = ImageToPortfolio[ImageToPortfolioPk];
export type ImageToPortfolioCreationAttributes = ImageToPortfolioAttributes;

export class ImageToPortfolio extends Model<ImageToPortfolioAttributes, ImageToPortfolioCreationAttributes> implements ImageToPortfolioAttributes {
  image_id!: number;
  portfolio_id!: number;

  // ImageToPortfolio belongsTo Images via image_id
  image!: Images;
  getImage!: Sequelize.BelongsToGetAssociationMixin<Images>;
  setImage!: Sequelize.BelongsToSetAssociationMixin<Images, ImagesId>;
  createImage!: Sequelize.BelongsToCreateAssociationMixin<Images>;
  // ImageToPortfolio belongsTo Portfolios via portfolio_id
  portfolio!: Portfolios;
  getPortfolio!: Sequelize.BelongsToGetAssociationMixin<Portfolios>;
  setPortfolio!: Sequelize.BelongsToSetAssociationMixin<Portfolios, PortfoliosId>;
  createPortfolio!: Sequelize.BelongsToCreateAssociationMixin<Portfolios>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ImageToPortfolio {
    return ImageToPortfolio.init({
    image_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'images',
        key: 'id'
      }
    },
    portfolio_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'portfolios',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'imageToPortfolio',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "imagetoportfolio_image_id_portfolio_id_uindex",
        unique: true,
        fields: [
          { name: "image_id" },
          { name: "portfolio_id" },
        ]
      },
      {
        name: "imagetoportfolio_pk",
        unique: true,
        fields: [
          { name: "image_id" },
          { name: "portfolio_id" },
        ]
      },
    ]
  });
  }
}
