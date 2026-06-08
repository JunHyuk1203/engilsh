// Presentation Data with Lyrics and Grammar Points
const songsData = [
    {
        lyrics: [
            { 
                textHtml: "<span class='highlight-grammar'>If I were</span> a boy", 
                points: [
                    { label: "문법", value: "가정법 과거" },
                    { label: "상황", value: "현실에서 절대 불가능한 일을 상상할 때!" }
                ]
            },
            { 
                textHtml: "I think I <span class='highlight-grammar'>could understand</span>", 
                points: [
                    { label: "의미", value: "온전히 이해할 수 있을 텐데" },
                    { label: "왜 could?", value: "'소년이라면' 이라는 불가능한 전제 조건이 충족되어야 가능한 일이라서" }
                ]
            },
            { textHtml: "How it feels to love a girl", points: [] },
            { 
                textHtml: "I swear <span class='highlight-grammar'>I'd</span> be a better man", 
                points: [
                    { label: "표현", value: "I'd = I would 의 원어민 축약형" },
                    { label: "의미", value: "내가 훨씬 더 좋은 남자가 될 텐데 (강한 다짐)" }
                ]
            },
            { textHtml: "I'd listen to her", points: [] }
        ]
    },
    {
        lyrics: [
            { textHtml: "When I see your face", points: [] },
            { 
                textHtml: "There's not a thing <span class='highlight-grammar'>that I would change</span>", 
                points: [
                    { label: "문법", value: "목적격 관계대명사 that" },
                    { label: "역할", value: "앞의 a thing(내가 바꿀 만한 것)을 꾸며줌" },
                    { label: "꿀팁", value: "목적격 관계대명사는 원어민들이 흔히 생략해요!" }
                ]
            },
            { textHtml: "'Cause you're amazing", points: [] },
            { 
                textHtml: "<span class='highlight-grammar'>Just the way</span> you are", 
                points: [
                    { label: "의미", value: "있는 그대로의 당신 모습" },
                    { label: "주의", value: "the way와 how는 절대 함께 쓰지 않는다는 점!" }
                ]
            },
            { textHtml: "And when you smile", points: [] },
            { textHtml: "The whole world stops and stares for a while", points: [] }
        ]
    }
];

// 1. Initialize DOM for Lyrics
songsData.forEach((song, songIdx) => {
    const wrapper = document.getElementById(`lyrics-wrapper-${songIdx}`);
    song.lyrics.forEach((lyric, lyricIdx) => {
        const line = document.createElement('div');
        line.className = 'lyric-line';
        line.id = `lyric-${songIdx}-${lyricIdx}`;
        
        const text = document.createElement('div');
        text.className = 'lyric-text';
        text.innerHTML = lyric.textHtml;
        line.appendChild(text);

        if (lyric.points && lyric.points.length > 0) {
            const note = document.createElement('div');
            note.className = 'lyric-note';
            
            let pointsHtml = '<div class="presentation-note">';
            lyric.points.forEach(pt => {
                pointsHtml += `
                    <div class="note-point">
                        <span class="note-label">${pt.label}</span>
                        <span class="note-value">${pt.value}</span>
                    </div>
                `;
            });
            pointsHtml += '</div>';
            
            note.innerHTML = pointsHtml;
            line.appendChild(note);
        }

        wrapper.appendChild(line);
    });
});

// 2. Define the exact sequence of steps for the presentation
const steps = [
    { type: 'slide', id: 'slide-title' },
    { type: 'slide', id: 'slide-intro-0' }
];

// Add lyrics lines as individual steps for Song 1
songsData[0].lyrics.forEach((_, i) => {
    steps.push({ type: 'lyric', songIdx: 0, lyricIdx: i });
});

steps.push({ type: 'slide', id: 'slide-intro-1' });

// Add lyrics lines as individual steps for Song 2
songsData[1].lyrics.forEach((_, i) => {
    steps.push({ type: 'lyric', songIdx: 1, lyricIdx: i });
});

let currentStep = 0;

// 3. Update Function
function updatePresentation() {
    const step = steps[currentStep];

    // Handle overall slide visibility
    document.querySelectorAll('.slide').forEach((el) => {
        // Determine the logical index of this slide block in the steps array
        let stepIndexForSlide = steps.findIndex(s => s.id === el.id);
        if (stepIndexForSlide === -1) {
            if (el.id === 'slide-lyrics-0') stepIndexForSlide = steps.findIndex(s => s.type === 'lyric' && s.songIdx === 0);
            if (el.id === 'slide-lyrics-1') stepIndexForSlide = steps.findIndex(s => s.type === 'lyric' && s.songIdx === 1);
        }
        
        el.classList.remove('active', 'past');
        
        if (step.type === 'slide' && step.id === el.id) {
            el.classList.add('active');
        } else if (step.type === 'lyric' && el.id === `slide-lyrics-${step.songIdx}`) {
            el.classList.add('active');
        } else if (stepIndexForSlide !== -1 && stepIndexForSlide < currentStep) {
            el.classList.add('past');
        }
    });

    // Handle internal lyric positioning (Apple Music Style)
    songsData.forEach((song, sIdx) => {
        song.lyrics.forEach((_, lIdx) => {
            const lineEl = document.getElementById(`lyric-${sIdx}-${lIdx}`);
            let isActiveSlide = step.type === 'lyric' && step.songIdx === sIdx;
            
            if (isActiveSlide) {
                const diff = lIdx - step.lyricIdx;
                lineEl.className = 'lyric-line'; // Reset classes
                
                if (diff === 0) {
                    // Active line: center it properly
                    lineEl.classList.add('active');
                    lineEl.style.transform = `translateY(-60px) scale(1.05)`;
                    lineEl.style.filter = `blur(0px)`;
                    lineEl.style.opacity = `1`;
                } else if (diff < 0) {
                    // Past lines: slide up
                    lineEl.style.transform = `translateY(${diff * 120 - 150}px) scale(${1 + diff * 0.03})`;
                    lineEl.style.filter = `blur(${Math.min(10, Math.abs(diff) * 1.5)}px)`;
                    lineEl.style.opacity = `${Math.max(0, 1 - Math.abs(diff) * 0.25)}`;
                } else {
                    // Future lines: slide down with gap
                    lineEl.style.transform = `translateY(${diff * 120 + 200}px) scale(${1 - diff * 0.03})`;
                    lineEl.style.filter = `blur(${Math.min(5, Math.abs(diff) * 0.5)}px)`;
                    lineEl.style.opacity = `${Math.max(0, 1 - diff * 0.25)}`;
                }
            } else {
                // Reset styling if not the active slide so it animates in correctly when entered
                lineEl.style.transform = `translateY(${lIdx * 100}px) scale(0.9)`;
                lineEl.style.filter = `blur(4px)`;
                lineEl.style.opacity = `0`;
                lineEl.classList.remove('active');
            }
        });
    });
}

// 4. Event Listeners
function goNext() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        updatePresentation();
    }
}

function goPrev() {
    if (currentStep > 0) {
        currentStep--;
        updatePresentation();
    }
}

document.getElementById('next-btn').addEventListener('click', goNext);
document.getElementById('prev-btn').addEventListener('click', goPrev);

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'Space' || e.key === 'ArrowDown') {
        goNext();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        goPrev();
    }
});

// Start the presentation
updatePresentation();
