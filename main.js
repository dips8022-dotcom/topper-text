document.addEventListener('DOMContentLoaded', () => {
    // --- Element References ---
    const textInput = document.getElementById('text-input');
    const fontSelector = document.getElementById('font-selector');
    const fontWeightSlider = document.getElementById('font-weight-slider');
    const letterSpacingSlider = document.getElementById('letter-spacing-slider');
    const lineHeightSlider = document.getElementById('line-height-slider');
    const preview = document.getElementById('preview');
    const generateBtn = document.getElementById('generate-btn');
    const resultContainer = document.getElementById('result-container');

    // Color Controls
    const colorTypeSelector = document.getElementById('color-type-selector');
    const solidColorWrapper = document.getElementById('solid-color-wrapper');
    const solidColorPicker = document.getElementById('solid-color-picker');
    const gradientColorWrapper = document.getElementById('gradient-color-wrapper');
    const gradientColorStart = document.getElementById('gradient-color-start');
    const gradientColorEnd = document.getElementById('gradient-color-end');

    const fontMap = {
        'nanum-myeongjo': "'Nanum Myeongjo', serif",
        'nanum-gothic': "'Nanum Gothic', sans-serif",
    };

    function updatePreview() {
        const text = textInput.value;
        const previewText = text.trim() === '' ? '&nbsp;' : text.replace(/\n/g, '<br>');

        let textElement = preview.querySelector('#preview-text');
        if (!textElement) {
            textElement = document.createElement('div');
            textElement.id = 'preview-text';
            preview.innerHTML = ''; 
            preview.appendChild(textElement);
        }

        textElement.innerHTML = previewText;

        const selectedFont = fontSelector.value;
        const fontWeight = fontWeightSlider.value;
        const letterSpacing = letterSpacingSlider.value;
        const lineHeight = lineHeightSlider.value;
        const colorType = colorTypeSelector.value;
        
        Object.assign(textElement.style, {
            fontFamily: fontMap[selectedFont],
            fontWeight: fontWeight,
            letterSpacing: `${letterSpacing}px`,
            lineHeight: lineHeight,
            textAlign: 'center',
            fontSize: '48px',
            width: '100%',
            padding: '10px',
            boxSizing: 'border-box'
        });

        textElement.style.color = '';
        textElement.style.backgroundImage = '';
        textElement.style.webkitBackgroundClip = '';
        textElement.style.backgroundClip = '';

        switch (colorType) {
            case 'solid':
                textElement.style.color = solidColorPicker.value;
                break;
            case 'gold':
            case 'silver':
            case 'gradient':
                let gradientImage;
                if (colorType === 'gold') {
                    gradientImage = 'linear-gradient(135deg, #ffd700, #f0c784, #ffd700)';
                } else if (colorType === 'silver') {
                    gradientImage = 'linear-gradient(135deg, #c0c0c0, #e6e6e6, #c0c0c0)';
                } else { 
                    gradientImage = `linear-gradient(135deg, ${gradientColorStart.value}, ${gradientColorEnd.value})`;
                }
                textElement.style.color = 'transparent';
                textElement.style.backgroundImage = gradientImage;
                textElement.style.webkitBackgroundClip = 'text';
                textElement.style.backgroundClip = 'text';
                break;
        }

        document.getElementById('font-weight-value').textContent = fontWeight;
        document.getElementById('letter-spacing-value').textContent = letterSpacing + 'px';
        document.getElementById('line-height-value').textContent = lineHeight;
    }

    function updateColorUI() {
        const selectedType = colorTypeSelector.value;
        solidColorWrapper.classList.toggle('hidden', selectedType !== 'solid');
        gradientColorWrapper.classList.toggle('hidden', selectedType !== 'gradient');
        updatePreview();
    }

    const allControls = [ textInput, fontSelector, fontWeightSlider, letterSpacingSlider, lineHeightSlider, colorTypeSelector, solidColorPicker, gradientColorStart, gradientColorEnd ];
    allControls.forEach(control => control.addEventListener('input', updatePreview));
    colorTypeSelector.addEventListener('change', updateColorUI);

    generateBtn.addEventListener('click', async () => {
        const originalElement = preview.querySelector('#preview-text');
        if (!originalElement || !textInput.value.trim()) {
            alert("이미지를 생성하려면 먼저 텍스트를 입력해주세요.");
            return;
        }

        generateBtn.disabled = true;
        generateBtn.textContent = '생성 중...';
        resultContainer.innerHTML = '';

        try {
            await document.fonts.ready;
            
            const colorType = colorTypeSelector.value;
            let finalCanvas;

            if (colorType === 'solid') {
                // --- METHOD 1: Simple capture for solid colors (works reliably) ---
                finalCanvas = await html2canvas(originalElement, {
                    backgroundColor: null, scale: 3, useCORS: true
                });
            } else {
                // --- METHOD 2: Advanced Canvas Compositing for Gradients (THE ULTIMATE FIX) ---
                
                // 1. Create the text shape mask (black text on transparent background)
                const originalStyles = {
                    color: originalElement.style.color,
                    backgroundImage: originalElement.style.backgroundImage,
                    webkitBackgroundClip: originalElement.style.webkitBackgroundClip,
                    backgroundClip: originalElement.style.backgroundClip
                };

                originalElement.style.color = 'black';
                originalElement.style.backgroundImage = '';
                originalElement.style.webkitBackgroundClip = '';
                originalElement.style.backgroundClip = '';

                const maskCanvas = await html2canvas(originalElement, {
                    backgroundColor: null, scale: 3, useCORS: true
                });

                // Immediately restore the original element's appearance
                Object.assign(originalElement.style, originalStyles);

                // 2. Create a new canvas and fill it with the desired gradient
                const w = maskCanvas.width;
                const h = maskCanvas.height;
                finalCanvas = document.createElement('canvas');
                finalCanvas.width = w;
                finalCanvas.height = h;
                const ctx = finalCanvas.getContext('2d');

                let gradient;
                // Create a gradient with the same 135deg angle as the CSS
                const x1 = w * Math.cos(135 * Math.PI / 180);
                const y1 = h * Math.sin(135 * Math.PI / 180);
                gradient = ctx.createLinearGradient(w, 0, 0, h);

                if (colorType === 'gold') {
                    gradient.addColorStop(0, '#ffd700');
                    gradient.addColorStop(0.5, '#f0c784');
                    gradient.addColorStop(1, '#ffd700');
                } else if (colorType === 'silver') {
                    gradient.addColorStop(0, '#c0c0c0');
                    gradient.addColorStop(0.5, '#e6e6e6');
                    gradient.addColorStop(1, '#c0c0c0');
                } else {
                    gradient.addColorStop(0, gradientColorStart.value);
                    gradient.addColorStop(1, gradientColorEnd.value);
                }

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, w, h);

                // 3. Use the mask to punch out the gradient shape
                // 'destination-in' keeps the destination (gradient) only where the source (mask) is drawn
                ctx.globalCompositeOperation = 'destination-in';
                ctx.drawImage(maskCanvas, 0, 0);
            }

            // --- Display results (works for both methods) ---
            const img = document.createElement('img');
            img.src = finalCanvas.toDataURL('image/png');
            img.style.cssText = 'max-width: 100%; border: 1px solid #dfe6e9; border-radius: 8px; margin-top: 20px;';

            const title = document.createElement('h3');
            title.textContent = '생성된 이미지';
            
            const downloadBtn = document.createElement('a');
            downloadBtn.href = finalCanvas.toDataURL('image/png');
            downloadBtn.download = 'topper-text.png';
            downloadBtn.textContent = '이미지 다운로드';
            downloadBtn.className = 'download-btn';

            resultContainer.appendChild(title);
            resultContainer.appendChild(img);
            resultContainer.appendChild(downloadBtn);

        } catch (err) {
            console.error('Image generation failed with final method:', err);
            resultContainer.innerHTML = `<p style="color: red;">오류: 이미지 생성에 최종 실패했습니다.</p>`;
        } finally {
            generateBtn.disabled = false;
            generateBtn.textContent = '이미지 생성';
        }
    });

    updateColorUI();
});
