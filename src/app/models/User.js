const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, default: "User" },
    active: { type: Boolean, default: true },
    photo: { type: String },
  },
  {
    timestamps: true,
  }
);

// document middleware
UserSchema.pre("save", async function (next) {
  // những thay đổi không phải password sẽ không vào middleware này
  if (!this.isModified("password")) return next();

  // hash password
  const hashedPassword = await bcrypt.hash(this.password, 12);

  // replace pure password with
  this.password = hashedPassword;
});

UserSchema.methods.isCorrectPassword = async function (
  password,
  hashedPassword
) {
  const isCorrect = await bcrypt.compare(password, hashedPassword);

  return isCorrect;
};

UserSchema.methods.changePasswordAfter = function (JWTCreatedTime) {
  // JWTCreatedTime: seconds
  // this.changePasswordAt: Date
  // getTime(): milliseconds
  if (this.changePasswordAt) {
    const changedTime = parseInt(this.changePasswordAt.getTime() / 1000);
    return this.changePasswordAt > JWTTimeStamp;
  }

  return false;
};

module.exports = mongoose.model("User", UserSchema);
