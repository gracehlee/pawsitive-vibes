[Return to README](../README.md)

# Grace's Updates

Here is a log of individual updates that I personally authored after creating a separate project repository.

- Updated CSS
    - Change button CSS
    - Adjust MeetUps and Services List to resize properly in mobile view
    - Adjust CSS on all dog cards for cleaner aesthetics
    - Dog card images will object fit: cover when in mobile view
    - Added Contact scroll button to Pets page to navigate to bottom of page

- Calendly API
    - added Calendly calendar to service page

- Instagram API
    - added Instagram API to pull images from business Instagram

- Meetups History
    - added filtering by current events for regular Meetups list
    - added history table to display all meetups ever created (for admin view only)

# Updated .env files

In root folder:
```json
POSTGRES_DB="database_volume"
POSTGRES_USER="username"
POSTGRES_PASSWORD="password"
SIGNING_KEY="key"
VITE_PUBLIC_KEY="emailjskey"
VITE_TEMPLATE_ID="emailjsid"
VITE_SERVICE_ID="emailjsserviceid"
VITE_PV_EMAIL = "pawsitivevibescolorado@gmail.com"
VITE_GOOGLE_MAPS_API_KEY = "googleapikey"
VITE_SNAPWIDGET = "instasgramurl"
VITE_CALENDLY = "calendlylink"

```

In ghi folder:

```json
VITE_PUBLIC_KEY="emailjskey"
VITE_TEMPLATE_ID="emailjsid"
VITE_SERVICE_ID="emailjsserviceid"
VITE_PV_EMAIL = "pawsitivevibescolorado@gmail.com"
VITE_GOOGLE_MAPS_API_KEY = "googleapikey"
VITE_SNAPWIDGET = "instasgramurl"
VITE_CALENDLY = "calendlylink"

```
