import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import type { Users, UsersId } from './users';

export interface TokensAttributes {
  user_id: number;
  token_id: string;
}

export type TokensPk = "user_id";
export type TokensId = Tokens[TokensPk];
export type TokensCreationAttributes = TokensAttributes;

export class Tokens extends Model<TokensAttributes, TokensCreationAttributes> implements TokensAttributes {
  user_id!: number;
  token_id!: string;

  // Tokens belongsTo Users via user_id
  user!: Users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Tokens {
    return Tokens.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    token_id: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tokens',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tokens_pkey",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
