# Feature 01: Navigation Drawer System

## Feature Name
**Persistent Hamburger Navigation with Left-Side Drawer**

## Description
- Hamburger icon persists in top-left across all pages and scroll sections
- Opens a left-side drawer covering 66% of screen width (100% on mobile)
- Displays tree-structured menu with expandable categories (Gallery, Techniques, Post-Processing, Gear, About, Contact)
- Routes to pages on multi-page views; scrolls to sections on landing page

## Primary User Flow
1. User clicks hamburger icon (top-left)
2. Drawer slides in from left with darkened backdrop overlay
3. User views expanded tree menu with all navigation options
4. User clicks a menu item:
   - On landing page → smoothly scrolls to corresponding section
   - On other pages → navigates to that page/route
5. User closes drawer by clicking backdrop or clicking item (smooth close animation)

## Modules Involved
- **NavigationDrawer Component** (main drawer UI)
- **HamburgerIcon Component** (persistent trigger button)
- **MenuTree Component** (nested navigation structure)
- **Backdrop Component** (overlay when drawer is open)
- **Router Integration** (context-aware navigation: scroll vs route)

## Dependencies
- **React Router DOM** (for page routing)
- **Framer Motion** (drawer slide-in/out animations)
- **Tailwind CSS** (responsive width: 33% desktop, 80% mobile)
- **Lenis** (for smooth scroll to section on landing page)

## Open Questions / Missing Info
- Q1: Should drawer auto-close on route navigation, or stay open?
- A1: Auto close with animation
- Q2: Animation duration for drawer open/close? (Default: 300ms?)
- A2: 300ms is a good starting point. Create a variable so I can easily modify it
- Q3: Should tree menu items be collapsible, or always expanded?
- A3: Always Expanded
- Q4: ESC key behavior: close drawer or navigate back?
- A4: Don't support keyboard navigation
- Q5: Does drawer support keyboard navigation (Tab, Arrow keys)?
- A5: Don't support keyboard navigation
