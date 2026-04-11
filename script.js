// ===== 应用状态 =====
const state = {
    currentScreen: 'start',
    currentQuestionIndex: 0,
    answers: {},
    result: null
};

// DOM 元素
const screens = {
    start: document.getElementById('startScreen'),
    quiz: document.getElementById('quizScreen'),
    result: document.getElementById('resultScreen')
};

const elements = {
    startBtn: document.getElementById('startBtn'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    quitBtn: document.getElementById('quitBtn'),
    restartBtn: document.getElementById('restartBtn'),
    shareBtn: document.getElementById('shareBtn'),
    questionText: document.getElementById('questionText'),
    optionsContainer: document.getElementById('optionsContainer'),
    currentQ: document.getElementById('currentQ'),
    totalQ: document.getElementById('totalQ'),
    progressFill: document.getElementById('progressFill'),
    dimTag: document.getElementById('dimTag'),
    resultEmoji: document.getElementById('resultEmoji'),
    resultTitle: document.getElementById('resultTitle'),
    resultSubtitle: document.getElementById('resultSubtitle'),
    resultQuote: document.getElementById('resultQuote'),
    resultDescription: document.getElementById('resultDescription'),
    dimensionBreakdown: document.getElementById('dimensionBreakdown'),
    secondaryMatches: document.getElementById('secondaryMatches'),
    radarChart: document.getElementById('radarChart'),
    // counterNumber: document.getElementById('counterNumber'),
    // counterCharacter: document.getElementById('counterCharacter')
};

// ===== 代码雨效果（修复版）=====
class MatrixRain {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error('Canvas element not found!');
            return;
        }
        this.ctx = this.canvas.getContext('2d');
        this.characters = '11100110 10110000 10001111  11100110 10110010 10011010  11100110 10001101 10001001  11100110 10010001 10001001  11101001 1010111 10101101';
        this.fontSize = 16;
        this.columns = 0;
        this.drops = [];
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.floor(Math.random() * -100);
        }
    }

    draw() {
        if (!this.ctx) return;

        // 使用更透明的黑色，让拖尾效果更明显
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // 使用 Facebook 蓝色
        this.ctx.fillStyle = '#3b5998';
        this.ctx.font = 'bold ' + this.fontSize + 'px monospace';

        for (let i = 0; i < this.drops.length; i++) {
            // 随机选择字符
            const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));

            // 首字符更亮
            if (Math.random() > 0.95) {
                this.ctx.fillStyle = '#8b9dc3';
            } else {
                this.ctx.fillStyle = '#3b5998';
            }

            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);

            // 重置逻辑
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
    }

    start() {
        if (!this.ctx) return;
        this.interval = setInterval(() => this.draw(), 50);
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}

// ===== 键盘音效（Web Audio API合成）=====
const SoundEffects = {
    audioContext: null,

    init() {
        if (this.audioContext) return;
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio not supported');
        }
    },

    playKeyPress() {
        if (!this.audioContext) return;
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }

        const now = this.audioContext.currentTime;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'sine';
        osc.frequency.value = 800 + Math.random() * 200;

        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.start();
        osc.stop(now + 0.05);
    },

    playSubmit() {
        if (!this.audioContext) return;
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }

        const now = this.audioContext.currentTime;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'triangle';
        osc.frequency.value = 600;

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.start();
        osc.stop(now + 0.1);
    }
};

// ===== 真实计数器（使用 countapi.xyz）=====
// ===== 真实计数器（每个角色独立从0开始）=====
// const Counter = {
//     // 使用 localStorage 存储真实计数
//     STORAGE_KEY: 'socialnetwork_real_counts',

//     // 获取所有计数
//     getAllCounts() {
//         const stored = localStorage.getItem(this.STORAGE_KEY);
//         if (stored) {
//             return JSON.parse(stored);
//         }
//         // 首次使用，全部从0开始
//         return {
//             mark: 0,
//             eduardo: 0,
//             sean: 0,
//             winklevoss: 0,
//             dustin: 0,
//             divya: 0,
//             christy: 0,
//             erica: 0
//         };
//     },

