from dotenv import load_dotenv
from pathlib import Path
from flask import Flask, jsonify, request
import os
import builder
load_dotenv()
app = Flask(__name__)

obj = builder.HRBot()

@app.route("/", methods=['GET', 'POST'])
def api():
    return jsonify({'message': 'Welcome to HR Bot. Please use /api/answer to get answers.'})

@app.route("/api/answer", methods=['GET','POST'])
def answer():
    if(request.method == 'POST'):
        data = request.get_json()
        print(data);
        # return jsonify({'response': data['query']})
        return jsonify({'response': obj.getAnswer(data['query'])});
    else:
        return jsonify({'message': 'Please a send a query in the body of POST request. e.g. {"query": "What is the meaning of life?"}'});

if __name__ == '__main__':
    app.run(host="0.0.0.0",debug=True, port=os.getenv("PORT"))