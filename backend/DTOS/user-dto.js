module.exports = class UserDto {
  id;
  email;
  isActivated;
  constructor(model) {
    (this.id = model._id), (this.email = model.email), (this.isActivated = model.isActivated);
  }
};
