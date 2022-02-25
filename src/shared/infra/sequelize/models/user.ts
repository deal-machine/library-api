import { Model } from "sequelize";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  cpf: string;
  address: string;
  birthDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number;
    public name!: string;
    public birthDate: Date;
    public cpf!: string;
    public address: string;
    public email!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      // define association here

      User.hasMany(models.Rental, {
        foreignKey: { field: "id_usuario", name: "userId", allowNull: false },
      });

      User.hasMany(models.Reservation, {
        foreignKey: { field: "id_usuario", name: "userId", allowNull: false },
      });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: "id_usuario",
      },
      name: {
        type: DataTypes.STRING(80),
        allowNull: false,
        field: "nome",
      },
      birthDate: {
        type: DataTypes.DATE,
        field: "data_nascimento",
      },
      cpf: {
        type: DataTypes.STRING(11),
        allowNull: false,
        field: "cpf",
        unique: true,
        validate: {
          len: {
            args: [11, 11],
            msg: "Length of CPF must be have eleven characters.",
          },
        },
      },
      address: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "endereco",
      },
      email: {
        type: DataTypes.STRING(80),
        allowNull: false,
        field: "email",
        validate: { isEmail: { msg: "Email format is required." } },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "data_cadastro",
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "data_alteracao",
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "usuario",
      underscored: true,
    }
  );
  return User;
};
