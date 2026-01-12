<high_level_design>
# 1. Brand & Art Direction Overview

**Cosmos** is a cosmic-themed AI automation and Micro-SaaS platform with a futuristic, space-inspired aesthetic. The design balances calm sophistication with electric energy through:

- **Dark cosmic backgrounds** transitioning from deep navy (#0A0E1A, #0F1419) to midnight blue (#1A1F2E)
- **White-violet electric lightning accents** replacing the original purple with soft violet (#A78BFA, #C4B5FD) and electric white highlights
- **Cosmic gray gradients** (#E5E7EB, #C0C0C0, #F9FAFB) for lighter sections
- **Space-themed visual elements**: nebula effects, particle drifts, floating cards like satellites, glowing planetary UI components
- **Glassmorphism** and translucent overlays with subtle backdrop blurs
- **Animated lightning strikes** and electric arcs on interactive elements
- **3D parallax effects** with depth and motion

The overall mood is **peaceful yet powerful** — an intelligent, out-of-this-world AI universe that feels trustworthy and cutting-edge.

---

# 2. Color Palette (Dark Theme)

| Token | HEX/RGB | Usage | Notes |
|-------|---------|-------|-------|
| **Background Primary** | #0A0E1A | Main page background | Deep cosmic navy |
| **Background Secondary** | #0F1419 | Section backgrounds | Slightly lighter navy |
| **Background Tertiary** | #1A1F2E | Card backgrounds | Elevated surfaces |
| **Background Accent** | #1E293B | Hover states, borders | Subtle contrast |
| **Text Primary** | #FFFFFF | Headings, primary text | Pure white |
| **Text Secondary** | #E5E7EB | Body text, descriptions | Soft gray-white |
| **Text Tertiary** | #9CA3AF | Muted text | Medium gray |
| **Accent Primary** | #A78BFA | Primary buttons, highlights | Soft violet |
| **Accent Secondary** | #C4B5FD | Hover states, glows | Light violet |
| **Accent Electric** | #FFFFFF | Lightning, electric effects | Pure white glow |
| **Border** | #374151 | Card borders, dividers | Dark gray-blue |
| **Border Accent** | #6366F1 | Focused borders | Indigo accent |
| **Success** | #10B981 | Success states | Emerald |
| **Cosmic Glow** | rgba(167, 139, 250, 0.5) | Shadow glows | Violet with transparency |
| **Glass Overlay** | rgba(255, 255, 255, 0.05) | Glassmorphism | White with 5% opacity |

---

# 3. Typography Scale

## Fonts
- **Headings**: "Playfair Display" (serif, elegant) or "Spectral"
- **Subheadings**: "DM Serif Display" or same as headings
- **Body**: "Inter" (sans-serif, clean) or "Poppins"
- **Monospace/Code**: "JetBrains Mono" or "Fira Code"

## Scale
| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| **Hero H1** | 5.5rem (88px) | 700 | 1.1 | -0.02em |
| **H2** | 3.5rem (56px) | 700 | 1.15 | -0.01em |
| **H3** | 2.5rem (40px) | 600 | 1.2 | 0 |
| **H4** | 2rem (32px) | 600 | 1.25 | 0 |
| **H5** | 1.5rem (24px) | 600 | 1.3 | 0 |
| **Body Large** | 1.25rem (20px) | 400 | 1.6 | 0 |
| **Body** | 1rem (16px) | 400 | 1.6 | 0 |
| **Body Small** | 0.875rem (14px) | 400 | 1.5 | 0 |
| **Caption** | 0.75rem (12px) | 500 | 1.4 | 0.02em |
| **Button** | 1rem (16px) | 600 | 1 | 0.02em |

---

# 4. Spacing & Layout Grid

## Container
- Max width: 1280px
- Padding: 2rem (32px) mobile, 4rem (64px) desktop

## Spacing Scale (Consistent with Tailwind)
- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px
- `2xl`: 48px
- `3xl`: 64px
- `4xl`: 96px
- `5xl`: 128px

## Section Spacing
- Section padding vertical: 5rem (80px) mobile, 8rem (128px) desktop
- Gap between elements: 2rem (32px)
- Card padding: 2rem (32px)

## Grid System
- 12-column grid
- Gap: 2rem (32px)
- Responsive breakpoints: sm(640px), md(768px), lg(1024px), xl(1280px)

---

# 5. Visual Effects & Treatments

## Shadows
```css
/* Card shadow */
box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);

/* Card hover */
box-shadow: 0 8px 32px rgba(167, 139, 250, 0.3);

/* Glow effect */
box-shadow: 0 0 40px rgba(167, 139, 250, 0.6), 0 0 80px rgba(196, 181, 253, 0.3);

/* Lightning glow */
filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.8));
```

## Border Radius
- Small: 8px
- Medium: 12px
- Large: 16px
- XL (cards): 24px
- Buttons: 9999px (pill shape)

## Gradients
```css
/* Background gradient */
background: linear-gradient(180deg, #0A0E1A 0%, #1A1F2E 100%);

/* Cosmic nebula */
background: radial-gradient(circle at 50% 50%, rgba(167, 139, 250, 0.2) 0%, transparent 70%);

/* Button gradient */
background: linear-gradient(135deg, #A78BFA 0%, #6366F1 100%);

/* Glass overlay */
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(12px);
```

## Transitions
```css
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

## Animations
- Lightning flicker: keyframe animation with opacity variations
- Particle drift: slow transform with 10-20s duration
- Card float: subtle translateY on hover
- Glow pulse: scale and opacity animation 2s infinite

---

# 6. Component Styles

## Buttons

### Primary Button
- Background: Linear gradient (#A78BFA to #6366F1)
- Text: White, 16px, 600 weight
- Padding: 16px 32px
- Border radius: 9999px
- Hover: Brightness increase, glow shadow
- Active: Scale 0.98

### Secondary Button
- Background: Transparent
- Border: 2px solid #A78BFA
- Text: #A78BFA
- Padding: 14px 30px
- Border radius: 9999px
- Hover: Background rgba(167, 139, 250, 0.1), glow

### Icon in button
- Calendar icon, phone icon with 20px size
- Positioned left with 8px margin-right

## Cards

### Standard Card
- Background: #1A1F2E
- Border: 1px solid #374151
- Border radius: 24px
- Padding: 32px
- Box-shadow: Default dark shadow
- Hover: Border color #A78BFA, glow shadow, translateY(-4px)

### Floating Card (Satellite style)
- Additional transform: rotate3d slight angle
- Animated orbit motion

### Glass Card
- Background: rgba(255, 255, 255, 0.05)
- Backdrop-filter: blur(12px)
- Border: 1px solid rgba(255, 255, 255, 0.1)

## Navigation

### Top Bar
- Fixed position
- Background: rgba(10, 14, 26, 0.8) with backdrop blur
- Height: 80px
- Links: White text, 16px, hover violet glow underline

### Logo
- Custom "Cosmos" wordmark with cosmic icon
- White color, 24px height

## Forms

### Input Fields
- Background: #1E293B
- Border: 1px solid #374151
- Border radius: 12px
- Padding: 12px 16px
- Focus: Border #A78BFA, glow shadow
- Text: White, 16px
- Placeholder: #9CA3AF

### Audio Player
- Custom styled HTML5 audio controls
- Background: #1A1F2E
- Progress bar: #A78BFA
- Controls: White icons

## Icons
- Line style, 24px default
- Stroke width: 2px
- Color: #A78BFA or white
- Hover: Glow effect

## Lightning Animation
- SVG or Canvas-based
- White-violet gradient stroke
- Animated path with electric flicker
- Positioned behind hero text
- Opacity variations for glow effect

---

# 7. Site Sections (In Order)

1. **Navigation Bar**
   - Logo (left)
   - Links: Home, Services, Case Studies, Pricing, Team, Socials, Login/Signup
   - CTA: "Book Discovery Call" button (right)

2. **Hero Section**
   - Large headline: "Build Smarter. Sell Faster. Sleep Cosmic."
   - Subtext with founder name "founder"
   - Two CTA buttons
   - Four feature badges (AI Voice, MVP/SaaS, Production, ROI-focused)
   - **Background**: Cosmic lightning animation with parallax space clouds

3. **Why Choose Cosmos Section**
   - Section title
   - Four feature cards in grid (24/7, Security, Lightning Fast, AI Voice Intelligence)
   - Icons with descriptions
   - Visual demonstrations (chat mockup, dashboard preview)

4. **Core Services Section**
   - Tab switcher (AI Voice Agents / MVP & Micro-SaaS)
   - Service description with bullet points
   - Performance dashboard visualization
   - CTA button

5. **Methodology Section (How We Work)**
   - Four-step process cards
   - Numbered steps with icons
   - Progressive disclosure design
   - Two CTA buttons at bottom

6. **Interactive AI Experience Section**
   - Hero image (3D robot/AI figure)
   - Description text
   - CTA: "Explore Our Solutions"

7. **Voice Demonstrations Section**
   - Section title
   - Four demo cards with audio players
   - Scenario/Outcome descriptions
   - "Get This For Your Business" CTA

8. **Client Testimonials Section**
   - Horizontal scrolling carousel
   - Testimonial cards with avatar, quote, name, title
   - Auto-scroll with manual navigation

9. **Ready to Start Section (CTA)**
   - Large headline
   - "What to Expect" checklist
   - Two-column layout: checklist left, booking card right
   - Contact info (phone, WhatsApp)
   - "Usually responds within 2 hours" indicator

10. **Who We've Worked With Section**
    - Client logos in horizontal auto-scroll
    - Floating card style with orbit animation
    - Grayscale logos with hover color

11. **FAQs Section**
    - Accordion-style questions
    - Expandable answers
    - CTA button at bottom

12. **Final CTA Section**
    - Repeating headline with cosmic glow
    - Two CTA buttons
    - Background: Large purple nebula glow effect

13. **Footer**
    - Logo and tagline
    - Navigation links
    - Social media icons
    - Legal links (Terms, Privacy)
    - Copyright notice
    - "Talk to AI" floating button (bottom left)
</high_level_design>

<theme>
dark
</theme>

<sections>
<clone_section>
    <file_path>src/components/sections/navigation-header.tsx</file_path>
    <design_instructions>
Create a fixed navigation header with cosmic white-gray theme featuring the "Cosmos" brand logo on the left, "Book Discovery Call" button in center with glowing white-violet outline and hover effect, and hamburger menu icon on the right. Background should be translucent dark with glassmorphism effect. Header should include floating pill badges showing "AI Voice 24/7 agents", "MVP/SaaS weeks not quarters", "Production ready systems", and "ROI-focused custom quotes" positioned around the main navigation area. Use Inter or Poppins font family, with white text on dark cosmic background (#0A0A0F to #1C1C2E gradient). Include subtle white lightning glow effects on interactive elements.
    </design_instructions>
    <assets>["https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/icons/61e9828a-6914-4cd9-8558-b241067a8e1d-1.png?"]</assets>
  </clone_section>

  <clone_section>
    <file_path>src/components/sections/hero-section.tsx</file_path>
    <design_instructions>
Create a dramatic hero section with cosmic theme featuring large heading "Build Smarter. Sell Faster. Sleep Cosmic." in Playfair Display or Spectral font (72px on desktop, 56px tablet, 40px mobile) with white-violet gradient text effect. Include animated white-violet lightning bolt streaking across a space-like gray background with cosmic swirl effects and 3D parallax space clouds. Subtext should read "AI systems that handle the grind 24/7 — crafted in the Cosmos by founder" in softer gray (#B3B3B3). Add two CTAs: primary "Book Discovery Call" button with glowing white neon effect and secondary "Talk to AI" button with transparent background and white border. Background should feature cosmic white-gray gradients (#EAEAEA, #C0C0C0, #FAFAFA) with space-gray shadows (#1C1C1C). Include floating particle drift animation and slow-moving nebula effects for cosmic atmosphere.
    </design_instructions>
    <assets>[]</assets>
  </clone_section>

  <clone_section>
    <file_path>src/components/sections/why-choose-section.tsx</file_path>
    <design_instructions>
Create a "Why Choose Cosmos" section with heading using purple gradient accent on "Cosmos". Display four feature cards in grid layout: "24/7 Always Available" with circular icon, "Enterprise Security" with shield icon featuring SOC2-ready processes text, "Lightning Fast" with bolt icon showing build speed comparison "Weeks, not quarters", and "AI Voice Intelligence" with conversational demo mockup showing incoming call and AI response bubbles. Cards should have cosmic borders with animated hover glow effects, white text on dark cosmic background. Include glassmorphism card effects with backdrop blur. Use white-gray cosmic gradients for background with subtle space texture overlay.
    </design_instructions>
    <assets>[]</assets>
  </clone_section>

  <clone_section>
    <file_path>src/components/sections/core-services-section.tsx</file_path>
    <design_instructions>
Create "Our Core Services" section with subheading "Two pillars. One goal: revenue momentum." Display tab interface with "AI Voice Agents" and "MVP & Micro-SaaS" tabs with rocket icon. Active tab should have glowing purple-white effect. For AI Voice Agents tab, show detailed list with purple icon bullets: inbound features, outbound capabilities, follow-ups, CRM integration, human-grade interactions, and go-live speed. Include floating performance dashboard mockup showing "25% AI Voice Performance" gauge with cosmic glow effect, and icons for Voice AI, CRM Sync, Analytics, Webhooks, Calendar, and Flows. Cards should fade in with lightning strikes and cosmic dust animation. Background features starfield with floating cosmic particles.
    </design_instructions>
    <assets>[]</assets>
  </clone_section>

  <clone_section>
    <file_path>src/components/sections/methodology-section.tsx</file_path>
    <design_instructions>
Create "How We Work" section with badge labeled "OUR METHODOLOGY" and heading with purple "Work" accent. Subtext: "We operate like a product team: ship fast, measure honestly, iterate to traction." Display four numbered cards (01-04) with gradient purple-pink backgrounds and glowing rounded square icons: "Discover" (target icon), "Design" (star icon), "Build" (code brackets icon), and "Deploy & Learn" (rocket icon). Each card should have cosmic border glow on hover with electric arc effects. Include detailed descriptions for each phase. Add two CTA buttons below: "Book Your Discovery Call" and "$250 Deep-Dive with Shreyas" with white-violet glowing outlines. Cards should have subtle parallax movement and space-gray gradients.
    </design_instructions>
    <assets>[]</assets>
  </clone_section>

  <clone_section>
    <file_path>src/components/sections/interactive-experience-section.tsx</file_path>
    <design_instructions>
Create "Interactive AI Experience" section featuring large 3D rendered black robot/astronaut figure on right side against cosmic purple-blue gradient background. Left side contains heading "Interactive AI Experience" in large serif font with description text: "Experience the future of AI-powered automation. Our voice agents and MVP solutions create immersive experiences that capture attention and drive conversions." Include glowing "Explore Our Solutions" button with purple gradient and white lightning effects. Section should have dramatic lighting with purple-pink glow emanating from center, creating peaceful yet powerful cosmic AI storm atmosphere. Background transitions from dark navy to deep purple with subtle nebula effects.
    </design_instructions>
    <assets>[]</assets>
  </clone_section>

  <clone_section>
    <file_path>src/components/sections/voice-demos-section.tsx</file_path>
    <design_instructions>
Create "Listen to our AI voice in action" section with badge "VOICE DEMONSTRATIONS" and subheading "Real scenarios. Human-grade conversations." Display four demo cards in 2x2 grid: "Customer Support Inquiry" (Hindi/English handling), "Appointment Reminder Call" (confirmation/rescheduling), "Lead Qualification" (inquiry to meeting booking), and "Follow-up Call" (engagement sequence). Each card shows scenario description, outcome, and "Play Demo" button with play icon. Include actual HTML5 audio player controls below each card with cosmic-styled progress bars and controls. Add note "Actual AI voice recordings from live deployments" and "Get This For Your Business" CTA. Cards have glassmorphism effects with purple-white glowing borders on hover. Background features floating cosmic dust particles.
    </design_instructions>
    <assets>[]</assets>
  </clone_section>

  <clone_section>
    <file_path>src/components/sections/testimonials-section.tsx</file_path>
    <design_instructions>
Create "What Our Clients Say" section with badge "CLIENT TESTIMONIALS" and heading with purple "Clients Say" gradient accent. Subtext: "Don't take our word for it—hear from founders and teams who've transformed their businesses with Cosmos." Display infinite horizontal scrolling carousel (duplicated for seamless loop) with 12 testimonial cards featuring client quotes, avatar images, names, and titles. Cards should have dark cosmic background with subtle glow borders and glassmorphism effects. Include diverse testimonials about voice agents, MVP builds, ROI, and integration quality. Avatar images should be circular with white-violet glow rings. Implement smooth auto-scroll animation with pause on hover. Background uses space-gray gradients with floating particle effects.
    </design_instructions>
    <assets>["https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/images/photo-1507003211169-0a1dd7228f2d-1.webp?", "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/images/photo-1472099645785-5658abf4ff4e-2.webp?", "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/images/photo-1494790108755-2616b612b786?", "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/images/photo-1519085360753-af0119f7cbe7-4.webp?", "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/images/photo-1438761681033-6461ffad8d80-5.webp?", "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/images/photo-1500648767791-00dcc994a43e-6.webp?", "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/images/photo-1544005313-94ddf0286df2-7.webp?", "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/images/photo-1507591064344-4c6ce005b128-8.webp?", "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/images/photo-1487412720507-e7ab37603c6f-9.webp?"]</assets>
  </clone_section>

  <clone_section>
    <file_path>src/components/sections/cta-booking-section.tsx</file_path>
    <design_instructions>
Create "Ready to Start" section with dramatic heading "Ready to turn 'we should automate this' into 'it's already handled'?" featuring purple gradient on quoted text. Subtext: "Book a 30-minute discovery call or start with a $250 Deep-Dive with founder" followed by italic "Worst case: clarity. Best case: compound advantage." Display two-column layout: left side lists "What to Expect in Your Call" with checkmark icons for 5 items (understand challenges, identify automation, discuss MVP strategies, outline solutions, define success metrics). Right side shows "Discovery Call" card with calendar icon, "30 minutes • Free consultation", "Book Discovery Call" button, and alternate option for "$250 Deep-Dive with founder" Include "Direct Contact" section with phone number and WhatsApp link. Background features intense purple-pink glow with horizontal white lightning streak across center, creating dramatic cosmic energy effect.
    </design_instructions>
    <assets>[]</assets>
  </clone_section>

  <clone_section>
    <file_path>src/components/sections/clients-showcase-section.tsx</file_path>
    <design_instructions>
Create "Who We've Worked With" section with badge "TRUSTED BY" and heading with purple "Worked With" gradient accent. Subtext: "Founders and teams who chose automation over hiring". Display infinite horizontal scrolling logo carousel (triplicated for seamless loop) showcasing 8 client company logos in cosmic-bordered containers with hover glow effects. Logos should be grayscale/white on dark backgrounds with subtle purple glow on hover. Include note below: "From startups to enterprises, we've helped teams automate their way to growth". Implement smooth auto-scroll animation with logos appearing to orbit like satellites. Background uses starfield effect with floating cosmic particles and space-gray gradients.
    </design_instructions>
    <assets>["https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/icons/Algo-Vision-Logo-1-2.png?", "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/icons/download-7-3.png?", "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/icons/logo-ce6bde16-0254-4627-980d-0d0cea0103d9-4.jpg?", "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/icons/Logo-2-5.png?", "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/icons/logo-black-6.png?", "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/images/Moko-White-transparent-background-10.webp?", "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/icons/Varhity-Ventures-100-copy-Transparent-2-7.png?", "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/icons/Whats-App-Image-2025-08-26-at-06-36-04-8.jpg?"]</assets>
  </clone_section>

  <clone_section>
    <file_path>src/components/sections/faq-section.tsx</file_path>
    <design_instructions>
Create FAQ section with heading "FAQs (straight talk)" in large serif font. Display collapsible accordion with 6 questions in cosmic-styled containers: "Is this custom?", "Voice agent or human?", "How fast can we go live?", "Security & data?", "Do you disclose pricing?", "What tech stacks do you support?". Each item has dark background with purple-white border, chevron down icon, and expands to show answer with smooth animation. Include "Book Your Discovery Call" CTA button below accordion with glowing purple outline. Background features subtle cosmic gradient with space-gray tones and floating particle effects. Accordion items should have electric glow effect on hover and active states.
    </design_instructions>
    <assets>[]</assets>
  </clone_section>

  <clone_section>
    <file_path>src/components/sections/final-cta-section.tsx</file_path>
    <design_instructions>
Create dramatic final CTA section with massive heading "Ready to turn 'we should automate this' into 'it's already handled'?" using gradient purple text on quoted phrases. Background features intense purple-pink-blue cosmic glow with horizontal white lightning bolt streak across center creating dramatic energy burst effect. Include subtext "Worst case: clarity. Best case: compound advantage." in italic purple-gray text. Display two prominent CTA buttons: "Book Your Discovery Call" and "$250 Deep-Dive with founder" both with glowing white-violet outlines and hover scale effects. Section should have peaceful yet powerful cosmic storm atmosphere with slow-moving nebula effects and particle drift animation. Use dramatic lighting gradients transitioning from deep space navy to vibrant purple-pink center glow.
    </design_instructions>
    <assets>[]</assets>
  </clone_section>

  <clone_section>
    <file_path>src/components/sections/footer-section.tsx</file_path>
    <design_instructions>
Create footer section with three-column layout: left column shows "Cosmos" logo/brand with tagline "AI-powered solutions that accelerate growth" and quote "We build what moves numbers" in purple italic text. Center column contains navigation links (Services, Case Studies, Content, Pricing, Team, Socials) in white text. Right column displays two CTA buttons: "$250 Deep-Dive" and "Book Discovery Call" with cosmic glow effects. Below add secondary links row: Terms of Service, Privacy Policy, phone number, WhatsApp link. Bottom shows copyright "© 2025 Cosmos. All rights reserved." with small logo icon. Footer has dark cosmic background (#0A0A0F) with subtle space texture. Include floating "Talk to AI" button in bottom-left corner with microphone icon and purple glow effect. All links should have white-violet hover glow transitions.
    </design_instructions>
    <assets>["https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2af0cc8e-7a2f-4977-b4ec-3e381ecb54f8-rapidxai-com/assets/icons/61e9828a-6914-4cd9-8558-b241067a8e1d-1.png?"]</assets>
  </clone_section>
</sections>