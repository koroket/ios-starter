var helpers = require("./_helpers");
var code = helpers.code,
	code_i = helpers.code_i;


module.exports = {
	"title" : "GPS/Location",
	"key" : "loc",
	"steps" : [{
		"title":"Adding the library",
		"body":code_i("CoreLocation") + " is the built in library to access the user's location. " + 
			"Go ahead and add " + code_i("import CoreLocation")+ " to your swift file."
	},{
		"title":"Creating a Delegate",
		"body":"By taking a "+code_i("class")+" and making it a "+code_i("CLLocationManagerDelegate")+
			" your "+code_i("class")+" will be able to recieve " +
			"specific function calls that will provide you with the location information you want. "+
			"Outside of the "+code_i("class ViewController: UIViewController {...}")+" add "+
			code_i("extension ViewController: CLLocationManagerDelegate {...}")+". "+
			"Define delegate functions here. For us, we want to define\n" +
			code_i("func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {...}")+
			"\nThis function will be called automatically when the users location updates."
	},{
		"title":"Updating info.plist",
		"body":"If you've used apps like Uber or Lyft before you might remember seeing 'Allow X to access your location'. " +
			"Well, turns out this is required for your application to access this information. " +
			"Go to info.plist in the project navigator on the left. 'Right Click' then 'Add Row'. " +
			"Double-click to modify the value. For Key enter NSLocationAlwaysUsageDescription. For Value enter what you want it to display when location access is requested. "
	},{
		"title":"Creating a Location Manager",
		"body":"Create a new "+code_i("CLLocationManager")+" with "+code_i("CLLocationManager()")
		+". Set the delegate to your ViewController, this means that when location information is obtained the" +
		" location manager will call your ViewController's delegate methods. " +
		"Set desiredAccuracy property of your location manager to 'kCLLocationAccuracyBest', this is just a value " +
		" for specifying how accurate you need your location information to be. " +
		"You then ask your user for access to their location by calling requestAlwaysAuthorization function of your location manager. "+
		" Then, call startUpdatingLocation function of the location manager to begin accessing their location."
	},{
		"title":"Final Code",
		"body":code("import UIKit\r\nimport CoreLocation\r\n\r\nclass ViewController: UIViewController {\r\n    var locationManager:CLLocationManager!\r\n    \r\n    override func viewDidLoad() {\r\n        super.viewDidLoad()\r\n        \/\/ Do any additional setup after loading the view, typically from a nib.\r\n        startLocationManager()\r\n    }\r\n\r\n    override func didReceiveMemoryWarning() {\r\n        super.didReceiveMemoryWarning()\r\n        \/\/ Dispose of any resources that can be recreated.\r\n    }\r\n    \r\n    \/\/Depending on your needs you might want to seperate parts of this function\r\n    func startLocationManager(){\r\n        locationManager = CLLocationManager()\r\n        locationManager.delegate = self;\r\n        locationManager.desiredAccuracy = kCLLocationAccuracyBest\r\n        locationManager.requestAlwaysAuthorization()\r\n        locationManager.startUpdatingLocation()\r\n    }\r\n}\r\n\r\nextension ViewController: CLLocationManagerDelegate {\r\n    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {\r\n        let userLocation:CLLocation = locations[0]\r\n        let long = userLocation.coordinate.longitude;\r\n        let lat = userLocation.coordinate.latitude;\r\n        \r\n        \/\/Use this info and do somthine cool!\r\n        print(\"Recieved new location information: Longitude=%d Latitude=%d\",long,lat);\r\n    }\r\n}")
	}]
}

//http://stackoverflow.com/questions/25296691/get-users-current-location-coordinates