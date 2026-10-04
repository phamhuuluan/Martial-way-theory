const fs = require('fs');
const path = '/Users/luanph/Project other/MARTIAL WAY THEORY/content/exam-bank/lam-3.json';

const poemLines = [
  "Bái tổ Lão hổ thượng sơn",
  "Chấp thủ khai mã",
  "Song thủ phá cước",
  "Đồng tử dâng quả",
  "Lưỡng thủ khai môn",
  "Đơn toạ phục hổ",
  "Hữu thủ yểm tâm",
  "Hồi đầu thối toạ",
  "Tả thủ yểm tâm",
  "Nhất cước phá đao",
  "Nhất quyền đả khứ",
  "Lão hổ vồ mồi",
  "Trửu phong đả bồi",
  "Song đao phạt mộc",
  "Song phi cước khứ",
  "Long quyền đả khứ",
  "Tả hữu đả diện",
  "Cuồng phong tróc nã",
  "Tả thủ phá cước",
  "Hoành thân phục hổ",
  "Hữu thủ yểm tâm",
  "Ngũ phong đả diện",
  "Hữu cước tảo địa",
  "Đơn toạ phục hổ",
  "Tả thủ yểm tâm",
  "Ngũ phong đả diện",
  "Tả cước tảo địa",
  "Đơn toạ phục hổ",
  "Hữu thủ yểm tâm",
  "Lưỡng thủ vạn năng",
  "Đơn toạ phục hổ",
  "Tả thủ yểm tâm",
  "Long quyền đoạt nhãn",
  "Lưỡng thủ tả cước",
  "Hoành thân thối toạ",
  "Hữu thủ yểm tâm",
  "Long quyền đoạt nhãn",
  "Lưỡng thủ hữu cước",
  "Tướng quân bạt kiếm",
  "Bái tổ thâu mã"
];

const falseLines = [
  "Bái tổ mãnh hổ thượng sơn",
  "Chấp thủ bế mã",
  "Đơn thủ phá cước",
  "Kim đồng dâng quả",
  "Lưỡng thủ bế môn",
  "Đơn toạ giáng hổ",
  "Hữu thủ yểm hậu",
  "Hồi đầu tấn toạ",
  "Tả thủ yểm hậu",
  "Nhị cước phá đao",
  "Nhị quyền đả khứ",
  "Lão hổ vồ trăng",
  "Trửu phong đả hạ",
  "Song đao phạt trúc",
  "Song phi cước hoành",
  "Long quyền đả hậu",
  "Tả hữu đả tâm",
  "Cuồng phong phá nã",
  "Hữu thủ phá cước",
  "Hoành thân giáng hổ",
  "Ngũ phong đả tâm",
  "Hữu cước tảo không",
  "Lưỡng thủ thiên năng",
  "Long quyền đoạt mệnh",
  "Tướng quân thu kiếm"
];

const poemQuestions = [];

for (let i = 0; i < 10; i++) {
  // Randomly pick 10 distinct indices for blanks
  const blankIndices = [];
  while (blankIndices.length < 10) {
    const r = Math.floor(Math.random() * poemLines.length);
    if (!blankIndices.includes(r)) blankIndices.push(r);
  }
  blankIndices.sort((a, b) => a - b);

  let questionText = "Điền vào chỗ trống lời thiệu bài quyền Lão Hổ Thượng Sơn:\n\n";
  const blanks = [];
  const optionsSet = new Set(falseLines.slice(0, 15));

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
  // shuffle options
  options.sort(() => Math.random() - 0.5);

  poemQuestions.push({
    type: "fill",
    question: questionText.trim(),
    blanks: blanks,
    options: options,
    explanation: poemLines.join(", "),
    sourceQuestion: "Câu 13. Trình bày ngắn gọn xuất xứ bài quyền quy đinh của LĐVTCTVN Lão Hổ thượng sơn?",
    id: `lam-3-c13-${i+2}`
  });
}

