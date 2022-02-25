import { Model } from "sequelize";

interface RentalAttributes {
  id: number;
  employeeId: number;
  exemplaryId: number;
  userId: number;

  rentalDate: Date;
  expectedReturnDate: Date;

  returnDate: Date;

  penalty: number;

  createdAt: Date;
  updatedAt: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Rental extends Model<RentalAttributes> implements RentalAttributes {
    public id!: number;
    public rentalDate!: Date;
    public expectedReturnDate!: Date;
    public returnDate: Date;
    public penalty: number;

    public employeeId!: number;
    public exemplaryId!: number;
    public userId!: number;

    public readonly createdAt: Date;
    public readonly updatedAt: Date;

    static associate(models: any) {
      // define association here
      Rental.belongsTo(models.Employee, {
        foreignKey: {
          field: "id_funcionario",
          name: "employeeId",
          allowNull: false,
        },
      });

      Rental.belongsTo(models.Exemplary, {
        foreignKey: {
          allowNull: false,
          field: "id_exemplarlivro",
          name: "exemplaryId",
        },
      });

      Rental.belongsTo(models.User, {
        foreignKey: { field: "id_usuario", name: "userId", allowNull: false },
      });

      Rental.hasMany(models.Reservation, {
        foreignKey: { field: "id_aluguel", name: "rentalId", allowNull: true },
        onDelete: "SET NULL",
      });
    }
  }
  Rental.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: "id_aluguel",
      },
      employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_funcionario",
        references: {
          model: "funcionario",
          key: "id_funcionario",
        },
      },
      exemplaryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_exemplarlivro",
        references: {
          model: "exemplarlivro",
          key: "id_exemplarlivro",
        },
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "id_usuario",
        references: {
          model: "usuario",
          key: "id_usuario",
        },
      },
      rentalDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "data_aluguel",
      },
      expectedReturnDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "dataprevista_devolucao",
      },
      returnDate: { type: DataTypes.DATE, field: "data_devolucao" },
      penalty: { type: DataTypes.REAL, field: "multa" },
      createdAt: {
        allowNull: true,
        type: DataTypes.DATE,
        field: "data_cadastro",
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        field: "data_alteracao",
      },
    },
    {
      sequelize,
      modelName: "Rental",
      tableName: "aluguel",
      underscored: true,
    }
  );
  return Rental;
};
