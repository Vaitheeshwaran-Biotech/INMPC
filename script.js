console.log("✅ script.js is running");
let canvas, ctx, uploadedImage;

document.addEventListener('DOMContentLoaded', function () {+   console.log('handleImageFile called for:', file);
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    const uploadArea = document.getElementById('uploadArea');
    const imageInput = document.getElementById('imageInput');

    // Click to upload
    uploadArea.addEventListener('click', () => {
        imageInput.click();
    });

    // File input change
    imageInput.addEventListener('change', handleImageUpload);

    // Drag and drop
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

    // Controls
    document.getElementById('textInput').addEventListener('input', updateCanvas);
    document.getElementById('fontFamily').addEventListener('change', updateCanvas);
    document.getElementById('fontSize').addEventListener('input', function () {
        document.getElementById('fontSizeValue').textContent = this.value;
        updateCanvas();
    });
    document.getElementById('textColor').addEventListener('change', updateCanvas);
    document.getElementById('textPosition').addEventListener('change', updateCanvas);
    document.getElementById('textShadow').addEventListener('input', function () {
        document.getElementById('textShadowValue').textContent = this.value;
        updateCanvas();
    });
});

function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) handleImageFile(file);
}

function handleImageFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            uploadedImage = img;
            setupCanvas();
            updateCanvas();

            // Show canvas
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
let canvas, ctx, uploadedImage;

document.addEventListener('DOMContentLoaded', function () {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    const uploadArea = document.getElementById('uploadArea');
    const imageInput = document.getElementById('imageInput');

    // Click to upload
    uploadArea.addEventListener('click', () => {
        imageInput.click();
    });

    // File input change
    imageInput.addEventListener('change', handleImageUpload);

    // Drag and drop
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

    // Controls
    document.getElementById('textInput').addEventListener('input', updateCanvas);
    document.getElementById('fontFamily').addEventListener('change', updateCanvas);
    document.getElementById('fontSize').addEventListener('input', function () {
        document.getElementById('fontSizeValue').textContent = this.value;
        updateCanvas();
    });
    document.getElementById('textColor').addEventListener('change', updateCanvas);
    document.getElementById('textPosition').addEventListener('change', updateCanvas);
    document.getElementById('textShadow').addEventListener('input', function () {
        document.getElementById('textShadowValue').textContent = this.value;
        updateCanvas();
    });
});

function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) handleImageFile(file);
}

function handleImageFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            uploadedImage = img;
            setupCanvas();
            updateCanvas();

            // Show canvas
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

    const ratio = Math.min(maxWidth / width, maxHeight / height, 1);
    canvas.width = width * ratio;
    canvas.height = height * ratio;
}

function updateCanvas() {
    if (!uploadedImage) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);

    const text = document.getElementById('textInput').value;
    if (!text) return;

    const fontFamily = document.getElementById('fontFamily').value;
    const fontSize = parseInt(document.getElementById('fontSize').value);
    const textColor = document.getElementById('textColor').value;
    const textPosition = document.getElementById('textPosition').value;
    const shadowBlur = parseInt(document.getElementById('textShadow').value);

    ctx.font = `bold ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = shadowBlur;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    const x = canvas.width / 2;
    let y;
    switch (textPosition) {
        case 'top': y = fontSize; break;
        case 'bottom': y = canvas.height - fontSize; break;
        default: y = canvas.height / 2;
    }

    const words = text.split(' ');
    const maxWidth = canvas.width - 40;
    const lines = [];
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

    const lineHeight = fontSize * 1.2;
    const totalHeight = lines.length * lineHeight;
    let startY = y - totalHeight / 2 + lineHeight / 2;

    lines.forEach((line, index) => {
        ctx.fillText(line, x, startY + index * lineHeight);
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
}￼Enter    const maxWidth = 800;
    const maxHeight = 600;
    let { width, height } = uploadedImage;

    const ratio = Math.min(maxWidth / width, maxHeight / height, 1);
    canvas.width = width * ratio;
    canvas.height = height * ratio;
}

function updateCanvas() {
    if (!uploadedImage) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);

    const text = document.getElementById('textInput').value;
    if (!text) return;

    const fontFamily = document.getElementById('fontFamily').value;
    const fontSize = parseInt(document.getElementById('fontSize').value);
    const textColor = document.getElementById('textColor').value;
    const textPosition = document.getElementById('textPosition').value;
    const shadowBlur = parseInt(document.getElementById('textShadow').value);

    ctx.font = `bold ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = textColor;
x.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = shadowBlur;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    const x = canvas.width / 2;
    let y;
    switch (textPosition) {
        case 'top': y = fontSize; break;
        case 'bottom': y = canvas.height - fontSize; break;
        default: y = canvas.height / 2;
    }

    const words = text.split(' ');
    const maxWidth = canvas.width - 40;
    const lines = [];
    let currentLine = '';

    for (let word of words) {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
