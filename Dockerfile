# syntax=docker/dockerfile:1
FROM python:3.10
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /app

# Copiez les fichiers de l'application dans le conteneur
COPY . .


RUN pip install -r requirements.txt


# RUN python manage.py makemigrations
# RUN python manage.py migrate

EXPOSE 8000

# Démarrez l'application avec la commande suivante
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
