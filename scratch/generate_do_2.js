const fs = require('fs');
const path = '/Users/luanph/Project other/MARTIAL WAY THEORY/content/exam-bank/do-2.json';

const poemLines = [
  "Bái tổ lập đao",
  "Giao đao đả hổ",
  "Tàng đầu hữu bàn đao",
  "Hoành khiêu bộ khóa đao",
  "Khiên thủ tàng đao",
  "Tả hữu phân liêu đao",
  "Độc lập phách mạc đao",
  "Tả hữu trích tinh đao",
  "Hồi đao thích hổ",
  "Phạt thảo hí du long",
  "Khiên thủ tàng đao",
  "Tả hữu phân liêu đao",
  "Đăng sơn viễn thiếu",
  "Tả hữu trảm mạc đao",
  "Phục hổ trảm thượng đao",
  "Hoành tảo thiên quân đao",
  "Thiềm triển kháo đao",
  "Hồi thân phách đao",
  "Tàng đầu bàn đao",
  "Phạt thảo hí long",
  "Khiên thủ tàng đao",
  "Loan phụng thượng thôi đao",
  "Hồi thân trảm mã đao",
  "Độc lập hạ tiệt cước",
  "Hồi thân trảm mã đao",
  "Uyên ương mạc đao",
  "Hoành bộ thượng thôi đao",
  "Tả hữu trảm mạc đao",
  "Tả thủ kim tiêu cước",
  "Hữu tả trảm mạc đao",
  "Hữu thủ kim tiêu cước",
  "Hồi thân trảm mã đao",
  "Khiên thủ tàng đao",
  "Tả hữu phân liêu đao",
  "Thượng bình tàng đao",
  "Bái tổ thu đao thức."
];

const falseLines = [
  "Bái tổ thủ đao",
  "Phục đao đả hổ",
  "Tàng đầu tả bàn đao",
  "Trực khiêu bộ khóa đao",
  "Cương thủ tàng đao",
  "Thượng hạ phân liêu đao",
  "Độc lập trảm mạc đao",
  "Tả hữu hái tinh đao",
  "Tiến đao thích hổ",
  "Phạt thảo du long",
  "Đăng sơn vọng nguyệt",
  "Tả hữu phách mạc đao",
  "Hàng hổ trảm thượng đao",
  "Trực tảo thiên quân đao",
  "Xà triển kháo đao",
  "Tiến thân phách đao",
  "Loan phụng hạ thôi đao",
  "Tiến thân trảm mã đao",
  "Độc lập thượng tiệt cước",
  "Uyên ương trảm đao",
  "Tả thủ ngân tiêu cước",
  "Hữu thủ ngân tiêu cước",
  "Hạ bình tàng đao"
];

const poemQuestions = [];

for (let i = 0; i < 10; i++) {
  const blankIndices = [];
  while (blankIndices.length < 12) {
    const r = Math.floor(Math.random() * poemLines.length);
    if (!blankIndices.includes(r)) blankIndices.push(r);
  }
  blankIndices.sort((a, b) => a - b);

  let questionText = "Điền vào chỗ trống lời thiệu bài quy định Phong Hoa Đao:\n\n";
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
    sourceQuestion: "Câu 17. Nêu lời thiệu bài quy định Phong Hoa Đao.",
    id: `do-2-c17-${i+2}`
  });
}

