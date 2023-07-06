FROM python:3.11.4-alpine

COPY . /backend
WORKDIR /backend

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

EXPOSE 8000

COPY . .

CMD [ "gunicorn", "--bind", "0.0.0.0:8000", "bp_app.wsgi"]