# Vercel Deployment

This project is ready for Vercel as a Vite React app.

## Deploy From Vercel Website

1. Upload or push this `wedding-invitation` folder to GitHub.
2. Open Vercel and choose **Add New Project**.
3. Import the GitHub repository.
4. Vercel should auto-detect the settings from `vercel.json`:
   - Framework: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`
5. Click **Deploy**.

## Deploy From VS Code Terminal

Run these commands inside this folder:

```powershell
npm.cmd run build
npx vercel
```

For production:

```powershell
npx vercel --prod
```

The app uses local bundled assets, so no extra environment variables are needed.