//     // 获取单个角色计数
//     getCount(characterId) {
//         const counts = this.getAllCounts();
//         return counts[characterId] || 0;
//     },

//     // 增加计数并返回新数值
//     increment(characterId) {
//         const counts = this.getAllCounts();
//         counts[characterId] = (counts[characterId] || 0) + 1;
//         localStorage.setItem(this.STORAGE_KEY, JSON.stringify(counts));
//         return counts[characterId];
//     },

//     // 格式化序数词
//     formatOrdinal(num) {
//         if (num === 0) return '1st';  // 第一次测试显示 1st
//         const suffixes = ['th', 'st', 'nd', 'rd'];
//         const v = num % 100;
//         return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
//     }
// };

// ===== 辅助函数 =====
function showScreen(screenName) {
    Object.keys(screens).forEach(key => {
        screens[key].classList.remove('active');
    });
    screens[screenName].classList.add('active');
    state.currentScreen = screenName;
}

function resetState() {
    state.currentQuestionIndex = 0;
    state.answers = {};
    state.result = null;
}

// ===== 渲染函数 =====
function renderQuestion() {
    const question = questions[state.currentQuestionIndex];
    const selectedOption = state.answers[question.id];

    elements.questionText.textContent = question.text;
    elements.currentQ.textContent = state.currentQuestionIndex + 1;
    elements.totalQ.textContent = questions.length;
    elements.dimTag.textContent = question.dimensionName;

    const progress = ((state.currentQuestionIndex + 1) / questions.length) * 100;
    elements.progressFill.style.width = `${progress}%`;

    elements.optionsContainer.innerHTML = '';
    const likertLabels = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];

    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('likert-option');
        if (selectedOption === index) {
            optionDiv.classList.add('selected');
        }

        optionDiv.innerHTML = `
            <div class="likert-radio"></div>
            <span class="likert-label">${option.text}</span>
            <span class="likert-value">${likertLabels[index]}</span>
        `;

        optionDiv.addEventListener('click', () => selectOption(question.id, index));
        elements.optionsContainer.appendChild(optionDiv);
    });

    elements.prevBtn.disabled = state.currentQuestionIndex === 0;

    const isLast = state.currentQuestionIndex === questions.length - 1;
    elements.nextBtn.textContent = isLast ? 'See Results' : 'Next →';
    elements.nextBtn.disabled = selectedOption === undefined;
}

function selectOption(questionId, optionIndex) {
    state.answers[questionId] = optionIndex;
    SoundEffects.playKeyPress();
    renderQuestion();
}

// ===== 角色台词生成器 =====
function getCharacterLine(characterId) {
    const lines = {
        mark: '"I\'m CEO, bitch. And I\'m not going to apologize for building something great."',
        eduardo: '"You set me up. You had your lawyer set me up."',
        sean: '"A million dollars isn\'t cool. You know what\'s cool? A billion dollars."',
        winklevoss: '"I\'m 6\'5", 220, and there\'s two of me."',
        dustin: '"When you go fishing, you don\'t catch all the fish."',
        divya: '"The Harvard Connection is about creating a trusted community."',
        christy: '"You better lawyer up, asshole."',
        erica: '"You\'re going to go through life thinking that girls don\'t like you because you\'re a nerd."'
    };
    return lines[characterId] || lines.mark;
}

