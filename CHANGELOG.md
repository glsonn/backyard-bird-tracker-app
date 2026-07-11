# Changelog

All notable changes to Backyard Bird Tracker are documented here.

---

## July 2026

### Added

- Added private personal journals using anonymous browser-based user identities.
- Added user ownership to sightings data.
- Existing sightings migrated to the user's personal journal.
- New sightings are automatically associated with the correct user.
- Added protection so users can only update and delete their own sightings.

### Journal Improvements

- Added daily grouping for recent sightings.
- Added collapsible daily journal sections.
- Today's sightings remain expanded while older sections begin collapsed.

### Memory Features

- Added species memory cues when selecting a species:
  - Last recorded sighting
  - Formatted previous sighting date
  - Relative time since previous sighting
  - First-ever sighting indication

### User Experience

- Improved species selection with a searchable species picker.
- Added species filtering.
- Added sorting options.
- Added yard statistics and species summaries.
- Improved mobile usability.

---

## Initial Development

### Added

- Created the Backyard Bird Tracker personal bird journal.
- Implemented sighting creation, editing, and deletion.
- Added support for:
  - Species
  - Count
  - Date seen
  - Notes
  - Location

- Added Supabase database storage.
- Added deployment through Vercel.

### Design Direction

Established the core product philosophy:

- A personal backyard journal, not a competitive birding platform.
- Reflection over competition.
- Long-term memories over short-term metrics.

The app intentionally avoids:

- Badges
- Achievements
- Streaks
- XP systems
- Leaderboards
- Social competition

---

## Future Development

Potential future improvements:

- Jump to Today journal navigation
- Easier editing of today's sightings
- Species history pages
- "On This Day" memories
- Year-over-year comparisons
- Seasonal arrival and departure tracking
- CSV export
- Additional personal reflection features
