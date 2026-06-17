'use client';

import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useProgressStore } from '@/store/progress-store';
import {
  getOverallProgress,
  getBeltCompletionPercent,
  getCurrentBelt,
  isBeltCompleted,
} from '@/lib/progress';
import { BELT_WORLDS } from '@/lib/constants';
import { ProgressBar } from '@/components/ui/Progress';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { CertificateTemplate } from '@/components/profile/CertificateTemplate';
import { ProfileCard } from '@/components/profile/ProfileCard';
import {
  downloadCertificatePNG,
  downloadCertificatePDF,
  getCertificateFilename,
} from '@/lib/certificates';
import { getBeltById } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Download, Moon, RotateCcw, ScrollText, Sun, Upload } from 'lucide-react';

export function ProfilePageClient() {
  const progress = useProgressStore((s) => s.progress);
  const setName = useProgressStore((s) => s.setName);
  const setPreferences = useProgressStore((s) => s.setPreferences);
  const colorScheme = useColorScheme();
  const reset = useProgressStore((s) => s.reset);
  const exportData = useProgressStore((s) => s.exportData);
  const importData = useProgressStore((s) => s.importData);

  const [showReset, setShowReset] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);
  const [certBelt, setCertBelt] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const overall = getOverallProgress(progress);
  const currentBelt = getCurrentBelt(progress);
  const currentBeltInfo = getBeltById(currentBelt);
  const allComplete = overall.completedLessons === overall.totalLessons;

  const handleExport = () => {
    const blob = new Blob([exportData()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pqq-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const text = await file.text();
      const ok = importData(text);
      alert(ok ? 'Khôi phục tiến độ thành công!' : 'File không hợp lệ.');
    };
    input.click();
  };

  const handleDownloadCert = async (beltId: string, format: 'png' | 'pdf') => {
    setCertBelt(beltId);
    await new Promise((r) => setTimeout(r, 100));
    if (!certRef.current) return;
    const filename =
      beltId === 'master'
        ? getCertificateFilename('Hành Trình Trọn Vẹn')
        : getCertificateFilename(getBeltById(beltId as Parameters<typeof getBeltById>[0]).name);
    if (format === 'png') {
      await downloadCertificatePNG(certRef.current, filename);
    } else {
      await downloadCertificatePDF(certRef.current, filename);
    }
    setCertBelt(null);
  };

  const completedBelts = BELT_WORLDS.filter((b) => isBeltCompleted(b.id, progress));

  return (
    <div className="profile-page relative min-h-screen overflow-hidden px-4 py-8 lg:px-10 lg:py-10">
      <div className="relative mx-auto max-w-4xl">
        <header className="profile-header mb-8 lg:mb-10">
          <h1 className="profile-header__title font-display text-[1.75rem] font-bold uppercase sm:text-[2.125rem]">
            Hồ Sơ Võ Đạo
          </h1>
        </header>

        <ProfileCard
          className="mb-8 lg:mb-10"
          name={progress.profile.name ?? ''}
          onNameSubmit={setName}
        />

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <section className="flex flex-col gap-6">
            <div className="profile-card">
              <h2 className="profile-card__title">Tiến độ tổng</h2>
              <div className="flex items-end justify-between gap-4">
                <motion.p
                  className="profile-stat-value font-display tabular-nums"
                  style={{ '--belt-accent': currentBeltInfo.colors.accent } as React.CSSProperties}
                  initial={reduced ? {} : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  {overall.percent}%
                </motion.p>
                <div className="text-right">
                  <p className="profile-stat-label">Bài học</p>
                  <p className="profile-stat-sub font-display tabular-nums">
                    {overall.completedLessons}/{overall.totalLessons}
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <ProgressBar
                  value={overall.percent}
                  color={currentBeltInfo.colors.accent}
                  size="md"
                />
              </div>
              <p className="profile-stat-detail">
                {overall.completedLessons}/{overall.totalLessons} bài · Điểm TB:{' '}
                {overall.averageScore}%
              </p>
            </div>

            <div className="profile-card">
              <h2 className="profile-card__title">Cấp đai</h2>
              <div>
                {BELT_WORLDS.map((belt) => {
                  const pct = getBeltCompletionPercent(belt.id, progress);
                  const locked = !progress.belts[belt.id]?.unlocked;
                  const isCurrent = belt.id === currentBelt;

                  return (
                    <div
                      key={belt.id}
                      className={cn(
                        'profile-belt-row',
                        isCurrent && 'profile-belt-row--current',
                        locked && 'profile-belt-row--locked'
                      )}
                      style={
                        { '--belt-accent': belt.colors.accent } as React.CSSProperties
                      }
                    >
                      <span className="profile-belt-row__name">{belt.nameShort}</span>
                      <ProgressBar
                        value={locked ? 0 : pct}
                        color={belt.colors.accent}
                        size="sm"
                      />
                      <span className="profile-belt-row__pct">
                        {locked ? '🔒' : `${pct}%`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-6">
            {(completedBelts.length > 0 || allComplete) && (
              <div className="profile-card">
                <h2 className="profile-card__title">Chứng nhận</h2>
                <div>
                  {completedBelts.map((belt) => (
                    <div key={belt.id} className="profile-cert">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="profile-cert__seal">
                          <div className="profile-cert__seal-shine" aria-hidden />
                          <ScrollText
                            className="relative z-[1] h-4 w-4 text-unlock"
                            strokeWidth={1.75}
                          />
                        </div>
                        <span className="profile-cert__label truncate">{belt.name}</span>
                      </div>
                      <div className="profile-cert__actions">
                        <button
                          type="button"
                          onClick={() => handleDownloadCert(belt.id, 'png')}
                          className="profile-cert__btn"
                        >
                          <Download className="h-3 w-3" />
                          PNG
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDownloadCert(belt.id, 'pdf')}
                          className="profile-cert__btn"
                        >
                          PDF
                        </button>
                      </div>
                    </div>
                  ))}
                  {allComplete && (
                    <div className="profile-cert profile-cert--master">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="profile-cert__seal">
                          <div className="profile-cert__seal-shine" aria-hidden />
                          <ScrollText
                            className="relative z-[1] h-4 w-4 text-unlock"
                            strokeWidth={1.75}
                          />
                        </div>
                        <span className="profile-cert__label truncate">
                          📜 Hành Trình Trọn Vẹn
                        </span>
                      </div>
                      <div className="profile-cert__actions">
                        <button
                          type="button"
                          onClick={() => handleDownloadCert('master', 'png')}
                          className="profile-cert__btn"
                        >
                          <Download className="h-3 w-3" />
                          Tải về
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="profile-card">
              <h2 className="profile-card__title">Cài đặt</h2>
              <div className="profile-settings">
                <div className="profile-setting-row">
                  <span className="profile-setting-row__label">Giao diện</span>
                  <div
                    className="profile-theme-toggle"
                    role="group"
                    aria-label="Chọn giao diện sáng hoặc tối"
                  >
                    <button
                      type="button"
                      onClick={() => setPreferences({ colorScheme: 'dark' })}
                      className={cn(
                        'profile-theme-toggle__btn',
                        colorScheme === 'dark' &&
                          'profile-theme-toggle__btn--active'
                      )}
                      aria-pressed={colorScheme === 'dark'}
                    >
                      <Moon className="h-3.5 w-3.5" />
                      Tối
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreferences({ colorScheme: 'light' })}
                      className={cn(
                        'profile-theme-toggle__btn',
                        colorScheme === 'light' &&
                          'profile-theme-toggle__btn--active'
                      )}
                      aria-pressed={colorScheme === 'light'}
                    >
                      <Sun className="h-3.5 w-3.5" />
                      Sáng
                    </button>
                  </div>
                </div>

                <div className="profile-setting-row">
                  <span className="profile-setting-row__label">Cỡ chữ</span>
                  <select
                    value={progress.preferences.fontSize}
                    onChange={(e) =>
                      setPreferences({
                        fontSize: e.target.value as 'normal' | 'large',
                      })
                    }
                    className="profile-select"
                  >
                    <option value="normal">Normal</option>
                    <option value="large">Large</option>
                  </select>
                </div>

                <label className="profile-setting-row cursor-pointer">
                  <span className="profile-setting-row__label">Giảm chuyển động</span>
                  <input
                    type="checkbox"
                    checked={progress.preferences.reducedMotion}
                    onChange={(e) =>
                      setPreferences({ reducedMotion: e.target.checked })
                    }
                    className="profile-checkbox"
                  />
                </label>

                <div className="profile-actions">
                  <Button variant="secondary" size="sm" className="w-full" onClick={handleExport}>
                    <Upload className="mr-2 h-4 w-4" /> Sao lưu tiến độ
                  </Button>
                  <Button variant="secondary" size="sm" className="w-full" onClick={handleImport}>
                    <Download className="mr-2 h-4 w-4" /> Khôi phục tiến độ
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-error"
                    onClick={() => setShowReset(true)}
                  >
                    <RotateCcw className="mr-2 h-4 w-4" /> Đặt lại hành trình
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {certBelt && (
        <div className="fixed -left-[9999px]">
          <CertificateTemplate
            ref={certRef}
            studentName={progress.profile.name ?? 'Môn sinh'}
            beltName={
              certBelt === 'master'
                ? 'Hành Trình Lý Thuyết Trọn Vẹn'
                : getBeltById(certBelt as Parameters<typeof getBeltById>[0]).name
            }
            completedAt={
              progress.belts[certBelt]?.completedAt ?? new Date().toISOString()
            }
            type={certBelt === 'master' ? 'master' : 'belt'}
          />
        </div>
      )}

      <Modal open={showReset} onClose={() => setShowReset(false)} title="Đặt lại hành trình">
        <p className="mb-4 text-sm text-text-secondary">
          Bạn chắc chắn? Toàn bộ tiến độ và điểm quiz sẽ bị xóa.
        </p>
        {!confirmReset ? (
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setShowReset(false)}>
              Hủy
            </Button>
            <Button
              variant="primary"
              className="flex-1 bg-error"
              onClick={() => setConfirmReset(true)}
            >
              Tiếp tục
            </Button>
          </div>
        ) : (
          <div>
            <p className="mb-4 text-sm font-semibold text-error">
              Hành trình sẽ bắt đầu lại từ Nâu Đai. Không thể hoàn tác.
            </p>
            <Button
              variant="primary"
              className="w-full bg-error"
              onClick={() => {
                reset();
                setShowReset(false);
                setConfirmReset(false);
              }}
            >
              Xác nhận đặt lại
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
