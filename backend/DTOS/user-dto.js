module.exports = class UserDto {
  id;
  email;
  name;
  isActivated;
  nickName;
  avatar;
  info;
  birthday;
  constructor(model) {
    (this.id = model._id),
      (this.email = model.email),
      (this.isActivated = model.isActivated),
      (this.name = model.name);
    this.nickName = model.nickName;
    this.avatar = model.userAvatar;
    this.info = model.info;
    this.birthday = model.birthday;
  }
};
