var helpers = require("./_helpers");
var code = helpers.code,
	code_i = helpers.code_i;


module.exports = {
	"title" : "Photo Library",
	"key" : "photo",
	"steps" : [{
		"title":"Creating a Delegate",
		"body":"By taking a "+code_i("class")+" and making it a "+code_i("UIImagePickerControllerDelegate")+
			" your "+code_i("class")+" will be able to recieve " +
			"specific function calls that will provide you with the image picking functionality. "+
			"We also need to make it a "+ code_i("UINavigationControllerDelegate") + " because the image selection happens " +
			"at a different view controller. " +
			"Outside of the "+code_i("class ViewController: UIViewController {...}")+" add\n"+
			code_i("extension ViewController: UIImagePickerControllerDelegate, UINavigationControllerDelegate {...}")+"\n"+
			"Define delegate functions here. For us, we want to define\n" +
			code_i("func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any])")+
			"\nThis function will be called automatically when the users chooses an image."
	},{
		"title":"Updating info.plist",
		"body":"If you've used apps like Google Photos or Facebook before you might remember seeing 'Allow X to access your photos'. " +
			"Well, turns out this is required for your application to access this information. " +
			"Go to info.plist in the project navigator on the left. 'Right Click' then 'Add Row'. " +
			"Double-click to modify the value. For Key enter NSPhotoLibraryUsageDescription. For Value enter what you want it to display when location access is requested. "
	},{
		"title":"Creating an Image Picker Controller",
		"body":"Create a new "+code_i("UIImagePickerController")+" with "+code_i("UIImagePickerController()")
		+". Set the delegate to your ViewController, this means that when image information is obtained the" +
		" image picker controller will call your ViewController's delegate methods. " +
		"Set the sourceType to "+code_i("UIImagePickerControllerSourceType.photoLibrary")+
		" , this is just saying you want to choose images from their photo library." +
		"Then, use present function of your current view controller to show the image picking screen, something like \n" + 
		code_i("self.present(imagePicker, animated: true, completion: nil)") + 
		"\nTo be safe you might want to check if you are able to access their library using \n"+
		code_i("UIImagePickerController.isSourceTypeAvailable(UIImagePickerControllerSourceType.photoLibrary)")
	},{
		"title":"Final Code",
		"body":code("import UIKit\r\n\r\nclass ViewController: UIViewController {\r\n    \/\/Call this function to begin accessing user\'s photos\r\n    func accessPhotosLibrary() {\r\n        if UIImagePickerController.isSourceTypeAvailable(UIImagePickerControllerSourceType.photoLibrary) {\r\n            let imagePicker = UIImagePickerController()\r\n            imagePicker.delegate = self\r\n            imagePicker.sourceType = UIImagePickerControllerSourceType.photoLibrary\r\n            self.present(imagePicker, animated: true, completion: nil)\r\n        }\r\n    }\r\n    \r\n    \/\/You don\'t need this, this is for me to add a button\r\n    override func viewDidAppear(_ animated: Bool) {\r\n        super.viewDidAppear(animated)\r\n        addSelectPhotosButton()\r\n    }\r\n    \r\n    \/\/Don\'t be lazy go make your own button in storyboard\r\n    func addSelectPhotosButton() {\r\n        let photoButton = UIButton(frame: CGRect(x: 0, y: 0, width: 200, height: 100))\r\n        photoButton.setTitle(\"Access Photo\", for: .normal)\r\n        photoButton.setTitleColor(.blue, for: .normal)\r\n        photoButton.addTarget(self, action: #selector(ViewController.accessPhotosLibrary), for: .touchUpInside)\r\n        self.view.addSubview(photoButton)\r\n    }\r\n\r\n}\r\n\r\nextension ViewController:UIImagePickerControllerDelegate, UINavigationControllerDelegate {\r\n    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {\r\n        if let pickedImage = info[UIImagePickerControllerOriginalImage] as? UIImage {\r\n            \/\/Do something cool with the image\r\n            \/\/Don\'t be lazy go make your own views in storyboard\r\n            let imageView = UIImageView(frame: self.view.frame)\r\n            imageView.image = pickedImage\r\n            self.view.addSubview(imageView)\r\n        }\r\n        picker.dismiss(animated: true, completion: nil)\r\n    }\r\n}")
	}]
}

//http://stackoverflow.com/questions/25296691/get-users-current-location-coordinates