# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a web-based dynamic CSS grid layout tool with advanced image processing capabilities. The application features a tabbed interface with two main sections: Image Inputs (fully implemented) and WebGL (placeholder for future development).

## Key Architecture

### Core System Components

**Tab System (`TabManager` class)**
- Manages switching between Image Inputs and WebGL tabs
- Registers and coordinates tab-specific instances
- Located in `common.js`

**Base Grid Infrastructure (`BaseGridManager` class)**
- Provides foundation for grid manipulation, splitter dragging, and animation
- Handles column/row resizing with constraints (minimum 100px cells)
- Supports two animation types: 'noise' (continuous waves) and 'pulse' (discrete transitions)
- Animation can be applied to X, Y, or both axes
- Located in `common.js`

**Image Processing System (`ImageGridManager` class)**
- Extends BaseGridManager with advanced image handling
- Supports single images and image sequence detection/playback
- Multiple fit modes: stretch, fit, fill, corner stretch, single stretch
- Heavy processing modes use caching and debouncing for performance
- Video recording with high-quality MP4/WebM export
- Located in `image-inputs.js`

### Image Processing Modes

**Simple Modes (real-time)**
- `fill`: Stretch to fill each cell
- `contain`: Fit within cell keeping proportions  
- `cover`: Fill cell completely

**Heavy Processing Modes (cached/debounced)**
- `debug-corners`: Nine-slice corner stretching with edge repeats
- `background`: Slice single image across entire grid


### Animation System

**Noise Animation**: Continuous sine wave-based cell size variations
**Pulse Animation**: Discrete transitions between random target sizes with hold periods
- Configurable frequency (transition speed) and amplitude (movement amount)
- Hold time controls pause duration between pulse transitions

### Image Sequence Features

- Auto-detects numbered sequences (e.g., name_001.jpg, 0001.jpg)
- Preloads all frames for smooth 30 FPS playback
- Restricts heavy processing modes during sequence playback for performance
- Maintains separate caches for sequences vs single images

## Development Commands

Since this is a pure client-side web application with no build system:

**Local Development**
- Open `index.html` directly in a browser, or
- Use any local HTTP server: `python -m http.server 8000` or `npx serve .`

**File Structure**
- `index.html` - Main application structure and UI
- `common.js` - Base classes and tab system
- `image-inputs.js` - Main image processing functionality
- `webgl.js` - Placeholder for future WebGL features
- `common.css`, `image-inputs.css`, `webgl.css` - Modular styling

## Key Implementation Details

**Grid Cell Management**
- Cells are numbered 1-N and mapped to row/column positions
- Grid structure is dynamically generated when columns/rows are added/removed
- Splitters are positioned based on fractional sizes calculated from cell ratios

**Performance Optimization**
- Image processing results cached by mode + grid dimensions + container size
- Sequence processing pre-generates all frames for heavy modes
- Debounced processing prevents UI flickering during rapid changes
- 60 FPS video recording with 2x resolution scaling for quality

**Memory Management**
- Caches cleared when grid structure changes or new images loaded
- Processed sequences stored separately from single image cache
- Automatic cleanup of DOM elements during mode transitions

**Browser Compatibility**
- Graceful codec fallback from H.264 MP4 to WebM for video recording
- Uses MediaRecorder API with compatibility detection
- Canvas-based grid capture for cross-browser video export

## Future Development Notes

The WebGL tab (`webgl.js`) is intentionally minimal and ready for step-by-step implementation of 3D features. The architecture supports easy extension through the existing tab system.