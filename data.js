// ===== 角色定义（基于MBTI+大五的复合模型）=====
const characters = {
    mark: {
        id: 'mark',
        name: 'Mark Zuckerberg',
        mbti: 'INTJ',
        title: '建筑师 · 系统构建者',
        emoji: '💻',
        quote: '"You\'re not an asshole, Mark. You\'re just trying so hard to be."',
        description: '你是典型的INTJ型人格——战略思维者，用系统性的逻辑构建世界。你的认知功能组合是 Ni-Te-Fi-Se：主导的内倾直觉让你能预见模式和未来走向，辅助的外倾思考让你善于制定高效的系统化方案。\n\n在社交网络中，你是规则的制定者而非遵循者。你不屑于社交礼节，更关注事情的本质和效率。这种特质让你能创造出改变世界的产品，但也可能让你在人际关系中显得冷漠。\n\n你的优势：战略眼光、系统思维、高效执行。\n你的盲点：情感表达、社交润滑、共情能力。',
        dimensions: { IE: -0.8, NS: 0.7, TF: 0.9, AR: 0.8 },
        functionStack: ['Ni', 'Te', 'Fi', 'Se']
    },
    eduardo: {
        id: 'eduardo',
        name: 'Eduardo Saverin',
        mbti: 'ESFJ',
        title: '执政官 · 忠诚守护者',
        emoji: '🤝',
        quote: '"I was your only friend. You had one friend."',
        description: '你是典型的ESFJ型人格——忠诚的守护者，以人际关系为核心。你的认知功能组合是 Fe-Si-Ne-Ti：主导的外倾情感让你敏锐感知他人情绪和维护和谐，辅助的内倾实感让你重视传统和承诺。\n\n在社交网络中，你是团队的情感支柱和道德底线。你重视信任和忠诚，愿意为珍视的人付出一切。但当遭遇背叛时，你的情感反应会非常强烈。\n\n你的优势：共情能力、忠诚可靠、维护和谐。\n你的盲点：过度依赖他人认可、难以接受变革、容易情感受伤。',
        dimensions: { IE: 0.7, NS: -0.6, TF: -0.8, AR: -0.7 },
        functionStack: ['Fe', 'Si', 'Ne', 'Ti']
    },
    sean: {
        id: 'sean',
        name: 'Sean Parker',
        mbti: 'ENTP',
        title: '辩论家 · 魅力机会主义者',
        emoji: '🍸',
        quote: '"A million dollars isn\'t cool. You know what\'s cool? A billion dollars."',
        description: '你是典型的ENTP型人格——魅力四射的创新者，善于发现可能性和连接资源。你的认知功能组合是 Ne-Ti-Fe-Si：主导的外倾直觉让你看到无限可能和潜在机会，辅助的内倾思考让你善于分析系统的漏洞并加以利用。\n\n在社交网络中，你是那个把想法变得性感的人。你能让任何人相信你的愿景，但也容易因为过于张扬而树敌。\n\n你的优势：创意无限、说服力强、善于发现机会。\n你的盲点：执行力不足、容易厌倦、可能被认为不靠谱。',
        dimensions: { IE: 0.9, NS: 0.8, TF: 0.5, AR: 0.9 },
        functionStack: ['Ne', 'Ti', 'Fe', 'Si']
    },
    winklevoss: {
        id: 'winklevoss',
        name: 'Winklevoss 兄弟',
        mbti: 'ESTJ',
        title: '总经理 · 传统精英',
        emoji: '🚣',
        quote: '"I\'m 6\'5", 220, and there\'s two of me."',
        description: '你是典型的ESTJ型人格——秩序的维护者，相信规则和努力的价值。你的认知功能组合是 Te-Si-Ne-Fi：主导的外倾思考让你善于组织和执行，辅助的内倾实感让你依赖过往经验和既定程序。\n\n在社交网络中，你代表了传统精英的路径：名校、优渥背景、正当竞争。但当遇到不按规则出牌的对手时，你可能会感到无力和愤怒。\n\n你的优势：组织能力、执行力、正直可靠。\n你的盲点：灵活性不足、难以应对非常规手段、可能显得刻板。',
        dimensions: { IE: 0.5, NS: -0.8, TF: 0.7, AR: 0.3 },
        functionStack: ['Te', 'Si', 'Ne', 'Fi']
    },
    dustin: {
        id: 'dustin',
        name: 'Dustin Moskovitz',
        mbti: 'ISTJ',
        title: '物流师 · 沉默的执行者',
        emoji: '⚙️',
        quote: '"When you go fishing, you don\'t catch all the fish."',
        description: '你是典型的ISTJ型人格——可靠务实的执行者，用行动而非言语证明价值。你的认知功能组合是 Si-Te-Fi-Ne：主导的内倾实感让你注重细节和稳定性，辅助的外倾思考让你高效完成任务。\n\n在社交网络中，你是那个在天才们争吵时默默把代码写完的人。你不追求聚光灯，但你的产出无可替代。\n\n你的优势：可靠务实、专注细节、稳定输出。\n你的盲点：不善自我宣传、可能被忽视、抗拒突然的变化。',
        dimensions: { IE: -0.6, NS: -0.7, TF: 0.4, AR: 0.2 },
        functionStack: ['Si', 'Te', 'Fi', 'Ne']
    },
    divya: {
        id: 'divya',
        name: 'Divya Narendra',
        mbti: 'INFJ',
        title: '提倡者 · 理想主义愿景家',
        emoji: '🎯',
        quote: '"The Harvard Connection is about creating a trusted community."',
        description: '你是典型的INFJ型人格——理想主义的愿景家，相信自己的想法能创造更好的世界。你的认知功能组合是 Ni-Fe-Ti-Se：主导的内倾直觉让你有清晰的远景，辅助的外倾情感让你关注人的价值和连接。\n\n在社交网络中，你是有想法并愿意付诸行动的人。但当事情偏离你的愿景时，你可能会陷入执着。\n\n你的优势：愿景清晰、坚持理想、洞察人性。\n你的盲点：难以放手、可能过于理想化、对批评敏感。',
        dimensions: { IE: -0.4, NS: 0.6, TF: -0.6, AR: 0.1 },
        functionStack: ['Ni', 'Fe', 'Ti', 'Se']
    },
    christy: {
        id: 'christy',
        name: 'Christy Lee',
        mbti: 'ISFP',
        title: '探险家 · 自由灵魂',
        emoji: '🎨',
        quote: '"You better lawyer up, asshole."',
        description: '你是典型的ISFP型人格——活在当下的艺术家，追求真实的自我表达。你的认知功能组合是 Fi-Se-Ni-Te：主导的内倾情感让你有强烈的个人价值观，辅助的外倾实感让你善于捕捉当下的美和体验。\n\n在社交网络中，你像Christy一样——平时随性洒脱，但触及底线时会爆发出惊人的力量。你不喜欢被规则束缚，按自己的节奏生活。\n\n你的优势：真实自我、审美敏锐、忠于内心。\n你的盲点：可能显得任性、不善长期规划、情绪波动大。',
        dimensions: { IE: -0.5, NS: -0.3, TF: -0.9, AR: -0.4 },
        functionStack: ['Fi', 'Se', 'Ni', 'Te']
    },
    erica: {
        id: 'erica',
        name: 'Erica Albright',
        mbti: 'INFP',
        title: '调停者 · 敏感的理想主义者',
        emoji: '🌙',
        quote: '"You\'re going to go through life thinking that girls don\'t like you because you\'re a nerd."',
        description: '你是典型的INFP型人格——内心丰富的理想主义者，追求真实和意义。你的认知功能组合是 Fi-Ne-Si-Te：主导的内倾情感让你有深刻的价值判断，辅助的外倾直觉让你能看到人的潜力和可能性。\n\n在社交网络中，你像Erica一样——能一眼看穿他人的本质，不会因为对方的外在成就而改变判断。你重视真实的情感连接，对虚伪和功利极度敏感。\n\n你的优势：深度共情、价值观坚定、看到人的本质。\n你的盲点：容易理想化他人、难以妥协、可能显得过于敏感。',
        dimensions: { IE: -0.7, NS: 0.5, TF: -0.9, AR: -0.8 },
        functionStack: ['Fi', 'Ne', 'Si', 'Te']
    }
};

