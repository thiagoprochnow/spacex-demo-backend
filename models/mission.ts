import { Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

type OmitTypes = '';

class Mission extends Model<
    InferAttributes<
        Mission,
        {
            omit: OmitTypes;
        }
    >,
    InferCreationAttributes<
        Mission,
        {
            omit: OmitTypes;
        }
    >
> {
    declare id: CreationOptional<string>;
    declare name: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare shipId: string;

    static initModel(sequelize: Sequelize) {
        Mission.init(
            {
                id: {
                    type: DataTypes.UUID,
                    primaryKey: true,
                    defaultValue: DataTypes.UUIDV4,
                },
                name: { type: DataTypes.STRING, allowNull: false },
                createdAt: { type: DataTypes.DATE, allowNull: false },
                updatedAt: { type: DataTypes.DATE, allowNull: false },
                shipId: { type: DataTypes.STRING, allowNull: false },
            },
            {
                sequelize,
            },
        );

        return Mission;
    }
    // public static associate = ({  }) => {
    // };
}

export { Mission, Mission as MissionAttributes };
