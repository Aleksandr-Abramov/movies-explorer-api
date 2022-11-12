# movies-explorer-api

## Для вход на вервер
alex@178.154.226.213

## Ссылки:
По скольку фронденд еще не написан. Оставляю ссылки для проверке сервера. Для удобства.
http://api.movies-alex.nomoredomains.icu/
https://api.movies-alex.nomoredomains.icu/
http://movies-alex.nomoredomains.icu/ - пока не работает, фронтенд еще не написан.
https://movies-alex.nomoredomains.icu/ - пока не работает, фронтенд еще не написан.

### Ссылки для проверке сервера(postman):
POST http://api.movies-alex.nomoredomains.icu/signin - авторизация
POST http://api.movies-alex.nomoredomains.icu/signup - регистрация
GET http://api.movies-alex.nomoredomains.icu/signout - выход
GET http://api.movies-alex.nomoredomains.icu/users/me - получить данные пользователя
PATCH http://api.movies-alex.nomoredomains.icu/users/me - извенить данные пользователя
GET http://api.movies-alex.nomoredomains.icu/movies - получить фильмы пользователя. Сейчас пользователь получает фильмы которые создал сам. В дальнейшем, поменяю на фильмы которые понравились. Нужный сервис сейчас отсутствует.
POST http://api.movies-alex.nomoredomains.icu/movies - создать фильм. Сейчас создается без поля movieId. В данный момент сервис MoviesExplorer отсутствует.
DELETE http://api.movies-alex.nomoredomains.icu/movies/:idфильма - удаление фильма

### Фикстуры
Для создания фильма.
{
    "country": "USA",
    "director": "Buden",
    "duration": 60,
    "year": "1985",
    "description": "фильм про пиратов",
    "image": "https://picsum.photos/200/300.jpg",
    "trailer": "https://picsum.photos/200/300.jpg",
    "thumbnail": "https://picsum.photos/200/300.jpg",
    "owner": "63406788cff22eaa83a82e55",
    "nameRU": "Пираты каррибского моря",
    "nameEN": "pirats",
    "_id": "6342d793e5b3f193af91a231",
    "__v": 0
}
Зарегистрированный пользователь
{
    "email": "alexAbramov1985@yandex.ru",
    "password": "123"
}
