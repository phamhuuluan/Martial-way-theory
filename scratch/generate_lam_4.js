const fs = require('fs');
const path = '/Users/luanph/Project other/MARTIAL WAY THEORY/content/exam-bank/lam-4.json';

const poemLines = [
  "Đầu tiên bái tổ, kính sư,",
  "Bạch hạc ra bộ, thôi sơn tấn liền,",
  "Thăng thiên phượng dực xoay tròn,",
  "Kim tiêu hồi bộ, song đao, xỉa tiền,",
  "Thần cung xạ tiễn, tấn tiên,",
  "Cước ngang bộ phượng, bay lên móc liền,",
  "Đăng sơn hữu tả xỉa nghiêng,",
  "Bạt phong cước tới, song phi phượng hoàng,",
  "Quét chân, hoành tọa đăng sơn,",
  "Hồi thân phượng dực, xoay tròn thôi sơn,",
  "Đăng sơn tả, hữu quy hình,",
  "Thôi sơn tấn tiếp, cước ngang trảm xà,",
  "Xoay người vươn bộ đăng sơn,",
  "Cước ngang phi tới, xoay thân kính chào."
];

const falseLines = [
  "Đầu tiên bái tổ, nhớ sư,",
  "Bạch hạc ra bộ, thôi sơn đánh liền,",
  "Thăng thiên phượng dực bay vòng,",
  "Kim tiêu thối bộ, song đao, xỉa tiền,",
  "Thần cung xạ tiễn, tấn lên,",
  "Cước ngang bộ phượng, bay cao móc liền,",
  "Đăng sơn hữu tả chém nghiêng,",
  "Bạt phong cước tới, song phi đại bàng,",
  "Quét chân, trung tọa đăng sơn,",
  "Hồi thân phượng dực, xoay tròn đấm sơn,",
  "Đăng sơn tả, hữu quy về,",
  "Thôi sơn tấn tiếp, cước ngang đạp xà,",
  "Xoay người tấn bộ đăng sơn,",
  "Cước ngang phi tới, thu thân kính chào.",
  "Bạch hạc vươn cánh, thôi sơn tấn liền,"
];

const poemQuestions = [];

for (let i = 0; i < 10; i++) {
  const blankIndices = [];
  while (blankIndices.length < 10) {
    const r = Math.floor(Math.random() * poemLines.length);
    if (!blankIndices.includes(r)) blankIndices.push(r);
  }
  blankIndices.sort((a, b) => a - b);

  let questionText = "Điền vào chỗ trống lời thiệu bài quyền Bạch Hạc Sơn Quyền:\n\n";
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
    sourceQuestion: "Câu 13. Nêu xuất xứ và ý nghĩa bài quyền Bạch Hạc Sơn Quyền?",
    id: `lam-4-c13-${i+2}`
  });
}

