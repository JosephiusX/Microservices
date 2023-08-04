import mongoose from 'mongoose';

// An interface that describes the properties required to make a new user(create user)
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties of a User Model (entire user model for all users)
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// Interface describeing the properties a User document has (props a single user has)
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  updatedAt: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// const user = User.build({
//   email: 'test@test.com',
//   password: 'alksdjf'
// });
// user.email
// user.password
// user.updatedAt

export { User };