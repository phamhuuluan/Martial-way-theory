const fs = require('fs');
const path = '/Users/luanph/Project other/MARTIAL WAY THEORY/content/exam-bank/do-3.json';

const poemLines = [
  "Bái tổ Thái Sơn Côn.",
  "Thái sơn trích thuỷ địa xà liên.",
  "Thương thượng lộng ky, lân thoái bạch viên.",
  "Huy ky độc giác trung bình hạ.",
  "Thượng thích đại đăng tấn thừa thiên.",
  "Hồi đầu trực chỉ liên tam thích.",
  "Đồng Tân thuận thế gián vân biên.",
  "Tẩu độc thố, Trưng Sơn hoành gián kiếm.",
  "Linh miêu mai phục tấn thích ngưu.",
  "Thừa châu bố địa khai côn thích.",
  "Hồi tiểu kim kê đả trung lang.",
  "Phi phong tẩu võ khai ngưu giác.",
  "Tiểu tử tam phiền giá mã an.",
  "Bái Tổ Sư, lập như tiền."
];

const falseLines = [
  "Thái sơn hạ thuỷ địa xà liên.",
  "Thương hạ lộng ky, lân tiến bạch viên.",
  "Huy ky song giác trung bình hạ.",
  "Hạ thích đại đăng thoái thừa thiên.",
  "Hồi đầu trực chỉ liên nhất thích.",
  "Đồng Tân nghịch thế gián vân biên.",
  "Tẩu song thố, Trưng Sơn trực gián kiếm.",
  "Linh miêu ẩn phục tấn thích ngưu.",
  "Thừa châu bố thiên khai côn thích.",
  "Hồi đại kim kê đả trung lang.",
  "Phi phong tẩu mã khai ngưu giác.",
  "Tiểu tử nhất phiền giá mã an.",
  "Hồi Tổ Sư, lập như tiền.",
  "Thái sơn thượng thuỷ địa xà liên.",
  "Thương thượng lộng ky, sư thoái bạch viên."
];

const poemQuestions = [];

for (let i = 0; i < 10; i++) {
  const blankIndices = [];
  while (blankIndices.length < 10) {
    const r = Math.floor(Math.random() * poemLines.length);
    if (!blankIndices.includes(r)) blankIndices.push(r);
  }
  blankIndices.sort((a, b) => a - b);

  let questionText = "Điền vào chỗ trống lời thiệu bài quy định Thái Sơn Côn:\n\n";
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
    sourceQuestion: "Câu 17. Nêu lời thiệu bài quy định Thái Sơn Côn.",
    id: `do-3-c17-${i+2}`
  });
}

