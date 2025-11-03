import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchPicsumImageById } from '../api/picsum_api';
import type { PicsumImageDetail } from '../types/Picsum';

export default function PhotoDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<PicsumImageDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const d = await fetchPicsumImageById(id as string);
        if (cancelled) return;
        setDetail(d);
      } catch (err: any) {
        setError(err?.message || 'Failed to load image');
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!detail) return <div className="error">Photo not found</div>;

  return (
    <div className="photo-detail">
      <div className="detail-header">
        <button onClick={() => navigate(-1)} className="back">Back</button>
        <Link to="/photos" className="all">All Photos</Link>
      </div>
      <h2>{`Photo ${detail.id}`}</h2>
      <div className="detail-body">
        <img className="detail-img" src={detail.download_url} alt={`By ${detail.author}`} />
        <div className="detail-meta">
          <p><strong>Author:</strong> {detail.author}</p>
          <p><strong>Size:</strong> {detail.width} × {detail.height}</p>
          <p><strong>Description:</strong> This image was provided by Lorem Picsum. No description available.</p>
        </div>
      </div>
    </div>
  );
}
