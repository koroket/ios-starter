module.exports = {
	"title" : "GPS/Location",
	"key" : "loc",
	"steps" : [{
		"title":"Adding the library",
		"body":"[CoreLocation] is the built in library to access the user's location. " + 
			"Go ahead and add [import CoreLocation] to your swift file."
	},{
		"title":"Creating a Delegate",
		"body":"By taking a [Class] and making it a [CLLocationManagerDelegate] your [Class] will be able to recieve " +
			"specific function calls that will provide you with the location information you want. "+
			"Outside of the [class ViewController: UIViewController {}] add [extension ViewController: CLLocationManagerDelegate { ... }]. "+
			"If you define [func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {...}] "+
			"this function will be called automatically when the users location updates."
	},{
		"title":"Updating info.plist",
		"body":"If you've used apps like Uber or Lyft before you might remember seeing 'Allow X to access your location'. " +
			"Well, turns out this is required for your application to access this information. " +
			"Go to info.plist in the project navigator on the left. 'Right Click' then 'Add Row'. " +
			"Double-click to modify the value. Enter what you want it to display when location access is requested. "
	}]
}

//http://stackoverflow.com/questions/25296691/get-users-current-location-coordinates