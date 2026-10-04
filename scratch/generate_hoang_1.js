const fs = require('fs');
const path = '/Users/luanph/Project other/MARTIAL WAY THEORY/content/exam-bank/hoang-1.json';

const poemLines = [
  "Bái tổ Độc Lư Thương",
  "Lập tấn liên ba phụng giang đầu",
  "Nhị bộ tấn nghinh khai đản thủ",
  "Quy đầu phục thế tấn độc lư",
  "Hạ hồi ký túc song long kích",
  "Hoành thân chuyển đả tái nghịch tâm",
  "Hậu hoành nghinh chiến khai trực chỉ",
  "Hữu phi khai giác thích trung đình",
  "Phi bộ tạ hồi liên trung đỉnh",
  "Hồi long giáng thế đảo liên thành",
  "Chấp thủ “độc lư” sát thích thương",
  "Song bộ khai quy đằng xuyên thích",
  "Phi vân chấp mã tấn sát ngưu",
  "Đảo thế khuynh thân hầu long bộ",
  "Chuyển long phi giác thối liên đài",
  "Liên ba tam bộ lập như tiền."
];

const falseLines = [
  "Bái tổ Song Lư Thương",
  "Lập tấn song ba phụng giang đầu",
  "Tam bộ tấn nghinh khai đản thủ",
  "Quy vĩ phục thế tấn độc lư",
  "Thượng hồi ký túc song long kích",
  "Hoành thân xuất đả tái nghịch tâm",
  "Tiền hoành nghinh chiến khai trực chỉ",
  "Tả phi khai giác thích trung đình",
  "Phi bộ tạ hồi thoái trung đỉnh",
  "Thăng long giáng thế đảo liên thành",
  "Chấp thủ “song lư” sát thích thương",
  "Đơn bộ khai quy đằng xuyên thích",
  "Phi vân hạ mã tấn sát ngưu",
  "Đảo thế hoành thân hầu long bộ",
  "Chuyển long xuất giác thối liên đài",
  "Liên ba nhị bộ lập như tiền.",
  "Quy đầu ngọa thế tấn độc lư",
  "Hạ hồi điểm túc song long kích",
  "Hoành thân chuyển thoái tái nghịch tâm"
];

const poemQuestions = [];

