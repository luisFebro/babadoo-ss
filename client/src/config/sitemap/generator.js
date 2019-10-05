require("babel-register")({
  presets: ["es2015", "react"]
});

const router = require("./routes").default;
const Sitemap = require("react-router-sitemap").default;

function generateSitemap() {
    return (
      new Sitemap(router)
          .build("https://babadoo.herokuapp.com")
          .save("./public/sitemap.xml")
    );
}

generateSitemap();

