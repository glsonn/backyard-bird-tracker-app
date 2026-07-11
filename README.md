# Backyard Bird Tracker

A personal backyard bird journal built for remembering the birds that visit your own yard.

Backyard Bird Tracker is designed around a simple idea:

> The birds you see today become more meaningful when you can look back years from now.

This is not a competitive birding platform. It is a private journal for casual birders, homeowners, gardeners, retirees, nature photographers, and anyone who enjoys noticing the wildlife around them.

The goal is not to collect points or compete. The goal is to remember.

---

## Features

### Personal Bird Journal

- Add bird sightings with:
  - Species
  - Count
  - Date seen
  - Optional notes
  - Optional location

- Edit and delete sightings
- View recent sightings in a chronological journal

### Journal Organization

- Recent sightings grouped by day
- Collapsible daily sections
- Today's sightings highlighted for easier review

### Species Memory

- Searchable species selection
- Species filtering
- Sorting options
- Previous sighting memory cues when recording a bird

### Yard Insights

- Species summaries
- Yard statistics
- Seasonal tracking

The focus is reflection rather than competition. Statistics are included only when they help tell the story of your own backyard.

---

## Privacy Model

Backyard Bird Tracker uses private personal journals.

Each user receives an anonymous browser-based user ID when they first use the app. Sightings are associated with that user's journal.

No account creation or password is currently required.

This approach keeps the experience simple while allowing each person to maintain their own private bird history.

---

## Technology

Built with:

- Next.js App Router
- TypeScript
- Supabase
- Vercel
- GitHub

---

## Development Philosophy

Backyard Bird Tracker follows a few guiding principles:

### Keep it simple

The app is designed for people who want to enjoy birds, not manage complicated software.

### Prefer memories over metrics

The most valuable features are the ones that become more meaningful with time:

- "When did I first see this species?"
- "When did this bird usually arrive?"
- "What was visiting my yard this time last year?"

### Avoid competition

The app intentionally does not include:

- Badges
- Achievements
- Streaks
- XP systems
- Leaderboards
- Social competition

A backyard bird journal should feel personal.

---

## Local Development

### Requirements

- Node.js
- npm
- A Supabase project

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Do not commit environment variables or secret keys.

---

## Project Status

Backyard Bird Tracker is actively being developed.

Current focus areas:

- Improving the journal experience
- Adding meaningful memory cues
- Making long-term personal history more valuable

Future possibilities include:

- Species history pages
- "On This Day" memories
- Year-over-year comparisons
- CSV export
- Additional reflection tools

---

## Long-Term Vision

A birding app becomes more valuable when it has history.

A sighting recorded today may seem small. After five years, it becomes part of a personal record:

- The first robin of spring
- A favorite feeder visitor
- A species that disappeared for a season
- A bird seen only once but never forgotten

Backyard Bird Tracker is built to preserve those moments.
