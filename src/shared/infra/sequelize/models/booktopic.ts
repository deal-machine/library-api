import { Model } from "sequelize";

interface BookTopicAttributes {
  id: number;
  bookId: number;
  topicId: number;
  createdAt: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class BookTopic
    extends Model<BookTopicAttributes>
    implements BookTopicAttributes
  {
    public id!: number;
    public bookId!: number;
    public topicId!: number;

    public readonly createdAt!: Date;

    static associate(models: any) {
      // define association here
    }
  }
  BookTopic.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_livro",
        references: { model: "livro", key: "id_livro" },
      },
      topicId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_assunto",
        references: { model: "assunto", key: "id_assunto" },
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "data_cadastro",
        allowNull: false,
      },
    },
    {
      sequelize,
      underscored: true,
      modelName: "BookTopic",
      tableName: "livro_assunto",
    }
  );
  return BookTopic;
};
