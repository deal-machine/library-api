import { Model } from "sequelize";

interface BookAuthorAttributes {
  id: number;
  bookId: number;
  authorId: number;
  createdAt: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class BookAuthor
    extends Model<BookAuthorAttributes>
    implements BookAuthorAttributes
  {
    public id!: number;
    public bookId!: number;
    public authorId!: number;

    public readonly createdAt!: Date;

    static associate(models: any) {}
  }
  BookAuthor.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      bookId: {
        field: "id_livro",
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "livro", key: "id_livro" },
      },
      authorId: {
        field: "id_autor",
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "autor", key: "id_autor" },
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "data_cadastro",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "BookAuthor",
      tableName: "livro_autor",
      underscored: true,
    }
  );
  return BookAuthor;
};
