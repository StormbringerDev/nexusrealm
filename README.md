# NexusRealm

NexusRealm is a self-hosted suite of tools for Dungeons & Dragons 5th Edition. You may be thinking, "Why use NexusRealm when so many D&D tools exist?" To that I say, that's a fair question, but not all of those tools run on your hardware (or are free for that matter).

## Tech Stack

- **Frontend/Fullstack**: React & Next.js + Tailwindcss + shadcn/ui
- **DB**: PostgreSQL and Drizzle (common in homelab environments)
- **Auth**: Better-Auth and Argon2
- **Deployment**: Docker (for easy management in homelab environments)

## Installation

### Local Development

#### Prerequisites

- git
- Node.js
- pnpm (recommended), npm, or Yarn

#### Steps

1. Clone the repository
   ```bash
   git clone https://github.com/StormbringerDev/nexusrealm.git
   cd nexusrealm
   ```
2. Install dependencies
   ```bash
   pnpm install
   ```
3. Run database migrations
   ```bash
   pnpm drizzle-kit migrate
   ```
4. Start the development server
   ```bash
   pnpm dev
   ```

### Docker (Recommended for Production / Homelab)

#### Prerequisites

- Docker and Docker Compose

#### Quick Start

1. Clone the repository (same as above).
2. Configure your environment variables in `docker-compose.yml` (or a `.env` file):
   - BETTER_AUTH_SECRET - generate with `openssl rand -base64 32`
   - BETTER_AUTH_URL - e.g. `http://localhost:3000` (or your production domain)
3. Build and start:
   ```bash
   docker compose up -d --build
   ```

The application will be available at `http://localhost:3000`.  
Database migrations run automatically on container startup, and your SQLite database is persisted in a Docker volume.  
For more details, see the Docker files and the `docker compose` service definition.

## License

This project is licensed under the GNU Affero General Public License v3.0. See [LICENSE](LICENSE) for details.
