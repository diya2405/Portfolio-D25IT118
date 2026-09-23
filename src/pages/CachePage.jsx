import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchTasksWithTiming, getCacheStats, flushCache, seedDummyTasks } from '../api/tasks';
import Toast from '../components/Toast';
import '../components/Cache.css';

function CachePage() {
  const { token } = useAuth();
  const [stats, setStats] = useState({ hits: 0, misses: 0, totalRequests: 0, hitRate: '0%', activeKeysCount: 0 });
  const [actionLoading, setActionLoading] = useState(false);
  const [singleFetchResult, setSingleFetchResult] = useState(null);
  const [benchmarkData, setBenchmarkData] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  function showToast(message, type = 'success') {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 2500);
  }

  async function loadStats() {
    if (!token) return;
    try {
      const data = await getCacheStats(token);
      setStats(data);
    } catch {
      // fallback
    }
  }

  useEffect(() => {
    loadStats();
  }, [token]);

  async function handleSingleFetch() {
    if (!token) return;
    setActionLoading(true);
    try {
      const res = await fetchTasksWithTiming(token);
      setSingleFetchResult(res);
      showToast(`Fetched in ${res.durationMs}ms [${res.cacheStatus}]`, res.cacheStatus === 'HIT' ? 'success' : 'info');
      await loadStats();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setActionLoading(false);
    }
  }

  async function handleFlush() {
    if (!token) return;
    setActionLoading(true);
    try {
      await flushCache(token);
      showToast('Cache flushed', 'success');
      setSingleFetchResult(null);
      await loadStats();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setActionLoading(false);
    }
  }

  async function handleSeedDummy() {
    if (!token) return;
    setActionLoading(true);
    try {
      const res = await seedDummyTasks(token);
      showToast(`Seeded ${res.count} tasks`, 'success');
      await loadStats();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setActionLoading(false);
    }
  }

  async function handleRunBenchmark() {
    if (!token) return;
    setActionLoading(true);
    setBenchmarkData(null);
    showToast('Running benchmark...', 'info');

    try {
      const uncachedSamples = [];
      const cachedSamples = [];

      for (let i = 1; i <= 3; i++) {
        await flushCache(token);
        const res = await fetchTasksWithTiming(token);
        uncachedSamples.push(res.durationMs);
      }

      await fetchTasksWithTiming(token);

      for (let i = 1; i <= 3; i++) {
        const res = await fetchTasksWithTiming(token);
        cachedSamples.push(res.durationMs);
      }

      const uncachedAvg = (uncachedSamples.reduce((a, b) => a + b, 0) / uncachedSamples.length).toFixed(1);
      const cachedAvg = (cachedSamples.reduce((a, b) => a + b, 0) / cachedSamples.length).toFixed(1);
      const speedup = (((uncachedAvg - cachedAvg) / uncachedAvg) * 100).toFixed(1);

      setBenchmarkData({
        samples: [
          { id: 1, uncached: uncachedSamples[0], cached: cachedSamples[0] },
          { id: 2, uncached: uncachedSamples[1], cached: cachedSamples[1] },
          { id: 3, uncached: uncachedSamples[2], cached: cachedSamples[2] },
        ],
        uncachedAvg,
        cachedAvg,
        speedup,
      });

      showToast(`Complete: ${speedup}% faster`, 'success');
      await loadStats();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <section className="cache-section">
      <span className="cache-label">cache.live</span>

      {/* Minimalist Stats Bar */}
      <div className="cache-stats-bar">
        <div className="cache-stat-item">Hits: <strong>{stats.hits}</strong></div>
        <div className="cache-stat-item">Misses: <strong>{stats.misses}</strong></div>
        <div className="cache-stat-item">Hit Rate: <strong>{stats.hitRate}</strong></div>
        <div className="cache-stat-item">TTL: <strong>60s</strong></div>
      </div>

      {/* Action Toolbar */}
      <div className="cache-toolbar">
        <button
          className="cache-action-btn primary"
          onClick={handleRunBenchmark}
          disabled={actionLoading}
        >
          {actionLoading ? 'Running…' : '⚡ Run Benchmark'}
        </button>
        <button
          className="cache-action-btn"
          onClick={handleSingleFetch}
          disabled={actionLoading}
        >
          ↻ Test Fetch
        </button>
        <button
          className="cache-action-btn"
          onClick={handleSeedDummy}
          disabled={actionLoading}
        >
          + Seed Sample Data
        </button>
        <button
          className="cache-action-btn danger"
          onClick={handleFlush}
          disabled={actionLoading}
        >
          ✕ Flush Cache
        </button>
      </div>

      {/* Single Fetch Result */}
      {singleFetchResult && (
        <div className="cache-result-box">
          <div>
            Response: <strong>{singleFetchResult.durationMs}ms</strong> ({singleFetchResult.tasks.length} tasks)
          </div>
          <span className={`cache-tag ${singleFetchResult.cacheStatus.toLowerCase()}`}>
            X-Cache: {singleFetchResult.cacheStatus}
          </span>
        </div>
      )}

      {/* Benchmark Table */}
      {benchmarkData && (
        <div className="cache-benchmark-box">
          <table className="cache-table">
            <thead>
              <tr>
                <th>Reading</th>
                <th>Uncached (MongoDB)</th>
                <th>Cached (node-cache)</th>
                <th>Speedup</th>
              </tr>
            </thead>
            <tbody>
              {benchmarkData.samples.map((sample) => (
                <tr key={sample.id}>
                  <td>Sample #{sample.id}</td>
                  <td>{sample.uncached} ms</td>
                  <td>{sample.cached} ms</td>
                  <td className="highlight">
                    {(((sample.uncached - sample.cached) / sample.uncached) * 100).toFixed(1)}% faster
                  </td>
                </tr>
              ))}
              <tr style={{ fontWeight: 700 }}>
                <td>AVERAGE</td>
                <td>{benchmarkData.uncachedAvg} ms</td>
                <td>{benchmarkData.cachedAvg} ms</td>
                <td className="highlight" style={{ fontSize: '0.95rem' }}>
                  {benchmarkData.speedup}% FASTER
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <Toast message={toast.message} type={toast.type} />
    </section>
  );
}

export default CachePage;
