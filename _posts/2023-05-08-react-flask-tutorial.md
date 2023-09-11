---
layout: post
title:  "How to use Python code in your React App (React + Flask Tutorial)"
date:   2023-05-08 09:00:44 +0530
image: images\2023\reactflasktutorialcover.png
categories: [Python, React]
---

**Are you a Python developer transitioning into web development and missing the vast array of powerful Python libraries? If so, fear not, for there is a solution!** By using a Flask backend for your React application, you can seamlessly execute Python code on the server side and harness its functionality within your web app.

**In this tutorial, I will guide you through setting up a Flask backend and demonstrate how you can effortlessly leverage the results of executed Python code within your React application.** Say goodbye to limitations and unlock the full potential of Python in your web development endeavors!

## Flask vs Django

Both are popular web frameworks for Python but have different approaches and use cases. Flask is a lightweight web framework for Python, designed to make web development quick and straightforward. **Whether you're a beginner or an experienced developer, Flask provides an intuitive way to create powerful web applications, RESTful APIs, and even microservices**.

When I was [building my own project](https://github.com/avionmission/smartfeedai/tree/42e8289e53c68207f09388dc72f8fbda760c689a), I started by using Django, but I found it overwhelming considering my simple use case. Flask's simplicity is what I love about it, you can get started quickly and easily, especially for smaller projects or prototypes.

It provides a solid foundation for web development without imposing too many constraints or assumptions. With Flask, you have more freedom to choose and integrate only the components and libraries you need, making it easier to maintain and understand your codebase.

Let's dive into code, and actually show you how simple it is to set up a Flask backend for your react app!

{% include ad1.html %}

## Creating a Flask + React App (step by step)

### **Step 1:** Setup your React frontend

* You can use Gatsby or Nextjs for your project. But to keep things simple for this example we will use the good old `create react app` :
    
    ```bash
    npx create-react-app react-flask-app
    cd react-flask-app
    ```
    

### **Step 2:** Create a virtual environment

* We will place our backend API directory inside the same directory for this example so create a new folder `api` inside the project folder.
    
* **Then we need to create a virtual environment. Why?** Because creating a virtual environment before setting up a Flask API provides a controlled and isolated environment for your project, where you can install project-specific dependencies and manage the project's environment separately from the system-wide Python installation. **It is a good practice that promotes maintainability, stability, and collaboration in your Flask API development workflow.**
    
* ```bash
      cd api
      python3 -m venv venv
    ```
    
* This command creates a virtual environment named "venv" using Python 3.
    

### Step 3: Activate the virtual environment and install Flask, other libraries you need

* ```bash
      . venv/bin/activate 
      pip install flask python-dotenv scikit-learn
    ```
    
* `. venv/bin/activate` command activates the virtual environment created earlier. The dot (.) at the beginning is a shorthand way to execute the script in the current shell session. The "venv/bin/activate" is the path to the activation script of the virtual environment. Activating the virtual environment sets up the environment variables and modifies the system's PATH to prioritize the Python interpreter and packages within the virtual environment.
    
* `pip install flask python-dotenv scikit-learn` command uses the package manager "pip" to install two Python packages: `flask` and `python-dotenv`. The `python-dotenv` is a package used for managing environment variables from a `.env` file.
    
* We also installed scikit-learn, let's try and use it in our application.
    

### Step 4: Creating a Machine Learning endpoint using Python and Flask

* In the API directory create `api.py` and add this code:
    
    ```bash
    from sklearn import datasets
    from sklearn.model_selection import train_test_split
    from sklearn.neighbors import KNeighborsClassifier
    
    app = Flask(__name__)
    
    @app.route('/api/ml')
    def predict():
        # Load the iris dataset
        iris = datasets.load_iris()
        X = iris.data  # Features
        y = iris.target  # Target variable
    
        # Split the data into training and testing sets
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
        # Create a K-Nearest Neighbors classifier
        knn = KNeighborsClassifier(n_neighbors=3)
    
        # Train the classifier
        knn.fit(X_train, y_train)
    
        # Make predictions on the test set
        y_pred = knn.predict(X_test)
    
        # Print the accuracy of the model
        accuracy = knn.score(X_test, y_test)
    
        return{'accuracy': accuracy}
    ```
    
    * This code sets up a Flask API with `/api/ml` route which performs a machine learning prediction using scikit-learn.
        
    * Inside the `/api/ml` route, we have a simple ML program, the code loads the Iris dataset, splits it into training and testing sets, and trains a K-Nearest Neighbors classifier. It then makes predictions on the test set and calculates the accuracy of the model. Finally, it returns the accuracy as a JSON response.
        

### Step 5: Using the Python code in our react frontend

* To run the Flask backend, use this command (while the virtual environment is active):
    
    ```bash
    flask run
    ```
    
* Now in a separate terminal run the react frontend with:
    
    ```bash
    npm start
    ```
    
* Let's see how we can get the accuracy of the ML model, that our flask backend returns in our react code:
    
    ```javascript
      const [accuracy, setAccuracy] = useState(0);
    
      useEffect(() => {
        fetch("/api/ml").then(res => res.json()).then(data => { setAccuracy(data.accuracy) });
      }, [])
    ```
    
* This code snippet sets up a state variable `accuracy` with an initial value of 0 using **useState hook**. It uses the **useEffect hook** to make an API request to `/api/ml` when the component mounts.
    
* The response from the Flask API is parsed as JSON, and the accuracy value is extracted and stored in the `accuracy` state variable using the setAccuracy function. This triggers the update of the accuracy value. You can use this accuracy value in your react app, perhaps inside a &lt;p&gt; tag to display it.
    
* That's it now you can write any kind of Python code, execute it in the backend, retrieve the code and use it in your React frontend!

{% include ad2.html %}
    

### Important

* In the `package.json` file in your project folder, add this:
    
    ```javascript
    "proxy": "http://127.0.0.1:5000"
    ```
    
* **Why do we need to add this?** Due to security restrictions known as the Same-Origin Policy, the React app running on one port (e.g., 3000) may not be able to directly make API requests to a different port (e.g., 5000) where your Flask API is running. **By specifying** `"proxy": "`[`http://127.0.0.1:5000`](http://127.0.0.1:5000)`"` **in the** `package.json` **file, you are telling the development server to proxy API requests that cannot be handled by the React app to the specified URL.**
    
* Add `venv` in to your `.gitignore` file. Ignoring the `venv` folder helps maintain project reproducibility. By allowing each developer to create their own virtual environment, you ensure that everyone is working with the same set of dependencies.
    
* It is also a good practice because **excluding the** `venv` **folder from version control helps protect sensitive information that might be stored within the environment, such as API keys**, access tokens, or database credentials.
    

## Conclusion

In your Flask backend, you can write any kind of Python code and create routes and endpoints to handle specific functionalities. **By defining these routes and endpoints, you can execute the corresponding Python code and retrieve the results as JSON data.**

**To integrate this data into your React app, you can use the fetch API or similar methods to make requests to these endpoints and receive the JSON data in your React app.** This allows you to utilize the data retrieved from the Flask backend within your React app for further processing or display.

[Follow me on Twitter](https://twitter.com/avionmission) for more tips & tricks, and app development content updates.

---

👨‍💻 If you are looking to hire someone to help you with your React + Flask app, look no further ;) [DM me on Twitter](https://twitter.com/avionmission) or check out [https://avionmission.com](https://avionmission.com)