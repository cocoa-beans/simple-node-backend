class ChatRoomManager {
    constructor () {
        // Задаем поля класса в его конструкторе.

        // Словарь чат-комнат - позволяет получить чат-комнату по ее id.
        this.chatRooms = {};
        // Счетчик, который хранит id, который бдет присвоен следующей комнате
        this._nextRoomId = 0;
    }

    createRoom (name) {
        // Создаем объект новой комнаты
        let room = new ChatRoom(this._nextRoomId++, name);
        // Заносим его в словарь
        this.chatRooms[room.id] = room;
        return room;
    }

    // Регистронезависимый поиск по имени комнаты
    findByName (searchSubstring) {
        // Переведем поисковый запрос в нижний регистр
        let lowerSearchSubstring = searchSubstring.toLowerCase();

        // Получим массив комнат. Для этого, получим все ключи словаря в виде
        // массива, и для каждого ключа вытащим соответствующий ему элемент
        // Если вы используете Node 7.2 или выше, то можно сделать так:
        // let rooms = Object.values(this.chatRooms);
        let rooms = Object.keys(this.chatRooms).map(id => this.chatRooms[id]);

        // Отфильтруем из массива только те комнаты, в названии которых есть
        // заданная подстрока
        return rooms.filter(room =>
            room.name.toLowerCase().indexOf(lowerSearchSubstring) !== -1
        );
    }

    // Получаем комнату по ее id
    getById (id) {
        return this.chatRooms[id];
    }
}


class ChatRoom {
    constructor (id, name) {
        this.id = id;
        // В отличие от чат-комнат, сообщения хранятся в массиве, а не в словаре,
        // так как не стоит задачи получения сообщения по его id
        this.messages = [];
        this.name = name;
        // По аналогии с ChatRoomManager - счетчик хранит id следующего объекта
        this._nextMessageId = 0;
    }

    postMessage (body, username) {
        // Создадим новый объект сообщения и поместим его в массив
        // Дату намеренно не передаем - см. конструктор Message
        let message = new Message(this._nextMessageId++, body, username);
        this.messages.push(message);
        return message;
    }

    toJson () {
        // Приведем объект к тому JSON-представлению, которое отдается клиенту
        return {
            id: this.id,
            name: this.name
        };
    }
}


class Message {
    constructor (id, body, username, datetime) {
        this.id = id;
        this.body = body;
        this.username = username;
        // Если дата не задана явно, то используются текущие дата и время сервера
        // new Date() без аргументов примет значение текущих даты/времени
        this.datetime = datetime || new Date();
    }

    toJson () {
        return {
            id: this.id,
            body: this.body,
            username: this.username,
            // Объект даты сериализуем в строку
            datetime: this.datetime.toUTCString()
        };
    }
}


// Определим объекты, которые будут экспортироваться модулем как внешнее API:
module.exports = { ChatRoomManager, ChatRoom, Message };
