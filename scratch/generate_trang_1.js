const fs = require('fs');
const path = '/Users/luanph/Project other/MARTIAL WAY THEORY/content/exam-bank/trang-1.json';

const data = {
  "rankId": "trang-1",
  "beltId": "white",
  "lessonId": "white-lesson-01",
  "questions": [
    {
      "type": "single",
      "question": "Thống nhất chỉ huy là gì và làm thế nào để thực hiện tốt sự thống nhất chỉ huy?",
      "options": [
        "Thống nhất chỉ huy là việc điều hành và ra lệnh theo một đường lối, một hệ thống chỉ huy duy nhất để mọi người cùng thực hiện. Muốn thực hiện tốt phải có cơ quan chỉ huy thống nhất, giải thích rõ mệnh lệnh, kiểm tra việc thi hành và bảo đảm mọi người thực hiện theo cùng một phương pháp, mục tiêu chung.",
        "Thống nhất chỉ huy là việc điều hành và ra lệnh theo nhiều đường lối khác nhau để tạo sự linh hoạt. Muốn thực hiện tốt phải phân quyền cho nhiều bộ phận, không cần giải thích mệnh lệnh, chỉ cần kiểm tra kết quả và bảo đảm mọi người tự do sáng tạo phương pháp.",
        "Thống nhất chỉ huy là việc điều hành và ra lệnh theo một đường lối, một hệ thống chỉ huy duy nhất. Muốn thực hiện tốt phải có cơ quan chỉ huy thống nhất, giữ bí mật mệnh lệnh, giao phó hoàn toàn việc thi hành và bảo đảm mọi người tự tìm ra phương pháp chung.",
        "Thống nhất chỉ huy là việc điều hành và ra lệnh theo một hệ thống dân chủ, lấy ý kiến số đông. Muốn thực hiện tốt phải có ban bệ bầu cử, biểu quyết mọi mệnh lệnh, không cần kiểm tra việc thi hành và bảo đảm mọi người tự nguyện làm theo ý thích."
      ],
      "correctIndex": 0,
      "explanation": "Thống nhất chỉ huy là việc điều hành và ra lệnh theo một đường lối, một hệ thống chỉ huy duy nhất để mọi người cùng thực hiện. Muốn thực hiện tốt phải có cơ quan chỉ huy thống nhất, giải thích rõ mệnh lệnh, kiểm tra việc thi hành...",
      "sourceQuestion": "Câu 1. Hỏi: Thống nhất chỉ huy là gì và làm thế nào để thực hiện tốt sự thống nhất chỉ huy?",
      "id": "trang-1-c01-01"
    },
    {
      "type": "single",
      "question": "Quản trị là gì và muốn quản trị hiệu quả cần thực hiện những nguyên tắc nào?",
      "options": [
        "Quản trị là nghệ thuật tổ chức, sắp xếp và điều hành công việc một cách hợp lý để mọi hoạt động diễn ra thuận lợi. Muốn quản trị hiệu quả cần thực hiện các nguyên tắc: phân nhiệm rõ ràng cho từng người, xây dựng hệ thống kiểm soát, biết ủy quyền và duy trì sự thống nhất chỉ huy trong tổ chức.",
        "Quản trị là khoa học tổ chức, sắp xếp và điều hành công việc một cách chặt chẽ để kiểm soát mọi hoạt động. Cần thực hiện các nguyên tắc: phân nhiệm chung chung, loại bỏ hệ thống kiểm soát, ôm đồm mọi việc và chia nhỏ sự chỉ huy trong tổ chức.",
        "Quản trị là nghệ thuật tổ chức, sắp xếp và điều hành công việc một cách ngẫu hứng để mọi hoạt động diễn ra linh hoạt. Cần thực hiện các nguyên tắc: phân nhiệm theo cảm tính, xây dựng hệ thống báo cáo, hạn chế ủy quyền và duy trì sự phân tán chỉ huy trong tổ chức.",
        "Quản trị là kỹ năng tổ chức, sắp xếp và điều hành công việc một cách cứng nhắc để mọi hoạt động tuân theo khuôn mẫu. Cần thực hiện các nguyên tắc: phân nhiệm rõ ràng cho từng người, xây dựng hệ thống kiểm soát, không bao giờ ủy quyền và duy trì sự thống nhất chỉ huy tuyệt đối."
      ],
      "correctIndex": 0,
      "explanation": "Quản trị là nghệ thuật tổ chức, sắp xếp và điều hành công việc một cách hợp lý... Muốn quản trị hiệu quả cần thực hiện các nguyên tắc: phân nhiệm rõ ràng cho từng người, xây dựng hệ thống kiểm soát, biết ủy quyền và duy trì sự thống nhất chỉ huy...",
      "sourceQuestion": "Câu 2. Hỏi: Quản trị là gì và muốn quản trị hiệu quả cần thực hiện những nguyên tắc nào?",
      "id": "trang-1-c02-01"
    },
    {
      "type": "single",
      "question": "Khi thành lập võ đường, những vấn đề nào cần được kiện toàn trước tiên?",
      "options": [
        "Trước hết phải kiện toàn nhân sự để có người đảm trách công việc. Sau đó cần ổn định tài chính và cơ sở vật chất để bảo đảm việc vận hành, giảng dạy và sinh hoạt của võ đường được thuận lợi, lâu dài.",
        "Trước hết phải kiện toàn tài chính để có vốn đầu tư ban đầu. Sau đó cần xây dựng cơ sở vật chất hoành tráng và tuyển dụng nhân sự ồ ạt để bảo đảm việc vận hành, giảng dạy và sinh hoạt của võ đường được thu hút học viên ngay lập tức.",
        "Trước hết phải kiện toàn cơ sở vật chất để có nơi tập luyện khang trang. Sau đó cần ổn định tài chính và cuối cùng mới tìm kiếm nhân sự để bảo đảm việc vận hành, giảng dạy và sinh hoạt của võ đường được thuận lợi, lâu dài.",
        "Trước hết phải kiện toàn chương trình huấn luyện để có nội dung giảng dạy. Sau đó cần ổn định tài chính và quảng cáo rầm rộ để bảo đảm việc vận hành, giảng dạy và sinh hoạt của võ đường được nhiều người biết đến."
      ],
      "correctIndex": 0,
      "explanation": "Trước hết phải kiện toàn nhân sự để có người đảm trách công việc. Sau đó cần ổn định tài chính và cơ sở vật chất để bảo đảm việc vận hành, giảng dạy và sinh hoạt của võ đường được thuận lợi, lâu dài.",
      "sourceQuestion": "Câu 3. Hỏi: Khi thành lập võ đường, những vấn đề nào cần được kiện toàn trước tiên?",
      "id": "trang-1-c03-01"
    },
    {
      "type": "single",
      "question": "Sau khi kiện toàn nhân sự, tài chính và cơ sở vật chất, võ đường cần thực hiện điều gì?",
      "options": [
        "Song song với việc bổ túc những thiếu sót, võ đường phải nhanh chóng xây dựng và vận hành hệ thống quản trị đối nội và đối ngoại để điều hành công việc hiệu quả.",
        "Song song với việc bổ túc những thiếu sót, võ đường phải nhanh chóng tổ chức các giải đấu và biểu diễn võ thuật để quảng bá hình ảnh rộng rãi.",
        "Song song với việc bổ túc những thiếu sót, võ đường phải nhanh chóng mở thêm nhiều chi nhánh và vận hành hệ thống thu học phí để gia tăng lợi nhuận.",
        "Song song với việc bổ túc những thiếu sót, võ đường phải nhanh chóng phong đai, cấp chứng chỉ cho học viên để tạo động lực tập luyện lâu dài."
      ],
      "correctIndex": 0,
      "explanation": "Song song với việc bổ túc những thiếu sót, võ đường phải nhanh chóng xây dựng và vận hành hệ thống quản trị đối nội và đối ngoại để điều hành công việc hiệu quả.",
      "sourceQuestion": "Câu 4. Hỏi: Sau khi kiện toàn nhân sự, tài chính và cơ sở vật chất, võ đường cần thực hiện điều gì?",
      "id": "trang-1-c04-01"
    },
    {
      "type": "single",
      "question": "Hệ thống đối ngoại của võ đường có nhiệm vụ gì?",
      "options": [
        "Hệ thống đối ngoại có nhiệm vụ liên hệ với chính quyền địa phương, các nhân vật uy tín, đoàn thể và quần chúng; đồng thời thực hiện các thủ tục hành chính cần thiết, tạo mối quan hệ tốt đẹp để hỗ trợ hoạt động và phát triển võ đường.",
        "Liên hệ với các võ đường khác, các cao thủ ẩn danh, hiệp hội võ thuật và báo chí; đồng thời thực hiện các thủ tục thách đấu cần thiết, tạo tiếng vang lớn để hỗ trợ hoạt động và phát triển võ đường.",
        "Liên hệ với các nhà tài trợ, các doanh nghiệp lớn, công ty truyền thông và quần chúng; đồng thời thực hiện các thủ tục kêu gọi vốn cần thiết, tạo mối quan hệ kinh tế để hỗ trợ hoạt động và phát triển võ đường.",
        "Liên hệ với chính quyền trung ương, các nhân vật nổi tiếng, cơ quan thực thi pháp luật; đồng thời thực hiện các thủ tục thưa kiện cần thiết, tạo sự e dè cho đối thủ để bảo vệ hoạt động và phát triển võ đường."
      ],
      "correctIndex": 0,
      "explanation": "Hệ thống đối ngoại có nhiệm vụ liên hệ với chính quyền địa phương, các nhân vật uy tín, đoàn thể và quần chúng; đồng thời thực hiện các thủ tục hành chính cần thiết, tạo mối quan hệ tốt đẹp để hỗ trợ hoạt động và phát triển võ đường.",
      "sourceQuestion": "Câu 5. Hỏi: Hệ thống đối ngoại của võ đường có nhiệm vụ gì?",
      "id": "trang-1-c05-01"
    },
    {
      "type": "single",
      "question": "Tại sao phải tiếp xúc với những người có uy tín trong địa phương?",
      "options": [
        "Vì họ là những người có ảnh hưởng và được quần chúng tin tưởng. Thông qua họ, võ đường dễ tìm hiểu địa phương, xây dựng uy tín, nhận được sự hỗ trợ và thuận lợi hơn trong việc hướng dẫn thanh thiếu niên sống tốt, học võ và rèn luyện đạo đức.",
        "Vì họ là những người giàu có và nhiều mối quan hệ. Thông qua họ, võ đường dễ kêu gọi tài trợ, xây dựng cơ ngơi, nhận được sự giúp đỡ tài chính và thuận lợi hơn trong việc mở rộng quy mô kinh doanh.",
        "Vì họ là những người có quyền lực và chức vụ cao. Thông qua họ, võ đường dễ lách luật, xây dựng thế lực, nhận được sự bao che và thuận lợi hơn trong việc đàn áp các võ đường cạnh tranh.",
        "Vì họ là những người giỏi võ và am hiểu binh khí. Thông qua họ, võ đường dễ học hỏi chiêu thức, xây dựng giáo trình, nhận được sự truyền dạy bí kíp và thuận lợi hơn trong việc đào tạo cao thủ."
      ],
      "correctIndex": 0,
      "explanation": "Vì họ là những người có ảnh hưởng và được quần chúng tin tưởng. Thông qua họ, võ đường dễ tìm hiểu địa phương, xây dựng uy tín, nhận được sự hỗ trợ và thuận lợi hơn trong việc hướng dẫn thanh thiếu niên sống tốt, học võ và rèn luyện đạo đức.",
      "sourceQuestion": "Câu 6. Hỏi: Tại sao phải tiếp xúc với những người có uy tín trong địa phương?",
      "id": "trang-1-c06-01"
    },
    {
      "type": "definition",
      "question": "Theo lý thuyết, tham vọng là gì và do đâu mà có?",
      "sampleAnswer": "Tham vọng là sự mong cầu quá mức về danh vọng, quyền lợi, địa vị hoặc sự hơn thua. Tham vọng thường xuất phát từ tâm ích kỷ và mong muốn đề cao bản thân.",
      "matchThreshold": 0.65,
      "explanation": "Tham vọng là sự mong cầu quá mức về danh vọng, quyền lợi, địa vị hoặc sự hơn thua. Tham vọng thường xuất phát từ tâm ích kỷ và mong muốn đề cao bản thân.",
      "sourceQuestion": "Câu 7. Hỏi: Tham vọng là gì và do đâu mà có?",
      "id": "trang-1-c07-01"
    },
    {
      "type": "single",
      "question": "Tham vọng gây tác hại như thế nào đối với người môn sinh Phật Quang Quyền?",
      "options": [
        "Tham vọng dễ làm con người ganh đua, mất đoàn kết, quên đi mục tiêu rèn luyện đạo đức và phụng sự. Khi bị tham vọng chi phối, người ta dễ đặt lợi ích cá nhân lên trên lợi ích của tập thể.",
        "Tham vọng dễ làm con người lười biếng, thiếu động lực, quên đi mục tiêu thi đấu và giành huy chương. Khi bị tham vọng chi phối, người ta dễ đặt lợi ích an nhàn lên trên lợi ích của võ đường.",
        "Tham vọng dễ làm con người tự ti, sợ hãi, quên đi mục tiêu rèn luyện sức khỏe và bảo vệ bản thân. Khi bị tham vọng chi phối, người ta dễ đặt sự an toàn cá nhân lên trên tinh thần thượng võ.",
        "Tham vọng dễ làm con người tiêu xài hoang phí, nợ nần, quên đi mục tiêu đóng góp tài chính và xây dựng cơ sở. Khi bị tham vọng chi phối, người ta dễ đặt nhu cầu vật chất lên trên lợi ích của môn phái."
      ],
      "correctIndex": 0,
      "explanation": "Tham vọng dễ làm con người ganh đua, mất đoàn kết, quên đi mục tiêu rèn luyện đạo đức và phụng sự. Khi bị tham vọng chi phối, người ta dễ đặt lợi ích cá nhân lên trên lợi ích của tập thể.",
      "sourceQuestion": "Câu 8. Hỏi: Tham vọng gây tác hại như thế nào đối với người môn sinh Phật Quang Quyền?",
      "id": "trang-1-c08-01"
    },
    {
      "type": "single",
      "question": "Người môn sinh Phật Quang Quyền vượt qua tham vọng bằng cách nào?",
      "options": [
        "Phải luôn sống khiêm tốn, biết nhìn lại chính mình, lấy việc rèn luyện đạo đức và phụng sự cộng đồng làm mục tiêu, không chạy theo danh tiếng, địa vị hay quyền lợi riêng.",
        "Phải luôn sống khép kín, tránh xa xã hội, lấy việc ăn chay niệm Phật và thiền định làm mục tiêu, không quan tâm đến thế sự, sự nghiệp hay các mối quan hệ xã hội.",
        "Phải luôn sống tự hào, tự tin vào bản thân, lấy việc thi đấu đạt thành tích cao làm mục tiêu, dùng danh tiếng có được để làm rạng danh võ đường và giúp đỡ người thân.",
        "Phải luôn sống thoải mái, buông thả mọi thứ, lấy việc vui chơi giải trí và thụ hưởng cuộc sống làm mục tiêu, không cố gắng nỗ lực để tránh sinh ra tham vọng tranh giành."
      ],
      "correctIndex": 0,
      "explanation": "Phải luôn sống khiêm tốn, biết nhìn lại chính mình, lấy việc rèn luyện đạo đức và phụng sự cộng đồng làm mục tiêu, không chạy theo danh tiếng, địa vị hay quyền lợi riêng.",
      "sourceQuestion": "Câu 9. Hỏi: Người môn sinh Phật Quang Quyền vượt qua tham vọng bằng cách nào?",
      "id": "trang-1-c09-01"
    },
    {
      "type": "definition",
      "question": "Theo lý thuyết, cố chấp là gì?",
      "sampleAnswer": "Cố chấp là giữ khư khư ý kiến hoặc thói quen cũ mà không chịu xem xét, thay đổi cho phù hợp với hoàn cảnh mới; hoặc cứ bận tâm, trách móc những lỗi lầm nhỏ nhặt của người khác mà không biết cảm thông, tha thứ.",
      "matchThreshold": 0.65,
      "explanation": "Cố chấp là giữ khư khư ý kiến hoặc thói quen cũ mà không chịu xem xét, thay đổi cho phù hợp với hoàn cảnh mới; hoặc cứ bận tâm, trách móc những lỗi lầm nhỏ nhặt của người khác mà không biết cảm thông, tha thứ.",
      "sourceQuestion": "Câu 10. Cố chấp là gì?",
      "id": "trang-1-c10-01"
    },
    {
      "type": "single",
      "question": "Tác hại của sự cố chấp đối với người môn sinh Phật Quang Quyền là gì?",
      "options": [
        "Cố chấp làm cho con người khó học hỏi, khó tiếp thu điều hay, dễ phát sinh phiền não và mất đoàn kết với huynh đệ. Người cố chấp thường chỉ thấy lỗi của người khác mà quên nhìn lại chính mình.",
        "Cố chấp làm cho con người nhu nhược, ba phải, dễ bị người khác lợi dụng và đánh mất bản sắc cá nhân. Người cố chấp thường chỉ thấy lỗi của chính mình mà quên đi những điểm tốt của bản thân.",
        "Cố chấp làm cho con người bảo thủ về kỹ thuật, không chịu học võ phái khác, dễ bị lạc hậu trong thi đấu. Người cố chấp thường chỉ thấy võ phái mình là nhất mà quên rèn luyện thể lực.",
        "Cố chấp làm cho con người tiêu cực, chán nản, dễ bỏ cuộc giữa chừng và mất niềm tin vào võ thuật. Người cố chấp thường chỉ thấy khó khăn trước mắt mà quên đi mục tiêu dài hạn."
      ],
      "correctIndex": 0,
      "explanation": "Cố chấp làm cho con người khó học hỏi, khó tiếp thu điều hay, dễ phát sinh phiền não và mất đoàn kết với huynh đệ. Người cố chấp thường chỉ thấy lỗi của người khác mà quên nhìn lại chính mình.",
      "sourceQuestion": "Câu 11. Tác hại của sự cố chấp đối với người môn sinh Phật Quang Quyền là gì?",
      "id": "trang-1-c11-01"
    },
    {
      "type": "single",
      "question": "Người môn sinh Phật Quang Quyền vượt qua sự cố chấp bằng cách nào?",
      "options": [
        "Phải biết lắng nghe, học hỏi điều hay của người xưa và người nay, sẵn sàng sửa đổi khi thấy điều đúng. Đồng thời phải rộng lượng, biết tha thứ, chân thành góp ý để giúp huynh đệ tiến bộ nhưng không nuôi tâm trách móc hay bực bội kéo dài.",
        "Phải biết nhẫn nhịn, im lặng trước mọi lỗi lầm của huynh đệ, sẵn sàng thay đổi nguyên tắc của bản thân để làm hài lòng người khác. Đồng thời phải che giấu cảm xúc, không bao giờ góp ý để tránh làm mất lòng nhau.",
        "Phải biết tranh luận đến cùng, bảo vệ quan điểm của mình bằng mọi giá, chỉ sửa đổi khi đối phương đưa ra bằng chứng thuyết phục. Đồng thời phải nghiêm khắc, chỉ trích thẳng thắn để giúp huynh đệ sợ hãi mà không dám tái phạm.",
        "Phải biết từ bỏ mọi ý kiến cá nhân, luôn hùa theo đám đông, sẵn sàng sửa đổi theo xu hướng mới nhất. Đồng thời phải bao che, dung túng mọi lỗi lầm, khen ngợi vô cớ để giúp huynh đệ tự mãn và vui vẻ."
      ],
      "correctIndex": 0,
      "explanation": "Phải biết lắng nghe, học hỏi điều hay của người xưa và người nay, sẵn sàng sửa đổi khi thấy điều đúng. Đồng thời phải rộng lượng, biết tha thứ, chân thành góp ý để giúp huynh đệ tiến bộ nhưng không nuôi tâm trách móc hay bực bội kéo dài.",
      "sourceQuestion": "Câu 12. Người môn sinh Phật Quang Quyền vượt qua sự cố chấp bằng cách nào?",
      "id": "trang-1-c12-01"
    },
    {
      "type": "definition",
      "question": "Theo lý thuyết, nhận lỗi về mình là gì?",
      "sampleAnswer": "Nhận lỗi về mình là dám nhìn lại bản thân, không đổ lỗi cho người khác khi xảy ra sai sót, đồng thời biết nhận trách nhiệm và tìm cách sửa chữa khuyết điểm của mình.",
      "matchThreshold": 0.65,
      "explanation": "Nhận lỗi về mình là dám nhìn lại bản thân, không đổ lỗi cho người khác khi xảy ra sai sót, đồng thời biết nhận trách nhiệm và tìm cách sửa chữa khuyết điểm của mình.",
      "sourceQuestion": "Câu 13. Nhận lỗi về mình là gì?",
      "id": "trang-1-c13-01"
    },
    {
      "type": "single",
      "question": "Vì sao người môn sinh Phật Quang Quyền phải tập nhận lỗi về mình?",
      "options": [
        "Vì nhận lỗi về mình giúp ta sống khiêm tốn, có trách nhiệm, biết tiến bộ và giữ gìn tình huynh đệ. Ngược lại, thói quen đổ lỗi cho người khác dễ làm mất đoàn kết và che giấu những thiếu sót của bản thân.",
        "Vì nhận lỗi về mình giúp ta tránh bị phạt, lấy được sự thương hại của thầy và né tránh trách nhiệm. Ngược lại, thói quen đổ lỗi cho người khác dễ làm ta bị ghét bỏ và bị đuổi khỏi võ đường.",
        "Vì nhận lỗi về mình giúp ta nổi bật, chứng tỏ bản lĩnh quân tử, biết hy sinh để nhận tội thay cho huynh đệ. Ngược lại, thói quen đổ lỗi cho người khác dễ làm ta trở nên hèn nhát trong mắt mọi người.",
        "Vì nhận lỗi về mình giúp ta che đậy được sự yếu kém, làm cho người khác tưởng ta là người có đạo đức và không soi mói thêm. Ngược lại, thói quen đổ lỗi cho người khác dễ làm ta bị điều tra kỹ hơn."
      ],
      "correctIndex": 0,
      "explanation": "Vì nhận lỗi về mình giúp ta sống khiêm tốn, có trách nhiệm, biết tiến bộ và giữ gìn tình huynh đệ. Ngược lại, thói quen đổ lỗi cho người khác dễ làm mất đoàn kết và che giấu những thiếu sót của bản thân.",
      "sourceQuestion": "Câu 14. Vì sao người môn sinh Phật Quang Quyền phải tập nhận lỗi về mình?",
      "id": "trang-1-c14-01"
    },
    {
      "type": "single",
      "question": "Người môn sinh Phật Quang Quyền thực hành hạnh nhận lỗi về mình như thế nào?",
      "options": [
        "Luôn nhìn lại lỗi của bản thân trước, chân thành sửa đổi những thiếu sót của mình và góp ý cho người khác bằng tinh thần yêu thương, xây dựng, không vì thành kiến hay ác cảm cá nhân.",
        "Luôn nhận vơ mọi lỗi lầm về mình kể cả khi không làm sai, nhanh chóng nhận lỗi để kết thúc tranh cãi và không bao giờ góp ý cho người khác để giữ hòa khí.",
        "Luôn tìm cách thanh minh trước khi nhận lỗi, miễn cưỡng sửa đổi những thiếu sót nếu bị ép buộc và chỉ trích gay gắt người khác bằng tinh thần cạnh tranh, không vì lợi ích chung.",
        "Luôn chờ đợi người khác nhận lỗi trước rồi mới nhận lỗi theo, âm thầm sửa đổi để không ai biết và góp ý cho người khác bằng tinh thần kẻ cả, bề trên để chứng tỏ mình hiểu biết hơn."
      ],
      "correctIndex": 0,
      "explanation": "Luôn nhìn lại lỗi của bản thân trước, chân thành sửa đổi những thiếu sót của mình và góp ý cho người khác bằng tinh thần yêu thương, xây dựng, không vì thành kiến hay ác cảm cá nhân.",
      "sourceQuestion": "Câu 15. Người môn sinh Phật Quang Quyền thực hành hạnh nhận lỗi về mình như thế nào?",
      "id": "trang-1-c15-01"
    },
    {
      "type": "definition",
      "question": "Theo lý thuyết, nhường nhịn là gì?",
      "sampleAnswer": "Nhường nhịn là biết dành phần thuận lợi, tốt đẹp cho người khác và sẵn sàng nhận phần khó khăn về mình. Đây là biểu hiện của lòng vị tha, tình thương yêu và sự tôn trọng đối với huynh đệ.",
      "matchThreshold": 0.65,
      "explanation": "Nhường nhịn là biết dành phần thuận lợi, tốt đẹp cho người khác và sẵn sàng nhận phần khó khăn về mình. Đây là biểu hiện của lòng vị tha, tình thương yêu và sự tôn trọng đối với huynh đệ.",
      "sourceQuestion": "Câu 16. Nhường nhịn là gì?",
      "id": "trang-1-c16-01"
    },
    {
      "type": "single",
      "question": "Vì sao người môn sinh Phật Quang Quyền phải biết nhường nhịn?",
      "options": [
        "Vì nhường nhịn giúp giảm bớt ích kỷ, vun bồi tình huynh đệ và xây dựng tập thể đoàn kết. Người biết nhường nhịn luôn được mọi người yêu quý, tin tưởng và kính trọng.",
        "Vì nhường nhịn giúp ta tránh được rắc rối, không phải vất vả tranh giành và xây dựng hình ảnh người tốt bụng. Người biết nhường nhịn luôn được mọi người sai vặt, lợi dụng nhưng được bình yên.",
        "Vì nhường nhịn giúp ta tích lũy công đức, mong cầu sự may mắn ở kiếp sau và xây dựng tương lai tốt đẹp. Người biết nhường nhịn luôn được thần linh phù hộ, che chở và thành công.",
        "Vì nhường nhịn giúp ta giấu đi sự yếu kém, không dám đối đầu trực diện và xây dựng vỏ bọc an toàn. Người biết nhường nhịn luôn được mọi người xem nhẹ, thương hại và không bị bắt nạt."
      ],
      "correctIndex": 0,
      "explanation": "Vì nhường nhịn giúp giảm bớt ích kỷ, vun bồi tình huynh đệ và xây dựng tập thể đoàn kết. Người biết nhường nhịn luôn được mọi người yêu quý, tin tưởng và kính trọng.",
      "sourceQuestion": "Câu 17. Vì sao người môn sinh Phật Quang Quyền phải biết nhường nhịn?",
      "id": "trang-1-c17-01"
    },
    {
      "type": "fill",
      "question": "Điền vào chỗ trống: Người môn sinh Phật Quang Quyền thực hành hạnh nhường nhịn như thế nào?\nBiết nhường phần tốt cho người khác, ______[1], chân thành tán thán ưu điểm của huynh đệ và ______[2].",
      "blanks": [
        "không tranh hơn thua về vật chất hay danh dự",
        "luôn đặt lợi ích chung lên trên lợi ích riêng của bản thân"
      ],
      "options": [
        "không tranh giành quyền lãnh đạo hay tiếng tăm",
        "không đòi hỏi phần thưởng hay sự đền đáp",
        "luôn nhún nhường trong mọi cuộc tranh luận gay gắt",
        "luôn đề cao sự đóng góp của mọi người xung quanh",
        "luôn nhận phần công việc nặng nhọc nhất về phần mình",
        "luôn giữ thái độ im lặng khi bị người khác hiểu lầm"
      ],
      "explanation": "Biết nhường phần tốt cho người khác, không tranh hơn thua về vật chất hay danh dự, chân thành tán thán ưu điểm của huynh đệ và luôn đặt lợi ích chung lên trên lợi ích riêng của bản thân.",
      "sourceQuestion": "Câu 18. Người môn sinh Phật Quang Quyền thực hành hạnh nhường nhịn như thế nào?",
      "id": "trang-1-c18-01"
    },
    {
      "type": "single",
      "question": "Người môn sinh Phật Quang Quyền rèn luyện bản thân để làm gì?",
      "options": [
        "Người môn sinh rèn luyện võ thuật, đạo đức và tâm hồn để trở thành người tốt, có ích cho gia đình, xã hội và góp phần xây dựng cuộc sống ngày càng tốt đẹp hơn.",
        "Người môn sinh rèn luyện võ thuật, nội công và chiêu thức để trở thành cao thủ, vô địch các giải đấu và góp phần làm rạng danh môn phái, võ đường.",
        "Người môn sinh rèn luyện võ thuật, thể lực và sức bền để trở thành người khỏe mạnh, không ốm đau bệnh tật và góp phần giảm gánh nặng y tế cho gia đình.",
        "Người môn sinh rèn luyện võ thuật, kinh doanh và ngoại ngữ để trở thành người thành đạt, giàu có và góp phần xây dựng kinh tế gia đình ngày càng sung túc hơn."
      ],
      "correctIndex": 0,
      "explanation": "Người môn sinh rèn luyện võ thuật, đạo đức và tâm hồn để trở thành người tốt, có ích cho gia đình, xã hội và góp phần xây dựng cuộc sống ngày càng tốt đẹp hơn.",
      "sourceQuestion": "Câu 19. Người môn sinh Phật Quang Quyền rèn luyện bản thân để làm gì?",
      "id": "trang-1-c19-01"
    },
    {
      "type": "truefalse",
      "question": "Tình huống: Cho rằng tập võ rất vất vả, một môn sinh khẳng định mình chỉ cần rèn luyện để khỏe mạnh bảo vệ bản thân, không cần quan tâm giúp đỡ ai hay lo việc tập thể, vì lo cho mình chưa xong thì lo cho ai. Theo lý thuyết, quan điểm này là Đúng hay Sai?",
      "answer": false,
      "explanation": "Sai. Vì sống chỉ cho bản thân là biểu hiện của ích kỷ. Người môn sinh chân chính phải biết yêu thương, giúp đỡ mọi người và đặt lợi ích chung lên trên lợi ích riêng.",
      "sourceQuestion": "Câu 20. Vì sao người môn sinh không nên chỉ nghĩ đến lợi ích của riêng mình?",
      "id": "trang-1-c20-01"
    },
    {
      "type": "single",
      "question": "Lý tưởng cao đẹp của người môn sinh Phật Quang Quyền là gì?",
      "options": [
        "Không ngừng học tập, rèn luyện và hoàn thiện bản thân để làm gương tốt cho mọi người, phụng sự cộng đồng và lan tỏa những giá trị đạo đức tốt đẹp đến cuộc đời.",
        "Không ngừng tập luyện, thi đấu và chinh phục các giải thưởng để làm rạng danh cá nhân, quảng bá môn phái và lan tỏa kỹ thuật võ học tinh hoa đến toàn thế giới.",
        "Không ngừng làm giàu, phát triển sự nghiệp và mở rộng kinh doanh để làm chỗ dựa vững chắc cho võ đường, tài trợ cộng đồng và lan tỏa sự thịnh vượng đến mọi người.",
        "Không ngừng tu tập, ăn chay và tụng kinh niệm Phật để cầu giải thoát cho bản thân, xa lánh trần tục và lan tỏa ánh sáng Phật pháp đến những người hữu duyên."
      ],
      "correctIndex": 0,
      "explanation": "Không ngừng học tập, rèn luyện và hoàn thiện bản thân để làm gương tốt cho mọi người, phụng sự cộng đồng và lan tỏa những giá trị đạo đức tốt đẹp đến cuộc đời.",
      "sourceQuestion": "Câu 21. Lý tưởng cao đẹp của người môn sinh Phật Quang Quyền là gì?",
      "id": "trang-1-c21-01"
    },
    {
      "type": "definition",
      "question": "Theo lý thuyết, chủ quan là gì?",
      "sampleAnswer": "Chủ quan là luôn cho ý kiến hoặc suy nghĩ của mình là đúng, không chịu lắng nghe, tiếp thu ý kiến của người khác và dễ xem nhẹ những điều hay của mọi người xung quanh.",
      "matchThreshold": 0.65,
      "explanation": "Chủ quan là luôn cho ý kiến hoặc suy nghĩ của mình là đúng, không chịu lắng nghe, tiếp thu ý kiến của người khác và dễ xem nhẹ những điều hay của mọi người xung quanh.",
      "sourceQuestion": "Câu 22. Chủ quan là gì?",
      "id": "trang-1-c22-01"
    },
    {
      "type": "single",
      "question": "Tác hại của tính chủ quan đối với người môn sinh Phật Quang Quyền là gì?",
      "options": [
        "Chủ quan làm cho con người khó học hỏi, khó tiến bộ, dễ xảy ra bất hòa trong tập thể và sinh tâm tự cao. Người chủ quan thường chỉ thấy cái đúng của mình mà không thấy được ưu điểm của người khác.",
        "Chủ quan làm cho con người mất đi tính cẩn thận, dễ mắc sai lầm trong thi đấu, gây chấn thương cho bản thân và sinh tâm tự ti. Người chủ quan thường chỉ thấy cái lợi trước mắt mà không thấy được rủi ro tiềm ẩn.",
        "Chủ quan làm cho con người trở nên lười biếng, ỷ lại vào năng khiếu, không chịu luyện tập cơ bản và sinh tâm lơ là. Người chủ quan thường chỉ thấy kỹ thuật khó mà không thấy được tầm quan trọng của nền tảng.",
        "Chủ quan làm cho con người bị cô lập, thiếu kỹ năng giao tiếp, dễ hiểu lầm ý đồ của đối phương và sinh tâm nghi ngờ. Người chủ quan thường chỉ tin vào cảm giác của mình mà không phân tích tình hình thực tế."
      ],
      "correctIndex": 0,
      "explanation": "Chủ quan làm cho con người khó học hỏi, khó tiến bộ, dễ xảy ra bất hòa trong tập thể và sinh tâm tự cao. Người chủ quan thường chỉ thấy cái đúng của mình mà không thấy được ưu điểm của người khác.",
      "sourceQuestion": "Câu 23. Tác hại của tính chủ quan đối với người môn sinh Phật Quang Quyền là gì?",
      "id": "trang-1-c23-01"
    },
    {
      "type": "single",
      "question": "Người môn sinh Phật Quang Quyền vượt qua tính chủ quan bằng cách nào?",
      "options": [
        "Phải biết khiêm tốn lắng nghe, tôn trọng ý kiến tập thể, tìm học những điều hay của người khác và vui vẻ chấp hành những quyết định chung. Biết nhìn thấy cái hay của người chính là cách giúp bản thân ngày càng tiến bộ và trưởng thành hơn.",
        "Phải biết tranh biện thẳng thắn, phản bác ý kiến sai trái, tự mình kiểm chứng mọi điều và kiên quyết bảo vệ quan điểm đúng. Biết bảo vệ chân lý chính là cách giúp bản thân không bị hòa tan và giữ vững lập trường.",
        "Phải biết im lặng quan sát, không đưa ra ý kiến cá nhân, làm theo mọi người để tránh xung đột và thụ động chấp hành quyết định chung. Biết nhún nhường hoàn toàn chính là cách giúp bản thân an toàn và dễ sống.",
        "Phải biết tự tin vào năng lực, nhưng cũng vờ lắng nghe ý kiến người khác, chắt lọc điều có lợi cho mình và chỉ chấp hành khi thấy phù hợp. Biết lợi dụng trí tuệ tập thể chính là cách giúp bản thân đạt được mục đích nhanh nhất."
      ],
      "correctIndex": 0,
      "explanation": "Phải biết khiêm tốn lắng nghe, tôn trọng ý kiến tập thể, tìm học những điều hay của người khác và vui vẻ chấp hành những quyết định chung. Biết nhìn thấy cái hay của người chính là cách giúp bản thân ngày càng tiến bộ và trưởng thành hơn.",
      "sourceQuestion": "Câu 24. Người môn sinh Phật Quang Quyền vượt qua tính chủ quan bằng cách nào?",
      "id": "trang-1-c24-01"
    },
    {
      "type": "definition",
      "question": "Theo lý thuyết, đối xử bình đẳng là gì?",
      "sampleAnswer": "Đối xử bình đẳng là tôn trọng, quan tâm và cư xử công bằng với mọi người, không thiên vị vì giàu nghèo, địa vị, tài năng hay danh tiếng.",
      "matchThreshold": 0.65,
      "explanation": "Đối xử bình đẳng là tôn trọng, quan tâm và cư xử công bằng với mọi người, không thiên vị vì giàu nghèo, địa vị, tài năng hay danh tiếng.",
      "sourceQuestion": "Câu 25. Đối xử bình đẳng là gì?",
      "id": "trang-1-c25-01"
    },
    {
      "type": "single",
      "question": "Vì sao người môn sinh Phật Quang Quyền phải biết đối xử bình đẳng?",
      "options": [
        "Vì mọi người đều đáng được tôn trọng và yêu thương. Đối xử bình đẳng giúp xây dựng tình đoàn kết, nuôi dưỡng lòng từ bi và tránh thái độ thiên vị hoặc xem thường người khác.",
        "Vì luật pháp quy định mọi người đều có quyền lợi ngang nhau. Đối xử bình đẳng giúp ta tránh bị kiện cáo, giữ gìn uy tín cá nhân và tránh thái độ phân biệt đối xử nơi công cộng.",
        "Vì những người yếu kém có thể đột nhiên trở nên tài giỏi. Đối xử bình đẳng giúp ta tạo thêm nhiều mối quan hệ dự phòng, nuôi dưỡng đồng minh và tránh việc đắc tội với người khác.",
        "Vì võ đường cần duy trì số lượng học viên đông đảo. Đối xử bình đẳng giúp giữ chân học viên, thu được nhiều học phí và tránh việc bị học viên bỏ đi vì cảm thấy bị phân biệt."
      ],
      "correctIndex": 0,
      "explanation": "Vì mọi người đều đáng được tôn trọng và yêu thương. Đối xử bình đẳng giúp xây dựng tình đoàn kết, nuôi dưỡng lòng từ bi và tránh thái độ thiên vị hoặc xem thường người khác.",
      "sourceQuestion": "Câu 26. Vì sao người môn sinh Phật Quang Quyền phải biết đối xử bình đẳng?",
      "id": "trang-1-c26-01"
    },
    {
      "type": "single",
      "question": "Người môn sinh Phật Quang Quyền thực hành hạnh bình đẳng như thế nào?",
      "options": [
        "Biết quan tâm đến mọi người như nhau, không chỉ chú ý đến người giỏi, nổi bật hay có điều kiện hơn mình. Đồng thời sẵn sàng chia sẻ, giúp đỡ những người gặp khó khăn và cư xử công bằng với tất cả mọi người.",
        "Biết chia đều phần thưởng cho mọi người như nhau, không phân biệt người có thành tích cao hay thấp. Đồng thời sẵn sàng xóa bỏ nội quy thưởng phạt để không ai cảm thấy buồn và cào bằng mọi cố gắng.",
        "Biết giao việc nặng nhẹ cho mọi người như nhau, không quan tâm đến sức khỏe, tuổi tác hay giới tính. Đồng thời sẵn sàng ép buộc những người gặp khó khăn phải hoàn thành chỉ tiêu để đảm bảo tính công bằng tuyệt đối.",
        "Biết thu học phí của mọi người như nhau, không miễn giảm cho ai dù hoàn cảnh khó khăn. Đồng thời sẵn sàng cung cấp tài liệu giống hệt nhau, không dạy riêng bất cứ ai để tránh sự tị nạnh trong tập thể."
      ],
      "correctIndex": 0,
      "explanation": "Biết quan tâm đến mọi người như nhau, không chỉ chú ý đến người giỏi, nổi bật hay có điều kiện hơn mình. Đồng thời sẵn sàng chia sẻ, giúp đỡ những người gặp khó khăn và cư xử công bằng với tất cả mọi người.",
      "sourceQuestion": "Câu 27. Người môn sinh Phật Quang Quyền thực hành hạnh bình đẳng như thế nào?",
      "id": "trang-1-c27-01"
    },
    {
      "type": "definition",
      "question": "Theo lý thuyết, trợ duyên là gì?",
      "sampleAnswer": "Trợ duyên là giúp đỡ, tạo điều kiện thuận lợi để người khác học tập, rèn luyện, làm việc và phát triển những điều tốt đẹp trong cuộc sống.",
      "matchThreshold": 0.65,
      "explanation": "Trợ duyên là giúp đỡ, tạo điều kiện thuận lợi để người khác học tập, rèn luyện, làm việc và phát triển những điều tốt đẹp trong cuộc sống.",
      "sourceQuestion": "Câu 28. Trợ duyên là gì?",
      "id": "trang-1-c28-01"
    },
    {
      "type": "single",
      "question": "Vì sao người môn sinh Phật Quang Quyền phải biết trợ duyên cho huynh đệ?",
      "options": [
        "Vì trợ duyên giúp huynh đệ cùng tiến bộ, xây dựng tinh thần đoàn kết và tạo nên một tập thể vững mạnh. Biết giúp người khác thành công cũng là cách bồi dưỡng đạo đức và nhân cách cho chính mình.",
        "Vì trợ duyên giúp ta ghi điểm trong mắt võ sư, tạo ảnh hưởng lớn trong võ đường và tạo nên một nhóm đàn em trung thành. Biết giúp người khác cũng là cách xây dựng thế lực vững chắc cho tương lai.",
        "Vì trợ duyên giúp huynh đệ mắc nợ ân tình, dễ dàng nhờ vả lại khi cần thiết và tạo nên sự ràng buộc qua lại. Biết giúp người khác thành công cũng là cách đầu tư khôn ngoan cho chính mình.",
        "Vì trợ duyên giúp ta rèn luyện khả năng chỉ đạo, thể hiện sự am hiểu võ thuật và chứng tỏ bản thân vượt trội hơn người khác. Biết giúp người khác sửa sai cũng là cách tự thỏa mãn lòng kiêu hãnh của chính mình."
      ],
      "correctIndex": 0,
      "explanation": "Vì trợ duyên giúp huynh đệ cùng tiến bộ, xây dựng tinh thần đoàn kết và tạo nên một tập thể vững mạnh. Biết giúp người khác thành công cũng là cách bồi dưỡng đạo đức và nhân cách cho chính mình.",
      "sourceQuestion": "Câu 29. Vì sao người môn sinh Phật Quang Quyền phải biết trợ duyên cho huynh đệ?",
      "id": "trang-1-c29-01"
    },
    {
      "type": "single",
      "question": "Người môn sinh Phật Quang Quyền thực hành hạnh trợ duyên như thế nào?",
      "options": [
        "Luôn sẵn sàng giúp đỡ huynh đệ khi gặp khó khăn, hỗ trợ nhau trong học tập, rèn luyện và công việc chung; biết hợp tác, khích lệ và vui mừng trước sự tiến bộ của người khác, không ganh đua hay tranh công.",
        "Luôn sẵn sàng làm thay phần việc của huynh đệ khi họ gặp khó khăn, bao che lỗi lầm trong rèn luyện và công việc chung; biết nhường nhịn, lùi lại phía sau và luôn nhường mọi phần thưởng cho người khác.",
        "Luôn nhiệt tình chỉ dạy huynh đệ bằng thái độ nghiêm khắc, ép buộc nhau trong học tập, rèn luyện và công việc chung; biết chỉ trích, chê bai để người khác cố gắng hơn và luôn tranh cãi để tìm ra cái sai.",
        "Luôn cho huynh đệ vay mượn tiền bạc khi gặp khó khăn, rủ rê nhau đi chơi giải trí sau những giờ tập luyện căng thẳng; biết nịnh nọt, tâng bốc sự tiến bộ của người khác để lấy lòng và tạo quan hệ tốt."
      ],
      "correctIndex": 0,
      "explanation": "Luôn sẵn sàng giúp đỡ huynh đệ khi gặp khó khăn, hỗ trợ nhau trong học tập, rèn luyện và công việc chung; biết hợp tác, khích lệ và vui mừng trước sự tiến bộ của người khác, không ganh đua hay tranh công.",
      "sourceQuestion": "Câu 30. Người môn sinh Phật Quang Quyền thực hành hạnh trợ duyên như thế nào?",
      "id": "trang-1-c30-01"
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
