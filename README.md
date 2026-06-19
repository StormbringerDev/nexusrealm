# NexusRealm

NexusRealm is a self-hosted suite of tools for Dungeons & Dragons 5th Edition.

## Tech Stack

- **Frontend/Fullstack**: React & Next.js + Tailwindcss + shadcn/ui
- **DB**: SQLite and Drizzle (lightweight for self-host)
- **Auth**: Better-Auth and Argon2
- **Deployment**: Docker (for easy management in homelab environments)

## Installation

### Prerequisites

- git
- Node.js
- npm, Yarn, or pnpm

### Instructions

1. Clone the repository

```bash
git clone https://github.com/StormbringerDev/nexusrealm.git
cd nexusrealm
```

2. Install dependencies

```bash
pnpm install # or npm/yarn install
```

3. Run migrations

```bash
pnpm drizzle-kit migrate # npx drizzle-kit migrate or yarn drizzle-kit migrate
```

4. Run development server

```bash
pnpm dev # npm run dev or yarn dev works here
```

## License

This project is licensed under the GNU Affero General Public License v3.0. See [LICENSE](LICENSE) for details.
