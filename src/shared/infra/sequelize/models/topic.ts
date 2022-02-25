import { Model } from "sequelize";

interface TopicAttributes {
  id: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Topic extends Model<TopicAttributes> implements TopicAttributes {
    public id!: number;
    public description!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      // define association here
      Topic.belongsToMany(models.Book, {
        through: "livro_assunto",
        as: "books",
        foreignKey: { field: "id_assunto", name: "topicId", allowNull: false },
        otherKey: { field: "id_livro", name: "bookId", allowNull: false },
      });
    }
  }

  Topic.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: "id_assunto",
      },
      description: {
        type: DataTypes.STRING,
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
      modelName: "Topic",
      tableName: "assunto",
      underscored: true,
    }
  );
  return Topic;
};
