from google.appengine.ext import ndb

class BandMember(ndb.Model):
    firstName = ndb.StringProperty(required=True)
    lastName = ndb.StringProperty(required=True)
    role = ndb.StringProperty(required=True)
    picURL = ndb.StringProperty(required=True)
    email = ndb.StringProperty(required=False)
    password = ndb.StringProperty(required=False)
    admin = ndb.BooleanProperty(default=False)

    def serialize(self):
    	return {
    		'id' : self.key.integer_id(),
    		'firstName' : self.firstName,
    		'lastName' : self.lastName,
    		'role' : self.role,
    		'picURL' : self.picURL,
    		'email' : self.email,
    		'password' : self.password,
    		'admin' : self.admin
    	}

    def secure_serialize(self):
    	return {
    		'id' : self.key.integer_id(),
    		'firstName' : self.firstName,
    		'lastName' : self.lastName,
    		'role' : self.role,
    		'picURL' : self.picURL
    	}