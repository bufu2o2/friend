const path = require("path");

module.exports = (app) => {
    app.get("/", (req,res) => {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    app.get("/survey", (res,req) => {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });
}