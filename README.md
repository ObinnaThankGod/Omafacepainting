# Oma's Face Painting

A colorful, responsive website for a face painting business — built with plain HTML, CSS, and JavaScript (no build step required).

## Sections

- **Home** — hero intro and call to action
- **Services & Pricing** — package cards for birthdays, festivals, and corporate events
- **Gallery** — showcase of face painting designs (placeholder tiles, ready to swap for real photos)
- **About** — business story and credentials
- **Reviews** — customer testimonials
- **Contact** — booking request form

## Running locally

No build tools needed. Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Structure

```
index.html
assets/
  css/style.css
  js/main.js
  images/
```

## Next steps

- Replace gallery placeholder tiles in `index.html` with real event photos in `assets/images/`
- Connect the booking form (`assets/js/main.js`) to a real backend or service like Formspree/EmailJS
- Update contact details, social links, and pricing to match your actual business