for (let i = 0; i < 10; i++) {
  let questionText = "Điền vào chỗ trống lời thiệu bài Độc Lư Thương:\n\n";
  const blanks = [];
  const optionsSet = new Set(falseLines);
  
  // pick 12 lines to blank out of 16
  const indices = Array.from({length: 16}, (_, i) => i);
  indices.sort(() => Math.random() - 0.5);
  const blankIndices = new Set(indices.slice(0, 12));

  poemLines.forEach((line, idx) => {
    if (blankIndices.has(idx)) {
      questionText += `______[${blanks.length + 1}]\n`;
      blanks.push(line);
      optionsSet.add(line);
    } else {
      questionText += `${line}\n`;
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
    sourceQuestion: "Câu 27. Nêu nguồn gốc và lời thiệu bài quyền quy đinh độc Lư Thương:",
    id: `hoang-1-c27-poem-${i+1}`
  });
}

const data = {
  "rankId": "hoang-1",
  "beltId": "yellow",
  "lessonId": "yellow-lesson-01",
  "questions": [
    {
      "type": "multiple",
      "question": "Về tinh thần, có mấy nguyên tắc gia tăng sức khỏe?",
      "options": [
        "Biết vui với hoàn cảnh: Biết bình thản, vui vẻ đón nhận mọi hoàn cảnh trong cuộc sống.",
        "Biết tự lượng sức mình: Biết rõ khả năng của bản thân, không ôm đồm việc quá sức.",
        "Biết hướng theo lý tưởng: Biết xây dựng cho mình một lý tưởng sống cao đẹp và kiên trì theo đuổi.",
        "Biết bằng lòng với số phận: Biết chấp nhận thực tại, không cần cố gắng thay đổi hoàn cảnh khó khăn.",
        "Biết dựa vào tập thể: Biết rõ khả năng có hạn của bản thân, luôn nhờ vả và trông chờ vào người khác.",
        "Biết thay đổi mục tiêu: Biết xây dựng nhiều mục tiêu sống khác nhau và dễ dàng từ bỏ khi gặp thất bại."
      ],
      "correctIndices": [0, 1, 2],
      "explanation": "Về tinh thần, có 3 nguyên tắc gia tăng sức khỏe: Biết vui với hoàn cảnh, Biết tự lượng sức mình, Biết hướng theo lý tưởng.",
      "sourceQuestion": "Câu 1. Về tinh thần, có mấy nguyên tắc gia tăng sức khỏe? Hãy kể ra và giải thích đại cương.",
      "id": "hoang-1-c01-01"
    },
    {
      "type": "multiple",
      "question": "Có mấy nguyên tắc để trau dồi một cuộc sống minh mẫn?",
      "options": [
        "Học hỏi: Không ngừng học ở thầy, bạn bè, sách vở và cuộc sống.",
        "Quan sát: Biết chú ý, xem xét sự việc một cách cẩn thận để hiểu rõ tình hình.",
        "Tư duy: Biết suy nghĩ, phân tích và cân nhắc trước mọi vấn đề.",
        "Hành động: Đem những điều đã học và suy nghĩ áp dụng vào thực tế để kiểm nghiệm.",
        "Ghi chép: Không ngừng ghi chép mọi lời dạy của thầy, bạn bè và nội dung sách vở.",
        "Phán đoán: Biết đưa ra kết luận nhanh chóng về mọi sự việc để giải quyết tình hình.",
        "Phản biện: Biết tranh luận, phản bác và bắt bẻ trước mọi vấn đề được đưa ra.",
        "Tưởng tượng: Đem những điều đã học kết hợp với suy nghĩ để tạo ra các thế giới ảo."
      ],
      "correctIndices": [0, 1, 2, 3],
      "explanation": "Có 4 nguyên tắc để trau dồi một cuộc sống minh mẫn: Học hỏi, Quan sát, Tư duy, Hành động.",
      "sourceQuestion": "Câu 2. Thế nào là sống minh mẫn? Có mấy nguyên tắc trau dồi cho một cuộc sống minh mẫn? Hãy kể ra và giải thích đại cương.",
      "id": "hoang-1-c02-01"
    },
    {
      "type": "single",
      "question": "Chỉ tư tưởng mà không hành động, hoặc hành động mà không tư tưởng, kết quả sẽ ra sao?",
      "options": [
        "Chỉ tư tưởng mà không hành động thì cũng như người có mắt sáng mà không chịu đi, nên không thể đến đích. Hành động mà không tư tưởng thì như người đi đêm không có đuốc soi đường, dễ lầm lạc và thất bại.",
        "Chỉ tư tưởng mà không hành động thì cũng như người có bản đồ mà không chịu đọc, nên sẽ bị lạc đường. Hành động mà không tư tưởng thì như người đi xe không có phanh, dễ gây tai nạn và thương tích.",
        "Chỉ tư tưởng mà không hành động thì cũng như người có miệng mà không chịu nói, nên không ai hiểu. Hành động mà không tư tưởng thì như người làm việc không có kế hoạch, dễ lãng phí và mệt mỏi.",
        "Chỉ tư tưởng mà không hành động thì cũng như người có sức mạnh mà không chịu đấu, nên không thể chiến thắng. Hành động mà không tư tưởng thì như người đánh võ không có chiêu thức, dễ trúng đòn và bỏ mạng."
      ],
      "correctIndex": 0,
      "explanation": "Chỉ tư tưởng mà không hành động thì cũng như người có mắt sáng mà không chịu đi, nên không thể đến đích. Hành động mà không tư tưởng thì như người đi đêm không có đuốc soi đường, dễ lầm lạc và thất bại.",
      "sourceQuestion": "Câu 3. Chỉ tư tưởng mà không hành động, hoặc hành động mà không tư tưởng, kết quả sẽ ra sao?",
      "id": "hoang-1-c03-01"
    },
    {
      "type": "single",
      "question": "Sống đức độ là gì?",
      "options": [
        "Sống đức độ là sống có đạo đức, biết giữ gìn hạnh kiểm, đồng thời cư xử với mọi người bằng lòng bao dung, nhân hậu, biết cảm thông và tha thứ. Người sống đức độ luôn tự nhắc mình tu dưỡng và sửa đổi bản thân, không tự cao, không khắt khe.",
        "Sống đức độ là sống có nguyên tắc, biết giữ gìn luật lệ, đồng thời cư xử với mọi người bằng sự nghiêm minh, công bằng, biết thưởng phạt và răn đe. Người sống đức độ luôn tự nhắc mình kỷ luật bản thân, không vị nể, không nhân nhượng.",
        "Sống đức độ là sống có lý tưởng, biết giữ gìn truyền thống, đồng thời cư xử với mọi người bằng sự tự hào, kiêu hãnh, biết đấu tranh và bảo vệ. Người sống đức độ luôn tự nhắc mình phát huy bản sắc, không hòa tan, không nhượng bộ.",
        "Sống đức độ là sống có tri thức, biết giữ gìn học vấn, đồng thời cư xử với mọi người bằng sự hiểu biết, thông thái, biết chỉ dạy và phân tích. Người sống đức độ luôn tự nhắc mình trau dồi kiến thức, không dốt nát, không bảo thủ."
      ],
      "correctIndex": 0,
      "explanation": "Sống đức độ là sống có đạo đức, biết giữ gìn hạnh kiểm, đồng thời cư xử với mọi người bằng lòng bao dung, nhân hậu, biết cảm thông và tha thứ. Người sống đức độ luôn tự nhắc mình tu dưỡng và sửa đổi bản thân, không tự cao, không khắt khe, không thích chỉ trích hay chê bai người khác.",
      "sourceQuestion": "Câu 4. Sống đức độ là gì?",
      "id": "hoang-1-c04-01"
    },
    {
      "type": "multiple",
      "question": "Có mấy nguyên tắc để trau dồi một cuộc sống đức độ?",
      "options": [
        "Yêu người, nghĩ tới người: Biết quan tâm, cảm thông và giúp đỡ mọi người trong khả năng của mình.",
        "Nhận biết ưu điểm của người: Biết nhìn thấy điều tốt nơi người khác để học hỏi những điều hay, nuôi dưỡng tâm thiện lành và sửa đổi hạn chế bản thân.",
        "Tránh xa người xấu: Biết chọn bạn mà chơi, không tiếp xúc với người có đạo đức kém để bảo vệ bản thân.",
        "Phê bình khuyết điểm của người: Biết nhìn thẳng vào cái sai của người khác để nhắc nhở họ sửa đổi, giúp họ tiến bộ hơn."
      ],
      "correctIndices": [0, 1],
      "explanation": "Có 2 nguyên tắc để trau dồi một cuộc sống đức độ: Yêu người, nghĩ tới người và Nhận biết ưu điểm của người.",
      "sourceQuestion": "Câu 5. Có mấy nguyên tắc trau giồi cho một cuộc sống đứu độ? Hãy kể ra và giải thích đại cương.",
      "id": "hoang-1-c05-01"
    },
    {
      "type": "single",
      "question": "Tại sao môn sinh Phật Quang Quyền cần phải sống tế nhị?",
      "options": [
        "Môn sinh Phật Quang Quyền cần sống tế nhị vì võ học giúp rèn luyện ý chí mạnh mẽ và tinh thần cương nghị. Nếu thiếu sự tế nhị, người học võ dễ trở nên cứng nhắc, nóng nảy hoặc thô ráp. Biết kết hợp sự cương nghị với lòng nhân hậu và cách cư xử tinh tế sẽ giúp người võ sinh sống hòa hợp.",
        "Môn sinh Phật Quang Quyền cần sống tế nhị vì võ học giúp rèn luyện thể lực sung mãn và cơ bắp cuồn cuộn. Nếu thiếu sự tế nhị, người học võ dễ làm gãy đồ đạc, gây thương tích cho người khác. Biết kết hợp sức mạnh với sự nhẹ nhàng sẽ giúp người võ sinh tránh phải đền bù thiệt hại.",
        "Môn sinh Phật Quang Quyền cần sống tế nhị vì võ học giúp rèn luyện phản xạ nhanh và tốc độ vượt trội. Nếu thiếu sự tế nhị, người học võ dễ nói leo, cướp lời người khác. Biết kết hợp sự nhanh nhẹn với lòng kiên nhẫn sẽ giúp người võ sinh giao tiếp tốt hơn.",
        "Môn sinh Phật Quang Quyền cần sống tế nhị vì võ học giúp rèn luyện khả năng thực chiến và đòn thế sát thủ. Nếu thiếu sự tế nhị, người học võ dễ gây thù chuốc oán, bị trả thù. Biết kết hợp kỹ thuật chiến đấu với sự nhún nhường sẽ giúp người võ sinh bảo toàn mạng sống."
      ],
      "correctIndex": 0,
      "explanation": "Môn sinh Phật Quang Quyền cần sống tế nhị vì võ học giúp rèn luyện ý chí mạnh mẽ và tinh thần cương nghị. Nếu thiếu sự tế nhị, người học võ dễ trở nên cứng nhắc, nóng nảy hoặc thô ráp. Biết kết hợp sự cương nghị với lòng nhân hậu và cách cư xử tinh tế sẽ giúp người võ sinh sống hòa hợp...",
      "sourceQuestion": "Câu 6. Thế nào là sống tế nhị? Tại sao môn sinh Phật Quang Quyền cần phải sống tế nhị?",
      "id": "hoang-1-c06-01"
    },
    {
      "type": "definition",
      "question": "Theo lý thuyết, muốn sống tế nhị, môn sinh Phật Quang Quyền phải áp dụng phương châm nào?",
      "sampleAnswer": "Muốn sống tế nhị, môn sinh phải biết \"tùy thời định việc\", nghĩa là biết căn cứ vào hoàn cảnh, đối tượng và điều kiện cụ thể để có cách ứng xử phù hợp.",
      "matchThreshold": 0.65,
      "explanation": "Muốn sống tế nhị, môn sinh Phật Quang Quyền phải biết \"tùy thời định việc\", nghĩa là biết căn cứ vào hoàn cảnh, đối tượng và điều kiện cụ thể để có cách ứng xử phù hợp.",
      "sourceQuestion": "Câu 7. Muốn sống tế nhị, môn sinh Phật Quang Quyền phải áp dụng những phương châm nào?",
      "id": "hoang-1-c07-01"
    },
    {
      "type": "multiple",
      "question": "Trong quá trình huấn luyện võ thuật cần phải tuân theo các nguyên tắc sư phạm nào?",
      "options": [
        "Nguyên tắc tự giác, tích cực: người học phải chủ động và nỗ lực trong rèn luyện.",
        "Nguyên tắc dễ hiểu: nội dung giảng dạy phải rõ ràng, phù hợp với trình độ người học.",
        "Nguyên tắc vừa sức: luyện tập phù hợp với khả năng và thể trạng của từng người.",
        "Nguyên tắc hệ thống và liên tục: học tập, rèn luyện theo trình tự từ thấp đến cao và duy trì thường xuyên.",
        "Nguyên tắc vững chắc: nắm vững kiến thức, kỹ thuật trước khi học nội dung mới.",
        "Nguyên tắc khoa học: áp dụng phương pháp huấn luyện hợp lý, hiệu quả và an toàn.",
        "Nguyên tắc kết hợp lý luận với thực tiễn: hiểu đúng kỹ thuật và biết vận dụng vào thực hành.",
        "Nguyên tắc bí truyền: người học phải tuyệt đối giữ kín các chiêu thức của môn phái.",
        "Nguyên tắc cạnh tranh: nội dung giảng dạy phải tạo ra sự đối kháng gay gắt giữa các học viên.",
        "Nguyên tắc nhồi nhét: luyện tập vượt quá giới hạn thể lực để bứt phá giới hạn bản thân.",
        "Nguyên tắc nhảy cóc: học tập các kỹ thuật nâng cao trước để tạo động lực, sau đó mới quay lại học cơ bản."
      ],
      "correctIndices": [0, 1, 2, 3, 4, 5, 6],
      "explanation": "Các nguyên tắc sư phạm bao gồm: tự giác tích cực, dễ hiểu (trực quan), vừa sức, hệ thống và liên tục, vững chắc, khoa học, kết hợp lý luận với thực tiễn.",
      "sourceQuestion": "Câu 8. Trong quá trình huấn luyện võ thuật cần phải tuân theo các nguyên tắc sư phạm gì:",
      "id": "hoang-1-c08-01"
    },
    {
      "type": "single",
      "question": "Nguyên tắc tự giác tích cực trong huấn luyện võ thuật là gì?",
      "options": [
        "Nguyên tắc tự giác, tích cực đòi hỏi người võ sinh phải chủ động, siêng năng và có ý thức trách nhiệm trong học tập, rèn luyện. Người học không chỉ chăm chỉ tập luyện trên võ đường mà còn biết tự ôn luyện ở nhà. Môn sinh luôn rèn luyện tinh thần vượt khó, tính tự lập, không ỷ lại.",
        "Nguyên tắc tự giác, tích cực đòi hỏi người võ sinh phải đóng học phí đầy đủ, đúng hạn và có ý thức giữ gìn tài sản chung. Người học không chỉ dọn dẹp vệ sinh trên võ đường mà còn biết lau chùi binh khí ở nhà. Môn sinh luôn rèn luyện tính ngăn nắp, sạch sẽ, không nhờ vả.",
        "Nguyên tắc tự giác, tích cực đòi hỏi người võ sinh phải mua sắm đầy đủ võ phục, trang thiết bị và có ý thức tuân thủ giờ giấc. Người học không chỉ đi tập đúng giờ trên võ đường mà còn biết xem lịch thi đấu ở nhà. Môn sinh luôn rèn luyện tính kỷ luật, đúng giờ, không cao su.",
        "Nguyên tắc tự giác, tích cực đòi hỏi người võ sinh phải tham gia mọi giải đấu, biểu diễn và có ý thức mang huy chương về cho thầy. Người học không chỉ thi đấu dũng mãnh trên võ đài mà còn biết khoe thành tích ở nhà. Môn sinh luôn rèn luyện tinh thần hiếu thắng, khát khao vinh quang."
      ],
      "correctIndex": 0,
      "explanation": "Nguyên tắc tự giác, tích cực đòi hỏi người võ sinh phải chủ động, siêng năng và có ý thức trách nhiệm... chăm chỉ tập luyện trên võ đường mà còn biết tự ôn luyện... ở nhà. Môn sinh Phật Quang Quyền luôn rèn luyện tinh thần vượt khó... không ỷ lại.",
      "sourceQuestion": "Câu 9. Nêu Nguyên tắc tự giác tích cực :",
      "id": "hoang-1-c09-01"
    },
    {
      "type": "single",
      "question": "Nguyên tắc trực quan (nguyên tắc dễ hiểu) yêu cầu điều gì?",
      "options": [
        "Yêu cầu người hướng dẫn phải sử dụng lời giải thích, thị phạm và các phương tiện hỗ trợ như hình ảnh, video, sơ đồ để giúp võ sinh dễ quan sát, dễ hiểu và dễ thực hiện kỹ thuật. Cần giải thích rõ ràng, thị phạm chính xác, nhấn mạnh những điểm quan trọng và chỉ ra các lỗi thường gặp.",
        "Yêu cầu người hướng dẫn phải sử dụng lời răn đe, hình phạt và các biện pháp mạnh như hít đất, chạy bộ, thụt dầu để giúp võ sinh dễ sợ hãi, dễ nhớ và không dám làm sai kỹ thuật. Cần quát mắng rõ ràng, phạt nghiêm khắc, nhấn mạnh sự nguy hiểm và bêu rếu các lỗi thường gặp.",
        "Yêu cầu người hướng dẫn phải sử dụng tài liệu viết tay, bí kíp và các phương tiện cổ truyền như mộc nhân, bao cát, vòng sắt để giúp võ sinh rèn luyện nội công, dễ đắc đạo và dễ phát huy uy lực. Cần che giấu khẩu quyết, truyền dạy riêng tư, nhấn mạnh sự huyền bí và không để lộ lỗi.",
        "Yêu cầu người hướng dẫn phải sử dụng ngôn ngữ học thuật, thuật ngữ và các phương pháp trừu tượng như hình học, vật lý, giải phẫu để giúp võ sinh tư duy sâu, dễ phân tích và dễ sáng tạo kỹ thuật. Cần lý luận phức tạp, giảng giải dài dòng, nhấn mạnh sự hàn lâm và phân tích nguyên lý."
      ],
      "correctIndex": 0,
      "explanation": "Nguyên tắc trực quan (dễ hiểu) yêu cầu người hướng dẫn phải sử dụng lời giải thích, thị phạm và các phương tiện hỗ trợ... giúp võ sinh dễ quan sát, dễ hiểu... giải thích rõ ràng, thị phạm chính xác, nhấn mạnh những điểm quan trọng và chỉ ra các lỗi thường gặp.",
      "sourceQuestion": "Câu 10. Nguyên tắc trực quan (nguyên tắc dễ hiểu)",
      "id": "hoang-1-c10-01"
    },
    {
      "type": "single",
      "question": "Nguyên tắc vừa sức yêu cầu điều gì trong huấn luyện võ thuật?",
      "options": [
        "Nguyên tắc vừa sức yêu cầu việc huấn luyện võ thuật phải phù hợp với lứa tuổi, giới tính, thể lực và trình độ của người học. Quá trình tập luyện phải đi từ dễ đến khó, từ đơn giản đến phức tạp, từ cơ bản đến nâng cao.",
        "Nguyên tắc vừa sức yêu cầu việc huấn luyện võ thuật phải cào bằng giữa các lứa tuổi, giới tính, thể lực và trình độ của người học. Quá trình tập luyện phải áp dụng chung một giáo án từ khó đến dễ, từ phức tạp đến đơn giản, để mọi người đều có cơ hội thử sức.",
        "Nguyên tắc vừa sức yêu cầu việc huấn luyện võ thuật phải dựa vào sở thích, đam mê, nguyện vọng và mục đích của người học. Quá trình tập luyện phải cho phép học viên tự chọn bài quyền yêu thích, bỏ qua cơ bản và tiến thẳng đến đòn thế nâng cao.",
        "Nguyên tắc vừa sức yêu cầu việc huấn luyện võ thuật phải tạo ra áp lực vượt ngưỡng lứa tuổi, giới tính, thể lực và trình độ của người học. Quá trình tập luyện phải đi từ khó khăn, khắc nghiệt ngay từ đầu, từ nâng cao rồi mới quay lại cơ bản để thử thách ý chí."
      ],
      "correctIndex": 0,
      "explanation": "Nguyên tắc vừa sức yêu cầu việc huấn luyện võ thuật phải phù hợp với lứa tuổi, giới tính, thể lực và trình độ của người học. Quá trình tập luyện phải đi từ dễ đến khó, từ đơn giản đến phức tạp, từ cơ bản đến nâng cao.",
      "sourceQuestion": "Câu 11. Nêu Nguyên tắc vừa sức :",
      "id": "hoang-1-c11-01"
    },
    {
      "type": "single",
      "question": "Nguyên tắc hệ thống và liên tục yêu cầu điều gì?",
      "options": [
        "Nguyên tắc hệ thống và liên tục yêu cầu việc huấn luyện phải được thực hiện theo một trình tự hợp lý. Các kỹ thuật đã học cần được thường xuyên ôn luyện và củng cố. Đòn thế mới phải có sự liên hệ với đòn thế đã học trước đó. Việc tập luyện phải được duy trì đều đặn, không ngắt quãng trong thời gian dài.",
        "Nguyên tắc hệ thống và liên tục yêu cầu việc huấn luyện phải được thực hiện theo cảm hứng của huấn luyện viên. Các kỹ thuật đã học không cần ôn luyện để tiết kiệm thời gian. Đòn thế mới phải hoàn toàn khác biệt với đòn thế đã học trước đó. Việc tập luyện có thể ngắt quãng tùy ý miễn là đóng học phí.",
        "Nguyên tắc hệ thống và liên tục yêu cầu việc huấn luyện phải được chuẩn hóa trên toàn thế giới. Các kỹ thuật đã học cần được cập nhật luật mới liên tục. Đòn thế mới phải được phê duyệt bởi hội đồng kỹ thuật. Việc tập luyện phải có giấy chứng nhận hàng tháng, không bị thu hồi thẻ thành viên.",
        "Nguyên tắc hệ thống và liên tục yêu cầu việc huấn luyện phải được mã hóa thành các con số và ký hiệu. Các kỹ thuật đã học cần được ghi chép vào sổ tay. Đòn thế mới phải có tên gọi theo hệ thống bảng chữ cái. Việc tập luyện phải được quay video đều đặn, không bỏ sót bất kỳ buổi nào để làm tư liệu."
      ],
      "correctIndex": 0,
      "explanation": "Nguyên tắc hệ thống và liên tục yêu cầu việc huấn luyện phải được thực hiện theo một trình tự hợp lý... Các kỹ thuật đã học cần được thường xuyên ôn luyện... Đòn thế mới phải có sự liên hệ với đòn thế đã học trước... Việc tập luyện phải được duy trì đều đặn, không ngắt quãng...",
      "sourceQuestion": "Câu 12. Nêu nguyên tắc hệ thống và liên tục.",
      "id": "hoang-1-c12-01"
    },
    {
      "type": "single",
      "question": "Nguyên tắc vững chắc yêu cầu điều gì?",
      "options": [
        "Nguyên tắc vững chắc yêu cầu người học phải nắm chắc kỹ thuật và chiến thuật, ghi nhớ sâu sắc để có thể vận dụng thành thạo trong tập luyện, thi đấu và tự vệ. Người học phải thường xuyên ôn luyện, lặp lại kỹ thuật, tự giác tập thêm ngoài giờ và được kiểm tra định kỳ.",
        "Nguyên tắc vững chắc yêu cầu người học phải có cơ bắp săn chắc, thể hình to lớn để có thể chịu đựng đòn đánh trong tập luyện, thi đấu và tự vệ. Người học phải thường xuyên nâng tạ, uống thực phẩm bổ sung, tự giác ăn kiêng và được đo lượng mỡ định kỳ.",
        "Nguyên tắc vững chắc yêu cầu người học phải đóng học phí vững chắc, tài chính ổn định để có thể duy trì việc học trong tập luyện, thi đấu và tự vệ. Người học phải thường xuyên đóng quỹ, tài trợ giải đấu, tự giác mua võ phục và được cấp thẻ VIP định kỳ.",
        "Nguyên tắc vững chắc yêu cầu người học phải có lập trường vững chắc, trung thành tuyệt đối để không bao giờ phản bội môn phái trong tập luyện, thi đấu và tự vệ. Người học phải thường xuyên tuyên thệ, xăm logo môn phái, tự giác báo cáo tình hình và được thử thách lòng tin định kỳ."
      ],
      "correctIndex": 0,
      "explanation": "Nguyên tắc vững chắc yêu cầu người học phải nắm chắc kỹ thuật và chiến thuật, ghi nhớ sâu sắc để có thể vận dụng thành thạo trong tập luyện, thi đấu và tự vệ... thường xuyên ôn luyện, lặp lại kỹ thuật, tự giác tập thêm ngoài giờ và được kiểm tra định kỳ.",
      "sourceQuestion": "Câu 13. Nêu Nguyên tắc vững chắc",
      "id": "hoang-1-c13-01"
    },
    {
      "type": "single",
      "question": "Nguyên tắc khoa học và nguyên tắc liên hệ giữa lý luận với thực tiễn yêu cầu gì?",
      "options": [
        "Yêu cầu việc huấn luyện võ thuật phải dựa trên những cơ sở khoa học và được kiểm nghiệm bằng thực hành. Các kỹ thuật, chiến thuật cần vận dụng những kiến thức về y học, sinh lý học, tâm lý học để bảo đảm an toàn. Võ sinh phải thường xuyên thực hành, đối luyện và vận dụng vào thực tế.",
        "Yêu cầu việc huấn luyện võ thuật phải dựa trên những truyền thuyết dân gian và được kiểm nghiệm bằng niềm tin tâm linh. Các kỹ thuật, chiến thuật cần vận dụng những kiến thức về bói toán, phong thủy, bùa chú để bảo đảm chiến thắng. Võ sinh phải thường xuyên tụng niệm, cầu nguyện và vận dụng vào cúng bái.",
        "Yêu cầu việc huấn luyện võ thuật phải dựa trên những bộ phim kiếm hiệp và được kiểm nghiệm bằng kỹ xảo điện ảnh. Các kỹ thuật, chiến thuật cần vận dụng những kiến thức về nhào lộn, hóa trang, bay nhảy để bảo đảm hình ảnh đẹp mắt. Võ sinh phải thường xuyên diễn xuất, múa may và vận dụng vào đóng phim.",
        "Yêu cầu việc huấn luyện võ thuật phải dựa trên những trò chơi điện tử và được kiểm nghiệm bằng điểm số ảo. Các kỹ thuật, chiến thuật cần vận dụng những kiến thức về lập trình, đồ họa, bàn phím để bảo đảm combo đòn thế liên tục. Võ sinh phải thường xuyên chơi game, cày cấp và vận dụng vào thi đấu e-sport."
      ],
      "correctIndex": 0,
      "explanation": "Nguyên tắc khoa học và liên hệ giữa lý luận với thực tiễn yêu cầu việc huấn luyện võ thuật phải dựa trên những cơ sở khoa học và được kiểm nghiệm bằng thực hành... kiến thức về y học, sinh lý học... Võ sinh phải thường xuyên thực hành, đối luyện và vận dụng vào thực tế...",
      "sourceQuestion": "Câu 14. Nêu nguyên tắc khoa học và nguyên tắc liên hệ giữa lý luận với thực tiễn.",
      "id": "hoang-1-c14-01"
    },
    {
      "type": "single",
      "question": "Đức Phật thành đạo ở đâu, thời gian nào?",
      "options": [
        "Nơi thành đạo: cội cây bồ đề, bên bờ sông Ni Liên Thiền, xứ Ma Kiệt Đà (nay là Bồ Đề Đạo Tràng). Thời gian: ngày trăng tròn tháng 12, năm 589 TCN (35 tuổi).",
        "Nơi thành đạo: cội cây bồ đề, bên bờ sông Hằng, xứ Ca Tỳ La Vệ (nay là Lâm Tỳ Ni). Thời gian: ngày trăng tròn tháng 4, năm 589 TCN (35 tuổi).",
        "Nơi thành đạo: cội cây bồ đề, bên bờ sông Hằng, xứ Câu Thi Na (nay là Kushinagar). Thời gian: ngày trăng tròn tháng 2, năm 544 TCN (80 tuổi).",
        "Nơi thành đạo: cội cây vô ưu, bên bờ sông Ni Liên Thiền, xứ Ba La Nại (nay là Sarnath). Thời gian: ngày trăng tròn tháng 12, năm 595 TCN (29 tuổi)."
      ],
      "correctIndex": 0,
      "explanation": "Nơi thành đạo: cội cây bồ đề, bên bờ sông Ni Liên Thiền, xứ Ma Kiệt Đà (nay là Bồ Đề Đạo Tràng). Thời gian: ngày trăng tròn tháng 12, năm 589 TCN (35 tuổi).",
      "sourceQuestion": "Câu 15. Đức Phật thành đạo ở đâu, thời gian nào ?",
      "id": "hoang-1-c15-01"
    },
    {
      "type": "single",
      "question": "Đức Phật nhập diệt ở đâu, thời gian nào?",
      "options": [
        "Nơi nhập diệt: rừng Sa La Song Thọ, xứ Câu Thi Na. Thời gian: ngày trăng tròn tháng 2, năm 544 TCN (80 tuổi).",
        "Nơi nhập diệt: rừng Lộc Uyển, xứ Ba La Nại. Thời gian: ngày trăng tròn tháng 4, năm 544 TCN (80 tuổi).",
        "Nơi nhập diệt: rừng Sa La Song Thọ, xứ Ma Kiệt Đà. Thời gian: ngày trăng tròn tháng 12, năm 589 TCN (35 tuổi).",
        "Nơi nhập diệt: vườn Lâm Tỳ Ni, xứ Câu Thi Na. Thời gian: ngày trăng tròn tháng 2, năm 624 TCN (0 tuổi)."
      ],
      "correctIndex": 0,
      "explanation": "Nơi nhập diệt: rừng Sa La Song Thọ, xứ Câu Thi Na. Thời gian: ngày trăng tròn tháng 2, năm 544 TCN (80 tuổi).",
      "sourceQuestion": "Câu 16. Đức Phật nhập diệt ở đâu, thời gian nào ?",
      "id": "hoang-1-c16-01"
    },
    {
      "type": "single",
      "question": "Đức Phật xuất gia ở đâu? Thời gian nào? Ai đưa người đi? Đi bằng phương tiện gì?",
      "options": [
        "Nơi xuất gia: bờ sông A Nô Ma, Ca Tỳ La Vệ. Thời gian: ngày trăng tròn tháng 2, năm 595 TCN (29 tuổi). Người đưa đi: người hầu Sa Nặc (Channa). Phương tiện: ngựa Kiền Trắc (Kantara).",
        "Nơi xuất gia: bờ sông Ni Liên Thiền, Ma Kiệt Đà. Thời gian: ngày trăng tròn tháng 12, năm 589 TCN (35 tuổi). Người đưa đi: đệ tử A Nan (Ananda). Phương tiện: đi bộ.",
        "Nơi xuất gia: bờ sông Hằng, Ba La Nại. Thời gian: ngày trăng tròn tháng 4, năm 595 TCN (29 tuổi). Người đưa đi: vua cha Tịnh Phạn (Sudhodana). Phương tiện: voi trắng.",
        "Nơi xuất gia: bờ sông A Nô Ma, Câu Thi Na. Thời gian: ngày trăng tròn tháng 2, năm 544 TCN (80 tuổi). Người đưa đi: hoàng hậu Da Du Đà La. Phương tiện: xe ngựa."
      ],
      "correctIndex": 0,
      "explanation": "Nơi xuất gia: bờ sông A Nô Ma, Ca Tỳ La Vệ. Thời gian: ngày trăng tròn tháng 2, năm 595 TCN (29 tuổi). Người đưa đi: người hầu Sa Nặc (Channa). Phương tiện: ngựa kiền Trắc (Kantara).",
      "sourceQuestion": "Câu 17. Đức Phật xuất gia ở đâu ? thời gian nào ? ai đưa người đi ? đi bằng phương tiện gì ?",
      "id": "hoang-1-c17-01"
    },
    {
      "type": "single",
      "question": "Đức Phật thuyết pháp lần đầu tiên (chuyển pháp luân) ở đâu, cho những ai nghe?",
      "options": [
        "Nơi thuyết pháp lần đầu tiên: vườn Nai (vườn Lộc Uyển), xứ Ba La Nại. Cho 5 anh em Kiều Trần Như (Kondanna) nghe.",
        "Nơi thuyết pháp lần đầu tiên: rừng Sa La Song Thọ, xứ Câu Thi Na. Cho 1250 vị tỳ kheo nghe.",
        "Nơi thuyết pháp lần đầu tiên: cội Bồ Đề, xứ Ma Kiệt Đà. Cho vua Bimbisara (Tần Bà Sa La) nghe.",
        "Nơi thuyết pháp lần đầu tiên: núi Linh Thứu, xứ Ba La Nại. Cho thập đại đệ tử của Ngài nghe."
      ],
      "correctIndex": 0,
      "explanation": "Nơi thuyết pháp lần đầu tiên: vườn Nai (vườn Lộc Uyển), xứ Ba La Nại. Cho 5 anh em Kiều Trần Như (Kondanna) nghe.",
      "sourceQuestion": "Câu 18. Đức Phật thuyết pháp lần đầu tiên (chuyển pháp luân) ở đâu, cho những ai nghe ?",
      "id": "hoang-1-c18-01"
    },
    {
      "type": "single",
      "question": "Trước khi thành Phật, thái tử tên là gì? Cha mẹ là ai?",
      "options": [
        "Tên: Tất Đạt Đa (Siddhattha). Cha: vua Tịnh Phạn (Sudhodana). Mẹ: hoàng hậu Maya.",
        "Tên: A Nan Đà (Ananda). Cha: vua Tịnh Phạn (Sudhodana). Mẹ: hoàng hậu Kiều Đàm Di.",
        "Tên: La Hầu La (Rahula). Cha: vua Ba Tư Nặc (Pasenadi). Mẹ: hoàng hậu Mạt Lợi.",
        "Tên: Tất Đạt Đa (Siddhattha). Cha: vua A Dục (Ashoka). Mẹ: hoàng hậu Maya."
      ],
      "correctIndex": 0,
      "explanation": "Tên: Tất Đạt Đa (Siddhattha). Cha: vua Tịnh Phạn (Sudhodana). Mẹ: hoàng hậu Maya.",
      "sourceQuestion": "Câu 19. Trước khi thành Phật, thái tử tên là gì ? cha mẹ là ai ?",
      "id": "hoang-1-c19-01"
    },
    {
      "type": "single",
      "question": "Trước khi xuất gia, thái tử có vợ và con trai tên là gì?",
      "options": [
        "Vợ: (công nương) Da Du Đà La (Yashodara). Con trai: La Hầu La (Rahula).",
        "Vợ: (công nương) Ma Ha Ba Xà Ba Đề. Con trai: A Nan Đà (Ananda).",
        "Vợ: (công nương) Tỳ Xá Khư (Visakha). Con trai: Tu Bồ Đề (Subhuti).",
        "Vợ: (công nương) Da Du Đà La (Yashodara). Con trai: Mục Kiền Liên (Moggallana)."
      ],
      "correctIndex": 0,
      "explanation": "Vợ: (công nương) Da Du Đà La (Yashodara). Con trai: La Hầu La (Rahula).",
      "sourceQuestion": "Câu 20. Trước khi xuất gia, thái tử có vợ và con trai tên là gì ?",
      "id": "hoang-1-c20-01"
    },
    {
      "type": "single",
      "question": "Đạo đức căn bản nhất của người môn sinh Phật Quang Quyền là gì?",
      "options": [
        "Đạo đức căn bản nhất là hiểu và tôn kính Phật. Lòng tôn kính Phật giúp ta sống tốt hơn, biết hướng thiện và tránh xa điều xấu.",
        "Đạo đức căn bản nhất là kính trọng võ sư và các bậc sư trưởng. Lòng kính trọng sư phụ giúp ta học được nhiều bí kíp, biết vâng lời và tránh bị đuổi học.",
        "Đạo đức căn bản nhất là tình đoàn kết giữa các huynh đệ đồng môn. Lòng yêu thương huynh đệ giúp ta có nhiều đồng minh, biết bênh vực nhau và tránh bị bắt nạt.",
        "Đạo đức căn bản nhất là lòng trung thành tuyệt đối với môn phái. Lòng trung thành giúp ta bảo vệ danh dự võ đường, biết giữ bí mật và tránh việc học lén môn phái khác."
      ],
      "correctIndex": 0,
      "explanation": "Đạo đức căn bản nhất là hiểu và tôn kính Phật. Lòng tôn kính Phật giúp ta sống tốt hơn, biết hướng thiện và tránh xa điều xấu.",
      "sourceQuestion": "Câu 21. Hỏi: Đạo đức căn bản nhất của người môn sinh Phật Quang Quyền là gì?",
      "id": "hoang-1-c21-01"
    },
    {
      "type": "definition",
      "question": "Theo lý thuyết, vì sao người môn sinh phải tôn kính Phật?",
      "sampleAnswer": "Vì Đức Phật là bậc giác ngộ hoàn toàn, là tấm gương sáng về trí tuệ, đạo đức và lòng từ bi để chúng ta học tập và noi theo.",
      "matchThreshold": 0.65,
      "explanation": "Vì Đức Phật là bậc giác ngộ hoàn toàn, là tấm gương sáng về trí tuệ, đạo đức và lòng từ bi để chúng ta học tập và noi theo.",
      "sourceQuestion": "Câu 22. Hỏi: Vì sao người môn sinh phải tôn kính Phật?",
      "id": "hoang-1-c22-01"
    },
    {
      "type": "multiple",
      "question": "Người môn sinh thể hiện lòng tôn kính Phật bằng những cách nào?",
      "options": [
        "Lễ Phật",
        "Nghe và học giáo lý",
        "Sống đạo đức, làm điều thiện",
        "Cố gắng sửa những lỗi lầm của bản thân",
        "Đóng góp nhiều tiền bạc xây chùa",
        "Thờ tượng Phật bằng vàng ròng",
        "Cạo đầu xuất gia đi tu",
        "Ép buộc người khác phải tin Phật"
      ],
      "correctIndices": [0, 1, 2, 3],
      "explanation": "Bằng việc lễ Phật, nghe và học giáo lý, sống đạo đức, làm điều thiện và cố gắng sửa những lỗi lầm của bản thân.",
      "sourceQuestion": "Câu 23. Hỏi: Người môn sinh thể hiện lòng tôn kính Phật bằng cách nào?",
      "id": "hoang-1-c23-01"
    },
    {
      "type": "single",
      "question": "Lòng tôn kính Phật mang lại lợi ích gì cho người môn sinh?",
      "options": [
        "Giúp ta khiêm tốn, biết kính trên nhường dưới, có ý chí vượt qua khó khăn và luôn cố gắng hoàn thiện bản thân.",
        "Giúp ta có sức mạnh siêu nhiên, được thần linh bảo vệ, đánh đâu thắng đó và luôn gặp may mắn trong các giải đấu võ thuật.",
        "Giúp ta được võ sư chú ý, được thiên vị trong các kỳ thi lên đai, nhanh chóng thăng tiến và luôn được xếp ở vị trí trung tâm.",
        "Giúp ta có lý do để từ chối các nghĩa vụ xã hội, yên tâm xa lánh bụi trần, không màng thế sự và luôn sống an nhàn, nhàn rỗi."
      ],
      "correctIndex": 0,
      "explanation": "Giúp ta khiêm tốn, biết kính trên nhường dưới, có ý chí vượt qua khó khăn và luôn cố gắng hoàn thiện bản thân.",
      "sourceQuestion": "Câu 24. Hỏi: Lòng tôn kính Phật mang lại lợi ích gì cho người môn sinh?",
      "id": "hoang-1-c24-01"
    },
    {
      "type": "single",
      "question": "Người môn sinh cần có trách nhiệm gì đối với Phật Pháp?",
      "options": [
        "Phải giữ gìn hình ảnh tốt đẹp của người môn sinh, góp phần lan tỏa điều thiện và bảo vệ những giá trị đạo đức mà Đức Phật đã dạy.",
        "Phải dùng võ thuật để trừng trị những kẻ báng bổ, góp phần tiêu diệt tà đạo và bảo vệ các ngôi chùa bằng bạo lực.",
        "Phải đi diễn thuyết khắp nơi để thu nạp tín đồ, góp phần quyên góp tài chính và bảo vệ tài sản của các tổ chức tôn giáo.",
        "Phải tham gia các cuộc tranh luận trên mạng, góp phần cãi thắng những người ngoại đạo và bảo vệ quan điểm cực đoan của mình."
      ],
      "correctIndex": 0,
      "explanation": "Phải giữ gìn hình ảnh tốt đẹp của người môn sinh, góp phần lan tỏa điều thiện và bảo vệ những giá trị đạo đức mà Đức Phật đã dạy.",
      "sourceQuestion": "Câu 25. Hỏi: Người môn sinh cần có trách nhiệm gì đối với Phật Pháp?",
      "id": "hoang-1-c25-01"
    },
    {
      "type": "definition",
      "question": "Theo lý thuyết, lý tưởng sống của người môn sinh Phật Quang Quyền là gì?",
      "sampleAnswer": "Là không ngừng rèn luyện thân thể, trau dồi đạo đức, phụng sự cộng đồng và từng bước xây dựng tâm hồn hướng thiện theo lời Phật dạy.",
      "matchThreshold": 0.65,
      "explanation": "Là không ngừng rèn luyện thân thể, trau dồi đạo đức, phụng sự cộng đồng và từng bước xây dựng tâm hồn hướng thiện theo lời Phật dạy.",
      "sourceQuestion": "Câu 26. Hỏi: Lý tưởng sống của người môn sinh Phật Quang Quyền là gì?",
      "id": "hoang-1-c26-01"
    },
    {
      "type": "single",
      "question": "Nêu nguồn gốc bài Độc Lư Thương.",
      "options": [
        "Bài Độc Lư Thương có nguồn gốc từ Tây Sơn Võ Đạo – Bình Định. Khoảng năm 1770, ba anh em Nguyễn Nhạc, Nguyễn Huệ và Nguyễn Lữ đã biên soạn bài này để huấn luyện nghĩa quân Tây Sơn. Bài quyền được lưu truyền rộng rãi tại vùng An Khê, Gia Lai.",
        "Bài Độc Lư Thương có nguồn gốc từ Vovinam – Việt Võ Đạo. Khoảng năm 1938, võ sư Nguyễn Lộc đã biên soạn bài này để huấn luyện thanh niên yêu nước. Bài quyền được lưu truyền rộng rãi tại vùng Hà Nội.",
        "Bài Độc Lư Thương có nguồn gốc từ Thiếu Lâm Tự – Trung Quốc. Khoảng năm 1770, ba anh em nhà họ Trương đã biên soạn bài này để huấn luyện võ tăng. Bài quyền được lưu truyền rộng rãi tại vùng Tung Sơn, Hà Nam.",
        "Bài Độc Lư Thương có nguồn gốc từ Tân Khánh Bà Trà – Bình Dương. Khoảng năm 1850, ba anh em Nguyễn Nhạc, Nguyễn Huệ và Nguyễn Lữ đã biên soạn bài này để chống Pháp. Bài quyền được lưu truyền rộng rãi tại vùng Đông Nam Bộ."
      ],
      "correctIndex": 0,
      "explanation": "Bài Độc Lư Thương có nguồn gốc từ Tây Sơn Võ Đạo – Bình Định... vào khoảng năm 1770, khi xây dựng căn cứ khởi nghĩa, ba anh em Nguyễn Nhạc, Nguyễn Huệ và Nguyễn Lữ đã biên soạn bài Độc Lư Thương để huấn luyện nghĩa quân Tây Sơn.",
      "sourceQuestion": "Câu 27. Nêu nguồn gốc và lời thiệu bài quyền quy đinh độc Lư Thương:",
      "id": "hoang-1-c27a-01"
    },
    {
      "type": "single",
      "question": "Ý nghĩa của tên gọi \"Độc Lư Thương\" là gì?",
      "options": [
        "“Độc Lư” tượng trưng cho chiếc lư hương ba chân vững chắc, thể hiện tinh thần đoàn kết của ba anh em nhà Tây Sơn. Tên gọi này còn mang ý nghĩa tôn thờ một lý tưởng, một chính nghĩa, thể hiện quyết tâm đoàn kết và ủng hộ nghĩa quân Tây Sơn của nhân dân.",
        "“Độc Lư” tượng trưng cho chiếc lò rèn vũ khí duy nhất, thể hiện sức mạnh quân sự của ba anh em nhà Tây Sơn. Tên gọi này còn mang ý nghĩa tôn thờ thần lửa, một tín ngưỡng dân gian, thể hiện quyết tâm chế tạo binh khí và ủng hộ nghĩa quân Tây Sơn.",
        "“Độc Lư” tượng trưng cho sự cô độc, một mình một ngựa xông pha trận mạc của vua Quang Trung. Tên gọi này còn mang ý nghĩa tôn thờ chủ nghĩa anh hùng cá nhân, một chính nghĩa, thể hiện quyết tâm đánh giặc và sự dũng cảm vô song của nghĩa quân Tây Sơn.",
        "“Độc Lư” tượng trưng cho ngọn đuốc độc nhất chiếu sáng trong đêm, thể hiện sự dẫn đường của ba anh em nhà Tây Sơn. Tên gọi này còn mang ý nghĩa tôn thờ ánh sáng, một chân lý, thể hiện quyết tâm đi tìm tự do và xua tan bóng tối của nhân dân."
      ],
      "correctIndex": 0,
      "explanation": "“Độc Lư” tượng trưng cho chiếc lư hương ba chân vững chắc, thể hiện tinh thần đoàn kết, đồng lòng của ba anh em nhà Tây Sơn trong sự nghiệp dựng cờ khởi nghĩa... tôn thờ một lý tưởng, một chính nghĩa...",
      "sourceQuestion": "Câu 27. Nêu nguồn gốc và lời thiệu bài quyền quy đinh độc Lư Thương:",
      "id": "hoang-1-c27b-01"
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
