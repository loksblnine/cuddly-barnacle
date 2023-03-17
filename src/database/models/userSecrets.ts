import * as Sequelize from 'sequelize';
import {DataTypes, Model, Optional} from 'sequelize';
import type {Roles, RolesId} from './roles';
import type {Users, UsersId} from './users';

export interface UserSecretsAttributes {
  user_id: number;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  role_id: number;
}

export type UserSecretsPk = "user_id" | "password";
export type UserSecretsId = UserSecrets[UserSecretsPk];
export type UserSecretsOptionalAttributes = "createdAt" | "updatedAt";
export type UserSecretsCreationAttributes = Optional<UserSecretsAttributes, UserSecretsOptionalAttributes>;

export class UserSecrets extends Model<UserSecretsAttributes, UserSecretsCreationAttributes> implements UserSecretsAttributes {
  user_id!: number;
  password!: string;
  createdAt!: Date;
  updatedAt!: Date;
  role_id!: number;

  // UserSecrets belongsTo Roles via role_id
  role!: Roles;
  getRole!: Sequelize.BelongsToGetAssociationMixin<Roles>;
  setRole!: Sequelize.BelongsToSetAssociationMixin<Roles, RolesId>;
  createRole!: Sequelize.BelongsToCreateAssociationMixin<Roles>;
  // UserSecrets belongsTo Users via user_id
  user!: Users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserSecrets {
    return UserSecrets.init({
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id'
        }
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
      tableName: 'userSecrets',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: "usersecrets_pk",
          unique: true,
          fields: [
            {name: "user_id"},
            {name: "password"},
          ]
        },
        {
          name: "usersecrets_user_id_password_index",
          fields: [
            {name: "user_id"},
            {name: "password"},
          ]
        },
      ]
    });
  }
}
