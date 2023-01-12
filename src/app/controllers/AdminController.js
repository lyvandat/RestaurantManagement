exports.renderDashBoard = (req, res, next) => {
  res.render("./admin/dashboard", {
    layout: "adminMain.hbs",
  });
};

exports.renderBilling = (req, res, next) => {
  res.render("./admin/billing", { layout: "adminMain.hbs" });
};

exports.renderProfile = (req, res, next) => {
  res.render("./admin/profile", { layout: "adminMain.hbs" });
};

exports.renderTables = (req, res, next) => {
  res.render("./admin/tables", { layout: "adminMain.hbs" });
};
