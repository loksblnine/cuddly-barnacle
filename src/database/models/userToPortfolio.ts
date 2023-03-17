import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import type { Portfolios, PortfoliosId } from './portfolios';
import type { Users, UsersId } from './users';

export interface UserToPortfolioAttributes {
  user_id: number;
  portfolio_id: number;
}

export type UserToPortfolioPk = "user_id" | "portfolio_id";
export type UserToPortfolioId = UserToPortfolio[UserToPortfolioPk];
export type UserToPortfolioCreationAttributes = UserToPortfolioAttributes;

export class UserToPortfolio extends Model<UserToPortfolioAttributes, UserToPortfolioCreationAttributes> implements UserToPortfolioAttributes {
  user_id!: number;
  portfolio_id!: number;

  // UserToPortfolio belongsTo Portfolios via portfolio_id
  portfolio!: Portfolios;
  getPortfolio!: Sequelize.BelongsToGetAssociationMixin<Portfolios>;
  setPortfolio!: Sequelize.BelongsToSetAssociationMixin<Portfolios, PortfoliosId>;
  createPortfolio!: Sequelize.BelongsToCreateAssociationMixin<Portfolios>;
  // UserToPortfolio belongsTo Users via user_id
  user!: Users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserToPortfolio {
    return UserToPortfolio.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
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
    tableName: 'userToPortfolio',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "usertoportfolio_pk",
        unique: true,
        fields: [
          { name: "user_id" },
          { name: "portfolio_id" },
        ]
      },
      {
        name: "usertoportfolio_user_id_portfolio_id_uindex",
        unique: true,
        fields: [
          { name: "user_id" },
          { name: "portfolio_id" },
        ]
      },
    ]
  });
  }
}
