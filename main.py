import logging
from flask import Flask, render_template, request, make_response, session, redirect
from flask import jsonify
import random
from Models import BandMember

app = Flask(__name__)
app.secret_key = "super secret key"



def isLoggedIn():
    loggedIn = False
    access = request.cookies.get('access')
    if "access" in session.keys():
        if str(access) == str(session["access"]):
            loggedIn = True
    return loggedIn


@app.route('/')
def main():
    members = BandMember.query().fetch()
    loggedInMember = BandMember.get_by_id(session["member_id"])
    return render_template(
        "LandingPage.html",
        loggedIn=isLoggedIn(),
        members=[m.secure_serialize() for m in members],
        loggedInMember=loggedInMember.secure_serialize() if isLoggedIn() else None)

@app.route('/admin', methods=['GET', 'POST'])
def admin():
    if request.method == 'GET':
        return render_template("adminLogin.html", loggedIn=isLoggedIn())

    if request.method == 'POST':
        # if valid credentials,
        # set cookie and redirect to main()
        
        member = BandMember.query(BandMember.email == request.form["email"]).get()
        
        if member.admin and request.form['password'] == member.password:
            session["access"] = random.randint(00000, 99999)
            session["member_id"] = member.key.integer_id()
            response = make_response(redirect('/'))
            response.set_cookie('access', str(session["access"]))
            return response

        else:
            return render_template("adminLogin.html", error="invalid credentials")


@app.route('/bandMembers', methods=['GET', 'POST', 'PUT', 'DELETE'])
def bandMembers():
    if request.method == 'GET':
        members = BandMember.query().fetch()
        return jsonify(data = [m.serialize() for m in members])

    if request.method == 'POST':
        firstName = request.json.get("firstName")
        lastName = request.json.get("lastName")
        role = request.json.get("role")
        picURL = request.json.get("picURL")

        newMember = BandMember(
            firstName = firstName,
            lastName = lastName,
            role = role,
            picURL = picURL)

        newMember.put()

        return jsonify(data=newMember.serialize())

    if request.method == 'PUT':
        firstName = request.json.get("firstName")
        lastName = request.json.get("lastName")
        role = request.json.get("role")
        picURL = request.json.get("picURL")

        member = BandMember.get_by_id(member_id)

        member.firstName = firstName
        member.lastName = lastName
        member.role = role
        member.picURL = picURL

        member.put()

        return jsonify(success=True, data=member.serialize())

    if request.method == 'DELETE':
        member = BandMember.get_by_id(member_id)
        member.key.delete()
        return jsonify(success=True, data=member.serialize())


@app.route('/bandMembers/<int:member_id>', methods=['PUT', 'DELETE'])
def bandMember(member_id):
    if request.method == 'PUT':
        firstName = request.json.get("firstName")
        lastName = request.json.get("lastName")
        role = request.json.get("role")
        picURL = request.json.get("picURL")

        member = BandMember.get_by_id(member_id)

        member.firstName = firstName
        member.lastName = lastName
        member.role = role
        member.picURL = picURL

        member.put()

        return jsonify(success=True, data=member.serialize())

    if request.method == 'DELETE':
        member = BandMember.get_by_id(member_id)
        member.key.delete()
        return jsonify(success=True, data=member.serialize())


@app.errorhandler(500)
def server_error(e):
    # Log the error and stacktrace.
    logging.exception('An error occurred during a request.')
    return'An internal error occurred.', 500


