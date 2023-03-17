import type { Sequelize } from "sequelize";
import { ImageToPortfolio as _ImageToPortfolio } from "./imageToPortfolio";
import type { ImageToPortfolioAttributes, ImageToPortfolioCreationAttributes } from "./imageToPortfolio";
import { Images as _Images } from "./images";
import type { ImagesAttributes, ImagesCreationAttributes } from "./images";
import { Portfolios as _Portfolios } from "./portfolios";
import type { PortfoliosAttributes, PortfoliosCreationAttributes } from "./portfolios";
import { Roles as _Roles } from "./roles";
import type { RolesAttributes, RolesCreationAttributes } from "./roles";
import { Tokens as _Tokens } from "./tokens";
import type { TokensAttributes, TokensCreationAttributes } from "./tokens";
import { UserSecrets as _UserSecrets } from "./userSecrets";
import type { UserSecretsAttributes, UserSecretsCreationAttributes } from "./userSecrets";
import { UserToPortfolio as _UserToPortfolio } from "./userToPortfolio";
import type { UserToPortfolioAttributes, UserToPortfolioCreationAttributes } from "./userToPortfolio";
import { Users as _Users } from "./users";
import type { UsersAttributes, UsersCreationAttributes } from "./users";

export {
  _ImageToPortfolio as ImageToPortfolio,
  _Images as Images,
  _Portfolios as Portfolios,
  _Roles as Roles,
  _Tokens as Tokens,
  _UserSecrets as UserSecrets,
  _UserToPortfolio as UserToPortfolio,
  _Users as Users,
};

export type {
  ImageToPortfolioAttributes,
  ImageToPortfolioCreationAttributes,
  ImagesAttributes,
  ImagesCreationAttributes,
  PortfoliosAttributes,
  PortfoliosCreationAttributes,
  RolesAttributes,
  RolesCreationAttributes,
  TokensAttributes,
  TokensCreationAttributes,
  UserSecretsAttributes,
  UserSecretsCreationAttributes,
  UserToPortfolioAttributes,
  UserToPortfolioCreationAttributes,
  UsersAttributes,
  UsersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const ImageToPortfolio = _ImageToPortfolio.initModel(sequelize);
  const Images = _Images.initModel(sequelize);
  const Portfolios = _Portfolios.initModel(sequelize);
  const Roles = _Roles.initModel(sequelize);
  const Tokens = _Tokens.initModel(sequelize);
  const UserSecrets = _UserSecrets.initModel(sequelize);
  const UserToPortfolio = _UserToPortfolio.initModel(sequelize);
  const Users = _Users.initModel(sequelize);

  Images.belongsToMany(Portfolios, { as: 'portfolios', through: ImageToPortfolio, foreignKey: "image_id", otherKey: "portfolio_id" });
  Portfolios.belongsToMany(Images, { as: 'image_id_images', through: ImageToPortfolio, foreignKey: "portfolio_id", otherKey: "image_id" });
  Portfolios.belongsToMany(Users, { as: 'user_id_users', through: UserToPortfolio, foreignKey: "portfolio_id", otherKey: "user_id" });
  Users.belongsToMany(Portfolios, { as: 'portfolio_id_portfolios_userToPortfolios', through: UserToPortfolio, foreignKey: "user_id", otherKey: "portfolio_id" });
  ImageToPortfolio.belongsTo(Images, { as: "image", foreignKey: "image_id"});
  Images.hasMany(ImageToPortfolio, { as: "imageToPortfolios", foreignKey: "image_id"});
  ImageToPortfolio.belongsTo(Portfolios, { as: "portfolio", foreignKey: "portfolio_id"});
  Portfolios.hasMany(ImageToPortfolio, { as: "imageToPortfolios", foreignKey: "portfolio_id"});
  UserToPortfolio.belongsTo(Portfolios, { as: "portfolio", foreignKey: "portfolio_id"});
  Portfolios.hasMany(UserToPortfolio, { as: "userToPortfolios", foreignKey: "portfolio_id"});
  UserSecrets.belongsTo(Roles, { as: "role", foreignKey: "role_id"});
  Roles.hasMany(UserSecrets, { as: "userSecrets", foreignKey: "role_id"});
  Tokens.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasOne(Tokens, { as: "token", foreignKey: "user_id"});
  UserSecrets.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(UserSecrets, { as: "userSecrets", foreignKey: "user_id"});
  UserToPortfolio.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(UserToPortfolio, { as: "userToPortfolios", foreignKey: "user_id"});

  return {
    ImageToPortfolio: ImageToPortfolio,
    Images: Images,
    Portfolios: Portfolios,
    Roles: Roles,
    Tokens: Tokens,
    UserSecrets: UserSecrets,
    UserToPortfolio: UserToPortfolio,
    Users: Users,
  };
}
