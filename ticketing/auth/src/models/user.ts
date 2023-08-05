import mongoose from 'mongoose';
import { Password } from '../services/password';

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
},
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      }
  }
});

userSchema.pre('save', async function(done) { // we are not using an arrow function so the 'this' keyword scopes to this argument instead of the entire file 
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);


export { User };