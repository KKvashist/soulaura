# SoulAura (merged)

Design from the original SoulAura project plus: enquiry form saving to Google Sheets, WhatsApp community popup, newsletter signup.

## Run
```
npm install
copy .env.example .env     (then fill in your values)
npm run dev
```
`.env` needs `VITE_GOOGLE_SCRIPT_URL` and `VITE_WHATSAPP_OWNER_NUMBER`. Restart `npm run dev` after editing it.

## Where things are
- `src/ctx.tsx`, `src/components/EnquiryModal.tsx`: enquiry form (every "Start Your Journey", "Apply", "Choose plan" button opens it)
- `src/components/FloatingWhatsApp.tsx`: community popup
- `src/lib/config.ts`: Google Sheets / WhatsApp / EmailJS helpers
- `google-apps-script/Code.gs`: backend (deploy as Web app, access: Anyone)
- Footer: newsletter signup and links

Event "Apply" buttons now open the enquiry form with the event preselected. Images are Unsplash links in `src/data/*.ts` and components; replace with your own in `public/assets/`.
