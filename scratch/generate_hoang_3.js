const fs = require('fs');
const path = '/Users/luanph/Project other/MARTIAL WAY THEORY/content/exam-bank/hoang-3.json';

const data = {
  "rankId": "hoang-3",
  "beltId": "yellow",
  "lessonId": "yellow-lesson-03",
  "questions": [
    {
      "type": "single",
      "question": "Khái niệm về Võ cổ truyền Việt Nam là gì?",
      "options": [
        "Võ cổ truyền Việt Nam là hệ thống các môn phái võ được lưu truyền qua nhiều thế hệ trong suốt chiều dài lịch sử dân tộc. Võ cổ truyền được hình thành và phát triển từ nhu cầu bảo vệ con người trước thú dữ, bảo vệ làng xóm và chống giặc ngoại xâm.",
        "Võ cổ truyền Việt Nam là hệ thống các môn thể thao thi đấu được lưu truyền qua nhiều thế hệ. Võ cổ truyền được hình thành và phát triển từ nhu cầu biểu diễn nghệ thuật, tranh tài cao thấp và giao lưu văn hóa với các nước láng giềng.",
        "Võ cổ truyền Việt Nam là hệ thống các môn phái võ được du nhập từ Trung Hoa và Ấn Độ. Võ cổ truyền được hình thành và phát triển từ nhu cầu tập dưỡng sinh của các bậc vua chúa, quý tộc và chống lại bệnh tật.",
        "Võ cổ truyền Việt Nam là hệ thống các đòn thế quân sự được đúc kết từ các cuộc chiến tranh hiện đại. Võ cổ truyền được hình thành và phát triển từ nhu cầu rèn luyện bộ đội, bảo vệ biên giới và chống khủng bố."
      ],
      "correctIndex": 0,
      "explanation": "Võ cổ truyền Việt Nam là hệ thống các môn phái võ được lưu truyền qua nhiều thế hệ trong suốt chiều dài lịch sử dân tộc Việt Nam... võ cổ truyền được hình thành và phát triển từ nhu cầu bảo vệ con người trước thú dữ, bảo vệ làng xóm và chống giặc ngoại xâm.",
      "sourceQuestion": "Câu 1. Võ cổ truyền Việt Nam là gì?",
      "id": "hoang-3-c01-01"
    },
    {
      "type": "single",
      "question": "Lịch sử phát triển Võ cổ truyền Việt Nam diễn ra như thế nào?",
      "options": [
        "Võ cổ truyền hình thành từ quá trình lao động, đấu tranh sinh tồn, dựng nước và giữ nước. Đến cuối thế kỷ XIX và đầu thế kỷ XX, võ cổ truyền trải qua nhiều khó khăn, có lúc bị hạn chế hoạt động. Nhờ sự nỗ lực của các võ sư và Liên đoàn Võ thuật Cổ truyền Việt Nam, võ đã được bảo tồn.",
        "Võ cổ truyền hình thành từ quá trình giao thương, buôn bán với các nước phương Tây. Đến cuối thế kỷ XIX và đầu thế kỷ XX, võ cổ truyền trải qua thời kỳ hoàng kim, trở thành môn thể thao bắt buộc. Nhờ sự nỗ lực của các võ sư, võ đã được xuất khẩu ra toàn thế giới.",
        "Võ cổ truyền hình thành từ quá trình thi cử, tuyển chọn quan lại của các triều đại phong kiến. Đến cuối thế kỷ XIX và đầu thế kỷ XX, võ cổ truyền bị thay thế hoàn toàn bởi súng đạn. Nhờ sự nỗ lực của các học giả, võ đã được phục dựng qua sách vở.",
        "Võ cổ truyền hình thành từ quá trình biểu diễn trong các lễ hội làng xã, đình miếu. Đến cuối thế kỷ XIX và đầu thế kỷ XX, võ cổ truyền phân hóa thành nhiều môn phái mâu thuẫn nhau. Nhờ sự nỗ lực của chính quyền thuộc địa, võ đã được thống nhất."
      ],
      "correctIndex": 0,
      "explanation": "Võ cổ truyền Việt Nam hình thành từ quá trình lao động, đấu tranh sinh tồn, dựng nước và giữ nước... Đến cuối thế kỷ XIX và đầu thế kỷ XX, võ cổ truyền trải qua nhiều khó khăn, có lúc bị hạn chế hoạt động... Nhờ sự nỗ lực... Liên đoàn Võ thuật Cổ truyền Việt Nam, võ cổ truyền đã được bảo tồn...",
      "sourceQuestion": "Câu 2. Nêu lịch sử phát triển Võ cổ truyền Việt Nam.",
      "id": "hoang-3-c02-01"
    },
    {
      "type": "multiple",
      "question": "Đặc điểm nổi bật của Võ cổ truyền Việt Nam là gì?",
      "options": [
        "Hình thành từ nhu cầu bảo vệ con người, làng xóm và cuộc sống trước thú dữ và các hiểm họa.",
        "Mang tính võ trận, gắn liền với lịch sử dựng nước và giữ nước của dân tộc.",
        "Có tính thực chiến cao, kỹ thuật linh hoạt và khả năng ứng dụng thực tế hiệu quả.",
        "Các bài quyền thường có lời thiệu bằng thơ để diễn tả ý nghĩa, kỹ thuật và tinh thần của bài võ.",
        "Hình thành từ nhu cầu thi đấu thể thao chuyên nghiệp và giành huy chương quốc tế.",
        "Mang tính biểu diễn nghệ thuật, gắn liền với các sân khấu tạp kỹ và điện ảnh.",
        "Có tính quy phạm cao, kỹ thuật cứng nhắc và khả năng thi đấu trên thảm đấu hiệu quả.",
        "Các bài quyền thường có lời hát bằng nhạc hiện đại để diễn tả ý nghĩa và tinh thần của bài võ."
      ],
      "correctIndices": [0, 1, 2, 3],
      "explanation": "Có 4 đặc điểm nổi bật: Hình thành từ nhu cầu bảo vệ con người, mang tính võ trận, có tính thực chiến cao, các bài quyền thường có lời thiệu bằng thơ.",
      "sourceQuestion": "Câu 3. Nêu đặc điểm Võ cổ truyền Việt Nam.",
      "id": "hoang-3-c03-01"
    },
    {
      "type": "single",
      "question": "Võ đường là gì và tại sao cần thành lập võ đường?",
      "options": [
        "Võ đường là nơi chuyên dùng để giảng dạy, huấn luyện và phát triển võ thuật. Việc thành lập võ đường nhằm đáp ứng nhu cầu học tập võ thuật của quần chúng, phát triển môn phái, đồng thời góp phần bảo tồn và phát huy Võ cổ truyền Việt Nam.",
        "Võ đường là nơi chuyên dùng để tổ chức các giải đấu, cá cược và tranh ngôi bá chủ võ lâm. Việc thành lập võ đường nhằm đáp ứng nhu cầu giải trí của quần chúng, phô trương thanh thế môn phái, đồng thời góp phần thu lợi nhuận.",
        "Võ đường là nơi chuyên dùng để chứa vũ khí, binh khí và các bí kíp võ công. Việc thành lập võ đường nhằm đáp ứng nhu cầu bảo vệ bí mật của môn phái, huấn luyện đội quân riêng, đồng thời góp phần chuẩn bị cho chiến tranh.",
        "Võ đường là nơi chuyên dùng để thờ cúng tổ sư, thần linh và tiến hành các nghi lễ tôn giáo. Việc thành lập võ đường nhằm đáp ứng nhu cầu tâm linh của quần chúng, phát triển đạo giáo, đồng thời góp phần bảo tồn các di sản phi vật thể."
      ],
      "correctIndex": 0,
      "explanation": "Võ đường là nơi chuyên dùng để giảng dạy, huấn luyện và phát triển võ thuật. Việc thành lập võ đường nhằm đáp ứng nhu cầu học tập võ thuật của quần chúng, phát triển môn phái, đồng thời góp phần bảo tồn và phát huy Võ cổ truyền Việt Nam.",
      "sourceQuestion": "Câu 4. Võ đường là gì và tại sao cần thành lập võ đường?",
      "id": "hoang-3-c04-01"
    },
    {
      "type": "multiple",
      "question": "Khi thành lập võ đường cần nghiên cứu những vấn đề chính nào?",
      "options": [
        "Bối cảnh sinh hoạt của địa phương.",
        "Đặc điểm dân cư, kinh tế, văn hóa và nhu cầu học võ của người dân.",
        "Địa điểm dự kiến thành lập võ đường.",
        "Thu nhập của huấn luyện viên.",
        "Đối thủ cạnh tranh, các võ đường môn phái khác và thủ đoạn của họ.",
        "Mức đóng học phí của các học viên.",
        "Trang phục thi đấu của võ đường."
      ],
      "correctIndices": [0, 1, 2],
      "explanation": "Cần nghiên cứu ba vấn đề chính: Bối cảnh sinh hoạt của địa phương; Đặc điểm dân cư, kinh tế, văn hóa và nhu cầu học võ; Địa điểm dự kiến thành lập.",
      "sourceQuestion": "Câu 5. Khi thành lập võ đường cần nghiên cứu những vấn đề gì?",
      "id": "hoang-3-c05-01"
    },
    {
      "type": "single",
      "question": "Một địa điểm như thế nào thích hợp để thành lập võ đường?",
      "options": [
        "Một địa điểm thích hợp cần bảo đảm các điều kiện: an ninh tốt, giao thông thuận tiện, cao ráo thoáng khí, có điện nước đầy đủ và yên tĩnh cho việc giảng dạy, tập luyện. Nên tránh những nơi ngõ hẻm chật hẹp, mất an toàn, ẩm thấp hoặc ô nhiễm.",
        "Một địa điểm thích hợp cần bảo đảm các điều kiện: ở trung tâm thương mại, sầm uất ồn ào, có nhiều hàng quán và đông đúc cho việc quảng bá, thu hút học viên. Nên tránh những nơi ngoại ô xa xôi, yên tĩnh, ít người qua lại hoặc trong khuôn viên trường học.",
        "Một địa điểm thích hợp cần bảo đảm các điều kiện: kín đáo, khó tìm, cách âm tốt, có hệ thống cửa sắt kiên cố và bí mật cho việc giảng dạy các đòn thế hiểm độc. Nên tránh những nơi mặt tiền đường lớn, đông đúc, công khai hoặc gần các cơ quan chính quyền.",
        "Một địa điểm thích hợp cần bảo đảm các điều kiện: rộng lớn mênh mông, gần rừng núi, có suối nước tự nhiên và hoang sơ cho việc giảng dạy, tập luyện nội công. Nên tránh những nơi thành phố chật hẹp, tiện nghi, có đèn điện hoặc môi trường sống hiện đại."
      ],
      "correctIndex": 0,
      "explanation": "Một địa điểm thích hợp cần bảo đảm các điều kiện: an ninh tốt, giao thông thuận tiện, cao ráo thoáng khí, có điện nước đầy đủ và yên tĩnh... tránh những nơi ngõ hẻm chật hẹp, mất an toàn, ẩm thấp hoặc ô nhiễm...",
      "sourceQuestion": "Câu 6. Một địa điểm như thế nào thích hợp để thành lập võ đường?",
      "id": "hoang-3-c06-01"
    },
    {
      "type": "multiple",
      "question": "Tứ Diệu Đế bao gồm những gì?",
      "options": [
        "Khổ Đế: sự thật cuộc đời là đau khổ.",
        "Tập Đế: nguyên nhân của đau khổ (“Ái”).",
        "Diệt Đế: trạng thái chấm dứt đau khổ (Niết Bàn).",
        "Đạo Đế: con đường tu tập chấm dứt đau khổ (Bát Chánh Đạo).",
        "Sắc Đế: sự thật về thân thể con người là vô thường.",
        "Thọ Đế: cảm giác vui buồn của con người trong cuộc sống.",
        "Vô Minh Đế: trạng thái thiếu hiểu biết của chúng sinh.",
        "Thiền Đế: con đường ngồi thiền để đắc đạo thành Phật."
      ],
      "correctIndices": [0, 1, 2, 3],
      "explanation": "Tứ Diệu Đế bao gồm: Khổ, Tập, Diệt và Đạo Đế.",
      "sourceQuestion": "Câu 7. Tứ Diệu Đế bao gồm những gì ? Giải thích ngắn gọn ?",
      "id": "hoang-3-c07-01"
    },
    {
      "type": "multiple",
      "question": "Bát Chánh Đạo bao gồm những chi phần nào?",
      "options": [
        "Chánh Kiến",
        "Chánh Tư Duy",
        "Chánh Ngữ",
        "Chánh Nghiệp",
        "Chánh Mạng",
        "Chánh Tinh Tấn",
        "Chánh Niệm",
        "Chánh Định",
        "Chánh Đạo",
        "Chánh Thức",
        "Chánh Quyết",
        "Chánh Tín",
        "Chánh Lễ",
        "Chánh Nghĩa",
        "Chánh Quả",
        "Chánh Tâm"
      ],
      "correctIndices": [0, 1, 2, 3, 4, 5, 6, 7],
      "explanation": "Bát Chánh Đạo gồm: Chánh Kiến, Chánh Tư Duy, Chánh Ngữ, Chánh Nghiệp, Chánh Mạng, Chánh Tinh Tấn, Chánh Niệm, Chánh Định.",
      "sourceQuestion": "Câu 8. Bát Chánh Đạo bao gồm những chi phần nào ?",
      "id": "hoang-3-c08-01"
    },
    {
      "type": "multiple",
      "question": "8 loại khổ mà Đức Phật đã giảng dạy là gì?",
      "options": [
        "Sinh",
        "Lão",
        "Bệnh",
        "Tử",
        "Cầu bất đắc",
        "Oán tắng hội",
        "Ái biệt ly",
        "Ngũ ấm xí thạnh",
        "Nghèo đói",
        "Chiến tranh",
        "Tham lam",
        "Sân hận",
        "Si mê",
        "Bất hiếu"
      ],
      "correctIndices": [0, 1, 2, 3, 4, 5, 6, 7],
      "explanation": "8 loại khổ: Sinh, Lão, Bệnh, Tử, Cầu bất đắc, Oán tắng hội, Ái biệt ly, Ngũ ấm xí thạnh.",
      "sourceQuestion": "Câu 9. 8 loại khổ mà Đức Phật đã giảng dạy là gì ?",
      "id": "hoang-3-c09-01"
    },
    {
      "type": "single",
      "question": "Luật Nhân Quả do ai tạo ra và ai phát hiện?",
      "options": [
        "Luật nhân quả là quy luật của tự nhiên, không do ai tạo ra cả. Đức Phật là người đã phát hiện và giảng dạy Luật nhân quả.",
        "Luật nhân quả là quy luật của vũ trụ, do Thượng Đế tạo ra để cai quản muôn loài. Đức Phật là người đã được Thượng Đế truyền đạt và giảng dạy Luật nhân quả.",
        "Luật nhân quả là hệ thống quy tắc xã hội, do các bậc vua chúa thời xưa tạo ra để cai trị dân chúng. Các bậc hiền triết là người đã ghi chép và giảng dạy Luật nhân quả.",
        "Luật nhân quả là quy luật của đạo Phật, do chính Đức Phật tự sáng tạo ra để giáo hóa đệ tử. Các vị bồ tát là người đã phát triển và giảng dạy Luật nhân quả."
      ],
      "correctIndex": 0,
      "explanation": "Luật nhân quả là quy luật của tự nhiên, không do ai tạo ra cả. Đức Phật là người đã phát hiện và giảng dạy Luật nhân quả.",
      "sourceQuestion": "Câu 10. Luật Nhân Quả do ai tạo ra? Ai phát hiện ?",
      "id": "hoang-3-c10-01"
    },
    {
      "type": "single",
      "question": "Giải thích ngắn gọn về Khổ Đế?",
      "options": [
        "Khổ Đế là chân lý đầu tiên trong Tứ Diệu Đế, chỉ rõ bản chất của cuộc đời là có khổ đau. Có 8 loại khổ: Sinh khổ, Lão khổ, Bệnh khổ, Tử khổ, Ái biệt ly khổ, Oán tắng hội khổ, Cầu bất đắc khổ, Ngũ ấm xí thạnh khổ (khổ do thân và tâm luôn biến động).",
        "Khổ Đế là chân lý cuối cùng trong Tứ Diệu Đế, chỉ rõ bản chất của cuộc đời là sự chịu đựng. Có 3 loại khổ: Nghèo khổ, Đói khổ, Khổ sai (khổ do làm việc vất vả).",
        "Khổ Đế là chân lý đầu tiên trong Bát Chánh Đạo, chỉ rõ bản chất của con người là mang tội lỗi. Có 5 loại khổ: Sắc khổ, Thọ khổ, Tưởng khổ, Hành khổ, Thức khổ (khổ do ngũ uẩn tạo ra).",
        "Khổ Đế là chân lý thứ hai trong Tứ Diệu Đế, chỉ rõ nguyên nhân của mọi khổ đau. Có 4 loại khổ: Tham khổ, Sân khổ, Si khổ, Mạn khổ (khổ do sự vô minh và kiêu ngạo tạo ra)."
      ],
      "correctIndex": 0,
      "explanation": "Khổ Đế là chân lý đầu tiên trong Tứ Diệu Đế, chỉ rõ bản chất của cuộc đời là có khổ đau. Có 8 loại khổ...",
      "sourceQuestion": "Câu 11. Giải thích ngắn gọn về Khổ Đế?",
      "id": "hoang-3-c11-01"
    },
    {
      "type": "single",
      "question": "Giải thích ngắn gọn về Tập Đế?",
      "options": [
        "Tập Đế là chân lý chỉ rõ nguyên nhân của đau khổ. Nguyên nhân gốc của đau khổ là vô minh. Tiến trình: Vô minh sinh ra ngã chấp, ngã chấp sinh ra ái dục, tạo nghiệp và bị cuốn vào vòng luân hồi sinh tử.",
        "Tập Đế là chân lý chỉ rõ trạng thái chấm dứt của đau khổ. Nguyên nhân gốc của đau khổ là cái nghèo. Tiến trình: Nghèo khó sinh ra trộm cắp, trộm cắp sinh ra tội lỗi, tạo ác nghiệp và bị cuốn vào vòng tù tội.",
        "Tập Đế là chân lý chỉ rõ con đường tu tập để diệt đau khổ. Nguyên nhân gốc của đau khổ là sự lười biếng. Tiến trình: Lười biếng sinh ra ngu dốt, ngu dốt sinh ra sai lầm, tạo thất bại và bị cuốn vào vòng luẩn quẩn của cuộc sống.",
        "Tập Đế là chân lý chỉ rõ hậu quả của đau khổ. Nguyên nhân gốc của đau khổ là hoàn cảnh xã hội. Tiến trình: Bất công sinh ra oán hận, oán hận sinh ra bạo lực, tạo chiến tranh và bị cuốn vào vòng thù hận truyền kiếp."
      ],
      "correctIndex": 0,
      "explanation": "Tập Đế là chân lý chỉ rõ nguyên nhân của đau khổ. Nguyên nhân gốc của đau khổ là vô minh. Tiến trình: Vô minh → Ngã chấp → Ái dục → Tạo nghiệp → Luân hồi.",
      "sourceQuestion": "Câu 12. Giải thích ngắn gọn về Tập Đế?",
      "id": "hoang-3-c12-01"
    },
    {
      "type": "single",
      "question": "Giải thích ngắn gọn về Diệt Đế?",
      "options": [
        "Diệt Đế (Niết Bàn) là chân lý chỉ trạng thái chấm dứt hoàn toàn mọi đau khổ. Khi đạt được Niết Bàn, vô minh, ngã chấp và khát ái đều được đoạn trừ, nghiệp và luân hồi sinh tử cũng chấm dứt. Niết Bàn là trạng thái vô ngã, thanh tịnh.",
        "Diệt Đế (Thiên Đường) là chân lý chỉ trạng thái hưởng thụ mọi khoái lạc. Khi đạt được Thiên Đường, con người sẽ có nhiều của cải, quyền lực và tuổi thọ vô tận, không còn phải lo nghĩ. Thiên Đường là trạng thái thỏa mãn cái ngã hoàn toàn.",
        "Diệt Đế (Cực Lạc) là chân lý chỉ trạng thái đầu thai vào các gia đình quyền quý. Khi đạt được Cực Lạc, con người sẽ được sinh ra ở nơi sung sướng, có kẻ hầu người hạ, nghiệp xấu bị xóa sạch. Cực Lạc là trạng thái được đền bù sau những đau khổ.",
        "Diệt Đế (Hư Vô) là chân lý chỉ trạng thái biến mất vĩnh viễn khỏi vũ trụ. Khi đạt được Hư Vô, thân xác tan biến thành cát bụi, linh hồn bị tiêu diệt, không còn luân hồi nhưng cũng không còn nhận thức. Hư Vô là trạng thái chết hẳn."
      ],
      "correctIndex": 0,
      "explanation": "Diệt Đế (Niết Bàn) là chân lý chỉ trạng thái chấm dứt hoàn toàn mọi đau khổ. Khi đạt được Niết Bàn, vô minh, ngã chấp và khát ái đều được đoạn trừ, nghiệp và luân hồi sinh tử cũng chấm dứt. Niết Bàn là trạng thái vô ngã hoàn toàn, thanh tịnh...",
      "sourceQuestion": "Câu 13. Giải thích ngắn gọn về Diệt Đế?",
      "id": "hoang-3-c13-01"
    },
    {
      "type": "definition",
      "question": "Theo lý thuyết, Đạo Đế là gì?",
      "sampleAnswer": "Đạo Đế là chân lý chỉ con đường tu tập đưa đến sự chấm dứt đau khổ và đạt được Niết Bàn giải thoát. Con đường đó chính là Bát Chánh Đạo.",
      "matchThreshold": 0.65,
      "explanation": "Đạo Đế là chân lý chỉ con đường tu tập đưa đến sự chấm dứt đau khổ và đạt được Niết Bàn giải thoát. Con đường đó chính là Bát Chánh Đạo.",
      "sourceQuestion": "Câu 14. Giải thích ngắn gọn về Đạo Đế? Liệt kê Bát Chánh Đạo?",
      "id": "hoang-3-c14-01"
    },
    {
      "type": "multiple",
      "question": "Lợi ích của việc tin hiểu nhân quả là gì?",
      "options": [
        "Không mê tín, tin vào những điều mơ hồ.",
        "Tránh làm điều ác, siêng năng làm điều lành.",
        "Biết ứng dụng đạo lý vào cuộc sống.",
        "Nhìn nhận sự việc và đánh giá con người một cách khách quan, công bằng, không bi quan hay oán trách.",
        "Có thể dùng phép thuật để thay đổi số phận theo ý muốn.",
        "Không cần nỗ lực làm việc vì mọi thứ đã được an bài.",
        "Biết trước tương lai để né tránh mọi khó khăn, tai nạn.",
        "Cảm thấy tự hào và kiêu hãnh vì mình có tu tập hơn người khác."
      ],
      "correctIndices": [0, 1, 2, 3],
      "explanation": "Lợi ích: Không mê tín, Tránh làm điều ác - siêng làm điều lành, Biết ứng dụng đạo lý, Nhìn nhận sự việc khách quan không bi quan oán trách.",
      "sourceQuestion": "Câu 15. Lợi ích của việc tin hiểu nhân quả?",
      "id": "hoang-3-c15-01"
    },
    {
      "type": "single",
      "question": "Ai là người sắp đặt số phận cho chúng ta?",
      "options": [
        "Chính chúng ta là người sắp đặt số phận cho mình thông qua những hành động, lời nói và ý nghĩ của bản thân. Hiểu rõ luật Nhân Quả, chúng sẽ biết tránh nhân xấu, gieo nhân lành.",
        "Thượng Đế là người sắp đặt số phận cho chúng ta thông qua những phán quyết cuối cùng. Hiểu rõ ý muốn của Thượng Đế, chúng ta sẽ biết cầu nguyện để xin ban phước và thay đổi tương lai.",
        "Tổ tiên là người sắp đặt số phận cho chúng ta thông qua phúc đức để lại từ đời trước. Hiểu rõ đạo hiếu, chúng ta sẽ biết cúng bái thường xuyên để mong tổ tiên phù hộ, gieo những mầm mống tốt.",
        "Hoàn cảnh xã hội là người sắp đặt số phận cho chúng ta thông qua sự phân hóa giàu nghèo. Hiểu rõ thực tế, chúng ta sẽ biết chấp nhận số phận, gieo những hy vọng viển vông vào kiếp sau."
      ],
      "correctIndex": 0,
      "explanation": "Chính chúng ta là người sắp đặt số phận cho mình thông qua những hành động, lời nói và ý nghĩ của bản thân. Hiểu rõ luật Nhân Quả, chúng ta sẽ biết tránh những nhân xấu, gieo những nhân lành...",
      "sourceQuestion": "Câu 16. Ai là người sắp đặt số phận cho chúng ta?",
      "id": "hoang-3-c16-01"
    },
    {
      "type": "single",
      "question": "Khái niệm Vô Ngã trong Đạo Phật là gì?",
      "options": [
        "Vô Ngã là trạng thái không còn vị kỷ, chỉ biết nghĩ cho riêng mình, mà sống với tâm vị tha và lòng từ bi rộng lớn. Vô Ngã không phải là hư vô hay mất đi bản thân, mà là sự giác ngộ, đạo đức phát triển cao nhất. Người đạt Vô Ngã không còn chấp ngã, chấp công.",
        "Vô Ngã là trạng thái hoàn toàn trống rỗng, vô thức như cỏ cây mộc thạch, không còn cảm xúc vui buồn, yêu ghét. Vô Ngã là sự diệt trừ mọi nhận thức, trở nên ngu muội. Người đạt Vô Ngã sống như một cỗ máy vô hồn, không có bất kỳ phản ứng nào với thế giới.",
        "Vô Ngã là trạng thái hợp nhất với thần linh, mất đi hình hài cá nhân để tan vào ánh sáng của Đấng Sáng Tạo. Vô Ngã không phải là sống vị tha, mà là sự từ bỏ trần gian. Người đạt Vô Ngã sẽ bay lên trời, xa lánh loài người, không màng danh lợi.",
        "Vô Ngã là trạng thái quên hết mọi ký ức trong quá khứ, không biết mình là ai, đến từ đâu và sẽ đi về đâu. Vô Ngã là sự mất trí nhớ hoàn toàn, trở nên điên loạn. Người đạt Vô Ngã sống lang thang, không quan tâm đến gia đình, xã hội hay đạo đức."
      ],
      "correctIndex": 0,
      "explanation": "Vô Ngã là trạng thái không còn vị kỷ... sống với tâm vị tha và lòng từ bi rộng lớn. Vô Ngã không phải là hư vô hay mất đi bản thân, mà là sự giác ngộ, sáng suốt và đạo đức được phát triển đến mức cao nhất...",
      "sourceQuestion": "Câu 17. Nêu khái niệm Vô Ngã?",
      "id": "hoang-3-c17-01"
    },
    {
      "type": "single",
      "question": "Thế nào là mục tiêu Vô Ngã của Đạo Phật?",
      "options": [
        "Thân tâm chúng sinh do năm uẩn (sắc, thọ, tưởng, hành, thức) hợp thành. Vì chấp năm uẩn là “Ta” nên sinh ra tham ái, ích kỷ. Chỉ có tu tập đạt đến Vô Ngã mới chấm dứt hoàn toàn đau khổ. Chỉ có đạo Phật mới có mục tiêu Vô Ngã. Không hướng về Vô Ngã thì sẽ lạc vào ngoại đạo.",
        "Thân tâm chúng sinh do tứ đại (đất, nước, gió, lửa) hợp thành. Vì chấp tứ đại là của mình nên sinh ra bám víu thân xác. Chỉ có tu tập kéo dài tuổi thọ mới chấm dứt hoàn toàn đau khổ. Mọi tôn giáo đều có mục tiêu Vô Ngã. Không hướng về Vô Ngã thì sẽ bị đọa địa ngục.",
        "Thân tâm chúng sinh do linh hồn và thể xác hợp thành. Vì chấp linh hồn là bất tử nên sinh ra sợ hãi cái chết. Chỉ có tu tập luyện bùa chú mới chấm dứt hoàn toàn đau khổ. Chỉ có đạo Phật mới hứa hẹn Thiên Đường. Không hướng về Vô Ngã thì sẽ lạc vào cõi ma quỷ.",
        "Thân tâm chúng sinh do nghiệp báo tiền kiếp hợp thành. Vì chấp nghiệp báo là định mệnh nên sinh ra buông xuôi, lười biếng. Chỉ có tu tập cầu tài lộc mới chấm dứt hoàn toàn đau khổ. Chỉ có đạo Phật mới có thần linh phù hộ. Không hướng về Vô Ngã thì sẽ nghèo đói mãi mãi."
      ],
      "correctIndex": 0,
      "explanation": "Thân tâm chúng sinh do năm uẩn... hợp thành. Vì chấp năm uẩn là “Ta” nên sinh ra tham ái, ích kỷ... chỉ có tu tập đạt đến Vô Ngã, chứng được A La Hán mới chấm dứt hoàn toàn đau khổ. Chỉ có đạo Phật mới có mục tiêu Vô Ngã...",
      "sourceQuestion": "Câu 18. Thế nào là mục tiêu Vô Ngã của Đạo Phật?",
      "id": "hoang-3-c18-01"
    },
    {
      "type": "single",
      "question": "Tu tập như thế nào để đạt được Vô Ngã?",
      "options": [
        "Tu tập để đạt được Vô Ngã chính là thực hành Bát Chánh Đạo. Cần kết hợp song song hai yếu tố: Đạo đức (Sống vị tha, yêu thương, phụng sự) và Thiền định (đạt được Chánh định sâu sắc để phá trừ ngã chấp). Chỉ khi đạo đức và thiền định cùng phát triển mới tiến dần đến Vô Ngã.",
        "Tu tập để đạt được Vô Ngã chính là thực hành Tứ Diệu Đế. Cần kết hợp song song hai yếu tố: Trí tuệ (Học thuộc lòng kinh điển) và Khổ hạnh (nhịn ăn, ép xác để phá trừ nhục dục). Chỉ khi trí tuệ và khổ hạnh cùng phát triển mới ép cơ thể đến mức Vô Ngã.",
        "Tu tập để đạt được Vô Ngã chính là thực hành Lục Độ Ba La Mật. Cần kết hợp song song hai yếu tố: Bố thí (Đóng góp tiền bạc xây chùa) và Niệm chú (tụng kinh gõ mõ cả ngày để phá trừ tà ma). Chỉ khi bố thí và niệm chú cùng phát triển mới mua chuộc được trạng thái Vô Ngã.",
        "Tu tập để đạt được Vô Ngã chính là thực hành Nhân Quả. Cần kết hợp song song hai yếu tố: Võ thuật (Rèn luyện gân cốt mạnh mẽ) và Khí công (Vận khí đả thông kinh mạch để phá trừ bệnh tật). Chỉ khi võ thuật và khí công cùng phát triển mới đánh bại được đối thủ để đạt Vô Ngã."
      ],
      "correctIndex": 0,
      "explanation": "Tu tập để đạt được Vô Ngã chính là thực hành Bát Chánh Đạo. Cần kết hợp song song hai yếu tố: Đạo đức (Sống vị tha...) và Thiền định (đạt được Chánh định sâu sắc...). Chỉ khi đạo đức và thiền định cùng phát triển, con người mới có thể tiến dần đến Vô Ngã.",
      "sourceQuestion": "Câu 19. Tu tập như thế nào để đạt được Vô Ngã?",
      "id": "hoang-3-c19-01"
    },
    {
      "type": "definition",
      "question": "Theo lý thuyết, Vị tha là gì?",
      "sampleAnswer": "Vị tha là biết quan tâm, giúp đỡ và nghĩ đến lợi ích của người khác, không chỉ lo cho riêng mình.",
      "matchThreshold": 0.65,
      "explanation": "Vị tha là biết quan tâm, giúp đỡ và nghĩ đến lợi ích của người khác, không chỉ lo cho riêng mình.",
      "sourceQuestion": "Câu 20. Hỏi: Vị tha là gì?",
      "id": "hoang-3-c20-01"
    },
    {
      "type": "single",
      "question": "Vì sao người môn sinh Phật Quang Quyền phải sống vị tha?",
      "options": [
        "Vì vị tha giúp xây dựng tình huynh đệ, tinh thần đoàn kết và tạo nên một tập thể mạnh mẽ, yêu thương nhau.",
        "Vì vị tha giúp môn sinh được huấn luyện viên chú ý, dễ dàng được cất nhắc lên làm trợ giảng và được miễn giảm học phí hàng tháng.",
        "Vì vị tha là cách để đánh bóng tên tuổi cá nhân, xây dựng hình ảnh đẹp trên mạng xã hội và thu hút nhiều người theo dõi môn phái.",
        "Vì vị tha giúp đối thủ mất cảnh giác trong thi đấu, tưởng mình yếu đuối nên dễ dàng tung đòn quyết định để giành chiến thắng."
      ],
      "correctIndex": 0,
      "explanation": "Vì vị tha giúp xây dựng tình huynh đệ, tinh thần đoàn kết và tạo nên một tập thể mạnh mẽ, yêu thương nhau.",
      "sourceQuestion": "Câu 21. Hỏi: Vì sao người môn sinh Phật Quang Quyền phải sống vị tha?",
      "id": "hoang-3-c21-01"
    },
    {
      "type": "single",
      "question": "Người môn sinh thể hiện tâm vị tha bằng cách nào?",
      "options": [
        "Bằng cách sẵn sàng giúp đỡ huynh đệ, chia sẻ khó khăn, nhường nhịn nhau và cùng nhau tiến bộ trong học tập, võ thuật và đạo đức.",
        "Bằng cách cho huynh đệ vay tiền có tính lãi, bao che những lỗi lầm vi phạm nội quy của nhau và cùng nhau trốn tập các bài tập thể lực nặng.",
        "Bằng cách tranh giành các bài tập khó để huynh đệ được nghỉ ngơi, tự mình ôm đồm mọi việc trong võ đường để chứng tỏ năng lực vượt trội.",
        "Bằng cách luôn nhường phần thắng cho đối thủ trong các giải đấu, không dám tung đòn mạnh vì sợ làm đau người khác dù bị chê cười."
      ],
      "correctIndex": 0,
      "explanation": "Bằng cách sẵn sàng giúp đỡ huynh đệ, chia sẻ khó khăn, nhường nhịn nhau và cùng nhau tiến bộ trong học tập, võ thuật và đạo đức.",
      "sourceQuestion": "Câu 22. Hỏi: Người môn sinh thể hiện tâm vị tha bằng cách nào?",
      "id": "hoang-3-c22-01"
    },
    {
      "type": "single",
      "question": "Dấu hiệu của người còn sống vị kỷ là gì?",
      "options": [
        "Chỉ nghĩ đến quyền lợi của mình, thích phần hơn về mình và ít quan tâm đến khó khăn của người khác.",
        "Luôn nhận phần thiệt thòi về mình, hay lo lắng thái quá cho sức khỏe của người khác và thường xuyên bỏ bê việc tập luyện của bản thân.",
        "Thường xuyên tặng quà cáp đắt tiền cho huấn luyện viên, thích tổ chức các buổi tiệc tùng linh đình để kết giao với những người có địa vị.",
        "Chỉ thích tập luyện một mình ở góc khuất, ghét đám đông ồn ào và luôn từ chối tham gia các hoạt động biểu diễn công cộng của võ đường."
      ],
      "correctIndex": 0,
      "explanation": "Chỉ nghĩ đến quyền lợi của mình, thích phần hơn về mình và ít quan tâm đến khó khăn của người khác.",
      "sourceQuestion": "Câu 23. Hỏi: Dấu hiệu của người còn sống vị kỷ là gì?",
      "id": "hoang-3-c23-01"
    },
    {
      "type": "single",
      "question": "Khi sinh hoạt trong tập thể, người môn sinh nên cư xử như thế nào?",
      "options": [
        "Nên nhường nhịn, hỗ trợ, động viên huynh đệ và đặt lợi ích chung lên trên lợi ích riêng.",
        "Nên thể hiện uy quyền với các môn sinh khóa sau, đòi hỏi sự phục tùng tuyệt đối và đặt lợi ích của nhóm mình lên trên lợi ích của môn phái.",
        "Nên giữ thái độ trung lập, không can thiệp vào chuyện của người khác, ai làm gì mặc ai và đặt sự an toàn cá nhân lên trên mọi mối quan hệ.",
        "Nên cạnh tranh gay gắt, dìm hàng người khác để nâng mình lên và đặt mục tiêu trở thành người giỏi nhất bằng mọi giá, kể cả chơi xấu."
      ],
      "correctIndex": 0,
      "explanation": "Nên nhường nhịn, hỗ trợ, động viên huynh đệ và đặt lợi ích chung lên trên lợi ích riêng.",
      "sourceQuestion": "Câu 24. Hỏi: Khi sinh hoạt trong tập thể, người môn sinh nên cư xử như thế nào?",
      "id": "hoang-3-c24-01"
    },
    {
      "type": "definition",
      "question": "Theo lý thuyết, lý tưởng vị tha của người môn sinh Phật Quang Quyền là gì?",
      "sampleAnswer": "Luôn sống vì mọi người, góp sức xây dựng tập thể, phụng sự cộng đồng và đem điều tốt đẹp đến cho cuộc đời.",
      "matchThreshold": 0.65,
      "explanation": "Luôn sống vì mọi người, góp sức xây dựng tập thể, phụng sự cộng đồng và đem điều tốt đẹp đến cho cuộc đời.",
      "sourceQuestion": "Câu 25. Hỏi: Lý tưởng vị tha của người môn sinh Phật Quang Quyền là gì?",
      "id": "hoang-3-c25-01"
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
