FROM python:3.11.3-alpine as requirements-stage

ARG DJANGO_ENV
ENV DJANGO_ENV=${DJANGO_ENV}

WORKDIR /tmp
COPY ./poetry.lock ./pyproject.toml /tmp/
RUN pip install poetry==1.4.2 \
    && poetry --version \
    && echo "$DJANGO_ENV" \
    && poetry export -f  \
        requirements.txt --output requirements.txt --without-hashes \
        $(if [ "$DJANGO_ENV" = 'DEVELOPMENT' ]; then echo '--with dev'; fi)

FROM python:3.11.3-alpine

ARG DJANGO_ENV
ENV DJANGO_ENV=${DJANGO_ENV} \
  # python:
  PYTHONFAULTHANDLER=1 \
  PYTHONUNBUFFERED=1 \
  PYTHONHASHSEED=random \
  PYTHONDONTWRITEBYTECODE=1 \

  # pip:
  PIP_NO_CACHE_DIR=1 \
  PIP_DISABLE_PIP_VERSION_CHECK=1 \
  PIP_DEFAULT_TIMEOUT=100 \
  PIP_ROOT_USER_ACTION=ignore

WORKDIR /backend

COPY --from=requirements-stage /tmp/requirements.txt /backend/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt
