# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.8-slim-buster
WORKDIR /app
COPY . /app


# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1

# Install pip requirements
# COPY requirements.txt .
RUN pip3 install -r requirements.txt

# Creates a non-root user with an explicit UID and adds permission to access the /app folder
# For more info, please refer to https://aka.ms/vscode-docker-python-configure-containers
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

# During debugging, this entry point will be overridden. For more information, please refer to https://aka.ms/vscode-docker-python-debug

# CMD ["gunicorn", "--bind", "0.0.0.0:6000", "app:app"]

# EXPOSE 6000
CMD ["python3", "app.py"]
# CMD ["python3", "-m" , "flask", "run", "--host=0.0.0.0:6000"]