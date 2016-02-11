var config, srcPath, wwwPath;

srcPath = 'src';
wwwPath = 'dist';

config = {
  srcPath: srcPath,
  wwwPath: wwwPath,
  index: {
    src: srcPath + "/index.html",
    dest: "" + wwwPath
  },
  app: {
    src: [srcPath + "/main.js", srcPath + "/**/*.module.js", srcPath + "/**/*.route.js", srcPath + "/**/*.js"],
    concatFile: "app.js",
    dest: wwwPath + "/js"
  },
  style: {
    src: [srcPath + "/**/*.scss"],
    concatFile: "app.css",
    dest: wwwPath + "/css"
  },
  templates: {
    src: [srcPath + "/**/*.html", "!" + srcPath + "/index.html"],
    moduleName: "running",
    concatFile: "templates.js",
    dest: wwwPath + "/js"
  },
  assets: {
    src: "assets/**",
    dest: "" + wwwPath
  },
  vendors: {
    concatFileJs: "/js/vendors.js",
    concatFileCss: "/css/vendors.css",
    destFonts: wwwPath + "/fonts",
    dest: "" + wwwPath
  }
};

module.exports = config;
