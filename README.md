# E-commerce website Gaming Gear


# Technologies used
- BackEnd: NodeJS (ExpressJS)
- Database: MongoDB (Mongoose)
- Some of packaged used:
    + Jsonwebtoken (Jwt - Create token for authentication)
    + Streamifier (Convert file buffer in request to Readable Stream)
    + BcryptJs (Create user's password)
    + Multer (Local file storages)
    + Cloudinary (Online cloud for saving images and files)

# How to run this project?
- Clone the project
- Install all available packages (Using command: npm install)
- Create .env file and adjust variable values (MongoDB connect - Keys - Cloudinary)
- Redirect to the root of the application and start the project by using the command (npm start)
    + Note: I use nodemon package to restart the application immediately whenever codes change.
    + Note2: I've already designed API documents using Swagger (Access: http://localhost:[port]/api-docs)
    + Note4: I've implemented Front-End Application to test the API: (https://github.com/ngkhoa07zzz/shop-frontend) (ReactJS)
# Result
So far, I've published this project with some available features below:
+ Authentication: Sign up, Login with access token
+ User
    - Update user infomation
    - Add product to cart
    - Payment
+ Product
    - CRUD products
    - Update product image using Multer, Streamifier and Cloudinary
+ Order
    - CRUD order
    - Payment with paypal
    - Show history order
+ Admin
    - Dashboard
    - User list, product list, order list
+ Swagger API Documentation
    - Auth: Signup, Login, Logout
    - Order
    - Product
    - User
+ These are some of main features that I feel very pleased to research and practice
    - Authentication (Using accessToken )
    - RestAPI (Product, Order)
    - Upload images and attachments (Using multer and cloudinary)
    - Extra: Pagination (Using mongodb methods: skip - limit; slice) ; Search, Filter product (Using MongoDB methods: sort) ; Dashboard for admin ((Using MongoDB methods: countDocument)
# Conclusion:
With a passion for programming applications, I hope that I can improve not only my technical skills but also my soft skills.

