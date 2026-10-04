const fs = require('fs');
const path = '/Users/luanph/Project other/MARTIAL WAY THEORY/content/exam-bank/lam-2.json';

const data = {
  "rankId": "lam-2",
  "beltId": "blue",
  "lessonId": "blue-lesson-02",
  "questions": [
    {
      "type": "multiple",
      "question": "Muốn phát huy môn phái, võ sinh PQQ phải thực hành tinh thần võ đạo trong đời sống hằng ngày như thế nào?",
      "options": [
        "Trong gia đình là người cha từ, con hiếu, anh hiền, em thảo.",
        "Với bạn bè giữ chữ tín, sống nghĩa tình.",
        "Với xã hội; là người công dân tốt.",
        "Trong gia đình là người cha hiền, con hiếu, anh từ, em thảo.",
        "Với bạn bè giữ chữ tín, sống sòng phẳng.",
        "Với xã hội; là người dân tốt."
      ],
      "correctIndices": [0, 1, 2],
      "explanation": "Thực hành tinh thần võ đạo của môn phái trong đời sống hằng ngày: Trong gia đình là người cha từ, con hiếu, anh hiền, em thảo. Với bạn bè giữ chữ tín, sống nghĩa tình. Với xã hội; là người công dân tốt.",
      "sourceQuestion": "Câu 1. Muốn phát huy môn phái võ sinh PQQ phải làm gì?",
      "id": "lam2-c01-01",
      "lessonId": "blue-lesson-02",
      "rankId": "lam-2",
      "beltId": "blue",
      "number": 1
    },
    {
      "type": "single",
      "question": "Đối với Thầy Tổ và đất nước, môn sinh PQQ phải có thái độ như thế nào?",
      "options": [
        "Đối với Thầy Tổ môn phái phải trung thành, kính trọng. Đối với đất nước: phải có lòng yêu nước nồng nàn.",
        "Đối với Thầy Tổ môn phái phải trung thực, kính trọng. Đối với đất nước: phải có lòng yêu nước nồng nàn.",
        "Đối với Thầy Tổ môn phái phải trung thành, tôn trọng. Đối với đất nước: phải có lòng yêu nước nồng nàn.",
        "Đối với Thầy Tổ môn phái phải trung thành, kính trọng. Đối với đất nước: phải có lòng yêu nước thiết tha."
      ],
      "correctIndex": 0,
      "explanation": "Đối với Thầy Tổ môn phái phải trung thành, kính trọng. Đối với đất nước: phải có lòng yêu nước nồng nàn.",
      "sourceQuestion": "Câu 1. Muốn phát huy môn phái võ sinh PQQ phải làm gì?",
      "id": "lam2-c01-02",
      "lessonId": "blue-lesson-02",
      "rankId": "lam-2",
      "beltId": "blue",
      "number": 2
    },
    {
      "type": "multiple",
      "question": "Nghĩa vụ của môn sinh PQQ đối với dân tộc bao gồm những phẩm chất nào?",
      "options": [
        "Biết phụng sự và giúp đỡ mọi người.",
        "Biết tu dưỡng, diệt trừ bản ngã.",
        "Biết yêu thương và chia sẻ với mọi người.",
        "Biết phụng sự và bảo vệ mọi người.",
        "Biết tu dưỡng, diệt trừ lòng tham.",
        "Biết quan tâm và chia sẻ với mọi người."
      ],
      "correctIndices": [0, 1, 2],
      "explanation": "Nghĩa vụ của môn sinh PQQ là phải xây dựng một thế hệ thanh niên PQQ có những phẩm chất: Biết phụng sự và giúp đỡ mọi người. Biết tu dưỡng, diệt trừ bản ngã. Biết yêu thương và chia sẻ với mọi người.",
      "sourceQuestion": "Câu 2. Cho biết nghĩa vụ của môn sinh PQQ đối với dân tộc như thế nào?",
      "id": "lam2-c02-03",
      "lessonId": "blue-lesson-02",
      "rankId": "lam-2",
      "beltId": "blue",
      "number": 3
    },
    {
      "type": "single",
      "question": "Cho biết tại sao tình đoàn kết được đề cập đến trước nhất trong một đoàn thể?",
      "options": [
        "Vì đoàn kết là yếu tố quan trọng quyết định sự vững mạnh hay tan rã của một tập thể.",
        "Vì đoàn kết là yếu tố quan trọng quyết định sự thành công hay thất bại của một tập thể.",
        "Vì đoàn kết là yếu tố quan trọng quyết định sự phát triển hay thụt lùi của một tập thể.",
        "Vì đoàn kết là yếu tố quan trọng quyết định sự tồn tại hay diệt vong của một tập thể."
      ],
      "correctIndex": 0,
      "explanation": "Vì đoàn kết là yếu tố quan trọng quyết định sự vững mạnh hay tan rã của một tập thể.",
      "sourceQuestion": "Câu 3. Cho biết tại sao tình đoàn kết được đề cập đến trước nhất trong một đoàn thể?",
      "id": "lam2-c03-04",
      "lessonId": "blue-lesson-02",
      "rankId": "lam-2",
      "beltId": "blue",
      "number": 4
    },
    {
      "type": "multiple",
      "question": "Muốn xây dựng tình đoàn kết trong môn phái, môn sinh PQQ phải làm gì?",
      "options": [
        "Loại bỏ thành kiến cá nhân và lòng ích kỷ.",
        "Biết bỏ qua tự ái, thù hằn và mâu thuẫn.",
        "Khi có hiểu lầm, phải chân thành trao đổi và giải quyết trong tinh thần xây dựng, hoan hỷ.",
        "Loại bỏ lợi ích cá nhân và lòng ích kỷ.",
        "Biết bỏ qua tự trọng, thù hằn và mâu thuẫn.",
        "Khi có hiểu lầm, phải thẳng thắn trao đổi và giải quyết trong tinh thần xây dựng, hoan hỷ."
      ],
      "correctIndices": [0, 1, 2],
      "explanation": "Muốn xây dựng tình đoàn kết trong môn phái, môn sinh PQQ phải: Loại bỏ thành kiến cá nhân và lòng ích kỷ. Biết bỏ qua tự ái, thù hằn và mâu thuẫn. Khi có hiểu lầm, phải chân thành trao đổi và giải quyết trong tinh thần xây dựng, hoan hỷ.",
      "sourceQuestion": "Câu 4. Muốn xây dựng tình đoàn kết trong môn phái, Môn sinh PQQ phải làm gì?",
      "id": "lam2-c04-05",
      "lessonId": "blue-lesson-02",
      "rankId": "lam-2",
      "beltId": "blue",
      "number": 5
    },
    {
      "type": "truefalse",
      "question": "Tình huống: Một võ sinh cho rằng kỷ luật của môn phái Phật Quang Quyền là kỷ luật bắt buộc, người dưới phải tuân theo người trên một cách tuyệt đối. Theo bài học, nhận định này đúng hay sai?",
      "options": [
        "Đúng",
        "Sai"
      ],
      "correctIndex": 1,
      "explanation": "Kỷ luật môn phái Phật Quang Quyền là kỷ luật tự giác, dựa trên tinh thần tự nguyện, đoàn kết, yêu thương, tôn trọng và tin cậy lẫn nhau.",
      "sourceQuestion": "Câu 5. Cho biết kỷ luật môn phái PQQ là gì?",
      "id": "lam2-c05-06",
      "lessonId": "blue-lesson-02",
      "rankId": "lam-2",
      "beltId": "blue",
      "number": 6
    },
    {
      "type": "fill",
      "question": "Anh hùng cá nhân chủ nghĩa là người tuy có tài năng nhưng sống ích kỷ, đặt ______ lên trên tập thể, thiếu tinh thần kỷ luật, không chịu tuân theo tổ chức và thường hành động theo ý riêng.",
      "options": [
        "lợi ích cá nhân",
        "quyền lợi cá nhân",
        "lợi ích bản thân",
        "danh dự cá nhân"
      ],
      "blanks": ["lợi ích cá nhân"],
      "explanation": "Anh hùng cá nhân chủ nghĩa là người tuy có tài năng nhưng sống ích kỷ, đặt lợi ích cá nhân lên trên tập thể, thiếu tinh thần kỷ luật, không chịu tuân theo tổ chức và thường hành động theo ý riêng.",
      "sourceQuestion": "Câu 6. Cho biết thế nào là anh hùng cá nhân chủ nghĩa?",
      "id": "lam2-c06-07",
      "lessonId": "blue-lesson-02",
      "rankId": "lam-2",
      "beltId": "blue",
      "number": 7
    },
    {
      "type": "single",
      "question": "Danh dự của võ sĩ là gì?",
      "options": [
        "Danh dự của võ sĩ không chỉ là danh dự cá nhân mà còn là danh dự của tập thể và môn phái.",
        "Danh dự của võ sĩ không chỉ là danh dự cá nhân mà còn là danh dự của gia đình và môn phái.",
        "Danh dự của võ sĩ không chỉ là danh dự cá nhân mà còn là danh dự của võ đường và môn phái.",
        "Danh dự của võ sĩ không chỉ là danh dự cá nhân mà còn là danh dự của tổ chức và môn phái."
      ],
      "correctIndex": 0,
      "explanation": "Danh dự của võ sĩ không chỉ là danh dự cá nhân mà còn là danh dự của tập thể và môn phái.",
      "sourceQuestion": "Câu 7. Cho biết danh dự của Võ sĩ là gì?",
      "id": "lam2-c07-08",
      "lessonId": "blue-lesson-02",
      "rankId": "lam-2",
      "beltId": "blue",
      "number": 8
    },
    {
      "type": "single",
      "question": "Người võ sĩ phải sống hiên ngang, cao thượng, biết bảo vệ người yếu, bênh vực lẽ phải và đặt điều gì lên trên lòng tự ái cá nhân?",
      "options": [
        "Đặt võ đạo lên trên lòng tự ái cá nhân.",
        "Đặt võ thuật lên trên lòng tự ái cá nhân.",
        "Đặt danh dự lên trên lòng tự ái cá nhân.",
        "Đặt tập thể lên trên lòng tự ái cá nhân."
      ],
      "correctIndex": 0,
      "explanation": "Người võ sĩ phải sống hiên ngang, cao thượng, biết bảo vệ người yếu, bênh vực lẽ phải và đặt võ đạo lên trên lòng tự ái cá nhân.",
      "sourceQuestion": "Câu 7. Cho biết danh dự của Võ sĩ là gì?",
      "id": "lam2-c07-09",
      "lessonId": "blue-lesson-02",
      "rankId": "lam-2",
      "beltId": "blue",
      "number": 9
    },
    {
      "type": "truefalse",
      "question": "Tình huống: Một môn sinh cho rằng tập luyện võ thuật chỉ cần đạt được mục đích là có một cơ thể khỏe mạnh, dẻo dai và tinh thần minh mẫn là đủ. Theo quan điểm rèn luyện võ thuật của môn phái, nhận định này đúng hay sai?",
      "options": [
        "Đúng",
        "Sai"
      ],
      "correctIndex": 1,
      "explanation": "Tuy nhiên không chỉ dừng lại ở việc có sức khỏe mà người luyện võ cần phải dùng sức khỏe đó để phụng sự, và đem lại lợi ích cho cuộc đời này, có như thế việc rèn luyện sức khỏe bằng võ thuật mới thực sự có ý nghĩa.",
      "sourceQuestion": "Câu 8. Quan điểm rèn luyện võ thuật của môn sinh PQQ như thế nào?",
      "id": "lam2-c08-10",
      "lessonId": "blue-lesson-02",
      "rankId": "lam-2",
      "beltId": "blue",
      "number": 10
    },
    {
      "type": "single",
      "question": "Môn sinh PQQ phải rèn luyện kỹ năng chiến đấu và chiến thắng đến mức độ như thế nào?",
      "options": [
        "Đến mức độ tinh xảo nhưng thẳm sâu trong tâm hồn yêu thích sự nhường nhịn thứ tha.",
        "Đến mức độ tinh xảo nhưng thẳm sâu trong tâm hồn yêu thích sự khiêm tốn thứ tha.",
        "Đến mức độ hoàn hảo nhưng thẳm sâu trong tâm hồn yêu thích sự nhường nhịn thứ tha.",
        "Đến mức độ điêu luyện nhưng thẳm sâu trong tâm hồn yêu thích sự nhường nhịn thứ tha."
      ],
      "correctIndex": 0,
      "explanation": "Môn sinh PQQ phải rèn luyện kỹ năng chiến đấu và chiến thắng đến mức độ tinh xảo nhưng thẳm sâu trong tâm hồn yêu thích sự nhường nhịn thứ tha.",
      "sourceQuestion": "Câu 9. Môn sinh PQQ phải rèn luyện kỹ năng chiến đấu và chiến thắng đên mức độ như thế nào?",
      "id": "lam2-c09-11",
      "lessonId": "blue-lesson-02",
      "rankId": "lam-2",
      "beltId": "blue",
      "number": 11
    },
    {
      "type": "single",
      "question": "Đai Xanh Lam (Thủy – Nước) nhắc nhở người võ sinh rèn luyện đức tính gì?",
      "options": [
        "Khiêm hạ – Nhẫn nhục.",
        "Siêng năng – Vươn lên.",
        "Dũng cảm – Tinh tấn.",
        "Vững vàng – Bao dung."
      ],
      "correctIndex": 0,
      "explanation": "Xanh Lam (Thủy – Nước) Đức tính: Khiêm hạ – Nhẫn nhục.",
      "sourceQuestion": "Câu 11. Môn phái Phật Quang Quyền (PQQ) có mấy màu đai? Ý nghĩa ra sao?",
      "id": "lam2-c11-12",
      "lessonId": "blue-lesson-02",
      "rankId": "lam-2",
      "beltId": "blue",
      "number": 12
    },
    {
      "type": "multiple",
      "question": "Ý nghĩa của đai Xanh Lục (Mộc – Cây) trong hệ thống đai của môn phái là gì?",
      "options": [
        "Tượng trưng cho sự sinh trưởng và phát triển.",
        "Nhắc người võ sinh không ngừng tiến bộ trong võ thuật và đạo đức.",
        "Tượng trưng cho sự mềm mại, khiêm tốn và thích nghi.",
        "Nhắc người võ sinh biết nhẫn nhịn, lắng nghe và học hỏi."
      ],
      "correctIndices": [0, 1],
      "explanation": "Xanh Lục (Mộc – Cây): Tượng trưng cho sự sinh trưởng và phát triển. Nhắc người võ sinh không ngừng tiến bộ trong võ thuật và đạo đức.",
      "sourceQuestion": "Câu 11. Môn phái Phật Quang Quyền (PQQ) có mấy màu đai? Ý nghĩa ra sao?",
      "id": "lam2-c11-13",
      "lessonId": "blue-lesson-02",
      "rankId": "lam-2",
      "beltId": "blue",
      "number": 13
    },
    {
      "type": "multiple",
      "question": "Quy định về võ phục của môn phái Phật Quang Quyền đối với các chức danh như thế nào?",
      "options": [
        "Chưởng môn Sáng Tổ: Võ phục màu vàng đất.",
        "Chưởng môn, Phó Chưởng môn: Võ phục nâu đen, cổ áo màu vàng.",
        "Các thành viên khác: Võ phục nâu đen.",
        "Chưởng môn Sáng Tổ: Võ phục màu vàng nghệ.",
        "Chưởng môn, Phó Chưởng môn: Võ phục nâu đen, viền áo màu vàng.",
        "Các thành viên khác: Võ phục màu đen."
      ],
      "correctIndices": [0, 1, 2],
      "explanation": "Chưởng môn Sáng Tổ: Võ phục màu vàng đất. Chưởng môn, Phó Chưởng môn: Võ phục nâu đen, cổ áo màu vàng. Các thành viên khác: Võ phục nâu đen.",
      "sourceQuestion": "Câu 12. Các quy định về trang phục môn phái Phật Quang Quyền.?",
      "id": "lam2-c12-14",
      "lessonId": "blue-lesson-02",
      "rankId": "lam-2",
      "beltId": "blue",
      "number": 14
    },
    {
      "type": "fill",
      "question": "Môn phái Phật Quang Quyền có 6 màu đai, ______ cấp và 5 bậc.",
      "options": [
        "26",
        "24",
        "28",
        "30"
      ],
      "blanks": ["26"],
      "explanation": "Môn phái Phật Quang Quyền có 6 màu đai, 26 cấp và 5 bậc.",
      "sourceQuestion": "Câu 13. Hệ thống cấp đai của môn phái Phật Quang Quyền như thế nào?",
      "id": "lam2-c13-15",
      "lessonId": "blue-lesson-02",
      "rankId": "lam-2",
      "beltId": "blue",
      "number": 15
    },
    {
      "type": "single",
      "question": "Biểu tượng môn phái là hình tròn, tượng trưng cho điều gì?",
      "options": [
        "Tượng trưng cho bánh xe Chuyển Pháp Luân của Phật giáo.",
        "Tượng trưng cho bánh xe luân hồi của Phật giáo.",
        "Tượng trưng cho sự viên mãn của Phật giáo.",
        "Tượng trưng cho bánh xe Chánh Pháp của Phật giáo."
      ],
      "correctIndex": 0,
      "explanation": "Biểu tượng môn phái là hình tròn, tượng trưng cho bánh xe Chuyển Pháp Luân của Phật giáo.",
      "sourceQuestion": "Câu 14. Ý nghĩa biểu tượng môn phái Phật Quang Quyền?",
      "id": "lam2-c14-16",
      "lessonId": "blue-lesson-02",
      "rankId": "lam-2",
      "beltId": "blue",
      "number": 16
    },
    {
      "type": "multiple",
      "question": "Trong biểu tượng môn phái, 4 màu Xanh Lam, Xanh Lục, Đỏ, Vàng của bông hoa 8 cánh tượng trưng cho những phẩm chất nào người môn sinh cần rèn luyện?",
      "options": [
        "Công đức",
        "Đạo đức",
        "Khí công",
        "Thiền định",
        "Nhân đức",
        "Nội công"
      ],
      "correctIndices": [0, 1, 2, 3],
      "explanation": "Bên trong có 8 hình elip liên kết thành bông hoa 8 cánh với 4 màu: Xanh Lam, Xanh Lục, Đỏ, Vàng, tượng trưng cho 4 phẩm chất người môn sinh Phật Quang Quyền cần rèn luyện: Công đức, Đạo đức, Khí công, Thiền định.",
      "sourceQuestion": "Câu 14. Ý nghĩa biểu tượng môn phái Phật Quang Quyền?",
      "id": "lam2-c14-17",
      "lessonId": "blue-lesson-02",
      "rankId": "lam-2",
      "beltId": "blue",
      "number": 17
    },
    {
      "type": "fill",
      "question": "Ý nghĩa biểu tượng của môn phái ý muốn nói: mỗi môn sinh PQQ như một bông hoa ngát hương đạo đức không ngừng ______ cho đời.",
      "options": [
        "tô đẹp",
        "làm đẹp",
        "cống hiến",
        "phụng sự"
      ],
      "blanks": ["tô đẹp"],
      "explanation": "ý nghĩa biểu tượng của môn phái ý muốn nói: mỗi môn sinh PQQ như một bông hoa ngát hương đạo đức không ngừng tô đẹp cho đời.",
      "sourceQuestion": "Câu 14. Ý nghĩa biểu tượng môn phái Phật Quang Quyền?",
      "id": "lam2-c14-18",
      "lessonId": "blue-lesson-02",
      "rankId": "lam-2",
      "beltId": "blue",
      "number": 18
    }
  ]
};

fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Saved to', path);
