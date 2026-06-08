// Presentation Data with Lyrics and Grammar Points
const songsData = [
    {
        lyrics: [
            { 
                textHtml: "The snow <span class='highlight-grammar'>glows white</span> on the mountain tonight", 
                points: [
                    { label: "문법", value: "2형식 동사 (glow + 형용사 보어)" },
                    { label: "의미", value: "눈이 '하얗게' 빛난다" }
                ]
            },
            { 
                textHtml: "Not a footprint <span class='highlight-grammar'>to be seen</span>", 
                points: [
                    { label: "문법", value: "to부정사의 수동태 (to be p.p)" },
                    { label: "왜 수동태?", value: "발자국(footprint)은 스스로 보는 게 아니라 '보여지는' 대상이니까요!" }
                ]
            },
            { 
                textHtml: "A kingdom <span class='highlight-grammar'>of isolation</span>", 
                points: [
                    { label: "구문", value: "전치사 of (A of B)" },
                    { label: "의미", value: "B의 A → 고립의 왕국 (외로운 왕국)" }
                ]
            },
            { 
                textHtml: "And it <span class='highlight-grammar'>looks like</span> I'm the queen", 
                points: [
                    { label: "문법", value: "감각동사 + like + 문장" },
                    { label: "특징", value: "look 뒤에 주어/동사가 오려면 접속사 역할을 하는 like가 꼭 필요해요!" }
                ]
            },
            { 
                textHtml: "The wind <span class='highlight-grammar'>is howling</span> like this <span class='highlight-grammar'>swirling</span> storm", 
                points: [
                    { label: "문법", value: "현재진행형(be+V-ing) & 현재분사(V-ing)" },
                    { label: "의미", value: "is howling(울부짖고 있다), swirling(휘몰아치는 능동의 의미)" }
                ]
            }
        ]
    },
    {
        lyrics: [
            { 
                textHtml: "Heart <span class='highlight-grammar'>beats</span> fast", 
                points: [
                    { label: "문법", value: "3인칭 단수 주어 + 동사s" },
                    { label: "설명", value: "Heart(심장)가 3인칭 단수(it)라서 동사 beat에 s가 붙었어요!" }
                ]
            },
            { 
                textHtml: "<span class='highlight-grammar'>How to be</span> brave?", 
                points: [
                    { label: "구문", value: "의문사 + to부정사" },
                    { label: "해석", value: "어떻게 용감해져야 할지 (명사구 역할)" }
                ]
            },
            { 
                textHtml: "How can I love <span class='highlight-grammar'>when</span> I'm <span class='highlight-grammar'>afraid to</span> fall?", 
                points: [
                    { label: "문법", value: "시간의 접속사 when & be afraid to" },
                    { label: "의미", value: "추락하는 것을 두려워'할 때' 내가 어떻게 사랑할 수 있을까?" }
                ]
            },
            { 
                textHtml: "But <span class='highlight-grammar'>watching you stand</span> alone", 
                points: [
                    { label: "문법", value: "지각동사 + 목적어 + 동사원형" },
                    { label: "분석", value: "watch(보다) + you(목적어) + stand(원형). '네가 서 있는 것을 보다'" }
                ]
            },
            { 
                textHtml: "<span class='highlight-grammar'>All of my doubt</span> suddenly <span class='highlight-grammar'>goes</span> away", 
                points: [
                    { label: "문법", value: "부분사 + of + 명사 (수일치)" },
                    { label: "설명", value: "doubt(의심)가 셀 수 없는 단수명사이므로, 전체(All)라도 동사 goes(단수)를 씁니다." }
                ]
            }
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
                    lineEl.style.transform = `translateY(-80px) scale(1.05)`;
                    lineEl.style.filter = `blur(0px)`;
                    lineEl.style.opacity = `1`;
                } else if (diff < 0) {
                    // Past lines: slide up
                    lineEl.style.transform = `translateY(${diff * 120 - 180}px) scale(${1 + diff * 0.03})`;
                    lineEl.style.filter = `blur(${Math.min(10, Math.abs(diff) * 1.5)}px)`;
                    lineEl.style.opacity = `${Math.max(0, 1 - Math.abs(diff) * 0.25)}`;
                } else {
                    // Future lines: slide down with gap
                    lineEl.style.transform = `translateY(${diff * 120 + 250}px) scale(${1 - diff * 0.03})`;
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
