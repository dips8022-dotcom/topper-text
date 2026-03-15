# Project Blueprint: Topper Text Image Generator

## 1. Overview

This project is a web-based tool that allows users to create beautiful, "topper-style" text images. Users can input their desired text, customize fonts, colors, and decorations, see a live preview, and download the final image as a PNG file. The goal is to create an experience that is intuitive, visually appealing, and produces high-quality results suitable for sharing on social media and messaging apps.

## 2. Core Features & Design

### **User Interface (UI):**
- **Two-Column Layout:** The application is now structured in a two-column layout for a more efficient workflow. The left column contains all user controls, while the right column is dedicated to a large, real-time preview.
- **Controls Panel:** The left panel neatly organizes all customization options, including the text input, font styling, color selection, and decoration controls.
- **Live Preview Panel:** The right panel displays the generated text image, which updates instantly as the user makes changes.
- **Responsive Design:** The layout is fully responsive. On smaller screens, the layout switches to a single-column view, with the controls stacked on top of the preview area.

### **Styling & Aesthetics:**
- **Typography:** Users can choose from a curated list of Korean fonts, including "Ui-yeon-chae," "Nanum Myeongjo," "Nanum Gothic," "Do Hyeon," "Gaegu," and "Dokdo." They can also adjust font weight, letter spacing, and line height.
- **Color Palette:** Users can select a solid color, a two-color gradient, or pre-defined "gold" and "silver" metallic gradients.
- **Decorations:** Users can add a variety of SVG decorations to the top and bottom of the text. The available options include:
    - **Flowers:** Cherry Blossom, Rose, Sunflower, Lavender, Daisy
    - **New SVG Decorations:** Laurel Branches, Scattered Hearts, Sparkles
- **Animations:** The new SVG decorations feature subtle animations (sway, float, pulse, twinkle) to add a dynamic and engaging element to the preview.
- **Background:** A subtle noise texture is applied to the background to give the application a premium, tactile feel.

### **Functionality:**
- **Live Preview:** The preview area updates instantly as the user modifies the text or any of the styling options.
- **Dynamic Controls:** The UI dynamically shows or hides relevant controls based on the user's selections.
- **Image Generation:** The `html2canvas` library captures the styled text and decorations from the preview area and converts it into a high-quality PNG image.
- **Image Download:** A JavaScript function triggers the download of the generated PNG, naming it `custom-topper-design.png`.

## 3. Technical Implementation

- **`index.html`**: Defines the application's structure, now using a two-column `app-container` with a `controls-panel` and a `preview-panel`.
- **`style.css`**: Contains all styling rules, including the new `grid` layout for the two-column structure and responsive adjustments for mobile devices.
- **`main.js`**: Houses the application logic. It handles all user interactions, updates the live preview, manages the application of styles and decorations, and implements the `html2canvas` functionality.

## 4. Current Plan & Recent Changes

### **Status: Completed**

1.  **Layout Redesign:** Restructured the application into a two-column layout to provide a persistent, visible preview. The `index.html` was updated with `controls-panel` and `preview-panel` containers, and the `style.css` was updated to use a CSS Grid layout.
2.  **Remove "Twigs + Leaves" Decoration:** Removed the "Twigs + Leaves" option from the `index.html` dropdowns and the corresponding data from `main.js`.
3.  **Integrate New SVG Decorations:** Added decoration options: "Laurel Branches," "Scattered Hearts," and "Sparkles."
4.  **Update `style.css`:** Added keyframe animations for the new decorations.