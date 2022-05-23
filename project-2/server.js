import app from "./index.js";
const HTTP_PORT = 8000;
app.listen(HTTP_PORT, () => {
    console.log('Server is listening on port ' + HTTP_PORT);
});