# 🛒 Bazar Dor — বাজার দর

### A Modern Bangladeshi Market Price Tracking Platform

Bazar Dor is a modern, responsive web application designed to help users explore daily market prices in Bangladesh. Users can browse products by category, check price information, discover price increases and decreases, and access market data through a clean and user-friendly interface.

---

## 🌐 Live Demo

🔗 **Live Website:** [Visit Bazar Dor](YOUR_VERCEL_DEPLOYMENT_URL)

## 📸 About The Project

Bazar Dor aims to make market price information easier to access for everyday consumers in Bangladesh. The platform provides a convenient way to explore products, navigate categories, and understand market price changes through an intuitive interface.

The application is built with modern web technologies, with a focus on responsive design, reusable components, dynamic API data, and a smooth user experience.

## ✨ Key Features

* **📱 Fully Responsive Design** — Works across mobile, tablet, laptop, and desktop screens.
* **🛍️ Product Listing** — Browse products and view their available market price information.
* **📂 Category Navigation** — Explore products through organized categories.
* **📈 Price Increase Tracking** — Discover products with increasing prices.
* **📉 Price Decrease Tracking** — Find products with decreasing prices.
* **🔄 Dynamic API Integration** — Retrieve product and market information from an external API.
* **🔐 User Authentication** — Sign in and sign up using the configured authentication system.
* **🧭 Interactive Navigation** — Navigate between pages with active category highlighting.
* **🇧🇩 Bengali Localization** — User-friendly Bengali labels and localized market information.
* **🎨 Modern UI** — Clean layouts, consistent styling, and reusable interface components.
* **⚡ Optimized Web Experience** — Built with Next.js for modern web development and production deployment.

## 🛠️ Technologies Used

| Technology   | Purpose                                 |
| ------------ | --------------------------------------- |
| Next.js      | React framework and application routing |
| React        | Component-based user interface          |
| TypeScript   | Type-safe application development       |
| Tailwind CSS | Responsive styling and layout           |
| daisyUI      | Prebuilt UI components                  |
| HeroUI       | Interface components                    |
| Better Auth  | User authentication                     |
| REST API     | Dynamic market and product data         |
| Git & GitHub | Version control and source management   |
| Vercel       | Deployment and hosting                  |

*Keep only the technologies actually used in your project.*

## 📁 Project Structure

```text
bazar-dor/
├── public/
├── src/
│   └── app/
│       ├── Categories/
│       ├── CategoriesDetails/
│       ├── components/
│       ├── layout.tsx
│       └── page.tsx
├── .env.local
├── .gitignore
├── next.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

*This is an illustrative structure. Update it to match your actual project folders and route names.*

## 🚀 Getting Started

Follow these steps to run Bazar Dor locally.

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* Git

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project

```bash
cd bazar-dor
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the project root and configure the environment variables required by your application.

Example:

```env
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_secret_key
```

Add your database, OAuth, and other required variables according to your actual configuration. Never commit real credentials or secret keys to GitHub.

### 5. Run the Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## 🏗️ Build for Production

To create a production build:

```bash
npm run build
```

To run the production build locally:

```bash
npm run start
```

## 🚀 Deployment

Bazar Dor is designed to be deployed on Vercel.

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables in Vercel.
4. Deploy the application.
5. Push future updates to the connected deployment branch to trigger automatic deployments.

**Deployment platform:** [Vercel](https://vercel.com/)

## 🔗 API Integration

The application uses an external API to retrieve market and product information.

**API Base URL:** `https://api.abcz.workers.dev/api/bazardor/`

Example endpoint:

```text
https://api.abcz.workers.dev/api/bazardor/products
```

Refer to the API implementation in the source code for the available endpoints and response formats.

## 🎯 Project Goals

* Make market price information easier to access.
* Help users explore product categories efficiently.
* Present price increases and decreases clearly.
* Deliver a responsive and accessible browsing experience.
* Practice modern full-stack web development concepts.

## 🔮 Future Improvements

* Advanced product search and filtering.
* Market-wise price comparison.
* Interactive price history charts.
* User-specific saved products and preferences.
* Improved accessibility and performance monitoring.

## 👨‍💻 Author

**Saun**
Full-Stack Web Developer from Bangladesh

* GitHub: [@saun55](https://github.com/saun55)
* LinkedIn: [Shawon Ahmmed](https://www.linkedin.com/in/shawonahmmed/)

## 🤝 Contributing

Suggestions and contributions are welcome. Feel free to open an issue or submit a pull request to improve the project.

## 📄 License

This project is intended for educational and development purposes. Add a license file if you plan to distribute the project under a specific open-source license.

---

<p align="center">
  Built with ❤️ by Saun
</p>
