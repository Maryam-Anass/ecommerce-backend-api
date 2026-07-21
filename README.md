# eCommerce Backend API

## Project Goal
The goal of this project is to build a reliable, dynamic, flexiable Node.js/express REST API backed by MongoDB database for an eCommerce platform. It provides endpoints for authinticating users, managing catalog items, handling product updates, and maintaining user shopping carts.

---

## User Stories

### Product Browsing Role
* **As a shopper/client**, I can view all available products in the store catalog. in addition to viewing specific details of an individual product by its ID.

### Shopping Cart Role
* **As a shopper**, I can fetch my current active shopping cart.
* **As a shopper**, I can add new items to my cart or increment existing item quantities.
* **As a shopper**, I can update quantities or remove items from my shopping cart.

### Admin Role
* **As an admin**, I can securely obtain administrator credentials
* **As an admin**, I can add new products to the inventory.
* **As an admin**, I can edit product details, pricing, and stock levels.
* **As an admin**, I can delete products from the store database.

---

## Getting Started & Installation

### Prerequisites
* Node.js (v14+ recommended)
* MongoDB running locally or a MongoDB Atlas URI

### 1.Installation
Clone the reposity and install dependencies:
```bash
git clone <github-repo-url>
cd <your-project folder>
npm install
node seed.js
npm start"" 
