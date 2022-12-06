const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const { engine } = require("express-handlebars");
const app = express();
// parsing cookies
var cookieParser = require("cookie-parser");
const route = require("./routes");

app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(methodOverride("_method"));

// Custom middlewares
// app.use(SortMiddleware);

// HTTP logger
// app.use(morgan('combined'));

// Template engines
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
    helpers: {
      sum: (a, b) => a + b,
      isFirstVis: (vr) => {
        if (vr == 0) return true;
        else return false;
      },
      loops: (n, block) => {
        var accum = "";
        for (var i = 0; i < n; ++i) accum += block.fn(i);
        return accum;
      },
      if_cond: (v1, op, v2, options) => {
        switch (op) {
          case "==":
            return v1 == v2 ? options.fn(this) : options.inverse(this);
          case "===":
            return v1 === v2 ? options.fn(this) : options.inverse(this);
          case "!=":
            return v1 != v2 ? options.fn(this) : options.inverse(this);
          case "!==":
            return v1 !== v2 ? options.fn(this) : options.inverse(this);
          case "<":
            return v1 < v2 ? options.fn(this) : options.inverse(this);
          case "<=":
            return v1 <= v2 ? options.fn(this) : options.inverse(this);
          case ">":
            return v1 > v2 ? options.fn(this) : options.inverse(this);
          case ">=":
            return v1 >= v2 ? options.fn(this) : options.inverse(this);
          case "&&":
            return v1 && v2 ? options.fn(this) : options.inverse(this);
          case "||":
            return v1 || v2 ? options.fn(this) : options.inverse(this);
          default:
            return options.inverse(this);
        }
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// Routes init
route(app);

module.exports = app;
