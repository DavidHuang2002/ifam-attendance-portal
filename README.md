# I-FAM Attendance portal

## Project Description

The project for Vanderbilt International Family (I-FAM) entails developing a centralized public platform designed to enhance connections among international students. The platform will provide personalized dashboards for students and administrators, a secure database for managing student information, and a barcode scanning feature to facilitate attendance tracking at events. To foster community interaction and cultural exchange, a chat room feature will be available, and a recommendation algorithm will be integrated to personalize content based on students' interests. In addition to these features, email functionality will be developed to bolster platform security using Firebase and to improve communication efficiency, ensuring a seamless and secure user experience for all participants.

## Our Design

### prototype:

https://www.figma.com/file/kSlYepXkHnbkQcRDUJE9uH/Prototype----Sprint-1?type=design&node-id=0%3A1&mode=design&t=57pvFvPBtYQPJctH-1

![sprint1-group5 pptx](https://github.com/DavidHuang2002/ifam-attendance-portal/assets/55070299/2e5ab407-3310-4488-b208-48588a1096e5)
![sprint1-group5 pptx2](https://github.com/DavidHuang2002/ifam-attendance-portal/assets/55070299/c06f4f36-8401-4844-a631-dcc0e71aa149)

### system design

https://www.figma.com/file/BnSDPLjoBDdlxui5IhmfRY/System-Design?type=whiteboard&node-id=0%3A1&t=PKChSZLcqPYj4waX-1

## Installation guide

Go to our team Google Drive, go to folder `coding` and download file `.env.local` (if you are our client, we will hand this piece separately to you)
Then, put it in the `web` folder. The file contains API keys to connect to our Firebase. It should never be pushed to github!

After that to run the code. In your command prompt run the following line by line

```
cd web

npm install

npm run dev
```

## Deployment guide

Go to Vercel, create a new deployment and link it to our github:
https://github.com/DavidHuang2002/ifam-attendance-portal

Remember to specify the root folder to web.
