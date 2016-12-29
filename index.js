const Application = require('./app');
// JSON-файлы тоже можно подгружать через require!
const config = require('./config.json');


let app = new Application();
// Возьмем express-приложение и запустим HTTP-сервер. Настройки возьмем из
// конфига приложения. После того, как приложение начнет слушать порт,
// будет выполнена функция, переданная в качестве аргумента.
app.expressApp.listen(config.port, config.host, function() {
    console.log(`App listening at port ${config.port}`);
});
