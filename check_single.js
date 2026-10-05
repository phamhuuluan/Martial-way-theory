const fs = require('fs');
const path = require('path');

const file = '/Users/luanph/Project other/MARTIAL WAY THEORY/content/exam-bank/luc-3.json';
const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
let questions = data.questions || data;

questions.forEach(q => {
    if (q.type === 'single' || q.type === 'multiple') {
        let correct = [];
        if (q.type === 'single') correct.push(q.options[q.correctIndex]);
        if (q.type === 'multiple') {
            q.correctIndices.forEach(idx => correct.push(q.options[idx]));
        }
        console.log(`Q: ${q.question}`);
        console.log(`Ans: ${correct.join(' AND ')}`);
        console.log(`---\n`);
    }
});
