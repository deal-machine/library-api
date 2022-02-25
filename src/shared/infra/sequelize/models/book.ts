import { Model } from "sequelize";

interface BookAttributes {
  id: number;
  title: string;
  abstract: string;
  release: Date;
  publisherId?: number;
  createdAt: Date;
  updatedAt: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Book extends Model<BookAttributes> implements BookAttributes {
    public id!: number;
    public title!: string;
    public abstract!: string;
    public release!: Date;
    public publisherId?: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      // define association here

      Book.belongsToMany(models.Author, {
        as: "authors",
        through: "livro_autor",
        foreignKey: { field: "id_livro", name: "bookId", allowNull: false },
        otherKey: { field: "id_autor", name: "authorId", allowNull: false },
        onDelete: "SET NULL",
      });

      Book.belongsTo(models.Publisher, {
        foreignKey: {
          field: "id_editora",
          name: "publisherId",
        },
      });

      Book.hasMany(models.Exemplary, {
        foreignKey: { field: "id_livro", name: "bookId", allowNull: false },
      });

      Book.belongsToMany(models.Topic, {
        as: "topics",
        through: "livro_assunto",
        foreignKey: { field: "id_livro", name: "bookId", allowNull: false },
        otherKey: { field: "id_assunto", name: "topicId", allowNull: false },
      });
    }
  }
  Book.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: "id_livro",
      },
      title: {
        type: DataTypes.STRING(80),
        allowNull: false,
        field: "titulo",
        validate: {
          len: { args: [0, 80], msg: "Title length musb be 80 characteres" },
        },
      },
      abstract: {
        type: DataTypes.STRING(800),
        allowNull: false,
        field: "resumo",
      },
      release: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "data_lancamento",
      },
      publisherId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        field: "id_editora",
        references: {
          model: "editora",
          key: "id_editora",
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
      modelName: "Book",
      tableName: "livro",
      underscored: true,
    }
  );
  return Book;
};
