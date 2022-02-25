import { Model } from "sequelize";

interface ExemplaryAttributes {
  id: number;
  sampleCode: string;
  provider: string;
  purchaseDate: Date;
  bookId: number;
  createdAt: Date;
  updatedAt: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Exemplary
    extends Model<ExemplaryAttributes>
    implements ExemplaryAttributes
  {
    public id!: number;
    public sampleCode!: string;
    public provider!: string;
    public purchaseDate!: Date;

    public bookId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      // define association here
      Exemplary.belongsTo(models.Book, {
        as: "book",
        foreignKey: { field: "id_livro", name: "bookId", allowNull: false },
      });

      Exemplary.hasMany(models.Rental, {
        foreignKey: {
          allowNull: false,
          field: "id_exemplarlivro",
          name: "exemplaryId",
        },
      });

      Exemplary.hasMany(models.Reservation, {
        foreignKey: {
          field: "id_exemplarlivro",
          name: "exemplaryId",
          allowNull: false,
        },
      });
    }
  }
  Exemplary.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        field: "id_exemplarlivro",
      },
      sampleCode: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: "codigo_exemplar",
      },
      provider: {
        type: DataTypes.STRING(80),
        allowNull: false,
        field: "fornecedor",
      },
      purchaseDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "data_compra",
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_livro",
        references: {
          model: "livro",
          key: "id_livro",
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
      modelName: "Exemplary",
      tableName: "exemplarlivro",
      underscored: true,
    }
  );
  return Exemplary;
};