const data = {
  "rankId": "do-3",
  "beltId": "red",
  "lessonId": "red-lesson-03",
  "questions": [
    {
      "type": "multiple",
      "question": "Quan niệm của môn sinh Phật Quang Quyền về tu thân là không ngừng trao dồi và rèn luyện bản thân thường xuyên trên các phương diện nào?",
      "options": [
        "Hàm dưỡng ý chí",
        "Mở mang kiến thức",
        "Trau dồi đức hạnh",
        "Rèn luyện tài năng.",
        "Rèn luyện thể lực",
        "Tích lũy tiền bạc",
        "Trau dồi kỹ năng mềm",
        "Mở mang các mối quan hệ xã hội."
      ],
      "correctIndices": [0, 1, 2, 3],
      "explanation": "Tu thân là không ngừng trao dồi và rèn luyện bản thân thường xuyên trên các phương diện: Hàm dưỡng ý chí, Mở mang kiến thức, Trau dồi đức hạnh, Rèn luyện tài năng.",
      "sourceQuestion": "Câu 1. Quan niệm của môn sinh Phật Quang Quyền về tu thân ra sao?",
      "id": "do-3-c01-01"
    },
    {
      "type": "single",
      "question": "Võ sinh Phật Quang Quyền phải tề gia như thế nào?",
      "options": [
        "Tề gia là tổ chức và xây dựng gia đình một cách hợp lý, đặt đúng mối quan hệ, bổn phận và cách đối xử để gia đình hòa thuận. Người võ sinh phải biết kính trên, nhường dưới, yêu thương, quan tâm, giúp đỡ lẫn nhau; đồng thời sắp xếp cuộc sống gia đình hài hòa để mọi người cùng tiến bộ.",
        "Tề gia là tổ chức và xây dựng gia đình một cách nghiêm ngặt, đặt đúng vai vế, bổn phận và cách đối xử để gia đình có kỷ cương. Người võ sinh phải biết kính trên, răn đe kẻ dưới, yêu thương con cháu; đồng thời sắp xếp cuộc sống gia đình quy củ để mọi người cùng tuân thủ.",
        "Tề gia là tổ chức và phát triển kinh tế gia đình một cách hợp lý, đặt đúng lợi ích, bổn phận và cách làm việc để gia đình giàu có. Người võ sinh phải biết kính trên, nhường dưới, yêu thương, quan tâm, giúp đỡ lẫn nhau; đồng thời sắp xếp công việc gia đình hài hòa để mọi người cùng phát triển sự nghiệp.",
        "Tề gia là tổ chức và xây dựng gia đình một cách dân chủ, không phân biệt mối quan hệ, bổn phận để gia đình bình đẳng. Người võ sinh phải biết tôn trọng ý kiến cá nhân, yêu thương, quan tâm, giúp đỡ lẫn nhau; đồng thời sắp xếp cuộc sống gia đình thoải mái để mọi người tự do phát triển."
      ],
      "correctIndex": 0,
      "explanation": "Tề gia là tổ chức và xây dựng gia đình một cách hợp lý, đặt đúng mối quan hệ, bổn phận và cách đối xử giữa các thành viên để gia đình được hòa thuận... Người võ sinh phải biết kính trên, nhường dưới... sắp xếp cuộc sống gia đình hài hòa để mọi người cùng tiến bộ...",
      "sourceQuestion": "Câu 2. Võ sinh Phật Quang Quyền phải tề gia như thế nào?",
      "id": "do-3-c02-01"
    },
    {
      "type": "single",
      "question": "Môn sinh Phật Quang Quyền suy nghĩ sao về tình nghĩa thầy trò hiện nay?",
      "options": [
        "Tình nghĩa thầy trò ngày nay đã suy giảm nhiều vì ảnh hưởng của tư tưởng tự do, sự phát triển của khoa học kỹ thuật và sự thay đổi của nền giáo dục. Người học trải qua nhiều thầy cô nên sự gắn bó không sâu đậm như trước. Vì vậy, môn sinh Phật Quang Quyền phải luôn tôn sư trọng đạo.",
        "Tình nghĩa thầy trò ngày nay đã sâu đậm hơn vì ảnh hưởng của tư tưởng tự do, sự phát triển của khoa học kỹ thuật và sự thay đổi của nền giáo dục. Người học dễ dàng liên lạc với nhiều thầy cô nên sự gắn bó rất khắng khít. Vì vậy, môn sinh Phật Quang Quyền phải luôn tôn sư trọng đạo.",
        "Tình nghĩa thầy trò ngày nay đã suy giảm nhiều vì ảnh hưởng của nền kinh tế thị trường, sự phát triển của mạng xã hội và sự thay đổi của lối sống. Người học mải mê làm ăn nên sự gắn bó không sâu đậm như trước. Vì vậy, môn sinh Phật Quang Quyền phải luôn tôn sư trọng đạo.",
        "Tình nghĩa thầy trò ngày nay đã suy giảm nhiều vì ảnh hưởng của tư tưởng tự do, sự phát triển của khoa học kỹ thuật và sự thay đổi của nền giáo dục. Người học tự học qua mạng nhiều nên không cần đến thầy cô như trước. Vì vậy, môn sinh Phật Quang Quyền phải luôn tôn sư trọng đạo."
      ],
      "correctIndex": 0,
      "explanation": "Nói chung tình nghĩa thầy trò ngày nay đã suy giảm nhiều vì ảnh hưởng của tư tưởng tự do, sự phát triển của khoa học kỹ thuật và sự thay đổi của nền giáo dục. Ngày nay, người học thường trải qua nhiều thầy cô... Vì vậy, môn sinh Phật Quang Quyền phải luôn tôn sư trọng đạo, kính trọng và biết ơn...",
      "sourceQuestion": "Câu 3. Môn sinh Phật Quang Quyền suy nghĩ sao về tình nghĩa thầy trò hiện nay?",
      "id": "do-3-c03-01"
    },
    {
      "type": "fill",
      "question": "Điền vào chỗ trống: Muốn tình thầy trò được thiêng liêng, thân thiết:\nTrước hết, người thầy phải xứng đáng là thầy, có đạo đức, tư cách, tác phong mẫu mực và ______[1].\nThầy phải thành thật, tận tâm dạy dỗ, yêu thương và quan tâm học trò.\nVề phía học trò, phải trung thực, tôn kính, biết ơn thầy và ______[2] để làm rạng danh thầy.",
      "blanks": [
        "tinh thần phục vụ cao cả",
        "cố gắng thực hành những điều đã được thầy chỉ dạy"
      ],
      "options": [
        "tinh thần trách nhiệm cao cả",
        "trình độ chuyên môn xuất sắc",
        "khả năng truyền đạt tốt",
        "cố gắng rèn luyện võ thuật thật giỏi",
        "cố gắng thi đấu đạt thành tích cao",
        "cố gắng đóng góp tài chính cho võ đường"
      ],
      "explanation": "Trước hết, người thầy phải xứng đáng là thầy, có đạo đức, tư cách, tác phong mẫu mực và tinh thần phục vụ cao cả... Về phía học trò, phải trung thực, tôn kính, biết ơn thầy và cố gắng thực hành những điều đã được thầy chỉ dạy để làm rạng danh thầy.",
      "sourceQuestion": "Câu 4. Muốn tình thầy trò được thiêng liêng thân thiết, thầy trò phải đối xử với nhau ra sao?",
      "id": "do-3-c04-01"
    },
    {
      "type": "multiple",
      "question": "Môn sinh Phật Quang Quyền quan niệm về tình bạn và có những loại bạn nào?",
      "options": [
        "Bạn tâm giao: Cùng tâm hồn, cùng khuynh hướng, đồng cam cộng khổ.",
        "Bạn đồng chí: Cùng chí hướng, cùng lý tưởng và mục đích.",
        "Bạn đồng đạo: Cùng tôn giáo, nếp sống hoặc quan niệm sống.",
        "Bạn đồng môn: Cùng học một thầy, một trường hoặc một môn phái.",
        "Bạn đồng nghiệp: Cùng làm một nghề.",
        "Bạn đồng sự: Cùng làm chung một công việc.",
        "Bạn tri kỷ: Cùng sở thích, cùng đam mê, chia sẻ buồn vui.",
        "Bạn đồng hương: Cùng quê quán, cùng nguồn gốc và truyền thống.",
        "Bạn đồng hành: Cùng đi trên một chuyến đi hoặc chung một chặng đường.",
        "Bạn đồng trang lứa: Cùng độ tuổi, cùng thế hệ hoặc môi trường sống.",
        "Bạn xã giao: Cùng giao tiếp, quen biết trong các mối quan hệ xã hội.",
        "Bạn chiến đấu: Cùng ra trận, sát cánh bảo vệ Tổ quốc."
      ],
      "correctIndices": [0, 1, 2, 3, 4, 5],
      "explanation": "Có nhiều loại bạn: Bạn tâm giao... Bạn đồng chí... Bạn đồng đạo... Bạn đồng môn... Bạn đồng nghiệp... Bạn đồng sự...",
      "sourceQuestion": "5/:  Quan niệm về tình bạn của môn sinh Phật Quang Quyền ra sao? Có mấy loại bạn? Hảy giải thích đại cương?",
      "id": "do-3-c05-01"
    },
    {
      "type": "single",
      "question": "Tình bạn nào cao quý nhất trong tất cả các loại bạn?",
      "options": [
        "Bạn tâm giao là tình bạn cao quý nhất trong tất cả các loại bạn. Đó là những người có sự đồng cảm, thấu hiểu sâu sắc, chân thành với nhau, cùng chia sẻ vui buồn, hoạn nạn và luôn nghĩ cho nhau. Họ xem bạn như chính bản thân mình.",
        "Bạn đồng môn là tình bạn cao quý nhất trong tất cả các loại bạn. Đó là những người có sự đồng cảm, thấu hiểu sâu sắc, chân thành với nhau, cùng chia sẻ vui buồn, hoạn nạn và luôn nghĩ cho nhau. Họ xem bạn như chính bản thân mình.",
        "Bạn đồng chí là tình bạn cao quý nhất trong tất cả các loại bạn. Đó là những người có chung chí hướng, lý tưởng, quyết tâm phấn đấu, cùng chia sẻ vui buồn, hoạn nạn và luôn bảo vệ cho nhau. Họ xem bạn như chính bản thân mình.",
        "Bạn tâm giao là tình bạn cao quý nhất trong tất cả các loại bạn. Đó là những người có sự đồng cảm, thấu hiểu sâu sắc, chân thành với nhau, cùng hợp tác làm ăn, giúp đỡ tài chính và luôn nghĩ cho nhau. Họ xem bạn như đối tác quan trọng nhất."
      ],
      "correctIndex": 0,
      "explanation": "Bạn tâm giao là tình bạn cao quý nhất trong tất cả các loại bạn. Đó là những người có sự đồng cảm, thấu hiểu sâu sắc, chân thành với nhau, cùng chia sẻ vui buồn, hoạn nạn và luôn nghĩ cho nhau. Họ xem bạn như chính bản thân mình.",
      "sourceQuestion": "Câu 6. Tình bạn nào cao quý nhất trong tất cả các loại bạn?",
      "id": "do-3-c06-01"
    },
    {
      "type": "single",
      "question": "Muốn có bạn tâm giao, phải cư xử với bạn ra sao?",
      "options": [
        "Phải sống chân thành, thủy chung và đôn hậu với bạn. Cần hiểu rõ bạn về tài năng, đức độ, tình cảm và chí hướng; biết khuyến khích, giúp đỡ bạn tiến bộ, hỗ trợ khi bạn gặp khó khăn và chân thành khuyên ngăn khi bạn mắc sai lầm.",
        "Phải sống khéo léo, tế nhị và chiều chuộng bạn. Cần hiểu rõ bạn về hoàn cảnh, xuất thân, sở thích và điểm yếu; biết khen ngợi, động viên bạn tiến bộ, hỗ trợ khi bạn gặp khó khăn và giữ im lặng khi bạn mắc sai lầm để tránh mâu thuẫn.",
        "Phải sống thẳng thắn, rạch ròi và sòng phẳng với bạn. Cần hiểu rõ bạn về khả năng tài chính, sức khỏe, công việc và mục tiêu; biết hợp tác, giúp đỡ bạn làm giàu, hỗ trợ khi bạn cần tiền và nghiêm khắc chỉ trích khi bạn mắc sai lầm.",
        "Phải sống chân thành, bao dung và nhẫn nhịn với bạn. Cần hiểu rõ bạn về tài năng, đức độ, tình cảm và chí hướng; biết hy sinh, chịu thiệt thòi để bạn tiến bộ, tự gánh vác khi bạn gặp khó khăn và thay bạn sửa chữa khi bạn mắc sai lầm."
      ],
      "correctIndex": 0,
      "explanation": "Muốn có bạn tâm giao, ta phải sống chân thành, thủy chung và đôn hậu với bạn. Cần hiểu rõ bạn về tài năng, đức độ, tình cảm và chí hướng; biết khuyến khích, giúp đỡ bạn tiến bộ, hỗ trợ khi bạn gặp khó khăn và chân thành khuyên ngăn khi bạn mắc sai lầm.",
      "sourceQuestion": "Câu 7. Muốn có bạn tâm giao, phải cư xử với bạn ra sao?",
      "id": "do-3-c07-01"
    },
    {
      "type": "multiple",
      "question": "Khi thấy bạn đồng môn đánh nhau bị thua, ta tới can thiệp mới biết bạn sai, người môn sinh phải xử lý theo những bước nào?",
      "options": [
        "Bước 1: Ngay lập tức can ngăn hai bên; với thái độ nhã nhặn và chững chạc, thay mặt bạn mình chủ động xin lỗi đối phương.",
        "Bước 2: Sau đó, phân tích cho bạn hiểu rõ cái sai để sửa đổi. Nếu bạn vẫn ngoan cố, phải báo cáo lên người có trách nhiệm có biện pháp giáo dục, xử lý.",
        "Bước 3: Trường hợp đối phương cậy mình đúng và đang thắng thế, bất chấp lời xin lỗi mà vẫn cố tình xông vào tấn công, ta bắt buộc phải ra tay can thiệp trên tinh thần tự vệ để bảo vệ an toàn cho bạn mình.",
        "Bước 1: Ngay lập tức lao vào đánh lại đối phương để giải cứu bạn mình; với thái độ kiên quyết, yêu cầu đối phương dừng tay và xin lỗi bạn mình.",
        "Bước 2: Sau đó, đưa bạn về võ đường giấu kín sự việc để giữ thể diện. Nếu bạn vẫn bị thương nặng, phải âm thầm tìm cách trả đũa đối phương.",
        "Bước 3: Trường hợp đối phương cậy mình mạnh hơn và có nhiều người, bất chấp lời can ngăn mà vẫn cố tình xông vào tấn công, ta phải bỏ chạy để tìm người giúp đỡ thay vì bảo vệ an toàn cho bạn mình."
      ],
      "correctIndices": [0, 1, 2],
      "explanation": "Bước 1 (Giảng hòa và nhận lỗi)... Bước 2 (Giáo dục đồng môn)... Bước 3 (Tự vệ cứu bạn)...",
      "sourceQuestion": "Câu 9. Khi thấy bạn đồng môn đánh nhau bị thua, ta tới can thiệp mới biết bạn sai, thì ta nên làm gì?",
      "id": "do-3-c09-01"
    },
    {
      "type": "fill",
      "question": "Điền vào chỗ trống: Kẻ thù là người đối nghịch với ta về tình cảm, tư tưởng hoặc hành động, ______[1]. Tuy nhiên, người môn sinh Phật Quang Quyền không nuôi dưỡng lòng thù hận. Ta có thể tha thứ cho kẻ thù khi họ biết hối lỗi, sửa đổi, khi họ đã thất thế hoặc ______[2].",
      "blanks": [
        "gây tổn hại đến danh dự, quyền lợi hoặc cuộc sống của ta",
        "khi họ là người có nghĩa khí, biết điều phải trái"
      ],
      "options": [
        "có những hành vi xúc phạm, bôi nhọ hoặc tấn công ta",
        "làm ảnh hưởng đến gia đình, bạn bè hoặc người thân của ta",
        "phá hoại công việc, tài sản hoặc sự nghiệp của ta",
        "khi họ đã đền bù thiệt hại cho ta",
        "khi họ có hoàn cảnh đáng thương, cần được giúp đỡ",
        "khi họ cam kết không bao giờ tái phạm"
      ],
      "explanation": "Kẻ thù là người đối nghịch với ta về tình cảm, tư tưởng hoặc hành động, gây tổn hại đến danh dự, quyền lợi hoặc cuộc sống của ta... Ta có thể tha thứ cho kẻ thù khi họ biết hối lỗi, sửa đổi, khi họ đã thất thế hoặc khi họ là người có nghĩa khí, biết điều phải trái.",
      "sourceQuestion": "Câu 10. Thế nào là kẻ thù? Trường hợp nào có thể tha thứ kẻ thù?",
      "id": "do-3-c10-01"
    },
    {
      "type": "single",
      "question": "Ðộng cơ nào thúc đẩy người trong một nước phải thương yêu, bao bọc, giúp đỡ lẫn nhau?",
      "options": [
        "Đó là tình nghĩa đồng bào, một tình cảm tự nhiên phát sinh từ ý thức quốc gia, dân tộc và tình yêu quê hương, đất nước. Vì cùng chung một cội nguồn, một dân tộc và cùng xây dựng, bảo vệ đất nước nên mọi người cần thương yêu, đoàn kết, giúp đỡ lẫn nhau.",
        "Đó là tình đoàn kết giai cấp, một tình cảm tự nhiên phát sinh từ ý thức đấu tranh, giải phóng và tình yêu công lý, tự do. Vì cùng chung một hoàn cảnh, một lợi ích và cùng xây dựng, bảo vệ đất nước nên mọi người cần thương yêu, đoàn kết, giúp đỡ lẫn nhau.",
        "Đó là tình nghĩa láng giềng, một tình cảm tự nhiên phát sinh từ sự gần gũi địa lý, văn hóa và tình yêu xóm làng, cộng đồng. Vì cùng chung một môi trường, một địa phương và cùng xây dựng, bảo vệ đất nước nên mọi người cần thương yêu, đoàn kết, giúp đỡ lẫn nhau.",
        "Đó là tình nghĩa đồng bào, một tình cảm bắt buộc phát sinh từ luật pháp quốc gia, dân tộc và nghĩa vụ công dân. Vì cùng chung một cội nguồn, một dân tộc và cùng đóng thuế xây dựng đất nước nên mọi người cần thương yêu, đoàn kết, giúp đỡ lẫn nhau."
      ],
      "correctIndex": 0,
      "explanation": "Đó là tình nghĩa đồng bào, một tình cảm tự nhiên phát sinh từ ý thức quốc gia, dân tộc và tình yêu quê hương, đất nước. Vì cùng chung một cội nguồn, một dân tộc và cùng xây dựng, bảo vệ đất nước nên mọi người cần thương yêu, đoàn kết, giúp đỡ lẫn nhau.",
      "sourceQuestion": "Câu 11. Ðộng cơ nào thúc đẩy người trong một nước phải thương yêu, bao bọc, giúp đỡ lẫn nhau?",
      "id": "do-3-c11-01"
    },
    {
      "type": "multiple",
      "question": "Hai tiếng Tổ quốc gợi lên trong tâm hồn người môn sinh Phật Quang Quyền những điều gì?",
      "options": [
        "Lòng biết ơn sâu sắc: Nhớ về cội nguồn nòi giống và công ơn thiêng liêng, vĩ đại của tiền nhân trong cuộc tình dựng nước, giữ nước.",
        "Trách nhiệm phụng sự: Ý thức rõ nghĩa vụ bảo vệ, xây dựng và làm phong phú thêm di sản quý báu mà tổ tiên để lại.",
        "Đạo đức tâm linh cao cả: Coi tình yêu Tổ quốc là cội nguồn của lòng từ bi, là động lực để tu tập, rèn luyện võ thuật nhằm cống hiến cho giống nòi.",
        "Lòng tự hào dân tộc: Nhớ về những chiến công hiển hách và sức mạnh vĩ đại của tiền nhân trong các cuộc kháng chiến chống ngoại xâm.",
        "Trách nhiệm bảo vệ: Ý thức rõ nghĩa vụ tham gia quân đội, sẵn sàng chiến đấu và hy sinh để giữ vững biên cương tổ tiên để lại.",
        "Đạo đức tinh thần mạnh mẽ: Coi tình yêu Tổ quốc là sức mạnh vô địch, là động lực để luyện tập võ công nhằm tiêu diệt kẻ thù."
      ],
      "correctIndices": [0, 1, 2],
      "explanation": "Hai tiếng Tổ quốc gợi lên trong tâm hồn người môn sinh PQQ: Lòng biết ơn sâu sắc... Trách nhiệm phụng sự... Đạo đức tâm linh cao cả...",
      "sourceQuestion": "Câu 12. Tổ quốc là gì? Hai tiếng tổ quốc đã gợi lên trong lòng ta những gì?",
      "id": "do-3-c12-01"
    },
    {
      "type": "single",
      "question": "Môn sinh Phật Quang Quyền quan niệm ra sao về tình nhân loại?",
      "options": [
        "Tình nhân loại là tình thương yêu rộng lớn đối với mọi người. Người môn sinh yêu nước nhưng không kỳ thị dân tộc khác. Phục vụ đồng bào là bước khởi đầu để phục vụ nhân loại. Vì vậy, phải tôn trọng sự khác biệt giữa các dân tộc, góp phần xây dựng tình đoàn kết, hòa bình.",
        "Tình nhân loại là tình thương yêu rộng lớn đối với mọi người. Người môn sinh yêu nhân loại hơn yêu nước, không phân biệt biên giới quốc gia. Phục vụ nhân loại là mục tiêu cao cả nhất. Vì vậy, phải xóa bỏ sự khác biệt giữa các dân tộc, góp phần xây dựng thế giới đại đồng.",
        "Tình nhân loại là sự hợp tác đôi bên cùng có lợi giữa các quốc gia. Người môn sinh yêu nước nhưng sẵn sàng thỏa hiệp với dân tộc khác. Hợp tác kinh tế là bước khởi đầu để phục vụ nhân loại. Vì vậy, phải tôn trọng lợi ích chung giữa các dân tộc, góp phần xây dựng hòa bình.",
        "Tình nhân loại là tình thương yêu rộng lớn đối với mọi người. Người môn sinh yêu nước và luôn đề cao dân tộc mình hơn dân tộc khác. Phục vụ đồng bào là bước duy nhất để phục vụ nhân loại. Vì vậy, phải bảo vệ sự khác biệt của dân tộc mình, không cần quan tâm đến thế giới."
      ],
      "correctIndex": 0,
      "explanation": "Tình nhân loại là tình thương yêu rộng lớn đối với mọi người... Người môn sinh... yêu nước... không kỳ thị hay xem thường dân tộc khác. Phục vụ đồng bào và dân tộc là bước khởi đầu để phục vụ nhân loại. Vì vậy... tôn trọng sự khác biệt... góp phần xây dựng tình đoàn kết...",
      "sourceQuestion": "Câu 13. Môn sinh Phật Quang Quyền quan niệm ra sao về tình nhân loại?",
      "id": "do-3-c13-01"
    },
    {
      "type": "definition",
      "question": "Theo lý thuyết, kết thân riêng là gì?",
      "sampleAnswer": "Kết thân riêng là chỉ gần gũi, quan tâm và ưu ái một vài người mà thờ ơ hoặc xa cách với những người khác trong tập thể.",
      "matchThreshold": 0.65,
      "explanation": "Kết thân riêng là chỉ gần gũi, quan tâm và ưu ái một vài người mà thờ ơ hoặc xa cách với những người khác trong tập thể.",
      "sourceQuestion": "Câu 14. Hỏi:Kết thân riêng là gì?",
      "id": "do-3-c14-01"
    },
    {
      "type": "single",
      "question": "Tác hại của việc kết thân riêng đối với người môn sinh Phật Quang Quyền là gì?",
      "options": [
        "Kết thân riêng dễ dẫn đến thiên vị, chia bè phái, làm mất tinh thần đoàn kết và công bằng trong tập thể. Khi đó, con người dễ bị chi phối bởi tình cảm riêng mà không còn nhìn nhận sự việc một cách khách quan.",
        "Kết thân riêng dễ dẫn đến việc ỷ lại, bao che khuyết điểm, làm giảm hiệu quả học tập và rèn luyện trong tập thể. Khi đó, con người dễ bị chi phối bởi thói quen xấu mà không còn nỗ lực phấn đấu vươn lên.",
        "Kết thân riêng dễ dẫn đến ghen tị, xích mích cá nhân, làm mất trật tự và kỷ luật trong môn phái. Khi đó, con người dễ bị chi phối bởi sự ích kỷ mà không còn tuân thủ nội quy của võ đường.",
        "Kết thân riêng dễ dẫn đến việc rò rỉ bí kíp võ công, chia sẻ kỹ thuật sai lệch, làm mất đi sự thuần khiết và truyền thống trong tập thể. Khi đó, con người dễ bị chi phối bởi lợi ích nhóm mà không còn tôn trọng môn phái."
      ],
      "correctIndex": 0,
      "explanation": "Kết thân riêng dễ dẫn đến thiên vị, chia bè phái, làm mất tinh thần đoàn kết và công bằng trong tập thể. Khi đó, con người dễ bị chi phối bởi tình cảm riêng mà không còn nhìn nhận sự việc một cách khách quan.",
      "sourceQuestion": "Câu 15. Hỏi: Tác hại của việc kết thân riêng đối với người môn sinh Phật Quang Quyền là gì?",
      "id": "do-3-c15-01"
    },
    {
      "type": "single",
      "question": "Người môn sinh Phật Quang Quyền thực hành tinh thần không kết thân riêng như thế nào?",
      "options": [
        "Luôn cư xử hòa nhã, tôn trọng và quan tâm đến mọi người một cách công bằng; biết quý trọng người có đức hạnh nhưng không thiên vị, không tạo phe nhóm và luôn đặt lợi ích chung của tập thể lên trên tình cảm riêng tư.",
        "Luôn cư xử lạnh lùng, xa cách và giữ khoảng cách với mọi người một cách bình đẳng; không kết thân với bất kỳ ai, không tham gia phe nhóm và luôn đặt công việc tập luyện lên trên tất cả các mối quan hệ xã hội.",
        "Luôn cư xử nhiệt tình, thân thiết và quan tâm đặc biệt đến những người cùng chí hướng; biết bảo vệ đồng môn nhưng không bao che, không tạo phe phái và luôn đặt lợi ích của nhóm mình lên hàng đầu.",
        "Luôn cư xử hòa nhã, tôn trọng và quan tâm đến mọi người một cách công bằng; biết quý trọng người giỏi võ nhưng không thiên vị, không tạo phe nhóm và luôn đặt danh tiếng của võ đường lên trên tình cảm riêng tư."
      ],
      "correctIndex": 0,
      "explanation": "Luôn cư xử hòa nhã, tôn trọng và quan tâm đến mọi người một cách công bằng; biết quý trọng người có đức hạnh nhưng không thiên vị, không tạo phe nhóm và luôn đặt lợi ích chung của tập thể lên trên tình cảm riêng tư.",
      "sourceQuestion": "Câu 16. Hỏi: Người môn sinh Phật Quang Quyền thực hành tinh thần không kết thân riêng như thế nào?",
      "id": "do-3-c16-01"
    },
    {
      "type": "single",
      "question": "Nêu xuất xứ bài quyền quy định Thái Sơn Côn.",
      "options": [
        "Trích từ một tập tư liệu võ thuật cổ chữ Hán - Nôm, sưu tầm tại võ đường Phan Thọ, xã Bình Nghi, huyện Tây Sơn, Bình Định. Lời thiệu do ông Đào Thống ký tên. Ngày nay, Liên đoàn đưa vào chương trình huấn luyện thống nhất cả nước.",
        "Trích từ một tập tư liệu võ thuật cổ chữ Quốc ngữ, sưu tầm tại võ đường Ngô Bông, xã Bình Nghi, huyện Tây Sơn, Bình Định. Lời thiệu do ông Hà Trọng Sơn ký tên. Ngày nay, Liên đoàn đưa vào chương trình huấn luyện thống nhất cả nước.",
        "Trích từ một tập tư liệu võ thuật cổ chữ Hán - Nôm, sưu tầm tại võ đường Trương Chưởng, xã Bình Nghi, huyện Tây Sơn, Bình Định. Lời thiệu do ông Đào Thống ký tên. Ngày nay, Liên đoàn đưa vào chương trình huấn luyện thống nhất cả nước.",
        "Trích từ một tập tư liệu võ thuật cổ chữ Hán - Nôm, sưu tầm tại võ đường Phan Thọ, xã An Nhơn, huyện Tây Sơn, Bình Định. Lời thiệu do ông Đào Thống ký tên. Ngày nay, Liên đoàn đưa vào chương trình thi đấu quốc tế."
      ],
      "correctIndex": 0,
      "explanation": "Bài Thái Sơn Côn được trích từ một tập tư liệu võ thuật cổ viết bằng chữ Hán - Nôm, được sưu tầm tại võ đường Phan Thọ, xã Bình Nghi, huyện Tây Sơn, tỉnh Bình Định. Lời thiệu bài do ông Đào Thống ký tên... Ngày nay, Liên đoàn... đã đưa bài Thái Sơn Côn vào chương trình huấn luyện...",
      "sourceQuestion": "Câu 17. NÊU XUẤT XỨ VÀ LỜI THIỆU BÀI QUYỀN QUY ĐỊNH THÁI CƠN CÔN",
      "id": "do-3-c17-01"
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
