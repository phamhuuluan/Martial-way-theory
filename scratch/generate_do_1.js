const fs = require('fs');
const path = '/Users/luanph/Project other/MARTIAL WAY THEORY/content/exam-bank/do-1.json';

const poemLines = [
  "Bình thân",
  "Bái tổ kính sư",
  "Tiên ông chỉ lộ",
  "Song long hợp khẩu",
  "Song long xuất thủy",
  "Tam bộ loan kiếm",
  "Bạch hạc đạt tuyết",
  "Thiết ngưu chuyển giác",
  "Song long xuất thủy",
  "Song long bảo nguyệt",
  "Tà phong tảo diệp",
  "Hoành phong tảo địa",
  "Luân thân hồi kiếm",
  "Thiết ngưu chuyển giác",
  "Song long xuất thủy",
  "Loan kiếm tuyết hoa",
  "Luân thân hồi kiếm",
  "Tam bộ loan kiếm",
  "Bạch xà luân thân",
  "Thiết ngưu chuyển giác",
  "Song long xuất thủy",
  "Loan kiếm tuyết hoa",
  "Luân thân hồi kiếm",
  "Tam bộ loan kiếm",
  "Bạch xà luân thân",
  "Tả hữu loan kiếm",
  "Phượng lập sơn đầu",
  "Song long xuất hải",
  "Ma vương trá tẩu",
  "Ẩn long phục thế",
  "Phốc bộ phi cước",
  "Song long xuất hải",
  "Hoành phong tảo địa",
  "Bạch xà luân thân",
  "Điểu trá yến phi",
  "Thiết ngưu chuyển giác",
  "Loan kiếm tuyết hoa",
  "Bạch long triều nguyệt",
  "Song long xuất thủy",
  "Bái tổ lập như tiền"
];

const falseLines = [
  "Tiên đồng chỉ lộ",
  "Song long khai khẩu",
  "Song long thám thủy",
  "Tứ bộ loan kiếm",
  "Bạch hạc tầm tuyết",
  "Thiết ngưu chuyển đầu",
  "Song long thưởng nguyệt",
  "Thu phong tảo diệp",
  "Hoành phong bạt địa",
  "Chuyển thân hồi kiếm",
  "Loan kiếm liên hoa",
  "Thanh xà luân thân",
  "Thượng hạ loan kiếm",
  "Phượng vũ sơn đầu",
  "Song long xuất vân",
  "Ma vương bạt tẩu",
  "Ẩn long tàng thế",
  "Đằng bộ phi cước",
  "Yến phi điểu trá",
  "Bạch long đắc nguyệt",
  "Hồi tổ lập như tiền"
];

const poemQuestions = [];

// remove duplicates for processing easily, wait no, poem has repeating lines.
// I'll pick 10 distinct random indices.
for (let i = 0; i < 10; i++) {
  const blankIndices = [];
  while (blankIndices.length < 12) {
    const r = Math.floor(Math.random() * poemLines.length);
    if (!blankIndices.includes(r)) blankIndices.push(r);
  }
  blankIndices.sort((a, b) => a - b);

  let questionText = "Điền vào chỗ trống lời thiệu bài Song Tuyết Kiếm:\n\n";
  const blanks = [];
  const optionsSet = new Set(falseLines);

  poemLines.forEach((line, idx) => {
    if (blankIndices.includes(idx)) {
      questionText += `______[${blanks.length + 1}]\n`;
      blanks.push(line);
      optionsSet.add(line);
    } else {
      questionText += line + "\n";
    }
  });

  const options = Array.from(optionsSet);
  options.sort(() => Math.random() - 0.5);

  poemQuestions.push({
    type: "fill",
    question: questionText.trim(),
    blanks: blanks,
    options: options,
    explanation: poemLines.join(" | "),
    sourceQuestion: "Câu 14. Nêu xuất xứ bài quyền quy định quốc gia Song Tuyết Kiếm.",
    id: `do-1-c14-${i+2}`
  });
}

