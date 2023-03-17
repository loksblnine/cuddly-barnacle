import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Portfolios, PortfoliosId } from './portfolios';
import type { Tokens, TokensId } from './tokens';
import type { UserSecrets, UserSecretsId } from './userSecrets';
import type { UserToPortfolio, UserToPortfolioId } from './userToPortfolio';

export interface UsersAttributes {
  id: number;
  first_name: string;
  email: string;
}

export type UsersPk = "id";
export type UsersId = Users[UsersPk];
export type UsersOptionalAttributes = "id";
export type UsersCreationAttributes = Optional<UsersAttributes, UsersOptionalAttributes>;

export class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
  id!: number;
  first_name!: string;
  email!: string;

  // Users belongsToMany Portfolios via user_id and portfolio_id
  portfolio_id_portfolios_userToPortfolios!: Portfolios[];
  getPortfolio_id_portfolios_userToPortfolios!: Sequelize.BelongsToManyGetAssociationsMixin<Portfolios>;
  setPortfolio_id_portfolios_userToPortfolios!: Sequelize.BelongsToManySetAssociationsMixin<Portfolios, PortfoliosId>;
  addPortfolio_id_portfolios_userToPortfolio!: Sequelize.BelongsToManyAddAssociationMixin<Portfolios, PortfoliosId>;
  addPortfolio_id_portfolios_userToPortfolios!: Sequelize.BelongsToManyAddAssociationsMixin<Portfolios, PortfoliosId>;
  createPortfolio_id_portfolios_userToPortfolio!: Sequelize.BelongsToManyCreateAssociationMixin<Portfolios>;
  removePortfolio_id_portfolios_userToPortfolio!: Sequelize.BelongsToManyRemoveAssociationMixin<Portfolios, PortfoliosId>;
  removePortfolio_id_portfolios_userToPortfolios!: Sequelize.BelongsToManyRemoveAssociationsMixin<Portfolios, PortfoliosId>;
  hasPortfolio_id_portfolios_userToPortfolio!: Sequelize.BelongsToManyHasAssociationMixin<Portfolios, PortfoliosId>;
  hasPortfolio_id_portfolios_userToPortfolios!: Sequelize.BelongsToManyHasAssociationsMixin<Portfolios, PortfoliosId>;
  countPortfolio_id_portfolios_userToPortfolios!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Users hasOne Tokens via user_id
  token!: Tokens;
  getToken!: Sequelize.HasOneGetAssociationMixin<Tokens>;
  setToken!: Sequelize.HasOneSetAssociationMixin<Tokens, TokensId>;
  createToken!: Sequelize.HasOneCreateAssociationMixin<Tokens>;
  // Users hasMany UserSecrets via user_id
  userSecrets!: UserSecrets[];
  getUserSecrets!: Sequelize.HasManyGetAssociationsMixin<UserSecrets>;
  setUserSecrets!: Sequelize.HasManySetAssociationsMixin<UserSecrets, UserSecretsId>;
  addUserSecret!: Sequelize.HasManyAddAssociationMixin<UserSecrets, UserSecretsId>;
  addUserSecrets!: Sequelize.HasManyAddAssociationsMixin<UserSecrets, UserSecretsId>;
  createUserSecret!: Sequelize.HasManyCreateAssociationMixin<UserSecrets>;
  removeUserSecret!: Sequelize.HasManyRemoveAssociationMixin<UserSecrets, UserSecretsId>;
  removeUserSecrets!: Sequelize.HasManyRemoveAssociationsMixin<UserSecrets, UserSecretsId>;
  hasUserSecret!: Sequelize.HasManyHasAssociationMixin<UserSecrets, UserSecretsId>;
  hasUserSecrets!: Sequelize.HasManyHasAssociationsMixin<UserSecrets, UserSecretsId>;
  countUserSecrets!: Sequelize.HasManyCountAssociationsMixin;
  // Users hasMany UserToPortfolio via user_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof Users {
    return Users.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: "users_email_key"
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
