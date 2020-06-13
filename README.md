# udacity-clouddev-proj5
* This is a simple personal diary that you can put information of you day and categorize on groups

## Structure
* The backend folder contains all the files needed for the serverless installation. First, install dynamodb with <code>sls dynamodb install</code> then you can run it locally like this:
 - <code>sls dynamodb start</code>
 - <code>sls offline</code>

* The frontend has a image on dockerhub with name luancaius/diary. This code was uploaded on AWS Amplify and you can click [here](https://master.d13q4is2vri0ka.amplifyapp.com/) to access it.

### How to use
* After click the link, click on login and enter Auth0 using a google account.
* Then, click on Events, where you can create, update and delete information.