const data = {
  "rankId": "do-1",
  "beltId": "red",
  "lessonId": "red-lesson-01",
  "questions": [
    {
      "type": "single",
      "question": "Cho biết định hướng học tập và đời sống của Võ sinh Phật Quang Quyền như thế nào?",
      "options": [
        "Định hướng học tập và đời sống của Võ sinh Phật Quang Quyền là phải chuyên cần học tập võ thuật, võ đạo, văn hóa và nghề nghiệp; đồng thời không ngừng rèn luyện tinh thần, trau dồi đạo đức, đạo hạnh và hoàn thiện bản thân để trở thành người có ích cho gia đình, xã hội và đất nước.",
        "Định hướng học tập và đời sống của Võ sinh Phật Quang Quyền là phải chuyên cần học tập võ thuật, võ đạo, văn hóa và kinh tế; đồng thời không ngừng rèn luyện tinh thần, trau dồi đạo đức, đạo hạnh và hoàn thiện bản thân để trở thành người có ích cho gia đình, xã hội và đất nước.",
        "Định hướng học tập và đời sống của Võ sinh Phật Quang Quyền là phải chuyên cần rèn luyện thể lực, võ đạo, văn hóa và nghề nghiệp; đồng thời không ngừng rèn luyện tinh thần, trau dồi đạo đức, đạo hạnh và hoàn thiện bản thân để trở thành người có ích cho gia đình, xã hội và đất nước.",
        "Định hướng học tập và đời sống của Võ sinh Phật Quang Quyền là phải chuyên cần học tập võ thuật, võ đạo, văn hóa và giao tiếp; đồng thời không ngừng rèn luyện tinh thần, trau dồi đạo đức, đạo hạnh và hoàn thiện bản thân để trở thành người có ích cho gia đình, xã hội và đất nước."
      ],
      "correctIndex": 0,
      "explanation": "Định hướng học tập và đời sống của Võ sinh Phật Quang Quyền là phải chuyên cần học tập võ thuật, võ đạo, văn hóa và nghề nghiệp; đồng thời không ngừng rèn luyện tinh thần, trau dồi đạo đức, đạo hạnh và hoàn thiện bản thân để trở thành người có ích cho gia đình, xã hội và đất nước.",
      "sourceQuestion": "Câu 1. Cho biết định hướng học tập và đời sống của Võ sinh Phật Quang Quyền như thế nào?",
      "id": "do-1-c01-01"
    },
    {
      "type": "multiple",
      "question": "Muốn chuyên cần học tập, Võ sinh Phật Quang Quyền phải thực hiện những điều nào?",
      "options": [
        "Học cho rộng: Học võ thuật, võ đạo, văn hóa, nghề nghiệp, cả lý thuyết lẫn thực hành.",
        "Hỏi cho kỹ: Không hiểu thì hỏi, không giấu dốt, không tự ái hay chán nản.",
        "Nghĩ cẩn thận: Biết nghiền ngẫm, suy xét những điều đã học và đã làm.",
        "Luận cho sáng: Biết so sánh, phân tích, tổng hợp, biện luận và giải thích rõ ràng.",
        "Học cho nhiều: Học võ thuật, võ đạo, văn hóa, nghề nghiệp, tập trung vào thực hành.",
        "Hỏi cho nhanh: Không hiểu thì hỏi ngay, không giấu dốt, không tự ái hay chán nản.",
        "Nghĩ sâu xa: Biết tính toán, mưu lược những điều đã học và sắp làm.",
        "Luận cho hay: Biết nói năng lưu loát, biện luận và thuyết phục người khác rõ ràng."
      ],
      "correctIndices": [0, 1, 2, 3],
      "explanation": "Học cho rộng... Hỏi cho kỹ... Nghĩ cẩn thận... Luận cho sáng...",
      "sourceQuestion": "Câu 2. Muốn thực hiện chuyên cần học tập, Võ sinh Phật Quang Quyền phải làm gì?",
      "id": "do-1-c02-01"
    },
    {
      "type": "single",
      "question": "Truyền thống võ học của nhân loại diễn tiến ra sao?",
      "options": [
        "Được hình thành và phát triển qua quá trình sinh tồn, lao động, chiến đấu và xây dựng xã hội. Tùy theo điều kiện địa lý, văn hóa, lịch sử, xã hội và trình độ phát triển của mỗi dân tộc mà hình thành nên những nền võ học mang bản sắc riêng.",
        "Được hình thành và phát triển qua quá trình săn bắt, hái lượm, sinh tồn và bảo vệ lãnh thổ. Tùy theo điều kiện khí hậu, văn hóa, lịch sử, xã hội và trình độ phát triển của mỗi dân tộc mà hình thành nên những nền võ học mang bản sắc riêng.",
        "Được hình thành và phát triển qua quá trình sinh tồn, lao động, chiến đấu và xây dựng xã hội. Tùy theo điều kiện thể chất, nguồn gốc chủng tộc, lịch sử, xã hội và trình độ phát triển của mỗi dân tộc mà hình thành nên những nền võ học mang bản sắc riêng.",
        "Được hình thành và phát triển qua quá trình giao lưu, lao động, học hỏi và xây dựng đất nước. Tùy theo điều kiện địa lý, văn hóa, lịch sử, xã hội và trình độ phát triển của mỗi dân tộc mà hình thành nên những nền võ học mang bản sắc chung."
      ],
      "correctIndex": 0,
      "explanation": "Truyền thống võ học của nhân loại được hình thành và phát triển qua quá trình sinh tồn, lao động, chiến đấu và xây dựng xã hội. Tùy theo điều kiện địa lý, văn hóa, lịch sử, xã hội và trình độ phát triển của mỗi dân tộc mà hình thành nên những nền võ học mang bản sắc riêng.",
      "sourceQuestion": "Câu 3. Truyền thống võ học của nhân loại diễn tiến ra sao?",
      "id": "do-1-c03-01"
    },
    {
      "type": "multiple",
      "question": "Võ học của nhân loại trải qua những thời kỳ lập võ nào?",
      "options": [
        "Chiến đấu với cầm thú: Con người dùng sức mạnh và kỹ năng để sinh tồn trước thú dữ và thiên nhiên khắc nghiệt.",
        "Song đấu: Võ thuật được sử dụng để giải quyết mâu thuẫn và tranh chấp giữa hai người.",
        "Hỗn đấu: Xuất hiện các kỹ thuật chiến đấu trong những cuộc xung đột có nhiều người tham gia.",
        "Võ học thâm nhập vào binh pháp: Võ học được hệ thống hóa và ứng dụng vào quân sự để bảo vệ, xây dựng và phát triển đất nước.",
        "Chiến đấu với thiên nhiên: Con người dùng sức mạnh và kỹ năng để sinh tồn trước thiên tai và thú dữ.",
        "Tự vệ: Võ thuật được sử dụng để tự vệ khi bị tấn công bất ngờ từ người khác.",
        "Quân đấu: Xuất hiện các kỹ thuật chiến đấu trong những cuộc xung đột giữa các đội quân.",
        "Võ học thâm nhập vào dân gian: Võ học được hệ thống hóa và truyền bá rộng rãi trong nhân dân để bảo vệ, xây dựng và phát triển đất nước."
      ],
      "correctIndices": [0, 1, 2, 3],
      "explanation": "Chiến đấu với cầm thú... Song đấu... Hỗn đấu... Võ học thâm nhập vào binh pháp...",
      "sourceQuestion": "Câu 4. Có mấy thời kỳ lập võ? Hãy kể ra và giải thích đại cương.",
      "id": "do-1-c04-01"
    },
    {
      "type": "single",
      "question": "Do đâu người tiền sử đã chế ra các loại võ như Hầu quyền, Hổ quyền, Mã quyền, Điểu quyền, Xà quyền, Ngưu quyền?",
      "options": [
        "Do thường xuyên phải chiến đấu với cầm thú để bảo vệ sự sinh tồn, người tiền sử đã quan sát đặc tính và cách chiến đấu của các loài vật, từ đó đúc kết và sáng tạo nên các quyền thuật mô phỏng như Hầu quyền, Hổ quyền, Mã quyền, Điểu quyền, Xà quyền và Ngưu quyền.",
        "Do thường xuyên săn bắt các loài thú để làm thức ăn, người tiền sử đã quan sát đặc tính và thói quen của các loài vật, từ đó đúc kết và sáng tạo nên các quyền thuật mô phỏng như Hầu quyền, Hổ quyền, Mã quyền, Điểu quyền, Xà quyền và Ngưu quyền.",
        "Do thường xuyên phải chiến đấu với cầm thú để bảo vệ sự sinh tồn, người tiền sử đã quan sát hình dáng và di chuyển của các loài vật, từ đó bắt chước và sáng tạo nên các bài quyền như Hầu quyền, Hổ quyền, Mã quyền, Điểu quyền, Xà quyền và Ngưu quyền.",
        "Do được truyền cảm hứng từ các bức vẽ trên vách đá về sự sinh tồn, người tiền sử đã quan sát đặc tính và cách chiến đấu của các loài vật, từ đó đúc kết và sáng tạo nên các quyền thuật mô phỏng như Hầu quyền, Hổ quyền, Mã quyền, Điểu quyền, Xà quyền và Ngưu quyền."
      ],
      "correctIndex": 0,
      "explanation": "Do thường xuyên phải chiến đấu với cầm thú để bảo vệ sự sinh tồn, người tiền sử đã quan sát đặc tính và cách chiến đấu của các loài vật, từ đó đúc kết và sáng tạo nên các quyền thuật mô phỏng...",
      "sourceQuestion": "Câu 5. Do đâu người tiền sử đã chế ra các loại võ như Hầu quyền, Hổ quyền, Mã quyền, Điểu quyền, Xà quyền, Ngưu quyền?",
      "id": "do-1-c05-01"
    },
    {
      "type": "multiple",
      "question": "Các loại Hầu quyền, Hổ quyền, Mã quyền, Điểu quyền, Xà quyền, Ngưu quyền có những đặc điểm gì?",
      "options": [
        "Hầu quyền: Nhanh nhẹn, linh hoạt, chờn vờn, nhảy nhót.",
        "Hổ quyền: Mạnh mẽ, dữ dội, chụp bắt, tấn công chớp nhoáng.",
        "Mã quyền: Giả thua, lùi tránh rồi bất ngờ phản công.",
        "Điểu quyền: Tấn công bất ngờ từ trên cao, hư thực khó lường.",
        "Xà quyền: Uốn lượn linh hoạt, né tránh nhanh và tấn công bất ngờ.",
        "Ngưu quyền: Dũng mãnh, dùng sức mạnh toàn thân để húc, khóa và áp đảo đối phương.",
        "Hầu quyền: Nhanh nhẹn, lanh lợi, leo trèo, cấu xé.",
        "Hổ quyền: Mạnh mẽ, oai phong, gầm thét, tấn công trực diện.",
        "Mã quyền: Chạy nhanh, lùi tránh rồi bất ngờ đá hậu.",
        "Điểu quyền: Bay nhảy liên tục, tấn công từ trên cao, nhanh nhẹn.",
        "Xà quyền: Trườn bò linh hoạt, quấn chặt và cắn chớp nhoáng.",
        "Ngưu quyền: Dũng mãnh, dùng sức mạnh đôi sừng để húc, đẩy và áp đảo đối phương."
      ],
      "correctIndices": [0, 1, 2, 3, 4, 5],
      "explanation": "Hầu quyền: Nhanh nhẹn, linh hoạt... Hổ quyền: Mạnh mẽ, dữ dội... Mã quyền: Giả thua, lùi tránh... Điểu quyền: Tấn công bất ngờ từ trên cao... Xà quyền: Uốn lượn linh hoạt... Ngưu quyền: Dũng mãnh, dùng sức mạnh toàn thân để húc...",
      "sourceQuestion": "Câu 6. Các loại Hầu quyền, Hổ quyền, Mã quyền, Điểu quyền, Xà quyền, Ngưu quyền có những đặc điểm gì?",
      "id": "do-1-c06-01"
    },
    {
      "type": "single",
      "question": "Do đâu ý thức dụng võ chống với cầm thú được chuyển sang ý thức lập võ chống với người?",
      "options": [
        "Do những mâu thuẫn phát sinh trong đời sống xã hội thị tộc như tranh chấp hôn nhân, tài sản, quyền lãnh đạo và các quyền lợi khác, nên ý thức dùng võ để chống lại cầm thú dần chuyển thành ý thức lập võ để giải quyết các xung đột giữa người với người.",
        "Do những mâu thuẫn phát sinh trong đời sống xã hội bộ lạc như tranh chấp lãnh thổ, thức ăn, quyền lãnh đạo và các quyền lợi khác, nên ý thức dùng võ để chống lại cầm thú dần chuyển thành ý thức lập võ để giải quyết các xung đột giữa người với người.",
        "Do những mâu thuẫn phát sinh trong đời sống xã hội phong kiến như tranh chấp giai cấp, tài sản, quyền lực và các quyền lợi khác, nên ý thức dùng võ để chống lại cầm thú dần chuyển thành ý thức lập võ để giải quyết các xung đột giữa người với người.",
        "Do những mâu thuẫn phát sinh trong đời sống xã hội thị tộc như tranh chấp hôn nhân, tài sản, quyền lãnh đạo và các quyền lợi khác, nên ý thức dùng võ để săn bắt thú dần chuyển thành ý thức dùng võ để tự vệ và tấn công giữa người với người."
      ],
      "correctIndex": 0,
      "explanation": "Do những mâu thuẫn phát sinh trong đời sống xã hội thị tộc như tranh chấp hôn nhân, tài sản, quyền lãnh đạo và các quyền lợi khác, nên ý thức dùng võ để chống lại cầm thú dần chuyển thành ý thức lập võ để giải quyết các xung đột giữa người với người.",
      "sourceQuestion": "Câu 7. Do đâu ý thức dụng võ chống với cầm thú được chuyển sang ý thức lập võ chống với người?",
      "id": "do-1-c07-01"
    },
    {
      "type": "single",
      "question": "Do đâu phát sinh ra kỹ thuật hỗn đấu?",
      "options": [
        "Do nhu cầu bảo vệ quyền lợi của thị tộc và sự gia tăng các cuộc tranh chấp giữa các nhóm người, kỹ thuật hỗn đấu đã phát sinh và phát triển nhằm đáp ứng yêu cầu chiến đấu trong những cuộc xung đột có nhiều người tham gia.",
        "Do nhu cầu mở rộng lãnh thổ của thị tộc và sự gia tăng các cuộc chiến tranh giữa các quốc gia, kỹ thuật hỗn đấu đã phát sinh và phát triển nhằm đáp ứng yêu cầu chiến đấu trong những cuộc xung đột có nhiều người tham gia.",
        "Do nhu cầu bảo vệ quyền lợi của gia đình và sự gia tăng các cuộc cướp bóc giữa các nhóm người, kỹ thuật hỗn đấu đã phát sinh và phát triển nhằm đáp ứng yêu cầu chiến đấu trong những cuộc xung đột có nhiều người tham gia.",
        "Do nhu cầu bảo vệ quyền lợi của thị tộc và sự gia tăng các cuộc tranh chấp cá nhân, kỹ thuật hỗn đấu đã phát sinh và phát triển nhằm đáp ứng yêu cầu chiến đấu trong những cuộc xung đột có nhiều người tham gia."
      ],
      "correctIndex": 0,
      "explanation": "Do nhu cầu bảo vệ quyền lợi của thị tộc và sự gia tăng các cuộc tranh chấp giữa các nhóm người, kỹ thuật hỗn đấu đã phát sinh và phát triển nhằm đáp ứng yêu cầu chiến đấu trong những cuộc xung đột có nhiều người tham gia.",
      "sourceQuestion": "Câu 8. Do đâu phát sinh ra kỹ thuật hỗn đấu?",
      "id": "do-1-c08-01"
    },
    {
      "type": "fill",
      "question": "Điền vào chỗ trống: Tại Việt Nam, từ ______[1], võ học đã dần thâm nhập vào binh pháp. Danh tướng ______[2] được xem là một trong những binh pháp gia tiêu biểu đầu tiên của dân tộc, nổi bật với việc vận dụng binh pháp một cách sáng tạo và hiệu quả trong công cuộc bảo vệ đất nước.",
      "blanks": [
        "thời đại đồ sắt",
        "Lý Thường Kiệt"
      ],
      "options": [
        "thời đại đồ đồng",
        "thời kỳ phong kiến",
        "thời đại đồ đá mới",
        "Trần Hưng Đạo",
        "Quang Trung",
        "Ngô Quyền"
      ],
      "explanation": "Tại Việt Nam, từ thời đại đồ sắt, võ học đã dần thâm nhập vào binh pháp. Danh tướng Lý Thường Kiệt được xem là một trong những binh pháp gia tiêu biểu đầu tiên của dân tộc, nổi bật với việc vận dụng binh pháp một cách sáng tạo và hiệu quả trong công cuộc bảo vệ đất nước.",
      "sourceQuestion": "Câu 9. Thời đại nào đã mở màn cho võ học thâm nhập vào binh pháp? Binh pháp gia tiêu biểu đầu tiên của Việt Nam là ai?",
      "id": "do-1-c09-01"
    },
    {
      "type": "multiple",
      "question": "Võ học Việt Nam có những phẩm tính nào?",
      "options": [
        "Phù hợp với thể tạng người Việt Nam và điều kiện địa lý của đất nước.",
        "Cương nhu phối triển.",
        "Biết tiếp thu, chọn lọc và kết hợp tinh hoa của nhiều nền võ học nhưng vẫn giữ được bản sắc riêng của dân tộc Việt Nam.",
        "Phù hợp với tính cách người Việt Nam và điều kiện khí hậu của đất nước.",
        "Nhu thắng cương, nhược thắng cường.",
        "Biết học hỏi, sao chép và kết hợp tinh hoa của nhiều nền võ học để tạo ra phong cách riêng của dân tộc Việt Nam."
      ],
      "correctIndices": [0, 1, 2],
      "explanation": "Võ học Việt Nam có 3 phẩm tính: Phù hợp với thể tạng người Việt Nam... Cương nhu phối triển. Biết tiếp thu, chọn lọc và kết hợp tinh hoa...",
      "sourceQuestion": "Câu 10. Truyền thống Võ học Việt Nam ra sao? Có mấy phẩm tính?",
      "id": "do-1-c10-01"
    },
    {
      "type": "single",
      "question": "Vì đâu Võ học Việt Nam đã tổng hợp và kết hợp được tinh hoa của nhiều nền võ học trên thế giới? Và đã tổng hợp theo chiều hướng nào?",
      "options": [
        "Nhờ vị trí địa lý thuận lợi và sự giao lưu lâu dài với nhiều nền văn hóa khác nhau, Võ học Việt Nam có điều kiện tiếp xúc, tiếp thu và chọn lọc tinh hoa của nhiều nền võ học. Võ học Việt Nam tổng hợp theo chiều hướng tiếp thu những điểm hay, tiến bộ và phù hợp để làm phong phú nền võ học dân tộc, đồng thời vẫn giữ vững bản sắc riêng của mình.",
        "Nhờ lịch sử đấu tranh giữ nước lâu dài với nhiều thế lực ngoại xâm, Võ học Việt Nam có điều kiện tiếp xúc, tiếp thu và chọn lọc tinh hoa của nhiều nền võ học. Võ học Việt Nam tổng hợp theo chiều hướng tiếp thu những điểm hay, tiến bộ và phù hợp để làm phong phú nền võ học dân tộc, đồng thời vẫn giữ vững bản sắc riêng của mình.",
        "Nhờ vị trí địa lý thuận lợi và sự giao lưu lâu dài với nhiều nền văn hóa khác nhau, Võ học Việt Nam có điều kiện tiếp xúc, tiếp thu và chọn lọc tinh hoa của nhiều nền võ học. Võ học Việt Nam tổng hợp theo chiều hướng hòa nhập hoàn toàn các môn võ ngoại lai để làm phong phú nền võ học dân tộc.",
        "Nhờ sự mở cửa hội nhập và sự giao lưu lâu dài với nhiều nền văn hóa khác nhau, Võ học Việt Nam có điều kiện tiếp xúc, tiếp thu và chọn lọc tinh hoa của nhiều nền võ học. Võ học Việt Nam tổng hợp theo chiều hướng tiếp thu những điểm hay, tiến bộ và phù hợp để làm phong phú nền võ học dân tộc, đồng thời vẫn giữ vững bản sắc riêng của mình."
      ],
      "correctIndex": 0,
      "explanation": "Nhờ vị trí địa lý thuận lợi và sự giao lưu lâu dài với nhiều nền văn hóa khác nhau... Võ học Việt Nam tổng hợp theo chiều hướng tiếp thu những điểm hay, tiến bộ và phù hợp để làm phong phú nền võ học dân tộc, đồng thời vẫn giữ vững bản sắc riêng của mình.",
      "sourceQuestion": "Câu 11. Vì đâu Võ học Việt Nam đã tổng hợp và kết hợp được tinh hoa của nhiều nền võ học trên thế giới? Và đã tổng hợp theo chiều hướng nào?",
      "id": "do-1-c11-01"
    },
    {
      "type": "single",
      "question": "Võ thuật có lợi ích gì?",
      "options": [
        "Võ thuật giúp rèn luyện thân thể khỏe mạnh, tinh thần vững vàng, ý chí kiên cường và trí tuệ minh mẫn. Đồng thời, võ thuật còn giúp con người biết tự vệ, bảo vệ lẽ phải, sống có kỷ luật, có trách nhiệm và góp phần xây dựng, bảo vệ gia đình, xã hội và đất nước.",
        "Võ thuật giúp rèn luyện thân thể cường tráng, tinh thần sảng khoái, ý chí kiên định và trí tuệ nhạy bén. Đồng thời, võ thuật còn giúp con người biết chiến đấu, bảo vệ lẽ phải, sống có kỷ luật, có trách nhiệm và góp phần xây dựng, bảo vệ gia đình, xã hội và đất nước.",
        "Võ thuật giúp rèn luyện thân thể khỏe mạnh, tinh thần vững vàng, ý chí kiên cường và trí tuệ minh mẫn. Đồng thời, võ thuật còn giúp con người biết tự vệ, bênh vực kẻ yếu, sống có tình cảm, có trách nhiệm và góp phần xây dựng, bảo vệ gia đình, xã hội và đất nước.",
        "Võ thuật giúp rèn luyện sức mạnh cơ bắp, tinh thần vững vàng, ý chí kiên cường và trí tuệ minh mẫn. Đồng thời, võ thuật còn giúp con người biết tự vệ, bảo vệ bản thân, sống có kỷ luật, có trách nhiệm và góp phần xây dựng, bảo vệ gia đình, xã hội và đất nước."
      ],
      "correctIndex": 0,
      "explanation": "Võ thuật giúp rèn luyện thân thể khỏe mạnh, tinh thần vững vàng, ý chí kiên cường và trí tuệ minh mẫn. Đồng thời, võ thuật còn giúp con người biết tự vệ, bảo vệ lẽ phải, sống có kỷ luật, có trách nhiệm và góp phần xây dựng, bảo vệ gia đình, xã hội và đất nước.",
      "sourceQuestion": "Câu 12. Võ thuật có lợi ích gì?",
      "id": "do-1-c12-01"
    },
    {
      "type": "single",
      "question": "Thời nay khoa học kỹ thuật phát triển, võ thuật còn hữu dụng nữa không? Tại sao?",
      "options": [
        "Võ thuật vẫn luôn hữu dụng. Võ thuật không chỉ giúp con người rèn luyện sức khỏe, kỹ năng tự vệ mà còn bồi dưỡng ý chí, lòng dũng cảm, sự bình tĩnh, tinh thần kỷ luật và khả năng làm chủ bản thân. Khoa học không thể thay thế sức mạnh tinh thần, bản lĩnh và nhân cách của con người. Vì vậy, võ thuật vẫn giữ vai trò quan trọng trong việc hoàn thiện con người.",
        "Võ thuật vẫn luôn hữu dụng. Võ thuật chủ yếu giúp con người rèn luyện thể lực, kỹ năng chiến đấu và bồi dưỡng ý chí, lòng dũng cảm, sự bình tĩnh, tinh thần đồng đội. Khoa học không thể thay thế sức mạnh thể chất, bản lĩnh và nhân cách của con người. Vì vậy, võ thuật vẫn giữ vai trò quan trọng trong việc hoàn thiện con người.",
        "Võ thuật vẫn luôn hữu dụng. Võ thuật không chỉ giúp con người rèn luyện sức khỏe, kỹ năng thi đấu mà còn bồi dưỡng ý chí, lòng dũng cảm, sự nhẫn nhịn, tinh thần kỷ luật và khả năng làm chủ bản thân. Khoa học không thể thay thế sức mạnh tinh thần, bản lĩnh và nhân cách của con người. Vì vậy, võ thuật vẫn giữ vai trò quan trọng trong việc hoàn thiện con người.",
        "Võ thuật ít hữu dụng hơn xưa nhưng vẫn cần thiết. Võ thuật không chỉ giúp con người rèn luyện sức khỏe, kỹ năng tự vệ mà còn bồi dưỡng ý chí, lòng dũng cảm, sự bình tĩnh, tinh thần kỷ luật. Khoa học tuy thay thế được sức mạnh cơ bắp nhưng không thể thay thế nhân cách của con người. Vì vậy, võ thuật vẫn giữ vai trò trong việc giáo dục con người."
      ],
      "correctIndex": 0,
      "explanation": "Dù khoa học kỹ thuật ngày càng phát triển, võ thuật vẫn luôn hữu dụng. Võ thuật không chỉ giúp con người rèn luyện sức khỏe, kỹ năng tự vệ mà còn bồi dưỡng ý chí, lòng dũng cảm, sự bình tĩnh, tinh thần kỷ luật và khả năng làm chủ bản thân. Khoa học có thể tạo ra những phương tiện hiện đại, nhưng không thể thay thế sức mạnh tinh thần, bản lĩnh và nhân cách của con người...",
      "sourceQuestion": "Câu 13. Thời nay võ thuật còn hữu dụng nữa không?",
      "id": "do-1-c13-01"
    },
    {
      "type": "single",
      "question": "Nêu xuất xứ bài quyền quy định quốc gia Song Tuyết Kiếm.",
      "options": [
        "Song Tuyết Kiếm là bài binh khí đôi quy định của Liên đoàn Võ thuật Cổ truyền Việt Nam. Bài kiếm này thuộc môn phái Nam Hồng Sơn của Hội Võ thuật Hà Nội. Nam Hồng Sơn do cố Võ sư Nguyễn Nguyên Tộ sáng lập.",
        "Song Tuyết Kiếm là bài binh khí đôi quy định của Liên đoàn Võ thuật Cổ truyền Việt Nam. Bài kiếm này thuộc môn phái Nam Hồng Sơn của Hội Võ thuật Bắc Ninh. Nam Hồng Sơn do cố Võ sư Nguyễn Nguyên Tộ sáng lập.",
        "Song Tuyết Kiếm là bài binh khí ngắn quy định của Liên đoàn Võ thuật Cổ truyền Việt Nam. Bài kiếm này thuộc môn phái Nam Hồng Sơn của Hội Võ thuật Hà Nội. Nam Hồng Sơn do cố Võ sư Nguyễn Nguyên Tộ sáng lập.",
        "Song Tuyết Kiếm là bài binh khí đôi quy định của Liên đoàn Võ thuật Cổ truyền Việt Nam. Bài kiếm này thuộc môn phái Nhất Nam của Hội Võ thuật Hà Nội. Nhất Nam do cố Võ sư Ngô Xuân Bính sáng lập."
      ],
      "correctIndex": 0,
      "explanation": "Song Tuyết Kiếm là bài binh khí đôi quy định của Liên đoàn Võ thuật Cổ truyền Việt Nam. Bài kiếm này thuộc môn phái Nam Hồng Sơn của Hội Võ thuật Hà Nội. Nam Hồng Sơn do cố Võ sư Nguyễn Nguyên Tộ sáng lập...",
      "sourceQuestion": "Câu 14. Nêu xuất xứ bài quyền quy định quốc gia Song Tuyết Kiếm.",
      "id": "do-1-c14-01"
    }
  ]
};

data.questions.push(...poemQuestions);

data.questions.forEach((q, index) => {
  q.lessonId = data.lessonId;
  q.rankId = data.rankId;
  q.beltId = data.beltId;
  q.number = index + 1;
});

fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Saved to', path);
