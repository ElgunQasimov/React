const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config();

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//Mongoose Schemas
const tagSchema = new mongoose.Schema(
  {
    title: String,
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
    src: String,
    role: String,
    isBanned: Boolean,
    banDate: Date || null,
    banCount: Number,
    favorites: Array,
  },
  { timestamps: true }
);

const blogSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    src: String,
    //one to many relation
    journalistId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    //many to many relation
    tagIds: Array,
    likes: { type: Array, default: [] },
    comments: { type: Array, default: [] },
  },
  { timestamps: true }
);

// const TagBlog = new mongoose.Schema({
//   blogId: ,
//   tagId:
// });

//models
const TagModel = mongoose.model("Tags", tagSchema);
const UserModel = mongoose.model("Users", userSchema);
const BlogModel = mongoose.model("Blogs", blogSchema);

//endpoints
//users, isBanned, banDate, banCount, username, email, password, src, role (client, admin, super-admin, journalist)
//blogs - {id,title,description, createdAt,journalistId, likes[],
//blogs - comments[],coverImg, tagIds[]}
//tagIds - {id,name} - sport,entertainment,history
//reports - {id:1, whoReported: 1,userId:1,reason: ''}

//CRUD - tags
app.get("/api/tags", async (req, res) => {
  const { title } = req.query;
  let tags;
  if (title) tags = await TagModel.find({ title: title });
  else tags = await TagModel.find();

  if (tags.length > 0) {
    res.status(200).send({
      message: "success",
      data: tags,
    });
  } else {
    res.status(204).send({
      message: "not found",
      data: null,
    });
  }
});
app.get("/api/tags/:id", async (req, res) => {
  const { id } = req.params;
  let tag;
  try {
    tag = await TagModel.findById(id);
  } catch (error) {
    res.send({ error: error });
  }
  if (tag) {
    res.status(200).send({
      message: "success",
      data: tag,
    });
  } else {
    res.send({
      message: "no content",
      data: null,
    });
  }
});
app.post("/api/tags", async (req, res) => {
  const tag = new TagModel(req.body);
  await tag.save();
  res.send({
    message: "posted",
    data: tag,
  });
});
app.delete("/api/tags/:id", async (req, res) => {
  const { id } = req.params;
  let response;
  try {
    response = await TagModel.findByIdAndDelete(id);
  } catch (error) {
    res.send({
      error: error,
    });
  }
  res.send({
    message: "deleted",
    response: response,
  });
});
app.patch("/api/tags/:id", async (req, res) => {
  const { id } = req.params;
  const response = await TagModel.findByIdAndUpdate(id, req.body);
  res.send({
    message: "updated",
    response: response,
  });
});

//CRUD - users
app.get("/api/users", async (req, res) => {
  const users = await UserModel.find();

  if (users.length > 0) {
    res.status(200).send({
      message: "success",
      data: users,
    });
  } else {
    res.send({
      message: "not found",
      data: null,
    });
  }
});
app.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  let user;
  try {
    user = await UserModel.findById(id);
  } catch (error) {
    res.send({ error: error });
  }
  if (user) {
    res.status(200).send({
      message: "success",
      data: user,
    });
  } else {
    res.send({
      message: "no content",
      data: null,
    });
  }
});
app.post("/api/users", async (req, res) => {
  const user = new UserModel(req.body);
  await user.save();
  res.send({
    message: "posted",
    data: user,
  });
});
app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  let response;
  try {
    response = await UserModel.findByIdAndDelete(id);
  } catch (error) {
    res.send({
      error: error,
    });
  }
  res.send({
    message: "deleted",
    response: response,
  });
});
app.patch("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const response = await UserModel.findByIdAndUpdate(id, req.body);
  res.send({
    message: "updated",
    response: response,
  });
});

//CRUD - blogs
app.get("/api/blogs", async (req, res) => {
  const blogs = await BlogModel.find();

  if (blogs.length > 0) {
    res.status(200).send({
      message: "success",
      data: blogs,
    });
  } else {
    res.send({
      message: "not found",
      data: null,
    });
  }
});
app.get("/api/blogs/:id", async (req, res) => {
  const { id } = req.params;
  let blog;
  try {
    blog = await BlogModel.findById(id);
  } catch (error) {
    res.send({ error: error });
  }
  if (blog) {
    res.status(200).send({
      message: "success",
      data: blog,
    });
  } else {
    res.send({
      message: "no content",
      data: null,
    });
  }
});
app.post("/api/blogs", async (req, res) => {
  const blog = new BlogModel(req.body);
  await blog.save();
  res.send({
    message: "posted",
    data: blog,
  });
});
app.delete("/api/blogs/:id", async (req, res) => {
  const { id } = req.params;
  let response;
  try {
    response = await BlogModel.findByIdAndDelete(id);
  } catch (error) {
    res.send({
      error: error,
    });
  }
  res.send({
    message: "deleted",
    response: response,
  });
});
app.patch("/api/blogs/:id", async (req, res) => {
  const { id } = req.params;
  const response = await BlogModel.findByIdAndUpdate(id, req.body);
  res.send({
    message: "updated",
    response: response,
  });
});

mongoose
  .connect(process.env.CONNECTION_STRING.replace('<password>', process.env.DB_PASSWORD))
  .then(() => console.log("Connected!"))
  .catch((err) => {
    console.log(err);
  });
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});