## Table of Contents

- [About](#about)
- [Tech Stack Overview](#tech-stack-overview)
- [Note on Installation](#note-on-installation)
- [User Roles and Permissions](#user-roles-and-permissions)
- [Site Navigation](#site-navigation)

## About
BaySide Hospital is a comprehensive healthcare platform designed to enhance patient care and accessibility. The website offers a range of features to support our community's health and well-being:

- **Appointment Scheduling**: users can easily request and manage medical appointments online.
- **Symptom Checker**: this feature helps users make informed decisions about seeking medical care.
- **News/Health Articles**: stay informed about various medical topics, preventive care, and health tips through articles written by doctors.

## Tech Stack Overview
Here's an overview of the key technologies powering my project:

- **Core Stack**
    - MongoDB
    - Express.js
    - React
    - Node.js
- **Styling**
    - CSS/SCSS
    - Bootstrap
    - MUI
- **Authentication**
    - JSON Web Tokens (JWT)
- **Cloud Services and APIs**
    - Amazon S3
    - Google Maps API

## Note on Installation
Due to the use of private API keys and sensitive configuration data, this project requires specific environment variables to be set up. For security reasons, these are not included in the repository.
Users who wish to run or contribute to this project will need to set up their .env file with the necessary variables.

## User Roles and Permissions
List of demo accounts that allow you to experience the system from different user perspectives:
| Account  | Admin | Head Doctor | Doctor 
| ------------- | ------------- | ------------- | ------------- |
| Username  | admindemo@gmail.com  | hdoctordemo@gmail.com | doctordemo@gmail.com |
| Password  | admindemo987  | hdoctordemo654 | doctordemo321

- **Admin**
    - Manage all user accounts (create, modify, delete)
    - Review, approve, request changes, or delete content created by doctors and head doctors.
    - Generate and view comprehensive reports
- **Head Doctor**
    - Create and edit content for the symptom checker tool, including:
        - Symptoms
        - Diseases
        - Articles related to medical conditions
    - Create and publish blog posts for the News & Insights page
- **Doctor**
    - Create and publish blog posts for the News & Insights page

## Site Navigation
- **Home Page**:
![bayside-home](https://github.com/user-attachments/assets/04035781-5e1d-41f4-9896-7bf2aa33824b)
The following main navigation elements are interactive and will direct users to specific pages or functionalities:
- Request appointment dropdown
    - Request appointment
    - Check appointment status
- News & Insights
- Request appointment button
- Health checker
- Patient portal (login as admin, head doctor, or doctor)



