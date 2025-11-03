import { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { fetchPicsumImages, PAGE_LIMIT } from '../api/picsum_api';
import type { PicsumImageListItem } from '../types/Picsum';

const THUMB_W = 360;
const THUMB_H = 240;

export default function PhotosList() {
  const [images, setImages] = useState<PicsumImageListItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const list = await fetchPicsumImages(page, PAGE_LIMIT);
        if (cancelled) return;
        setImages((prev) => [...prev, ...list]);
        if (list.length < PAGE_LIMIT) setHasMore(false);
      } catch (err: any) {
        setError(err?.message || 'Failed to load images');
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [page]);

  // Infinite scroll using IntersectionObserver
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !loading && hasMore) {
      setPage((p) => p + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { root: null, rootMargin: '200px', threshold: 0.1 });
    const el = sentinelRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [handleObserver]);

  return (
    <div>
      <h2>Photos</h2>
      <div className="photos-grid">
        {images.map((img) => (
          <Link to={`/photos/${img.id}`} key={img.id} className="photo-card">
            <img
              className="photo-thumb"
              src={`https://picsum.photos/id/${img.id}/${THUMB_W}/${THUMB_H}`}
              alt={`By ${img.author}`}
              width={THUMB_W}
              height={THUMB_H}
              loading="lazy"
            />
            <div className="photo-meta">{img.author}</div>
          </Link>
        ))}
      </div>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {!hasMore && <div className="end">No more photos</div>}

      <div ref={sentinelRef} style={{ height: 1 }} />
    </div>
  );
}
