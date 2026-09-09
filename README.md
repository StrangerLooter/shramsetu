# ShramSetu (श्रमसेतु)
### Cooperative-First Digital Public Service Operating System

[![Next.js](https://img.shields.io/badge/Next.js-14.2.16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)

> **ShramSetu** transforms gig and informal work into protected, dignifying cooperative livelihoods. Rather than treating workers as algorithmically commoditized gig labor, ShramSetu operates on a **cooperative-first model**: customer bookings flow through local democratic worker cooperatives that enforce wage floors, dispute arbitration, fair rotation, emergency assistance, and dividend sharing.

---

## 🌟 Key Highlights & Philosophy

- **Cooperative-First Allocation**: Jobs are allocated transparently based on fair rotation, skill verification, and proximity rather than punitive algorithms.
- **Protected Wage Floors & Margin Transparency**: Customers see transparent platform markups (90%+ to the worker/cooperative vs platform deductions).
- **Democratic Governance & Voting**: Workers participate directly in cooperative wage revisions, dividend payouts, and safety protocols.
- **Multilingual & Voice-Assisted UX**: Built-in support for Hindi, English, and regional languages with voice booking capabilities for accessibility.
- **Wispr Flow Inspired Aesthetics**: Clean, calm, refined aesthetic with subtle borders, generous whitespace, understated typography, and crisp tactile micro-interactions.

---

## 🏛️ System Architecture

ShramSetu connects 4 key stakeholders through dedicated portals:

1. **Customer Portal (`/`)**
   - Direct service booking (Home maintenance, Electrical, Plumbing, Cleaning, Carpentry, Painting, Appliance repair)
   - Live booking tracking with stage timelines (`/customer/bookings/[id]`)
   - Fair wage breakdown calculator & cooperative transparency receipts
   - Multilingual voice-guided request flow (`/customer/request`)

2. **Worker Portal (`/worker`)**
   - Active job dispatch, accept/complete workflows (`/worker/jobs`)
   - Daily earnings ledger with direct deposit breakdown (`/worker/earnings`)
   - Cooperative welfare fund, emergency assistance, insurance, and skill certificates (`/worker/welfare`)

3. **Cooperative Portal (`/cooperative`)**
   - Democratic allocation queue & dispatch dashboard (`/cooperative/allocation`)
   - Worker roster with verification statuses & skills (`/cooperative/workers`)
   - Cooperative member voting & policy referendum portal (`/cooperative/voting`)

4. **Platform Admin & Community Governance (`/admin` & `/community`)**
   - System health, cooperative verification, city-wide metrics, emergency alerts
   - Community-led local initiatives and welfare drives

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or higher
- npm 9+ or pnpm / yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/StrangerLooter/shramsetu.git

# Navigate to the directory
cd shramsetu

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production

```bash
npm run build
npm start
```

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom design system tokens
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
