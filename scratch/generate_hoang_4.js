const fs = require('fs');
const path = '/Users/luanph/Project other/MARTIAL WAY THEORY/content/exam-bank/hoang-4.json';

const data = {
  "rankId": "hoang-4",
  "beltId": "yellow",
  "lessonId": "yellow-lesson-04",
  "questions": [
    {
      "type": "multiple",
      "question": "Có mấy trường hợp cần phục tùng trong việc xử thế?",
      "options": [
        "Phục tùng lẽ phải: Tôn trọng và làm theo điều đúng đắn.",
        "Phục tùng đa số: Tôn trọng quyết định chung của tập thể vì thường phản ánh ý kiến của nhiều người.",
        "Phục tùng thượng cấp: Thể hiện tinh thần kỷ luật và tôn trọng tổ chức.",
        "Phục tùng để tỏ thiện chí: Biết nhường nhịn đúng lúc để giữ hòa khí, tạo sự cảm thông và giúp công việc được thuận lợi hơn.",
        "Phục tùng kẻ mạnh: Tôn trọng và làm theo những người có sức mạnh thể chất hoặc quyền lực tuyệt đối.",
        "Phục tùng dư luận: Tôn trọng những tin đồn trên mạng xã hội vì thường phản ánh xu hướng của đám đông.",
        "Phục tùng tiền bạc: Thể hiện sự khôn ngoan và tôn trọng những người giàu có, tài trợ cho võ đường.",
        "Phục tùng để lấy lòng: Biết nịnh bợ đúng lúc để giữ lợi ích, tạo sự thiên vị và giúp thăng tiến nhanh chóng."
      ],
      "correctIndices": [0, 1, 2, 3],
      "explanation": "Có 4 trường hợp cần phục tùng trong việc xử thế: Phục tùng lẽ phải, Phục tùng đa số, Phục tùng thượng cấp, Phục tùng để tỏ thiện chí.",
      "sourceQuestion": "Câu 1. Có mấy trường hợp cần phục tùng trong việc xử thế? Hãy kể ra và giải thích đại cương.",
      "id": "hoang-4-c01-01"
    },
    {
      "type": "single",
      "question": "Đức tính phục tùng có phản lại đức tính tự chủ không? Hãy giải thích.",
      "options": [
        "Đức tính phục tùng không phản lại đức tính tự chủ, mà ngược lại còn thể hiện khả năng tự chủ của con người. Người biết tôn trọng lẽ phải, ý kiến đúng đắn và chấp hành kỷ luật là người biết làm chủ bản thân. Danh ngôn: “Kẻ nào muốn lãnh đạo mọi người hãy biết phục vụ mọi người.”",
        "Đức tính phục tùng luôn phản lại đức tính tự chủ, làm thui chột khả năng tự chủ của con người. Người biết tôn trọng lẽ phải, ý kiến đúng đắn và chấp hành kỷ luật là người nhu nhược, dễ bị sai bảo. Danh ngôn: “Kẻ nào muốn lãnh đạo mọi người hãy biết đứng trên mọi người.”",
        "Đức tính phục tùng không phản lại mà hoàn toàn giống với đức tính tự chủ của con người. Người luôn tự quyết định mọi việc và từ chối chấp hành kỷ luật mới là người biết làm chủ bản thân. Danh ngôn: “Kẻ nào muốn phục vụ mọi người hãy biết lãnh đạo mọi người.”",
        "Đức tính phục tùng thỉnh thoảng phản lại đức tính tự chủ, gây ra sự mâu thuẫn trong nội tâm con người. Người luôn cãi lời và vi phạm kỷ luật là người thể hiện được cái tôi, bản lĩnh cá nhân. Danh ngôn: “Kẻ nào muốn làm chủ bản thân hãy biết chống lại mọi người.”"
      ],
      "correctIndex": 0,
      "explanation": "Đức tính phục tùng không phản lại đức tính tự chủ, mà ngược lại còn thể hiện khả năng tự chủ của con người. Người biết tôn trọng lẽ phải, ý kiến đúng đắn... chấp hành kỷ luật là người biết làm chủ bản thân...",
      "sourceQuestion": "Câu 2. Đức tính phục tùng có phản lại đức tính tự chủ không? Hãy giải thích và dẫn chứng.",
      "id": "hoang-4-c02-01"
    },
    {
      "type": "single",
      "question": "Điểm khác biệt giữa tham vọng và chí hướng là gì?",
      "options": [
        "Tham vọng là mong muốn đạt được một mục đích nào đó, thường thiên về lợi ích, thành công hoặc sự thỏa mãn của bản thân. Chí hướng là mục tiêu cao đẹp mà con người kiên trì theo đuổi. Tham vọng có thể tốt hoặc xấu, còn chí hướng thường hướng đến giá trị tốt đẹp lâu dài.",
        "Tham vọng là mong muốn đạt được một mục đích nào đó, thường thiên về sự hy sinh, cống hiến hoặc sự khổ hạnh của bản thân. Chí hướng là mục tiêu vật chất mà con người kiên trì tìm kiếm. Tham vọng luôn luôn tốt đẹp, còn chí hướng thường hướng đến sự thỏa mãn cá nhân nhất thời.",
        "Tham vọng là mong muốn thoát khỏi một hoàn cảnh nào đó, thường thiên về sự lẩn tránh, an phận hoặc sự thụ động của bản thân. Chí hướng là mục tiêu viển vông mà con người không bao giờ đạt được. Tham vọng luôn luôn xấu xa, còn chí hướng thường hướng đến giá trị không tưởng.",
        "Tham vọng là sự ảo tưởng về khả năng của bản thân, thường thiên về sự khoe khoang, ngạo mạn. Chí hướng là mục tiêu ngắn hạn mà con người dễ dàng đạt được. Tham vọng không thể thay đổi, còn chí hướng thường thay đổi liên tục theo hoàn cảnh sống."
      ],
      "correctIndex": 0,
      "explanation": "Tham vọng là sự mong muốn đạt được một mục đích nào đó, thường thiên về lợi ích... Chí hướng là mục tiêu cao đẹp mà con người kiên trì theo đuổi... Tham vọng có thể tốt hoặc xấu... còn chí hướng thường hướng đến những giá trị tốt đẹp...",
      "sourceQuestion": "Câu 3. Hãy giải thích điểm dị biệt giữa tham vọng và chí hướng.",
      "id": "hoang-4-c03-01"
    },
    {
      "type": "single",
      "question": "Khi nào tham vọng trở nên tốt đẹp và cần thiết?",
      "options": [
        "Tham vọng trở nên tốt đẹp và cần thiết khi được chí hướng đúng đắn chỉ đạo. Ai cũng có tham vọng, nhưng để biến tham vọng thành hiện thực và có ích thì phải có lý tưởng, sự hiểu biết và nghị lực theo đuổi.",
        "Tham vọng trở nên tốt đẹp và cần thiết khi được tiền bạc hậu thuẫn chỉ đạo. Chỉ những người giàu mới có tham vọng, và để biến tham vọng thành hiện thực thì phải có quyền lực, sự khôn lỏi và thủ đoạn theo đuổi.",
        "Tham vọng trở nên tốt đẹp và cần thiết khi được sự ganh đua ích kỷ chỉ đạo. Không phải ai cũng có tham vọng, và để biến tham vọng thành hiện thực thì phải có sự tàn nhẫn, dẫm đạp lên người khác và bất chấp thủ đoạn theo đuổi.",
        "Tham vọng trở nên tốt đẹp và cần thiết khi được dư luận xã hội tung hô chỉ đạo. Ít người có tham vọng, và để biến tham vọng thành hiện thực thì phải có sự nổi tiếng, sự may mắn và ngoại hình đẹp theo đuổi."
      ],
      "correctIndex": 0,
      "explanation": "Tham vọng trở nên tốt đẹp và cần thiết khi được chí hướng đúng đắn chỉ đạo. Ai cũng có tham vọng, nhưng để biến tham vọng thành hiện thực và có ích thì phải có lý tưởng, sự hiểu biết và nghị lực theo đuổi.",
      "sourceQuestion": "Câu 4. Khi nào tham vọng trở nên tốt đẹp và cần thiết?",
      "id": "hoang-4-c04-01"
    },
    {
      "type": "multiple",
      "question": "Sự khác nhau giữa danh dự và tự ái là gì?",
      "options": [
        "Danh dự là giá trị tinh thần và uy tín được tạo nên từ việc thực hiện tốt trách nhiệm, nghĩa vụ của mình.",
        "Tự ái là phản ứng tâm lý khi cái tôi bị đụng chạm hoặc xúc phạm.",
        "Người trọng danh dự luôn nghĩ đến tập thể, giữ gìn uy tín và hành động điềm đạm nhưng cương quyết để bảo vệ những giá trị tốt đẹp.",
        "Người tự ái thường chỉ nghĩ đến bản thân, dễ nóng giận và phản ứng thiếu kiềm chế khi bị đụng chạm.",
        "Danh dự là giá trị vật chất và tài sản được tạo nên từ việc kinh doanh thành công, mang lại nhiều lợi nhuận cho mình.",
        "Tự ái là phản ứng sinh lý khi cơ thể bị mệt mỏi hoặc chấn thương.",
        "Người trọng danh dự luôn nghĩ đến cá nhân mình, phô trương quyền lực và hành động tàn bạo để bảo vệ địa vị.",
        "Người tự ái thường nghĩ đến tập thể, dễ nhượng bộ và phản ứng bình tĩnh khi bị đụng chạm để giữ hòa khí."
      ],
      "correctIndices": [0, 1, 2, 3],
      "explanation": "Danh dự là giá trị tinh thần... Tự ái là phản ứng tâm lý... Người trọng danh dự luôn nghĩ đến tập thể... Người tự ái thường chỉ nghĩ đến bản thân, dễ nóng giận...",
      "sourceQuestion": "Câu 5. Danh dự là gì? Tự ái là gì? Trọng danh dự và tự ái khác nhau như thế nào?",
      "id": "hoang-4-c05-01"
    },
    {
      "type": "single",
      "question": "Trường hợp phải lựa chọn giữa việc coi nhẹ danh dự hoặc gạt bỏ tự ái, ta nên chọn đường nào?",
      "options": [
        "Ta nên gạt bỏ tự ái, vì tự ái chỉ là phản ứng cảm xúc mang tính cá nhân. Trong khi đó, danh dự là giá trị tinh thần cao quý cần được giữ gìn và bảo vệ. Biết gạt bỏ tự ái để giữ gìn danh dự chung cũng chính là giữ gìn danh dự của bản thân.",
        "Ta nên coi nhẹ danh dự, vì danh dự chỉ là vẻ bề ngoài mang tính hình thức. Trong khi đó, tự ái là giá trị cảm xúc thiêng liêng cần được giữ gìn và bảo vệ. Biết coi nhẹ danh dự chung để bảo vệ tự ái cá nhân cũng chính là bảo vệ cái tôi của bản thân.",
        "Ta nên bảo vệ cả hai cùng lúc, vì tự ái và danh dự là hai mặt không thể tách rời mang tính sống còn. Biết dung hòa tự ái để nâng cao danh dự chung cũng chính là đánh bóng tên tuổi của bản thân.",
        "Ta nên vứt bỏ cả hai, vì tự ái hay danh dự đều là những thứ hão huyền mang tính phù phiếm. Trong khi đó, tiền bạc là giá trị vật chất thực tế cần được giữ gìn và bảo vệ. Biết vứt bỏ danh dự để kiếm tiền cũng chính là tự lo cho bản thân."
      ],
      "correctIndex": 0,
      "explanation": "Ta nên gạt bỏ tự ái, vì tự ái chỉ là phản ứng cảm xúc mang tính cá nhân. Trong khi đó, danh dự là giá trị tinh thần cao quý cần được giữ gìn và bảo vệ. Khi sống trong tập thể, biết gạt bỏ tự ái để giữ gìn danh dự chung cũng chính là giữ gìn danh dự của bản thân.",
      "sourceQuestion": "Câu 6. Trường hợp phải lựa chọn giữa việc coi nhẹ danh dự hoặc gạt bỏ tự ái, ta nên chọn đường nào? Hãy giải thích.",
      "id": "hoang-4-c06-01"
    },
    {
      "type": "multiple",
      "question": "Phương pháp sư phạm điều hành một lớp tập võ theo tiêu chuẩn bao gồm các bước nào?",
      "options": [
        "Tập hợp lớp, chỉnh đốn đội hình và chào kính.",
        "Khởi động và điều tức, làm nóng cơ thể từ đầu đến chân, hít sâu, thở dài.",
        "Ôn luyện kỹ thuật, đòn thế và bài tập cũ.",
        "Giới thiệu và hướng dẫn kỹ thuật mới, từ chậm đến nhanh, từ nhẹ đến mạnh.",
        "Thực hành và ứng dụng, tập lặp lại nhiều lần để đạt độ chính xác, tốc độ, sức mạnh.",
        "Đấu luyện, sửa sai và giải đáp thắc mắc.",
        "Điều tức, chỉnh trang võ phục và chào kính kết thúc buổi tập.",
        "Thu học phí, điểm danh và kiểm tra đồng phục nghiêm ngặt.",
        "Thiền định trong hai tiếng đồng hồ, ép xác và tuyệt thực trước khi tập.",
        "Múa sư tử, đánh trống và hô hào khẩu hiệu môn phái.",
        "Bắt cặp đánh nhau tự do không cần bảo hộ để kiểm tra thực lực.",
        "Trừng phạt thân thể những võ sinh đi trễ hoặc quên bài."
      ],
      "correctIndices": [0, 1, 2, 3, 4, 5, 6],
      "explanation": "Gồm các bước: Tập hợp chào kính, Khởi động, Ôn cũ, Hướng dẫn mới, Thực hành ứng dụng, Đấu luyện sửa sai, Điều tức kết thúc.",
      "sourceQuestion": "Câu 7. Trình bày phương pháp sư phạm điều hành một lớp tập võ theo tiêu chuẩn Liên đoàn Võ thuật Cổ truyền Việt Nam.",
      "id": "hoang-4-c07-01"
    },
    {
      "type": "definition",
      "question": "Theo lý thuyết, nhận định về tương quan giữa cá nhân với tập thể ra sao?",
      "sampleAnswer": "Cá nhân và tập thể có mối quan hệ gắn bó và trách nhiệm lẫn nhau. Tập thể tạo điều kiện cho cá nhân phát triển, còn cá nhân phải biết hòa hợp và đóng góp cho tập thể thì mới đạt được thành công.",
      "matchThreshold": 0.65,
      "explanation": "Cá nhân và tập thể có mối quan hệ gắn bó và trách nhiệm lẫn nhau. Tập thể tạo điều kiện cho cá nhân phát triển, còn cá nhân phải biết hòa hợp và đóng góp cho tập thể thì mới đạt được thành công.",
      "sourceQuestion": "Câu 8. Nhận định về tương quan giữa cá nhân với tập thể ra sao?",
      "id": "hoang-4-c08-01"
    },
    {
      "type": "single",
      "question": "Phật Quang Quyền chỉ chú trọng tới mục đích quảng bá võ thuật không thôi, hay chú trọng tới mục đích gì khác nữa?",
      "options": [
        "Quảng bá và phát triển võ thuật là một mục tiêu quan trọng của môn phái. Tuy nhiên, mục tiêu cao hơn là xây dựng một nền võ đạo dân tộc và giáo dục đạo đức cho con người. Phật Quang Quyền lấy võ thuật làm phương tiện để truyền dạy đạo đức.",
        "Quảng bá và phát triển võ thuật là mục tiêu duy nhất của môn phái. Không có mục tiêu xây dựng võ đạo hay giáo dục đạo đức, vì đó là việc của nhà trường. Phật Quang Quyền lấy võ thuật làm mục đích cuối cùng để kinh doanh và thu lợi nhuận.",
        "Quảng bá và phát triển võ thuật là mục tiêu phụ của môn phái. Mục tiêu cao hơn là cạnh tranh với các môn phái khác và giành độc quyền giảng dạy. Phật Quang Quyền lấy võ thuật làm phương tiện để tiêu diệt các đối thủ cạnh tranh trên thị trường.",
        "Quảng bá và phát triển võ thuật không phải là mục tiêu của môn phái. Mục tiêu duy nhất là truyền bá tôn giáo và giáo dục tín đồ cho chùa. Phật Quang Quyền lấy võ thuật làm vỏ bọc để thu hút người dân đến đóng góp tài chính."
      ],
      "correctIndex": 0,
      "explanation": "Quảng bá và phát triển võ thuật là một mục tiêu quan trọng... Tuy nhiên, mục tiêu cao hơn là xây dựng một nền võ đạo dân tộc và giáo dục đạo đức cho con người. Vì vậy, Phật Quang Quyền lấy võ thuật làm phương tiện để truyền dạy đạo đức...",
      "sourceQuestion": "Câu 9. Phật Quang Quyền chỉ chú trọng tới mục đích quảng bá võ thuật không thôi, hay chú trọng tới mục đích gì khác nữa? Hãy giải thích.",
      "id": "hoang-4-c09-01"
    },
    {
      "type": "single",
      "question": "Có thể đạt tới trình độ võ đạo mà không phải qua trình độ võ thuật được không?",
      "options": [
        "Muốn đạt đến trình độ võ đạo, trước hết phải trải qua quá trình rèn luyện võ thuật. Võ thuật là nền tảng về kỹ năng và chuyên môn, còn võ đạo là sự phát triển cao hơn về đạo đức. Vì vậy, võ đạo không tách rời võ thuật mà được xây dựng trên nền tảng võ thuật.",
        "Có thể đạt đến trình độ võ đạo mà không cần rèn luyện võ thuật. Võ thuật chỉ là môn rèn luyện thể lực không quan trọng, còn võ đạo là sự giác ngộ về lý thuyết. Vì vậy, võ đạo tách rời hoàn toàn võ thuật, chỉ cần đọc nhiều sách là có võ đạo.",
        "Muốn đạt đến trình độ võ đạo, phải từ bỏ quá trình rèn luyện võ thuật. Võ thuật là nguồn gốc của bạo lực, còn võ đạo là sự yêu thương hòa bình. Vì vậy, võ đạo đối lập với võ thuật, người có võ đạo không bao giờ biết đánh võ.",
        "Có thể đạt đến trình độ võ thuật mà không cần học võ đạo, nhưng ngược lại thì không. Võ thuật là đích đến cuối cùng, còn võ đạo chỉ là lớp vỏ bọc ngụy trang. Vì vậy, võ đạo chỉ dành cho những người yếu đuối không tập được võ thuật."
      ],
      "correctIndex": 0,
      "explanation": "Muốn đạt đến trình độ võ đạo, trước hết phải trải qua quá trình rèn luyện võ thuật. Võ thuật là nền tảng... còn võ đạo là sự phát triển cao hơn về đạo đức... Vì vậy, võ đạo không tách rời võ thuật mà được xây dựng trên nền tảng võ thuật...",
      "sourceQuestion": "Câu 10. Có thể đạt tới trình độ võ đạo mà không phải qua trình độ võ thuật được không?",
      "id": "hoang-4-c10-01"
    },
    {
      "type": "single",
      "question": "Đạo Nhân của môn sinh Phật Quang Quyền là gì? Ta có đối xử tốt với người đối xử xấu với ta không?",
      "options": [
        "Đạo Nhân là thương yêu con người trên tinh thần thượng võ, bao dung và giúp đỡ dưới sự hướng dẫn của trí tuệ. Chúng ta làm điều tốt vì đó là điều đúng nên làm. Khi gặp người đối xử xấu, vẫn giữ lòng bao dung, tùy trường hợp mà nhắc nhở, cảm hóa. Làm vì lợi ích người khác, không mong cầu đền đáp.",
        "Đạo Nhân là đánh bại con người trên tinh thần thực chiến, áp đảo và thị uy dưới sự hướng dẫn của sức mạnh. Chúng ta chỉ làm điều tốt với người có ích cho mình. Khi gặp người đối xử xấu, phải lập tức trả đũa, không nương tay để cảnh cáo. Làm vì uy danh cá nhân, mong cầu được sợ hãi.",
        "Đạo Nhân là xa lánh con người trên tinh thần ẩn dật, nhường nhịn và trốn tránh dưới sự hướng dẫn của sự nhút nhát. Chúng ta làm điều tốt vì sợ bị người khác chê cười. Khi gặp người đối xử xấu, phải cam chịu, im lặng và khóc lóc. Làm vì sợ hãi người khác, mong cầu được yên thân.",
        "Đạo Nhân là lợi dụng con người trên tinh thần ngoại giao, khéo léo và thảo mai dưới sự hướng dẫn của sự mưu mô. Chúng ta làm điều tốt vì muốn người ta mắc nợ mình. Khi gặp người đối xử xấu, ngoài mặt vui vẻ nhưng trong lòng thù dai, chờ cơ hội báo thù. Làm vì lợi ích bản thân, mong cầu sự đền đáp gấp bội."
      ],
      "correctIndex": 0,
      "explanation": "Đạo Nhân... là thương yêu con người trên tinh thần thượng võ... Chúng ta làm điều tốt không phải vì người đối xử tốt với mình, mà vì đó là điều đúng... Khi gặp người đối xử chưa tốt, vẫn giữ lòng bao dung... Thực hành Đạo Nhân là làm vì lợi ích của người khác, không mong cầu sự khen ngợi...",
      "sourceQuestion": "Câu 11. Đạo Nhân của môn sinh Phật Quang Quyền là gì? Có phải vì người đối xử tốt mà ta tốt với họ không? Nếu họ đối xử xấu thì ta phải thế nào?",
      "id": "hoang-4-c11-01"
    },
    {
      "type": "multiple",
      "question": "Để có sức khỏe tốt, môn sinh Phật Quang Quyền cần thực hiện những nguyên tắc nào?",
      "options": [
        "Điều độ: Giữ chừng mực trong ăn uống, nghỉ ngơi, làm việc và giải trí để bảo vệ và phát triển sức khỏe.",
        "Chuyên cần luyện tập võ thuật: Rèn luyện thường xuyên để tăng cường thể chất, ý chí và tránh xa các thói hư tật xấu.",
        "Bền bỉ trước thử thách: Kiên trì, nhẫn nại và không ngại khó khăn để rèn luyện sức khỏe, nghị lực và bản lĩnh trong cuộc sống.",
        "Hưởng thụ tối đa: Ăn uống thỏa thích các món ngon, ngủ nướng không giới hạn để cơ thể được nghỉ ngơi tuyệt đối.",
        "Bồi bổ thuốc quý: Thường xuyên mua các loại nhân sâm, yến sào đắt tiền để uống thay vì phải tập luyện mệt nhọc.",
        "Né tránh thử thách: Lảng tránh mọi công việc nặng nhọc, chọn việc nhẹ nhàng để bảo tồn sức lực và không bị chấn thương."
      ],
      "correctIndices": [0, 1, 2],
      "explanation": "Cần thực hiện ba nguyên tắc: Điều độ, Chuyên cần luyện tập võ thuật, Bền bỉ trước thử thách.",
      "sourceQuestion": "Câu 12. Quan niệm về sống khỏe của môn sinh Phật Quang Quyền ra sao?",
      "id": "hoang-4-c12-01"
    },
    {
      "type": "definition",
      "question": "Theo lý thuyết, về giá trị luân lý, môn sinh Phật Quang Quyền phải có bổn phận ra sao?",
      "sampleAnswer": "Môn sinh Phật Quang Quyền có bổn phận góp phần xây dựng xã hội ngày càng tốt đẹp hơn, nuôi dưỡng tình thương yêu giữa con người với nhau, góp phần làm cho đất nước hưng thịnh và phát huy tinh thần võ đạo trong cộng đồng.",
      "matchThreshold": 0.65,
      "explanation": "Môn sinh Phật Quang Quyền có bổn phận góp phần xây dựng xã hội ngày càng tốt đẹp hơn, nuôi dưỡng tình thương yêu giữa con người với nhau, góp phần làm cho đất nước hưng thịnh và phát huy tinh thần võ đạo trong cộng đồng.",
      "sourceQuestion": "Câu 13. Về giá trị luân lý, môn sinh Phật Quang Quyền phải có bổn phận ra sao?",
      "id": "hoang-4-c13-01"
    },
    {
      "type": "single",
      "question": "Muốn có đức tính tự chủ, phải rèn luyện ra sao?",
      "options": [
        "Muốn có đức tính tự chủ, phải luôn giữ bình tĩnh trước mọi biến động của hoàn cảnh, rèn luyện sự quan sát và khả năng làm chủ cảm xúc của mình. Đồng thời, cần tu dưỡng nội tâm để tâm hồn luôn ung dung, không bị chi phối bởi những ham muốn.",
        "Muốn có đức tính tự chủ, phải luôn tỏ ra độc đoán trước mọi người xung quanh, rèn luyện tiếng quát tháo và khả năng dọa nạt để áp đảo người khác. Đồng thời, cần tích lũy tiền bạc để cuộc sống luôn xa hoa, không bị chi phối bởi những người nghèo.",
        "Muốn có đức tính tự chủ, phải luôn che giấu mọi cảm xúc của bản thân, rèn luyện khuôn mặt vô hồn và khả năng vô cảm trước nỗi đau. Đồng thời, cần cắt đứt mọi mối quan hệ xã hội để tâm trí luôn trống rỗng, không bị chi phối bởi tình cảm.",
        "Muốn có đức tính tự chủ, phải luôn phản đối mọi ý kiến của người khác, rèn luyện tài cãi vã và khả năng bảo thủ đến cùng. Đồng thời, cần theo đuổi những tham vọng lớn lao để bản thân luôn bận rộn, không bị chi phối bởi sự nhàm chán."
      ],
      "correctIndex": 0,
      "explanation": "Muốn có đức tính tự chủ, phải luôn giữ bình tĩnh trước mọi biến động của hoàn cảnh, rèn luyện sự quan sát và khả năng làm chủ cảm xúc... tu dưỡng nội tâm để tâm hồn luôn ung dung, thanh thản, không bị chi phối bởi những tham vọng...",
      "sourceQuestion": "Câu 14. Muốn có đức tính tự chủ, phải rèn luyện ra sao?",
      "id": "hoang-4-c14-01"
    },
    {
      "type": "single",
      "question": "Khi nào chúng ta dám thẳng thắn nhìn nhận những lỗi lầm mà không sợ uy tín bị giảm?",
      "options": [
        "Chúng ta sẽ dám thẳng thắn nhìn nhận lỗi lầm khi tin vào thực tài, thực đức và những việc đúng đắn mình đang làm. Đó là biểu hiện của người hiểu và tin vào giá trị chân chính của bản thân.",
        "Chúng ta sẽ dám thẳng thắn nhìn nhận lỗi lầm khi bị người khác bắt quả tang và có đủ bằng chứng không thể chối cãi. Đó là biểu hiện của người khôn ngoan, biết nhận lỗi để được giảm nhẹ hình phạt.",
        "Chúng ta sẽ dám thẳng thắn nhìn nhận lỗi lầm khi lỗi đó là lỗi nhỏ, không ảnh hưởng nhiều đến thu nhập và danh tiếng của mình. Đó là biểu hiện của người biết tính toán thiệt hơn để bảo vệ bản thân.",
        "Chúng ta sẽ dám thẳng thắn nhìn nhận lỗi lầm khi muốn đóng vai kẻ yếu đuối để nhận được sự thương hại và bao che của đám đông. Đó là biểu hiện của người thao túng tâm lý, giả vờ nhận lỗi để trốn trách nhiệm."
      ],
      "correctIndex": 0,
      "explanation": "Chúng ta sẽ dám thẳng thắn nhìn nhận lỗi lầm khi tin vào thực tài, thực đức và những việc đúng đắn mình đang làm. Đó là biểu hiện của người hiểu và tin vào giá trị chân chính của bản thân",
      "sourceQuestion": "Câu 15. Khi nào chúng ta dám thẳng thắn nhìn nhận những lỗi lầm mà không sợ uy tín bị giảm?",
      "id": "hoang-4-c15-01"
    },
    {
      "type": "multiple",
      "question": "Võ học theo nghĩa rộng và nghĩa hẹp được hiểu ra sao?",
      "options": [
        "Theo nghĩa rộng: Võ học là một hoạt động văn hóa và sinh hoạt xã hội, gắn liền với đời sống của cộng đồng và dân tộc.",
        "Theo nghĩa hẹp: Võ học là một ngành học chuyên nghiên cứu, giảng dạy và rèn luyện các kiến thức, kỹ năng và phương pháp võ thuật.",
        "Theo nghĩa rộng: Võ học là một công cụ bạo lực để áp bức giai cấp, gắn liền với lịch sử chiến tranh của nhân loại.",
        "Theo nghĩa hẹp: Võ học là một trò chơi giải trí chuyên cung cấp các màn xiếc, ảo thuật và biểu diễn đường phố."
      ],
      "correctIndices": [0, 1],
      "explanation": "Theo nghĩa rộng: là hoạt động văn hóa và sinh hoạt xã hội. Theo nghĩa hẹp: là một ngành học chuyên nghiên cứu, giảng dạy và rèn luyện các kiến thức, kỹ năng...",
      "sourceQuestion": "Câu 16. Võ học theo nghĩa rộng và nghĩa hẹp được hiểu ra sao?",
      "id": "hoang-4-c16-01"
    },
    {
      "type": "single",
      "question": "Hai tính chất trong tâm một người đệ tử Phật chân chính là gì?",
      "options": [
        "Thấy rõ cuộc đời là vô thường, giả tạm, nên không tham lam, chấp thủ, tranh giành hay thù hận. Có lòng từ bi, yêu thương chúng sinh, nên tận tụy phụng sự và giúp đỡ mọi người. Nhờ đó, tâm hồn được an lạc.",
        "Thấy rõ cuộc đời là trường tồn, vĩnh cửu, nên ra sức thu vén tài sản, tích trữ vàng bạc hay đất đai. Có lòng đố kỵ, thù ghét chúng sinh, nên dùng quyền lực áp bức và bóc lột mọi người. Nhờ đó, gia tộc được vinh hoa.",
        "Thấy rõ cuộc đời là bể khổ vô tận, không thể thay đổi, nên sinh tâm chán nản, buông xuôi hay tự tử. Có lòng oán hận, trách móc số phận, nên thường xuyên than vãn và đòi hỏi sự đền bù từ mọi người. Nhờ đó, tâm hồn chìm trong bóng tối.",
        "Thấy rõ cuộc đời là một trò chơi may rủi, nên đam mê cờ bạc, cá cược hay tìm kiếm cảm giác mạnh. Có lòng tham lam, lợi dụng chúng sinh, nên chuyên lừa gạt và trục lợi từ mọi người. Nhờ đó, túi tiền được rủng rỉnh."
      ],
      "correctIndex": 0,
      "explanation": "Người đệ tử Phật chân chính cần có hai tính chất: Thấy rõ cuộc đời là vô thường... nên không tham lam, chấp thủ... Có lòng từ bi, yêu thương chúng sinh, nên tận tụy phụng sự... Nhờ đó, tâm hồn được an lạc...",
      "sourceQuestion": "Câu 17. Hai tính chất trong tâm một người đệ tử Phật chân chính?",
      "id": "hoang-4-c17-01"
    },
    {
      "type": "definition",
      "question": "Theo lý thuyết, đố kỵ là gì và do đâu mà có?",
      "sampleAnswer": "Đố kỵ là tâm buồn bực, ganh ghét khi thấy người khác thành công, được yêu quý hoặc vượt trội hơn mình. Tâm đố kỵ xuất phát từ sự ích kỷ, muốn hơn người và không chấp nhận thành công của người khác.",
      "matchThreshold": 0.65,
      "explanation": "Đố kỵ là tâm buồn bực, ganh ghét khi thấy người khác thành công, được yêu quý hoặc vượt trội hơn mình. Tâm đố kỵ xuất phát từ sự ích kỷ, muốn hơn người và không chấp nhận thành công của người khác.",
      "sourceQuestion": "Câu 18. Hỏi: Đố kỵ là gì và do đâu mà có?",
      "id": "hoang-4-c18-01"
    },
    {
      "type": "single",
      "question": "Tâm đố kỵ gây tác hại như thế nào đối với người môn sinh?",
      "options": [
        "Tâm đố kỵ làm mất tình huynh đệ, gây chia rẽ tập thể và khiến bản thân khó tiến bộ. Người đố kỵ thường dễ chê bai, chống đối hoặc tìm cách hạ thấp người khác thay vì cố gắng hoàn thiện chính mình.",
        "Tâm đố kỵ làm tăng cường tính cạnh tranh, tạo động lực mạnh mẽ cho tập thể và khiến bản thân nhanh chóng thăng tiến. Người đố kỵ thường nỗ lực hết mình, vượt qua mọi giới hạn để hạ gục đối thủ, trở thành người giỏi nhất.",
        "Tâm đố kỵ làm suy giảm trí nhớ, gây bệnh đau đầu và khiến bản thân hay quên các bài quyền. Người đố kỵ thường nhút nhát, sợ giao tiếp hoặc tìm cách trốn học thay vì đối mặt với sự thật.",
        "Tâm đố kỵ làm tiêu tốn tiền bạc, gây nợ nần cho gia đình và khiến bản thân rơi vào tệ nạn. Người đố kỵ thường mua sắm xa xỉ, khoe khoang đồ hiệu hoặc tìm cách ăn cắp để bằng bạn bằng bè."
      ],
      "correctIndex": 0,
      "explanation": "Tâm đố kỵ làm mất tình huynh đệ, gây chia rẽ tập thể và khiến bản thân khó tiến bộ. Người đố kỵ thường dễ chê bai, chống đối hoặc tìm cách hạ thấp người khác thay vì cố gắng hoàn thiện chính mình.",
      "sourceQuestion": "Câu 19. Hỏi: Tâm đố kỵ gây tác hại như thế nào đối với người môn sinh?",
      "id": "hoang-4-c19-01"
    },
    {
      "type": "single",
      "question": "Người môn sinh Phật Quang Quyền phải vượt qua tâm đố kỵ bằng cách nào?",
      "options": [
        "Phải biết tùy hỷ trước thành công của người khác, chân thành chúc mừng và học hỏi những điều hay từ huynh đệ. Khi thấy người khác tiến bộ, ta vui mừng như chính mình tiến bộ và cùng nhau xây dựng tập thể tốt đẹp.",
        "Phải biết giả vờ vui vẻ trước thành công của người khác, ngoài mặt chúc mừng nhưng trong lòng âm thầm tìm điểm yếu của huynh đệ. Khi thấy người khác tiến bộ, ta lên kế hoạch ngáng bạc và cùng nhau kéo họ xuống bùn.",
        "Phải biết quay lưng trước thành công của người khác, tuyệt đối không khen ngợi để họ không tự cao tự đại. Khi thấy người khác tiến bộ, ta chuyển sang chơi môn thể thao khác để không phải so sánh.",
        "Phải biết dùng bạo lực trước thành công của người khác, thách đấu ngay lập tức để chứng tỏ sức mạnh của mình. Khi thấy người khác tiến bộ, ta đánh họ trọng thương để họ không thể tiếp tục tập luyện."
      ],
      "correctIndex": 0,
      "explanation": "Phải biết tùy hỷ trước thành công của người khác, chân thành chúc mừng và học hỏi những điều hay từ huynh đệ. Khi thấy người khác tiến bộ, ta vui mừng như chính mình tiến bộ và cùng nhau xây dựng tập thể ngày càng tốt đẹp hơn.",
      "sourceQuestion": "Câu 20. Hỏi: Người môn sinh Phật Quang Quyền phải vượt qua tâm đố kỵ bằng cách nào?",
      "id": "hoang-4-c20-01"
    },
    {
      "type": "single",
      "question": "Chỉ trích khác với góp ý như thế nào?",
      "options": [
        "Góp ý là chân thành giúp người khác nhận ra lỗi để sửa đổi và tiến bộ hơn. Chỉ trích là nói xấu, phê phán nhằm làm giảm uy tín hoặc khiến người khác bị mọi người xa lánh.",
        "Góp ý là viết đơn ẩn danh tố cáo người khác lên ban huấn luyện để họ bị phạt. Chỉ trích là trực tiếp chửi mắng người khác trước đám đông để họ không thể chối cãi.",
        "Góp ý là sự đồng tình, bao che cho những lỗi lầm nhỏ của bạn bè để giữ tình huynh đệ. Chỉ trích là sự nghiêm khắc, vạch lá tìm sâu để trừng phạt những người yếu kém hơn mình.",
        "Góp ý là dùng những lời lẽ hoa mỹ, nịnh nọt để người khác không buồn khi phạm lỗi. Chỉ trích là dùng những lời lẽ thô tục, bạo lực để đe dọa người khác không dám tái phạm."
      ],
      "correctIndex": 0,
      "explanation": "Góp ý là chân thành giúp người khác nhận ra lỗi để sửa đổi và tiến bộ hơn. Chỉ trích là nói xấu, phê phán nhằm làm giảm uy tín hoặc khiến người khác bị mọi người xa lánh.",
      "sourceQuestion": "Câu 21. Hỏi: Chỉ trích khác với góp ý như thế nào?",
      "id": "hoang-4-c21-01"
    },
    {
      "type": "single",
      "question": "Vì sao người môn sinh Phật Quang Quyền không nên chỉ trích người khác?",
      "options": [
        "Vì chỉ trích làm tổn thương tình huynh đệ, gây mất đoàn kết trong tập thể và thường xuất phát từ những tâm bất thiện như đố kỵ, giận hờn hoặc tự cao.",
        "Vì chỉ trích tốn nhiều thời gian và công sức, làm ảnh hưởng đến quá trình tập luyện cá nhân và thường xuất phát từ việc thiếu kỹ năng giao tiếp cơ bản.",
        "Vì chỉ trích có thể khiến người bị chỉ trích nổi điên, gây gổ đánh nhau và dẫn đến việc cả hai cùng bị đuổi khỏi võ đường.",
        "Vì chỉ trích vi phạm vào điều khoản bảo mật thông tin của môn phái, làm lộ điểm yếu của võ đường ra ngoài cho các môn phái khác biết."
      ],
      "correctIndex": 0,
      "explanation": "Vì chỉ trích làm tổn thương tình huynh đệ, gây mất đoàn kết trong tập thể và thường xuất phát từ những tâm bất thiện như đố kỵ, giận hờn hoặc tự cao.",
      "sourceQuestion": "Câu 22. Hỏi: Vì sao người môn sinh Phật Quang Quyền không nên chỉ trích người khác?",
      "id": "hoang-4-c22-01"
    },
    {
      "type": "single",
      "question": "Khi thấy huynh đệ có khuyết điểm, người môn sinh nên làm gì?",
      "options": [
        "Nên góp ý riêng với tinh thần xây dựng, chân thành giúp nhau tiến bộ. Nếu không thể tự góp ý, cần trình bày với người có trách nhiệm, tuyệt đối không nói xấu hay lan truyền lỗi của người khác.",
        "Nên góp ý công khai trước toàn thể võ đường, dùng micro để mọi người cùng nghe và lấy đó làm bài học, tuyệt đối không bao che hay giấu giếm lỗi của người khác.",
        "Nên im lặng bỏ qua, coi như không thấy để tránh chuốc vạ vào thân, nếu ai hỏi thì cứ nói không biết, tuyệt đối không xen vào chuyện của người khác.",
        "Nên đăng bài bóng gió lên mạng xã hội, gắn thẻ những người liên quan để cộng đồng mạng vào đánh giá, tuyệt đối không nói thẳng mặt vì sợ làm mất lòng."
      ],
      "correctIndex": 0,
      "explanation": "Nên góp ý riêng với tinh thần xây dựng, chân thành giúp nhau tiến bộ. Nếu không thể tự góp ý, cần trình bày với người có trách nhiệm, tuyệt đối không nói xấu hay lan truyền lỗi của người khác.",
      "sourceQuestion": "Câu 23. Hỏi: Khi thấy huynh đệ có khuyết điểm, người môn sinh nên làm gì?",
      "id": "hoang-4-c23-01"
    },
    {
      "type": "definition",
      "question": "Theo lý thuyết, khiêm hạ là gì?",
      "sampleAnswer": "Khiêm hạ là không tự cao, không xem mình hơn người và luôn biết tôn trọng mọi người.",
      "matchThreshold": 0.65,
      "explanation": "Khiêm hạ là không tự cao, không xem mình hơn người và luôn biết tôn trọng mọi người. Người môn sinh có đức tính khiêm hạ sẽ dễ học hỏi, tiến bộ và được mọi người yêu quý.",
      "sourceQuestion": "Câu 24. Hỏi: Khiêm hạ là gì và vì sao người môn sinh Phật Quang Quyền phải rèn luyện đức tính khiêm hạ?",
      "id": "hoang-4-c24-01"
    },
    {
      "type": "single",
      "question": "Dấu hiệu của tâm ngã mạn là gì?",
      "options": [
        "Tâm ngã mạn khiến ta xem thường người khác, thích khoe thành tích, khó lắng nghe góp ý, luôn cho mình đúng và muốn được người khác đề cao hơn mình.",
        "Tâm ngã mạn khiến ta luôn tự ti về ngoại hình, sợ hãi đám đông, không dám phát biểu ý kiến, luôn cho mình sai và muốn trốn tránh mọi trách nhiệm.",
        "Tâm ngã mạn khiến ta trở nên khù khờ, chậm chạp, không hiểu được những kỹ thuật phức tạp, luôn làm sai bài quyền và bị huấn luyện viên trách phạt.",
        "Tâm ngã mạn khiến ta thích ngủ nướng, lười vận động, viện cớ ốm đau để nghỉ tập, luôn viện lý do và muốn dựa dẫm vào người khác."
      ],
      "correctIndex": 0,
      "explanation": "Tâm ngã mạn khiến ta xem thường người khác, thích khoe thành tích, khó lắng nghe góp ý, luôn cho mình đúng và muốn được người khác đề cao hơn mình.",
      "sourceQuestion": "Câu 25. Hỏi: Dấu hiệu của tâm ngã mạn là gì?",
      "id": "hoang-4-c25-01"
    },
    {
      "type": "single",
      "question": "Người môn sinh Phật Quang Quyền rèn luyện tâm khiêm hạ bằng cách nào?",
      "options": [
        "Bằng cách luôn lễ độ, kính trọng mọi người, biết lắng nghe, nhường nhịn, chân thành khen ngợi ưu điểm của người khác và không ngừng nhìn lại những thiếu sót của bản thân để sửa đổi.",
        "Bằng cách luôn cúi gằm mặt xuống đất, không dám nhìn ai, ăn nói ấp úng, nhút nhát chê bai chính bản thân mình và không ngừng nhận hết mọi tội lỗi dù không phải do mình làm.",
        "Bằng cách luôn làm trò hề, hạ nhục bản thân để làm vui lòng người khác, tự biến mình thành kẻ ngốc nghếch và không ngừng cầu xin sự bố thí tình cảm từ mọi người xung quanh.",
        "Bằng cách luôn ăn mặc rách rưới, không dùng đồ mới, từ chối mọi phần thưởng vật chất, sống cảnh bần hàn và không ngừng than vãn về sự nghèo khổ của bản thân để người khác thương hại."
      ],
      "correctIndex": 0,
      "explanation": "Bằng cách luôn lễ độ, kính trọng mọi người, biết lắng nghe, nhường nhịn, chân thành khen ngợi ưu điểm của người khác và không ngừng nhìn lại những thiếu sót của bản thân để sửa đổi.",
      "sourceQuestion": "Câu 26. Hỏi: Người môn sinh Phật Quang Quyền rèn luyện tâm khiêm hạ bằng cách nào?",
      "id": "hoang-4-c26-01"
    },
    {
      "type": "definition",
      "question": "Theo lý thuyết, nóng nảy là gì và nguyên nhân do đâu?",
      "sampleAnswer": "Nóng nảy là mất bình tĩnh khi gặp chuyện trái ý, dễ nổi giận và có lời nói, hành động thiếu kiểm soát. Nguyên nhân thường xuất phát từ sự ích kỷ, tự ái và muốn mọi việc phải theo ý mình.",
      "matchThreshold": 0.65,
      "explanation": "Nóng nảy là mất bình tĩnh khi gặp chuyện trái ý, dễ nổi giận và có lời nói, hành động thiếu kiểm soát. Nguyên nhân thường xuất phát từ sự ích kỷ, tự ái và muốn mọi việc phải theo ý mình.",
      "sourceQuestion": "Câu 27. Hỏi: Nóng nảy là gì và nguyên nhân do đâu?",
      "id": "hoang-4-c27-01"
    },
    {
      "type": "single",
      "question": "Tác hại của tính nóng nảy đối với người môn sinh Phật Quang Quyền là gì?",
      "options": [
        "Nóng nảy làm mất sự sáng suốt, dễ gây tổn thương người khác, ảnh hưởng đến tình huynh đệ và làm giảm giá trị của những nỗ lực rèn luyện đạo đức, võ thuật mà mình đã dày công xây dựng.",
        "Nóng nảy làm tăng huyết áp, nhịp tim đập nhanh, ảnh hưởng đến sức khỏe tim mạch và làm giảm thể lực nghiêm trọng trong những buổi tập luyện đối kháng căng thẳng.",
        "Nóng nảy tạo ra uy phong lẫm liệt, khiến mọi người khiếp sợ, nâng cao vị thế cá nhân và làm tăng hiệu quả răn đe đối với những đàn em khóa dưới.",
        "Nóng nảy làm tiêu hao nội công, kinh mạch rối loạn, dễ dẫn đến tẩu hỏa nhập ma và làm phế bỏ hoàn toàn võ công mà mình đã dày công luyện tập nhiều năm."
      ],
      "correctIndex": 0,
      "explanation": "Nóng nảy làm mất sự sáng suốt, dễ gây tổn thương người khác, ảnh hưởng đến tình huynh đệ và làm giảm giá trị của những nỗ lực rèn luyện đạo đức, võ thuật mà mình đã dày công xây dựng.",
      "sourceQuestion": "Câu 28. Hỏi: Tác hại của tính nóng nảy đối với người môn sinh Phật Quang Quyền là gì?",
      "id": "hoang-4-c28-01"
    },
    {
      "type": "single",
      "question": "Người môn sinh Phật Quang Quyền rèn luyện sự điềm tĩnh bằng cách nào?",
      "options": [
        "Phải tập bình tĩnh trước nghịch cảnh, biết lắng nghe, kiềm chế cảm xúc, nhìn lại lỗi của mình và luôn cư xử ôn hòa. Dù nhiệt tình bảo vệ điều đúng và điều thiện, vẫn phải giữ thái độ khiêm tốn, từ tốn và tôn trọng mọi người.",
        "Phải tập vô cảm trước nỗi đau, biết làm ngơ, triệt tiêu mọi cảm xúc, đổ lỗi cho hoàn cảnh và luôn cư xử lạnh nhạt. Dù gặp phải điều sai trái, vẫn giữ thái độ dửng dưng, vô trách nhiệm.",
        "Phải tập phản ứng nhanh trước mọi lời nói, biết cãi lại, bộc lộ sự hung hăng, vạch lá tìm sâu và luôn cư xử gay gắt. Dù mình làm sai, vẫn giữ thái độ ngoan cố, không nhận lỗi.",
        "Phải tập thiền định ở nơi hoang vắng, bịt mắt bịt tai, trốn tránh mọi va chạm xã hội, không giao tiếp với ai và luôn cư xử khép kín. Dù thấy người khác bị nạn, vẫn giữ thái độ tĩnh lặng, không can thiệp."
      ],
      "correctIndex": 0,
      "explanation": "Phải tập bình tĩnh trước nghịch cảnh, biết lắng nghe, kiềm chế cảm xúc, nhìn lại lỗi của mình và luôn cư xử ôn hòa. Dù nhiệt tình bảo vệ điều đúng và điều thiện, vẫn phải giữ thái độ khiêm tốn, từ tốn và tôn trọng mọi người.",
      "sourceQuestion": "Câu 29. Hỏi: Người môn sinh Phật Quang Quyền rèn luyện sự điềm tĩnh bằng cách nào?",
      "id": "hoang-4-c29-01"
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
