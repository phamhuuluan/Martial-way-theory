const fs = require('fs');
const path = '/Users/luanph/Project other/MARTIAL WAY THEORY/content/exam-bank/luc-1.json';

const poemLines = [
  "Bái tổ Ngọc trản quyền",
  "Tam bộ bái tổ.",
  "Nhị bộ kỉnh sư.",
  "Hồi thân lập trụ.",
  "Ngọc trản ngân đài.",
  "Tả hữu tấn khai.",
  "Thập tự luyện diệp.",
  "Liên đả sát túc.",
  "Toạ hồi mai phục.",
  "Tấn đả tam chiến.",
  "Thối thủ nhị linh.",
  "Tả hoành sát, hữu hoành sát.",
  "Hồi phát địa hổ.",
  "Thanh long biên giang.",
  "Phụ tử tương tùy.",
  "Song phi triển dực.",
  "Hạ bàn lôi đản đả.",
  "Hồi tiểu tọa khai cung.",
  "Tấn đả song quyền.",
  "Trực tiền quyển địa.",
  "Huỳnh long quyển địa.",
  "Đồng tử giương thân.",
  "Hoành tấn đả liên hoàn.",
  "Hồi tả tọa, bạch xà lang lộ.",
  "Tả hoành sát, thanh long biên giang.",
  "Kim kê điển thủ.",
  "Thối tảo bát liên hoàn.",
  "Tẩu mã dương tiên.",
  "Lập bộ như tiền.",
  "Hồi đầu vọng bái."
];

const falseLines = [
  "Bái tổ Ngọc trản ngân",
  "Tứ bộ bái tổ.",
  "Nhất bộ kỉnh sư.",
  "Hồi thân lập tấn.",
  "Ngọc trản liên đài.",
  "Tả hữu tấn công.",
  "Thập tự bạt diệp.",
  "Liên đả sát quyền.",
  "Toạ hồi phục binh.",
  "Tấn đả song chiến.",
  "Thối thủ nhất linh.",
  "Tả hoành trảm, hữu hoành trảm.",
  "Hồi phát thiên hổ.",
  "Thanh long quá giang.",
  "Mẫu tử tương tùy."
];

const poemQuestions = [];

for (let i = 0; i < 10; i++) {
  const blankIndices = [];
  while (blankIndices.length < 10) {
    const r = Math.floor(Math.random() * poemLines.length);
    if (!blankIndices.includes(r)) blankIndices.push(r);
  }
  blankIndices.sort((a, b) => a - b);

  let questionText = "Điền vào chỗ trống lời thiệu bài quyền Ngọc Trản Quyền:\n\n";
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
    sourceQuestion: "Câu 11. Nêu xuất xứ bài Ngọc trản quyền, và đọc bài thiệu.",
    id: `luc-1-c11-${i+2}`
  });
}

