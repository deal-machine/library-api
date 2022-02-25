import { Model } from "sequelize";
import { AppError } from "@shared/errors/AppError";

interface EmployeeAttributes {
  id: number;
  name: string;
  birthDate: Date;
  cpf: string;
  address: string;
  isAdmin: boolean;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Employee
    extends Model<EmployeeAttributes>
    implements EmployeeAttributes
  {
    public id!: number;
    public name!: string;
    public birthDate!: Date;
    public cpf!: string;
    public address!: string;
    public isAdmin!: boolean;
    public email!: string;
    public password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      // define association here

      Employee.hasMany(models.Rental, {
        foreignKey: {
          field: "id_funcionario",
          name: "employeeId",
          allowNull: false,
        },
      });

      Employee.hasMany(models.Reservation, {
        foreignKey: {
          field: "id_funcionario",
          name: "employeeId",
          allowNull: false,
        },
      });
    }
  }

  Employee.init(
    {
      id: {
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: "id_funcionario",
      },
      name: { type: DataTypes.STRING(80), allowNull: false, field: "nome" },
      birthDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "data_nascimento",
      },
      cpf: {
        type: DataTypes.STRING(11),
        allowNull: false,
        field: "cpf",
        unique: true,
        validate: {
          isCPFValid(cpf: string) {
            if (cpf.length != 11 || cpf == null)
              throw new AppError("CPF must be have eleven characters.");
          },
        },
      },
      address: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "endereco",
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "administrador",
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "email",
        validate: { isEmail: { msg: "Email must be have correct format." } },
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "senha",
        validate: {
          len: {
            msg: "Password must have more than eight characters.",
            args: [8, 100],
          },
        },
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
      modelName: "Employee",
      tableName: "funcionario",
      underscored: true,
    }
  );
  return Employee;
};
