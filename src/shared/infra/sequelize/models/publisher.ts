import { Model } from "sequelize";

interface PublisherAttributes {
  id: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Publisher
    extends Model<PublisherAttributes>
    implements PublisherAttributes
  {
    public id!: number;
    public description!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      // define association here
      Publisher.hasMany(models.Book, {
        foreignKey: {
          field: "id_editora",
          name: "publisherId",
          allowNull: false,
        },
      });
    }
  }
  Publisher.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_editora",
      },
      description: {
        type: DataTypes.STRING(80),
        allowNull: false,
        field: "descricao",
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
      modelName: "Publisher",
      tableName: "editora",
      underscored: true,
    }
  );
  return Publisher;
};
