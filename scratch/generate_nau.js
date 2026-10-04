const fs = require('fs');
const path = '/Users/luanph/Project other/MARTIAL WAY THEORY/content/exam-bank/nau.json';

const data = {
  "rankId": "nau",
  "beltId": "brown",
  "lessonId": "brown-lesson-01",
  "questions": [
    {
      "type": "multiple",
      "question": "Lời thế môn sinh Phật Quang Quyền gồm những nội dung nào?",
      "options": [
        "Tập võ để chiến thắng sự sợ hãi trong lòng mình và đạt được hạnh nhẫn nhục tận cùng.",
        "Tập võ để bênh vực kẻ vô tội bị ức hiếp.",
        "Rất trung thành với thầy tổ, rất tín nghĩa với huynh đệ.",
        "Yêu thích lao động giúp đời.",
        "Tập võ để chiến thắng sự sợ hãi trong lòng mình và đạt được hạnh tinh tấn tận cùng.",
        "Rất trung thành với thầy tổ, rất trọng nghĩa với huynh đệ."
      ],
      "correctIndices": [0, 1, 2, 3],
      "explanation": "Một, tập võ để chiến thắng sự sợ hãi trong lòng mình và đạt được hạnh nhẫn nhục tận cùng. Hai, tập võ để bênh vực kẻ vô tội bị ức hiếp. Năm, rất trung thành với thầy tổ, rất tín nghĩa với huynh đệ. Sáu, yêu thích lao động giúp đời.",
      "sourceQuestion": "Câu 1. Đọc thuộc 6 lời thế môn sinh Phật Quang Quyền (giám khảo có thể hỏi bất kỳ câu nào trong 6 câu).",
      "id": "nau-c01-01",
      "lessonId": "brown-lesson-01",
      "rankId": "nau",
      "beltId": "brown",
      "number": 1
    },
    {
      "type": "fill",
      "question": "Năm, rất trung thành với thầy tổ, rất ______ với huynh đệ.",
      "options": [
        "tín nghĩa",
        "chí nghĩa",
        "tình nghĩa",
        "dũng nghĩa"
      ],
      "blanks": ["tín nghĩa"],
      "explanation": "Năm, rất trung thành với thầy tổ, rất tín nghĩa với huynh đệ.",
      "sourceQuestion": "Câu 1. Đọc thuộc 6 lời thế môn sinh Phật Quang Quyền (giám khảo có thể hỏi bất kỳ câu nào trong 6 câu).",
      "id": "nau-c01-02",
      "lessonId": "brown-lesson-01",
      "rankId": "nau",
      "beltId": "brown",
      "number": 2
    },
    {
      "type": "single",
      "question": "Phật Quang Quyền được thành lập vào thời gian nào?",
      "options": [
        "Năm 1992, trong những ngày đầu hình thành chùa Phật Quang.",
        "Năm 1992, trong những ngày đầu hình thành thiền viện Phật Quang.",
        "Năm 1992, trong những ngày đầu xây dựng chùa Phật Quang.",
        "Năm 1991, trong những ngày đầu hình thành chùa Phật Quang."
      ],
      "correctIndex": 0,
      "explanation": "PQQ được thành lập: Năm 1992, trong những ngày đầu hình thành chùa Phật Quang.",
      "sourceQuestion": "Câu 2. Phật Quang Quyền (PQQ) thành lập ngày tháng năm nào? Do ai sáng lập, ý tưởng từ đâu mà lập ra môn võ này?",
      "id": "nau-c02-03",
      "lessonId": "brown-lesson-01",
      "rankId": "nau",
      "beltId": "brown",
      "number": 3
    },
    {
      "type": "multiple",
      "question": "Nguồn gốc ý tưởng lập ra Phật Quang Quyền gồm những mong muốn nào?",
      "options": [
        "Mong muốn phục dựng truyền thống võ học trong Thiền môn.",
        "Giúp Tăng Ni và thanh thiếu niên rèn luyện sức khỏe, đạo đức và bản lĩnh.",
        "Xây dựng thế hệ văn võ song toàn, phụng sự Đạo pháp và dân tộc.",
        "Mong muốn phục dựng truyền thống võ học ngoài dân gian.",
        "Giúp Tăng Ni và thanh thiếu niên rèn luyện sức khỏe, đạo đức và ý chí.",
        "Xây dựng thế hệ văn võ song toàn, phụng sự Đạo pháp và xã hội."
      ],
      "correctIndices": [0, 1, 2],
      "explanation": "Mong muốn phục dựng truyền thống võ học trong Thiền môn. Giúp Tăng Ni và thanh thiếu niên rèn luyện sức khỏe, đạo đức và bản lĩnh. Xây dựng thế hệ văn võ song toàn, phụng sự Đạo pháp và dân tộc.",
      "sourceQuestion": "Câu 2. Phật Quang Quyền (PQQ) thành lập ngày tháng năm nào? Do ai sáng lập, ý tưởng từ đâu mà lập ra môn võ này?",
      "id": "nau-c02-04",
      "lessonId": "brown-lesson-01",
      "rankId": "nau",
      "beltId": "brown",
      "number": 4
    },
    {
      "type": "single",
      "question": "Môn phái đã bái vị tôn giả nào làm Thái Tổ Sư của môn phái?",
      "options": [
        "Môn phái bái tôn giả Rahula (La Hầu La), một trong thập đại đệ tử của Đức Phật với danh hiệu Mật Hạnh Đệ Nhất Bảo hộ Tăng đoàn.",
        "Môn phái bái tôn giả Rahula (La Hầu La), một trong thập đại đệ tử của Đức Phật với danh hiệu Mật Hạnh Đệ Nhất của Tăng đoàn.",
        "Môn phái bái tôn giả Rahula (La Hầu La), một trong thập đại đệ tử của Đức Phật với danh hiệu Tịnh Hạnh Đệ Nhất Bảo hộ Tăng đoàn.",
        "Môn phái bái tôn giả Rahula (La Hầu La), một trong bát đại đệ tử của Đức Phật với danh hiệu Mật Hạnh Đệ Nhất Bảo hộ Tăng đoàn."
      ],
      "correctIndex": 0,
      "explanation": "Môn phái bái tôn giả Rahula (La Hầu La), một trong thập đại đệ tử của Đức Phật với danh hiệu Mật Hạnh Đệ Nhất Bảo hộ Tăng đoàn làm Thái Tổ Sư của môn phái.",
      "sourceQuestion": "Câu 3. Môn phái đã bái vị tôn giả nào làm Thái Tổ Sư của môn phái?",
      "id": "nau-c03-05",
      "lessonId": "brown-lesson-01",
      "rankId": "nau",
      "beltId": "brown",
      "number": 5
    },
    {
      "type": "definition",
      "question": "Môn phái đã bái vị tôn giả nào làm Thái Tổ Sư của môn phái?",
      "options": [],
      "sampleAnswer": "Môn phái bái tôn giả Rahula làm Thái Tổ Sư.",
      "matchThreshold": 0.65,
      "explanation": "Môn phái bái tôn giả Rahula (La Hầu La), một trong thập đại đệ tử của Đức Phật với danh hiệu Mật Hạnh Đệ Nhất Bảo hộ Tăng đoàn làm Thái Tổ Sư của môn phái.",
      "sourceQuestion": "Câu 3. Môn phái đã bái vị tôn giả nào làm Thái Tổ Sư của môn phái?",
      "id": "nau-c03-06",
      "lessonId": "brown-lesson-01",
      "rankId": "nau",
      "beltId": "brown",
      "number": 6
    },
    {
      "type": "single",
      "question": "Cho biết ngày sinh của võ sư sáng tổ Phật Quang Quyền?",
      "options": [
        "Sinh ngày 9 tháng 12 năm 1959.",
        "Sinh ngày 19 tháng 12 năm 1959.",
        "Sinh ngày 9 tháng 2 năm 1959.",
        "Sinh ngày 9 tháng 11 năm 1959."
      ],
      "correctIndex": 0,
      "explanation": "Sinh ngày 9 tháng 12 năm 1959.",
      "sourceQuestion": "Câu 4. Cho biết danh tính, ngày sinh của võ sư sáng tổ Phật Quang Quyền?",
      "id": "nau-c04-07",
      "lessonId": "brown-lesson-01",
      "rankId": "nau",
      "beltId": "brown",
      "number": 7
    },
    {
      "type": "truefalse",
      "question": "Nhận định: Võ sư Sáng tổ Phật Quang Quyền là Thượng Tọa Thượng Chân Hạ Quang. Người là viện chủ chùa Phật Quang - núi Dinh – thành phố Hồ Chí Minh. Điều này đúng hay sai?",
      "options": ["Đúng", "Sai"],
      "correctIndex": 0,
      "explanation": "Võ sư Sáng tổ PQQ là Thượng Tọa Thượng Chân Hạ Quang. Người là viện chủ chùa Phật Quang - núi Dinh – thành phố Hồ Chí Minh; là Võ Sư Sáng Tổ.",
      "sourceQuestion": "Câu 4. Cho biết danh tính, ngày sinh của võ sư sáng tổ Phật Quang Quyền?",
      "id": "nau-c04-08",
      "lessonId": "brown-lesson-01",
      "rankId": "nau",
      "beltId": "brown",
      "number": 8
    },
    {
      "type": "single",
      "question": "Chưởng môn hiện nay của môn phái Phật Quang Quyền là ai?",
      "options": [
        "Chưởng môn hiện nay Phật Quang Quyền là Võ sư Đại Đức Thích Nghiêm Giám.",
        "Chưởng môn hiện nay Phật Quang Quyền là Võ sư Thượng Tọa Thích Nghiêm Giám.",
        "Chưởng môn hiện nay Phật Quang Quyền là Võ sư Đại Đức Thích Nghiêm Minh.",
        "Chưởng môn hiện nay Phật Quang Quyền là Đại Đức Thích Nghiêm Giám."
      ],
      "correctIndex": 0,
      "explanation": "Chưởng môn hiện nay PQQ là Võ sư Đại Đức Thích Nghiêm Giám.",
      "sourceQuestion": "Câu 5. Chưởng môn hiện nay của môn phái là ai?",
      "id": "nau-c05-09",
      "lessonId": "brown-lesson-01",
      "rankId": "nau",
      "beltId": "brown",
      "number": 9
    },
    {
      "type": "definition",
      "question": "Chưởng môn hiện nay của môn phái Phật Quang Quyền là ai?",
      "options": [],
      "sampleAnswer": "Chưởng môn hiện nay là Võ sư Đại Đức Thích Nghiêm Giám.",
      "matchThreshold": 0.65,
      "explanation": "Chưởng môn hiện nay PQQ là Võ sư Đại Đức Thích Nghiêm Giám.",
      "sourceQuestion": "Câu 5. Chưởng môn hiện nay của môn phái là ai?",
      "id": "nau-c05-10",
      "lessonId": "brown-lesson-01",
      "rankId": "nau",
      "beltId": "brown",
      "number": 10
    },
    {
      "type": "single",
      "question": "Lối chào của môn phái thể hiện điều gì và nhắc nhở người võ sinh điều gì?",
      "options": [
        "Thể hiện tinh thần hòa bình, đoàn kết và nhắc nhở người võ sinh tu dưỡng nội tâm, không để Tham, Sân, Si chi phối tạo điều xấu ác.",
        "Thể hiện tinh thần hòa bình, đoàn kết và nhắc nhở người võ sinh rèn luyện nội tâm, không để Tham, Sân, Si chi phối tạo điều xấu ác.",
        "Thể hiện tinh thần hòa bình, đoàn kết và nhắc nhở người võ sinh tu dưỡng nội tâm, không để Tham, Sân, Mạn chi phối tạo điều xấu ác.",
        "Thể hiện tinh thần thượng võ, đoàn kết và nhắc nhở người võ sinh tu dưỡng nội tâm, không để Tham, Sân, Si chi phối tạo điều xấu ác."
      ],
      "correctIndex": 0,
      "explanation": "Thể hiện tinh thần hòa bình, đoàn kết và nhắc nhở người võ sinh tu dưỡng nội tâm, không để Tham, Sân, Si chi phối tạo điều xấu ác.",
      "sourceQuestion": "Câu 6. Ý nghĩa lối chào của môn phái?",
      "id": "nau-c06-11",
      "lessonId": "brown-lesson-01",
      "rankId": "nau",
      "beltId": "brown",
      "number": 11
    },
    {
      "type": "multiple",
      "question": "Các điều sơ khởi cần ghi nhớ về kỷ luật võ đường bao gồm những điều nào?",
      "options": [
        "Ði tập đều đặn đúng giờ, Nghỉ tập phải xin phép với võ sư hoặc huấn luyện viên phụ trách.",
        "Trong giờ tập phải chăm chỉ luyện tập, không làm việc riêng, đoàn kết, giúp đỡ đồng môn.",
        "Gặp người trên hoặc huynh đệ đồng môn, phải chào theo lối chào của môn phái.",
        "Ði tập đều đặn đúng giờ, Nghỉ tập phải xin phép với lớp trưởng hoặc huấn luyện viên phụ trách.",
        "Trong giờ tập phải chăm chỉ luyện tập, không nói chuyện riêng, đoàn kết, giúp đỡ đồng môn.",
        "Gặp người trên hoặc huynh đệ đồng môn, phải cúi chào theo lối chào của môn phái."
      ],
      "correctIndices": [0, 1, 2],
      "explanation": "Ði tập đều đặn đúng giờ... Trong giờ tập phải chăm chỉ luyện tập... Gặp người trên hoặc huynh đệ đồng môn, phải chào theo lối chào của môn phái...",
      "sourceQuestion": "Câu 7. Có mấy điều sơ khởi cần ghi nhớ về kỷ luật võ đường?",
      "id": "nau-c07-12",
      "lessonId": "brown-lesson-01",
      "rankId": "nau",
      "beltId": "brown",
      "number": 12
    },
    {
      "type": "truefalse",
      "question": "Tình huống: Khi đến võ đường và trước khi ra về, môn sinh đang vội nên đi thẳng luôn mà không chào tôn ảnh của Thái Tổ Sư. Điều này đúng hay sai theo kỷ luật võ đường?",
      "options": ["Đúng", "Sai"],
      "correctIndex": 1,
      "explanation": "Khi đến võ đường và trước khi ra về phải chào tôn ảnh của Thái Tổ Sư, hoặc biểu tượng môn phái (nếu có).",
      "sourceQuestion": "Câu 7. Có mấy điều sơ khởi cần ghi nhớ về kỷ luật võ đường?",
      "id": "nau-c07-13",
      "lessonId": "brown-lesson-01",
      "rankId": "nau",
      "beltId": "brown",
      "number": 13
    },
    {
      "type": "multiple",
      "question": "Quan niệm thông thường của người tập võ gồm những điều nào?",
      "options": [
        "Tập võ là để tự vệ, và bảo vệ sự sống.",
        "Rèn luyện khoẻ mạnh, trí tuệ minh mẫn.",
        "Bồi dưỡng đạo đức để học tập, lao động, cống hiến.",
        "Đấu tranh cho lẽ phải và phục vụ tổ quốc.",
        "Tập võ là để tự vệ, và bảo vệ bản thân.",
        "Rèn luyện khoẻ mạnh, tinh thần minh mẫn.",
        "Đấu tranh cho lẽ phải và phục vụ nhân dân."
      ],
      "correctIndices": [0, 1, 2, 3],
      "explanation": "Tập võ là để tự vệ, và bảo vệ sự sống. Rèn luyện khoẻ mạnh, trí tuệ minh mẫn. Bồi dưỡng đạo đức để học tập, lao động, cống hiến. Đấu tranh cho lẽ phải và phục vụ tổ quốc.",
      "sourceQuestion": "Câu 8. Quan niệm thông thường của người tập võ ra sao? tập võ để làm gì",
      "id": "nau-c08-14",
      "lessonId": "brown-lesson-01",
      "rankId": "nau",
      "beltId": "brown",
      "number": 14
    },
    {
      "type": "multiple",
      "question": "Quan niệm dụng võ của môn sinh Phật Quang Quyền gồm những điểm nào?",
      "options": [
        "Không thượng đài.",
        "Không gây hấn, không thử võ với người hoặc môn phái khác.",
        "Chỉ dùng võ để tự vệ, bảo vệ người thân.",
        "Đấu tranh cho lẽ phải.",
        "Bảo vệ đạo pháp, và Tổ quốc.",
        "Không thi đấu, không thử võ với người hoặc môn phái khác.",
        "Chỉ dùng võ để tự vệ, bảo vệ gia đình."
      ],
      "correctIndices": [0, 1, 2, 3, 4],
      "explanation": "Không thượng đài. Không gây hấn, không thử võ với người hoặc môn phái khác. Chỉ dùng võ để tự vệ, bảo vệ người thân. Đấu tranh cho lẽ phải. Bảo vệ đạo pháp, và Tổ quốc.",
      "sourceQuestion": "Câu 9. Quan niệm dụng võ của võ sinh Phật Quang Quyền ra sao?",
      "id": "nau-c09-15",
      "lessonId": "brown-lesson-01",
      "rankId": "nau",
      "beltId": "brown",
      "number": 15
    },
    {
      "type": "multiple",
      "question": "Võ sinh Phật Quang Quyền được phép dụng võ trong các trường hợp nào?",
      "options": [
        "Danh dự bị xúc phạm.",
        "Quyền sống bị đe dọa.",
        "Bênh vực lẽ phải.",
        "Nhân phẩm bị xúc phạm.",
        "Quyền lợi bị đe dọa.",
        "Bênh vực kẻ yếu."
      ],
      "correctIndices": [0, 1, 2],
      "explanation": "Chỉ dụng võ trong 3 trường hợp: Danh dự bị xúc phạm. Quyền sống bị đe dọa. Bênh vực lẽ phải.",
      "sourceQuestion": "Câu 10. Võ sinh Phật Quang Quyền (VSPQQ) được phép dụng võ trong các trường hợp nào? VS PQQ không được phép thượng đài?",
      "id": "nau-c10-16",
      "lessonId": "brown-lesson-01",
      "rankId": "nau",
      "beltId": "brown",
      "number": 16
    },
    {
      "type": "single",
      "question": "Vì sao võ sinh Phật Quang Quyền không được phép thượng đài?",
      "options": [
        "Phật Quang Quyền hướng đến rèn luyện đạo đức, xây dựng con người và phụng sự xã hội hơn là thi đấu thể thao.",
        "Phật Quang Quyền hướng đến rèn luyện đạo đức, xây dựng con người và giúp đỡ xã hội hơn là thi đấu thể thao.",
        "Phật Quang Quyền hướng đến rèn luyện sức khỏe, xây dựng con người và phụng sự xã hội hơn là thi đấu thể thao.",
        "Phật Quang Quyền hướng đến rèn luyện đạo đức, rèn luyện con người và phụng sự xã hội hơn là thi đấu thể thao."
      ],
      "correctIndex": 0,
      "explanation": "Phật Quang Quyền hướng đến rèn luyện đạo đức, xây dựng con người và phụng sự xã hội hơn là thi đấu thể thao.",
      "sourceQuestion": "Câu 10. Võ sinh Phật Quang Quyền (VSPQQ) được phép dụng võ trong các trường hợp nào? VS PQQ không được phép thượng đài?",
      "id": "nau-c10-17",
      "lessonId": "brown-lesson-01",
      "rankId": "nau",
      "beltId": "brown",
      "number": 17
    },
    {
      "type": "definition",
      "question": "Võ sinh là những người như thế nào?",
      "options": [],
      "sampleAnswer": "Võ sinh là những người mới tập võ, chưa làm lễ nhập môn.",
      "matchThreshold": 0.65,
      "explanation": "Võ sinh là những người mới tập võ, chưa làm lễ nhập môn.",
      "sourceQuestion": "Câu 11. Võ sinh và Môn sinh khác nhau như thế nào?",
      "id": "nau-c11-18",
      "lessonId": "brown-lesson-01",
      "rankId": "nau",
      "beltId": "brown",
      "number": 18
    },
    {
      "type": "single",
      "question": "Môn sinh là những người như thế nào?",
      "options": [
        "Môn sinh là những người đã qua một thời gian rèn luyện võ thuật, đạt được cấp đai Hoàng Đai Nhất Cấp được sự công nhận về đạo đức của môn phái và đã làm lễ nhập môn.",
        "Môn sinh là những người đã qua một thời gian rèn luyện võ thuật, đạt được cấp đai Hoàng Đai Nhất Cấp được sự công nhận về kỷ luật của môn phái và đã làm lễ nhập môn.",
        "Môn sinh là những người đã qua một thời gian rèn luyện võ thuật, đạt được cấp đai Hoàng Đai Nhị Cấp được sự công nhận về đạo đức của môn phái và đã làm lễ nhập môn.",
        "Môn sinh là những người đã qua một quá trình rèn luyện võ thuật, đạt được cấp đai Hoàng Đai Nhất Cấp được sự công nhận về đạo đức của môn phái và đã làm lễ nhập môn."
      ],
      "correctIndex": 0,
      "explanation": "Môn sinh là những người đã qua một thời gian rèn luyện võ thuật, đạt được cấp đai Hoàng Đai Nhất Cấp (Đối với Tu Sĩ trong MP PQQ thì cấp Hồng đai trở đi) được sự công nhận về đạo đức của môn phái và đã làm lễ nhập môn.",
      "sourceQuestion": "Câu 11. Võ sinh và Môn sinh khác nhau như thế nào?",
      "id": "nau-c11-19",
      "lessonId": "brown-lesson-01",
      "rankId": "nau",
      "beltId": "brown",
      "number": 19
    },
    {
      "type": "single",
      "question": "Trong đại gia đình Phật Quang Quyền, các môn sinh phải đối xử nhau ra sao?",
      "options": [
        "Đoàn kết, yêu Thương, Tin cậy, kính trọng nhường nhịn và giúp đỡ lẫn nhau xem như người thân trong gia đình. Cùng rèn luyện để trở thành người tốt và hoàn thiện hơn.",
        "Đoàn kết, yêu Thương, Tin cậy, kính trọng nhường nhịn và giúp đỡ lẫn nhau xem như anh em trong gia đình. Cùng rèn luyện để trở thành người tốt và hoàn thiện hơn.",
        "Đoàn kết, hòa ái, Tin cậy, kính trọng nhường nhịn và giúp đỡ lẫn nhau xem như người thân trong gia đình. Cùng rèn luyện để trở thành người tốt và hoàn thiện hơn.",
        "Đoàn kết, yêu Thương, Tin cậy, kính trọng nhường nhịn và giúp đỡ lẫn nhau xem như người thân trong gia đình. Cùng tập luyện để trở thành người tốt và hoàn thiện hơn."
      ],
      "correctIndex": 0,
      "explanation": "Đoàn kết, yêu Thương, Tin cậy, kính trọng nhường nhịn và giúp đỡ lẫn nhau xem như người thân trong gia đình. Cùng rèn luyện để trở thành người tốt và hoàn thiện hơn.",
      "sourceQuestion": "Câu 12. Trong đại gia đình Phật Quang Quyền, các môn sinh đối xử nhau ra sao?",
      "id": "nau-c12-20",
      "lessonId": "brown-lesson-01",
      "rankId": "nau",
      "beltId": "brown",
      "number": 20
    }
  ]
};

fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Saved to', path);
