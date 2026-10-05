const fs = require('fs');
const path = require('path');

const examBankDir = '/Users/luanph/Project other/MARTIAL WAY THEORY/content/exam-bank';
const files = fs.readdirSync(examBankDir).filter(f => f.endsWith('.json'));

let output = '';

for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(examBankDir, file), 'utf-8'));
    let hasBlanks = false;
    let fileOutput = `\n\n=== ${file} ===\n`;
    
    if (data.questions && Array.isArray(data.questions)) {
        data.questions.forEach(q => {
            if (q.type === 'fill_in_the_blank' || q.question.includes('___') || q.question.includes('…')) {
                hasBlanks = true;
                fileOutput += `\nID: ${q.id} (Lesson: ${q.lessonId || q.lesson || 'unknown'})\nQ: ${q.question}\nAns: ${q.options ? q.options[q.correctIndex] : (q.correct_answer || q.answer)}\nOptions: ${JSON.stringify(q.options || [])}\nType: ${q.type}\n`;
            }
        });
    }
    
    if (hasBlanks) {
        output += fileOutput;
    }
}

fs.writeFileSync('/Users/luanph/Project other/MARTIAL WAY THEORY/blanks_output.txt', output);
console.log("Done");
