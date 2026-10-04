const fs = require('fs');
const path = '/Users/luanph/Project other/MARTIAL WAY THEORY/content/exam-bank/hoang-2.json';

const data = {
  "rankId": "hoang-2",
  "beltId": "yellow",
  "lessonId": "yellow-lesson-02",
  "questions": [
    {
      "type": "single",
      "question": "Trong võ cổ truyền, khái niệm Ngũ Hành được hiểu như thế nào?",
      "options": [
        "Ngũ Hành là học thuyết của phương Đông dùng năm yếu tố Kim, Mộc, Thủy, Hỏa, Thổ để giải thích sự vận động. Trong Võ cổ truyền, học thuyết Ngũ Hành được vận dụng để xây dựng kỹ thuật, chiến thuật và nguyên lý vận động theo quy luật sinh – khắc, hỗ trợ và chế ngự lẫn nhau.",
        "Ngũ Hành là học thuyết của phương Tây dùng năm yếu tố Đất, Nước, Gió, Lửa, Khí để giải thích sự vận động. Trong Võ cổ truyền, học thuyết Ngũ Hành được vận dụng để xây dựng các bài múa biểu diễn và nguyên lý sinh hoạt theo quy luật tự nhiên, hòa hợp với môi trường sống.",
        "Ngũ Hành là học thuyết của phương Đông dùng năm yếu tố Kim, Mộc, Thủy, Hỏa, Thổ để giải thích sự vận động. Trong Võ cổ truyền, học thuyết Ngũ Hành được vận dụng để chọn ngày giờ thi đấu, khai trương võ đường và nguyên lý phong thủy nhằm mang lại may mắn, tránh rủi ro.",
        "Ngũ Hành là học thuyết của phương Đông dùng năm yếu tố Kim, Mộc, Thủy, Hỏa, Thổ để giải thích sự vận động. Trong Võ cổ truyền, học thuyết Ngũ Hành được vận dụng để phân loại các môn sinh theo thể tạng, tính cách và nguyên lý ăn uống nhằm cân bằng dinh dưỡng, tăng cường thể lực."
      ],
      "correctIndex": 0,
      "explanation": "Ngũ Hành là học thuyết của phương Đông dùng năm yếu tố cơ bản gồm Kim, Mộc, Thủy, Hỏa, Thổ để giải thích sự vận động... Trong Võ cổ truyền, học thuyết Ngũ Hành được vận dụng để xây dựng kỹ thuật, chiến thuật và nguyên lý vận động theo quy luật sinh – khắc...",
      "sourceQuestion": "Câu 1. Võ sinh hãy trình bày khái niệm Ngũ hành với võ cổ truyền?",
      "id": "hoang-2-c01-01"
    },
    {
      "type": "single",
      "question": "Bát Quái được vận dụng vào Võ cổ truyền như thế nào?",
      "options": [
        "Trong Võ cổ truyền, Bát Quái được vận dụng vào bộ pháp, phương hướng và sự di chuyển. Người tập lấy các vị trí và hướng của Bát Quái làm cơ sở để lập tấn, chuyển bộ và biến hóa trong chiến đấu. Hai chân lấy Bát Quái làm nền tảng.",
        "Trong Võ cổ truyền, Bát Quái được vận dụng vào thủ pháp, các đòn tay và sự gạt đỡ. Người tập lấy các biểu tượng và hình vẽ của Bát Quái làm cơ sở để luyện chưởng, bẻ khóa và khống chế đối phương. Hai tay lấy Bát Quái làm nền tảng.",
        "Trong Võ cổ truyền, Bát Quái được vận dụng vào nội công, hô hấp và sự điều khí. Người tập lấy các quẻ và hào của Bát Quái làm cơ sở để hít thở, vận khí và đả thông kinh mạch trong cơ thể. Đan điền lấy Bát Quái làm nền tảng.",
        "Trong Võ cổ truyền, Bát Quái được vận dụng vào binh khí, các loại đao kiếm và sự sát thương. Người tập lấy các phương vị và góc độ của Bát Quái làm cơ sở để rèn đúc, phóng phi tiêu và bày binh bố trận. Binh khí lấy Bát Quái làm nền tảng."
      ],
      "correctIndex": 0,
      "explanation": "Trong Võ cổ truyền, Bát Quái được vận dụng vào bộ pháp, phương hướng và sự di chuyển. Người tập lấy các vị trí và hướng của Bát Quái làm cơ sở để lập tấn, chuyển bộ và biến hóa trong chiến đấu... hai chân lấy Bát Quái làm nền tảng.",
      "sourceQuestion": "Câu 2. Võ sinh hãy trình bày “KHÁI LUẬN BÁT QUÁI VỚI VÕ CỔ TRUYỀN”",
      "id": "hoang-2-c02-01"
    },
    {
      "type": "single",
      "question": "Theo quan niệm võ thuật truyền thống, ý nghĩa của bài quyền là gì?",
      "options": [
        "Quyền là linh hồn của môn phái, còn bài quyền là sự hệ thống hóa các kỹ thuật và chiêu thức chiến đấu. Bài quyền và chiến đấu có mối quan hệ mật thiết, bổ sung cho nhau. Khi diễn quyền phải thể hiện được tinh thần tập trung, sức mạnh và tính ứng dụng thực tế.",
        "Quyền là vũ khí của môn phái, còn bài quyền là sự tập hợp các động tác thể dục nhịp điệu. Bài quyền và thi đấu đối kháng không có mối quan hệ với nhau. Khi diễn quyền phải thể hiện được sự dẻo dai, nhẹ nhàng và tính nghệ thuật sân khấu.",
        "Quyền là lịch sử của môn phái, còn bài quyền là sự ghi chép lại các câu chuyện của tổ sư. Bài quyền và các bài múa lân có mối quan hệ mật thiết, bổ sung cho nhau. Khi diễn quyền phải thể hiện được sự hoài cổ, bắt chước và tính truyền thuyết dân gian.",
        "Quyền là bí mật của môn phái, còn bài quyền là sự mã hóa các huyệt đạo hiểm độc. Bài quyền và các phương thuốc chữa trị có mối quan hệ mật thiết, bổ sung cho nhau. Khi diễn quyền phải thể hiện được sự huyền bí, khó đoán và tính sát thương chí mạng."
      ],
      "correctIndex": 0,
      "explanation": "Quyền là linh hồn của môn phái, còn bài quyền là sự hệ thống hóa các kỹ thuật và chiêu thức chiến đấu. Bài quyền và chiến đấu có mối quan hệ mật thiết... Khi diễn quyền phải thể hiện được tinh thần tập trung, sự chính xác, sức mạnh, khí thế và tính ứng dụng thực tế...",
      "sourceQuestion": "Câu 3. Võ sinh hãy trình bày ý nghĩa bài Quyền:",
      "id": "hoang-2-c03-01"
    },
    {
      "type": "single",
      "question": "Muốn tập quyền đạt kết quả tốt, người tập cần phương pháp như thế nào?",
      "options": [
        "Muốn tập quyền đạt kết quả tốt, trước hết phải giữ tâm bình tĩnh, khiêm tốn, kiên trì. Cần tập từ dễ đến khó, từ chậm đến nhanh; tập thuần thục từng thế rồi mới liên kết thành bài. Khi diễn luyện phải thể hiện đúng tấn pháp, bộ pháp và kết hợp sự tập trung của nhãn pháp.",
        "Muốn tập quyền đạt kết quả tốt, trước hết phải giữ tâm hiếu thắng, tự tin, quyết liệt. Cần tập từ khó đến dễ, từ nhanh đến cực nhanh; ráp ngay toàn bài rồi mới luyện từng thế. Khi diễn luyện phải thể hiện đúng sự phô trương, uy mãnh và kết hợp sự đe dọa của nhãn pháp.",
        "Muốn tập quyền đạt kết quả tốt, trước hết phải giữ tâm hờ hững, thoải mái, tự do. Cần tập tùy hứng, không cần theo trình tự; tập qua loa từng thế rồi tự sáng tạo thành bài mới. Khi diễn luyện phải thể hiện đúng phong cách cá nhân, bay bổng và kết hợp sự lãng mạn của nhãn pháp.",
        "Muốn tập quyền đạt kết quả tốt, trước hết phải giữ tâm lo lắng, cảnh giác, căng thẳng. Cần tập dùng nhiều sức, từ nặng đến rất nặng; tập bằng cách đối luyện thực tế rồi mới thuộc bài. Khi diễn luyện phải thể hiện đúng sự chịu đòn, gan góc và kết hợp sự đau đớn của nhãn pháp."
      ],
      "correctIndex": 0,
      "explanation": "Muốn tập quyền đạt kết quả tốt, trước hết phải giữ tâm bình tĩnh, khiêm tốn, kiên trì... tập từ dễ đến khó, từ chậm đến nhanh... tập thuần thục từng thế rồi mới liên kết thành bài... thể hiện đúng tấn pháp, bộ pháp... kết hợp sự tập trung của nhãn pháp...",
      "sourceQuestion": "Câu 4. Võ sinh hãy trình bày PHƯƠNG PHÁP TẬP QUYỀN",
      "id": "hoang-2-c04-01"
    },
    {
      "type": "single",
      "question": "Thái độ của huấn luyện viên đối với võ sinh như thế nào là đúng?",
      "options": [
        "Huấn luyện viên phải yêu thương, quan tâm, tận tình chỉ dạy. Trong giảng dạy cần nghiêm túc nhưng linh hoạt, biết động viên. Tuy gần gũi nhưng phải giữ đúng tư cách và khoảng cách cần thiết giữa thầy và trò. Phải luôn tôn trọng và bảo vệ danh dự của nữ võ sinh.",
        "Huấn luyện viên phải nghiêm khắc, lạnh lùng, tuyệt đối tạo áp lực. Trong giảng dạy cần cứng nhắc và quy tắc, biết chê bai để khích tướng. Tuy quan tâm nhưng phải xóa bỏ hoàn toàn khoảng cách giữa thầy và trò để dễ bề kết thân. Phải ưu tiên và dành nhiều quyền lợi cho nữ võ sinh.",
        "Huấn luyện viên phải chiều chuộng, dễ dãi, để học viên tự do tập luyện. Trong giảng dạy cần hời hợt và qua loa, biết tâng bốc để lấy lòng. Tuy làm thầy nhưng phải phục tùng các yêu cầu của trò để duy trì sĩ số. Phải luôn tạo điều kiện cho các võ sinh nam và nữ được thoải mái đùa giỡn.",
        "Huấn luyện viên phải tính toán, sòng phẳng, tận tình khi có thù lao cao. Trong giảng dạy cần giấu nghề và thiên vị, biết mua chuộc các học viên khá giả. Tuy đứng lớp nhưng phải tạo phe cánh và chia rẽ giữa các trò. Phải luôn tìm cách hẹn hò riêng tư và lợi dụng các nữ võ sinh."
      ],
      "correctIndex": 0,
      "explanation": "Huấn luyện viên phải yêu thương, quan tâm, tận tình chỉ dạy... nghiêm túc nhưng linh hoạt, biết động viên... giữ đúng tư cách và khoảng cách cần thiết giữa thầy và trò... tôn trọng và bảo vệ danh dự của nữ võ sinh...",
      "sourceQuestion": "Câu 5. Thái độ của huấn luyện viên đối với võ sinh như thế nào?",
      "id": "hoang-2-c05-01"
    },
    {
      "type": "single",
      "question": "Người thầy dạy võ cho học trò của mình như thế nào?",
      "options": [
        "Người thầy dạy võ không chỉ truyền dạy kỹ năng chiến đấu mà còn phải giáo dục đạo đức, nhân cách và tinh thần thượng võ. Người thầy luôn nêu gương về lối sống văn minh, giữ tác phong chuẩn mực: trang phục chỉnh tề, lời nói nhã nhặn, không nói tục.",
        "Người thầy dạy võ chỉ chuyên tâm truyền dạy kỹ năng chiến đấu mà không cần quan tâm đến đạo đức, nhân cách và tinh thần thượng võ. Người thầy luôn nêu gương về lối sống tự do, giữ tác phong bụi bặm: trang phục hở hang, lời nói thô lỗ, thích dùng bạo lực.",
        "Người thầy dạy võ không chỉ truyền dạy các mánh khóe triệt hạ đối thủ mà còn phải nhồi nhét sự kiêu ngạo, hiếu thắng và tinh thần tư thù. Người thầy luôn nêu gương về lối sống giang hồ, giữ tác phong bất cần: trang phục lôi thôi, lời nói kích động, thích gây sự.",
        "Người thầy dạy võ không chỉ truyền dạy lý thuyết suông mà còn phải bắt ép học trò làm việc vặt, phục vụ cá nhân và tinh thần nô lệ. Người thầy luôn nêu gương về lối sống hạch sách, giữ tác phong quan liêu: trang phục bóng bẩy, lời nói ra lệnh, thích được phục tùng."
      ],
      "correctIndex": 0,
      "explanation": "Người thầy dạy võ không chỉ truyền dạy kỹ năng chiến đấu mà còn phải giáo dục đạo đức, nhân cách và tinh thần thượng võ... nêu gương về lối sống văn minh... tác phong chuẩn mực: trang phục chỉnh tề, lời nói nhã nhặn, cư xử lịch sự, không nói tục...",
      "sourceQuestion": "Câu 6. Người thầy dạy võ cho học trò của mình như thế nào?",
      "id": "hoang-2-c06-01"
    },
    {
      "type": "single",
      "question": "Nguyên tắc đầu tiên về phép giao tiếp nhân sự của môn sinh Phật Quang Quyền là gì và tại sao?",
      "options": [
        "Nguyên tắc đầu tiên là “nghĩ tới người”. Chúng ta phải nghĩ tới người vì sự thành công và hạnh phúc trong cuộc sống đều cần đến sự giúp đỡ, ủng hộ và cảm thông của những người xung quanh. Muốn được người khác quan tâm thì trước hết phải biết quan tâm người khác.",
        "Nguyên tắc đầu tiên là “nghĩ tới mình”. Chúng ta phải nghĩ tới mình vì sự sinh tồn và vươn lên trong cuộc sống đều cần đến sự ích kỷ, khôn lỏi và chà đạp những người xung quanh. Muốn được người khác sợ hãi thì trước hết phải biết uy hiếp người khác.",
        "Nguyên tắc đầu tiên là “nghĩ tới tiền”. Chúng ta phải nghĩ tới tiền vì sự giàu có và địa vị trong cuộc sống đều cần đến sự tính toán, chi li và lợi dụng những người xung quanh. Muốn được người khác phục tùng thì trước hết phải biết mua chuộc người khác.",
        "Nguyên tắc đầu tiên là “nghĩ tới thầy”. Chúng ta phải nghĩ tới thầy vì sự thăng tiến và thành tích trong võ đường đều cần đến sự nịnh hót, quà cáp và lấy lòng những người bề trên. Muốn được thầy ưu ái thì trước hết phải biết phục dịch người khác."
      ],
      "correctIndex": 0,
      "explanation": "Nguyên tắc đầu tiên về phép giao tiếp nhân sự... là “nghĩ tới người”. Chúng ta phải nghĩ tới người vì sự thành công và hạnh phúc... đều cần đến sự giúp đỡ, ủng hộ và cảm thông của những người xung quanh. Muốn được người khác quan tâm... thì trước hết phải biết quan tâm... người khác.",
      "sourceQuestion": "Câu 7. Nguyên tắc đầu tiên về phép giao tiếp nhân sự của môn sinh Phật Quang Quyền là gì? Tại sao chúng ta phải “nghĩ tới người”?",
      "id": "hoang-2-c07-01"
    },
    {
      "type": "single",
      "question": "Nhận biết chân giá trị của người có làm cho người trở nên hợm hĩnh, kênh kiệu với mình không? Vì sao?",
      "options": [
        "Không. Nhận biết và trân trọng chân giá trị của người sẽ làm họ cảm động, quý mến và tin tưởng ta hơn. Nhờ đó, mối quan hệ trở nên chân thành và tốt đẹp hơn.",
        "Có. Nhận biết và khen ngợi chân giá trị của người sẽ làm họ sinh tâm kiêu ngạo, ỷ lại và coi thường ta hơn. Nhờ đó, ta dễ dàng bị họ sai khiến và bóc lột sức lao động.",
        "Không. Nhận biết và che giấu chân giá trị của người sẽ làm họ hoang mang, tự ti và phụ thuộc vào ta hơn. Nhờ đó, mối quan hệ trở nên kiểm soát và dễ điều khiển hơn.",
        "Có. Nhận biết và phóng đại chân giá trị của người sẽ làm họ ảo tưởng, mù quáng và dễ bị lừa gạt hơn. Nhờ đó, ta dễ dàng lợi dụng và chiếm đoạt tài sản của họ."
      ],
      "correctIndex": 0,
      "explanation": "Không. Nhận biết và trân trọng chân giá trị của người sẽ làm họ cảm động, quý mến và tin tưởng ta hơn. Nhờ đó, mối quan hệ trở nên chân thành và tốt đẹp hơn.",
      "sourceQuestion": "Câu 8. Nhận biết chân giá trị của người có làm cho người trở nên hợm hĩnh, kênh kiệu với mình không? Hãy giải thích.",
      "id": "hoang-2-c08-01"
    },
    {
      "type": "multiple",
      "question": "Sự khác nhau giữa khen và nịnh là gì?",
      "options": [
        "Khen là sự tán thưởng chân thành, đúng sự thật và không vụ lợi, nhằm ghi nhận, khuyến khích.",
        "Nịnh là sự ca tụng quá mức, không đúng sự thật, nhằm lấy lòng người khác để mưu cầu lợi ích.",
        "Khen dựa trên sự hiểu biết và nhận đúng giá trị của sự việc nên có ý nghĩa tích cực, giúp người được khen thêm tự tin.",
        "Nịnh là lời nói thiếu chân thành, dễ làm mất giá trị của người nói và đôi khi gây khó chịu.",
        "Khen là sự tâng bốc người bề trên, đúng với mong muốn của họ và mang tính ngoại giao, nhằm lấy lòng lãnh đạo.",
        "Nịnh là sự động viên người bề dưới, không cần đúng sự thật, nhằm tạo động lực ảo để họ làm việc nhiều hơn.",
        "Khen luôn mang lại lợi ích vật chất cho người khen, giúp người đó thăng tiến nhanh chóng trong tổ chức.",
        "Nịnh là một nghệ thuật giao tiếp đỉnh cao, thể hiện sự khôn ngoan và được mọi người tôn trọng, kính nể."
      ],
      "correctIndices": [0, 1, 2, 3],
      "explanation": "Khen là sự tán thưởng chân thành, đúng sự thật và không vụ lợi... Nịnh là sự ca tụng quá mức, không đúng sự thật, nhằm lấy lòng người khác để mưu cầu lợi ích... Khen dựa trên sự hiểu biết... giúp người được khen thêm tự tin. Nịnh là lời nói thiếu chân thành...",
      "sourceQuestion": "Câu 9. Khen và nịnh khác nhau như thế nào?",
      "id": "hoang-2-c09-01"
    },
    {
      "type": "single",
      "question": "Dùng lời khen để được người cảm mến có phải là thiếu thành thực không?",
      "options": [
        "Khen là sự biểu lộ lòng quý trọng, sự quan tâm và biết ơn đối với người khác, chứ không phải để mưu cầu lợi lộc. Vì vậy, lời khen chân thành không phải là thiếu thành thực mà là biểu hiện của thiện chí. Người thật lòng khinh ghét ai sẽ không thể chân thành khen ngợi.",
        "Khen là sự biểu lộ lòng đố kỵ, sự ghen ghét và toan tính đối với người khác, để mưu cầu lợi lộc. Vì vậy, mọi lời khen đều là thiếu thành thực và là biểu hiện của sự đạo đức giả. Người thật lòng khinh ghét ai vẫn sẽ luôn dùng lời khen để đâm lsau lưng.",
        "Khen là sự biểu lộ lòng tự cao, sự ban phát và thương hại đối với người khác, chứ không phải để làm thân. Vì vậy, lời khen chân thành là thiếu tinh tế và là biểu hiện của sự ngạo mạn. Người thật lòng khinh ghét ai sẽ không thèm nói chuyện hay khen ngợi.",
        "Khen là sự biểu lộ lòng yếu đuối, sự phụ thuộc và sợ hãi đối với người khác, nhằm cầu xin sự an toàn. Vì vậy, lời khen chân thành không phải là tự nguyện mà là biểu hiện của sự áp bức. Người thật lòng khinh ghét ai sẽ bị ép buộc phải khen ngợi mỗi ngày."
      ],
      "correctIndex": 0,
      "explanation": "Khen là sự biểu lộ lòng quý trọng... không phải để mưu cầu lợi lộc. Vì vậy, lời khen chân thành không phải là thiếu thành thực mà là biểu hiện của thiện chí và tình cảm tốt đẹp. Người thật lòng khinh ghét ai sẽ không thể chân thành khen ngợi người đó.",
      "sourceQuestion": "Câu 10. Dùng lời khen để được người cảm mến có phải là thiếu thành thực không?",
      "id": "hoang-2-c10-01"
    },
    {
      "type": "single",
      "question": "Thế nào là \"nhận thức được mình\"? Nếu không hiểu mình thì hậu quả là gì?",
      "options": [
        "“Nhận thức được mình” là hiểu rõ tâm tư, ước vọng, ưu điểm và khuyết điểm của bản thân. Người chưa nhận thức được mình thường dễ đòi hỏi người khác đối xử với mình theo điều mình mong muốn, nhưng lại không biết cư xử lại. Nếu chưa hiểu bản thân thì khó có thể hiểu người.",
        "“Nhận thức được mình” là hiểu rõ tài sản, địa vị, quyền lực và các mối quan hệ của bản thân. Người chưa nhận thức được mình thường dễ từ bỏ quyền lợi của mình, nhường nhịn người khác một cách nhu nhược. Nếu chưa hiểu bản thân thì sẽ luôn bị xã hội đào thải.",
        "“Nhận thức được mình” là hiểu rõ các chiêu thức, nội công, kinh mạch và các huyệt đạo của bản thân. Người chưa nhận thức được mình thường dễ bị tẩu hỏa nhập ma, đánh mất công lực đã dày công tu luyện. Nếu chưa hiểu bản thân thì khó có thể trở thành cao thủ.",
        "“Nhận thức được mình” là hiểu rõ tử vi, tướng số, vận hạn và các ngày giờ tốt xấu của bản thân. Người chưa nhận thức được mình thường dễ đưa ra quyết định sai lầm, đầu tư thua lỗ. Nếu chưa hiểu bản thân thì sẽ luôn gặp vận xui và tai họa."
      ],
      "correctIndex": 0,
      "explanation": "“Nhận thức được mình” là hiểu rõ tâm tư, ước vọng, ưu điểm và khuyết điểm của bản thân... Người chưa nhận thức được mình thường dễ đòi hỏi người khác... Nếu chưa hiểu được bản thân thì khó có thể hiểu người...",
      "sourceQuestion": "Câu 12. Thế nào là “nhận thức được mình”? Người ta có thể hiểu người hoặc làm cho người hiểu mình mà không tự mình hiểu được mình không?",
      "id": "hoang-2-c12-01"
    },
    {
      "type": "single",
      "question": "Thông thường con người có sống với cuộc sống thực của họ không?",
      "options": [
        "Thông thường, con người chưa hẳn sống với cuộc sống thực của mình mà thường chịu ảnh hưởng bởi thói quen, tập tục và môi trường xung quanh. Ví dụ: Có người khi chưa có quyền hạn thì chê trách thói hách dịch, nhưng khi có địa vị lại cư xử y như vậy.",
        "Thông thường, con người luôn luôn sống với cuộc sống thực của mình, hoàn toàn không bị ảnh hưởng bởi bất kỳ thói quen, tập tục hay môi trường nào. Ví dụ: Một người từ nhỏ đã hiền lành thì lớn lên dù làm tướng cướp vẫn giữ bản tính hiền lành, nhân hậu.",
        "Thông thường, con người chỉ sống theo kịch bản đã được sắp đặt sẵn bởi số phận, không có quyền lựa chọn hay thay đổi môi trường xung quanh. Ví dụ: Người sinh ra trong gia đình nghèo thì vĩnh viễn cam chịu số phận, không bao giờ có ý chí vươn lên làm giàu.",
        "Thông thường, con người thường xuyên thay đổi hoàn toàn tính cách mỗi ngày, không phụ thuộc vào thói quen hay môi trường xung quanh. Ví dụ: Có người hôm nay là kẻ sát nhân máu lạnh, ngày mai lại trở thành một vị chân tu đắc đạo không màng danh lợi."
      ],
      "correctIndex": 0,
      "explanation": "Thông thường, con người chưa hẳn sống với cuộc sống thực của mình mà thường chịu ảnh hưởng bởi thói quen, tập tục và môi trường xung quanh. Ví dụ: Có người khi chưa có quyền hạn thì chê trách thói quan liêu, hách dịch... nhưng khi có địa vị lại cư xử y như vậy.",
      "sourceQuestion": "Câu 13. Thông thường con người có sống với cuộc sống thực của họ không? Hay chỉ sống theo thói quen, tập tục và ảnh hưởng của môi trường xung quanh? Hãy chứng minh bằng một vài thí dụ.",
      "id": "hoang-2-c13-01"
    },
    {
      "type": "definition",
      "question": "Theo lý thuyết, thói quen là gì?",
      "sampleAnswer": "Thói quen là những việc được lặp đi lặp lại nhiều lần và dần trở thành nếp sống của con người.",
      "matchThreshold": 0.65,
      "explanation": "Thói quen là những việc được lặp đi lặp lại nhiều lần và dần trở thành nếp sống của con người.",
      "sourceQuestion": "Câu 14. Thói quen là gì? Thói quen đem lại lợi ích hay tai hại cho ta?",
      "id": "hoang-2-c14-01"
    },
    {
      "type": "single",
      "question": "Tại sao chúng ta cần làm chủ được thói quen?",
      "options": [
        "Vì có thói quen tốt và thói quen xấu. Khi làm chủ được thói quen, chúng ta có thể sửa đổi thói quen xấu, xây dựng thói quen tốt để giúp ích cho bản thân. Ngược lại, nếu để thói quen chi phối, những thói quen xấu sẽ gây phiền lụy, làm giảm uy tín.",
        "Vì thói quen là nguyên nhân duy nhất dẫn đến thành công hay thất bại. Khi làm chủ được thói quen, chúng ta có thể trở nên bất tử, không bị bệnh tật hay lão hóa. Ngược lại, nếu để thói quen chi phối, những thói quen xấu sẽ lập tức cướp đi sinh mạng.",
        "Vì thói quen là một loại năng lượng huyền bí trong vũ trụ. Khi làm chủ được thói quen, chúng ta có thể điều khiển được suy nghĩ của người khác, bắt họ phải phục tùng. Ngược lại, nếu để thói quen chi phối, tâm trí sẽ bị ma quỷ chiếm đoạt.",
        "Vì thói quen là quy định bắt buộc của pháp luật hiện hành. Khi làm chủ được thói quen, chúng ta sẽ được nhà nước cấp chứng chỉ công dân gương mẫu. Ngược lại, nếu để thói quen chi phối, sẽ bị tước đoạt quyền công dân và phạt tù chung thân."
      ],
      "correctIndex": 0,
      "explanation": "Vì có thói quen tốt và thói quen xấu. Khi làm chủ được thói quen, chúng ta có thể sửa đổi thói quen xấu, xây dựng thói quen tốt... Ngược lại, nếu để thói quen chi phối, những thói quen xấu sẽ gây nhiều phiền lụy, làm giảm uy tín...",
      "sourceQuestion": "Câu 15. Tại sao chúng ta cần làm chủ được thói quen?",
      "id": "hoang-2-c15-01"
    },
    {
      "type": "multiple",
      "question": "Phải làm thế nào để rèn luyện được thói quen tốt?",
      "options": [
        "Xác định rõ mục đích và quyết tâm thực hiện.",
        "Giao tiếp với những người có ảnh hưởng tích cực, gần gũi những người lạc quan, có ý chí vươn lên.",
        "Tránh xa những thói quen, ảnh hưởng tiêu cực.",
        "Đọc sách bổ ích, học tập những đức tính tốt và gương sáng của các bậc danh nhân.",
        "Sống khép kín, tránh xa xã hội để không bị nhiễm thói hư tật xấu của người đời.",
        "Tìm mọi cách tiêu diệt những người có thói quen xấu xung quanh mình.",
        "Bỏ tiền tham gia các khóa học làm giàu cấp tốc để nhanh chóng có thói quen của triệu phú.",
        "Chỉ cần đọc nhiều sách tiểu thuyết lãng mạn là tự nhiên sẽ có thói quen tốt."
      ],
      "correctIndices": [0, 1, 2, 3],
      "explanation": "Xác định rõ mục đích... Giao tiếp với những người có ảnh hưởng tích cực... Tránh xa những thói quen, ảnh hưởng tiêu cực... Đọc sách bổ ích, học tập những đức tính tốt và gương sáng...",
      "sourceQuestion": "Câu 16. Phải làm thế nào để rèn luyện được thói quen tốt?",
      "id": "hoang-2-c16-01"
    },
    {
      "type": "single",
      "question": "Thói quen hay che đậy những sơ xuất vì sợ người cười chê, có phải là thói quen tốt, chứng tỏ người có nghị lực không?",
      "options": [
        "Không. Thói quen che đậy những sai sót vì sợ bị chê cười là một thói quen xấu, cho thấy người đó thiếu dũng khí nhìn nhận khuyết điểm và sửa đổi bản thân. Người có nghị lực là người dám nhận lỗi, biết sửa sai.",
        "Có. Thói quen che đậy những sai sót vì sợ bị chê cười là một thói quen tốt, cho thấy người đó có lòng tự trọng cao và biết bảo vệ hình ảnh cá nhân. Người có nghị lực là người không bao giờ để người khác thấy điểm yếu của mình.",
        "Không. Thói quen che đậy những sai sót vì sợ bị chê cười là một thói quen vô thưởng vô phạt, không tốt cũng không xấu. Người có nghị lực là người biết tranh cãi đến cùng, đùn đẩy lỗi cho người khác để bảo vệ danh dự.",
        "Có. Thói quen che đậy những sai sót vì sợ bị chê cười là một chiến thuật thông minh, cho thấy người đó có khả năng lừa dối đám đông để trục lợi. Người có nghị lực là người tạo ra những sai lầm giả để thu hút sự chú ý."
      ],
      "correctIndex": 0,
      "explanation": "Không. Thói quen che đậy những sai sót vì sợ bị chê cười là một thói quen xấu, cho thấy người đó thiếu dũng khí nhìn nhận khuyết điểm và sửa đổi bản thân. Người có nghị lực là người dám nhận lỗi, biết sửa sai và không ngừng hoàn thiện chính mình.",
      "sourceQuestion": "Câu 17. Thói quen hay che đậy những sơ xuất vì sợ người cười chê, có phải là thói quen tốt, chứng tỏ người có nghị lực không?",
      "id": "hoang-2-c17-01"
    },
    {
      "type": "definition",
      "question": "Theo lý thuyết, 2 vị đại đệ tử thay mặt Đức Phật thống lĩnh Tăng đoàn là ai?",
      "sampleAnswer": "Ngài Xá Lợi Phất (Sariputta) và Ngài Mục Kiền Liên (Moggallana).",
      "matchThreshold": 0.65,
      "explanation": "Ngài Xá Lợi Phất (Sariputta) và Ngài Mục Kiền Liên (Moggallana).",
      "sourceQuestion": "Câu 18. 2 vị đại đệ tử thay mặt Đức Phật thống lĩnh Tăng đoàn là ai ?",
      "id": "hoang-2-c18-01"
    },
    {
      "type": "multiple",
      "question": "Định nghĩa cơ bản về luật nhân quả là gì?",
      "options": [
        "Nhân quả là giáo lý căn bản nhất của đạo Phật, không do một thần linh hay thượng đế sáng tạo mà là một quy luật công bằng khách quan chi phối tất cả.",
        "Nhân: nguyên nhân, cái mà mình đã gây tạo.",
        "Quả: kết quả, cái mà mình sẽ nhận lấy.",
        "Mỗi ý nghĩ, mỗi lời nói, mỗi việc làm của chúng ta đều gây một kết quả trở lại cho chính chúng ta.",
        "Nhân quả là một đạo luật do Đức Phật tự sáng tạo ra để quản lý và trừng phạt các đệ tử phạm lỗi.",
        "Nhân quả là sự thưởng phạt ngẫu nhiên của các đấng thần linh tối cao dựa trên cảm xúc của họ.",
        "Chỉ những hành động lớn lao mới tạo ra nhân quả, còn những ý nghĩ hay lời nói thì không để lại hậu quả gì.",
        "Chủ nhân của hành động có thể trốn tránh kết quả bằng cách nhờ người khác chịu tội thay mình."
      ],
      "correctIndices": [0, 1, 2, 3],
      "explanation": "Nhân quả là giáo lý căn bản... quy luật công bằng khách quan... Nhân là nguyên nhân, Quả là kết quả. Mỗi ý nghĩ, lời nói, việc làm đều gây kết quả trở lại...",
      "sourceQuestion": "Câu 19. Định nghĩa cơ bản về luật nhân quả.",
      "id": "hoang-2-c19-01"
    },
    {
      "type": "single",
      "question": "3 nền tảng của thiền định là gì?",
      "options": [
        "Đạo đức, công đức, khí công.",
        "Sức khỏe, tiền bạc, thời gian.",
        "Kinh nghiệm, bí kíp, sư phụ.",
        "Thể lực, tốc độ, sức bền."
      ],
      "correctIndex": 0,
      "explanation": "3 nền tảng của thiền định là: Đạo đức, công đức, khí công.",
      "sourceQuestion": "Câu 20. 3 nền tảng của thiền định là gì ?",
      "id": "hoang-2-c20-01"
    },
    {
      "type": "definition",
      "question": "Theo lý thuyết, khái niệm về Thiền là gì?",
      "sampleAnswer": "Thiền là sự thực hành đưa đến tâm trí an tĩnh, không xuất hiện ý nghĩ, không dấy động tình cảm, và vẫn sáng suốt.",
      "matchThreshold": 0.65,
      "explanation": "Thiền là sự thực hành đưa đến tâm trí an tĩnh, không xuất hiện ý nghĩ, không dấy động tình cảm, và vẫn sáng suốt.",
      "sourceQuestion": "Câu 21. Khái niệm về Thiền?",
      "id": "hoang-2-c21-01"
    },
    {
      "type": "single",
      "question": "Sự khác nhau giữa Thiền đạo Phật và Thiền ngoại đạo là gì?",
      "options": [
        "Thiền của ngoại đạo, dù đạt đến Thần Ngã, Đại Ngã, Thánh ngã, nhưng vẫn có chỗ cho bản ngã nên không thể giải thoát. Thiền của đạo Phật là tìm cách diệt trừ bản ngã, hướng đến mục tiêu Vô Ngã.",
        "Thiền của ngoại đạo chú trọng vào việc tĩnh tọa, hít thở và rèn luyện sức khỏe, giúp con người trường sinh bất tử. Thiền của đạo Phật là tìm cách luyện nội công, phát triển luân xa, hướng đến mục tiêu bay lượn trên không.",
        "Thiền của ngoại đạo bắt buộc phải ăn chay trường, kiêng khem khổ hạnh và sống ẩn dật trong rừng sâu. Thiền của đạo Phật là tìm cách hưởng thụ cuộc sống, ăn uống tự do, hướng đến mục tiêu hòa nhập xã hội.",
        "Thiền của ngoại đạo là sự tập trung tâm trí vào các vị thần linh, cầu xin sự ban phước và cứu rỗi linh hồn. Thiền của đạo Phật là tìm cách giao tiếp với cõi âm, gọi hồn người chết, hướng đến mục tiêu tiên tri tương lai."
      ],
      "correctIndex": 0,
      "explanation": "Thiền của ngoại đạo, dù đạt đến Thần Ngã, Đại Ngã, Thánh ngã, nhưng vẫn có chỗ cho bản ngã nên không thể giải thoát. Thiền của đạo Phật là tìm cách diệt trừ bản ngã, hướng đến mục tiêu Vô Ngã.",
      "sourceQuestion": "Câu 22. Sự khác nhau giữa Thiền đạo Phật và Thiền ngoại đạo?",
      "id": "hoang-2-c22-01"
    },
    {
      "type": "multiple",
      "question": "Nêu 3 tính chất của Thiền đạo Phật?",
      "options": [
        "Hướng về mục tiêu Vô Ngã",
        "Lấy Phước làm nền tảng, chất liệu tu hành",
        "Chánh niệm tỉnh giác phát sinh từ 3 cái BIẾT: Biết Tâm còn phiền động, Biết Thân vô thường, Biết Hơi Thở vào ra rõ ràng",
        "Hướng về mục tiêu trở thành Thần Tiên siêu phàm",
        "Lấy Tiền tài làm nền tảng, công cụ để xây dựng chùa to tượng lớn",
        "Chánh niệm tỉnh giác phát sinh từ 3 cái BIẾT: Biết quá khứ, Biết tương lai, Biết cách đọc suy nghĩ người khác",
        "Hướng về mục tiêu loại bỏ hoàn toàn mọi giác quan trên cơ thể"
      ],
      "correctIndices": [0, 1, 2],
      "explanation": "3 tính chất: Hướng về mục tiêu Vô Ngã, Lấy Phước làm nền tảng, Chánh niệm tỉnh giác phát sinh từ 3 cái BIẾT.",
      "sourceQuestion": "Câu 23. Nêu 3 tính chất của Thiền đạo Phật?",
      "id": "hoang-2-c23-01"
    },
    {
      "type": "definition",
      "question": "Theo lý thuyết, Từ tâm là gì?",
      "sampleAnswer": "Từ tâm là lòng yêu thương mọi người và muôn loài một cách chân thành, không phân biệt và không đòi hỏi điều kiện hay sự đền đáp.",
      "matchThreshold": 0.65,
      "explanation": "Từ tâm là lòng yêu thương mọi người và muôn loài một cách chân thành, không phân biệt và không đòi hỏi điều kiện hay sự đền đáp.",
      "sourceQuestion": "Câu 24. Hỏi: Từ tâm là gì?",
      "id": "hoang-2-c24-01"
    },
    {
      "type": "single",
      "question": "Tâm ái nhiễm khác với từ tâm như thế nào?",
      "options": [
        "Tâm ái nhiễm thương yêu vì lợi ích cho bản thân, còn từ tâm là sự yêu thương trong sáng, mong người khác được hạnh phúc mà không cần nhận lại điều gì.",
        "Tâm ái nhiễm thương yêu vì muốn kiểm soát, ràng buộc người khác, còn từ tâm là sự yêu thương bằng cách cung cấp tiền bạc, vật chất để mua chuộc tình cảm của họ.",
        "Tâm ái nhiễm thương yêu vì bị ép buộc bởi hoàn cảnh và trách nhiệm gia đình, còn từ tâm là sự yêu thương lãng mạn, bay bổng giữa những người khác giới.",
        "Tâm ái nhiễm thương yêu vì muốn nổi tiếng, được mọi người ca ngợi trên mạng xã hội, còn từ tâm là sự yêu thương lén lút, giấu giếm và sợ bị người khác phát hiện."
      ],
      "correctIndex": 0,
      "explanation": "Tâm ái nhiễm thương yêu vì lợi ích cho bản thân, còn từ tâm là sự yêu thương trong sáng, mong người khác được hạnh phúc mà không cần nhận lại điều gì.",
      "sourceQuestion": "Câu 25. Hỏi: Tâm ái nhiễm khác với từ tâm như thế nào?",
      "id": "hoang-2-c25-01"
    },
    {
      "type": "single",
      "question": "Người môn sinh Phật Quang Quyền thể hiện từ tâm bằng cách nào?",
      "options": [
        "Bằng cách biết giúp đỡ, chia sẻ, tôn trọng mọi người, không gây tổn hại và luôn cư xử bằng lòng nhân ái.",
        "Bằng cách thường xuyên đăng các bài viết đạo lý lên mạng xã hội, kêu gọi mọi người ăn chay và tự hào khoe khoang những việc thiện mình đã làm.",
        "Bằng cách dùng võ lực để trừng trị những kẻ ác, ép buộc người khác phải sống tốt và sẵn sàng dùng bạo lực để bảo vệ công lý mù quáng.",
        "Bằng cách né tránh giao tiếp, tìm nơi hẻo lánh tu hành, mặc kệ những đau khổ của xã hội và chỉ tập trung vào việc thanh lọc tâm hồn của riêng mình."
      ],
      "correctIndex": 0,
      "explanation": "Bằng cách biết giúp đỡ, chia sẻ, tôn trọng mọi người, không gây tổn hại và luôn cư xử bằng lòng nhân ái.",
      "sourceQuestion": "Câu 26. Hỏi: Người môn sinh Phật Quang Quyền thể hiện từ tâm bằng cách nào?",
      "id": "hoang-2-c26-01"
    },
    {
      "type": "single",
      "question": "Vì sao người môn sinh phải biết yêu thương huynh đệ?",
      "options": [
        "Vì tình thương huynh đệ là nền tảng để xây dựng tập thể đoàn kết và cũng là bước đầu để mở rộng tình thương đến mọi người.",
        "Vì tình thương huynh đệ là cách tốt nhất để tạo thành một băng nhóm lớn mạnh, bảo vệ nhau khi xảy ra xô xát với các võ đường khác.",
        "Vì tình thương huynh đệ là quy định bắt buộc của môn phái, nếu không yêu thương sẽ bị huấn luyện viên trách phạt và đuổi học.",
        "Vì tình thương huynh đệ giúp ta vay mượn tiền bạc dễ dàng, có người làm bài tập hộ và hỗ trợ nhau trong các kỳ thi thăng cấp."
      ],
      "correctIndex": 0,
      "explanation": "Vì tình thương huynh đệ là nền tảng để xây dựng tập thể đoàn kết và cũng là bước đầu để mở rộng tình thương đến mọi người.",
      "sourceQuestion": "Câu 27. Hỏi: Vì sao người môn sinh phải biết yêu thương huynh đệ?",
      "id": "hoang-2-c27-01"
    },
    {
      "type": "single",
      "question": "Khi có buồn giận hoặc ác cảm với huynh đệ, người môn sinh phải làm gì?",
      "options": [
        "Phải biết nhìn lại lỗi của mình, chân thành xin lỗi hoặc tha thứ cho nhau, không nuôi dưỡng sự ganh ghét và oán trách trong lòng.",
        "Phải lập tức hẹn ra sau võ đường để quyết đấu, phân định thắng thua bằng nắm đấm để giải quyết dứt điểm ân oán.",
        "Phải tìm mọi cách nói xấu, bôi nhọ danh dự của người đó với các huynh đệ khác để cô lập họ khỏi tập thể.",
        "Phải kìm nén cơn giận, giữ nụ cười giả tạo trên môi nhưng âm thầm tìm cơ hội thuận lợi để trả đũa sau lưng."
      ],
      "correctIndex": 0,
      "explanation": "Phải biết nhìn lại lỗi của mình, chân thành xin lỗi hoặc tha thứ cho nhau, không nuôi dưỡng sự ganh ghét và oán trách trong lòng.",
      "sourceQuestion": "Câu 28. Hỏi: Khi có buồn giận hoặc ác cảm với huynh đệ, người môn sinh phải làm gì?",
      "id": "hoang-2-c28-01"
    },
    {
      "type": "definition",
      "question": "Theo lý thuyết, lý tưởng từ tâm của người môn sinh Phật Quang Quyền là gì?",
      "sampleAnswer": "Luôn sống vị tha, yêu thương mọi người, góp phần xây dựng một tập thể đoàn kết và lan tỏa điều tốt đẹp đến cộng đồng.",
      "matchThreshold": 0.65,
      "explanation": "Luôn sống vị tha, yêu thương mọi người, góp phần xây dựng một tập thể đoàn kết và lan tỏa điều tốt đẹp đến cộng đồng.",
      "sourceQuestion": "Câu 29. Hỏi: Lý tưởng từ tâm của người môn sinh Phật Quang Quyền là gì?",
      "id": "hoang-2-c29-01"
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
