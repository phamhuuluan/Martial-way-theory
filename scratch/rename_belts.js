const fs = require('fs');
const path = '/Users/luanph/Project other/MARTIAL WAY THEORY/content/exam-bank';

const tasks = [
  { old: 'do-1.json', new: 'hong-1.json', oldRank: 'do-1', newRank: 'hong-1' },
  { old: 'do-2.json', new: 'hong-2.json', oldRank: 'do-2', newRank: 'hong-2' },
  { old: 'do-3.json', new: 'hong-3.json', oldRank: 'do-3', newRank: 'hong-3' },
  { old: 'do-4.json', new: 'hong-4.json', oldRank: 'do-4', newRank: 'hong-4' },
  { old: 'trang-1.json', new: 'chuan-bach.json', oldRank: 'trang-1', newRank: 'chuan-bach' },
  { old: 'trang-2.json', new: 'bach.json', oldRank: 'trang-2', newRank: 'bach' }
];

['hong-1.json', 'hong-2.json', 'hong-3.json', 'hong-4.json', 'bach.json', 'chuan-bach.json'].forEach(file => {
  const fp = `${path}/${file}`;
  if (fs.existsSync(fp)) {
    console.log(`Deleting ${fp}`);
    fs.unlinkSync(fp);
  }
});

tasks.forEach(task => {
  const oldPath = `${path}/${task.old}`;
  const newPath = `${path}/${task.new}`;
  
  if (fs.existsSync(oldPath)) {
    console.log(`Processing ${task.old} -> ${task.new}`);
    let content = fs.readFileSync(oldPath, 'utf8');
    const data = JSON.parse(content);
    
    data.rankId = task.newRank;
    if (data.questions && Array.isArray(data.questions)) {
      data.questions.forEach(q => {
        if (q.rankId === task.oldRank) {
          q.rankId = task.newRank;
        }
        if (q.id && q.id.includes(task.oldRank)) {
          q.id = q.id.replace(task.oldRank, task.newRank);
        }
      });
    }
    
    fs.writeFileSync(newPath, JSON.stringify(data, null, 2), 'utf8');
    fs.unlinkSync(oldPath);
  } else {
    console.log(`Old file not found: ${oldPath}`);
  }
});

console.log("Done");