const data = {
  "rankId": "luc-1",
  "beltId": "green",
  "lessonId": "green-lesson-01",
  "questions": [
    {
      "type": "multiple",
      "question": "Những lợi ích của việc học Võ cổ truyền Việt Nam và Phật Quang Quyền là gì?",
      "options": [
        "Rèn luyện sức khỏe, ý chí và tinh thần thượng võ.",
        "Trau dồi đạo đức, nhân cách, sống từ bi, vị tha và có trách nhiệm.",
        "Nâng cao ý thức học tập, lao động, chủ động trong cuộc sống.",
        "Nuôi dưỡng lòng yêu nước, sẵn sàng góp phần xây dựng và bảo vệ Tổ quốc.",
        "Rèn luyện sức khỏe, thể chất và tinh thần thể thao.",
        "Trau dồi đạo đức, nhân cách, sống vị kỷ, từ bi và có trách nhiệm.",
        "Nâng cao ý thức học tập, thi đấu, chủ động trong cuộc sống.",
        "Nuôi dưỡng lòng yêu nước, sẵn sàng hy sinh để bảo vệ môn phái."
      ],
      "correctIndices": [0, 1, 2, 3],
      "explanation": "Rèn luyện sức khỏe, ý chí và tinh thần thượng võ. Trau dồi đạo đức, nhân cách, sống từ bi, vị tha và có trách nhiệm. Nâng cao ý thức học tập, lao động, chủ động trong cuộc sống. Nuôi dưỡng lòng yêu nước, sẵn sàng góp phần xây dựng và bảo vệ Tổ quốc.",
      "sourceQuestion": "Câu 1. Câu hỏi: Những lợi ích của việc học Võ cổ truyền Việt Nam và Phật Quang Quyền là gì?",
      "id": "luc-1-c01-01"
    },
    {
      "type": "single",
      "question": "Nguyên nhân gì giúp võ sinh trở thành một người thầy dạy võ?",
      "options": [
        "Để trở thành người thầy dạy võ, võ sinh phải siêng năng khổ luyện, không ngừng học hỏi và tu dưỡng đạo đức. Bên cạnh việc giỏi võ thuật, người dạy võ còn phải có kiến thức võ học, tinh thần trách nhiệm, lòng yêu nghề và khả năng truyền đạt.",
        "Để trở thành người thầy dạy võ, võ sinh phải siêng năng thi đấu, không ngừng học hỏi và rèn luyện thể lực. Bên cạnh việc giỏi võ thuật, người dạy võ còn phải có kiến thức võ học, tinh thần trách nhiệm, lòng yêu nghề và khả năng truyền đạt.",
        "Để trở thành người thầy dạy võ, võ sinh phải siêng năng khổ luyện, không ngừng học hỏi và tu dưỡng đạo đức. Bên cạnh việc giỏi võ thuật, người dạy võ còn phải có thành tích thi đấu, tinh thần trách nhiệm, lòng yêu nghề và khả năng truyền đạt.",
        "Để trở thành người thầy dạy võ, võ sinh phải siêng năng khổ luyện, không ngừng học hỏi và tu dưỡng đạo đức. Bên cạnh việc giỏi võ thuật, người dạy võ còn phải có kiến thức y học, tinh thần trách nhiệm, lòng yêu nghề và khả năng truyền đạt."
      ],
      "correctIndex": 0,
      "explanation": "Để trở thành người thầy dạy võ, võ sinh phải siêng năng khổ luyện, không ngừng học hỏi và tu dưỡng đạo đức. Bên cạnh việc giỏi võ thuật, người dạy võ còn phải có kiến thức võ học, tinh thần trách nhiệm, lòng yêu nghề và khả năng truyền đạt để hướng dẫn thế hệ sau.",
      "sourceQuestion": "Câu 2. Câu hỏi: Võ sinh hãy cho biết nguyên nhân gì giúp võ sinh trở thành một người thầy dạy võ?",
      "id": "luc-1-c02-01"
    },
    {
      "type": "multiple",
      "question": "Yếu tố nào giúp Võ cổ truyền Việt Nam đứng vững giữa phong trào võ thuật quốc tế phong phú, đa dạng hiện nay?",
      "options": [
        "Bề dày lịch sử, gắn liền với quá trình dựng nước và giữ nước của dân tộc Việt Nam.",
        "Bản sắc văn hóa dân tộc, thể hiện qua tinh thần thượng võ, đạo đức và truyền thống Việt Nam.",
        "Những tinh hoa võ học đặc sắc, được bảo tồn, chuẩn hóa và quảng bá rộng rãi thông qua Liên đoàn Võ cổ truyền Việt Nam và Liên đoàn Thế giới Võ cổ truyền Việt Nam, giúp võ cổ truyền từng bước hội nhập quốc tế.",
        "Bề dày thành tích, gắn liền với các giải đấu và hoạt động phong trào của dân tộc Việt Nam.",
        "Bản sắc văn hóa phương Đông, thể hiện qua tinh thần thượng võ, đạo lý và truyền thống Á Đông.",
        "Những tinh hoa võ thuật hiện đại, được bảo tồn, chuẩn hóa và quảng bá rộng rãi thông qua Liên đoàn, giúp hội nhập quốc tế."
      ],
      "correctIndices": [0, 1, 2],
      "explanation": "Bề dày lịch sử, gắn liền với quá trình dựng nước và giữ nước. Bản sắc văn hóa dân tộc, thể hiện qua tinh thần thượng võ. Những tinh hoa võ học đặc sắc, được bảo tồn, chuẩn hóa và quảng bá rộng rãi...",
      "sourceQuestion": "Câu 3. Yếu tố nào giúp Võ cổ truyền Việt Nam đứng vững giữa phong trào võ thuật quốc tế phong phú, đa dạng hiện nay?",
      "id": "luc-1-c03-01"
    },
    {
      "type": "single",
      "question": "Thế nào là tháo vát hành động?",
      "options": [
        "Tháo vát hành động là biết chủ động, thông minh, sáng tạo và linh hoạt trong công việc; biết thích ứng với mọi hoàn cảnh, xử lý sự việc hợp tình, hợp lý. Người tháo vát luôn biết hợp tác với mọi người, không ỷ lại, không gian trá, không kiêu căng và bình tĩnh vượt qua khó khăn.",
        "Tháo vát hành động là biết chủ động, khôn ngoan, sáng tạo và linh hoạt trong công việc; biết thích ứng với mọi hoàn cảnh, xử lý sự việc hợp tình, hợp lý. Người tháo vát luôn biết độc lập tác chiến, không ỷ lại, không gian trá, không kiêu căng và bình tĩnh vượt qua khó khăn.",
        "Tháo vát hành động là biết chủ động, thông minh, sáng tạo và lanh lẹ trong công việc; biết thích ứng với mọi hoàn cảnh, xử lý sự việc bằng sức mạnh. Người tháo vát luôn biết hợp tác, không ỷ lại, không gian trá, không kiêu căng và bình tĩnh vượt qua khó khăn.",
        "Tháo vát hành động là biết chủ động, thông minh, nhạy bén và linh hoạt trong công việc; biết thích ứng với mọi hoàn cảnh, xử lý sự việc hợp tình, hợp lý. Người tháo vát luôn biết tranh thủ cơ hội, không ỷ lại, không gian trá, không kiêu căng và bình tĩnh vượt qua khó khăn."
      ],
      "correctIndex": 0,
      "explanation": "Tháo vát hành động là biết chủ động, thông minh, sáng tạo và linh hoạt trong công việc; biết thích ứng với mọi hoàn cảnh, xử lý sự việc hợp tình, hợp lý. Người tháo vát luôn biết hợp tác với mọi người, không ỷ lại, không gian trá, không kiêu căng và bình tĩnh vượt qua khó khăn.",
      "sourceQuestion": "Câu 4. Thế nào là tháo vát hành động?",
      "id": "luc-1-c04-01"
    },
    {
      "type": "multiple",
      "question": "Thế nào là tự tin, tự thắng, khiêm cung, độ lượng?",
      "options": [
        "Tự tin: Tin vào năng lực, phẩm chất đạo đức và ý chí của bản thân, biết phát huy những điều tốt đẹp để tiến bộ.",
        "Tự thắng: Chiến thắng chính mình, sửa chữa những thói hư, tật xấu và sự ích kỷ, yếu đuối của bản thân.",
        "Khiêm cung: Khiêm nhường với người ngang hàng, cung kính đối với người trên và người lớn tuổi hơn mình.",
        "Độ lượng: Rộng lượng, bao dung với người dưới và người nhỏ tuổi hơn mình.",
        "Tự tin: Tin vào sức mạnh, kỹ thuật võ thuật và ý chí của bản thân, biết phát huy những điều tốt đẹp để tiến bộ.",
        "Tự thắng: Chiến thắng đối thủ, sửa chữa những điểm yếu trong kỹ thuật và sự yếu đuối của bản thân.",
        "Khiêm cung: Khiêm nhường với người dưới, cung kính đối với người trên và người lớn tuổi hơn mình.",
        "Độ lượng: Rộng lượng, bao dung với tất cả mọi người bất kể lớn nhỏ."
      ],
      "correctIndices": [0, 1, 2, 3],
      "explanation": "Tự tin: Tin vào năng lực, phẩm chất đạo đức... Tự thắng: Chiến thắng chính mình... Khiêm cung: Khiêm nhường với người ngang hàng, cung kính đối với người trên... Độ lượng: Rộng lượng, bao dung với người dưới...",
      "sourceQuestion": "Câu 5. Thế nào là tự tin, tự thắng, khiêm cung, độ lượng?",
      "id": "luc-1-c05-01"
    },
    {
      "type": "single",
      "question": "Võ sinh Phật Quang Quyền nhìn lại những việc đã qua với thái độ như thế nào?",
      "options": [
        "Luôn nhìn lại những việc đã qua với tinh thần tự kiểm điểm và rút kinh nghiệm để tiến bộ. Không kiêu ngạo, tự mãn khi thành công, cũng không than trách hay bi quan khi gặp thất bại.",
        "Luôn nhìn lại những việc đã qua với tinh thần tự phê bình và kiểm điểm người khác để tiến bộ. Không kiêu ngạo, tự mãn khi thành công, cũng không than trách hay bi quan khi gặp thất bại.",
        "Luôn nhìn lại những việc đã qua với tinh thần tự kiểm điểm và rút kinh nghiệm để tiến bộ. Được kiêu ngạo, tự mãn khi thành công nhưng không than trách hay bi quan khi gặp thất bại.",
        "Luôn nhìn lại những việc đã qua với tinh thần tự hào và rút kinh nghiệm để tiến bộ. Không kiêu ngạo, tự mãn khi thành công, cũng không than trách hay bi quan khi gặp thất bại."
      ],
      "correctIndex": 0,
      "explanation": "Võ sinh Phật Quang Quyền luôn nhìn lại những việc đã qua với tinh thần tự kiểm điểm và rút kinh nghiệm để tiến bộ. Không kiêu ngạo, tự mãn khi thành công, cũng không than trách hay bi quan khi gặp thất bại.",
      "sourceQuestion": "Câu 6. Võ sinh Phật Quang Quyền nhìn lại những việc đã qua với thái độ như thế nào?",
      "id": "luc-1-c06-01"
    },
    {
      "type": "single",
      "question": "Một trường dạy võ thuật khác với một trường dạy võ đạo ra sao?",
      "options": [
        "Một trường dạy võ thuật chủ yếu hướng dẫn người học các kỹ thuật chiến đấu, tự vệ và sử dụng sức mạnh. Một trường dạy võ đạo ngoài việc truyền dạy võ thuật còn giáo dục đạo đức, nhân cách và quan niệm sống đúng đắn.",
        "Một trường dạy võ thuật chủ yếu hướng dẫn người học các kỹ thuật biểu diễn, tự vệ và sử dụng sức mạnh. Một trường dạy võ đạo ngoài việc truyền dạy võ thuật còn giáo dục đạo đức, nhân cách và quan niệm sống đúng đắn.",
        "Một trường dạy võ thuật chủ yếu hướng dẫn người học các kỹ thuật chiến đấu, tự vệ và sử dụng sức mạnh. Một trường dạy võ đạo tập trung hoàn toàn vào giáo dục đạo đức, nhân cách và quan niệm sống đúng đắn.",
        "Một trường dạy võ thuật chủ yếu hướng dẫn người học các kỹ thuật chiến đấu, thể lực. Một trường dạy võ đạo ngoài việc truyền dạy võ thuật còn giáo dục sức khỏe, nhân cách và quan niệm sống đúng đắn."
      ],
      "correctIndex": 0,
      "explanation": "Trường dạy võ thuật chủ yếu hướng dẫn kỹ thuật chiến đấu, tự vệ. Trường dạy võ đạo ngoài việc truyền dạy võ thuật còn giáo dục đạo đức, nhân cách và quan niệm sống đúng đắn.",
      "sourceQuestion": "Câu 7. Một trường dạy võ thuật khác với một trường dạy võ đạo ra sao?",
      "id": "luc-1-c07-01"
    },
    {
      "type": "fill",
      "question": "Điền vào chỗ trống: Một môn phái võ thuật muốn phát triển thành võ đạo phải có ______[1], hệ thống võ thuật toàn diện, phương pháp giảng dạy hiệu quả và ______[2] để xây dựng, quảng bá và phát triển môn phái.",
      "blanks": [
        "tinh thần dân tộc rõ ràng, ý thức hệ đúng đắn",
        "thời gian đủ dài"
      ],
      "options": [
        "tinh thần thượng võ rõ ràng, ý thức hệ đúng đắn",
        "tinh thần yêu nước rõ ràng, lý tưởng đúng đắn",
        "tinh thần dân tộc rõ ràng, đường lối đúng đắn",
        "nguồn tài chính đủ mạnh",
        "số lượng võ sinh đông đảo",
        "cơ sở vật chất khang trang"
      ],
      "explanation": "Một môn phái võ thuật muốn phát triển thành võ đạo phải có tinh thần dân tộc rõ ràng, ý thức hệ đúng đắn, hệ thống võ thuật toàn diện, phương pháp giảng dạy hiệu quả và thời gian đủ dài để xây dựng, quảng bá và phát triển môn phái.",
      "sourceQuestion": "Câu 8. Một môn phái võ thuật muốn đi đến võ đạo phải có những điều kiện gì?",
      "id": "luc-1-c08-01"
    },
    {
      "type": "multiple",
      "question": "Môn sinh Phật Quang Quyền cần có quan niệm như thế nào về Tâm, Trí, Thể?",
      "options": [
        "Về Tâm: Có lý tưởng sống đúng đắn, lòng yêu thương dân tộc và nhân loại, tinh thần trách nhiệm, ý chí và nghị lực vươn lên.",
        "Về Trí: Có trí tuệ phân biệt đúng sai, biết bênh vực lẽ phải, sống theo đạo đức và hiểu Luật Nhân Quả.",
        "Về Thể: Có sức khỏe, sự dẻo dai, khả năng tự vệ và tinh thần vượt khó để phục vụ cuộc sống và giúp ích cho xã hội.",
        "Về Tâm: Có lý tưởng sống cao đẹp, lòng yêu thương gia đình và bạn bè, tinh thần trách nhiệm, ý chí và nghị lực vươn lên.",
        "Về Trí: Có trí tuệ uyên bác, biết bênh vực kẻ yếu, sống theo pháp luật và hiểu biết xã hội.",
        "Về Thể: Có sức mạnh, sự cương mãnh, khả năng thi đấu và tinh thần vượt khó để phục vụ cuộc sống và giúp ích cho xã hội."
      ],
      "correctIndices": [0, 1, 2],
      "explanation": "Về Tâm: lý tưởng sống đúng đắn, lòng yêu thương dân tộc... Về Trí: trí tuệ phân biệt đúng sai, sống theo đạo đức, hiểu Luật Nhân Quả. Về Thể: sức khỏe, dẻo dai, khả năng tự vệ, vượt khó.",
      "sourceQuestion": "Câu 9. Môn sinh Phật Quang Quyền cần có quan niệm như thế nào về Tâm, Trí, Thể?",
      "id": "luc-1-c09-01"
    },
    {
      "type": "single",
      "question": "Thế nào là chính khí và tinh thần thượng võ?",
      "options": [
        "Chính khí là phẩm chất sống ngay thẳng, trung thực, chính trực, có lý tưởng, không khuất phục trước khó khăn, cường quyền hay cám dỗ. Tinh thần thượng võ là sống có nhân nghĩa, lễ độ, trí tuệ, uy dũng, tôn trọng lẽ phải, yêu chuộng hòa bình nhưng sẵn sàng đấu tranh bảo vệ công lý, Tổ quốc và những điều tốt đẹp.",
        "Chính khí là phẩm chất sống ngay thẳng, trung thực, chính trực, không khuất phục trước cường quyền. Tinh thần thượng võ là sống nhân nghĩa, tôn trọng sức mạnh, yêu chuộng hòa bình nhưng sẵn sàng đấu tranh bảo vệ công lý, Tổ quốc.",
        "Chính khí là phẩm chất sống ngay thẳng, can đảm, quả cảm, không khuất phục trước cường quyền. Tinh thần thượng võ là sống nhân nghĩa, tôn trọng lẽ phải, yêu chuộng hòa bình nhưng sẵn sàng đấu tranh bảo vệ công lý, Tổ quốc.",
        "Chính khí là phẩm chất sống ngay thẳng, trung thực, chính trực, không khuất phục trước cường quyền. Tinh thần thượng võ là sống hiếu chiến, tôn trọng lẽ phải, yêu chuộng hòa bình nhưng sẵn sàng đấu tranh bảo vệ công lý, Tổ quốc."
      ],
      "correctIndex": 0,
      "explanation": "Chính khí là phẩm chất sống ngay thẳng, trung thực, chính trực... Tinh thần thượng võ là sống có nhân nghĩa, lễ độ, trí tuệ, uy dũng, tôn trọng lẽ phải...",
      "sourceQuestion": "Câu 10. Thế nào là chính khí và tinh thần thượng võ?",
      "id": "luc-1-c10-01"
    },
    {
      "type": "single",
      "question": "Nêu xuất xứ bài Ngọc Trản Quyền?",
      "options": [
        "Ngọc Trản Quyền là một trong nhiều bài quyền thuật của Sa môn võ đạo (võ Bình Định), được Liên đoàn võ Cổ truyền Việt Nam tuyển chọn làm bài chuẩn quy định quốc gia từ năm 1995.",
        "Ngọc Trản Quyền là một trong nhiều bài quyền thuật của Võ phái Nam Tông, được Liên đoàn võ Cổ truyền Việt Nam tuyển chọn làm bài chuẩn quy định quốc gia từ năm 1995.",
        "Ngọc Trản Quyền là một trong nhiều bài quyền thuật của Sa môn võ đạo (võ Bình Định), được Liên đoàn võ Cổ truyền Việt Nam tuyển chọn làm bài chuẩn quy định quốc gia từ năm 1993.",
        "Ngọc Trản Quyền là một trong nhiều bài quyền thuật của Sa môn võ đạo (võ Tây Sơn), được Liên đoàn võ Cổ truyền Việt Nam tuyển chọn làm bài chuẩn quy định quốc gia từ năm 1995."
      ],
      "correctIndex": 0,
      "explanation": "Ngọc Trản Quyền là một trong nhiều bài quyền thuật của Sa môn võ đạo (võ Bình Định), được Liên đoàn võ Cổ truyền Việt Nam tuyển chọn làm bài chuẩn quy định quốc gia từ năm 1995.",
      "sourceQuestion": "Câu 11. Nêu xuất xứ bài Ngọc trản quyền, và đọc bài thiệu.",
      "id": "luc-1-c11-01"
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
