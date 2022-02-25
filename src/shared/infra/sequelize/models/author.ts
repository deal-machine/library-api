import { Model } from "sequelize";

interface AuthorAttributes {
  id: number;
  name: string;
  namePublication: string;
  createdAt: Date;
  updatedAt: Date;
}

export = (sequelize: any, DataTypes: any) => {
  class Author extends Model<AuthorAttributes> implements AuthorAttributes {
    public id!: number;
    public name!: string;
    public namePublication!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      // define association here

      Author.belongsToMany(models.Book, {
        as: "books",
        through: "livro_autor",
        foreignKey: { field: "id_autor", name: "authorId", allowNull: false },
        otherKey: { field: "id_livro", name: "bookId", allowNull: false },
        onDelete: "SET NULL",
      });
    }
  }
  Author.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        field: "id_autor",
      },
      name: { type: DataTypes.STRING(80), allowNull: false, field: "nome" },
      namePublication: {
        type: DataTypes.STRING(80),
        allowNull: false,
        field: "nome_publicacao",
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
      modelName: "Author",
      tableName: "autor",
      underscored: true,
    }
  );
  return Author;
};