async function renderResult() {
    state.result = ScoringEngine.getFullResult(state.answers);
    const primary = state.result.primaryMatch.character;
    const primaryId = state.result.primaryMatch.id;
    const dimScores = state.result.dimensionScores;

    // ===== 计数器：只调用一次 =====
    // const newCount = Counter.increment(primaryId);
    // elements.counterNumber.textContent = Counter.formatOrdinal(newCount);
    // elements.counterCharacter.textContent = primary.name.split(' ')[0];

    // 头部信息
    elements.resultEmoji.textContent = primary.emoji;
    elements.resultTitle.textContent = primary.name;
    elements.resultSubtitle.textContent = `${primary.mbti} · ${primary.title}`;
    elements.resultQuote.textContent = getCharacterLine(primaryId);

    let descHtml = `<p>${primary.description.replace(/\n\n/g, '</p><p>')}</p>`;
    descHtml += `<p style="margin-top: 12px; color: var(--fb-blue); font-size: 12px;">`;
    descHtml += `🧠 Cognitive Stack: ${primary.functionStack.join(' > ')}`;
    descHtml += `</p>`;
    elements.resultDescription.innerHTML = descHtml;

    renderDimensionBreakdown(dimScores);
    renderSecondaryMatches();
    renderRadarChart(dimScores);
}
function renderDimensionBreakdown(dimScores) {
    const dims = [
        { key: 'IE', name: 'Energy', left: 'Introvert', right: 'Extrovert' },
        { key: 'NS', name: 'Info', left: 'Sensing', right: 'Intuition' },
        { key: 'TF', name: 'Decision', left: 'Feeling', right: 'Thinking' },
        { key: 'AR', name: 'Values', left: 'Relationship', right: 'Achievement' }
    ];

    let html = '';
    dims.forEach(dim => {
        const score = dimScores[dim.key] || 0;
        const interp = ScoringEngine.getDimensionInterpretation(dim.key, score);
        const percent = Math.round((score + 1) * 50);

        html += `
            <div class="dim-card">
                <div class="dim-card-header">
                    <span class="dim-card-name">${dim.name}</span>
                    <span class="dim-card-value">${interp.text}</span>
                </div>
                <div class="dim-card-bar">
                    <div class="dim-card-fill" style="width: ${percent}%"></div>
                </div>
                <div class="dim-card-desc">
                    <span>${dim.left}</span>
                    <span>${dim.right}</span>
                </div>
            </div>
        `;
    });

    elements.dimensionBreakdown.innerHTML = html;
}

function renderSecondaryMatches() {
    const matches = state.result.secondaryMatches;

    let html = `
        <div class="secondary-title">Other matches</div>
        <div class="secondary-list">
    `;

    matches.forEach(match => {
        const char = match.character;
        html += `
            <div class="secondary-item">
                <span class="secondary-emoji">${char.emoji}</span>
                <div class="secondary-info">
                    <span class="secondary-name">${char.name}</span>
                    <span style="color: var(--fb-text-light); font-size: 11px;"> · ${char.mbti}</span>
                </div>
                <span class="secondary-match">${match.matchPercent}%</span>
            </div>
        `;
    });

    html += '</div>';
    elements.secondaryMatches.innerHTML = html;
}

