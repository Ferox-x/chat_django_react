#!/usr/bin/env sh

python /backend/manage.py migrate --noinput
python /backend/manage.py loaddata /backend/fixtures/*.json
python /backend/manage.py runserver 0.0.0.0:8000
