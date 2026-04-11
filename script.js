// 应用状态
const state = {
    currentScreen: 'start',
    currentQuestionIndex: 0,
    answers: {}, // { questionId: optionIndex }
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
    radarChart: document.getElementById('radarChart')
};

// ========== 辅助函数 ==========
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

// ========== 渲染函数 ==========
function renderQuestion() {
    const question = questions[state.currentQuestionIndex];
    const selectedOption = state.answers[question.id];

    elements.questionText.textContent = question.text;
    elements.currentQ.textContent = state.currentQuestionIndex + 1;
    elements.totalQ.textContent = questions.length;
    elements.dimTag.textContent = question.dimensionName;

    // 更新进度条
    const progress = ((state.currentQuestionIndex + 1) / questions.length) * 100;
    elements.progressFill.style.width = `${progress}%`;

    // 渲染李克特5点量表
    elements.optionsContainer.innerHTML = '';
    const likertLabels = ['非常不同意', '不同意', '中立', '同意', '非常同意'];

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

    // 更新按钮状态
    elements.prevBtn.disabled = state.currentQuestionIndex === 0;

    const isLast = state.currentQuestionIndex === questions.length - 1;
    elements.nextBtn.textContent = isLast ? '查看结果 📊' : '下一题 →';
    elements.nextBtn.disabled = selectedOption === undefined;
}

function selectOption(questionId, optionIndex) {
    state.answers[questionId] = optionIndex;
    renderQuestion();
}

function renderResult() {
    state.result = ScoringEngine.getFullResult(state.answers);
    const primary = state.result.primaryMatch.character;
    const dimScores = state.result.dimensionScores;

    // 头部信息
    elements.resultEmoji.textContent = primary.emoji;
    elements.resultTitle.textContent = primary.name;
    elements.resultSubtitle.textContent = `${primary.mbti} · ${primary.title}`;
    elements.resultQuote.textContent = primary.quote;

    // 描述（包含认知功能）
    let descHtml = `<p>${primary.description.replace(/\n\n/g, '</p><p>')}</p>`;
    descHtml += `<p style="margin-top: 12px; color: var(--accent-cyan); font-size: 13px;">`;
    descHtml += `🧠 认知功能堆栈: ${primary.functionStack.join(' > ')}`;
    descHtml += `</p>`;
    elements.resultDescription.innerHTML = descHtml;

    // 维度解读卡片
    renderDimensionBreakdown(dimScores);

    // 次级匹配
    renderSecondaryMatches();

    // 雷达图
    renderRadarChart(dimScores);
}

function renderDimensionBreakdown(dimScores) {
    const dims = [
        { key: 'IE', name: '能量来源', left: '内向', right: '外向' },
        { key: 'NS', name: '信息处理', left: '实感', right: '直觉' },
        { key: 'TF', name: '决策方式', left: '情感', right: '思考' },
        { key: 'AR', name: '价值驱动', left: '关系', right: '成就' }
    ];

    let html = '';
    dims.forEach(dim => {
        const score = dimScores[dim.key] || 0;
        const interp = ScoringEngine.getDimensionInterpretation(dim.key, score);
        const percent = Math.round((score + 1) * 50);
        const barPosition = percent;

        html += `
            <div class="dim-card">
                <div class="dim-card-header">
                    <span class="dim-card-name">${dim.name}</span>
                    <span class="dim-card-value">${interp.text}</span>
                </div>
                <div class="dim-card-bar">
                    <div class="dim-card-fill" style="width: ${barPosition}%"></div>
                </div>
                <div class="dim-card-desc">
                    <span>${dim.left}</span>
                    <span style="float: right">${dim.right}</span>
                </div>
                <div style="font-size: 11px; color: var(--text-muted); margin-top: 8px;">${interp.desc}</div>
            </div>
        `;
    });

    elements.dimensionBreakdown.innerHTML = html;
}

