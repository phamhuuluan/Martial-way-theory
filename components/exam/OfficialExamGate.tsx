'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { ExamLoadingOverlay } from '@/components/exam/ExamLoadingOverlay';
import { fetchExamSessions, type ExamSession } from '@/lib/exam-results';
import { useRouter } from 'next/navigation';

interface Props {
  rankName: string;
  onSelectSession: (session: ExamSession) => void;
}

export function OfficialExamGate({ rankName, onSelectSession }: Props) {
  const router = useRouter();
  const [sessions, setSessions] = useState<ExamSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [startLoading, setStartLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchExamSessions()
      .then((data) => {
        if (!mounted) return;
        // Lọc các kỳ thi có trạng thái Bắt đầu (true)
        const activeSessions = data.filter((s) => s.status === true);
        setSessions(activeSessions);
        if (activeSessions.length > 0) {
          setSelectedId(activeSessions[0].id);
        }
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || 'Không thể tải danh sách kỳ thi.');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleStart = () => {
    const session = sessions.find((s) => s.id === selectedId);
    if (session) {
      setStartLoading(true);
      setTimeout(() => onSelectSession(session), 10);
    }
  };

  return (
    <div className="profile-page min-h-screen px-4 py-16 flex items-center justify-center">
      {(loading || startLoading) && (
        <ExamLoadingOverlay
          message={startLoading ? 'Đang mở đề thi…' : 'Đang tải danh sách kỳ thi…'}
        />
      )}
      <div className="w-full max-w-md rounded-2xl border border-border/50 bg-bg-primary p-6 shadow-sm">
        <h1 className="mb-6 font-display text-xl font-semibold leading-relaxed">
          Vui lòng chọn kỳ thi hợp lệ để bắt đầu làm bài.
        </h1>

        {loading ? (
          <p className="text-sm text-text-secondary">Đang tải danh sách kỳ thi…</p>
        ) : error ? (
          <div className="rounded-lg bg-error/10 p-4 text-sm text-error">
            <p className="font-medium">Lỗi</p>
            <p>{error}</p>
            <Button variant="secondary" className="mt-3 w-full" onClick={() => router.refresh()}>
              Thử lại
            </Button>
          </div>
        ) : sessions.length === 0 ? (
          <div className="rounded-lg bg-warning/10 p-4 text-sm text-warning-foreground">
            Hiện tại không có kỳ thi nào đang mở. Vui lòng liên hệ ban tổ chức.
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="session-select" className="text-sm font-medium">
                Chọn kỳ thi
              </label>
              <select
                id="session-select"
                className="w-full rounded-lg border border-border bg-bg-primary px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
              >
                {sessions.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <Button
              variant="primary"
              className="w-full"
              disabled={!selectedId || startLoading}
              onClick={handleStart}
            >
              {startLoading ? 'Đang chuẩn bị...' : 'Bắt đầu thi'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
