const fs = require('fs');
const path = require('path');

const examBankDir = '/Users/luanph/Project other/MARTIAL WAY THEORY/content/exam-bank';
const contentDir = '/Users/luanph/Project other/MARTIAL WAY THEORY/content';

const files = fs.readdirSync(examBankDir).filter(f => f.endsWith('.json'));

function normalize(text) {
    if (!text) return "";
    return text.toLowerCase().replace(/[\W_]+/g, ' ').trim();
}

function findSourceText(lessonId) {
    if (!lessonId) return "";
    const belt = lessonId.split('-lesson')[0] + '-belt'; // e.g. green-belt
    const fileName = lessonId.split('-').slice(1).join('-') + '.mdx'; // e.g. lesson-03.mdx
    const filePath = path.join(contentDir, belt, fileName);
    if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf-8');
    }
    // Also try other combinations if needed, but lessonId should map exactly
    return "";
}

let report = "";
let issueCount = 0;

for (const file of files) {
    let data;
    try {
        data = JSON.parse(fs.readFileSync(path.join(examBankDir, file), 'utf-8'));
    } catch (e) {
        report += `Error parsing ${file}\n`;
        continue;
    }
    
    let questions = [];
    if (Array.isArray(data)) {
        questions = data;
    } else if (data.questions && Array.isArray(data.questions)) {
        questions = data.questions;
    }

    questions.forEach(q => {
        // Find if blanks or options missing correct answers
        if (q.type === 'fill' || q.type === 'fill_in_the_blank') {
            const blanks = q.blanks || [];
            const options = q.options || [];
            
            // 1. Missing correct answers in options
            let missingFromOptions = [];
            for (const b of blanks) {
                // If it's a poem, exact match might be strict because of punctuation. But let's check exact or included.
                if (!options.some(opt => normalize(opt) === normalize(b))) {
                    missingFromOptions.push(b);
                }
            }
            if (missingFromOptions.length > 0) {
                report += `\n[${file}] [${q.id}] Missing blanks in options: ${JSON.stringify(missingFromOptions)}`;
                issueCount++;
            }

            // 2. Are blanks actually from the theory?
            const sourceText = findSourceText(q.lessonId);
            if (sourceText) {
                const normalizedSource = normalize(sourceText);
                let missingFromTheory = [];
                for (const b of blanks) {
                    if (!normalizedSource.includes(normalize(b))) {
                        missingFromTheory.push(b);
                    }
                }
                if (missingFromTheory.length > 0) {
                    report += `\n[${file}] [${q.id}] Blanks not found in theory ${q.lessonId}: ${JSON.stringify(missingFromTheory)}`;
                    issueCount++;
                }
                
                // 3. Are questions not found in theory?
                let cleanQ = q.question.replace(/______\[\d+\]/g, '').replace(/Điền vào chỗ trống:?/, '').trim();
                // Poems have many blanks, so cleanQ might be very short, let's take a substring
                cleanQ = cleanQ.split('\n')[0].trim();
                if (cleanQ.length > 20 && !normalizedSource.includes(normalize(cleanQ))) {
                    report += `\n[${file}] [${q.id}] Question text not found in theory ${q.lessonId}: ${cleanQ}`;
                    issueCount++;
                }
            } else {
                report += `\n[${file}] [${q.id}] Could not find theory file for lesson: ${q.lessonId}`;
            }
        }
    });
}

report = `Total issues found: ${issueCount}\n` + report;
fs.writeFileSync('/Users/luanph/Project other/MARTIAL WAY THEORY/validation_report.txt', report);
console.log(`Validation complete. Found ${issueCount} issues.`);
