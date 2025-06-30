let canvas, ctx, uploadedImage;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    
    // Set up event listeners
    document.getElementById('uploadArea').addEventListener('click', () => {
        document.getElementById('imageInput').click();
    });
    
    document.getElementById('imageInput').addEventListener('change', handleImageUpload);
    
    // Drag and drop
    const uploadArea = document.getElementById('uploadArea');
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#667eea';
    });
    
    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#ddd';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#ddd';
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleImageFile(files[0]);
        }
    });

    // Real-time updates
    document.getElementById('textInput').addEventListener('input', updateCanvas);
    document.getElementById('fontFamily').addEventListener('change', updateCanvas);
    document.getElementById('fontSize').addEventListener('input', function() {
        document.getElementById('fontSizeValue').textContent = this.value;
        updateCanvas();
    });
    document.getElementById('textColor').addEventListener('change', updateCanvas);
    document.getElementById('textPosition').addEventListener('change', updateCanvas);
    document.getElementById('textShadow').addEventListener('input', function() {
        document.getElementById('textShadowValue').textContent = this.value;
        updateCanvas();
    });
});

function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
        handleImageFile(file);
    }
}

function handleImageFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            uploadedImage = img;
            setupCanvas();
            updateCanvas();
            
            // Hide upload text, show canvas
            document.getElementById('uploadText').classList.add('hidden');
            document.getElementById('canvas').classList.remove('hidden');
            document.getElementById('uploadArea').classList.add('has-image');
            document.getElementById('downloadBtn').disabled = false;
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function setupCanvas() {
    const maxWidth = 800;
    const maxHeight = 600;
    
    let { width, height } = uploadedImage;
    
    // Scale down if too large
    if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
    }
    
    canvas.width = width;
    canvas.height = height;
}

function updateCanvas() {
    if (!uploadedImage) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw image
    ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
    
let canvas, ctx, uploadedImage;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    
    // Set up event listeners
    document.getElementById('uploadArea').addEventListener('click', () => {
        document.getElementById('imageInput').click();
    });
    
    document.getElementById('imageInput').addEventListener('change', handleImageUpload);
    
    // Drag and drop
    const uploadArea = document.getElementById('uploadArea');
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#667eea';
    });
    
    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#ddd';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#ddd';
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleImageFile(files[0]);
        }
    });

    // Real-time updates
    document.getElementById('textInput').addEventListener('input', updateCanvas);
    document.getElementById('fontFamily').addEventListener('change', updateCanvas);
    document.getElementById('fontSize').addEventListener('input', function() {
        document.getElementById('fontSizeValue').textContent = this.value;
        updateCanvas();
    });
    document.getElementById('textColor').addEventListener('change', updateCanvas);
    document.getElementById('textPosition').addEventListener('change', updateCanvas);
    document.getElementById('textShadow').addEventListener('input', function() {
        document.getElementById('textShadowValue').textContent = this.value;
        updateCanvas();
    });
});

function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
        handleImageFile(file);
    }
}

function handleImageFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            uploadedImage = img;
            setupCanvas();
            updateCanvas();
            
            // Hide upload text, show canvas
            document.getElementById('uploadText').classList.add('hidden');
            document.getElementById('canvas').classList.remove('hidden');
            document.getElementById('uploadArea').classList.add('has-image');
            document.getElementById('downloadBtn').disabled = false;
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function setupCanvas() {
    const maxWidth = 800;
    const maxHeight = 600;
    
    let { width, height } = uploadedImage;
    
    // Scale down if too large
    if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
    }
    
    canvas.width = width;
    canvas.height = height;
}

function updateCanvas() {
    if (!uploadedImage) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw image
    ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
    
    // Get text settings
    const text = document.getElementById('textInput').value;
    if (!text) return;
    
    const fontFamily = document.getElementById('fontFamily').value;
    const fontSize = document.getElementById('fontSize').value;
    const textColor = document.getElementById('textColor').value;
    const textPosition = document.getElementById('textPosition').value;
    const shadowBlur = document.getElementById('textShadow').value;
    
    // Set text styles
    ctx.font = `bold ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Add shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = parseInt(shadowBlur);
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    // Calculate text position
    let x = canvas.width / 2;
    let y;
    
    switch(textPosition) {
        case 'top':
            y = fontSize;
            break;
        case 'bottom':
            y = canvas.height - fontSize;
            break;
        default: // center
            y = canvas.height / 2;
    }
    
    // Handle long text by wrapping
    const words = text.split(' ');
    const maxWidth = canvas.width - 40; // padding
    let lines = [];
    let currentLine = '';
    
    for (let word of words) {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    }
    if (currentLine) lines.push(currentLine);
    
    // Draw each line
    const lineHeight = fontSize * 1.2;
    const totalHeight = lines.length * lineHeight;
    let startY = y - (totalHeight / 2) + (lineHeight / 2);
    
    lines.forEach((line, index) => {
        ctx.fillText(line, x, startY + (index * lineHeight));
    });
}

function setQuote(quote) {
    document.getElementById('textInput').value = quote;
    updateCanvas();
}

function downloadPoster() {
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = 'motivational-poster.png';
    link.href = canvas.toDataURL();
    link.click();
}￼Enter    // Get text settings
    const text = document.getElementById('textInput').value;
    if (!text) return;
    
    const fontFamily = document.getElementById('fontFamily').value;
    const fontSize = document.getElementById('fontSize').value;
    const textColor = document.getElementById('textColor').value;
    const textPosition = document.getElementById('textPosition').value;
    const shadowBlur = document.getElementById('textShadow').value;
    
    // Set text styles
    ctx.font = `bold ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Add shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = parseInt(shadowBlur);
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    // Calculate text position
    let x = canvas.width / 2;
    let y;
    
itch(textPosition) {
        case 'top':
            y = fontSize;
            break;
        case 'bottom':
            y = canvas.height - fontSize;
            break;
        default: // center
            y = canvas.height / 2;
    }
    
    // Handle long text by wrapping
    const words = text.split(' ');
    const maxWidth = canvas.width - 40; // padding
    let lines = [];
    let currentLine = '';
    
    for (let word of words) {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