// ===== 题库：48题，四个维度各12题 =====
// 维度说明：
// IE: Introversion(-) vs Extraversion(+)  内向 vs 外向
// NS: iNtuition(+) vs Sensing(-)          直觉 vs 实感
// TF: Thinking(+) vs Feeling(-)           思考 vs 情感
// AR: Achievement(+) vs Relationship(-)   成就 vs 关系

const questions = [
    // ===== 维度1: 能量来源 (IE) - 12题 =====
    {
        id: 1,
        dimension: 'IE',
        dimensionName: '能量来源',
        text: '经过一周的紧张工作后，你更倾向于如何度过周末？',
        options: [
            { text: '一个人安静地待着，看书、玩游戏或者思考', value: -2 },
            { text: '和亲密的一两个朋友小聚', value: -1 },
            { text: '不确定，看心情', value: 0 },
            { text: '参加一些社交活动，见见朋友', value: 1 },
            { text: '参加大型派对或活动，认识新朋友', value: 2 }
        ]
    },
    {
        id: 2,
        dimension: 'IE',
        dimensionName: '能量来源',
        text: '在团队讨论中，你通常扮演什么角色？',
        options: [
            { text: '主要倾听，偶尔发言', value: -2 },
            { text: '思考成熟后才表达观点', value: -1 },
            { text: '根据讨论情况灵活参与', value: 0 },
            { text: '积极分享自己的想法', value: 1 },
            { text: '主导讨论，激发他人参与', value: 2 }
        ]
    },
    {
        id: 3,
        dimension: 'IE',
        dimensionName: '能量来源',
        text: '以下哪种描述更符合你的社交状态？',
        options: [
            { text: '社交让我感到消耗，需要独处恢复', value: -2 },
            { text: '偶尔社交可以，但更喜欢独处', value: -1 },
            { text: '两者平衡，都可以接受', value: 0 },
            { text: '喜欢社交，但有时也需要独处', value: 1 },
            { text: '社交让我充满能量，独处反而无聊', value: 2 }
        ]
    },
    {
        id: 4,
        dimension: 'IE',
        dimensionName: '能量来源',
        text: '当遇到一个复杂问题时，你更倾向于？',
        options: [
            { text: '独自深入思考，直到找到答案', value: -2 },
            { text: '先自己思考，再找信任的人讨论', value: -1 },
            { text: '看情况，有时独自有时讨论', value: 0 },
            { text: '喜欢和人讨论，碰撞出想法', value: 1 },
            { text: '立即找人头脑风暴，边聊边想', value: 2 }
        ]
    },
    {
        id: 5,
        dimension: 'IE',
        dimensionName: '能量来源',
        text: '在社交场合认识新朋友时，你通常会？',
        options: [
            { text: '感到不自在，希望有人介绍', value: -2 },
            { text: '等待别人主动来搭话', value: -1 },
            { text: '看场合，有时主动有时被动', value: 0 },
            { text: '会主动和看起来有趣的人聊天', value: 1 },
            { text: '轻松自如，能和任何人开启对话', value: 2 }
        ]
    },
    {
        id: 6,
        dimension: 'IE',
        dimensionName: '能量来源',
        text: '你更倾向于哪种工作环境？',
        options: [
            { text: '独立的私人办公室', value: -2 },
            { text: '安静的角落，不被打扰', value: -1 },
            { text: '灵活的环境，可以切换', value: 0 },
            { text: '开放空间，方便交流', value: 1 },
            { text: '热闹的共享空间，随时互动', value: 2 }
        ]
    },
    {
        id: 7,
        dimension: 'IE',
        dimensionName: '能量来源',
        text: '当你有好消息时，第一反应是？',
        options: [
            { text: '自己默默开心就好', value: -2 },
            { text: '告诉最亲近的一两个人', value: -1 },
            { text: '看情况决定是否分享', value: 0 },
            { text: '想和朋友们分享', value: 1 },
            { text: '立刻广而告之', value: 2 }
        ]
    },
    {
        id: 8,
        dimension: 'IE',
        dimensionName: '能量来源',
        text: '你如何评价自己的社交圈？',
        options: [
            { text: '很小，只有几个深交的朋友', value: -2 },
            { text: '小而精，都是信任的人', value: -1 },
            { text: '适中，不同类型的朋友', value: 0 },
            { text: '比较广，认识不少人', value: 1 },
            { text: '非常广，朋友遍天下', value: 2 }
        ]
    },
    {
        id: 9,
        dimension: 'IE',
        dimensionName: '能量来源',
        text: '在会议或课堂上被突然点名发言，你会？',
        options: [
            { text: '非常紧张，脑子一片空白', value: -2 },
            { text: '有点慌，但能勉强应付', value: -1 },
            { text: '看状态，有时紧张有时还好', value: 0 },
            { text: '能比较自如地表达', value: 1 },
            { text: '完全没问题，甚至有点享受', value: 2 }
        ]
    },
    {
        id: 10,
        dimension: 'IE',
        dimensionName: '能量来源',
        text: '你更喜欢哪种沟通方式？',
        options: [
            { text: '文字沟通，有思考时间', value: -2 },
            { text: '文字为主，偶尔语音', value: -1 },
            { text: '看对象和内容决定', value: 0 },
            { text: '喜欢语音或视频，更直接', value: 1 },
            { text: '必须面对面，能量才流动', value: 2 }
        ]
    },
    {
        id: 11,
        dimension: 'IE',
        dimensionName: '能量来源',
        text: '朋友突然约你今晚出去玩，你的反应是？',
        options: [
            { text: '找借口拒绝，不想出门', value: -2 },
            { text: '犹豫，需要考虑一下', value: -1 },
            { text: '看是谁约和去哪决定', value: 0 },
            { text: '如果没有其他安排就会去', value: 1 },
            { text: '立刻答应，随时准备好', value: 2 }
        ]
    },
    {
        id: 12,
        dimension: 'IE',
        dimensionName: '能量来源',
        text: '你觉得自己更像哪种人？',
        options: [
            { text: '观察者，在人群边缘观察一切', value: -2 },
            { text: '偶尔参与者，选择性加入', value: -1 },
            { text: '灵活切换，看情况', value: 0 },
            { text: '积极参与者，喜欢融入', value: 1 },
            { text: '中心人物，自然成为焦点', value: 2 }
        ]
    },

    // ===== 维度2: 信息处理 (NS) - 12题 =====
    {
        id: 13,
        dimension: 'NS',
        dimensionName: '信息处理',
        text: '当你学习新事物时，你更关注？',
        options: [
            { text: '具体的事实、数据和操作步骤', value: -2 },
            { text: '主要关注实际应用层面', value: -1 },
            { text: '两者都关注', value: 0 },
            { text: '更关注背后的理论和模式', value: 1 },
            { text: '关注宏观概念、可能性和未来潜力', value: 2 }
        ]
    },
    {
        id: 14,
        dimension: 'NS',
        dimensionName: '信息处理',
        text: '在解决问题时，你更依赖？',
        options: [
            { text: '过往的经验和已验证的方法', value: -2 },
            { text: '偏向经验，但也会尝试新方法', value: -1 },
            { text: '经验和新想法并用', value: 0 },
            { text: '喜欢探索新的可能性', value: 1 },
            { text: '直觉和灵感，相信新的可能性', value: 2 }
        ]
    },
    {
        id: 15,
        dimension: 'NS',
        dimensionName: '信息处理',
        text: '以下哪种描述更符合你的思维方式？',
        options: [
            { text: '脚踏实地，关注眼前现实', value: -2 },
            { text: '偏重现实，偶尔畅想未来', value: -1 },
            { text: '在现实和想象之间切换', value: 0 },
            { text: '喜欢思考可能性和未来', value: 1 },
            { text: '天马行空，充满各种想法', value: 2 }
        ]
    },
    {
        id: 16,
        dimension: 'NS',
        dimensionName: '信息处理',
        text: '读一本书或看一部电影时，你更关注？',
        options: [
            { text: '情节、细节和具体内容', value: -2 },
            { text: '主要是情节和人物', value: -1 },
            { text: '情节和主题都关注', value: 0 },
            { text: '喜欢挖掘深层含义和象征', value: 1 },
            { text: '关注主题、隐喻和潜在信息', value: 2 }
        ]
    },
    {
        id: 17,
        dimension: 'NS',
        dimensionName: '信息处理',
        text: '对于规则和流程，你的态度是？',
        options: [
            { text: '遵守既定规则，按流程办事', value: -2 },
            { text: '通常遵守，除非有充分理由改变', value: -1 },
            { text: '灵活对待，看情况', value: 0 },
            { text: '喜欢优化和改良现有流程', value: 1 },
            { text: '规则就是用来打破和重新定义的', value: 2 }
        ]
    },
    {
        id: 18,
        dimension: 'NS',
        dimensionName: '信息处理',
        text: '你更擅长记住？',
        options: [
            { text: '具体的事实、名字、日期', value: -2 },
            { text: '偏向具体信息', value: -1 },
            { text: '差不多', value: 0 },
            { text: '偏向整体印象和感觉', value: 1 },
            { text: '整体印象、概念、模式', value: 2 }
        ]
    },
    {
        id: 19,
        dimension: 'NS',
        dimensionName: '信息处理',
        text: '当描述一个事物时，你更倾向于？',
        options: [
            { text: '描述具体的细节和特征', value: -2 },
            { text: '先细节后整体', value: -1 },
            { text: '两者都有', value: 0 },
            { text: '先整体印象后细节', value: 1 },
            { text: '用比喻和抽象概念来描述', value: 2 }
        ]
    },
    {
        id: 20,
        dimension: 'NS',
        dimensionName: '信息处理',
        text: '面对一个模糊的任务，你会？',
        options: [
            { text: '感到不舒服，需要明确指示', value: -2 },
            { text: '希望有更多具体信息', value: -1 },
            { text: '可以接受一定程度的模糊', value: 0 },
            { text: '喜欢有一定的发挥空间', value: 1 },
            { text: '享受自由度，自己定义方向', value: 2 }
        ]
    },
    {
        id: 21,
        dimension: 'NS',
        dimensionName: '信息处理',
        text: '你更欣赏哪种类型的创意？',
        options: [
            { text: '对现有事物的精细打磨和优化', value: -2 },
            { text: '渐进式的改良创新', value: -1 },
            { text: '都喜欢', value: 0 },
            { text: '有突破性的新想法', value: 1 },
            { text: '颠覆性的、改变范式的创意', value: 2 }
        ]
    },
    {
        id: 22,
        dimension: 'NS',
        dimensionName: '信息处理',
        text: '在做决策时，你更看重？',
        options: [
            { text: '过去的经验和数据', value: -2 },
            { text: '主要看经验和实际情况', value: -1 },
            { text: '经验和直觉并重', value: 0 },
            { text: '偏向直觉和未来可能性', value: 1 },
            { text: '直觉、愿景和未来潜力', value: 2 }
        ]
    },
    {
        id: 23,
        dimension: 'NS',
        dimensionName: '信息处理',
        text: '别人通常如何评价你的想法？',
        options: [
            { text: '务实、接地气', value: -2 },
            { text: '偏务实', value: -1 },
            { text: '务实和创意都有', value: 0 },
            { text: '有创意、有新意', value: 1 },
            { text: '天马行空、超前', value: 2 }
        ]
    },
    {
        id: 24,
        dimension: 'NS',
        dimensionName: '信息处理',
        text: '你更相信？',
        options: [
            { text: '眼见为实，具体可感知的事物', value: -2 },
            { text: '偏向相信可见的证据', value: -1 },
            { text: '视情况而定', value: 0 },
            { text: '偏向相信直觉', value: 1 },
            { text: '直觉和第六感', value: 2 }
        ]
    },

    // ===== 维度3: 决策方式 (TF) - 12题 =====
    {
        id: 25,
        dimension: 'TF',
        dimensionName: '决策方式',
        text: '在做重要决定时，你更依赖？',
        options: [
            { text: '客观逻辑和数据分析', value: 2 },
            { text: '偏向逻辑分析', value: 1 },
            { text: '两者平衡', value: 0 },
            { text: '偏向个人价值观和感受', value: -1 },
            { text: '个人价值观和对他人的影响', value: -2 }
        ]
    },
    {
        id: 26,
        dimension: 'TF',
        dimensionName: '决策方式',
        text: '当团队中出现分歧时，你更倾向于？',
        options: [
            { text: '找出最合理的方案，不管谁提出的', value: 2 },
            { text: '分析利弊，选择最优解', value: 1 },
            { text: '平衡逻辑和人际关系', value: 0 },
            { text: '考虑每个人的感受，寻求共识', value: -1 },
            { text: '维护团队和谐，即使方案不是最优', value: -2 }
        ]
    },
    {
        id: 27,
        dimension: 'TF',
        dimensionName: '决策方式',
        text: '评价一个人的工作时，你更看重？',
        options: [
            { text: '纯粹的结果和效率', value: 2 },
            { text: '主要看结果', value: 1 },
            { text: '结果和过程都看', value: 0 },
            { text: '也会考虑努力程度和态度', value: -1 },
            { text: '付出的努力和过程中的成长', value: -2 }
        ]
    },
    {
        id: 28,
        dimension: 'TF',
        dimensionName: '决策方式',
        text: '当朋友向你倾诉问题时，你通常？',
        options: [
            { text: '分析问题，给出解决方案', value: 2 },
            { text: '听完后帮忙分析', value: 1 },
            { text: '既倾听也会给建议', value: 0 },
            { text: '主要是倾听和共情', value: -1 },
            { text: '专注倾听，给予情感支持', value: -2 }
        ]
    },
    {
        id: 29,
        dimension: 'TF',
        dimensionName: '决策方式',
        text: '你如何看待批评？',
        options: [
            { text: '只要是客观的，就能坦然接受', value: 2 },
            { text: '可以接受建设性批评', value: 1 },
            { text: '看批评的方式和来源', value: 0 },
            { text: '会有点不舒服，尽量不去想', value: -1 },
            { text: '很容易受影响，需要时间消化', value: -2 }
        ]
    },
    {
        id: 30,
        dimension: 'TF',
        dimensionName: '决策方式',
        text: '在竞争环境中，你的态度是？',
        options: [
            { text: '公平竞争，胜者为王', value: 2 },
            { text: '喜欢竞争，但遵守规则', value: 1 },
            { text: '可以接受适度竞争', value: 0 },
            { text: '不太喜欢竞争，更看重合作', value: -1 },
            { text: '避免竞争，更看重和谐关系', value: -2 }
        ]
    },
    {
        id: 31,
        dimension: 'TF',
        dimensionName: '决策方式',
        text: '当需要传达坏消息时，你会？',
        options: [
            { text: '直接、清晰地传达事实', value: 2 },
            { text: '比较直接，但注意措辞', value: 1 },
            { text: '看情况调整方式', value: 0 },
            { text: '会委婉一些，照顾对方感受', value: -1 },
            { text: '尽量委婉，避免伤害对方', value: -2 }
        ]
    },
    {
        id: 32,
        dimension: 'TF',
        dimensionName: '决策方式',
        text: '你更尊重哪种人？',
        options: [
            { text: '能力强、逻辑清晰的人', value: 2 },
            { text: '能力出众的人', value: 1 },
            { text: '能力和品德都看重', value: 0 },
            { text: '善良、有同理心的人', value: -1 },
            { text: '真诚、温暖、关心他人的人', value: -2 }
        ]
    },
    {
        id: 33,
        dimension: 'TF',
        dimensionName: '决策方式',
        text: '在讨论中，你发现自己错了，你会？',
        options: [
            { text: '坦然承认，感谢对方指出', value: 2 },
            { text: '承认错误，但会解释原因', value: 1 },
            { text: '看情况，有时承认有时坚持', value: 0 },
            { text: '有点尴尬，不太愿意承认', value: -1 },
            { text: '很难承认，会为自己辩护', value: -2 }
        ]
    },
    {
        id: 34,
        dimension: 'TF',
        dimensionName: '决策方式',
        text: '你认为以下哪个更重要？',
        options: [
            { text: '真相和正确，即使让人不舒服', value: 2 },
            { text: '真相重要，但要注意方式', value: 1 },
            { text: '两者都重要，需要平衡', value: 0 },
            { text: '和谐重要，有时可以不那么较真', value: -1 },
            { text: '和谐和关系，胜过绝对的正确', value: -2 }
        ]
    },
    {
        id: 35,
        dimension: 'TF',
        dimensionName: '决策方式',
        text: '当规则与个人情况冲突时，你会？',
        options: [
            { text: '坚持规则，一视同仁', value: 2 },
            { text: '倾向遵守规则', value: 1 },
            { text: '看具体情况', value: 0 },
            { text: '考虑个人情况，适当灵活', value: -1 },
            { text: '以人为本，规则可以变通', value: -2 }
        ]
    },
    {
        id: 36,
        dimension: 'TF',
        dimensionName: '决策方式',
        text: '你更容易被什么说服？',
        options: [
            { text: '严谨的数据和逻辑论证', value: 2 },
            { text: '清晰的逻辑和事实', value: 1 },
            { text: '逻辑和情感都起作用', value: 0 },
            { text: '真诚的表达和个人故事', value: -1 },
            { text: '打动人心的故事和情感', value: -2 }
        ]
    },

    // ===== 维度4: 价值驱动 (AR) - 12题 =====
    {
        id: 37,
        dimension: 'AR',
        dimensionName: '价值驱动',
        text: '你的人生目标更偏向？',
        options: [
            { text: '取得卓越成就，留下印记', value: 2 },
            { text: '实现个人目标和抱负', value: 1 },
            { text: '成就和关系都重要', value: 0 },
            { text: '有稳定幸福的人际关系', value: -1 },
            { text: '和爱的人一起过有意义的生活', value: -2 }
        ]
    },
    {
        id: 38,
        dimension: 'AR',
        dimensionName: '价值驱动',
        text: '在事业和家庭的权衡中，你更倾向于？',
        options: [
            { text: '事业优先，其他可以等', value: 2 },
            { text: '偏向事业，但也会顾及家庭', value: 1 },
            { text: '努力寻找平衡', value: 0 },
            { text: '偏向家庭，但也不会放弃事业', value: -1 },
            { text: '家庭和关系永远是第一位的', value: -2 }
        ]
    },
    {
        id: 39,
        dimension: 'AR',
        dimensionName: '价值驱动',
        text: '以下哪种情况更让你满足？',
        options: [
            { text: '完成一个有挑战的项目', value: 2 },
            { text: '达成一个重要的个人目标', value: 1 },
            { text: '都有满足感', value: 0 },
            { text: '帮助了朋友或家人', value: -1 },
            { text: '和重要的人度过美好时光', value: -2 }
        ]
    },
    {
        id: 40,
        dimension: 'AR',
        dimensionName: '价值驱动',
        text: '你如何看待成功？',
        options: [
            { text: '影响力、成就和地位', value: 2 },
            { text: '实现个人目标和获得认可', value: 1 },
            { text: '多维度的，包含多个方面', value: 0 },
            { text: '做有意义的事，被爱和尊重', value: -1 },
            { text: '内心的平静和关系的质量', value: -2 }
        ]
    },
    {
        id: 41,
        dimension: 'AR',
        dimensionName: '价值驱动',
        text: '当你需要在帮助朋友和完成工作之间选择时？',
        options: [
            { text: '通常会优先完成工作', value: 2 },
            { text: '看工作的重要程度', value: 1 },
            { text: '尽量两全，或轮流优先', value: 0 },
            { text: '看朋友的需求有多紧急', value: -1 },
            { text: '通常会优先帮助朋友', value: -2 }
        ]
    },
    {
        id: 42,
        dimension: 'AR',
        dimensionName: '价值驱动',
        text: '你更害怕哪种情况？',
        options: [
            { text: '一事无成，没有留下任何东西', value: 2 },
            { text: '无法实现自己的潜力', value: 1 },
            { text: '两者都怕', value: 0 },
            { text: '失去重要的人', value: -1 },
            { text: '孤独终老，没有人真正在乎我', value: -2 }
        ]
    },
    {
        id: 43,
        dimension: 'AR',
        dimensionName: '价值驱动',
        text: '在团队合作中，你更看重？',
        options: [
            { text: '效率和产出', value: 2 },
            { text: '主要看结果和效率', value: 1 },
            { text: '效率和团队氛围并重', value: 0 },
            { text: '良好的合作氛围', value: -1 },
            { text: '团队成员之间的关系和信任', value: -2 }
        ]
    },
    {
        id: 44,
        dimension: 'AR',
        dimensionName: '价值驱动',
        text: '别人通常认为你？',
        options: [
            { text: '目标明确，有野心', value: 2 },
            { text: '比较有追求', value: 1 },
            { text: '看情况', value: 0 },
            { text: '重感情，有人情味', value: -1 },
            { text: '温暖、体贴、重视关系', value: -2 }
        ]
    },
    {
        id: 45,
        dimension: 'AR',
        dimensionName: '价值驱动',
        text: '如果有一个机会能大幅提升你的事业但需要搬离亲友？',
        options: [
            { text: '毫不犹豫接受', value: 2 },
            { text: '大概率会接受', value: 1 },
            { text: '非常纠结', value: 0 },
            { text: '可能会拒绝', value: -1 },
            { text: '为了亲友，拒绝这个机会', value: -2 }
        ]
    },
    {
        id: 46,
        dimension: 'AR',
        dimensionName: '价值驱动',
        text: '你更愿意把时间花在？',
        options: [
            { text: '学习和提升自己', value: 2 },
            { text: '做有意义和有产出的事', value: 1 },
            { text: '两者都花时间', value: 0 },
            { text: '和朋友家人相处', value: -1 },
            { text: '维护和深化重要关系', value: -2 }
        ]
    },
    {
        id: 47,
        dimension: 'AR',
        dimensionName: '价值驱动',
        text: '当你的成就被忽视时，你会？',
        options: [
            { text: '非常在意，会争取应有的认可', value: 2 },
            { text: '有点在意，希望被看到', value: 1 },
            { text: '看情况', value: 0 },
            { text: '只要自己知道价值就好', value: -1 },
            { text: '不太在意，内心认可更重要', value: -2 }
        ]
    },
    {
        id: 48,
        dimension: 'AR',
        dimensionName: '价值驱动',
        text: '你的人生信条更接近？',
        options: [
            { text: '要么不做，要做就做最好', value: 2 },
            { text: '不断超越自己', value: 1 },
            { text: '平衡发展', value: 0 },
            { text: '珍惜身边的人', value: -1 },
            { text: '爱与被爱是生命的意义', value: -2 }
        ]
    }
];