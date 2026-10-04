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
        "Tập võ để chiến thắng sự sợ hãi trong lòng mình và đạt được hạnh tinh tấn tận cùng.",
        "Tập võ để bênh vực kẻ yếu đuối bị ức hiếp.",
        "Tập võ để bảo vệ Phật pháp.",
        "Tập võ để bảo vệ dân tộc.",
        "Rất trung thành với thầy tổ, rất trọng nghĩa với huynh đệ.",
        "Yêu thích thể thao giúp đời."
      ],
      "correctOptions": [
        "Tập võ để chiến thắng sự sợ hãi trong lòng mình và đạt được hạnh nhẫn nhục tận cùng.",
        "Tập võ để bênh vực kẻ vô tội bị ức hiếp.",
        "Tập võ để bảo vệ chánh pháp.",
        "Tập võ để bảo vệ đất nước.",
        "Rất trung thành với thầy tổ, rất tín nghĩa với huynh đệ.",
        "Yêu thích lao động giúp đời."
      ],
      "explanation": "Một, tập võ để chiến thắng sự sợ hãi trong lòng mình và đạt được hạnh nhẫn nhục tận cùng. Hai, tập võ để bênh vực kẻ vô tội bị ức hiếp. Ba, tập võ để bảo vệ chánh pháp. Bốn, tập võ để bảo vệ đất nước. Năm, rất trung thành với thầy tổ, rất tín nghĩa với huynh đệ. Sáu, yêu thích lao động giúp đời.",
      "sourceQuestion": "Câu 1. Đọc thuộc 6 lời thế môn sinh Phật Quang Quyền",
      "id": "nau-c01-01"
    },
    {
      "type": "fill",
      "question": "Hoàn thành đoạn văn sau về lời thề môn sinh Phật Quang Quyền: Một, tập võ để ______[1]. Hai, tập võ để ______[2]. Ba, tập võ để bảo vệ chánh pháp.",
      "blanks": [
        "chiến thắng sự sợ hãi trong lòng mình và đạt được hạnh nhẫn nhục tận cùng",
        "bênh vực kẻ vô tội bị ức hiếp"
      ],
      "options": [
        "chiến thắng sự yếu đuối trong lòng mình và đạt được hạnh nhẫn nhục tận cùng",
        "chiến thắng sự sợ hãi trong lòng mình và đạt được hạnh tinh tấn tận cùng",
        "chiến thắng sự sợ hãi trong lòng mình và đạt được hạnh tinh tấn viên mãn",
        "chiến thắng sự rụt rè trong lòng mình và đạt được hạnh nhẫn nhục tận cùng",
        "bênh vực kẻ yếu thế bị ức hiếp",
        "bênh vực người thân thiện bị ức hiếp"
      ],
      "explanation": "Một, tập võ để chiến thắng sự sợ hãi trong lòng mình và đạt được hạnh nhẫn nhục tận cùng. Hai, tập võ để bênh vực kẻ vô tội bị ức hiếp. Ba, tập võ để bảo vệ chánh pháp.",
      "sourceQuestion": "Câu 1. Đọc thuộc 6 lời thế môn sinh Phật Quang Quyền",
      "id": "nau-c01-02"
    },
    {
      "type": "single",
      "question": "Môn phái Phật Quang Quyền được thành lập vào khoảng thời gian nào và trong hoàn cảnh nào?",
      "options": [
        "Năm 1992, trong những ngày đầu hình thành thiền viện Phật Quang.",
        "Năm 1992, trong những ngày đầu xây dựng chùa Phật Quang.",
        "Năm 1991, trong những ngày đầu hình thành chùa Phật Quang.",
        "Năm 1993, trong những ngày đầu hình thành chùa Phật Quang."
      ],
      "correctOption": "Năm 1992, trong những ngày đầu hình thành chùa Phật Quang.",
      "explanation": "Năm 1992, trong những ngày đầu hình thành chùa Phật Quang.",
      "sourceQuestion": "Câu 2. Phật Quang Quyền (PQQ) thành lập ngày tháng năm nào? Do ai sáng lập, ý tưởng từ đâu mà lập ra môn võ này?",
      "id": "nau-c02-01"
    },
    {
      "type": "multiple",
      "question": "Nguồn gốc ý tưởng lập ra môn võ Phật Quang Quyền bao gồm những điều nào?",
      "options": [
        "Mong muốn phục dựng truyền thống võ học trong nhân gian.",
        "Giúp Tăng Ni và thanh thiếu niên rèn luyện thể chất, đạo đức và bản lĩnh.",
        "Giúp Phật tử và thanh thiếu niên rèn luyện sức khỏe, đạo đức và bản lĩnh.",
        "Xây dựng thế hệ văn võ song toàn, phụng sự Đất nước và dân tộc."
      ],
      "correctOptions": [
        "Mong muốn phục dựng truyền thống võ học trong Thiền môn.",
        "Giúp Tăng Ni và thanh thiếu niên rèn luyện sức khỏe, đạo đức và bản lĩnh.",
        "Xây dựng thế hệ văn võ song toàn, phụng sự Đạo pháp và dân tộc."
      ],
      "explanation": "Mong muốn phục dựng truyền thống võ học trong Thiền môn. Giúp Tăng Ni và thanh thiếu niên rèn luyện sức khỏe, đạo đức và bản lĩnh. Xây dựng thế hệ văn võ song toàn, phụng sự Đạo pháp và dân tộc.",
      "sourceQuestion": "Câu 2. Phật Quang Quyền (PQQ) thành lập ngày tháng năm nào? Do ai sáng lập, ý tưởng từ đâu mà lập ra môn võ này?",
      "id": "nau-c02-02"
    },
    {
      "type": "single",
      "question": "Môn phái Phật Quang Quyền đã bái vị tôn giả nào làm Thái Tổ Sư của môn phái?",
      "options": [
        "Tôn giả Rahula (La Hầu La), một trong thập đại đệ tử của Đức Phật với danh hiệu Tịnh Hạnh Đệ Nhất Bảo hộ Tăng đoàn.",
        "Tôn giả Rahula (La Hầu La), một trong bát đại đệ tử của Đức Phật với danh hiệu Mật Hạnh Đệ Nhất Bảo hộ Tăng đoàn.",
        "Tôn giả Rahula (La Hầu La), một trong thập đại đệ tử của Đức Phật với danh hiệu Mật Hạnh Đệ Nhất Bảo vệ Tăng đoàn.",
        "Tôn giả Rahula (La Hầu La), một trong thập nhị đệ tử của Đức Phật với danh hiệu Mật Hạnh Đệ Nhất Bảo hộ Tăng đoàn."
      ],
      "correctOption": "Tôn giả Rahula (La Hầu La), một trong thập đại đệ tử của Đức Phật với danh hiệu Mật Hạnh Đệ Nhất Bảo hộ Tăng đoàn.",
      "explanation": "Môn phái bái tôn giả Rahula (La Hầu La), một trong thập đại đệ tử của Đức Phật với danh hiệu Mật Hạnh Đệ Nhất Bảo hộ Tăng đoàn làm Thái Tổ Sư của môn phái.",
      "sourceQuestion": "Câu 3. Môn phái đã bái vị tôn giả nào làm Thái Tổ Sư của môn phái?",
      "id": "nau-c03-01"
    },
    {
      "type": "definition",
      "question": "Môn phái đã bái vị tôn giả nào làm Thái Tổ Sư của môn phái?",
      "sampleAnswer": "Môn phái bái tôn giả Rahula làm Thái Tổ Sư.",
      "matchThreshold": 0.65,
      "explanation": "Môn phái bái tôn giả Rahula (La Hầu La), một trong thập đại đệ tử của Đức Phật với danh hiệu Mật Hạnh Đệ Nhất Bảo hộ Tăng đoàn làm Thái Tổ Sư của môn phái.",
      "sourceQuestion": "Câu 3. Môn phái đã bái vị tôn giả nào làm Thái Tổ Sư của môn phái?",
      "id": "nau-c03-02"
    },
    {
      "type": "single",
      "question": "Cho biết ngày sinh của võ sư sáng tổ Phật Quang Quyền?",
      "options": [
        "Sinh ngày 19 tháng 12 năm 1959.",
        "Sinh ngày 9 tháng 2 năm 1959.",
        "Sinh ngày 19 tháng 2 năm 1959.",
        "Sinh ngày 9 tháng 11 năm 1959."
      ],
      "correctOption": "Sinh ngày 9 tháng 12 năm 1959.",
      "explanation": "Sinh ngày 9 tháng 12 năm 1959.",
      "sourceQuestion": "Câu 4. Cho biết danh tính, ngày sinh của võ sư sáng tổ Phật Quang Quyền?",
      "id": "nau-c04-01"
    },
    {
      "type": "truefalse",
      "question": "Tình huống: Có nhận định cho rằng Võ sư Sáng tổ Phật Quang Quyền là Thượng Tọa Thượng Chân Hạ Quang, viện chủ thiền viện Phật Quang - núi Dinh – thành phố Hồ Chí Minh. Nhận định này Đúng hay Sai?",
      "correctAnswer": false,
      "explanation": "Võ sư Sáng tổ PQQ là Thượng Tọa Thượng Chân Hạ Quang. Người là viện chủ chùa Phật Quang - núi Dinh – thành phố Hồ Chí Minh.",
      "sourceQuestion": "Câu 4. Cho biết danh tính, ngày sinh của võ sư sáng tổ Phật Quang Quyền?",
      "id": "nau-c04-02"
    },
    {
      "type": "single",
      "question": "Chưởng môn hiện nay của môn phái Phật Quang Quyền là ai?",
      "options": [
        "Võ sư Thượng Tọa Thích Nghiêm Giám.",
        "Võ sư Đại Đức Thích Nghiêm Minh.",
        "Đại Đức Thích Nghiêm Giám.",
        "Võ sư Đại Đức Thích Nghiêm Quang."
      ],
      "correctOption": "Võ sư Đại Đức Thích Nghiêm Giám.",
      "explanation": "Chưởng môn hiện nay PQQ là Võ sư Đại Đức Thích Nghiêm Giám.",
      "sourceQuestion": "Câu 5. Chưởng môn hiện nay của môn phái là ai?",
      "id": "nau-c05-01"
    },
    {
      "type": "fill",
      "question": "Hoàn thành đoạn văn về lối chào của môn phái: Môn phái dùng lối chào, giống như lối chào trong Phật giáo, hai tay chắp vào nhau. Thể hiện tinh thần hòa bình, đoàn kết và ______[1], không để ______[2].",
      "blanks": [
        "nhắc nhở người võ sinh tu dưỡng nội tâm",
        "Tham, Sân, Si chi phối tạo điều xấu ác"
      ],
      "options": [
        "nhắc nhở người môn sinh tu dưỡng nội tâm",
        "nhắc nhở người võ sinh rèn luyện nội tâm",
        "nhắc nhở người võ sinh tu dưỡng đạo đức",
        "Tham, Sân, Mạn chi phối tạo điều xấu ác",
        "Tham, Sân, Si chi phối làm điều xấu ác",
        "Mạn, Nghi, Ác kiến chi phối tạo điều xấu ác"
      ],
      "explanation": "Môn phái dùng lối chào, giống như lối chào trong Phật giáo, hai tay chắp vào nhau. Thể hiện tinh thần hòa bình, đoàn kết và nhắc nhở người võ sinh tu dưỡng nội tâm, không để Tham, Sân, Si chi phối tạo điều xấu ác.",
      "sourceQuestion": "Câu 6. Ý nghĩa lối chào của môn phái?",
      "id": "nau-c06-01"
    },
    {
      "type": "multiple",
      "question": "Các điều sơ khởi cần ghi nhớ về kỷ luật võ đường là gì?",
      "options": [
        "Ði tập đều đặn đúng giờ, Nghỉ tập phải xin phép với lớp trưởng hoặc huấn luyện viên phụ trách.",
        "Trong giờ tập phải chăm chỉ luyện tập, không nói chuyện riêng, đoàn kết, giúp đỡ đồng môn.",
        "Gặp người trên hoặc huynh đệ đồng môn, phải cúi chào theo lối chào của môn phái.",
        "Khi đến võ đường và trước khi ra về phải chào tôn ảnh của Sư Phụ, hoặc biểu tượng môn phái."
      ],
      "correctOptions": [
        "Ði tập đều đặn đúng giờ, Nghỉ tập phải xin phép với võ sư hoặc huấn luyện viên phụ trách.",
        "Trong giờ tập phải chăm chỉ luyện tập, không làm việc riêng, đoàn kết, giúp đỡ đồng môn.",
        "Gặp người trên hoặc huynh đệ đồng môn, phải chào theo lối chào của môn phái.",
        "Khi đến võ đường và trước khi ra về phải chào tôn ảnh của Thái Tổ Sư, hoặc biểu tượng môn phái (nếu có)."
      ],
      "explanation": "Ði tập đều đặn đúng giờ, Nghỉ tập phải xin phép với võ sư hoặc huấn luyện viên phụ trách. Trong giờ tập phải chăm chỉ luyện tập, không làm việc riêng, đoàn kết, giúp đỡ đồng môn. Gặp người trên hoặc huynh đệ đồng môn, phải chào theo lối chào của môn phái. Khi đến võ đường và trước khi ra về phải chào tôn ảnh của Thái Tổ Sư, hoặc biểu tượng môn phái (nếu có).",
      "sourceQuestion": "Câu 7. Có mấy điều sơ khởi cần ghi nhớ về kỷ luật võ đường?",
      "id": "nau-c07-01"
    },
    {
      "type": "truefalse",
      "question": "Tình huống: Khi nghỉ tập, võ sinh nhắn tin cho lớp trưởng xin phép nghỉ mà không báo lại với huấn luyện viên phụ trách. Theo kỷ luật võ đường, hành động này là Đúng hay Sai?",
      "correctAnswer": false,
      "explanation": "Nghỉ tập phải xin phép với võ sư hoặc huấn luyện viên phụ trách.",
      "sourceQuestion": "Câu 7. Có mấy điều sơ khởi cần ghi nhớ về kỷ luật võ đường?",
      "id": "nau-c07-02"
    },
    {
      "type": "multiple",
      "question": "Quan niệm thông thường của người tập võ là để làm gì?",
      "options": [
        "Tập võ là để tự vệ, và bảo vệ bản thân.",
        "Rèn luyện khoẻ mạnh, tinh thần minh mẫn.",
        "Bồi dưỡng đạo đức để học tập, rèn luyện, cống hiến.",
        "Đấu tranh cho lẽ phải và phục vụ nhân dân."
      ],
      "correctOptions": [
        "Tập võ là để tự vệ, và bảo vệ sự sống",
        "Rèn luyện khoẻ mạnh, trí tuệ minh mẫn",
        "Bồi dưỡng đạo đức để học tập, lao động, cống hiến",
        "Đấu tranh cho lẽ phải và phục vụ tổ quốc."
      ],
      "explanation": "1. Tập võ là để tự vệ, và bảo vệ sự sống. 2. Rèn luyện khoẻ mạnh, trí tuệ minh mẫn. 3. Bồi dưỡng đạo đức để học tập, lao động, cống hiến. 4. Đấu tranh cho lẽ phải và phục vụ tổ quốc.",
      "sourceQuestion": "Câu 8. Quan niệm thông thường của người tập võ ra sao? tập võ để làm gì",
      "id": "nau-c08-01"
    },
    {
      "type": "multiple",
      "question": "Quan niệm dụng võ của võ sinh Phật Quang Quyền gồm những điều nào?",
      "options": [
        "Không thi đấu, không thử võ với người hoặc môn phái khác.",
        "Chỉ dùng võ để tự vệ, bảo vệ gia đình.",
        "Bảo vệ Phật pháp, và Tổ quốc.",
        "Đấu tranh cho người thân."
      ],
      "correctOptions": [
        "Không thượng đài.",
        "Không gây hấn, không thử võ với người hoặc môn phái khác.",
        "Chỉ dùng võ để tự vệ, bảo vệ người thân,",
        "Đấu tranh cho lẽ phải",
        "Bảo vệ đạo pháp, và Tổ quốc."
      ],
      "explanation": "Không thượng đài. Không gây hấn, không thử võ với người hoặc môn phái khác. Chỉ dùng võ để tự vệ, bảo vệ người thân. Đấu tranh cho lẽ phải. Bảo vệ đạo pháp, và Tổ quốc.",
      "sourceQuestion": "Câu 9. Quan niệm dụng võ của võ sinh Phật Quang Quyền ra sao?",
      "id": "nau-c09-01"
    },
    {
      "type": "single",
      "question": "Theo môn phái Phật Quang Quyền, vì sao võ sinh không được phép thượng đài?",
      "options": [
        "Thượng đài dễ tạo tâm hiếu thắng, hiếu chiến và môn phái hướng đến rèn luyện sức khỏe, xây dựng con người, phụng sự xã hội hơn là thi đấu thể thao.",
        "Thượng đài dễ tạo tâm sân hận, hiếu chiến và môn phái hướng đến rèn luyện đạo đức, xây dựng con người, phụng sự xã hội hơn là thi đấu thể thao.",
        "Thượng đài dễ tạo tâm hiếu thắng, hiếu chiến và môn phái hướng đến rèn luyện đạo đức, rèn luyện con người, phụng sự xã hội hơn là thi đấu thể thao.",
        "Thượng đài dễ tạo tâm tranh đua, hiếu chiến và môn phái hướng đến rèn luyện đạo đức, xây dựng con người, phụng sự xã hội hơn là thi đấu thể thao."
      ],
      "correctOption": "Thượng đài dễ tạo tâm hiếu thắng, hiếu chiến. Phật Quang Quyền hướng đến rèn luyện đạo đức, xây dựng con người và phụng sự xã hội hơn là thi đấu thể thao.",
      "explanation": "Thượng đài dễ tạo tâm hiếu thắng, hiếu chiến. Phật Quang Quyền hướng đến rèn luyện đạo đức, xây dựng con người và phụng sự xã hội hơn là thi đấu thể thao.",
      "sourceQuestion": "Câu 10. Võ sinh Phật Quang Quyền (VSPQQ) được phép dụng võ trong các trường hợp nào? VS PQQ không được phép thượng đài?",
      "id": "nau-c10-01"
    },
    {
      "type": "multiple",
      "question": "Võ sinh Phật Quang Quyền được phép dụng võ trong các trường hợp nào?",
      "options": [
        "Nhân phẩm bị xúc phạm.",
        "Tính mạng bị đe dọa.",
        "Bênh vực kẻ yếu."
      ],
      "correctOptions": [
        "Danh dự bị xúc phạm.",
        "Quyền sống bị đe dọa.",
        "Bênh vực lẽ phải."
      ],
      "explanation": "Chỉ dụng võ trong 3 trường hợp: Danh dự bị xúc phạm. Quyền sống bị đe dọa. Bênh vực lẽ phải.",
      "sourceQuestion": "Câu 10. Võ sinh Phật Quang Quyền (VSPQQ) được phép dụng võ trong các trường hợp nào? VS PQQ không được phép thượng đài?",
      "id": "nau-c10-02"
    },
    {
      "type": "single",
      "question": "Theo quy định của môn phái Phật Quang Quyền, môn sinh được định nghĩa là những người như thế nào?",
      "options": [
        "Môn sinh là những người đã qua một quá trình rèn luyện võ thuật, đạt được cấp đai Hoàng Đai Nhất Cấp (đối với Tu sĩ là cấp Hồng đai trở đi), được sự công nhận về đạo đức của môn phái và đã làm lễ nhập môn.",
        "Môn sinh là những người đã qua một thời gian rèn luyện võ thuật, đạt được cấp đai Hoàng Đai Nhất Cấp (đối với Tu sĩ là cấp Hồng đai trở đi), được sự công nhận về kỷ luật của môn phái và đã làm lễ nhập môn.",
        "Môn sinh là những người đã qua một thời gian rèn luyện võ thuật, đạt được cấp đai Hoàng Đai Nhị Cấp (đối với Tu sĩ là cấp Hồng đai trở đi), được sự công nhận về đạo đức của môn phái và đã làm lễ nhập môn.",
        "Môn sinh là những người mới tập võ, chưa làm lễ nhập môn."
      ],
      "correctOption": "Môn sinh là những người đã qua một thời gian rèn luyện võ thuật, đạt được cấp đai Hoàng Đai Nhất Cấp (Đối với Tu Sĩ trong MP PQQ thì cấp Hồng đai trở đi) được sự công nhận về đạo đức của môn phái và đã làm lễ nhập môn.",
      "explanation": "Môn sinh là những người đã qua một thời gian rèn luyện võ thuật, đạt được cấp đai Hoàng Đai Nhất Cấp (Đối với Tu Sĩ trong MP PQQ thì cấp Hồng đai trở đi) được sự công nhận về đạo đức của môn phái và đã làm lễ nhập môn.",
      "sourceQuestion": "Câu 11. Võ sinh và Môn sinh khác nhau như thế nào?",
      "id": "nau-c11-01"
    },
    {
      "type": "definition",
      "question": "Võ sinh là những người như thế nào?",
      "sampleAnswer": "Võ sinh là những người mới tập võ, chưa làm lễ nhập môn.",
      "matchThreshold": 0.65,
      "explanation": "Võ sinh là những người mới tập võ, chưa làm lễ nhập môn.",
      "sourceQuestion": "Câu 11. Võ sinh và Môn sinh khác nhau như thế nào?",
      "id": "nau-c11-02"
    },
    {
      "type": "single",
      "question": "Trong đại gia đình Phật Quang Quyền, các môn sinh phải đối xử với nhau như thế nào?",
      "options": [
        "Đoàn kết, yêu thương, tin cậy, kính trọng nhường nhịn và giúp đỡ lẫn nhau xem như anh em trong gia đình. Cùng rèn luyện để trở thành người tốt và hoàn thiện hơn.",
        "Đoàn kết, hòa ái, tin cậy, kính trọng nhường nhịn và giúp đỡ lẫn nhau xem như người thân trong gia đình. Cùng rèn luyện để trở thành người tốt và hoàn thiện hơn.",
        "Đoàn kết, yêu thương, tin cậy, kính trọng nhường nhịn và hỗ trợ lẫn nhau xem như người thân trong gia đình. Cùng rèn luyện để trở thành người tốt và hoàn thiện hơn.",
        "Đoàn kết, yêu thương, tin cậy, tôn trọng nhường nhịn và giúp đỡ lẫn nhau xem như người thân trong gia đình. Cùng rèn luyện để trở thành người tốt và hoàn thiện hơn."
      ],
      "correctOption": "Đoàn kết, yêu Thương, Tin cậy, kính trọng nhường nhịn và giúp đỡ lẫn nhau xem như người thân trong gia đình. Cùng rèn luyện để trở thành người tốt và hoàn thiện hơn.",
      "explanation": "Đoàn kết, yêu Thương, Tin cậy, kính trọng nhường nhịn và giúp đỡ lẫn nhau xem như người thân trong gia đình. Cùng rèn luyện để trở thành người tốt và hoàn thiện hơn.",
      "sourceQuestion": "Câu 12. Trong đại gia đình Phật Quang Quyền, các môn sinh đối xử nhau ra sao?",
      "id": "nau-c12-01"
    }
  ]
};

// Process questions to old schema if needed, but the original nau.json had single options with correctIndex, etc.
// Let me write a converter to make it match the existing schema perfectly.

data.questions.forEach((q, index) => {
  q.lessonId = data.lessonId;
  q.rankId = data.rankId;
  q.beltId = data.beltId;
  q.number = index + 1;
  
  if (q.type === 'single') {
    const allOptions = [q.correctOption, ...q.options];
    q.correctIndex = 0;
    q.options = allOptions;
    delete q.correctOption;
  } else if (q.type === 'multiple') {
    const allOptions = [...q.correctOptions, ...q.options];
    q.correctIndices = q.correctOptions.map((_, i) => i);
    q.options = allOptions;
    delete q.correctOptions;
  } else if (q.type === 'truefalse') {
    q.options = ['Đúng', 'Sai'];
    q.correctIndex = q.correctAnswer ? 0 : 1;
    delete q.correctAnswer;
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Saved to', path);
