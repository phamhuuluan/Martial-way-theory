const fs = require('fs');
const path = require('path');

const dir = '/Users/luanph/Project other/MARTIAL WAY THEORY/content/exam-bank';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json') && f.startsWith('lam'));

let summary = {};

files.forEach(file => {
    const data = JSON.parse(fs.readFileSync(path.join(dir, file)));
    if (!data.questions) return;
    
    let sourceMap = {};
    data.questions.forEach(q => {
        const sq = q.sourceQuestion || "Unknown";
        sourceMap[sq] = (sourceMap[sq] || 0) + 1;
    });
    
    const counts = Object.values(sourceMap);
    if (counts.length > 0) {
        summary[file] = {
            uniqueTheoryQs: counts.length,
            totalGeneratedQs: data.questions.length,
            min: Math.min(...counts),
            max: Math.max(...counts),
            avg: (data.questions.length / counts.length).toFixed(2),
            distribution: counts.reduce((acc, c) => {
                acc[c] = (acc[c] || 0) + 1;
                return acc;
            }, {})
        };
    }
});

console.log(JSON.stringify(summary, null, 2));
