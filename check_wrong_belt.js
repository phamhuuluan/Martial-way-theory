const fs = require('fs');
const path = require('path');

const examBankDir = '/Users/luanph/Project other/MARTIAL WAY THEORY/content/exam-bank';
const files = fs.readdirSync(examBankDir).filter(f => f.endsWith('.json'));

let mismatch = false;

for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(examBankDir, file), 'utf-8'));
    let questions = Array.isArray(data) ? data : data.questions || [];
    
    questions.forEach(q => {
        let lessonId = q.lessonId || q.lesson || "";
        let expectedSubStr = "";
        
        if (file.includes('luc')) expectedSubStr = 'green';
        if (file.includes('lam')) expectedSubStr = 'blue';
        if (file.includes('hoang')) expectedSubStr = 'yellow';
        if (file.includes('hong')) expectedSubStr = 'red';
        if (file.includes('bach') && !file.includes('chuan-bach')) expectedSubStr = 'white';
        if (file.includes('chuan-bach')) expectedSubStr = 'white-lesson-01'; // Assuming chuan bach is lesson 01
        
        if (!lessonId.includes(expectedSubStr)) {
            console.log(`[${file}] Question ${q.id} has wrong lessonId ${lessonId}`);
            mismatch = true;
        }
        
        // check specific lesson numbers
        let match = file.match(/-(\d+)\.json$/);
        if (match) {
            let num = match[1];
            if (!lessonId.endsWith(`0${num}`) && !lessonId.endsWith(num)) {
                 console.log(`[${file}] Question ${q.id} has lessonId ${lessonId} which doesn't match file number ${num}`);
                 mismatch = true;
            }
        }
    });
}
if (!mismatch) console.log("All lesson IDs match their files.");
