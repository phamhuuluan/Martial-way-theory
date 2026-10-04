const fs = require('fs');
const path = '/Users/luanph/Project other/MARTIAL WAY THEORY/content/exam-bank/luc-4.json';

const poemLines = [
  "Bái tổ Thanh long độc kiếm.",
  "Tứ phương bái tổ kính sư.",
  "Xuất kiếm thủ bộ dáng người uy nghi.",
  "Long thăng trảm thạch liền khi.",
  "Tầm xà sát thích vân phi liền kề.",
  "Thanh long xuất thế trở về.",
  "Quy xà phạt thảo tứ bề sát kinh.",
  "Ẩn long trầm thủy tung mình.",
  "Nộ, giáng, thích, trảm tụ thần triều dâng.",
  "Giao long đảo hải vẫy vùng.",
  "Xung thiên bạch hạc nghiêng mình chuyển thân.",
  "Thanh long bãi vĩ xuất thần.",
  "Long vân gặp hội muôn phần vũ phong.",
  "Vọng nguyệt long giáng tầm ngư.",
  "Vũ môn cá vượt qua thềm vờn mây.",
  "Thanh long bái tổ hầu sư.",
  "Diện tiền lập bộ kiếm thu trở về."
];

const falseLines = [
  "Bát phương bái tổ kính sư.",
  "Xuất kiếm tấn bộ dáng người uy nghi.",
  "Long thăng phá thạch liền khi.",
  "Tầm xà truy thích vân phi liền kề.",
  "Hắc long xuất thế trở về.",
  "Quy xà trảm thảo tứ bề sát kinh.",
  "Ẩn long tiềm thủy tung mình.",
  "Nộ, thăng, thích, trảm tụ thần triều dâng.",
  "Giao long nghịch hải vẫy vùng.",
  "Xung thiên đại hạc nghiêng mình chuyển thân.",
  "Thanh long đoạt vĩ xuất thần.",
  "Long vân xuất hội muôn phần vũ phong.",
  "Vọng nguyệt giáng long tầm ngư.",
  "Vũ môn long vượt qua thềm vờn mây.",
  "Thanh long bái tổ từ sư."
];

const poemQuestions = [];

for (let i = 0; i < 10; i++) {
  const blankIndices = [];
  while (blankIndices.length < 10) {
    const r = Math.floor(Math.random() * poemLines.length);
    if (!blankIndices.includes(r)) blankIndices.push(r);
  }
  blankIndices.sort((a, b) => a - b);

  let questionText = "Điền vào chỗ trống lời thiệu bài quyền Thanh Long Độc Kiếm:\n\n";
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
    explanation: poemLines.join(" "),
    sourceQuestion: "Câu 15. Nêu xuất xứ bài Thanh Long Độc Kiếm.",
    id: `luc-4-c15-${i+2}`
  });
}

