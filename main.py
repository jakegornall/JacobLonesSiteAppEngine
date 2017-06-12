import logging
from flask import Flask, render_template, request, make_response, session, redirect
from flask import jsonify
import random
from Models import BandMember
import os
import cloudstorage as gcs

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
    # BandMember(firstName="Jacob", lastName="Lones", role="Lead Singer/Guitars", admin=True, password="w979h7wJ", email="jacoblones@yahoo.com", picURL="/static/images/square_lones_bioPic.jpg").put()
    members = BandMember.query().fetch()
    if "member_id" in session.keys():
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
        
        if member and member.admin and request.form['password'] == member.password:
            session["access"] = random.randint(00000, 99999)
            session["member_id"] = member.key.integer_id()
            response = make_response(redirect('/'))
            response.set_cookie('access', str(session["access"]))
            return response

        else:
            return render_template("adminLogin.html", error="invalid credentials")


@app.route('/bioPic', methods=["POST"])
def bioPic():
    file = request.files["member-pic"]
    if file:
        path = "/jacoblonesofficialsite.appspot.com/" + file.filename
        with gcs.open(path, 'w') as f:
            f.write(file.stream.read())
        return jsonify(success=True, data="https://storage.cloud.google.com" + gcs.stat(path).filename)
    else:
        return jsonify(succes=False)


@app.route('/bandMembers', methods=['GET', 'POST'])
def bandMembers():
    if request.method == 'GET':
        members = BandMember.query().fetch()
        return jsonify(sucess=True, data = [m.serialize() for m in members])

    if request.method == 'POST':
        firstName = request.json.get("firstName")
        lastName = request.json.get("lastName")
        email = request.json.get("email")
        role = request.json.get("role")
        admin = request.json.get("admin")

        newMember = BandMember(
            firstName = firstName,
            lastName = lastName,
            role = role,
            email = email,
            admin = admin)

        newMember.put()

        return jsonify(success=True, data=newMember.serialize())


@app.route('/bandMembers/<int:member_id>', methods=['PUT', 'DELETE'])
def bandMember(member_id):
    if request.method == 'PUT':
        firstName = request.json.get("firstName")
        lastName = request.json.get("lastName")
        role = request.json.get("role")
        picURL = request.json.get("picURL")
        email = request.json.get("email")
        admin = request.json.get("admin")

        member = BandMember.get_by_id(member_id)

        if picURL != member.picURL:
            try:
                src = member.picURL.replace("https://storage.cloud.google.com/", "")
                gcs.delete(src)
            except:
                print "file not in gcs..."
        member.firstName = firstName
        member.lastName = lastName
        member.role = role
        member.picURL = picURL
        member.email = email
        member.admin = admin

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


