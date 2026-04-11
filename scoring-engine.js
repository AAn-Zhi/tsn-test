// 计分引擎 - 处理48题数据，计算四个维度的得分并匹配角色

const ScoringEngine = {
    // 计算各维度得分（-1到1的标准化分数）
    calculateDimensionScores(answers) {
        const scores = {
            IE: { sum: 0, count: 0 },
            NS: { sum: 0, count: 0 },
            TF: { sum: 0, count: 0 },
            AR: { sum: 0, count: 0 }
        };

        // 遍历所有已回答的问题
        Object.entries(answers).forEach(([qId, optIndex]) => {
            const question = questions.find(q => q.id === parseInt(qId));
            if (!question) return;

            const option = question.options[optIndex];
            const dimension = question.dimension;

            if (scores[dimension]) {
                scores[dimension].sum += option.value;
                scores[dimension].count++;
            }
        });

        // 归一化到 -1 到 1 之间
        const normalized = {};
        Object.keys(scores).forEach(dim => {
            const { sum, count } = scores[dim];
            // 每题最大绝对值为2，所以除以 (count * 2) 得到 -1 到 1 的值
            normalized[dim] = count > 0 ? sum / (count * 2) : 0;
        });

        return normalized;
    },

    // 计算与各角色的匹配度（余弦相似度）
    calculateMatchScores(dimensionScores) {
        const matches = [];

        Object.entries(characters).forEach(([charId, char]) => {
            const charDims = char.dimensions;

            // 计算余弦相似度
            let dotProduct = 0;
            let userMagnitude = 0;
            let charMagnitude = 0;

            const dims = ['IE', 'NS', 'TF', 'AR'];
            dims.forEach(dim => {
                const userVal = dimensionScores[dim] || 0;
                const charVal = charDims[dim] || 0;

                dotProduct += userVal * charVal;
                userMagnitude += userVal * userVal;
                charMagnitude += charVal * charVal;
            });

            userMagnitude = Math.sqrt(userMagnitude);
            charMagnitude = Math.sqrt(charMagnitude);

            // 相似度 = 余弦相似度，范围 -1 到 1，转换为 0 到 100%
            let similarity = 0;
            if (userMagnitude > 0 && charMagnitude > 0) {
                similarity = dotProduct / (userMagnitude * charMagnitude);
            }

            // 映射到 0-100%
            const matchPercent = Math.round((similarity + 1) * 50);

            matches.push({
                id: charId,
                character: char,
                similarity: similarity,
                matchPercent: Math.max(0, Math.min(100, matchPercent))
            });
        });

        // 按匹配度排序
        matches.sort((a, b) => b.similarity - a.similarity);

        return matches;
    },

    // 获取完整的测评结果
    getFullResult(answers) {
        const dimensionScores = this.calculateDimensionScores(answers);
        const matches = this.calculateMatchScores(dimensionScores);

        return {
            dimensionScores: dimensionScores,
            primaryMatch: matches[0],
            secondaryMatches: matches.slice(1, 4),
            allMatches: matches
        };
    },

    // 获取维度解读文本
    getDimensionInterpretation(dimension, score) {
        const interpretations = {
            IE: {
                negative: { text: '内向型', desc: '你从独处中获取能量。深度思考是你的优势，大型社交场合可能让你感到消耗。你更倾向于少数深度的关系。' },
                neutral: { text: '平衡型', desc: '你在独处和社交之间灵活切换。既能享受独处的深度，也能在社交中找到乐趣。' },
                positive: { text: '外向型', desc: '你从与他人的互动中获取能量。你善于表达，在群体中感到自在，社交让你充满活力。' }
            },
            NS: {
                negative: { text: '实感型', desc: '你关注具体、可感知的现实。你相信经验和数据，喜欢明确的流程和实际的成果。' },
                neutral: { text: '平衡型', desc: '你既能处理具体事务，也能进行抽象思考。在现实和想象之间灵活游走。' },
                positive: { text: '直觉型', desc: '你关注模式、可能性和未来。你喜欢探索新想法，相信直觉，善于看到事物的深层含义。' }
            },
            TF: {
                negative: { text: '情感型', desc: '你依据个人价值观和对他人的影响做决策。你重视和谐，善于共情，关心他人的感受。' },
                neutral: { text: '平衡型', desc: '你在逻辑和情感之间寻找平衡。既能理性分析，也会考虑人的因素。' },
                positive: { text: '思考型', desc: '你依据逻辑和客观标准做决策。你追求真理和正确，善于分析，重视效率和结果。' }
            },
            AR: {
                negative: { text: '关系导向', desc: '你以人际关系为价值核心。你重视爱与被爱，认为生命的意义在于与他人的连接。' },
                neutral: { text: '平衡型', desc: '你在成就和关系之间寻找平衡。既追求个人成长，也珍视身边的人。' },
                positive: { text: '成就导向', desc: '你以成就和自我实现为价值核心。你渴望留下印记，追求卓越，不断超越自己。' }
            }
        };

        const interp = interpretations[dimension];
        if (score < -0.2) return interp.negative;
        if (score > 0.2) return interp.positive;
        return interp.neutral;
    }
};