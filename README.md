BikersHub

Bike Servicing API System

🌟 Live Demo
Backend LiveLink:  https://bikeshub.vercel.app 

 Technologies:
Backend Framework: Express.js with TypeScript
Database: PostgreSQL
ORM: Prisma
Deployment: Render
Main Features : -
Customer Management: Create, read, update, and delete customer information

Bike Management: Track bikes associated with customers

Service Records: Maintain detailed service history with status tracking

Service Completion Tracking: Mark services as completed with timestamps

Overdue Service Alerts: Identify services pending for more than 7 days

📋 API's & Endpoints : -
Customer Management
Method	Endpoint	Description
```bash
POST	/api/customers	Create a new customer

GET	/api/customers	Retrieve all customers

GET	/api/customers/:id	Get a specific customer by ID

PUT	/api/customers/:id	Update customer details

DELETE	/api/customers/:id	Delete a customer

Bike Management

Method	Endpoint	Description

POST :	/api/bikes	Add a new bike

GET	: /api/bikes	Retrieve all bikes

GET	 : /api/bikes/:id	Get a specific bike by ID

Service Management

Method	Endpoint	Description

POST :	/api/services	Create a service record
GET :	/api/services	Retrieve all service records

GET :	/api/services/:id	Get a specific service record

PUT :	/api/services/:id/complete	Mark a service as completed

GET :	/api/services/status	Get overdue or pending services (older than 7 days)
```

📥 Installation & Setup
Prerequisites
Node.js (v16 or higher)
PostgreSQL database
npm, pnpm, bun or yarn package manager
Setup Steps
Clone the repository
git clone https://github.com/al-af-muktadir/Ph-assignment-8.git
cd Ph-assignment-8
Install dependencies

npm install
# or
yarn install
Set up environment variables Create a .env file in the root directory with the following variables:


npx prisma migrate dev --name init
Start the development server

npm run dev
# or
yarn dev
Build for production

npm run build
# or
yarn build


📊 Database Schema
```
Customer Table
Field	Type	Description
customerId	UUID	Unique identifier for the customer
name	String	Full name of the customer
email	String	Unique email
phone	String	Contact number
createdAt	DateTime	Auto timestamp when created
Bike Table
Field	Type	Description
bikeId	UUID	Unique identifier for each bike
brand	String	Brand of the bike (e.g., Honda,Royal Enfield)
model	String	Model name
year	Int	Manufacturing year
customerId	UUID	Foreign key referencing Customer
ServiceRecord Table
Field	Type	Description
serviceId	UUID	Unique identifier for the service record
bikeId	UUID	FK to Bike
serviceDate	DateTime	Date the service started
completionDate	DateTime	Nullable. Date the service completed
description	String	Details of service (e.g., oil change)
status	String	Status: "pending", "in-progress", "done"
```
Error Handling
The API implements standardized error responses:

{
  "success": false,
  "status": 404,
  "message": "Customer not found",
  "stack": "Optional stack trace shown only in development"
}
