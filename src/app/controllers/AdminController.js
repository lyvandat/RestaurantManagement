exports.renderDashBoard = (req, res, next) => {
  res.render("./admin/dashboard", {
    layout: "adminMain.hbs",
    user: res.locals.user,
  });
};

exports.renderBilling = (req, res, next) => {
  res.render("./admin/billing", { layout: "adminMain.hbs" });
};

exports.renderProfile = (req, res, next) => {
  res.render("./admin/profile", { layout: "adminMain.hbs" });
};

exports.renderSignIn = (req, res, next) => {
  res.render("./admin/sign-in", { layout: false });
};

exports.renderTables = (req, res, next) => {
  res.render("./admin/tables", { layout: "adminMain.hbs" });
};
