# Chat 

## 1. Как запустить проект

___

1) Клонировать репозиторий и перейти в него в командной строке:

    `git clone https://github.com/Ferox-x/chat_djnago_react.git`
2) Для запуска проекта через docker перейдите к пункту 5.


## 2. Запуск Backend'а

___

1) Cоздать и активировать виртуальное окружение poetry в директории backend (python 3.11).

2) Установить зависимости следующей командой:

    `poetry install`

3) Запустить PostgreSQL Server.

    Создать базу данных с названием проекта chat.


4) Запустить Redis Server.
   
   1) Скачать Redis изображение:
   
      `docker pull redis`

   2) Запустить Redis container:
   
      `docker run --name some-redis -d redis`


5) Создать и заполнить .env файл в соответствии с .env_example.

6) Выполнить миграции (перейти в директорию application):

    `python manage.py makemigrations`

    `python manage.py migrate`

7) Загрузить фикстуры (перейти в директорию application):

    `python manage.py loaddata fixtures/*.json`

    Фикстуры содержат двух пользователей со следующими данными:

    
    User 1

    login: username1

    password: user456852

    
    User 2

    login: username2

    password: user456852

9) Запустить сервер (перейти в директорию application):

    `python manage.py runserver`


## 3. Запуск Frontend'а

___

1) Установить node.js (https://nodejs.org/en/download/).

2) Перейти в директорию frontend.

    `cd frontend/`

3) Установить зависимости:

    `npm install`

4) Скомпелировать assets:

    `npm start`


## 4. Pre-commit (для разработки)

___

1) В корне проекта выполняем следующею команду:

    `pre-commit install`

3) Чтобы проверить codestyle, можно выполнить следующею команду:

    `pre-commit run --all-files`


## 5. Запуск с помощью docker
___

1. В корне проекта выполнить следующею команду:

    `docker-compose up -d  --build`

2. Чтобы перейти на сайт в браузере:

    `http://localhost:8000/login`

