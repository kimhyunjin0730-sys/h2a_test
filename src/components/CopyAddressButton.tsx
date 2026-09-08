'use client';
import { ADDRESS } from '@/lib/links';
import { showToast } from '@/lib/toast';

export default function CopyAddressButton({ className = 'btn btn-white-outline' }: { className?: string }) {
  return <button type="button" className={className} onClick={() => navigator.clipboard.writeText(ADDRESS).then(() => showToast('주소가 복사되었습니다.'))}>주소 복사</button>;
}