const data = {
  "rankId": "luc-4",
  "beltId": "green",
  "lessonId": "green-lesson-04",
  "questions": [
    {
      "type": "single",
      "question": "Võ sinh Phật Quang Quyền phải thể hiện tinh thần như thế nào khi biểu diễn võ thuật?",
      "options": [
        "Chỉ tham gia biểu diễn khi có sự phân công của môn phái. Luôn đặt danh dự môn phái lên hàng đầu, biểu diễn hết mình để thể hiện vẻ đẹp võ thuật và võ đạo của Phật Quang Quyền.",
        "Chỉ tham gia biểu diễn khi có sự phân công của tổ chức. Luôn đặt danh tiếng cá nhân lên hàng đầu, biểu diễn hết mình để thể hiện vẻ đẹp võ thuật và võ đạo của Phật Quang Quyền.",
        "Chỉ tham gia biểu diễn khi có sự phân công của võ đường. Luôn đặt tinh thần giao lưu lên hàng đầu, biểu diễn hết mình để thể hiện vẻ đẹp võ thuật và võ đạo của Phật Quang Quyền.",
        "Chỉ tham gia biểu diễn khi được trả thù lao xứng đáng. Luôn đặt danh dự môn phái lên hàng đầu, biểu diễn hết mình để thể hiện vẻ đẹp võ thuật và võ đạo của Phật Quang Quyền."
      ],
      "correctIndex": 0,
      "explanation": "Chỉ tham gia biểu diễn khi có sự phân công của môn phái. Luôn đặt danh dự môn phái lên hàng đầu, biểu diễn hết mình để thể hiện vẻ đẹp võ thuật và võ đạo của Phật Quang Quyền.",
      "sourceQuestion": "Câu 1. Câu. Võ sinh Phật Quang Quyền phải thể hiện tác phong ra sao khi biểu diễn võ thuật?",
      "id": "luc-4-c01-01"
    },
    {
      "type": "multiple",
      "question": "Khi giao dịch ngoài xã hội hoặc nơi công cộng, Võ sinh Phật Quang Quyền phải có thái độ như thế nào?",
      "options": [
        "Tôn trọng nội quy nơi giao dịch và nơi công cộng.",
        "Ôn tồn, cởi mở nhưng có chính kiến.",
        "Niềm nở, lễ độ nhưng không nịnh bợ hay suồng sã.",
        "Khiêm tốn nhưng không khúm núm, quy lụy.",
        "Tuyệt đối không khoe khoang mình là người có võ.",
        "Tôn trọng nhân viên nơi giao dịch và nơi công cộng.",
        "Ôn tồn, nhượng bộ và không có chính kiến.",
        "Niềm nở, vui vẻ nhưng không được giao tiếp nhiều.",
        "Khiêm nhường và luôn luôn khúm núm, quy lụy.",
        "Tuyệt đối không tiết lộ mình là người học võ."
      ],
      "correctIndices": [0, 1, 2, 3, 4],
      "explanation": "Tôn trọng nội quy... Ôn tồn, cởi mở nhưng có chính kiến. Niềm nở, lễ độ nhưng không nịnh bợ... Khiêm tốn nhưng không khúm núm... Tuyệt đối không khoe khoang mình là người có võ.",
      "sourceQuestion": "Câu 2. Khi giao dịch ngoài xã hội hoặc nơi công cộng, Võ sinh Phật Quang Quyền phải có thái độ như thế nào?",
      "id": "luc-4-c02-01"
    },
    {
      "type": "multiple",
      "question": "Khi giao dịch ngoài xã hội hoặc nơi công cộng, Võ sinh Phật Quang Quyền phải đối thoại ra sao?",
      "options": [
        "Giữ bình tĩnh, điều hòa tình cảm, không nóng nảy hoặc thờ ơ.",
        "Biết lắng nghe để hiểu người đối thoại.",
        "Trình bày rõ ràng, mạch lạc và tế nhị.",
        "Biết dùng lý lẽ và dẫn chứng để thuyết phục người khác khi cần.",
        "Tránh lời nói cộc cằn, xúc phạm hoặc làm mất lòng người khác.",
        "Giữ vẻ mặt nghiêm túc, che giấu tình cảm, không nóng nảy hoặc thờ ơ.",
        "Biết phớt lờ để tránh mâu thuẫn với người đối thoại.",
        "Trình bày ngắn gọn, súc tích và dứt khoát.",
        "Biết dùng sức mạnh và dẫn chứng để răn đe người khác khi cần.",
        "Tránh lời nói chân thật nếu làm mất lòng người khác."
      ],
      "correctIndices": [0, 1, 2, 3, 4],
      "explanation": "Giữ bình tĩnh... Biết lắng nghe... Trình bày rõ ràng... Biết dùng lý lẽ và dẫn chứng... Tránh lời nói cộc cằn, xúc phạm...",
      "sourceQuestion": "Câu 3. Khi giao dịch ngoài xã hội hoặc nơi công cộng, Võ sinh Phật Quang Quyền phải đối thoại ra sao?",
      "id": "luc-4-c03-01"
    },
    {
      "type": "fill",
      "question": "Điền vào chỗ trống về tác phong ở nơi công cộng: Về thái độ: Đàng hoàng, đứng đắn, khiêm tốn, ______[1]. Về cử chỉ: Lịch sự, nhã nhặn, sẵn sàng giúp đỡ người khác. Về cách đối xử: ______[2], bênh vực điều phải, giúp đỡ người yếu thế và tránh xa những hành vi thiếu văn hóa.",
      "blanks": [
        "không khoe khoang mình là người có võ",
        "Quang minh, hào hiệp"
      ],
      "options": [
        "không tỏ vẻ mình là người học võ",
        "không thách thức những người khác",
        "không sử dụng vũ lực bừa bãi",
        "Cương trực, mạnh mẽ",
        "Nhân ái, vị tha",
        "Trung thực, dũng cảm"
      ],
      "explanation": "Về thái độ: Đàng hoàng, đứng đắn, khiêm tốn, không khoe khoang mình là người có võ. Về cách đối xử: Quang minh, hào hiệp, bênh vực điều phải, giúp đỡ người yếu thế và tránh xa những hành vi thiếu văn hóa.",
      "sourceQuestion": "Câu 4. Tác phong của Võ sinh Phật Quang Quyền ở những nơi công cộng ra sao?",
      "id": "luc-4-c04-01"
    },
    {
      "type": "single",
      "question": "Tác phong của Võ sinh Phật Quang Quyền khi tham gia công tác xã hội ra sao?",
      "options": [
        "Phải thực hiện với tinh thần vị tha, chí công vô tư và bất vụ lợi. Khiêm tốn, hòa nhã, lễ độ, không kể công, không làm người được giúp đỡ tủi thân, đồng thời giữ gìn ý tứ để tránh những hiểu lầm không đáng có.",
        "Phải thực hiện với tinh thần tự nguyện, chí công vô tư và hiệu quả. Khiêm tốn, hòa nhã, lễ độ, không kể công, không làm người được giúp đỡ tủi thân, đồng thời giữ gìn tài sản để tránh thất thoát.",
        "Phải thực hiện với tinh thần nhiệt huyết, hăng hái và bất vụ lợi. Nhanh nhẹn, tháo vát, dứt khoát, không kể công, không làm người được giúp đỡ tủi thân, đồng thời giữ gìn ý tứ để tránh những hiểu lầm không đáng có.",
        "Phải thực hiện với tinh thần đoàn kết, tương trợ và bất vụ lợi. Khiêm tốn, hòa nhã, thân thiện, không kể công, không làm người được giúp đỡ ỷ lại, đồng thời giữ gìn kỷ luật nghiêm ngặt."
      ],
      "correctIndex": 0,
      "explanation": "Khi tham gia công tác xã hội, Võ sinh... phải thực hiện với tinh thần vị tha, chí công vô tư và bất vụ lợi. Trong quá trình giúp đỡ người khác phải khiêm tốn, hòa nhã, lễ độ, không kể công, không làm người được giúp đỡ mặc cảm hay tủi thân...",
      "sourceQuestion": "Câu 5. Tác phong của Võ sinh Phật Quang Quyền khi tham gia công tác xã hội ra sao?",
      "id": "luc-4-c05-01"
    },
    {
      "type": "multiple",
      "question": "Võ sinh cần có thái độ nào trong những buổi sinh hoạt nội bộ môn phái?",
      "options": [
        "Thân ái: Đoàn kết, yêu thương và hiểu biết lẫn nhau, không gây bè phái hay đố kỵ.",
        "Hồn nhiên: Vui tươi, chân thành, phát huy năng khiếu nhưng không tự do quá trớn.",
        "Cởi mở: Chân tình, cảm thông và chia sẻ với đồng môn, không khoe khoang hay chọc phá nhau.",
        "Bao dung: Biết giúp đỡ, cảm thông, bỏ qua lỗi nhỏ và góp ý nhẹ nhàng để cùng nhau tiến bộ.",
        "Thân thiện: Đoàn kết, yêu thương và hiểu biết lẫn nhau, không tranh luận hay phản biện.",
        "Sôi nổi: Vui tươi, năng động, phát huy sở trường để làm trung tâm của sự chú ý.",
        "Chân thật: Thẳng thắn, phê bình khuyết điểm của đồng môn, không che giấu lỗi lầm.",
        "Nghiêm khắc: Biết uốn nắn, kỷ luật, trừng phạt lỗi nhỏ và phê bình gay gắt để cùng nhau tiến bộ."
      ],
      "correctIndices": [0, 1, 2, 3],
      "explanation": "Thân ái: Đoàn kết, yêu thương... Hồn nhiên: Vui tươi, chân thành... Cởi mở: Chân tình, cảm thông... Bao dung: Biết giúp đỡ, cảm thông...",
      "sourceQuestion": "Câu 6. Võ sinh hãy cho biết thái độ cần có trong những buổi sinh hoạt nội bộ môn phái.",
      "id": "luc-4-c06-01"
    },
    {
      "type": "single",
      "question": "Tác phong của Võ sinh Phật Quang Quyền khi giao tiếp với các võ phái bạn ra sao?",
      "options": [
        "Phải luôn thận trọng, khiêm tốn và nhã nhặn; phát huy tinh thần võ hữu, nêu cao tình liên ái và giữ gìn uy danh của môn phái.",
        "Phải luôn mạnh mẽ, tự tin và hòa đồng; phát huy tinh thần thể thao, nêu cao tình đoàn kết và giữ gìn uy danh của môn phái.",
        "Phải luôn thận trọng, nghiêm túc và lạnh lùng; phát huy tinh thần thượng võ, nêu cao tình đồng môn và giữ gìn uy danh của môn phái.",
        "Phải luôn tự hào, khiêm tốn và cởi mở; phát huy tinh thần cạnh tranh, nêu cao tình giao lưu và giữ gìn uy danh của môn phái."
      ],
      "correctIndex": 0,
      "explanation": "Khi giao tiếp với các võ phái bạn, Võ sinh Phật Quang Quyền phải luôn thận trọng, khiêm tốn và nhã nhặn; phát huy tinh thần võ hữu, nêu cao tình liên ái và giữ gìn uy danh của môn phái.",
      "sourceQuestion": "Câu 7. Tác phong của Võ sinh Phật Quang Quyền khi giao tiếp với các võ phái bạn ra sao?",
      "id": "luc-4-c07-01"
    },
    {
      "type": "multiple",
      "question": "Những bài nào sau đây nằm trong các bài võ quy định của Liên đoàn Võ cổ truyền Việt Nam hiện nay?",
      "options": [
        "Lão hổ thượng sơn",
        "Hùng kê quyền",
        "Ngọc trản quyền",
        "Lão mai quyền",
        "Phong hoa đao",
        "Thanh long độc kiếm",
        "Song tuyết kiếm",
        "Roi Thái sơn",
        "Siêu xung thiên",
        "Độc lư thương",
        "Mãnh hổ xuất sơn",
        "Kim kê quyền",
        "Ngọc trản ngân đài",
        "Thanh mai quyền",
        "Thái cực đao",
        "Xích long kiếm",
        "Song tinh kiếm",
        "Côn Thái sơn",
        "Kích xung thiên",
        "Lục lư thương"
      ],
      "correctIndices": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      "explanation": "Lão hổ thượng sơn, Hùng kê quyền, Ngọc trản quyền, Lão mai quyền, Phong hoa đao, Thanh long độc kiếm, Song tuyết kiếm, Roi Thái sơn, Siêu xung thiên, Độc lư thương.",
      "sourceQuestion": "Câu 8. Võ sinh hãy kể tên những bài võ quy định của Liên đoàn Võ cổ truyền Việt Nam hiện nay?",
      "id": "luc-4-c08-01"
    },
    {
      "type": "single",
      "question": "Vì sao người học võ phải lấy Đạo đức - Nhân nghĩa làm gốc?",
      "options": [
        "Đạo đức - Nhân nghĩa là nền tảng của nhân cách và là gốc rễ của người học võ. Người có võ mà thiếu đạo đức dễ sử dụng võ thuật sai mục đích. Ngược lại, người có đạo đức sẽ biết sống vị tha, hướng thiện, bảo vệ lẽ phải.",
        "Đạo đức - Nhân nghĩa là truyền thống lâu đời và là yêu cầu bắt buộc của môn phái. Người có võ mà thiếu đạo đức dễ vi phạm pháp luật. Ngược lại, người có đạo đức sẽ biết tuân thủ quy định, không đánh lộn.",
        "Đạo đức - Nhân nghĩa là tinh hoa của võ học và là nền tảng của người học võ. Người có võ mà thiếu đạo đức dễ bị tẩu hỏa nhập ma. Ngược lại, người có đạo đức sẽ dễ dàng luyện thành võ công cái thế.",
        "Đạo đức - Nhân nghĩa là tôn chỉ của Phật Quang Quyền. Người có võ mà thiếu đạo đức sẽ bị trục xuất khỏi sư môn. Ngược lại, người có đạo đức sẽ được sư phụ truyền dạy tuyệt kỹ."
      ],
      "correctIndex": 0,
      "explanation": "Đạo đức - Nhân nghĩa là nền tảng của nhân cách và là gốc rễ của người học võ. Người có võ mà thiếu đạo đức dễ sử dụng võ thuật sai mục đích, gây tổn hại cho bản thân và xã hội. Ngược lại, người có đạo đức sẽ biết sống vị tha, hướng thiện, bảo vệ lẽ phải...",
      "sourceQuestion": "Câu 9. Vì sao người học võ phải lấy Đạo đức - Nhân nghĩa làm gốc?",
      "id": "luc-4-c09-01"
    },
    {
      "type": "fill",
      "question": "Điền vào chỗ trống: Người Võ sinh Phật Quang Quyền phải lấy ______[1], lấy Bi – Trí – Dũng làm phương châm rèn luyện. Người môn sinh phải luôn rèn luyện theo tinh thần: ______[2]; sống có trách nhiệm với gia đình, xã hội, đất nước.",
      "blanks": [
        "Võ đạo làm nền tảng",
        "Sống, Giúp người khác sống và Sống cho người khác"
      ],
      "options": [
        "Võ thuật làm nền tảng",
        "Võ đạo làm kim chỉ nam",
        "Đạo đức làm nền tảng",
        "Sống, Giúp người khác sống và Sống vì bản thân",
        "Sống, Chiến đấu và Cống hiến cho xã hội",
        "Rèn luyện sức khỏe, Giúp đỡ người yếu và Bảo vệ đất nước"
      ],
      "explanation": "Người Võ sinh Phật Quang Quyền phải lấy Võ đạo làm nền tảng, lấy Bi – Trí – Dũng làm phương châm rèn luyện. Người môn sinh phải luôn rèn luyện theo tinh thần: Sống, Giúp người khác sống và Sống cho người khác; sống có trách nhiệm với gia đình, xã hội, đất nước...",
      "sourceQuestion": "Câu 10. Người Võ sinh Phật Quang Quyền phải tu dưỡng Đạo đức - Nhân nghĩa như thế nào?",
      "id": "luc-4-c10-01"
    },
    {
      "type": "single",
      "question": "Người Võ sinh Phật Quang Quyền phải đối xử với mọi người như thế nào?",
      "options": [
        "Bằng lòng tôn trọng, yêu thương, cảm thông và giúp đỡ; luôn cư xử với người khác như chính mình mong muốn được đối xử lại. Theo luật nhân quả, khi ta sống chân thành, vị tha và làm điều thiện, ta sẽ nhận lại những điều tốt đẹp.",
        "Bằng lòng công bằng, nghiêm minh, rõ ràng và khách quan; luôn cư xử với người khác theo đúng pháp luật hiện hành. Theo luật nhân quả, khi ta sống chân thật, ta sẽ không bị oan sai.",
        "Bằng lòng kính trọng, kiêng nể, phòng thủ và cảnh giác; luôn cư xử với người khác một cách khôn khéo để không bị lừa. Theo luật nhân quả, khi ta cẩn trọng, ta sẽ tránh được tai họa.",
        "Bằng lòng nhân từ, bao dung, tha thứ và nhẫn nhịn; luôn nhún nhường trước mọi yêu cầu của người khác. Theo luật nhân quả, khi ta sống cam chịu, ta sẽ tránh được xung đột."
      ],
      "correctIndex": 0,
      "explanation": "Người Võ sinh Phật Quang Quyền phải đối xử với mọi người bằng lòng tôn trọng, yêu thương, cảm thông và giúp đỡ; luôn cư xử với người khác như chính mình mong muốn được đối xử lại. Theo luật nhân quả, gieo nhân tốt sẽ gặt quả tốt...",
      "sourceQuestion": "Câu 11. Người Võ sinh Phật Quang Quyền phải đối xử với mọi người như thế nào?",
      "id": "luc-4-c11-01"
    },
    {
      "type": "definition",
      "question": "Theo lý thuyết Lục đai tứ cấp, biết ơn là gì?",
      "sampleAnswer": "Biết ơn là luôn ghi nhớ và trân trọng những sự giúp đỡ, dạy dỗ, yêu thương mà mình đã nhận được từ gia đình, thầy cô, bạn bè và mọi người trong cuộc sống.",
      "matchThreshold": 0.65,
      "explanation": "Biết ơn là luôn ghi nhớ và trân trọng những sự giúp đỡ, dạy dỗ, yêu thương mà mình đã nhận được từ gia đình, thầy cô, bạn bè và mọi người trong cuộc sống.",
      "sourceQuestion": "Câu 12. Biết ơn là gì?",
      "id": "luc-4-c12-01"
    },
    {
      "type": "single",
      "question": "Vì sao người môn sinh Phật Quang Quyền phải nuôi dưỡng lòng biết ơn?",
      "options": [
        "Vì lòng biết ơn giúp con người sống khiêm tốn, có tình nghĩa, biết trân trọng những giá trị tốt đẹp và không quên công lao của những người đã giúp đỡ mình trưởng thành.",
        "Vì lòng biết ơn giúp con người sống thanh thản, không nợ nần ai, biết trân trọng những món quà vật chất và không quên công lao của những người đã giúp đỡ mình trưởng thành.",
        "Vì lòng biết ơn giúp con người thăng tiến trong xã hội, tạo dựng được nhiều mối quan hệ, biết trân trọng những cơ hội và không quên công lao của những người đã giúp đỡ mình.",
        "Vì lòng biết ơn là truyền thống của dân tộc, giúp con người sống chan hòa, biết trả ơn sòng phẳng và không quên công lao của những người đã giúp đỡ mình trưởng thành."
      ],
      "correctIndex": 0,
      "explanation": "Vì lòng biết ơn giúp con người sống khiêm tốn, có tình nghĩa, biết trân trọng những giá trị tốt đẹp và không quên công lao của những người đã giúp đỡ mình trưởng thành.",
      "sourceQuestion": "Câu 13. Vì sao người môn sinh Phật Quang Quyền phải nuôi dưỡng lòng biết ơn?",
      "id": "luc-4-c13-01"
    },
    {
      "type": "single",
      "question": "Người môn sinh Phật Quang Quyền thực hành lòng biết ơn như thế nào?",
      "options": [
        "Luôn kính trọng và nhớ ơn những người đã giúp đỡ mình, cố gắng học tập, rèn luyện và sống tốt để đền đáp công ơn ấy; đồng thời biết giúp đỡ người khác để lan tỏa những điều tốt đẹp trong cuộc sống.",
        "Luôn kính trọng và nhớ ơn những người đã giúp đỡ mình, cố gắng làm việc để kiếm nhiều tiền để đền đáp công ơn ấy; đồng thời biết giúp đỡ gia đình để lan tỏa những điều tốt đẹp trong cuộc sống.",
        "Luôn tôn thờ và nhớ ơn những người đã giúp đỡ mình, nguyện hy sinh bản thân để đền đáp công ơn ấy; đồng thời biết bảo vệ người khác để lan tỏa những điều tốt đẹp trong cuộc sống.",
        "Luôn kính trọng và nhớ ơn những người đã giúp đỡ mình, thường xuyên tặng quà để đền đáp công ơn ấy; đồng thời biết khen ngợi người khác để lan tỏa những điều tốt đẹp trong cuộc sống."
      ],
      "correctIndex": 0,
      "explanation": "Luôn kính trọng và nhớ ơn những người đã giúp đỡ mình, cố gắng học tập, rèn luyện và sống tốt để đền đáp công ơn ấy; đồng thời biết giúp đỡ người khác để lan tỏa những điều tốt đẹp trong cuộc sống.",
      "sourceQuestion": "Câu 14. Người môn sinh Phật Quang Quyền thực hành lòng biết ơn như thế nào?",
      "id": "luc-4-c14-01"
    },
    {
      "type": "single",
      "question": "Nêu xuất xứ bài Thanh Long Độc Kiếm.",
      "options": [
        "Thanh Long Độc Kiếm là bài kiếm nằm trong hệ thống giáo án huấn luyện của võ phái Thanh Long Võ Đạo do Đại võ sư Quốc tế Lê Kim Hòa sáng lập. Bài kiếm lấy hình tượng uy mãnh của rồng làm chủ đạo.",
        "Thanh Long Độc Kiếm là bài kiếm nằm trong hệ thống giáo án huấn luyện của võ phái Bình Định Gia do Đại võ sư Quốc tế Lê Kim Hòa sáng lập. Bài kiếm lấy hình tượng uy mãnh của rồng làm chủ đạo.",
        "Thanh Long Độc Kiếm là bài kiếm nằm trong hệ thống giáo án huấn luyện của võ phái Vovinam do Đại võ sư Quốc tế Lê Kim Hòa sáng lập. Bài kiếm lấy hình tượng uy mãnh của rồng làm chủ đạo.",
        "Thanh Long Độc Kiếm là bài kiếm nằm trong hệ thống giáo án huấn luyện của võ phái Thanh Long Võ Đạo do Đại võ sư Quốc tế Lê Kim Trọng sáng lập. Bài kiếm lấy hình tượng uy mãnh của rồng làm chủ đạo."
      ],
      "correctIndex": 0,
      "explanation": "Thanh Long Độc Kiếm là bài kiếm nằm trong hệ thống giáo án huấn luyện của võ phái Thanh Long Võ Đạo do Đại võ sư Quốc tế Lê Kim Hòa sáng lập.",
      "sourceQuestion": "Câu 15. Nêu xuất xứ bài Thanh Long Độc Kiếm.",
      "id": "luc-4-c15-01"
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
