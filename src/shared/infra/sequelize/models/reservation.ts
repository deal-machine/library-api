import { Model } from "sequelize";

interface ReservationAttributes {
  id: number;
  employeeId: number;
  exemplaryId: number;
  userId: number;
  rentalId: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Reservation
    extends Model<ReservationAttributes>
    implements ReservationAttributes
  {
    public id!: number;
    public startDate!: Date;
    public endDate!: Date;

    public employeeId!: number;
    public exemplaryId!: number;
    public userId!: number;
    public rentalId: number;

    public readonly createdAt!: Date;
    public readonly updatedAt: Date;

    static associate(models: any) {
      // define association here
      Reservation.belongsTo(models.Employee, {
        foreignKey: {
          field: "id_funcionario",
          name: "employeeId",
          allowNull: false,
        },
      });

      Reservation.belongsTo(models.User, {
        foreignKey: { field: "id_usuario", name: "userId", allowNull: false },
      });

      Reservation.belongsTo(models.Exemplary, {
        foreignKey: {
          field: "id_exemplarlivro",
          name: "exemplaryId",
          allowNull: false,
        },
      });

      Reservation.belongsTo(models.Rental, {
        foreignKey: { field: "id_aluguel", name: "rentalId", allowNull: true },
        onDelete: "SET NULL",
      });
    }
  }
  Reservation.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: "id_reserva",
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
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_usuario",
        references: {
          model: "usuario",
          key: "id_usuario",
        },
      },
      rentalId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "id_aluguel",
        references: {
          model: "aluguel",
          key: "id_aluguel",
        },
        onDelete: "SET NULL",
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "data_inicio",
      },
      endDate: { type: DataTypes.DATE, allowNull: false, field: "data_fim" },
      createdAt: {
        allowNull: false,
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
      modelName: "Reservation",
      tableName: "reserva",
      underscored: true,
    }
  );
  return Reservation;
};
