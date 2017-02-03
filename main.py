import logging
from flask import Flask, render_template, request, jsonify
from flask.ext.triangle import Triangle
import json
import datetime
from model import Show


app = Flask(__name__)
Triangle(app)


@app.route('/')
def main():
    return render_template("LandingPage.html")


@app.route('/Shows')
def Shows():
    allShows = Show.query().order(Show.eventDate, Show.eventTime).fetch()
    return json.dumps(allShows)


@app.route('/addShow', methods=['POST'])
def newShow():
    try:
        s = Show(
            contactName = request.args.get('contactName'),
            contactEmail = request.args.get('contactEmail'),
            contactPhone = request.args.get('contactPhone'),
            eventName = request.args.get('eventName'),
            eventAddress = request.args.get('eventAddress'),
            eventDate = request.args.get('eventDate'),
            eventTime = request.args.get('eventTime'),
            crowdSize = request.args.get('crowdSize'),
            systemProvided = request.args.get('systemProvided'),
            price = request.args.get('price'),
        )
    except:
        return jsonify(success=False, msg="Invalid Data...")

    try:
        s.put()
    except:
        return jsonify(success=False, msg="Unable to store in database...")




@app.errorhandler(500)
def server_error(e):
    # Log the error and stacktrace.
    logging.exception('An error occurred during a request.')
    return'An internal error occurred.', 500


if __name__ == '__main__':
    app.run(debug=True, host="127.0.0.1", port=5000)
