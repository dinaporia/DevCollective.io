const {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require("graphql");
const { getPostFieldById } = require("../db/post-db");

const postFieldHoc = (fieldName) => (id) => getPostFieldById(id, fieldName);

const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => {
    const UserType = require("./UserType");
    const CommunityType = require("./CommunityType");

    return {
      id: {
        type: GraphQLString,
        resolve: (id) => id,
      },
      title: {
        type: GraphQLString,
        resolve: postFieldHoc("title"),
      },
      commentCount: {
        type: GraphQLString,
        resolve: postFieldHoc("commentCount"),
      },
      upvoteCount: {
        type: GraphQLString,
        resolve: postFieldHoc("upvoteCount"),
      },
      createdAt: {
        type: GraphQLString,
        resolve: postFieldHoc("createdAt"),
      },
      author: {
        type: UserType,
        resolve: postFieldHoc("createdBy"),
      },
      community: {
        type: CommunityType,
        resolve: postFieldHoc("community"),
      },
    };
  },
});

module.exports = PostType;