const data = {
  "rankId": "do-2",
  "beltId": "red",
  "lessonId": "red-lesson-02",
  "questions": [
    {
      "type": "multiple",
      "question": "Môn phái Phật Quang Quyền xây dựng mẫu người võ sĩ đạo trên những phương diện nào?",
      "options": [
        "Tinh thần cao cả nhưng Thực tế: Có lý tưởng lớn, biết bao dung, nhưng hành động phải thiết thực, hiệu quả, không lý thuyết suông.",
        "Vật chất sung túc nhưng Cao thượng: Biết làm giàu chính đáng, cuộc sống đủ đầy, nhưng tâm hồn không tham lam, không tầm thường vị kỷ.",
        "Tinh thần cao cả nhưng Mơ mộng: Có lý tưởng lớn, biết bao dung và luôn hướng đến những giá trị xa vời, thoát ly thực tại.",
        "Vật chất sung túc nhưng Tiết kiệm: Biết làm giàu chính đáng, cuộc sống đủ đầy, chi tiêu tằn tiện để tích lũy cho bản thân."
      ],
      "correctIndices": [0, 1],
      "explanation": "Môn phái Phật Quang Quyền xây dựng mẫu người võ sĩ đạo trên hai phương diện: Tinh thần cao cả nhưng Thực tế... Vật chất sung túc nhưng Cao thượng...",
      "sourceQuestion": "Câu 1. Môn phái Phật Quang Quyền xây dựng mẫu người võ sĩ đạo trên hai phương diện:",
      "id": "do-2-c01-01"
    },
    {
      "type": "multiple",
      "question": "Đối với bản thân, người môn sinh có những phương châm tự luyện nào?",
      "options": [
        "Luyện Thể: Rèn luyện thân thể bằng phương pháp hô hấp, vận động và trau dồi võ thuật.",
        "Luyện Trí: Mở mang trí tuệ bằng phương pháp tự học, quan sát, nhận định và hội thảo.",
        "Luyện Khí: Rèn luyện thần khí để làm chủ chính mình, luôn thanh thản, ung dung, tự tại.",
        "Luyện Tâm: Tu dưỡng tâm hồn hướng thượng, hướng thiện, thấu hiểu nhân quả, đạo lý.",
        "Luyện Thể: Rèn luyện thân thể bằng phương pháp nâng tạ, chạy bộ và trau dồi thể lực.",
        "Luyện Trí: Mở mang trí tuệ bằng phương pháp nghiên cứu, học thuật, đọc sách báo khoa học.",
        "Luyện Khí: Rèn luyện thần khí để hô mưa gọi gió, đả thông kinh mạch, tăng nội công.",
        "Luyện Tâm: Tu dưỡng tâm hồn hướng nội, sống ẩn dật, thấu hiểu triết lý nhân sinh."
      ],
      "correctIndices": [0, 1, 2, 3],
      "explanation": "Có 4 phương châm tự luyện: Luyện Thể... Luyện Trí... Luyện Khí... Luyện Tâm...",
      "sourceQuestion": "Câu 2. Ðối với bản thân, người môn sinh phải có mấy phương châm tự luyện? Giải thích đại cương về mỗi phương châm?",
      "id": "do-2-c02-01"
    },
    {
      "type": "multiple",
      "question": "Tại sao người môn sinh phải đối xử tận tình, tận tâm, tận nghĩa với đời và thế nào là tận tình, tận tâm, tận nghĩa?",
      "options": [
        "Người môn sinh phải đối xử tận tình, tận tâm, tận nghĩa với đời để cuộc sống ý nghĩa hơn, biết yêu người, và dễ dàng gặt hái thành công.",
        "Tận tình: Là đối xử bằng tất cả tình cảm đôn hậu, chân thành với mọi người.",
        "Tận tâm: Là làm việc hết lòng, luôn giữ lòng chí thành, chí tín và chí công.",
        "Tận nghĩa: Là sống có tình nghĩa, thủy chung trước sau như một trong tinh thần võ sĩ đạo.",
        "Người môn sinh phải đối xử tận tình, tận tâm, tận nghĩa với đời để tạo lập danh tiếng, thu phục lòng người, và dễ dàng gặt hái thành công.",
        "Tận tình: Là đối xử bằng tất cả tình cảm nồng nhiệt, luôn chiều chuộng mọi người.",
        "Tận tâm: Là làm việc hết lòng vì bản thân, luôn giữ lòng quyết tâm vươn lên.",
        "Tận nghĩa: Là sống có tình nghĩa, sẵn sàng kết nghĩa huynh đệ với tất cả mọi người."
      ],
      "correctIndices": [0, 1, 2, 3],
      "explanation": "Người môn sinh phải đối xử tận tình, tận tâm, tận nghĩa với đời để cuộc sống ý nghĩa hơn, biết yêu người, và dễ dàng gặt hái thành công. Tận tình... Tận tâm... Tận nghĩa...",
      "sourceQuestion": "Câu 3. Tại sao người môn sinh phải đối xử tận tình, tận tâm, tận nghĩa với đời ? thế nào là tận tình, tận tâm, tận nghĩa?",
      "id": "do-2-c03-01"
    },
    {
      "type": "multiple",
      "question": "Tại sao môn sinh Phật Quang Quyền phải thường khiêm, thường dung, thường liên và thế nào là thường khiêm, thường dung, thường liên?",
      "options": [
        "Để cụ thể hóa lòng yêu thương, để dễ dàng thấu hiểu và xây dựng tình thân ái.",
        "Thường khiêm: Là lúc nào cũng khiêm nhường, hạ mình để nhận được thiện cảm của mọi người.",
        "Thường dung: Là lúc nào cũng bao dung, tiếp nhận người khác (kể cả người đối nghịch); luôn tự vấn lương tâm xem đã đủ rộng rãi, tha thứ chưa.",
        "Thường liên: Là luôn luôn liên kết, hòa hợp với mọi người xung quanh.",
        "Để cụ thể hóa sức mạnh, để dễ dàng thu phục và xây dựng mạng lưới quan hệ.",
        "Thường khiêm: Là lúc nào cũng khiêm nhường, che giấu tài năng để không bị người khác ghen tị.",
        "Thường dung: Là lúc nào cũng dung thứ những lỗi lầm của người thân; tự vấn lương tâm xem có khắt khe quá không.",
        "Thường liên: Là luôn luôn liên lạc, thăm hỏi thường xuyên với mọi người xung quanh."
      ],
      "correctIndices": [0, 1, 2, 3],
      "explanation": "Để cụ thể hóa lòng yêu thương... Thường khiêm... Thường dung... Thường liên...",
      "sourceQuestion": "Câu 4. Tại sao người môn sinh PQQ phải thường khiêm, thường dung, thường liên trong việc đối xử với mọi người trong cuộc sống? Thế nào là thường Khiêm, thường dung, thường liên?",
      "id": "do-2-c04-01"
    },
    {
      "type": "single",
      "question": "Để tổ chức và kiện toàn đời sống cho xứng đáng với danh dự người Việt Võ Sĩ, môn sinh Phật Quang Quyền phải thực hiện những phương châm cốt lõi gì?",
      "options": [
        "Môn sinh PQQ phải thực hiện ba phương châm cốt lõi: Lập thân, Lập chí và Lập nghiệp.",
        "Môn sinh PQQ phải thực hiện ba phương châm cốt lõi: Lập thân, Lập nghiệp và Lập gia đình.",
        "Môn sinh PQQ phải thực hiện ba phương châm cốt lõi: Lập danh, Lập chí và Lập nghiệp.",
        "Môn sinh PQQ phải thực hiện ba phương châm cốt lõi: Lập thân, Lập tâm và Lập công."
      ],
      "correctIndex": 0,
      "explanation": "Môn sinh PQQ phải thực hiện ba phương châm cốt lõi: Lập thân, Lập chí và Lập nghiệp.",
      "sourceQuestion": "Câu 5: Để tổ chức và kiện toàn đời sống cho xứng đáng với danh dự người Việt Võ Sĩ, môn sinh PQQ phải thực hiện ba phương châm gì?",
      "id": "do-2-c05-01"
    },
    {
      "type": "single",
      "question": "Tác phong của huấn luyện viên đối với võ sinh ra sao?",
      "options": [
        "Phải biết hòa mình với võ sinh, gần gũi nhưng vẫn giữ được sự nghiêm túc; biết động viên, nhắc nhở, quan tâm và tạo thiện cảm. Đồng thời phải luôn gương mẫu trong đạo đức, tác phong và sinh hoạt: trang phục chỉnh tề, lịch sự, nhã nhặn, không uống rượu, không hút thuốc trong võ đường, cư xử đúng mực để võ sinh noi theo.",
        "Phải biết nghiêm khắc với võ sinh, tạo khoảng cách để giữ uy quyền; biết kỷ luật, nhắc nhở, răn đe để duy trì trật tự. Đồng thời phải luôn gương mẫu trong tác phong: trang phục chỉnh tề, ăn nói lạnh lùng, không uống rượu, không hút thuốc, cư xử nghiêm nghị để võ sinh kính sợ.",
        "Phải biết hòa mình với võ sinh, thoải mái và không cần giữ sự nghiêm túc; biết động viên, đùa giỡn, quan tâm và tạo thiện cảm. Đồng thời phải luôn vui vẻ trong sinh hoạt: trang phục tự do, lịch sự, nhã nhặn, không uống rượu, không hút thuốc, cư xử như những người bạn.",
        "Phải biết hòa mình với võ sinh, gần gũi nhưng vẫn giữ được sự nghiêm túc; biết động viên, nhắc nhở, quan tâm và tạo thiện cảm. Được phép uống rượu, hút thuốc sau giờ tập, miễn là cư xử đúng mực để võ sinh noi theo."
      ],
      "correctIndex": 0,
      "explanation": "Huấn luyện viên phải biết hòa mình với võ sinh, gần gũi nhưng vẫn giữ được sự nghiêm túc cần thiết... gương mẫu trong đạo đức, tác phong... không uống rượu, không hút thuốc trong võ đường...",
      "sourceQuestion": "Câu 7. Tác phong của huấn luyện viên đối với võ sinh ra sao?",
      "id": "do-2-c07-01"
    },
    {
      "type": "single",
      "question": "Đối với nữ võ sinh, huấn luyện viên cần giữ tác phong như thế nào?",
      "options": [
        "Phải giữ tác phong nghiêm túc, chuẩn mực và gương mẫu hơn nữa. Luôn tôn trọng danh dự, nhân phẩm của nữ võ sinh; đồng thời giữ gìn thanh danh môn phái và bản thân. Phải cư xử đúng mực, trong sáng, tránh mọi hành vi hoặc mối quan hệ không phù hợp giữa huấn luyện viên và nữ võ sinh.",
        "Phải giữ tác phong tự nhiên, hòa đồng và thân mật hơn nữa. Luôn ưu ái, quan tâm đặc biệt tới nữ võ sinh; đồng thời giữ gìn thanh danh môn phái và bản thân. Phải cư xử đúng mực, trong sáng, tránh mọi hành vi cứng nhắc giữa huấn luyện viên và nữ võ sinh.",
        "Phải giữ tác phong nghiêm túc, khắt khe và tạo khoảng cách lớn. Không nên tiếp xúc nhiều với nữ võ sinh để tránh hiểu lầm; đồng thời giữ gìn thanh danh môn phái. Phải cư xử lạnh lùng, trong sáng, tránh mọi mối quan hệ bạn bè giữa huấn luyện viên và nữ võ sinh.",
        "Phải giữ tác phong nghiêm túc, chuẩn mực và gương mẫu hơn nữa. Luôn ưu tiên điểm số, thành tích của nữ võ sinh; đồng thời giữ gìn thanh danh môn phái và bản thân. Phải cư xử đúng mực, trong sáng, có thể có mối quan hệ tình cảm nếu cả hai tự nguyện."
      ],
      "correctIndex": 0,
      "explanation": "Đối với nữ võ sinh, huấn luyện viên phải giữ tác phong nghiêm túc, chuẩn mực và gương mẫu hơn nữa. Luôn tôn trọng danh dự, nhân phẩm... tránh mọi hành vi hoặc mối quan hệ không phù hợp...",
      "sourceQuestion": "Câu 8. Đối với nữ võ sinh, huấn luyện viên cần giữ tác phong như thế nào?",
      "id": "do-2-c08-01"
    },
    {
      "type": "fill",
      "question": "Điền vào chỗ trống: Muốn tổ chức và điều hành tốt một lớp võ, huấn luyện viên cần:\nSắp xếp võ sinh hợp lý: Căn cứ vào tuổi tác, giới tính, trình độ, ______[1] để xưng hô, đối xử và bố trí vị trí tập luyện phù hợp.\nTìm hiểu khả năng của võ sinh: Nắm được sức khỏe, ______[2] của từng võ sinh để hướng dẫn và huấn luyện đúng mức.\nGiữ gìn kỷ luật lớp học: Quan sát, phát hiện những trường hợp gây mất trật tự, phá hoại hoặc ảnh hưởng đến lớp học để có biện pháp ngăn chặn và duy trì kỷ luật.",
      "blanks": [
        "thể trạng và hoàn cảnh của võ sinh",
        "khả năng tiếp thu và sức chịu đựng"
      ],
      "options": [
        "tính cách và năng khiếu của võ sinh",
        "thu nhập và xuất thân của võ sinh",
        "sở thích và nguyện vọng của võ sinh",
        "thành tích thi đấu và kinh nghiệm",
        "năng lực tài chính và đóng góp",
        "sự chăm chỉ và mức độ thông minh"
      ],
      "explanation": "Sắp xếp võ sinh hợp lý: Căn cứ vào tuổi tác, giới tính, trình độ, thể trạng và hoàn cảnh của võ sinh... Tìm hiểu khả năng của võ sinh: Nắm được sức khỏe, khả năng tiếp thu và sức chịu đựng của từng võ sinh...",
      "sourceQuestion": "Câu 9. Muốn thực hiện một lớp võ, huấn luyện viên phải làm những gì?",
      "id": "do-2-c09-01"
    },
    {
      "type": "multiple",
      "question": "Đối với môn sinh Phật Quang Quyền, tình cảm gia đình được thể hiện qua những điểm nào?",
      "options": [
        "Quan tâm, giúp đỡ, săn sóc toàn thể gia đình.",
        "Kính trên.",
        "Nhường dưới.",
        "Yêu mến người ngang hàng.",
        "Hỗ trợ tài chính, bảo bọc toàn thể gia đình.",
        "Cung kính người lớn tuổi.",
        "Chiều chuộng người dưới.",
        "Cạnh tranh công bằng với người ngang hàng."
      ],
      "correctIndices": [0, 1, 2, 3],
      "explanation": "Tình cảm gia đình được thể hiện qua bốn điểm: Quan tâm, giúp đỡ, săn sóc toàn thể gia đình. Kính trên. Nhường dưới. Yêu mến người ngang hàng.",
      "sourceQuestion": "Câu 10. Gia đình là gì? Tình cảm gia đình của môn sinh PQQ ra sao?",
      "id": "do-2-c10-01"
    },
    {
      "type": "truefalse",
      "question": "Tình huống: Trong một cuộc họp gia đình, thấy người lớn tuổi có quyết định chưa hợp lý, một võ sinh Phật Quang Quyền cho rằng vì \"kính trên\" nên chỉ cần im lặng vâng lời dạy bảo là phải đạo, không nên thưa trình ý kiến để tránh bị cho là vô lễ. Theo lý thuyết, cách cư xử của võ sinh này là Đúng hay Sai?",
      "answer": false,
      "explanation": "Sai. Vì ngoài việc lễ phép, kính trọng và vâng lời, còn phải biết thưa trình ý kiến của mình một cách khiêm tốn, tế nhị và đúng lúc để góp phần sửa chữa những sai sót, xây dựng gia đình tốt đẹp hơn.",
      "sourceQuestion": "Câu 11. Kính mến người trên có phải chỉ cần cư xử lễ độ, vâng lời dạy bảo là phải đạo rồi không?",
      "id": "do-2-c11-01"
    },
    {
      "type": "single",
      "question": "Hết lòng phụng dưỡng cha mẹ, đã tròn chữ hiếu chưa? Tại sao?",
      "options": [
        "Chưa. Mới chỉ là bước đầu của đạo hiếu. Muốn tròn chữ hiếu, người con còn phải sống tốt, có đạo đức, gây dựng sự nghiệp, giữ gìn và phát huy thanh danh gia đình. Bên cạnh đó, người con cần biết học hỏi đạo lý, tu dưỡng bản thân, siêng năng tạo phước và hướng cha mẹ đến những điều thiện lành.",
        "Rồi. Hết lòng phụng dưỡng cha mẹ chính là trọn vẹn đạo hiếu. Muốn tròn chữ hiếu, người con chỉ cần chăm lo đầy đủ đời sống vật chất và tinh thần cho cha mẹ, không cần bận tâm đến việc khác.",
        "Chưa. Hết lòng phụng dưỡng cha mẹ mới chỉ là bước đầu. Muốn tròn chữ hiếu, người con còn phải làm quan phát tài, gây dựng sự nghiệp giàu sang, mua nhà lầu xe hơi để cha mẹ nở mày nở mặt với hàng xóm.",
        "Chưa. Hết lòng phụng dưỡng cha mẹ mới chỉ là chăm lo vật chất. Muốn tròn chữ hiếu, người con còn phải đưa cha mẹ đi du lịch, hưởng thụ cuộc sống, giữ gìn và phát huy tài sản gia đình."
      ],
      "correctIndex": 0,
      "explanation": "Chưa. Hết lòng phụng dưỡng cha mẹ mới chỉ là bước đầu của đạo hiếu. Muốn tròn chữ hiếu... người con còn phải sống tốt, có đạo đức, gây dựng sự nghiệp... học hỏi đạo lý, tu dưỡng bản thân...",
      "sourceQuestion": "Câu 12. Hết lòng phụng dưỡng cha mẹ, đã tròn chữ hiếu chưa?",
      "id": "do-2-c12-01"
    },
    {
      "type": "single",
      "question": "Phải nhường dưới ra sao?",
      "options": [
        "Nhường dưới không phải là nuông chiều hay dung túng lỗi lầm của người dưới. Nhường dưới là biết bao dung, nhẫn nhịn, yêu thương và giúp đỡ người dưới với mục đích giáo dục, cảm hóa, khích lệ và hướng dẫn họ ngày càng tiến bộ.",
        "Nhường dưới là chiều chuộng che chở và gánh chịu những lỗi lầm của họ. Nhường dưới là biết nhẫn nhịn, nhượng bộ trong mọi cuộc tranh cãi để người dưới cảm thấy được tôn trọng và vui vẻ.",
        "Nhường dưới không phải là nuông chiều hay dung túng lỗi lầm. Nhường dưới là phân chia quyền lợi ưu tiên cho người dưới, để họ cảm thấy mình được quan tâm và chăm sóc đầy đủ hơn người lớn.",
        "Nhường dưới là sự nhường nhịn, luôn nhận phần thiệt thòi về mình để bảo bọc người dưới. Nhường dưới là biết bao dung, che đậy mọi khuyết điểm để hướng dẫn họ ngày càng tự tin hơn."
      ],
      "correctIndex": 0,
      "explanation": "Nhường dưới không phải là nuông chiều hay dung túng lỗi lầm của người dưới. Nhường dưới là biết bao dung, nhẫn nhịn, yêu thương và giúp đỡ người dưới với mục đích giáo dục, cảm hóa, khích lệ và hướng dẫn họ ngày càng tiến bộ...",
      "sourceQuestion": "Câu 13. Phải nhường dưới ra sao?",
      "id": "do-2-c13-01"
    },
    {
      "type": "definition",
      "question": "Theo lý thuyết, thế nào là cả tin?",
      "sampleAnswer": "Cả tin là vội vàng tin vào lời nói, tin đồn hoặc thông tin khi chưa tìm hiểu, kiểm chứng rõ ràng sự thật.",
      "matchThreshold": 0.65,
      "explanation": "Cả tin là vội vàng tin vào lời nói, tin đồn hoặc thông tin khi chưa tìm hiểu, kiểm chứng rõ ràng sự thật.",
      "sourceQuestion": "Câu 14. Hỏi: Cả tin là gì?",
      "id": "do-2-c14-01"
    },
    {
      "type": "single",
      "question": "Tác hại của tính cả tin đối với người môn sinh Phật Quang Quyền là gì?",
      "options": [
        "Cả tin dễ khiến ta hiểu sai sự việc, bị người khác lợi dụng hoặc dẫn dắt, làm ảnh hưởng đến sự đoàn kết, công bằng và những quyết định đúng đắn trong tập thể.",
        "Cả tin dễ khiến ta bị lừa gạt tiền bạc, bị người khác coi thường hoặc chê bai, làm ảnh hưởng đến uy tín cá nhân và những bước tiến trong sự nghiệp.",
        "Cả tin dễ khiến ta hiểu lầm đồng môn, bị người khác ghen ghét hoặc đố kỵ, làm ảnh hưởng đến tinh thần tập luyện và những cơ hội thi đấu trong tương lai.",
        "Cả tin dễ khiến ta mất tự tin vào bản thân, bị người khác chi phối hoặc áp đặt, làm ảnh hưởng đến sự sáng tạo, tinh thần độc lập và những quyết định cá nhân trong tập thể."
      ],
      "correctIndex": 0,
      "explanation": "Cả tin dễ khiến ta hiểu sai sự việc, bị người khác lợi dụng hoặc dẫn dắt, làm ảnh hưởng đến sự đoàn kết, công bằng và những quyết định đúng đắn trong tập thể.",
      "sourceQuestion": "Câu 15. Hỏi: Tác hại của tính cả tin đối với người môn sinh Phật Quang Quyền là gì?",
      "id": "do-2-c15-01"
    },
    {
      "type": "single",
      "question": "Người môn sinh Phật Quang Quyền cần làm gì để tránh tính cả tin?",
      "options": [
        "Phải biết lắng nghe với sự thận trọng, không vội tin hay truyền đạt thông tin khi chưa kiểm chứng. Luôn tìm hiểu sự việc từ nhiều phía, tôn trọng sự thật và dùng lý trí để nhận định trước khi kết luận.",
        "Phải biết hoài nghi mọi thứ, không tin tưởng bất kỳ ai kể cả đồng môn. Luôn tự mình điều tra sự việc, coi trọng phán đoán cá nhân và dùng trực giác để nhận định trước khi kết luận.",
        "Phải biết lắng nghe nhưng giữ im lặng, không vội tin hay phản bác thông tin. Luôn chờ đợi người khác kiểm chứng, tôn trọng số đông và dùng lý trí để thuận theo tập thể trước khi kết luận.",
        "Phải biết bảo vệ quan điểm cá nhân, không dễ dàng bị lung lay bởi người khác. Luôn tìm hiểu sự việc từ sách vở, tôn trọng lý thuyết và dùng kiến thức để nhận định trước khi kết luận."
      ],
      "correctIndex": 0,
      "explanation": "Phải biết lắng nghe với sự thận trọng, không vội tin hay truyền đạt thông tin khi chưa kiểm chứng. Luôn tìm hiểu sự việc từ nhiều phía, tôn trọng sự thật và dùng lý trí để nhận định trước khi kết luận.",
      "sourceQuestion": "Câu 16. Hỏi: Người môn sinh Phật Quang Quyền cần làm gì để tránh tính cả tin?",
      "id": "do-2-c16-01"
    },
    {
      "type": "single",
      "question": "Nêu xuất xứ bài Phong Hoa Đao?",
      "options": [
        "Phong Hoa Đao là bài binh khí quy định của Liên đoàn Võ thuật Cổ truyền Việt Nam. Bài đao này thuộc hệ thống Ngũ bộ Phong Hoa của môn phái Hoa Quyền. Bài quyền chia thành 4 thức, mỗi thức 9 thế, tổng cộng 36 thế.",
        "Phong Hoa Đao là bài binh khí quy định của Liên đoàn Võ thuật Cổ truyền Việt Nam. Bài đao này thuộc hệ thống Ngũ bộ Phong Hoa của môn phái Vovinam. Bài quyền chia thành 5 thức, mỗi thức 8 thế, tổng cộng 40 thế.",
        "Phong Hoa Đao là bài binh khí quy định của Liên đoàn Võ thuật Cổ truyền Việt Nam. Bài đao này thuộc hệ thống Tứ bộ Phong Hoa của môn phái Hoa Quyền. Bài quyền chia thành 4 thức, mỗi thức 8 thế, tổng cộng 32 thế.",
        "Phong Hoa Đao là bài binh khí quy định của Liên đoàn Võ thuật Cổ truyền Việt Nam. Bài đao này thuộc hệ thống Ngũ bộ Phong Hoa của môn phái Bình Định Gia. Bài quyền chia thành 4 thức, mỗi thức 9 thế, tổng cộng 36 thế."
      ],
      "correctIndex": 0,
      "explanation": "Phong Hoa Đao là bài binh khí quy định... thuộc hệ thống Ngũ bộ Phong Hoa của môn phái Hoa Quyền... Bài quyền được chia thành 4 thức... Mỗi thức gồm 9 thế... tổng cộng 36 thế.",
      "sourceQuestion": "Câu 17. Nêu xuất xứ bài quy định Phong Hoa Đao.",
      "id": "do-2-c17-01"
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
