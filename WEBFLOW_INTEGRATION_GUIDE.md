# Webflow Integration Guide

This guide explains how to integrate the GitHub/jsDelivr setup with your Webflow project for Astons Law Chambers.

## Overview

Your JavaScript and CSS assets are hosted on GitHub and served through jsDelivr CDN. This approach provides:
- Fast global CDN delivery
- Version control for all custom code
- Easy deployment workflow
- Separation of concerns (visual design in Webflow, code in GitHub)

## Step 1: Create Webflow Project

1. Log in to Webflow
2. Create a new project named "Astons Law Chambers"
3. Choose a blank template or start from scratch
4. **Important**: Do not use native Webflow Paragraph, Container, Section, or Column blocks. Use plain div blocks with Mast classes.

## Step 2: Add Mast Framework to Webflow

Since you're using the Mast Framework v2.4, you'll need to:

1. Import the Mast framework classes into Webflow's Designer
2. Set up the global styles according to Mast documentation
3. Configure variables (Theme, Typography, Components, Layout, Color) as per Mast framework
4. Reference: https://www.nocodesupply.co/mast/docs

## Step 3: Configure Custom Code in Webflow

### Site-Wide Custom Code (Head)

Go to Project Settings → Custom Code → Head Code and add:

```html
<!-- Example CSS from jsDelivr (update with actual files when ready) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mxhfxz/astons-law-chambers@main/dist/styles.css">
```

### Site-Wide Custom Code (Before Body Close)

Go to Project Settings → Custom Code → Footer Code and add:

```html
<!-- Example JavaScript from jsDelivr (update with actual files when ready) -->
<script src="https://cdn.jsdelivr.net/gh/mxhfxz/astons-law-chambers@main/dist/site.min.js"></script>
```

## Step 4: Per-Page Custom Code

For page-specific functionality:

1. Open the page in Webflow Designer
2. Click the Page Settings icon (gear icon)
3. Scroll to Custom Code section
4. Add page-specific scripts or styles

## Step 5: Development Workflow

### Making Code Changes

1. Edit source files in `/Users/mahfuzpholby/Documents/Agency-Work/astons-law-chambers/src/`
2. Run build command: `npm run build` (or `npm run build:all`)
3. Commit and push to GitHub: `git add . && git commit -m "Your message" && git push`
4. jsDelivr automatically updates within seconds
5. If you changed file names or added new files, update Webflow custom code references

### Asset URL Pattern

Always use this pattern for referencing assets:
- CSS: `https://cdn.jsdelivr.net/gh/mxhfxz/astons-law-chambers@main/dist/[FILENAME].css`
- JavaScript: `https://cdn.jsdelivr.net/gh/mxhfxz/astons-law-chambers@main/dist/[FILENAME].min.js`

## Step 6: Version Management

For production releases, you can use Git tags for version-specific CDN access:

```html
<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/gh/mxhfxz/astons-law-chambers@v1.0.0/dist/site.min.js"></script>
```

## Step 7: Testing

Before publishing to production:

1. Test all custom code functionality
2. Verify CDN links are loading (check browser DevTools Network tab)
3. Test responsive behavior
4. Check console for errors

## Common Issues

### CDN Not Loading
- Verify the GitHub repository is public
- Check the file exists in the dist/ folder
- Wait 1-2 minutes after pushing to GitHub for jsDelivr to update

### Code Not Executing
- Check browser console for errors
- Verify script is placed in the correct section (head vs body)
- Ensure no syntax errors in your JavaScript

## Next Steps

1. Create the Webflow project
2. Import Mast framework
3. Set up initial custom code references
4. Begin building the site using Mast classes

Once your Webflow project is created, let me know and I can help with specific integrations or custom code development.
