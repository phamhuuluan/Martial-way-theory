const fs = require('fs');
const path = require('path');

const examBankDir = '/Users/luanph/Project other/MARTIAL WAY THEORY/content/exam-bank';
const files = fs.readdirSync(examBankDir).filter(f => f.endsWith('.json'));

function normalize(text) {
    if (!text) return "";
    return text.toLowerCase().replace(/[\W_]+/g, '').trim();
}

for (const file of files) {
    const filePath = path.join(examBankDir, file);
    let data;
    try {
        data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (e) {
        console.error(`Error parsing ${file}`);
        continue;
    }
    
    let isModified = false;
    let questions = [];
    if (Array.isArray(data)) {
        questions = data;
    } else if (data.questions && Array.isArray(data.questions)) {
        questions = data.questions;
    }

    questions.forEach(q => {
        if ((q.type === 'fill' || q.type === 'fill_in_the_blank') && Array.isArray(q.blanks) && Array.isArray(q.options)) {
            let optionsSet = new Set(q.options.map(o => normalize(o)));
            let added = false;
            
            q.blanks.forEach(b => {
                const normB = normalize(b);
                if (!optionsSet.has(normB)) {
                    q.options.push(b);
                    optionsSet.add(normB);
                    added = true;
                }
            });
            
            if (added) {
                // Shuffle options
                for (let i = q.options.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [q.options[i], q.options[j]] = [q.options[j], q.options[i]];
                }
                isModified = true;
            }
        }
    });

    if (isModified) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`Updated ${file}`);
    }
}
console.log('All files processed.');
