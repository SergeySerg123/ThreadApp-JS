module.exports = (orm, DataTypes) => {
    const Post = orm.define('Post', {
        body: {
            allowNull: false,
            type: DataTypes.TEXT
        },
        isActive: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {});

    Post.associate = function (models) {
        Post.belongsTo(models.Image);
        Post.belongsTo(models.User);
        Post.hasMany(models.PostReaction);
        Post.hasMany(models.Comment);
    };

    return Post;
};