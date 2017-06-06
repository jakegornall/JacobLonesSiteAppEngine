import logging
from flask import Flask, render_template, request, make_response, session, redirect
import random

app = Flask(__name__)

def isLoggedIn():
    loggedIn = False
    access = request.cookies.get('access')
    if str(access) == str(session["access"]):
        loggedIn = True
    return loggedIn


@app.route('/')
def main():
    if isLoggedIn():
        return render_template("LandingPage.html", loggedIn=True)    
    else:
        return render_template("LandingPage.html", loggedIn=False)

@app.route('/admin', methods=['GET', 'POST'])
def admin():
    if request.method == 'GET':
        return render_template("adminLogin.html")

    if request.method == 'POST':
        # if valid credentials,
        # set cookie and redirect to main()
        
        if request.form["email"] == 'jakegornall@yahoo.com' and request.form['password'] == 'password':
            session["access"] = random.randint(00000, 99999)
            response = make_response(redirect('/'))
            response.set_cookie('access', str(session["access"]))
            return response

        else:
            return render_template("adminLogin.html", error="invalid credentials")


@app.errorhandler(500)
def server_error(e):
    # Log the error and stacktrace.
    logging.exception('An error occurred during a request.')
    return'An internal error occurred.', 500


if __name__ == '__main__':
    app.secret_key = "super secret key"
    app.run(debug=True, host="127.0.0.1", port=5000)
