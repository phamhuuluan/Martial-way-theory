const fs = require('fs');
const path = '/Users/luanph/Project other/MARTIAL WAY THEORY/content/exam-bank/lam-2.json';

const data = {
  "rankId": "lam-2",
  "beltId": "blue",
  "lessonId": "blue-lesson-02",
  "questions": [
    {
      "type": "multiple",
      "question": "Muốn phát huy môn phái, võ sinh Phật Quang Quyền phải làm gì?",
      "options": [
        "Siêng năng khổ luyện để trở thành võ sư, huấn luyện viên, góp phần truyền bá võ thuật và võ đạo.",
        "Thực hành tinh thần võ đạo trong gia đình là người cha từ, con hiếu, anh hiền, em thảo.",
        "Với bạn bè giữ chữ tín, sống nghĩa tình.",
        "Với xã hội; là người công dân tốt.",
        "Đối với Thầy Tổ môn phái phải trung thành, kính trọng.",
        "Đối với đất nước: phải có lòng yêu nước nồng nàn.",
        "Siêng năng khổ luyện để trở thành võ sư, huấn luyện viên, góp phần truyền bá võ thuật và võ nghệ.",
        "Thực hành tinh thần võ đạo trong gia đình là người cha hiền, con hiếu, anh từ, em thảo.",
        "Với bạn bè giữ chữ tín, sống công bằng.",
        "Với xã hội là người công dân gương mẫu.",
        "Đối với Thầy Tổ môn phái phải trung thành, hiếu kính.",
        "Đối với đất nước phải có lòng yêu nước thiết tha."
      ],
      "correctIndices": [0, 1, 2, 3, 4, 5],
      "explanation": "Muốn phát huy môn phái võ sinh PQQ phải: Siêng năng khổ luyện để trở thành võ sư, huấn luyện viên... Thực hành tinh thần võ đạo... Trong gia đình là người cha từ, con hiếu, anh hiền, em thảo. Với bạn bè giữ chữ tín, sống nghĩa tình. Với xã hội; là người công dân tốt. Đối với Thầy Tổ môn phái phải trung thành, kính trọng. Đối với đất nước: phải có lòng yêu nước nồng nàn.",
      "sourceQuestion": "Câu 1. Muốn phát huy môn phái võ sinh PQQ phải làm gì?",
      "id": "lam-2-c01-01"
    },
    {
      "type": "multiple",
      "question": "Cho biết nghĩa vụ của môn sinh Phật Quang Quyền đối với dân tộc như thế nào?",
      "options": [
        "Biết phụng sự và giúp đỡ mọi người.",
        "Biết tu dưỡng, diệt trừ bản ngã.",
        "Biết yêu thương và chia sẻ với mọi người.",
        "Nuôi dưỡng lòng yêu nước, góp phần bảo vệ và xây dựng đất nước.",
        "Biết cống hiến và giúp đỡ mọi người.",
        "Biết tu dưỡng, diệt trừ bản ác.",
        "Biết yêu thương và hòa ái với mọi người.",
        "Nuôi dưỡng lòng yêu nước, góp phần bảo vệ và phát triển đất nước."
      ],
      "correctIndices": [0, 1, 2, 3],
      "explanation": "Biết phụng sự và giúp đỡ mọi người. Biết tu dưỡng, diệt trừ bản ngã. Biết yêu thương và chia sẻ với mọi người. Nuôi dưỡng lòng yêu nước, góp phần bảo vệ và xây dựng đất nước.",
      "sourceQuestion": "Câu 2. Cho biết nghĩa vụ của môn sinh PQQ đối với dân tộc như thế nào?",
      "id": "lam-2-c02-01"
    },
    {
      "type": "single",
      "question": "Cho biết tại sao tình đoàn kết được đề cập đến trước nhất trong một đoàn thể?",
      "options": [
        "Vì đoàn kết là yếu tố quan trọng quyết định sự vững mạnh hay tan rã của một tập thể. Khi mọi người biết đoàn kết, yêu thương và hỗ trợ nhau thì tập thể sẽ phát triển bền vững và đạt được mục tiêu chung.",
        "Vì đoàn kết là yếu tố quan trọng quyết định sự thành bại của một tập thể. Khi mọi người biết đoàn kết, yêu thương và hỗ trợ nhau thì tập thể sẽ phát triển bền vững và đạt được mục tiêu chung.",
        "Vì đoàn kết là yếu tố quan trọng quyết định sự vững mạnh hay tan rã của một tập thể. Khi mọi người biết đoàn kết, hòa ái và hỗ trợ nhau thì tập thể sẽ phát triển bền vững và đạt được mục tiêu chung.",
        "Vì đoàn kết là yếu tố quan trọng quyết định sự vững mạnh hay tan rã của một tập thể. Khi mọi người biết đoàn kết, yêu thương và giúp đỡ nhau thì tập thể sẽ phát triển lớn mạnh và đạt được mục tiêu chung."
      ],
      "correctIndex": 0,
      "explanation": "Vì đoàn kết là yếu tố quan trọng quyết định sự vững mạnh hay tan rã của một tập thể. Khi mọi người biết đoàn kết, yêu thương và hỗ trợ nhau thì tập thể sẽ phát triển bền vững và đạt được mục tiêu chung.",
      "sourceQuestion": "Câu 3. Cho biết tại sao tình đoàn kết được đề cập đến trước nhất trong một đoàn thể?",
      "id": "lam-2-c03-01"
    },
    {
      "type": "multiple",
      "question": "Muốn xây dựng tình đoàn kết trong môn phái, môn sinh Phật Quang Quyền phải làm gì?",
      "options": [
        "Loại bỏ thành kiến cá nhân và lòng ích kỷ.",
        "Biết bỏ qua tự ái, thù hằn và mâu thuẫn.",
        "Khi có hiểu lầm, phải chân thành trao đổi và giải quyết trong tinh thần xây dựng, hoan hỷ.",
        "Loại bỏ định kiến cá nhân và lòng ích kỷ.",
        "Biết bỏ qua tự ái, oán hận và mâu thuẫn.",
        "Khi có hiểu lầm, phải thẳng thắn trao đổi và giải quyết trong tinh thần xây dựng, hoan hỷ.",
        "Khi có hiểu lầm, phải chân thành trao đổi và giải quyết trong tinh thần xây dựng, hòa ái."
      ],
      "correctIndices": [0, 1, 2],
      "explanation": "Loại bỏ thành kiến cá nhân và lòng ích kỷ. Biết bỏ qua tự ái, thù hằn và mâu thuẫn. Khi có hiểu lầm, phải chân thành trao đổi và giải quyết trong tinh thần xây dựng, hoan hỷ.",
      "sourceQuestion": "Câu 4. Muốn xây dựng tình đoàn kết trong môn phái, Môn sinh PQQ phải làm gì?",
      "id": "lam-2-c04-01"
    },
    {
      "type": "fill",
      "question": "Kỷ luật môn phái Phật Quang Quyền là kỷ luật ______[1], đoàn kết, yêu thương, tôn trọng và tin cậy lẫn nhau. Người trên phải làm gương cho người dưới noi theo; ______[2].",
      "blanks": [
        "tự giác, dựa trên tinh thần tự nguyện",
        "người dưới phải tự giác chấp hành"
      ],
      "options": [
        "nghiêm minh, dựa trên tinh thần tự nguyện",
        "tự giác, dựa trên tinh thần tự chủ",
        "tự giác, dựa trên tinh thần dân chủ",
        "người dưới phải nghiêm chỉnh chấp hành",
        "người dưới phải tự nguyện chấp hành",
        "học viên phải tự giác chấp hành"
      ],
      "explanation": "Kỷ luật môn phái Phật Quang Quyền là kỷ luật tự giác, dựa trên tinh thần tự nguyện, đoàn kết, yêu thương, tôn trọng và tin cậy lẫn nhau. Người trên phải làm gương cho người dưới noi theo; người dưới phải tự giác chấp hành.",
      "sourceQuestion": "Câu 5. Cho biết kỷ luật môn phái PQQ là gì?",
      "id": "lam-2-c05-01"
    },
    {
      "type": "single",
      "question": "Cho biết thế nào là anh hùng cá nhân chủ nghĩa?",
      "options": [
        "Anh hùng cá nhân chủ nghĩa là người tuy có tài năng nhưng sống ích kỷ, đặt lợi ích cá nhân lên trên tập thể, thiếu tinh thần kỷ luật, không chịu tuân theo tổ chức và thường hành động theo ý riêng.",
        "Anh hùng cá nhân chủ nghĩa là người tuy có tài năng nhưng sống ích kỷ, đặt lợi ích cá nhân lên trên tập thể, thiếu tinh thần trách nhiệm, không chịu tuân theo tổ chức và thường hành động theo ý riêng.",
        "Anh hùng cá nhân chủ nghĩa là người tuy có tài năng nhưng sống ích kỷ, đặt lợi ích cá nhân lên trên tập thể, thiếu tinh thần kỷ luật, không chịu tuân theo quy định và thường hành động theo ý riêng.",
        "Anh hùng cá nhân chủ nghĩa là người tuy có bản lĩnh nhưng sống ích kỷ, đặt lợi ích cá nhân lên trên tập thể, thiếu tinh thần kỷ luật, không chịu tuân theo tổ chức và thường hành động theo ý riêng."
      ],
      "correctIndex": 0,
      "explanation": "Anh hùng cá nhân chủ nghĩa là người tuy có tài năng nhưng sống ích kỷ, đặt lợi ích cá nhân lên trên tập thể, thiếu tinh thần kỷ luật, không chịu tuân theo tổ chức và thường hành động theo ý riêng.",
      "sourceQuestion": "Câu 6. Cho biết thế nào là anh hùng cá nhân chủ nghĩa?",
      "id": "lam-2-c06-01"
    },
    {
      "type": "fill",
      "question": "Hoàn thành nhận định về danh dự: Danh dự của võ sĩ không chỉ là danh dự cá nhân mà còn là danh dự của tập thể và môn phái. Người võ sĩ phải sống hiên ngang, cao thượng, biết ______[1], bênh vực lẽ phải và đặt võ đạo lên trên ______[2].",
      "blanks": [
        "bảo vệ người yếu",
        "lòng tự ái cá nhân"
      ],
      "options": [
        "bảo vệ người nghèo",
        "bảo vệ người vô tội",
        "giúp đỡ người yếu",
        "lòng tự tôn cá nhân",
        "lợi ích của cá nhân",
        "lòng tự hào cá nhân"
      ],
      "explanation": "Danh dự của võ sĩ không chỉ là danh dự cá nhân mà còn là danh dự của tập thể và môn phái. Người võ sĩ phải sống hiên ngang, cao thượng, biết bảo vệ người yếu, bênh vực lẽ phải và đặt võ đạo lên trên lòng tự ái cá nhân.",
      "sourceQuestion": "Câu 7. Cho biết danh dự của Võ sĩ là gì?",
      "id": "lam-2-c07-01"
    },
    {
      "type": "truefalse",
      "question": "Nhận định: Theo quan điểm rèn luyện võ thuật của môn sinh PQQ, tập luyện võ giúp tăng cường sức khỏe, vì vậy người học võ chỉ cần chú trọng rèn luyện thể chất để tự vệ là đủ. Đúng hay sai?",
      "options": ["Đúng", "Sai"],
      "correctIndex": 1,
      "explanation": "Không chỉ dừng lại ở việc có sức khỏe mà người luyện võ cần phải dùng sức khỏe đó để phụng sự, và đem lại lợi ích cho cuộc đời này.",
      "sourceQuestion": "Câu 8. Quan điểm rèn luyện võ thuật của môn sinh PQQ như thế nào?",
      "id": "lam-2-c08-01"
    },
    {
      "type": "single",
      "question": "Môn sinh PQQ phải rèn luyện kỹ năng chiến đấu và chiến thắng đến mức độ như thế nào?",
      "options": [
        "Môn sinh PQQ phải rèn luyện kỹ năng chiến đấu và chiến thắng đến mức độ tinh xảo nhưng thẳm sâu trong tâm hồn yêu thích sự nhường nhịn thứ tha.",
        "Môn sinh PQQ phải rèn luyện kỹ năng chiến đấu và chiến thắng đến mức độ tinh thông nhưng thẳm sâu trong tâm hồn yêu thích sự nhường nhịn thứ tha.",
        "Môn sinh PQQ phải rèn luyện kỹ năng chiến đấu và chiến thắng đến mức độ tinh xảo nhưng thẳm sâu trong tâm hồn yêu thích sự hòa bình thứ tha.",
        "Môn sinh PQQ phải rèn luyện kỹ năng phòng thủ và chiến thắng đến mức độ tinh xảo nhưng thẳm sâu trong tâm hồn yêu thích sự nhường nhịn thứ tha."
      ],
      "correctIndex": 0,
      "explanation": "Môn sinh PQQ phải rèn luyện kỹ năng chiến đấu và chiến thắng đến mức độ tinh xảo nhưng thẳm sâu trong tâm hồn yêu thích sự nhường nhịn thứ tha.",
      "sourceQuestion": "Câu 9. Môn sinh PQQ phải rèn luyện kỹ năng chiến đấu và chiến thắng đên mức độ như thế nào?",
      "id": "lam-2-c09-01"
    },
    {
      "type": "multiple",
      "question": "Các màu đai và ý nghĩa của chúng trong môn phái Phật Quang Quyền được quy định như thế nào?",
      "options": [
        "Nâu: Tượng trưng cho màu áo nâu của Phật giáo Việt Nam, biểu hiện sự giản dị, bền bỉ, khiêm cung.",
        "Xanh Lam (Thủy): Tượng trưng cho sự mềm mại, khiêm tốn và thích nghi, nhắc nhở biết nhẫn nhịn.",
        "Xanh Lục (Mộc): Tượng trưng cho sự sinh trưởng và phát triển, nhắc nhở không ngừng tiến bộ.",
        "Đỏ (Hỏa): Tượng trưng cho nhiệt huyết, ý chí và lòng dũng cảm.",
        "Vàng (Thổ): Tượng trưng cho sự vững chắc và bao dung.",
        "Trắng (Kim): Tượng trưng cho sự trong sáng, chính trực và bản lĩnh.",
        "Nâu: Tượng trưng cho màu đất của Phật giáo Việt Nam, biểu hiện sự giản dị, bền bỉ, khiêm cung.",
        "Xanh Lam (Thủy): Tượng trưng cho sự mềm mại, khiêm tốn và thích nghi, nhắc nhở biết lắng nghe.",
        "Xanh Lục (Mộc): Tượng trưng cho sự sinh trưởng và tươi mới, nhắc nhở không ngừng tiến bộ.",
        "Đỏ (Hỏa): Tượng trưng cho nhiệt huyết, sức mạnh và lòng dũng cảm.",
        "Vàng (Thổ): Tượng trưng cho sự vững chãi và bao dung.",
        "Trắng (Kim): Tượng trưng cho sự thanh khiết, chính trực và bản lĩnh."
      ],
      "correctIndices": [0, 1, 2, 3, 4, 5],
      "explanation": "Nâu: giản dị, bền bỉ, khiêm cung. Lam: mềm mại, khiêm tốn, thích nghi. Lục: sinh trưởng và phát triển. Đỏ: nhiệt huyết, ý chí, dũng cảm. Vàng: vững chắc, bao dung. Trắng: trong sáng, chính trực, bản lĩnh.",
      "sourceQuestion": "Câu 11. Môn phái Phật Quang Quyền (PQQ) có mấy màu đai? Ý nghĩa ra sao?",
      "id": "lam-2-c11-01"
    },
    {
      "type": "multiple",
      "question": "Quy định về trang phục (võ phục) của môn phái Phật Quang Quyền được áp dụng cho các chức sắc và thành viên như thế nào?",
      "options": [
        "Chưởng môn Sáng Tổ: Võ phục màu vàng đất.",
        "Chưởng môn, Phó Chưởng môn: Võ phục nâu đen, cổ áo màu vàng.",
        "Các thành viên khác: Võ phục nâu đen.",
        "Chưởng môn Sáng Tổ: Võ phục màu nâu đất.",
        "Chưởng môn, Phó Chưởng môn: Võ phục màu nâu, cổ áo màu vàng.",
        "Chưởng môn, Phó Chưởng môn: Võ phục nâu đen, cổ áo màu đỏ.",
        "Các thành viên khác: Võ phục màu nâu."
      ],
      "correctIndices": [0, 1, 2],
      "explanation": "Chưởng môn Sáng Tổ: Võ phục màu vàng đất. Chưởng môn, Phó Chưởng môn: Võ phục nâu đen, cổ áo màu vàng. Các thành viên khác: Võ phục nâu đen.",
      "sourceQuestion": "Câu 12. Các quy định về trang phục môn phái Phật Quang Quyền.?",
      "id": "lam-2-c12-01"
    },
    {
      "type": "single",
      "question": "Bậc Sơ đẳng trong hệ thống cấp đai của môn phái Phật Quang Quyền được quy định như thế nào?",
      "options": [
        "Bậc Sơ đẳng từ cấp 1 đến cấp 8, bao gồm Lam đai (đai nâu viền xanh lam, có 4 vạch xanh lá) và Lục đai (đai nâu viền xanh lục, có 4 vạch đỏ), danh xưng là Võ sinh.",
        "Bậc Sơ đẳng từ cấp 1 đến cấp 8, bao gồm Lam đai (đai nâu viền xanh lam, có 4 vạch vàng) và Lục đai (đai nâu viền xanh lục, có 4 vạch đỏ), danh xưng là Võ sinh.",
        "Bậc Sơ đẳng từ cấp 1 đến cấp 8, bao gồm Lam đai (đai nâu viền xanh lam, có 4 vạch xanh lá) và Lục đai (đai nâu viền xanh lục, có 4 vạch đỏ), danh xưng là Môn sinh.",
        "Bậc Sơ đẳng từ cấp 1 đến cấp 8, bao gồm Lam đai (đai nâu viền xanh lục, có 4 vạch xanh lá) và Lục đai (đai nâu viền xanh lam, có 4 vạch đỏ), danh xưng là Võ sinh."
      ],
      "correctIndex": 0,
      "explanation": "Bậc Sơ đẳng: Cấp 1 đến cấp 8. Lam đai: đai nâu viền xanh lam, có 4 vạch xanh lá. Lục đai: đai nâu viền xanh lục, có 4 vạch đỏ. Danh xưng: Võ sinh.",
      "sourceQuestion": "Câu 13. Hệ thống cấp đai của môn phái Phật Quang Quyền như thế nào?",
      "id": "lam-2-c13-01"
    },
    {
      "type": "multiple",
      "question": "Những ý nghĩa nào dưới đây mô tả đúng về biểu tượng môn phái Phật Quang Quyền?",
      "options": [
        "Tượng trưng cho bánh xe Chuyển Pháp Luân của Phật giáo.",
        "Nền màu vàng đất biểu trưng cho sự cao quý, thanh tịnh và tinh thần Phật giáo.",
        "Bên trong có 8 hình elip liên kết thành bông hoa 8 cánh với 4 màu: Xanh Lam, Xanh Lục, Đỏ, Vàng.",
        "Tám hình elip tượng trưng cho Bát Chánh Đạo.",
        "Tượng trưng cho bánh xe Pháp Luân Thường Chuyển của Phật giáo.",
        "Nền màu vàng đất biểu trưng cho sự thanh cao, thanh tịnh và tinh thần Phật giáo.",
        "Bên trong có 8 hình elip liên kết thành bông hoa 8 cánh với 4 màu: Xanh Lam, Xanh Lục, Đỏ, Trắng.",
        "Tám hình elip tượng trưng cho Bát Bộ Kim Cang."
      ],
      "correctIndices": [0, 1, 2, 3],
      "explanation": "Biểu tượng môn phái là hình tròn, tượng trưng cho bánh xe Chuyển Pháp Luân của Phật giáo. Nền màu vàng đất biểu trưng cho sự cao quý, thanh tịnh và tinh thần Phật giáo. Bên trong có 8 hình elip liên kết thành bông hoa 8 cánh với 4 màu: Xanh Lam, Xanh Lục, Đỏ, Vàng... Tám hình elip còn tượng trưng cho Bát Chánh Đạo...",
      "sourceQuestion": "Câu 14. Ý nghĩa biểu tượng môn phái Phật Quang Quyền?",
      "id": "lam-2-c14-01"
    }
  ]
};

data.questions.forEach((q, index) => {
  q.lessonId = data.lessonId;
  q.rankId = data.rankId;
  q.beltId = data.beltId;
  q.number = index + 1;
});

fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Saved to', path);
