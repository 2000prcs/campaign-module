module.exports.artilleryRandomId = (userContext, ee, next) => {
  userContext.vars.id = Math.floor(Math.random() * 10000000) + 1;
  next();
};
