// WebGL Manager - Blank Slate
class WebGLManager {
    constructor() {
        this.initialized = false;
        this.canvas = null;
        this.ctx = null;
        console.log('WebGL Manager initialized - ready to build step by step');
    }
    
    onActivate() {
        // Called when WebGL tab becomes active
        if (!this.initialized) {
            this.initialize();
            this.initialized = true;
        }
        this.drawComingSoon();
        console.log('WebGL tab activated');
    }
    
    initialize() {
        // Get canvas and context
        this.canvas = document.getElementById('webglCanvas');
        if (this.canvas) {
            this.ctx = this.canvas.getContext('2d');
        }
        console.log('WebGL initialization - ready for step-by-step build');
    }
    
    drawComingSoon() {
        if (!this.ctx || !this.canvas) return;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Set background
        this.ctx.fillStyle = '#f8f9fa';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw "Coming Soon" text
        this.ctx.fillStyle = '#333333';
        this.ctx.font = 'bold 48px Arial, sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        this.ctx.fillText('Coming Soon', centerX, centerY);
        
        // Draw subtitle
        this.ctx.fillStyle = '#666666';
        this.ctx.font = '20px Arial, sans-serif';
        this.ctx.fillText('WebGL features will be added step by step', centerX, centerY + 60);
    }
}

// Initialize WebGL manager when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    const webglManager = new WebGLManager();
    window.tabManager.registerTab('webgl', webglManager);
}); 