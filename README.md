# NexusRealm

NexusRealm is a self-hosted suite of tools for Dungeons & Dragons 5th edition.

## Tech Stack

- **Frontend/Fullstack**: React & Next.js + Tailwindcss + shadcn/ui
- **DB**: SQLite (lightweight for self-host)
- **Auth**: Lucia Auth and Argon2id
- **Deployment** Docker (for easy management in homelab environments)

## Installation - Will be updated as development continues

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
3. Run development server
```bash
pnpm dev # or npm run dev/yarn dev
```

## License

This project is licensed under the GNU Affero General Public License v3.0. See [LICENSE](LICENSE) for details.
