const fs = require('fs');
const path = require('path');

const examBankDir = '/Users/luanph/Project other/MARTIAL WAY THEORY/content/exam-bank';
const files = fs.readdirSync(examBankDir).filter(f => f.endsWith('.json'));

for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(examBankDir, file), 'utf-8'));
    let questions = Array.isArray(data) ? data : data.questions || [];
    
    // Map filename to expected belt prefix
    let expectedPrefix = file.split('.')[0].replace(/-\d+$/, ''); 
    // Wait, luc-3.json expects green-lesson-03
    // But luc-4.json expects green-lesson-04
    
    questions.forEach(q => {
        let lessonBelongsTo = q.lessonId || q.lesson;
        if (!lessonBelongsTo) {
            console.log(`[${file}] Question ${q.id} has no lessonId`);
        }
    });
}
console.log("Done checking lessonIds");
