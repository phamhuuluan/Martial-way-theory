# Rule bốc đề khi ôn luyện hoặc thi

Spec này áp dụng khi học viên vào ôn luyện hoặc vào thi của một cấp đai. Cách sinh 5 câu cho mỗi câu gốc nằm ở `docs/question-generation-rule.md`.

Mọi câu trong file lý thuyết của cấp đai đều đã được sinh theo rule đó. Câu gốc thứ `k` có một nhóm 5 câu. Không câu gốc nào thiếu nhóm.

Khi ra một đề của cấp đai đó:

1. Với câu gốc 1, bốc 1 câu trong 5 câu của câu đó.
2. Với câu gốc 2, bốc 1 câu trong 5 câu của câu đó.
3. Làm vậy cho đến câu gốc N.

Mỗi câu gốc có đúng một câu trên đề. Đề có N câu, bằng số câu trong file lý thuyết của cấp đai đó.

Sau khi bốc xong, xáo thứ tự các câu đã bốc. Đề không đi lần lượt 1, 2, 3, …, N. Thứ tự trên đề là một hoán vị, ví dụ N, 4, 1, 3, 5, ….

Mỗi lượt vào ôn luyện hoặc thi đều bốc lại và xáo lại. Hai lượt có thể gặp biến thể khác nhau của cùng một câu gốc, và gặp thứ tự câu khác nhau.
