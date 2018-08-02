#.gitignore:
 - node_modules
 
#plugin:
 - "dependencies": {
      "bootstrap": "^4.1.2",
      "country-currency-map": "^1.0.8",
      "jquery": "^3.3.1",
      "popper.js": "^1.14.3",
      "react": "^16.4.1",
      "react-bootstrap": "^0.32.1",
      "react-dom": "^16.4.1",
      "react-jsx": "^1.0.0",
      "react-scripts": "1.1.4"
    }
    
# Comment Build Dockerfile in CMD:
 - docker build -t react-docker -f ./Dockerfile.txt .
 
# Comment Run Dockerfile in CMD:
 - docker run -it --rm --name my-running-app react-docker
 
 # Link Repository react-docker
 - tag images latest : https://hub.docker.com/r/jefriwidianto/react-docker/tags/
