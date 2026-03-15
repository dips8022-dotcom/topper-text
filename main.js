document.addEventListener('DOMContentLoaded', () => {
    // Get all the interactive elements
    const textInput = document.getElementById('text-input');
    const previewContainer = document.getElementById('preview-container');
    const preview = document.getElementById('preview');
    const downloadBtn = document.getElementById('download-btn');
    
    // Text style controls
    const fontSelector = document.getElementById('font-selector');
    const fontWeightSlider = document.getElementById('font-weight-slider');
    const fontWeightValue = document.getElementById('font-weight-value');
    const letterSpacingSlider = document.getElementById('letter-spacing-slider');
    const letterSpacingValue = document.getElementById('letter-spacing-value');
    const lineHeightSlider = document.getElementById('line-height-slider');
    const lineHeightValue = document.getElementById('line-height-value');

    // Color controls
    const colorTypeSelector = document.getElementById('color-type-selector');
    const solidColorControl = document.getElementById('solid-color-control');
    const solidColorPicker = document.getElementById('solid-color-picker');
    const gradientColorControls = document.getElementById('gradient-color-controls');
    const gradientStartPicker = document.getElementById('gradient-start-picker');
    const gradientEndPicker = document.getElementById('gradient-end-picker');

    // Decoration controls
    const decorationContainer = document.getElementById('decoration-container');
    const topDecorationSelector = document.getElementById('top-decoration-selector');
    const bottomDecorationSelector = document.getElementById('bottom-decoration-selector');
    const topPositionCheckboxes = document.querySelectorAll('#top-deco-positions input[type="checkbox"]');
    const bottomPositionCheckboxes = document.querySelectorAll('#bottom-deco-positions input[type="checkbox"]');

    // --- DATA SETS ---
    const fontMap = {
        'ui-yeon': "'Ownglyph_Ui-yeon-chae_v1.0', sans-serif",
        'nanum-myeongjo': "'Nanum Myeongjo', serif", 'nanum-gothic': "'Nanum Gothic', sans-serif",
        'do-hyeon': "'Do Hyeon', sans-serif", 'gaegu': "'Gaegu', cursive", 'dokdo': "'Dokdo', cursive"
    };
    const variableWeightFonts = ['nanum-myeongjo', 'nanum-gothic', 'gaegu'];
    const decorationSets = {
        'cherry-blossom': [
            '<svg width="60" height="60" viewBox="0 0 60 60"><g transform="translate(30,30)"><ellipse cx="0" cy="-12" rx="7" ry="11" fill="#F9C4D2" transform="rotate(0)"/><ellipse cx="0" cy="-12" rx="7" ry="11" fill="#F9C4D2" transform="rotate(72)"/><ellipse cx="0" cy="-12" rx="7" ry="11" fill="#F9C4D2" transform="rotate(144)"/><ellipse cx="0" cy="-12" rx="7" ry="11" fill="#F9C4D2" transform="rotate(216)"/><ellipse cx="0" cy="-12" rx="7" ry="11" fill="#F9C4D2" transform="rotate(288)"/><circle cx="0" cy="0" r="5" fill="#F4A7B9"/></g></svg>',
            '<svg width="80" height="80" viewBox="0 0 60 60"><g transform="translate(30,30)"><ellipse cx="0" cy="-12" rx="7" ry="11" fill="#F48FAD" transform="rotate(0)"/><ellipse cx="0" cy="-12" rx="7" ry="11" fill="#F48FAD" transform="rotate(72)"/><ellipse cx="0" cy="-12" rx="7" ry="11" fill="#F48FAD" transform="rotate(144)"/><ellipse cx="0" cy="-12" rx="7" ry="11" fill="#F48FAD" transform="rotate(216)"/><ellipse cx="0" cy="-12" rx="7" ry="11" fill="#F48FAD" transform="rotate(288)"/><circle cx="0" cy="0" r="6" fill="#E0607E"/><circle cx="0" cy="-3" r="1.5" fill="#fff" opacity="0.6"/><circle cx="2.5" cy="2" r="1.2" fill="#fff" opacity="0.5"/><circle cx="-2.5" cy="2" r="1.2" fill="#fff" opacity="0.5"/></g></svg>',
            '<svg width="80" height="80" viewBox="0 0 60 60"><g transform="translate(30,30)"><ellipse cx="0" cy="-12" rx="7" ry="11" fill="#ffffff" stroke="#F9C4D2" stroke-width="1" transform="rotate(0)"/><ellipse cx="0" cy="-12" rx="7" ry="11" fill="#ffffff" stroke="#F9C4D2" stroke-width="1" transform="rotate(72)"/><ellipse cx="0" cy="-12" rx="7" ry="11" fill="#ffffff" stroke="#F9C4D2" stroke-width="1" transform="rotate(144)"/><ellipse cx="0" cy="-12" rx="7" ry="11" fill="#ffffff" stroke="#F9C4D2" stroke-width="1" transform="rotate(216)"/><ellipse cx="0" cy="-12" rx="7" ry="11" fill="#ffffff" stroke="#F9C4D2" stroke-width="1" transform="rotate(288)"/><circle cx="0" cy="0" r="5" fill="#F4A7B9"/></g></svg>'
        ],
        'line-rose': [
            '<svg width="180" height="220" viewBox="0 0 180 220"><g><path d="M90 158 Q88 178 85 200" fill="none" stroke="#5A8040" stroke-width="2.2" stroke-linecap="round"/><path d="M88 170 L80 177" fill="none" stroke="#5A8040" stroke-width="1.5" stroke-linecap="round"/><path d="M87 162 C72 156 64 142 74 134" fill="none" stroke="#5A8040" stroke-width="1.4" stroke-linecap="round"/><path d="M89 152 C104 146 112 132 102 126" fill="none" stroke="#4A7030" stroke-width="1.3" stroke-linecap="round"/><path d="M74 130 C70 118 78 110 90 108" fill="none" stroke="#5A8040" stroke-width="1.2" stroke-linecap="round"/><path d="M106 130 C110 118 102 110 90 108" fill="none" stroke="#4A7030" stroke-width="1.2" stroke-linecap="round"/><path d="M82 128 C76 116 80 106 90 104" fill="none" stroke="#6AA050" stroke-width="1" stroke-linecap="round"/><path d="M98 128 C104 116 100 106 90 104" fill="none" stroke="#6AA050" stroke-width="1" stroke-linecap="round"/><path d="M90 130 C68 126 52 110 56 94 C60 78 74 68 90 72 C106 68 120 78 124 94 C128 110 112 126 90 130Z" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" stroke="#C84060"/><path d="M90 130 C78 116 68 98 76 84" fill="none" stroke="#C84060" stroke-width="1.2" stroke-linecap="round"/><path d="M90 130 C102 116 112 98 104 84" fill="none" stroke="#C84060" stroke-width="1.2" stroke-linecap="round"/><path d="M90 72 C84 82 84 100 90 110" fill="none" stroke="#C84060" stroke-width="1" stroke-linecap="round"/><path d="M90 100 C87 94 88 86 93 88 C98 90 96 100 90 102 C85 102 83 96 86 92" fill="none" stroke="#A02040" stroke-width="1.4" stroke-linecap="round"/><circle cx="68" cy="108" r="2" fill="#C84060"/><circle cx="112" cy="108" r="2" fill="#C84060"/><circle cx="90" cy="78" r="1.5" fill="#C84060"/></g></svg>'
        ],
        'watercolor-rose': [
            '<svg width="200" height="200" viewBox="0 0 200 200"><g><circle cx="100" cy="98" r="52" fill="#F9C0D0" opacity=".22"/><circle cx="96" cy="94" r="40" fill="#F090B0" opacity=".18"/><circle cx="103" cy="102" r="32" fill="#E86090" opacity=".15"/><circle cx="44" cy="62" r="4" fill="#F090B0" opacity=".28"/><circle cx="156" cy="58" r="3" fill="#E87090" opacity=".22"/><circle cx="42" cy="138" r="5" fill="#F0A0C0" opacity=".24"/><circle cx="158" cy="136" r="3.5" fill="#E87090" opacity=".2"/><circle cx="100" cy="34" r="3" fill="#F090B0" opacity=".28"/><circle cx="166" cy="100" r="2.5" fill="#E870A0" opacity=".2"/><circle cx="34" cy="100" r="3" fill="#F090B0" opacity=".22"/><path d="M100 100 C82 82 60 78 56 92 C52 106 68 120 100 100Z" fill="#F09AB0" opacity=".55"/><path d="M100 100 C120 82 140 54 128 44 C116 34 96 56 100 100Z" fill="#E87090" opacity=".5"/><path d="M100 100 C118 122 136 148 122 156 C108 164 94 142 100 100Z" fill="#F09AB0" opacity=".5"/><path d="M100 100 C78 120 62 146 78 152 C94 158 106 134 100 100Z" fill="#E87090" opacity=".5"/><path d="M100 100 C70 96 48 108 54 122 C60 136 84 126 100 100Z" fill="#F0A0C0" opacity=".45"/><path d="M100 100 C130 96 152 108 146 122 C140 136 116 126 100 100Z" fill="#E87090" opacity=".45"/><path d="M100 100 C88 86 80 72 88 62 C96 52 108 62 100 100Z" fill="#E878A0" opacity=".6"/><path d="M100 100 C114 88 126 76 120 64 C114 52 100 62 100 100Z" fill="#D86888" opacity=".6"/><path d="M100 100 C112 114 118 130 110 136 C102 142 94 128 100 100Z" fill="#E878A0" opacity=".58"/><path d="M100 100 C86 114 80 130 90 136 C100 142 106 128 100 100Z" fill="#D86888" opacity=".56"/><path d="M100 100 C94 88 90 78 96 74 C102 70 108 80 100 100Z" fill="#D05878" opacity=".7"/><path d="M100 100 C108 90 116 82 114 76 C112 70 104 78 100 100Z" fill="#C04870" opacity=".7"/><path d="M100 100 C106 110 110 120 104 124 C98 128 94 116 100 100Z" fill="#D05878" opacity=".65"/><ellipse cx="100" cy="94" rx="14" ry="12" fill="#E06080" opacity=".45"/><ellipse cx="100" cy="94" rx="9" ry="8" fill="#C84068" opacity=".55"/><ellipse cx="98" cy="92" rx="5" ry="4" fill="#F090B0" opacity=".55"/><circle cx="99" cy="91" r="2" fill="white" opacity=".3"/><path d="M60 148 C46 140 48 124 60 130" fill="#5A9040" opacity=".38"/><path d="M140 148 C154 140 152 124 140 130" fill="#4A7030" opacity=".33"/></g><ellipse cx="30" cy="50" rx="5" ry="8" fill="#F090B0" opacity=".3" transform="rotate(-25,30,50)"/><ellipse cx="170" cy="44" rx="4" ry="7" fill="#E878A0" opacity=".25" transform="rotate(20,170,44)"/><ellipse cx="22" cy="130" rx="4" ry="6" fill="#F0A0C0" opacity=".25" transform="rotate(10,22,130)"/><ellipse cx="178" cy="130" rx="5" ry="7" fill="#E87090" opacity=".22" transform="rotate(-15,178,130)"/><ellipse cx="100" cy="20" rx="4" ry="6" fill="#F090B0" opacity=".28" transform="rotate(5,100,20)"/></svg>'
        ],
        'sunflower': [
            '<svg width="60" height="60" viewBox="0 0 60 60"><g transform="translate(30,30)"><ellipse cx="0" cy="-14" rx="5" ry="10" fill="#F4C842" transform="rotate(0)"/><ellipse cx="0" cy="-14" rx="5" ry="10" fill="#F4C842" transform="rotate(30)"/><ellipse cx="0" cy="-14" rx="5" ry="10" fill="#F4C842" transform="rotate(60)"/><ellipse cx="0" cy="-14" rx="5" ry="10" fill="#F4C842" transform="rotate(90)"/><ellipse cx="0" cy="-14" rx="5" ry="10" fill="#F4C842" transform="rotate(120)"/><ellipse cx="0" cy="-14" rx="5" ry="10" fill="#F4C842" transform="rotate(150)"/><ellipse cx="0" cy="-14" rx="5" ry="10" fill="#EDB832" transform="rotate(180)"/><ellipse cx="0" cy="-14" rx="5" ry="10" fill="#EDB832" transform="rotate(210)"/><ellipse cx="0" cy="-14" rx="5" ry="10" fill="#EDB832" transform="rotate(240)"/><ellipse cx="0" cy="-14" rx="5" ry="10" fill="#EDB832" transform="rotate(270)"/><ellipse cx="0" cy="-14" rx="5" ry="10" fill="#EDB832" transform="rotate(300)"/><ellipse cx="0" cy="-14" rx="5" ry="10" fill="#EDB832" transform="rotate(330)"/><circle cx="0" cy="0" r="8" fill="#5C3D1E"/><circle cx="-2" cy="-2" r="2" fill="#7A5230" opacity="0.6"/><circle cx="2" cy="1" r="1.5" fill="#7A5230" opacity="0.6"/></g></svg>',
            '<svg width="55" height="95" viewBox="0 0 55 95"><line x1="27" y1="93" x2="27" y2="52" stroke="#4CAF50" stroke-width="3" stroke-linecap="round"/><ellipse cx="19" cy="70" rx="9" ry="5" fill="#66BB6A" transform="rotate(-35,19,70)"/><ellipse cx="35" cy="62" rx="9" ry="5" fill="#66BB6A" transform="rotate(35,35,62)"/><g transform="translate(27,30)"><ellipse cx="0" cy="-14" rx="5" ry="10" fill="#F4C842" transform="rotate(0)"/><ellipse cx="0" cy="-14" rx="5" ry="10" fill="#F4C842" transform="rotate(30)"/><ellipse cx="0" cy="-14" rx="5" ry="10" fill="#F4C842" transform="rotate(60)"/><ellipse cx="0" cy="-14" rx="5" ry="10" fill="#F4C842" transform="rotate(90)"/><ellipse cx="0" cy="-14" rx="5" ry="10" fill="#F4C842" transform="rotate(120)"/><ellipse cx="0" cy="-14" rx="5" ry="10" fill="#F4C842" transform="rotate(150)"/><ellipse cx="0" cy="-14" rx="5" ry="10" fill="#EDB832" transform="rotate(180)"/><ellipse cx="0" cy="-14" rx="5" ry="10" fill="#EDB832" transform="rotate(210)"/><ellipse cx="0" cy="-14" rx="5" ry="10" fill="#EDB832" transform="rotate(240)"/><ellipse cx="0" cy="-14" rx="5" ry="10" fill="#EDB832" transform="rotate(270)"/><ellipse cx="0" cy="-14" rx="5" ry="10" fill="#EDB832" transform="rotate(300)"/><ellipse cx="0" cy="-14" rx="5" ry="10" fill="#EDB832" transform="rotate(330)"/><circle cx="0" cy="0" r="8" fill="#5C3D1E"/></g></svg>'
        ],
        'lavender': [
            '<svg width="45" height="90" viewBox="0 0 60 120"><line x1="30" y1="118" x2="30" y2="45" stroke="#6BA348" stroke-width="3" stroke-linecap="round"/><ellipse cx="20" cy="90" rx="10" ry="5" fill="#7CB342" opacity="0.8" transform="rotate(-35,20,90)"/><ellipse cx="40" cy="75" rx="10" ry="5" fill="#7CB342" opacity="0.8" transform="rotate(35,40,75)"/><ellipse cx="30" cy="40" rx="7" ry="13" fill="#AE88E0"/><ellipse cx="30" cy="55" rx="9" ry="13" fill="#9B70D4"/><ellipse cx="30" cy="70" rx="10" ry="13" fill="#8B5FCA"/><ellipse cx="30" cy="83" rx="10" ry="10" fill="#7A4EBA"/><ellipse cx="19" cy="47" rx="5" ry="9" fill="#C4A0E8" opacity="0.7" transform="rotate(-22,19,47)"/><ellipse cx="41" cy="47" rx="5" ry="9" fill="#C4A0E8" opacity="0.7" transform="rotate(22,41,47)"/><ellipse cx="18" cy="62" rx="5" ry="9" fill="#B090D8" opacity="0.65" transform="rotate(-28,18,62)"/><ellipse cx="42" cy="62" rx="5" ry="9" fill="#B090D8" opacity="0.65" transform="rotate(28,42,62)"/></g></svg>',
            '<svg width="90" height="110" viewBox="0 0 100 130"><line x1="32" y1="125" x2="28" y2="52" stroke="#6BA348" stroke-width="2" stroke-linecap="round"/><line x1="50" y1="125" x2="50" y2="45" stroke="#5A9E38" stroke-width="2.5" stroke-linecap="round"/><line x1="68" y1="125" x2="72" y2="52" stroke="#6BA348" stroke-width="2" stroke-linecap="round"/><ellipse cx="50" cy="118" rx="22" ry="6" fill="#CE93D8" opacity="0.5"/><path d="M28,115 Q50,122 72,115" stroke="#AB47BC" stroke-width="2" fill="none" stroke-linecap="round"/><ellipse cx="28" cy="47" rx="5" ry="9" fill="#AE88E0"/><ellipse cx="28" cy="58" rx="6" ry="9" fill="#9B70D4"/><ellipse cx="28" cy="69" rx="7" ry="9" fill="#8B5FCA"/><ellipse cx="21" cy="52" rx="4" ry="6" fill="#C4A0E8" opacity="0.65" transform="rotate(-22,21,52)"/><ellipse cx="35" cy="52" rx="4" ry="6" fill="#C4A0E8" opacity="0.65" transform="rotate(22,35,52)"/><ellipse cx="50" cy="40" rx="7" ry="11" fill="#BA9AE8"/><ellipse cx="50" cy="53" rx="9" ry="11" fill="#9B70D4"/><ellipse cx="50" cy="66" rx="10" ry="11" fill="#8B5FCA"/><ellipse cx="50" cy="78" rx="10" ry="9" fill="#7A4EBA"/><ellipse cx="39" cy="46" rx="5" ry="8" fill="#D0AEF0" opacity="0.65" transform="rotate(-25,39,46)"/><ellipse cx="61" cy="46" rx="5" ry="8" fill="#D0AEF0" opacity="0.65" transform="rotate(25,61,46)"/><ellipse cx="72" cy="47" rx="5" ry="9" fill="#AE88E0"/><ellipse cx="72" cy="58" rx="6" ry="9" fill="#9B70D4"/><ellipse cx="72" cy="69" rx="7" ry="9" fill="#8B5FCA"/><ellipse cx="65" cy="52" rx="4" ry="6" fill="#C4A0E8" opacity="0.65" transform="rotate(-22,65,52)"/><ellipse cx="79" cy="52" rx="4" ry="6" fill="#C4A0E8" opacity="0.65" transform="rotate(22,79,52)"/></g></svg>'
        ],
        'daisy': [
            '<svg width="60" height="60" viewBox="0 0 60 60"><g transform="translate(30,30)"><ellipse cx="0" cy="-14" rx="4.5" ry="10" fill="white" stroke="#ddd" stroke-width="0.8" transform="rotate(0)"/><ellipse cx="0" cy="-14" rx="4.5" ry="10" fill="white" stroke="#ddd" stroke-width="0.8" transform="rotate(45)"/><ellipse cx="0" cy="-14" rx="4.5" ry="10" fill="white" stroke="#ddd" stroke-width="0.8" transform="rotate(90)"/><ellipse cx="0" cy="-14" rx="4.5" ry="10" fill="white" stroke="#ddd" stroke-width="0.8" transform="rotate(135)"/><ellipse cx="0" cy="-14" rx="4.5" ry="10" fill="white" stroke="#ddd" stroke-width="0.8" transform="rotate(180)"/><ellipse cx="0" cy="-14" rx="4.5" ry="10" fill="white" stroke="#ddd" stroke-width="0.8" transform="rotate(225)"/><ellipse cx="0" cy="-14" rx="4.5" ry="10" fill="white" stroke="#ddd" stroke-width="0.8" transform="rotate(270)"/><ellipse cx="0" cy="-14" rx="4.5" ry="10" fill="white" stroke="#ddd" stroke-width="0.8" transform="rotate(315)"/><circle cx="0" cy="0" r="7" fill="#F4C842"/></g></svg>',
            '<svg width="60" height="60" viewBox="0 0 60 60"><g transform="translate(30,30)"><ellipse cx="0" cy="-14" rx="4.5" ry="10" fill="#FFB3C8" stroke="#F48FB1" stroke-width="0.8" transform="rotate(0)"/><ellipse cx="0" cy="-14" rx="4.5" ry="10" fill="#FFB3C8" stroke="#F48FB1" stroke-width="0.8" transform="rotate(45)"/><ellipse cx="0" cy="-14" rx="4.5" ry="10" fill="#FFB3C8" stroke="#F48FB1" stroke-width="0.8" transform="rotate(90)"/><ellipse cx="0" cy="-14" rx="4.5" ry="10" fill="#FFB3C8" stroke="#F48FB1" stroke-width="0.8" transform="rotate(135)"/><ellipse cx="0" cy="-14" rx="4.5" ry="10" fill="#FFB3C8" stroke="#F48FB1" stroke-width="0.8" transform="rotate(180)"/><ellipse cx="0" cy="-14" rx="4.5" ry="10" fill="#FFB3C8" stroke="#F48FB1" stroke-width="0.8" transform="rotate(225)"/><ellipse cx="0" cy="-14" rx="4.5" ry="10" fill="#FFB3C8" stroke="#F48FB1" stroke-width="0.8" transform="rotate(270)"/><ellipse cx="0" cy="-14" rx="4.5" ry="10" fill="#FFB3C8" stroke="#F48FB1" stroke-width="0.8" transform="rotate(315)"/><circle cx="0" cy="0" r="7" fill="#F9A825"/></g></svg>',
            '<svg width="60" height="60" viewBox="0 0 60 60"><g transform="translate(30,30)"><ellipse cx="0" cy="-14" rx="4.5" ry="10" fill="#D1B3FF" stroke="#CE93D8" stroke-width="0.8" transform="rotate(0)"/><ellipse cx="0" cy="-14" rx="4.5" ry="10" fill="#D1B3FF" stroke="#CE93D8" stroke-width="0.8" transform="rotate(45)"/><ellipse cx="0" cy="-14" rx="4.5" ry="10" fill="#D1B3FF" stroke="#CE93D8" stroke-width="0.8" transform="rotate(90)"/><ellipse cx="0" cy="-14" rx="4.5" ry="10" fill="#D1B3FF" stroke="#CE93D8" stroke-width="0.8" transform="rotate(135)"/><ellipse cx="0" cy="-14" rx="4.5" ry="10" fill="#D1B3FF" stroke="#CE93D8" stroke-width="0.8" transform="rotate(180)"/><ellipse cx="0" cy="-14" rx="4.5" ry="10" fill="#D1B3FF" stroke="#CE93D8" stroke-width="0.8" transform="rotate(225)"/><ellipse cx="0" cy="-14" rx="4.5" ry="10" fill="#D1B3FF" stroke="#CE93D8" stroke-width="0.8" transform="rotate(270)"/><ellipse cx="0" cy="-14" rx="4.5" ry="10" fill="#D1B3FF" stroke="#CE93D8" stroke-width="0.8" transform="rotate(315)"/><circle cx="0" cy="0" r="7" fill="#FFD54F"/></g></svg>'
        ],
        'scattered-hearts': [
            '<svg width="220" height="160" viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg"><g class="anim-float" style="transform-origin:110px 80px"><path d="M110 95 C110 80 90 68 90 80 C90 92 110 105 110 105 C110 105 130 92 130 80 C130 68 110 80 110 95Z" fill="#C84060" opacity=".95"/></g><g class="anim-float delay-1" style="transform-origin:40px 50px"><path d="M40 58 C40 50 30 44 30 50 C30 56 40 64 40 64 C40 64 50 56 50 50 C50 44 40 50 40 58Z" fill="#E8789A" opacity=".85"/></g><g class="anim-float delay-2" style="transform-origin:178px 44px"><path d="M178 52 C178 44 168 38 168 44 C168 50 178 58 178 58 C178 58 188 50 188 44 C188 38 178 44 178 52Z" fill="#C84060" opacity=".8"/></g><g class="anim-float delay-3" style="transform-origin:62px 118px"><path d="M62 124 C62 118 55 114 55 118 C55 122 62 128 62 128 C62 128 69 122 69 118 C69 114 62 118 62 124Z" fill="#E8789A" opacity=".75"/></g><g class="anim-float delay-4" style="transform-origin:158px 120px"><path d="M158 126 C158 120 151 116 151 120 C151 124 158 130 158 130 C158 130 165 124 165 120 C165 116 158 120 158 126Z" fill="#C84060" opacity=".75"/></g><g class="anim-pulse delay-2" style="transform-origin:26px 110px"><path d="M26 114 C26 110 21 107 21 110 C21 113 26 117 26 117 C26 117 31 113 31 110 C31 107 26 110 26 114Z" fill="#E8789A" opacity=".6"/></g><g class="anim-pulse delay-5" style="transform-origin:192px 98px"><path d="M192 102 C192 98 187 95 187 98 C187 101 192 105 192 105 C192 105 197 101 197 98 C197 95 192 98 192 102Z" fill="#C84060" opacity=".55"/></g><g class="anim-float delay-5" style="transform-origin:110px 28px"><path d="M110 34 C110 28 104 24 104 28 C104 32 110 38 110 38 C110 38 116 32 116 28 C116 24 110 28 110 34Z" fill="#E8789A" opacity=".7"/></g><circle cx="80" cy="30" r="2.5" fill="#E8789A" opacity=".5"/><circle cx="144" cy="140" r="2" fill="#C84060" opacity=".45"/><circle cx="198" cy="140" r="3" fill="#E8789A" opacity=".4"/><circle cx="18" cy="40" r="2" fill="#C84060" opacity=".4"/></svg>'
        ],
        'sparkles': [
            '<svg width="220" height="160" viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg"><g class="anim-twinkle" style="transform-origin:110px 80px"><line x1="110" y1="56" x2="110" y2="104" stroke="#C8963A" stroke-width="2" stroke-linecap="round"/><line x1="86" y1="80" x2="134" y2="80" stroke="#C8963A" stroke-width="2" stroke-linecap="round"/><line x1="93" y1="63" x2="127" y2="97" stroke="#C8963A" stroke-width="1.2" stroke-linecap="round"/><line x1="127" y1="63" x2="93" y2="97" stroke="#C8963A" stroke-width="1.2" stroke-linecap="round"/><path d="M110 62 L116 80 L110 98 L104 80 Z" fill="#E8C070" opacity=".5"/></g><g class="anim-twinkle delay-2" style="transform-origin:36px 40px"><line x1="36" y1="26" x2="36" y2="54" stroke="#C8963A" stroke-width="1.5" stroke-linecap="round"/><line x1="22" y1="40" x2="50" y2="40" stroke="#C8963A" stroke-width="1.5" stroke-linecap="round"/><line x1="26" y1="30" x2="46" y2="50" stroke="#C8963A" stroke-width=".9" stroke-linecap="round"/><line x1="46" y1="30" x2="26" y2="50" stroke="#C8963A" stroke-width=".9" stroke-linecap="round"/></g><g class="anim-twinkle delay-1" style="transform-origin:184px 36px"><line x1="184" y1="22" x2="184" y2="50" stroke="#E8C070" stroke-width="1.5" stroke-linecap="round"/><line x1="170" y1="36" x2="198" y2="36" stroke="#E8C070" stroke-width="1.5" stroke-linecap="round"/><line x1="174" y1="26" x2="194" y2="46" stroke="#E8C070" stroke-width=".9" stroke-linecap="round"/><line x1="194" y1="26" x2="174" y2="46" stroke="#E8C070" stroke-width=".9" stroke-linecap="round"/></g><g class="anim-twinkle delay-3" style="transform-origin:52px 126px"><line x1="52" y1="114" x2="52" y2="138" stroke="#C84060" stroke-width="1.3" stroke-linecap="round"/><line x1="40" y1="126" x2="64" y2="126" stroke="#C84060" stroke-width="1.3" stroke-linecap="round"/><line x1="44" y1="118" x2="60" y2="134" stroke="#C84060" stroke-width=".8" stroke-linecap="round"/><line x1="60" y1="118" x2="44" y2="134" stroke="#C84060" stroke-width=".8" stroke-linecap="round"/></g><g class="anim-twinkle delay-4" style="transform-origin:180px 124px"><line x1="180" y1="112" x2="180" y2="136" stroke="#5A8040" stroke-width="1.3" stroke-linecap="round"/><line x1="168" y1="124" x2="192" y2="124" stroke="#5A8040" stroke-width="1.3" stroke-linecap="round"/><line x1="172" y1="116" x2="188" y2="132" stroke="#5A8040" stroke-width=".8" stroke-linecap="round"/><line x1="188" y1="116" x2="172" y2="132" stroke="#5A8040" stroke-width=".8" stroke-linecap="round"/></g><g class="anim-twinkle delay-5"><circle cx="70" cy="60" r="3" fill="#E8C070" opacity=".7"/><circle cx="148" cy="50" r="2.5" fill="#C8963A" opacity=".6"/><circle cx="20" cy="90" r="2" fill="#C84060" opacity=".5"/><circle cx="200" cy="90" r="2.5" fill="#E8C070" opacity=".55"/><circle cx="90" cy="140" r="2" fill="#C8963A" opacity=".5"/><circle cx="140" cy="140" r="3" fill="#5A8040" opacity=".5"/></g></svg>'
        ]
    };

    // --- CORE UPDATE FUNCTIONS ---

    function updatePreview() {
        const text = textInput.value;
        const selectedFontKey = fontSelector.value;
        const selectedFontFamily = fontMap[selectedFontKey];
        const fontWeight = fontWeightSlider.value;
        const letterSpacing = letterSpacingSlider.value;
        const lineHeight = lineHeightSlider.value;

        const supportsVariableWeight = variableWeightFonts.includes(selectedFontKey);
        fontWeightSlider.disabled = !supportsVariableWeight;
        fontWeightSlider.closest('.control').style.opacity = supportsVariableWeight ? 1 : 0.5;

        preview.innerHTML = text.replace(/\n/g, '<br>');
        preview.style.fontFamily = selectedFontFamily;
        preview.style.fontWeight = supportsVariableWeight ? fontWeight : 'normal';
        preview.style.letterSpacing = `${letterSpacing}px`;
        preview.style.lineHeight = lineHeight / 100;

        fontWeightValue.textContent = supportsVariableWeight ? fontWeight : 'N/A';
        letterSpacingValue.textContent = `${letterSpacing}px`;
        lineHeightValue.textContent = (lineHeight / 100).toFixed(1);

        updateColor();
        // Use a timeout to ensure the DOM is updated and textRect is calculated correctly
        setTimeout(updateDecorations, 0);
    }

    function updateColor() {
        const colorType = colorTypeSelector.value;
        solidColorControl.style.display = colorType === 'solid' ? 'block' : 'none';
        gradientColorControls.style.display = colorType === 'gradient' ? 'block' : 'none';

        preview.style.background = 'none';
        preview.style.webkitBackgroundClip = 'auto';
        preview.style.backgroundClip = 'auto';
        preview.style.color = solidColorPicker.value;

        if (colorType !== 'solid') {
            let gradient;
            if (colorType === 'gradient') gradient = `linear-gradient(45deg, ${gradientStartPicker.value}, ${gradientEndPicker.value})`;
            else if (colorType === 'gold') gradient = 'linear-gradient(45deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)';
            else if (colorType === 'silver') gradient = 'linear-gradient(45deg, #A7A7A7, #EAEAEA, #B4B4B4, #FDFDFD, #8C8C8C)';
            
            preview.style.background = gradient;
            preview.style.webkitBackgroundClip = 'text';
            preview.style.backgroundClip = 'text';
            preview.style.color = 'transparent';
        }
    }

    function updateDecorations() {
        decorationContainer.innerHTML = ''; // Clear old decorations
        const textRect = preview.getBoundingClientRect();
        const containerRect = previewContainer.getBoundingClientRect();

        if (textRect.width === 0) return; // Don't draw if there's no text

        // Helper function to create and position a single decoration
        const applyDecoration = (theme, checkboxes) => {
            if (theme === 'none' || !decorationSets[theme]) return;
            const decoSet = decorationSets[theme];

            checkboxes.forEach(checkbox => {
                if (!checkbox.checked) return;

                const position = checkbox.value;
                const item = document.createElement('div');
                item.className = 'decoration-item';
                item.innerHTML = decoSet[Math.floor(Math.random() * decoSet.length)];
                
                // Let's use the SVG's intrinsic size for more varied looks
                const svgEl = item.querySelector('svg');
                const svgWidth = svgEl ? parseFloat(svgEl.getAttribute('width')) : 60;
                const svgHeight = svgEl ? parseFloat(svgEl.getAttribute('height')) : 60;

                const scale = 0.8; // Scale all SVGs down a bit to fit nicely
                const w = svgWidth * scale;
                const h = svgHeight * scale;

                const offsetX = (textRect.left - containerRect.left);
                const offsetY = (textRect.top - containerRect.top);

                switch (position) {
                    case 'top-left': item.style.left = `${offsetX - w}px`; item.style.top = `${offsetY - h/1.5}px`; break;
                    case 'top-center': item.style.left = `${offsetX + textRect.width / 2 - w/2}px`; item.style.top = `${offsetY - h}px`; break;
                    case 'top-right': item.style.left = `${offsetX + textRect.width}px`; item.style.top = `${offsetY - h/1.5}px`; break;
                    case 'bottom-left': item.style.left = `${offsetX - w}px`; item.style.top = `${offsetY + textRect.height - h/2}px`; break;
                    case 'bottom-center': item.style.left = `${offsetX + textRect.width / 2 - w/2}px`; item.style.top = `${offsetY + textRect.height}px`; break;
                    case 'bottom-right': item.style.left = `${offsetX + textRect.width}px`; item.style.top = `${offsetY + textRect.height - h/2}px`; break;
                }
                decorationContainer.appendChild(item);
            });
        };

        applyDecoration(topDecorationSelector.value, topPositionCheckboxes);
        applyDecoration(bottomDecorationSelector.value, bottomPositionCheckboxes);
    }

    // --- EVENT LISTENERS ---
    const allControls = [textInput, fontSelector, fontWeightSlider, letterSpacingSlider, lineHeightSlider];
    allControls.forEach(control => control.addEventListener('input', updatePreview));
    
    const colorControls = [colorTypeSelector, solidColorPicker, gradientStartPicker, gradientEndPicker];
    colorControls.forEach(control => control.addEventListener('input', updateColor));

    const decoControls = [topDecorationSelector, bottomDecorationSelector, ...topPositionCheckboxes, ...bottomPositionCheckboxes];
    decoControls.forEach(control => control.addEventListener('input', updateDecorations));

    new ResizeObserver(updateDecorations).observe(preview);
    window.addEventListener('resize', updateDecorations); // Also handle window resize

    // --- DOWNLOAD FUNCTIONALITY ---
    downloadBtn.addEventListener('click', () => {
        downloadBtn.disabled = true;
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';

        // Wait for all fonts to be loaded
        document.fonts.ready.then(() => {
            // Set a temporary transparent background for the container
            previewContainer.style.backgroundColor = 'transparent';
            preview.style.textShadow = 'none'; // Hide shadow for capture

            setTimeout(() => {
                html2canvas(previewContainer, { 
                    backgroundColor: null, // Use null for transparency
                    scale: 3, 
                    useCORS: true, 
                    logging: true // Enable logging for debugging
                })
                .then(canvas => {
                    const link = document.createElement('a');
                    link.download = 'custom-topper-design.png';
                    link.href = canvas.toDataURL('image/png');
                    document.body.appendChild(link); 
                    link.click(); 
                    document.body.removeChild(link);

                    // Restore original styles and button state
                    previewContainer.style.backgroundColor = ''; 
                    preview.style.textShadow = '1px 1px 2px rgba(0,0,0,0.05)';
                    downloadBtn.disabled = false;
                    downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download Image';

                }).catch(err => {
                    console.error("Oops, something went wrong!", err);
                    alert("Error generating image. Please check the console for details.");

                    // Restore original styles and button state
                    previewContainer.style.backgroundColor = '';
                    preview.style.textShadow = '1px 1px 2px rgba(0,0,0,0.05)';
                    downloadBtn.disabled = false;
                    downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download Image';
                });
            }, 100); // Small delay to ensure styles are applied
        });
    });


    // --- INITIAL LOAD ---
    updatePreview();
});
