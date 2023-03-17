import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { UserSecrets, UserSecretsId } from './userSecrets';

export interface RolesAttributes {
  id: number;
  description: string;
}

export type RolesPk = "id";
export type RolesId = Roles[RolesPk];
export type RolesOptionalAttributes = "id";
export type RolesCreationAttributes = Optional<RolesAttributes, RolesOptionalAttributes>;

export class Roles extends Model<RolesAttributes, RolesCreationAttributes> implements RolesAttributes {
  id!: number;
  description!: string;

  // Roles hasMany UserSecrets via role_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof Roles {
    return Roles.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: "roles_description_key"
    }
  }, {
    sequelize,
    tableName: 'roles',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "roles_description_key",
        unique: true,
        fields: [
          { name: "description" },
        ]
      },
      {
        name: "roles_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
