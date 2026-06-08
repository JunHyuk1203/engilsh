// Presentation Data with Lyrics and Grammar Points
const songsData = [
    {
        lyrics: [
            { 
                textHtml: "It's <span class='highlight-grammar'>been</span> a long day <span class='highlight-grammar'>without</span> you, my friend", 
                points: [
                    { label: "문법", value: "현재완료 (It has been) & 전치사 without" },
                    { label: "의미", value: "너 없이 긴 하루'였어' (과거부터 지금까지 지속됨)" }
                ]
            },
            { 
                textHtml: "And <span class='highlight-grammar'>I'll tell</span> you all about it <span class='highlight-grammar'>when</span> I see you again", 
                points: [
                    { label: "문법", value: "시간의 부사절 접속사 when" },
                    { label: "주의", value: "when 절 안에서는 미래 일도 현재 시제(see)로 씁니다!" }
                ]
            },
            { 
                textHtml: "We<span class='highlight-grammar'>'ve come</span> a long way <span class='highlight-grammar'>from where</span> we began", 
                points: [
                    { label: "구문", value: "전치사 from + 관계부사 where" },
                    { label: "해석", value: "우리가 처음 시작했던 '그곳으로부터' 아주 멀리 왔네" }
                ]
            },
            { 
                textHtml: "<span class='highlight-grammar'>How could we not talk</span> about family", 
                points: [
                    { label: "문법", value: "조동사의 부정 의문문 (How could we not~?)" },
                    { label: "뉘앙스", value: "어떻게 가족 얘기를 '안 할 수' 있겠어? (당연히 해야지!)" }
                ]
            },
            { 
                textHtml: "<span class='highlight-grammar'>when family's all that</span> we got?", 
                points: [
                    { label: "문법", value: "선행사 all + 목적격 관계대명사 that" },
                    { label: "핵심", value: "선행사가 all, every 등일 때는 which 대신 반드시 that을 씁니다!" }
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
