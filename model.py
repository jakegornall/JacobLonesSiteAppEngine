from google.appengine.ext import ndb

class Show(ndb.Model):
	contactName = ndb.StringProperty(required=True)
	contactEmail = ndb.StringProperty(required=True)
	contactPhone = ndb.StringProperty(required=True)
	dateBooked = ndb.DateTimeProperty(auto_now_add=True)
	eventName = ndb.StringProperty(required=True)
	eventAddress = ndb.StringProperty(required=True)
	eventDate = ndb.DateProperty(required=True)
	eventTime = ndb.TimeProperty(required=True)
	crowdSize = ndb.IntegerProperty(required=True)
	systemProvided = ndb.BooleanProperty(required=True)
	price = ndb.FloatProperty(required=True)
	confirmed = ndb.BooleanProperty(default=False)