function renderRadarChart(dimScores) {
    const canvas = elements.radarChart;
    const ctx = canvas.getContext('2d');

    const centerX = 150;
    const centerY = 150;
    const radius = 120;

    const dims = ['IE', 'NS', 'TF', 'AR'];
    const scores = dims.map(d => (dimScores[d] + 1) / 2);

    ctx.clearRect(0, 0, 300, 300);

    // 网格
    ctx.strokeStyle = '#ccd0d5';
    ctx.lineWidth = 0.5;
    for (let i = 1; i <= 4; i++) {
        const r = (radius / 4) * i;
        ctx.beginPath();
        for (let j = 0; j < 4; j++) {
            const angle = (j * 90 - 90) * Math.PI / 180;
            const x = centerX + Math.cos(angle) * r;
            const y = centerY + Math.sin(angle) * r;
            if (j === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
    }

    // 轴线
    ctx.strokeStyle = '#ccd0d5';
    ctx.lineWidth = 1;
    for (let i = 0; i < 4; i++) {
        const angle = (i * 90 - 90) * Math.PI / 180;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
        ctx.stroke();
    }

    // 数据区域
    ctx.beginPath();
    scores.forEach((score, i) => {
        const angle = (i * 90 - 90) * Math.PI / 180;
        const r = radius * score;
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(59, 89, 152, 0.25)';
    ctx.fill();
    ctx.strokeStyle = '#3b5998';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 数据点
    scores.forEach((score, i) => {
        const angle = (i * 90 - 90) * Math.PI / 180;
        const r = radius * score;
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = '#A51C30';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
    });

    // 标签
    ctx.font = 'bold 10px Inter, sans-serif';
    ctx.fillStyle = '#606770';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const labels = ['Introvert', 'Sensing', 'Feeling', 'Relationship'];
    const labelsRight = ['Extrovert', 'Intuition', 'Thinking', 'Achievement'];

    labels.forEach((label, i) => {
        const angle = (i * 90 - 90) * Math.PI / 180;
        const x = centerX + Math.cos(angle) * (radius + 22);
        const y = centerY + Math.sin(angle) * (radius + 22);
        ctx.fillText(label, x, y);

        const x2 = centerX - Math.cos(angle) * (radius + 22);
        const y2 = centerY - Math.sin(angle) * (radius + 22);
        ctx.fillText(labelsRight[i], x2, y2);
    });
}

// ===== 事件处理 =====
function handleStart() {
    SoundEffects.init();
    resetState();
    showScreen('quiz');
    renderQuestion();
}

function handlePrev() {
    if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex--;
        renderQuestion();
    }
}

function handleNext() {
    const question = questions[state.currentQuestionIndex];
    const selectedOption = state.answers[question.id];

    if (selectedOption === undefined) return;

    SoundEffects.playSubmit();

    if (state.currentQuestionIndex < questions.length - 1) {
        state.currentQuestionIndex++;
        renderQuestion();
    } else {
        if (Object.keys(state.answers).length < questions.length) {
            const remaining = questions.length - Object.keys(state.answers).length;
            alert(`You have ${remaining} questions left.`);
            for (let i = 0; i < questions.length; i++) {
                if (state.answers[questions[i].id] === undefined) {
                    state.currentQuestionIndex = i;
                    renderQuestion();
                    break;
                }
            }
            return;
        }

        showScreen('result');
        renderResult();
    }
}

function handleQuit() {
    if (confirm('Quit? Your progress will be lost.')) {
        resetState();
        showScreen('start');
    }
}

function handleRestart() {
    resetState();
    showScreen('start');
}

function handleShare() {
    if (!state.result) return;

    const primary = state.result.primaryMatch.character;
    const shareText = `I'm ${primary.name} · ${primary.mbti} in The Social Network personality test.\n\n"${getCharacterLine(state.result.primaryMatch.id)}"\n\nFind out who you are:`;

    if (navigator.share) {
        navigator.share({
            title: 'The Social Network Test',
            text: shareText,
            url: window.location.href
        }).catch(() => { });
    } else {
        navigator.clipboard?.writeText(shareText).then(() => {
            alert('Result copied!');
        }).catch(() => {
            alert(shareText);
        });
    }
}

// ===== 初始化 =====
let matrixRain = null;

function init() {
    // 启动代码雨
    matrixRain = new MatrixRain('matrixRain');
    matrixRain.start();

    // 绑定事件
    elements.startBtn.addEventListener('click', handleStart);
    elements.prevBtn.addEventListener('click', handlePrev);
    elements.nextBtn.addEventListener('click', handleNext);
    elements.quitBtn.addEventListener('click', handleQuit);
    elements.restartBtn.addEventListener('click', handleRestart);
    elements.shareBtn.addEventListener('click', handleShare);

    showScreen('start');

    console.log('✅ Matrix rain started, counter API ready');
}

// 页面加载完成后初始化
window.addEventListener('load', init);