const data = {
  "rankId": "lam-3",
  "beltId": "blue",
  "lessonId": "blue-lesson-03",
  "questions": [
    {
      "type": "single",
      "question": "Vì sao nói: “Võ cổ truyền đồng hành với lịch sử dựng nước và giữ nước của dân tộc Việt Nam”?",
      "options": [
        "Nước Việt Nam hàng nghìn năm bị đô hộ, dân tộc Việt Nam ta có tinh thần bất khuất, dũng cảm, thông minh, sáng tạo và ý chí chiến đấu ngoan cường nên nhân dân ta đã tận dụng những dụng cụ sinh hoạt thường ngày để rèn luyện các thế đòn, thế tấn công bằng tay và bằng binh khí để tự vệ, chiến đấu chống ngoại xâm. Võ cổ truyền được hình thành từ đó.",
        "Nước Việt Nam hàng nghìn năm bị đô hộ, dân tộc Việt Nam ta có tinh thần bất khuất, dũng cảm, thông minh, sáng tạo và ý chí chiến đấu ngoan cường nên nhân dân ta đã phát minh ra các loại vũ khí hiện đại và ngày ngày rèn luyện các thế đòn, thế tấn công để tự vệ, chiến đấu chống ngoại xâm. Võ cổ truyền được hình thành từ đó.",
        "Nước Việt Nam hàng nghìn năm bị đô hộ, dân tộc Việt Nam ta có tinh thần bất khuất, dũng cảm, thông minh, sáng tạo và ý chí chiến đấu ngoan cường nên nhân dân ta đã tận dụng những dụng cụ sinh hoạt thường ngày để rèn luyện các thế đòn, thế phòng thủ bằng tay và bằng binh khí để tự vệ, bảo vệ cuộc sống. Võ cổ truyền được hình thành từ đó.",
        "Nước Việt Nam hàng nghìn năm bị đô hộ, dân tộc Việt Nam ta có tinh thần bất khuất, dũng cảm, thông minh, sáng tạo nên các triều đại đã trang bị những binh khí tốt nhất cho nhân dân rèn luyện các thế đòn, thế tấn công bằng tay và bằng binh khí để tự vệ, chiến đấu chống ngoại xâm. Võ cổ truyền được hình thành từ đó."
      ],
      "correctIndex": 0,
      "explanation": "Nước Việt Nam hàng nghìn năm bị đô hộ, lúc bấy giờ chưa có vũ khí hiện đại... nhân dân ta đã tận dụng những dụng cụ sinh hoạt thường ngày như dao gậy hay đúc kim loại như đồng, sắt thành đao, kiếm... rèn luyện các thế đòn, thế tấn công bằng tay và bằng binh khí để tự vệ, chiến đấu chống ngoại xâm.",
      "sourceQuestion": "Câu 1. Võ Sinh hãy cho biết: Vì sao nói: “Võ cổ truyền đồng hành với lịch sử dựng nước và giữ nước của dân tộc Việt Nam”?",
      "id": "lam-3-c01-01"
    },
    {
      "type": "single",
      "question": "Thành ngữ \"Văn ôn, võ luyện\" mang ý nghĩa gì?",
      "options": [
        "Văn là kiến thức học hỏi, võ là đòn thế rèn luyện để tự vệ, chiến đấu. Hai lĩnh vực bổ trợ nhau. Người học trò phải luôn dùi mài ôn luyện, kiên trì học hỏi để duy trì và nâng cao trình độ.",
        "Văn là kiến thức học hỏi, võ là đòn thế rèn luyện để tự vệ, chiến đấu. Hai lĩnh vực bổ trợ nhau. Người học trò phải luôn chú trọng học văn hơn học võ, kiên trì học hỏi để duy trì và nâng cao trình độ.",
        "Văn là kiến thức học hỏi, võ là đòn thế rèn luyện để thi đấu, biểu diễn. Hai lĩnh vực bổ trợ nhau. Người học trò phải luôn dùi mài ôn luyện, kiên trì học hỏi để duy trì và nâng cao trình độ.",
        "Văn là kiến thức học hỏi, võ là đòn thế rèn luyện để tự vệ, chiến đấu. Hai lĩnh vực độc lập với nhau. Người học trò phải luôn dùi mài ôn luyện, kiên trì học hỏi để duy trì và nâng cao trình độ."
      ],
      "correctIndex": 0,
      "explanation": "Văn là số vốn văn hóa, kiến thức... Võ là những đòn thế... Hai lĩnh vực này đều quan trọng và bổ trợ cho nhau... Người học trò phải luôn dùi mài ôn luyện, phải có ý chí cùng sự kiên trì học hỏi để duy trì và nâng cao trình độ.",
      "sourceQuestion": "Câu 2. Võ sinh hãy lý giải Thành ngữ Việt Nam có câu: “Văn ôn, võ luyện”.",
      "id": "lam-3-c02-01"
    },
    {
      "type": "multiple",
      "question": "Muốn rèn luyện tinh thần, võ sinh Phật Quang Quyền phải làm gì?",
      "options": [
        "Sống khỏe: thân thể khỏe mạnh, tư tưởng trong sáng, hướng thiện, và hướng thượng.",
        "Đức độ: luôn luôn thương yêu, bao dung, khiêm hạ, tự thấy lỗi mình để tự không ngừng tiến bộ và giúp người khác cùng tiến bộ.",
        "Cương trực: cương quyết, thẳng thắn trong trí tuệ.",
        "Trầm tĩnh: điềm đạm bình tĩnh tránh nhũng trường hợp xốc nỗi, nóng vội.",
        "Tháo vát: Linh hoạt, ứng xử tốt trong mọi hoàn cảnh.",
        "Công đức: Siêng làm việc thiện, giúp đời.",
        "Thiền định: Chuyên cần học và thực hành thiền.",
        "Sống khỏe: thân thể tráng kiện, tư tưởng vững vàng, hướng thiện, và hướng thượng.",
        "Đức độ: luôn luôn thương yêu, bao dung, khiêm hạ, tự thấy lỗi người để giúp người khác cùng tiến bộ.",
        "Cương trực: cương quyết, thẳng thắn trong tình cảm.",
        "Trầm tĩnh: điềm đạm bình tĩnh để giải quyết các trường hợp mâu thuẫn nội bộ.",
        "Tháo vát: Nhanh nhẹn, ứng phó linh hoạt trong chiến đấu.",
        "Công đức: Siêng năng làm việc, giúp đỡ gia đình.",
        "Thiền định: Chuyên cần học hỏi lý thuyết về thiền."
      ],
      "correctIndices": [0, 1, 2, 3, 4, 5, 6],
      "explanation": "Sống khỏe, Đức độ, Cương trực, Trầm tĩnh, Tháo vát, Công đức, Thiền định.",
      "sourceQuestion": "Câu 3. Muốn rèn luyện tin thần, VSPQQ phải làm gì?",
      "id": "lam-3-c03-01"
    },
    {
      "type": "single",
      "question": "Đạo hạnh của môn sinh Phật Quang Quyền được định nghĩa như thế nào?",
      "options": [
        "Đạo hạnh là phẩm hạnh của môn sinh Phật Quang Quyền, gồm: tôn kính Phật tuyệt đối, yêu nước nồng nàn, từ bi vô hạn, khiêm hạ tột cùng, tinh thần phụng sự, hướng đến diệt trừ bản ngã và không ngừng rèn luyện võ thuật, võ đạo.",
        "Đạo hạnh là phẩm hạnh của môn sinh Phật Quang Quyền, gồm: tôn kính Phật tuyệt đối, yêu nước nồng nàn, từ bi vô hạn, khiêm hạ tột cùng, tinh thần hy sinh, hướng đến diệt trừ cái ác và không ngừng rèn luyện võ thuật, võ đạo.",
        "Đạo hạnh là phẩm hạnh của môn sinh Phật Quang Quyền, gồm: tôn kính Tổ Sư tuyệt đối, yêu nước nồng nàn, từ bi vô hạn, khiêm hạ tột cùng, tinh thần phụng sự, hướng đến diệt trừ bản ngã và không ngừng rèn luyện võ thuật, võ đạo.",
        "Đạo hạnh là phẩm hạnh của môn sinh Phật Quang Quyền, gồm: tôn kính Phật tuyệt đối, yêu quê hương nồng nàn, từ bi vô lượng, khiêm hạ tột cùng, tinh thần phụng sự, hướng đến diệt trừ bản ngã và không ngừng rèn luyện võ thuật, võ đạo."
      ],
      "correctIndex": 0,
      "explanation": "Đạo hạnh là phẩm hạnh của môn sinh Phật Quang Quyền, gồm: tôn kính Phật tuyệt đối, yêu nước nồng nàng, từ bi vô hạn, khiêm hạ tột cùng, tinh thần phụng sự, hướng đến diệt trừ bản ngã và không ngừng rèn luyện võ thuật, võ đạo.",
      "sourceQuestion": "Câu 4. Cho biết đạo hạnh là gì? Tại sao phải trao dồi đạo hạnh?",
      "id": "lam-3-c04-01"
    },
    {
      "type": "fill",
      "question": "Điền vào chỗ trống để hoàn thành quan niệm về đức trong sạch: Võ sinh Phật Quang Quyền phải ______[1], sống đạo đức và tránh điều xấu. Tuy nhiên, không được thờ ơ hay né tránh những điều tiêu cực trong xã hội, mà phải ______[2] và xây dựng cuộc sống tốt đẹp hơn.",
      "blanks": [
        "giữ gìn thân tâm trong sạch",
        "nhìn thẳng vào sự thật để góp phần giúp đỡ, cải thiện"
      ],
      "options": [
        "giữ gìn tâm hồn trong sạch",
        "giữ gìn thân thể trong sạch",
        "rèn luyện thân tâm trong sạch",
        "nhìn nhận khách quan để góp phần khắc phục, cải thiện",
        "đối mặt với sự thật để góp phần giúp đỡ, bảo vệ",
        "dũng cảm đối mặt để đấu tranh chống lại"
      ],
      "explanation": "Võ sinh Phật Quang Quyền phải giữ gìn thân tâm trong sạch, sống đạo đức và tránh điều xấu. Tuy nhiên, không được thờ ơ hay né tránh những điều tiêu cực trong xã hội, mà phải nhìn thẳng vào sự thật để góp phần giúp đỡ, cải thiện và xây dựng cuộc sống tốt đẹp hơn.",
      "sourceQuestion": "Câu 5. Cho biết Quan niệm về đức trong sạch của VSPQQ ra sao ?",
      "id": "lam-3-c05-01"
    },
    {
      "type": "single",
      "question": "Võ sinh Phật Quang Quyền thực hiện nếp sống giản dị như thế nào?",
      "options": [
        "Sống giản dị, không đua đòi, biết sống phù hợp với điều kiện của bản thân và hoàn cảnh xã hội. Khi có điều kiện thì sử dụng những tiện nghi phù hợp, khi không có thì biết chấp nhận, không đòi hỏi hay gây phiền lòng cho người khác.",
        "Sống giản dị, không đua đòi, biết sống phù hợp với thu nhập của bản thân và hoàn cảnh gia đình. Khi có điều kiện thì sử dụng những tiện nghi phù hợp, khi không có thì biết chấp nhận, không đòi hỏi hay gây phiền lòng cho người khác.",
        "Sống tiết kiệm, không đua đòi, biết sống phù hợp với điều kiện của bản thân và hoàn cảnh xã hội. Khi có điều kiện thì sử dụng những tiện nghi phù hợp, khi không có thì biết chấp nhận, không đòi hỏi hay gây phiền lòng cho người khác.",
        "Sống giản dị, không đua đòi, biết sống phù hợp với điều kiện của bản thân và hoàn cảnh xã hội. Dù có điều kiện hay không có điều kiện đều không sử dụng những tiện nghi sang trọng, không đòi hỏi hay gây phiền lòng cho người khác."
      ],
      "correctIndex": 0,
      "explanation": "Võ sinh Phật Quang Quyền sống giản dị, không đua đòi, biết sống phù hợp với điều kiện của bản thân và hoàn cảnh xã hội. Khi có điều kiện thì sử dụng những tiện nghi phù hợp, khi không có điều kiện thì biết chấp nhận, không đòi hỏi hay gây phiền lòng cho người khác.",
      "sourceQuestion": "Câu 6. Cho biết VSPQQ thực hiện nếp sống giản dị như thế nào?",
      "id": "lam-3-c06-01"
    },
    {
      "type": "single",
      "question": "Phẩm tính chính trực của võ sinh Phật Quang Quyền là gì?",
      "options": [
        "Sống chung thủy, trung thành với môn phái, tổ quốc, tín nghĩa với huynh đệ, yêu thương giúp đỡ mọi người. Phải hiểu sự gian trá của người để tránh bị lường gạt và tự thắng mình, nhưng không được gian trá làm hại người khác.",
        "Sống chung thủy, trung thành với môn phái, tổ quốc, tín nghĩa với huynh đệ, yêu thương giúp đỡ mọi người. Phải hiểu sự gian trá của người để trừng phạt và răn đe, nhưng không được gian trá làm hại người khác.",
        "Sống đạo đức, trung thành với môn phái, tổ quốc, tín nghĩa với huynh đệ, yêu thương giúp đỡ bạn bè. Phải hiểu sự gian trá của người để tránh bị lường gạt và tự thắng mình, nhưng không được gian trá làm hại người khác.",
        "Sống chung thủy, trung kiên với môn phái, tổ quốc, tín nghĩa với huynh đệ, yêu thương giúp đỡ mọi người. Phải tránh xa sự gian trá của người để không bị lường gạt và tự bảo vệ mình, không được gian trá làm hại người khác."
      ],
      "correctIndex": 0,
      "explanation": "Phầm tính chính trực VSPQQ là: sống chung thủy, trung thành với môn phái, với tổ quốc. Tính nghĩa với huynh đệ, yêu thương giúp đỡ mọi người. Nhưng cũng phải hiểu sự gian trá của người để tránh bị người lường gạt và cũng để tự thắng mình, nhưng không được gian trá, làm hại đến người khác.",
      "sourceQuestion": "Câu 7. Cho biết phẩm tính chính trực của VSPQQ ra sao?",
      "id": "lam-3-c07-01"
    },
    {
      "type": "truefalse",
      "question": "Nhận định: Thái độ bất chợt nhường nhịn, tha thứ cho người khác chính là biểu hiện của sự cao thượng, vì nó phản ánh lòng từ bi và bao dung của người học võ. Đúng hay sai?",
      "options": ["Đúng", "Sai"],
      "correctIndex": 1,
      "explanation": "Thái độ bất chợt nhường nhịn, tha thứ cho người khác chưa hẳn là cao thượng, vì có thể chỉ là cảm xúc hoặc tính khí nhất thời, không có định hướng và nền tảng đạo đức vững chắc.",
      "sourceQuestion": "Câu 8. Cho biết thế nào là cao thượng? Thái dộ bất chợt nhưòng nhịn tha thứ cho người có phải là cao thượng hay không?",
      "id": "lam-3-c08-01"
    },
    {
      "type": "fill",
      "question": "Muốn kiện toàn ý chí đanh thép võ sinh Phật Quang Quyền phải: ______[1] mọi vấn đề trước khi quyết định. Khi đã quyết định đúng đắn thì ______[2] với tất cả nhiệt huyết, trí tuệ, năng lực và sự quyết tâm.",
      "blanks": [
        "Nghiên cứu, suy xét kỹ lưỡng",
        "kiên trì thực hiện đến cùng"
      ],
      "options": [
        "Quan sát, đánh giá kỹ lưỡng",
        "Phân tích, suy xét cẩn thận",
        "Tìm hiểu, đánh giá kỹ lưỡng",
        "nỗ lực thực hiện đến cùng",
        "quyết tâm thực hiện đến cùng",
        "cố gắng hoàn thành đến cùng"
      ],
      "explanation": "Nghiên cứu, suy xét kỹ lưỡng mọi vấn đề trước khi quyết định. Khi đã quyết định đúng đắn thì kiên trì thực hiện đến cùng, với tất cả nhiệt huyết, trí tuệ, năng lực và sự quyết tâm.",
      "sourceQuestion": "Câu 9. Muốn kiện toàn ý chí đanh thép, võ sinh Phật Quang Quyền phải làm như thế nào?",
      "id": "lam-3-c09-01"
    },
    {
      "type": "single",
      "question": "Tại sao võ sinh Phật Quang Quyền cần phải sáng suốt nhận định?",
      "options": [
        "Để phân biệt đúng sai, phải trái, hợp tình hợp lý, hiểu rõ bản chất của sự việc, từ đó xử lý đúng người, đúng việc, đúng thời điểm và tránh những hậu quả đáng tiếc.",
        "Để phân biệt trắng đen, phải trái, hợp tình hợp lý, hiểu rõ nguyên nhân của sự việc, từ đó xử lý đúng người, đúng việc, đúng thời điểm và tránh những mâu thuẫn đáng tiếc.",
        "Để phân biệt đúng sai, phải trái, hợp tình hợp lý, hiểu rõ bản chất của con người, từ đó xử lý đúng lúc, đúng chỗ, đúng thời điểm và tránh những hậu quả đáng tiếc.",
        "Để phân biệt tốt xấu, phải trái, hợp tình hợp lý, hiểu rõ bản chất của sự việc, từ đó xử lý đúng người, đúng việc, đúng hoàn cảnh và tránh những xung đột đáng tiếc."
      ],
      "correctIndex": 0,
      "explanation": "Võ sinh Phật Quang Quyền cần sáng suốt nhận định để phân biệt đúng sai, phải trái, hợp tình hợp lý, hiểu rõ bản chất của sự việc, từ đó xử lý đúng người, đúng việc, đúng thời điểm và tránh những hậu quả đáng tiếc.",
      "sourceQuestion": "Câu 10. Tại sao cần phải sáng suốt nhận định?",
      "id": "lam-3-c10-01"
    },
    {
      "type": "single",
      "question": "Thế nào là bền gan tranh đấu?",
      "options": [
        "Là có ý chí và nghị lực vững vàng, không nản lòng trước thất bại, luôn kiên trì giải quyết vấn đề một cách bền bỉ. Sự tranh đấu đó phải dựa trên tinh thần Từ bi, Trí tuệ, phù hợp với Nhân quả, đạo đức và pháp luật.",
        "Là có sức mạnh và nghị lực vững vàng, không nản lòng trước thất bại, luôn kiên trì giải quyết vấn đề một cách bền bỉ. Sự tranh đấu đó phải dựa trên tinh thần Từ bi, Trí tuệ, phù hợp với Nhân quả, đạo đức và pháp luật.",
        "Là có ý chí và nghị lực vững vàng, không chùn bước trước kẻ thù, luôn kiên quyết giải quyết vấn đề một cách dứt điểm. Sự tranh đấu đó phải dựa trên tinh thần Từ bi, Trí tuệ, phù hợp với Nhân quả, đạo đức và pháp luật.",
        "Là có ý chí và nghị lực vững vàng, không nản lòng trước thất bại, luôn kiên trì giải quyết vấn đề một cách bền bỉ. Sự tranh đấu đó phải dựa trên tinh thần công lý, hòa bình, phù hợp với đạo lý, đạo đức và pháp luật."
      ],
      "correctIndex": 0,
      "explanation": "Bền gan tranh đấu là có ý chí và nghị lực vững vàng, không nản lòng trước thất bại, không khuất phục trước khó khăn hay áp lực, luôn kiên trì giải quyết vấn đề một cách bền bỉ. Sự tranh đấu đó phải dựa trên tinh thần Từ bi, Trí tuệ, phù hợp với Nhân quả, đạo đức và pháp luật.",
      "sourceQuestion": "Câu 11. Thế nào là bền gan tranh đấu?",
      "id": "lam-3-c11-01"
    },
    {
      "type": "definition",
      "question": "Thành ngữ “Tôn sư trọng đạo” dạy chúng ta điều gì?",
      "sampleAnswer": "Dạy chúng ta phải kính trọng thầy cô, biết ơn người dạy dỗ mình, đồng thời sống có đạo đức, có nghĩa tình để trở thành người tài đức có ích cho xã hội.",
      "matchThreshold": 0.65,
      "explanation": "Câu thành ngữ dạy chúng ta phải kính trọng thầy cô, biết ơn người dạy dỗ mình, đồng thời sống có đạo đức, có nghĩa tình để trở thành người tài đức có ích cho xã hội.",
      "sourceQuestion": "Câu 12. Võ sinh giải thích câu thành ngữ: “Tôn sư trọng đạo”?",
      "id": "lam-3-c12-01"
    },
    {
      "type": "single",
      "question": "Trình bày ngắn gọn xuất xứ bài quyền quy định Lão Hổ Thượng Sơn của Liên đoàn Võ thuật Cổ truyền Việt Nam?",
      "options": [
        "Là bài quyền trấn môn của Võ phái Nam Tông, do cố võ sư Lê Văn Kiển sáng lập. Năm 1993, bài quyền này được Liên đoàn Võ thuật Cổ truyền Việt Nam chọn đưa vào chương trình đào tạo, thi đấu và biểu diễn. Ý nghĩa tượng trưng cho người luyện võ đã đạt trình độ tinh thông, vượt qua nhiều thử thách để vươn tới đỉnh cao.",
        "Là bài quyền truyền thống của Võ phái Bắc Tông, do cố võ sư Lê Văn Kiển sáng lập. Năm 1993, bài quyền này được Liên đoàn Võ thuật Cổ truyền Việt Nam chọn đưa vào chương trình đào tạo, thi đấu và biểu diễn. Ý nghĩa tượng trưng cho người luyện võ dũng mãnh như cọp già lên núi.",
        "Là bài quyền trấn môn của Võ phái Nam Tông, do cố võ sư Lê Văn Kiển sáng lập. Năm 1992, bài quyền này được Liên đoàn Võ thuật Cổ truyền Việt Nam chọn đưa vào chương trình đào tạo, thi đấu và biểu diễn. Ý nghĩa tượng trưng cho người luyện võ đã đạt trình độ tinh thông, vượt qua nhiều thử thách để vươn tới đỉnh cao.",
        "Là bài quyền trấn môn của Võ phái Nam Tông, do cố võ sư Lê Văn Kiển sáng lập. Năm 1993, bài quyền này được Liên đoàn Võ thuật Cổ truyền Việt Nam chọn đưa vào chương trình đào tạo. Ý nghĩa Lão Hổ Thượng Sơn là cọp già lên núi, tượng trưng cho uy dũng của người học võ."
      ],
      "correctIndex": 0,
      "explanation": "Lão Hổ Thượng Sơn là bài quyền trấn môn của Võ phái Nam Tông, do cố võ sư Lê Văn Kiển sáng lập. Năm 1993, bài quyền này được chọn... Ý nghĩa không phải là 'cọp già lên núi', mà tượng trưng cho người luyện võ đã đạt trình độ tinh thông, vượt qua nhiều thử thách.",
      "sourceQuestion": "Câu 13. Trình bày ngắn gọn xuất xứ bài quyền quy đinh của LĐVTCTVN Lão Hổ thượng sơn?",
      "id": "lam-3-c13-01"
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