function renderSecondaryMatches() {
    const matches = state.result.secondaryMatches;

    let html = `
        <div class="secondary-title">📊 其他相似原型 (匹配度)</div>
        <div class="secondary-list">
    `;

    matches.forEach(match => {
        const char = match.character;
        html += `
            <div class="secondary-item">
                <span class="secondary-emoji">${char.emoji}</span>
                <div class="secondary-info">
                    <span class="secondary-name">${char.name}</span>
                    <span style="color: var(--text-muted); font-size: 12px;"> · ${char.mbti}</span>
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
    const scores = dims.map(d => (dimScores[d] + 1) / 2); // 转换到 0-1

    // 清空画布
    ctx.clearRect(0, 0, 300, 300);

    // 绘制背景网格
    ctx.strokeStyle = '#2c3a4a';
    ctx.fillStyle = 'rgba(30, 136, 229, 0.05)';
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

    // 绘制轴线
    ctx.strokeStyle = '#3a4a5a';
    ctx.lineWidth = 1;
    for (let i = 0; i < 4; i++) {
        const angle = (i * 90 - 90) * Math.PI / 180;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
        ctx.stroke();
    }

    // 绘制数据区域
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
    ctx.fillStyle = 'rgba(30, 136, 229, 0.3)';
    ctx.fill();
    ctx.strokeStyle = '#1e88e5';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 绘制数据点
    scores.forEach((score, i) => {
        const angle = (i * 90 - 90) * Math.PI / 180;
        const r = radius * score;
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = '#00bcd4';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
    });

    // 绘制维度标签
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.fillStyle = '#b0bec5';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const labels = ['内向', '实感', '情感', '关系'];
    const labelsRight = ['外向', '直觉', '思考', '成就'];

    labels.forEach((label, i) => {
        const angle = (i * 90 - 90) * Math.PI / 180;
        const x = centerX + Math.cos(angle) * (radius + 20);
        const y = centerY + Math.sin(angle) * (radius + 20);
        ctx.fillText(label, x, y);

        // 另一端标签
        const x2 = centerX - Math.cos(angle) * (radius + 20);
        const y2 = centerY - Math.sin(angle) * (radius + 20);
        ctx.fillText(labelsRight[i], x2, y2);
    });
}

// ========== 事件处理 ==========
function handleStart() {
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

    if (state.currentQuestionIndex < questions.length - 1) {
        state.currentQuestionIndex++;
        renderQuestion();
    } else {
        // 检查是否所有题都答了
        if (Object.keys(state.answers).length < questions.length) {
            alert(`您还有 ${questions.length - Object.keys(state.answers).length} 题未答，请完成所有题目后再查看结果。`);
            // 跳转到第一个未答题
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
    if (confirm('确定要退出测试吗？当前进度将丢失。')) {
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
    const dimScores = state.result.dimensionScores;

    const dimText = [
        `能量来源: ${ScoringEngine.getDimensionInterpretation('IE', dimScores.IE).text}`,
        `信息处理: ${ScoringEngine.getDimensionInterpretation('NS', dimScores.NS).text}`,
        `决策方式: ${ScoringEngine.getDimensionInterpretation('TF', dimScores.TF).text}`,
        `价值驱动: ${ScoringEngine.getDimensionInterpretation('AR', dimScores.AR).text}`
    ].join(' · ');

    const shareText = `我在《社交网络》人格维度测试中的原型是：\n\n${primary.emoji} ${primary.name} · ${primary.mbtI} ${primary.title}\n\n"${primary.quote}"\n\n📊 我的维度画像:\n${dimText}\n\n你也来测测看！`;

    if (navigator.share) {
        navigator.share({
            title: '社交网络人格维度测试',
            text: shareText,
            url: window.location.href
        }).catch(() => { });
    } else {
        navigator.clipboard?.writeText(shareText).then(() => {
            alert('结果已复制到剪贴板！');
        }).catch(() => {
            alert(shareText);
        });
    }
}

// ========== 初始化 ==========
function init() {
    elements.startBtn.addEventListener('click', handleStart);
    elements.prevBtn.addEventListener('click', handlePrev);
    elements.nextBtn.addEventListener('click', handleNext);
    elements.quitBtn.addEventListener('click', handleQuit);
    elements.restartBtn.addEventListener('click', handleRestart);
    elements.shareBtn.addEventListener('click', handleShare);

    showScreen('start');
}

init();