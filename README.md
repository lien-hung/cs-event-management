# University Event Management

This project contains source code for management of events and activities for university students. It is based on [a past group project](https://github.com/lien-hung/soa-event-management) of mine, but modernized and uses .NET for backend instead of Java.

## Usage

Clone the source code and apply the following commands:

- Backend: `dotnet run --project EventManagement`
- Frontend: `npm install && npm run dev`

## Tech Stack

- Backend:
  - C# (.NET 10)
  - ASP.NET Core Web API (with JWT auth)
  - SQL Server (LocalDB)
- Frontend:
  - React 19 (Vite + TypeScript)
  - React Router
  - Styling: Tailwind CSS, Bootstrap

## License

MIT