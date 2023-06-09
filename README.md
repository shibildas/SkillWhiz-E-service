
![Logo](https://res.cloudinary.com/dpfnxwvps/image/upload/v1680611257/crystal-removebg-preview_fafyxj.png)


# SkillWhiz-E-Service

**Introduction**

Skillwhiz is an E-Service Project which basically resolves the problem faced by users to get and appointment of Experts like "Electrician","Plumper", Pet Groomers", etc. on users convinient time. Here Experts can also create account, add  multiple Skills such as "Cleaning","Driving","Mobile Repairs" etc. Experts can also add /View their available time slots and can see if someone has already booked the time slots. Expert can chat/video call the booked users and send estimation to users. 
    
Once estimation is recieved user can accept it or reject with a reason. If the estimation is accepted, Expert can start the job. User can only cancel with a penalty ,if cancelling after estimation approval. if rejected, Expert can re-submit extimation. Extert can start the job and end the job by finalizing the amount to be paid. User can pay Online using Razorpay. once payment is done, user can add reviews and rating to collect reward loyality points , which can be later used to remeem discount coupons. 

Admin can control all the functionalities and add jobs category.


## Tech Stack

**Client:** React, Redux, TailwindCSS, DaisyUI, MomentJs, Socket.io, Firebase, Web-RTC, 

**Server:** Node, Express, JSONwebtoken, Razorpay, Twilio, Swagger-ui-express



## Documentation

[API Documentation- Click here](https://skillwhiz-api.drtyre.co/api-docs/)

The Documentation is done via swagger-ui-express. feel free to contact me for support.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

**Client-side**

`VITE_BASE_URL` -Base Url to server

`VITE_EXPERT_URL` -Expert route to server

`VITE_ADMIN_URL` -Admin  route to server





**Server-Side**

`PORT` -server running port number. eg.:4000

`DATABASE_URL` - MongoDB URL

`TWILIO_AUTH_TOKEN` -Twilio Auth Token

`accountSid` - Twilio accountSid

`serviceSid` -Twilio serviceSid

`JWT_SECRET_KEY`- Secret key for JWT token

`Cloud_Name`- Coudinary Cloud name

`Cloud_API_Key`- Cloudinary API key

`Cloud_API_SECRET`- Cloudinary Secret


`key_id`-Razorpay Key

`key_secret`- Razorpay Secret

`CORS_API`- incoming client address for cors



## Run Locally

Clone the project

```bash
  git clone https://github.com/shibildas/SkillWhiz-E-service.git
```

Go to the project directory

```bash
  cd SkillWhiz-E-service
  cd server
  cd client
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start //for server
  npm run dev // for client
```


## Installation in Cloud

Install Skillwhiz with npm

```bash
  cd server
  npm install 
  npm start
 
```
```bash
 
  cd client
  npm install
  npm run build
```
    


## Screenshots

![App Screenshot](https://res.cloudinary.com/dpfnxwvps/image/upload/v1686289359/Screenshot_from_2023-06-09_11-06-03_s9w1o3.png)

![App Screenshot](https://res.cloudinary.com/dpfnxwvps/image/upload/v1686289357/Screenshot_from_2023-06-09_11-10-40_dvlcep.png)

![App Screenshot](https://res.cloudinary.com/dpfnxwvps/image/upload/v1686289357/Screenshot_from_2023-06-09_11-11-05_tsuyht.png)

![App Screenshot](https://res.cloudinary.com/dpfnxwvps/image/upload/v1686289356/Screenshot_from_2023-06-09_11-06-32_cshqi8.png)


## Authors

- [@shibildev-github](https://github.com/shibildas)
- [@shibildev-linkedin](https://www.linkedin.com/in/shibil-dev/)



## 🚀 About Me
Greetings! I am a passionate Fullstack MERN Stack Developer with a love for creating innovative and efficient web applications. With a solid foundation in MongoDB, Express.js, React.js, and Node.js, I possess the skills necessary to build end-to-end solutions that deliver exceptional user experiences.

My journey as a developer began with a curiosity for technology and a desire to bring ideas to life through coding. I have honed my skills by working on various projects, both independently and as part of collaborative teams, allowing me to understand the intricacies of developing scalable and robust applications.

On the front-end, I excel in crafting responsive user interfaces using React.js. I enjoy leveraging modern JavaScript frameworks and libraries to build dynamic and intuitive user experiences. I have a keen eye for design and strive to create interfaces that are visually appealing, user-friendly, and optimized for performance.

When it comes to the back-end, I am experienced in working with Node.js and Express.js to develop RESTful APIs and handle server-side logic. I have a solid understanding of database management with MongoDB, ensuring efficient data storage and retrieval. Additionally, I am well-versed in utilizing various tools and technologies like Redux, and Webpack to streamline development workflows and enhance application performance.

As a MERN Stack Developer, I am committed to staying up-to-date with the latest industry trends and best practices. I continuously explore new technologies and frameworks to expand my skill set and deliver cutting-edge solutions. I am a firm believer in clean code, code reusability, and following industry-standard coding practices to ensure maintainable and scalable applications.

In addition to technical expertise, I am a strong communicator and collaborative team member. I thrive in environments where I can contribute my skills, learn from others, and collectively achieve project goals. I am adept at translating complex technical concepts into clear and concise explanations for both technical and non-technical stakeholders.

Overall, I am driven by my passion for crafting high-quality web applications that solve real-world problems. I am excited about the endless possibilities that technology offers and look forward to contributing my skills and creativity to create impactful solutions.




## Support

For support, email shibildas@gmail.com.