const data = {
  "rankId": "lam-4",
  "beltId": "blue",
  "lessonId": "blue-lesson-04",
  "questions": [
    {
      "type": "single",
      "question": "Trong Võ cổ truyền Việt Nam, tấn pháp có vai trò quan trọng như thế nào?",
      "options": [
        "Tấn pháp là nền tảng của võ thuật. Nhờ tấn pháp đúng, cơ thể giữ được thăng bằng, phát huy tối đa sức mạnh và hiệu quả của các đòn thế. Vì vậy, người xưa ví tấn pháp là cái móng của võ thuật.",
        "Tấn pháp là bộ phận hỗ trợ của võ thuật. Nhờ tấn pháp đúng, cơ thể di chuyển nhanh nhẹn, phát huy tối đa tốc độ của các đòn thế. Vì vậy, người xưa ví tấn pháp là đôi chân của võ thuật.",
        "Tấn pháp là nền tảng của võ thuật. Nhờ tấn pháp đúng, cơ thể né tránh linh hoạt, phát huy tối đa sức mạnh và hiệu quả của các đòn thế. Vì vậy, người xưa ví tấn pháp là cái khiên của võ thuật.",
        "Tấn pháp là nền tảng của võ thuật. Nhờ tấn pháp đúng, cơ thể giữ được thăng bằng, phát huy tối đa sức mạnh và hiệu quả của các đòn thế. Vì vậy, người xưa ví tấn pháp là cái rễ của võ thuật."
      ],
      "correctIndex": 0,
      "explanation": "Tấn pháp là nền tảng của võ thuật... Nhờ tấn pháp đúng, cơ thể giữ được thăng bằng, phát huy tối đa sức mạnh và hiệu quả của các đòn thế... Vì vậy, người xưa ví tấn pháp là cái móng của võ thuật.",
      "sourceQuestion": "Câu 1. Trong Võ cổ truyền Việt Nam, tấn pháp có vai trò quan trọng như thế nào?",
      "id": "lam-4-c01-01"
    },
    {
      "type": "multiple",
      "question": "Để Võ cổ truyền Việt Nam và Phật Quang Quyền có thể sánh vai cùng các môn võ trên thế giới, các võ sinh cần phải làm gì?",
      "options": [
        "Siêng năng khổ luyện võ thuật, không ngừng nâng cao trình độ chuyên môn và đạo đức.",
        "Giữ gìn kỷ luật, đoàn kết, sống đúng tinh thần võ đạo.",
        "Tích cực quảng bá những giá trị tốt đẹp của Võ cổ truyền Việt Nam và Phật Quang Quyền đến cộng đồng.",
        "Ý thức rằng mình là hình ảnh đại diện cho môn phái và nền võ học dân tộc.",
        "Siêng năng luyện tập võ thuật, không ngừng nâng cao trình độ chuyên môn và thể lực.",
        "Giữ gìn kỷ luật, đoàn kết, sống đúng tinh thần thể thao.",
        "Tích cực quảng bá những giá trị tốt đẹp của Võ thuật hiện đại và Phật Quang Quyền đến cộng đồng.",
        "Ý thức rằng mình là hình ảnh đại diện cho võ đường và nền võ học dân tộc."
      ],
      "correctIndices": [0, 1, 2, 3],
      "explanation": "Siêng năng khổ luyện... Giữ gìn kỷ luật, đoàn kết... Tích cực quảng bá... Ý thức rằng mình là hình ảnh đại diện...",
      "sourceQuestion": "Câu 2. Để Võ cổ truyền Việt Nam nói chung và Phật Quang Quyền nói riêng có thể sánh vai cùng các môn võ trên thế giới, các võ sinh cần phải làm gì?",
      "id": "lam-4-c02-01"
    },
    {
      "type": "single",
      "question": "Mục đích, ý nghĩa việc thành lập Liên đoàn Võ thuật cổ truyền Việt Nam là gì?",
      "options": [
        "Nhằm thống nhất tổ chức, nghiên cứu, bảo tồn và phát huy truyền thống võ học cổ truyền Việt Nam, góp phần giữ gìn và phát triển bản sắc văn hóa dân tộc.",
        "Nhằm thống nhất tổ chức, huấn luyện, bảo tồn và phát huy truyền thống võ thuật cổ truyền Việt Nam, góp phần giữ gìn và phát triển bản sắc văn hóa dân tộc.",
        "Nhằm thống nhất quản lý, nghiên cứu, bảo tồn và phát huy truyền thống võ học cổ truyền Việt Nam, góp phần giữ gìn và phát triển bản sắc văn hóa phương Đông.",
        "Nhằm thống nhất tổ chức, nghiên cứu, lưu truyền và phát huy truyền thống võ nghệ cổ truyền Việt Nam, góp phần giữ gìn và bảo vệ bản sắc văn hóa dân tộc."
      ],
      "correctIndex": 0,
      "explanation": "Liên đoàn Võ thuật cổ truyền Việt Nam được thành lập nhằm thống nhất tổ chức, nghiên cứu, bảo tồn và phát huy truyền thống võ học cổ truyền Việt Nam, góp phần giữ gìn và phát triển bản sắc văn hóa dân tộc.",
      "sourceQuestion": "Câu 3. Võ sinh cho biết: Mục đích, ý nghĩa việc thành lập Liên đoàn Võ thuật cổ truyền Việt Nam?",
      "id": "lam-4-c03-01"
    },
    {
      "type": "single",
      "question": "Võ thuật có mối liên hệ gì với khoa học và nghệ thuật không?",
      "options": [
        "Võ thuật vừa là khoa học vì có phương pháp rèn luyện sức khỏe liên hệ mật thiết với vật lý, sinh học, y học, quân sự, triết học; vừa là nghệ thuật vì thể hiện sự khéo léo, hài hòa và vẻ đẹp trong động tác.",
        "Võ thuật vừa là khoa học vì có phương pháp rèn luyện sức khỏe liên hệ mật thiết với vật lý, hóa học, y học, quân sự, triết học; vừa là nghệ thuật vì thể hiện sự khéo léo, hài hòa và vẻ đẹp trong động tác.",
        "Võ thuật vừa là khoa học vì có phương pháp rèn luyện sức khỏe liên hệ mật thiết với vật lý, sinh học, y học, quân sự, triết học; vừa là nghệ thuật vì thể hiện sức mạnh, sự nhanh nhẹn và vẻ đẹp trong động tác.",
        "Võ thuật chỉ là khoa học vì có phương pháp rèn luyện sức khỏe liên hệ mật thiết với vật lý, sinh học, y học, quân sự, triết học và không liên quan đến nghệ thuật."
      ],
      "correctIndex": 0,
      "explanation": "Võ thuật vừa là khoa học... liên hệ mật thiết với các ngành khoa học như vật lý, sinh học, y học, quân sự và triết học. Là nghệ thuật vì các đòn thế không chỉ có hiệu quả chiến đấu mà còn thể hiện sự khéo léo, hài hòa và vẻ đẹp trong động tác.",
      "sourceQuestion": "Câu 4. Võ sinh cho biết Võ thuật có mối liên hệ gì với khoa học và nghệ thuật không?",
      "id": "lam-4-c04-01"
    },
    {
      "type": "fill",
      "question": "Điền vào chỗ trống về nguồn gốc võ thuật: Thuở ban sơ, để sinh tồn trước thiên nhiên khắc nghiệt và các mối nguy hiểm, con người phải ______[1]. Từ những kỹ năng chiến đấu đơn giản đó, nhờ trí tuệ và sự sáng tạo, con người đã không ngừng hoàn thiện thành ______[2], hình thành nên võ thuật.",
      "blanks": [
        "học cách chiến đấu để bảo vệ bản thân và cộng đồng",
        "những phương pháp chiến đấu có kỹ thuật, có nguyên tắc và nghệ thuật"
      ],
      "options": [
        "rèn luyện sức khỏe để bảo vệ bản thân và gia đình",
        "tìm cách phòng vệ để bảo vệ bản thân và cộng đồng",
        "tạo ra vũ khí để bảo vệ bản thân và cộng đồng",
        "những phương pháp chiến đấu có sức mạnh, có nguyên tắc và nghệ thuật",
        "những đòn thế chiến đấu có kỹ thuật, có phương pháp và nghệ thuật",
        "những kỹ năng chiến đấu có hệ thống, có nguyên tắc và nghệ thuật"
      ],
      "explanation": "Thuở ban sơ, để sinh tồn trước thiên nhiên khắc nghiệt và các mối nguy hiểm, con người phải học cách chiến đấu để bảo vệ bản thân và cộng đồng. Từ những kỹ năng chiến đấu đơn giản đó, nhờ trí tuệ và sự sáng tạo, con người đã không ngừng hoàn thiện thành những phương pháp chiến đấu có kỹ thuật, có nguyên tắc và nghệ thuật, hình thành nên võ thuật.",
      "sourceQuestion": "Câu 5. Võ sinh hãy cho biết nguồn gốc võ thuật khởi đầu từ đâu?",
      "id": "lam-4-c05-01"
    },
    {
      "type": "multiple",
      "question": "Vì sao Võ cổ truyền Việt Nam là môn võ của dân tộc nhưng nhiều người Việt chưa biết hoặc chưa quan tâm?",
      "options": [
        "Việc giảng dạy nhiều nơi còn chú trọng kỹ thuật võ thuật mà chưa làm nổi bật giá trị đạo đức, nhân cách và võ đạo của Võ cổ truyền.",
        "Vận động viên và người luyện tập Võ cổ truyền chưa được quan tâm, tôn vinh và đãi ngộ tương xứng.",
        "Các giải đấu và hoạt động quảng bá chưa thật sự hấp dẫn, chưa thu hút đông đảo công chúng quan tâm.",
        "Việc giảng dạy nhiều nơi còn chú trọng sức mạnh võ thuật mà chưa làm nổi bật giá trị đạo đức, nhân cách và võ đạo.",
        "Vận động viên và huấn luyện viên Võ cổ truyền chưa được quan tâm, tôn vinh và đãi ngộ tương xứng.",
        "Các giải đấu và hoạt động biểu diễn chưa thật sự hấp dẫn, chưa thu hút đông đảo thanh thiếu niên quan tâm."
      ],
      "correctIndices": [0, 1, 2],
      "explanation": "Có nhiều nguyên nhân: Việc giảng dạy nhiều nơi còn chú trọng kỹ thuật... Vận động viên và người luyện tập Võ cổ truyền chưa được quan tâm, tôn vinh và đãi ngộ tương xứng. Các giải đấu và hoạt động quảng bá chưa thật sự hấp dẫn...",
      "sourceQuestion": "Câu 6. Vì sao Võ cổ truyền Việt Nam là môn võ của dân tộc nhưng nhiều người Việt chưa biết hoặc chưa quan tâm?",
      "id": "lam-4-c06-01"
    },
    {
      "type": "multiple",
      "question": "Môn sinh Phật Quang Quyền phải làm gì để nêu cao danh dự tổ quốc?",
      "options": [
        "Không ngừng học tập và rèn luyện để trở thành những công dân ưu tú, tiến bộ, có đạo đức và trách nhiệm.",
        "Tận tụy lao động, cống hiến cho sự phát triển của đất nước, góp phần xây dựng quê hương ngày càng giàu mạnh, văn minh.",
        "Giữ gìn và phát huy những truyền thống hào hùng, tốt đẹp của dân tộc, qua đó góp phần làm rạng danh Tổ quốc.",
        "Không ngừng học tập và làm việc để trở thành những công dân ưu tú, tiến bộ, có đạo đức và trách nhiệm.",
        "Tận tụy cống hiến, hy sinh cho sự phát triển của đất nước, góp phần xây dựng quê hương ngày càng giàu mạnh, văn minh.",
        "Bảo vệ và phát huy những truyền thống hào hùng, tốt đẹp của dân tộc, qua đó góp phần làm rạng danh Tổ quốc."
      ],
      "correctIndices": [0, 1, 2],
      "explanation": "Môn sinh Phật Quang Quyền phải không ngừng học tập và rèn luyện... Tận tụy lao động, cống hiến... Giữ gìn và phát huy những truyền thống hào hùng, tốt đẹp của dân tộc...",
      "sourceQuestion": "Câu 7. Môn sinh Phật Quang Quyền phải làm gì để nêu cao danh dự tổ quốc?",
      "id": "lam-4-c07-01"
    },
    {
      "type": "single",
      "question": "Về giá trị tinh thần, môn sinh Phật Quang Quyền phải chứng tỏ ra sao?",
      "options": [
        "Phải có tâm hồn cao thượng, phong phú và rộng mở, biết quý trọng danh dự, không để tình cảm, tiền bạc hay quyền thế chi phối. Đồng thời phải luôn tu dưỡng bản thân, làm chủ cảm xúc và ước muốn, không ngừng học hỏi để trở thành người sáng suốt, bản lĩnh.",
        "Phải có tâm hồn cao thượng, vững vàng và rộng mở, biết quý trọng danh dự, không để tình cảm, tiền bạc hay quyền thế chi phối. Đồng thời phải luôn rèn luyện bản thân, làm chủ cảm xúc và ước muốn, không ngừng học hỏi để trở thành người sáng suốt, bản lĩnh.",
        "Phải có tâm hồn cao thượng, phong phú và vị tha, biết quý trọng danh dự, không để tình cảm, tiền bạc hay quyền thế chi phối. Đồng thời phải luôn tu dưỡng bản thân, làm chủ hành vi và ước muốn, không ngừng học hỏi để trở thành người sáng suốt, bản lĩnh.",
        "Phải có tâm hồn cao thượng, phong phú và rộng mở, biết bảo vệ danh dự, không để tình cảm, tiền bạc hay quyền thế chi phối. Đồng thời phải luôn tu dưỡng bản thân, làm chủ cảm xúc và ý nghĩ, không ngừng học hỏi để trở thành người sáng suốt, bản lĩnh."
      ],
      "correctIndex": 0,
      "explanation": "Môn sinh Phật Quang Quyền phải có tâm hồn cao thượng, phong phú và rộng mở, biết quý trọng danh dự, không để tình cảm, tiền bạc hay quyền thế chi phối. Đồng thời phải luôn tu dưỡng bản thân, làm chủ cảm xúc và ước muốn, không ngừng học hỏi để trở thành người sáng suốt, bản lĩnh...",
      "sourceQuestion": "Câu 8. Về giá trị tinh thần, môn sinh Phật Quang Quyền phải chứng tỏ ra sao?",
      "id": "lam-4-c08-01"
    },
    {
      "type": "single",
      "question": "Lòng tự tin và tự phụ có giống nhau không? Hãy giải thích.",
      "options": [
        "Không, hoàn toàn khác nhau. Tự tin là sự tin tưởng vào khả năng của bản thân, được xây dựng từ quá trình học tập, rèn luyện và kinh nghiệm thực tế. Tự phụ là sự đề cao bản thân quá mức, thường không dựa trên năng lực, dễ dẫn đến chủ quan và sai lầm.",
        "Không, hoàn toàn khác nhau. Tự tin là sự hãnh diện về khả năng của bản thân, được xây dựng từ quá trình học tập, rèn luyện và kinh nghiệm thực tế. Tự phụ là sự đề cao bản thân quá mức, thường không dựa trên năng lực, dễ dẫn đến chủ quan và sai lầm.",
        "Không, hoàn toàn khác nhau. Tự tin là sự tin tưởng vào khả năng của bản thân, được xây dựng từ quá trình học tập, làm việc và kinh nghiệm thực tế. Tự phụ là sự khoe khoang bản thân quá mức, thường không dựa trên năng lực, dễ dẫn đến chủ quan và sai lầm.",
        "Có sự tương đồng nhưng bản chất khác nhau. Tự tin là sự tin tưởng vào khả năng của bản thân, được xây dựng từ quá trình học tập, rèn luyện. Tự phụ là sự đề cao bản thân quá mức, thường không dựa trên năng lực, dễ dẫn đến chủ quan và sai lầm."
      ],
      "correctIndex": 0,
      "explanation": "Không, hoàn toàn khác nhau. Tự tin là sự tin tưởng vào khả năng của bản thân, được xây dựng từ quá trình học tập, rèn luyện và kinh nghiệm thực tế. Tự phụ là sự đề cao bản thân quá mức, thường không dựa trên năng lực hoặc kinh nghiệm thực tế, dễ dẫn đến chủ quan và sai lầm.",
      "sourceQuestion": "Câu 10. Lòng tự tin và tự phụ có giống nhau không? Hãy giải thích.",
      "id": "lam-4-c10-01"
    },
    {
      "type": "single",
      "question": "Do đâu một người hay tự cao, tự đại?",
      "options": [
        "Người hay tự cao, tự đại thường do mặc cảm thua sút ở một mặt nào đó nên muốn che giấu khuyết điểm và tìm cách đề cao bản thân để được người khác coi trọng.",
        "Người hay tự cao, tự đại thường do thiếu tự tin ở một mặt nào đó nên muốn che giấu khuyết điểm và tìm cách đề cao bản thân để được người khác nể phục.",
        "Người hay tự cao, tự đại thường do mặc cảm thua kém ở nhiều mặt nên muốn che giấu bản thân và tìm cách phô trương để được người khác coi trọng.",
        "Người hay tự cao, tự đại thường do kiêu ngạo về thành tích ở một mặt nào đó nên muốn che giấu khuyết điểm và tìm cách đề cao bản thân để được người khác coi trọng."
      ],
      "correctIndex": 0,
      "explanation": "Người hay tự cao, tự đại thường do mặc cảm thua sút ở một mặt nào đó nên muốn che giấu khuyết điểm và tìm cách đề cao bản thân để được người khác coi trọng.",
      "sourceQuestion": "Câu 11. Do đâu một người hay tự cao, tự đại? Người có lòng tự tin có tự cao, tự đại không?",
      "id": "lam-4-c11-01"
    },
    {
      "type": "fill",
      "question": "Điền vào chỗ trống: Khi buộc phải đối phó với kẻ thù, người võ sinh phải giữ tinh thần thượng võ, hành xử bằng sự ______[1]. Sau khi ngăn chặn hoặc xử lý hành vi sai trái, cần hướng đến ______[2], không nuôi dưỡng lòng thù hận.",
      "blanks": [
        "hào hiệp, khoan dung và có chừng mực",
        "tha thứ, hòa giải và cảm hóa"
      ],
      "options": [
        "vị tha, khoan dung và có chừng mực",
        "hào hiệp, nhân ái và có chừng mực",
        "can đảm, khoan dung và có giới hạn",
        "tha thứ, khuyên răn và cảm hóa",
        "bao dung, hòa giải và cảm hóa",
        "tha thứ, giáo dục và cảm hóa"
      ],
      "explanation": "Khi buộc phải đối phó với kẻ thù, người võ sinh phải giữ tinh thần thượng võ, hành xử bằng sự hào hiệp, khoan dung và có chừng mực. Sau khi ngăn chặn hoặc xử lý hành vi sai trái, cần hướng đến tha thứ, hòa giải và cảm hóa, không nuôi dưỡng lòng thù hận.",
      "sourceQuestion": "Câu 12. Khi bắt buộc phải đối phó với kẻ thù, ta phải có thái độ và cách đối xử ra sao?",
      "id": "lam-4-c12-01"
    },
    {
      "type": "single",
      "question": "Nêu xuất xứ của bài quyền Bạch Hạc Sơn Quyền?",
      "options": [
        "Là bài quyền thuộc Võ thuật Cổ truyền Việt Nam, được gia đình Võ sư Đinh Văn Lớn học hỏi và lưu truyền qua nhiều thế hệ. Đây là bài quyền nổi tiếng, được nhiều võ sư ở Vĩnh Long và các tỉnh miền Tây Nam Bộ biết đến.",
        "Là bài quyền thuộc Võ thuật Cổ truyền Việt Nam, được gia đình Võ sư Lê Văn Kiển học hỏi và lưu truyền qua nhiều thế hệ. Đây là bài quyền nổi tiếng, được nhiều võ sư ở Vĩnh Long và các tỉnh miền Tây Nam Bộ biết đến.",
        "Là bài quyền thuộc Võ thuật Cổ truyền Việt Nam, được gia đình Võ sư Đinh Văn Lớn học hỏi và lưu truyền qua nhiều thế hệ. Đây là bài quyền nổi tiếng, được nhiều võ sư ở Bình Định và các tỉnh miền Trung biết đến.",
        "Là bài quyền thuộc Võ phái Nam Tông, được gia đình Võ sư Đinh Văn Lớn học hỏi và lưu truyền qua nhiều thế hệ. Đây là bài quyền nổi tiếng, được nhiều võ sư ở Vĩnh Long và các tỉnh miền Tây Nam Bộ biết đến."
      ],
      "correctIndex": 0,
      "explanation": "Bạch Hạc Sơn Quyền là bài quyền thuộc Võ thuật Cổ truyền Việt Nam, được gia đình Võ sư Đinh Văn Lớn học hỏi và lưu truyền qua nhiều thế hệ... Đây là bài quyền nổi tiếng, được nhiều võ sư ở Vĩnh Long và các tỉnh miền Tây Nam Bộ biết đến.",
      "sourceQuestion": "Câu 13. Nêu xuất xứ và ý nghĩa bài quyền Bạch Hạc Sơn Quyền?",
      "id": "lam-4-c13-01"
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
