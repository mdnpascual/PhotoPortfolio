# Feature 09: About & Contact Pages

## Feature Name
**Personal Bio and Contact Information Pages**

## Description
- Two simple static pages: About (photographer bio) and Contact (social links, email)
- About page: personal photo, bio text, photography journey story
- Contact page: email, social media links (Instagram, Flickr, etc.), simple layout
- Minimal design, text-focused with supporting imagery

## Primary User Flow

### About Page
1. User navigates to About page from landing page or navigation drawer
2. User sees personal photo (portrait or abstract)
3. User reads hobbyist bio (2-3 paragraphs)
4. User scrolls through photography journey highlights
5. User can navigate away using hamburger menu

### Contact Page
1. User navigates to Contact page from landing page or navigation drawer
2. User sees page title and brief message
3. User sees email address (click to open mail client)
4. User sees social media icons with links (Instagram, Flickr, LinkedIn, etc.)
5. User clicks icon → opens social profile in new tab
6. User can navigate away using hamburger menu

## Modules Involved
- **AboutPage Component** (bio page container)
- **ContactPage Component** (contact info container)
- **BioSection Component** (text + image layout for about page)
- **SocialLinks Component** (icon grid for contact page)
- **SocialIcon Component** (individual social media icon with link)
- **ContactData** (JSON file with email and social URLs)

## Dependencies
- **React Router DOM** (page routing)
- **Tailwind CSS** (text formatting, responsive layout)
- **WebP images** (personal photo on About page)
- **Social media icons** (SVG icons for Instagram, Flickr, LinkedIn, etc.)

## Open Questions / Missing Info
- Q1: About page layout: centered text or split (image left, text right)?
- A1: Centered text with image above on mobile, split layout on desktop (image 40%, text 60%)
- Q2: Bio length: short (1 paragraph) or detailed (3-4 paragraphs)?
- A2: Medium length (2-3 paragraphs), conversational tone
- Q3: Contact page: display email as text or use contact form?
- A3: Display email as clickable mailto: link, no contact form
- Q4: Social icons: color or monochrome?
- A4: Monochrome (gray) with color on hover (brand colors)
- Q5: Social icon size: small (32px), medium (48px), or large (64px)?
- A5: Medium (48px) for desktop, large (64px) for mobile (touch-friendly)
- Q6: Should there be a back-to-top button on About page?
- A6: No, page should be short enough to not need it
- Q7: About page image: single hero or multiple photos?
- A7: Single portrait or abstract image at top
- Q8: Contact page: should there be a "Download Resume/CV" link?
- A8: No, this is a hobbyist portfolio, not professional resume site
