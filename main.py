import logging
from flask import Flask, render_template, request
from flask.ext.triangle import Triangle

app = Flask(__name__)
Triangle(app)


@app.route('/')
def main():
    return render_template("LandingPage.html")


@app.errorhandler(500)
def server_error(e):
    # Log the error and stacktrace.
    logging.exception('An error occurred during a request.')
    return'An internal error occurred.', 500


if __name__ == '__main__':
    app.run(debug=True, host="127.0.0.1", port=5000)
