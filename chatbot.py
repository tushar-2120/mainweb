from flask import Flask, request, jsonify
import os
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_cohere import ChatCohere
from flask_cors import CORS
import logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(_name_)
CORS(app)

# Set your Cohere API key
os.environ["COHERE_API_KEY"] = "r0AXDfTS5xR6hjYooqADaWPHjeCvmZuuUv6e4OKS"

model = ChatCohere(model="command-r-plus")

system_message = SystemMessage(content="You are a helpful assistant! Your name is Bob.")

@app.route("/chat", methods=["POST"])
def chat():
    # Parse user input from the POST request
    user_input = request.json.get("user_input")
    if not user_input:
        return jsonify({"error": "No user input provided"}), 400

    # Prepare messages
    messages = [
        system_message,
        HumanMessage(content=user_input)
    ]

    # Get the chatbot's response
    try:
        response = model.invoke(messages)
        return jsonify({"response": response.content})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if _name_ == "_main_":
    app.run(debug=True)