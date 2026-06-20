from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return 'Hello from the Lone Wolf Mining App!'

if __name__ == '__main__':
    app.run()
  
