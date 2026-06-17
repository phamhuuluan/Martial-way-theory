import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Giới thiệu',
  description:
    'Giới thiệu môn phái Phật Quang Quyền — lịch sử sáng lập, triết lý và phát triển trên toàn quốc',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen px-4 py-12 lg:px-8">
      <article className="mx-auto max-w-2xl prose-lesson">
        <img
          src="/logo.png"
          alt={SITE.name}
          className="mx-auto mb-8 h-24 w-24 rounded-full shadow-glow"
        />
        <h1 className="font-display text-3xl font-bold text-center mb-6">
          Về Phật Quang Quyền
        </h1>

        <h2 className="font-display text-xl font-semibold mt-8 mb-4">Sáng Tổ Sư</h2>
        <p>
          Môn phái Phật Quang Quyền được thành lập vào năm 1992, do Võ sư Thượng Tọa Tiến Sĩ Thích
          Chân Quang sáng lập. Thượng Tọa được học võ từ nhỏ, lại có duyên được học nhiều môn phái
          khác nhau nên từ đó rút ra được những tinh hoa võ học. Với mong muốn ai cũng có sức khỏe,
          văn võ song toàn, thanh niên lại cần điều này hơn ai hết nên Thượng Tọa đã sáng lập Môn
          phái PHẬT QUANG QUYỀN.
        </p>

        <h2 className="font-display text-xl font-semibold mt-8 mb-4">
          Giới thiệu chung về Môn Phái Phật Quang Quyền
        </h2>
        <p>
          Môn Phái là sự kết hợp giữa tính nhân văn, triết lý sâu sắc trong nhà Phật với tinh thần
          võ cổ truyền của dân tộc ta.
        </p>
        <ul>
          <li>Chủ trương &ldquo;Học võ luôn đi kèm với học Đạo&rdquo;.</li>
          <li>
            Có những đòn thế nhanh gọn và hiệu quả. Là sự phảng phất cái lãng mạn của võ cổ truyền
            và tính thực tế của võ đặc nhiệm.
          </li>
          <li>Dựa trên 2 nền tảng: Võ thuật và Thiền định.</li>
        </ul>
        <p>
          Chương trình huấn luyện được chia làm 4 cấp: sơ đẳng, trung đẳng, cao đẳng và thượng
          đẳng. Trong đó có 18 cấp đai tương đương với 18 cấp đai hiện hành của Liên đoàn VTCT Việt
          Nam và 6 cấp đai cao đẳng dành cho Võ sư cao cấp của Môn phái và 3 cấp đai thượng đẳng
          dành cho Võ sư Chưởng môn, Phó Chưởng Môn.
        </p>
        <p>
          Môn phái có mặt trên 26 tỉnh, thành trong cả nước với hơn 5000 võ sinh theo học. Trong
          đó, phát triển mạnh nhất ở TP.HCM, Nghệ An và Hà Nội.
        </p>
        <p>Năm 2015, Môn phái chính thức gia nhập Liên Đoàn VTCT Việt Nam.</p>
        <p>
          Như vậy, Phật Quang Quyền đã thổi làn gió mới vào cộng đồng Võ cổ truyền Việt Nam, góp
          phần xây dựng và phát triển nền võ học nước nhà.
        </p>
        <p>
          Môn phái đã và đang ươm mầm nuôi dưỡng thế hệ võ sinh tốt đời đẹp đạo để sống có ích,
          cống hiến, bảo vệ Đạo Pháp và Đất Nước.
        </p>

        <div className="mt-12 text-center">
          <Link
            href="/journey"
            className="inline-flex min-h-[44px] items-center rounded-[var(--radius-sm)] bg-unlock px-8 py-3 font-semibold text-bg-primary hover:brightness-110"
          >
            Bắt đầu hành trình
          </Link>
        </div>
      </article>
    </div>
  );
}
