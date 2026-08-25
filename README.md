# SilverCare India — Premium Eldercare & Home Healthcare Web Application

<p align="center">
  <img src="public/silvercare-logo.png" alt="SilverCare India Logo" width="280" />
</p>

SilverCare India is a state-of-the-art eldercare and home healthcare web platform. Built with React, TypeScript, TailwindCSS, and Motion, it offers a seamless patient booking experience, interactive care tools, editorial healthcare stories, and a fully functional administrative management suite.

---

## 🌟 Key Features

### 1. High-Impact Motion Hero Section
- **Cinematic Rotating Service Text**: Continuously highlights key offerings (*Caregivers*, *Nursing Care*, *Physiotherapy*, *Doctor Visits*, *Senior Companionship*, *Telemedicine*) with a vertical slot transition and zero vertical layout shift.
- **Official Branding**: Features official SilverCare logos and verified healthcare specialist imagery.
- **Ambient Floating Trust Cards**: Subtle motion animations showcasing 24/7 doctor support and patient-first care.

### 2. Interactive Care Tools & Calculators
- **Care Plan Cost Estimator**: Interactive calculator allowing families to select service types, durations, and locations to estimate care plans instantly.
- **Real-Time Service Availability Checker**: Instant PIN code and city lookup (*Gurgaon Sector 33 Hub*, *Delhi NCR*, *Chandigarh Tri-City*, *Mohali*, *Panchkula*, *Ludhiana*) with dispatch status cards.

### 3. Editorial Blog & Healthcare Insights Platform (`/blog`)
- **Stories & Insights Hub**: Magazine-style editorial gallery showcasing authentic success stories, senior health tips, caregiver guidance, and regional healthcare trends.
- **Dynamic Article View (`/blog/:slug`)**: Medical reviewer badges (*"Medically Reviewed by Dr. Vikas Sharma"*), reading times, social share links (WhatsApp 1-click share), and related articles.

### 4. Comprehensive Admin Control Suite (`/admin`)
- **Operational Dashboard**: Live booking enquiries, active healthcare staff metrics, and patient management.
- **Healthcare Professionals Directory (`/admin/professionals`)**: Staff manager for doctors, physiotherapists, and registered nurses.
- **Blog & Content Manager (`/admin/blog`)**: Create, edit, and publish stories, set cover images, regional tags, and featured badges.
- **Media & Branding Manager (`/admin/content`)**: Control logo URLs, hero doctor photo, helpline numbers (`+91 800-14-800-75`), and Gurgaon address.
- **Social Media Sync (`/admin/social-sync`)**: Instagram & Facebook feed connector and cross-platform post publisher.

---

## 🔐 Admin Panel Credentials

To access the administrative suite locally:

- **Admin Login URL**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Admin ID / Username**: `admin` *(or `admin@silvercare.com`)*
- **Password**: `admin123`

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.x or higher)
- npm or yarn

### Installation & Local Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/silvercare-website.git
   cd silvercare-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000/` in your browser.

4. **Verify production build:**
   ```bash
   npm run build
   ```

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: TailwindCSS, Lucide Icons, Custom UI Components
- **Animations**: Motion (`motion/react`)
- **Routing**: React Router v6
- **Backend / Database**: Firebase (Firestore & Auth ready with fallback mock data)
- **SEO & Meta**: React Helmet Async

---

## 📁 Project Structure

```
silvercare-website/
├── public/                     # Static assets (logos, favicons)
├── src/
│   ├── assets/                 # High-resolution hero imagery
│   ├── components/
│   │   ├── layout/             # Navbar, Footer, AdminLayout, AdminSidebar
│   │   ├── seo/                # SEO helmet wrapper
│   │   ├── shared/             # Service search sub-header
│   │   ├── tools/              # Interactive Care Calculator
│   │   └── ui/                 # Reusable UI buttons, cards, modals
│   ├── data/                   # Blog articles dataset (blogData.ts)
│   ├── hooks/                  # Content state hook (useAppContent.ts)
│   ├── lib/                    # Auth context & Firebase config
│   ├── pages/
│   │   ├── admin/              # Dashboard, Staff, Media, Social Sync, Blog Admin
│   │   └── public/             # Home, About, Services, Blog, BlogPost, BookForm
│   ├── App.tsx                 # Route mapping
│   └── main.tsx                # Entrypoint
├── package.json
└── README.md
```

---

<p align="center">
  <strong>SilverCare India</strong> — Hospital-quality care with compassion at home.
</p>
