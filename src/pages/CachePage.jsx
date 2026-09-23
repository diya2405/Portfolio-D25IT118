import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchTasksWithTiming, getCacheStats, flushCache, seedDummyTasks } from '../api/tasks';
import Toast from '../components/Toast';
import '../components/Cache.css';

function CachePage() {
  const { token } = useAuth();
  const [stats, setStats] = useState({ hits: 0, misses: 0, totalRequests: 0, hitRate: '0%', activeKeysCount: 0 });
  const [loadingStats, setLoadingStats] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [singleFetchResult, setSingleFetchResult] = useState(null);
  const [benchmarkData, setBenchmarkData] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  function showToast(message, type = 'success') {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 3000);
  }

  // Load telemetry stats on mount
  async function loadStats() {
    if (!token) return;
    setLoadingStats(true);
    try {
      const data = await getCacheStats(token);
      setStats(data);
    } catch (err) {
      // stats error fallback
    } finally {
      setLoadingStats(false);
    }
  }

  useEffect(() => {
    loadStats();
  }, [token]);

  // Test a single request
  async function handleSingleFetch() {
    if (!token) return;
    setActionLoading(true);
    try {
      const res = await fetchTasksWithTiming(token);
      setSingleFetchResult(res);
      showToast(`Fetched ${res.tasks.length} tasks in ${res.durationMs}ms [${res.cacheStatus}]`, res.cacheStatus === 'HIT' ? 'success' : 'info');
      await loadStats();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setActionLoading(false);
    }
  }

  // Flush cache
  async function handleFlush() {
    if (!token) return;
    setActionLoading(true);
    try {
      await flushCache(token);
      showToast('Cache memory flushed successfully!', 'success');
      setSingleFetchResult(null);
      await loadStats();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setActionLoading(false);
    }
  }

  // Populate sample dummy data
  async function handleSeedDummy() {
    if (!token) return;
    setActionLoading(true);
    try {
      const res = await seedDummyTasks(token);
      showToast(`Created ${res.count} realistic sample tasks in DB!`, 'success');
      await loadStats();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setActionLoading(false);
    }
  }

  // Automated 3x3 Benchmark comparison
  async function handleRunBenchmark() {
    if (!token) return;
    setActionLoading(true);
    setBenchmarkData(null);
    showToast('Running 3x3 live benchmark test...', 'info');

    try {
      const uncachedSamples = [];
      const cachedSamples = [];

      // 1. Gather 3 Uncached Readings (Flushing before each request to force DB query)
      for (let i = 1; i <= 3; i++) {
        await flushCache(token);
        const res = await fetchTasksWithTiming(token);
        uncachedSamples.push(res.durationMs);
      }

      // 2. Prime cache with 1 initial fetch
      await fetchTasksWithTiming(token);

      // 3. Gather 3 Cached Readings (Hitting in-memory cache)
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

      showToast(`Benchmark complete! In-memory cache is ${speedup}% faster.`, 'success');
      await loadStats();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <div className="cache-page-container">
      {/* Header Card */}
      <div className="cache-header-card">
        <span className="cache-badge">cache.optimization</span>
        <h1 className="cache-title">In-Memory Caching & Query Optimization</h1>
        <p className="cache-desc">
          Practical 9 implementation demonstrating server-side caching with <code>node-cache</code>.
          Repeated database reads are served in-memory with a 60-second TTL and automatically invalidated on write operations.
        </p>
      </div>

      {/* Telemetry Stats Grid */}
      <div className="cache-stats-grid">
        <div className="cache-stat-box">
          <span className="stat-label">Cache Hits</span>
          <span className="stat-value">{stats.hits}</span>
          <span className="stat-sub">Served from RAM</span>
        </div>
        <div className="cache-stat-box">
          <span className="stat-label">Cache Misses</span>
          <span className="stat-value">{stats.misses}</span>
          <span className="stat-sub">Queried from MongoDB</span>
        </div>
        <div className="cache-stat-box">
          <span className="stat-label">Hit Ratio</span>
          <span className="stat-value">{stats.hitRate}</span>
          <span className="stat-sub">Memory efficiency</span>
        </div>
        <div className="cache-stat-box">
          <span className="stat-label">Active Keys</span>
          <span className="stat-value">{stats.activeKeysCount}</span>
          <span className="stat-sub">TTL: 60s per key</span>
        </div>
      </div>

      {/* Interactive Control Panel */}
      <div className="cache-controls-card">
        <h3 className="controls-title">Interactive Caching Controls</h3>
        <div className="controls-button-group">
          <button
            className="cache-btn cache-btn-primary"
            onClick={handleRunBenchmark}
            disabled={actionLoading}
          >
            ⚡ Run 3x3 Benchmark Test
          </button>
          <button
            className="cache-btn cache-btn-secondary"
            onClick={handleSingleFetch}
            disabled={actionLoading}
          >
            🔍 Test Single Fetch
          </button>
          <button
            className="cache-btn cache-btn-secondary"
            onClick={handleSeedDummy}
            disabled={actionLoading}
          >
            📦 Populate Dummy Tasks
          </button>
          <button
            className="cache-btn cache-btn-warning"
            onClick={handleFlush}
            disabled={actionLoading}
          >
            🗑️ Invalidate / Flush Cache
          </button>
        </div>

        {/* Single Fetch Result Banner */}
        {singleFetchResult && (
          <div className="fetch-result-card">
            <div>
              <strong>Round-Trip Response Time:</strong> {singleFetchResult.durationMs} ms
              <span style={{ marginLeft: '12px', color: 'var(--muted)', fontSize: '0.85rem' }}>
                ({singleFetchResult.tasks.length} tasks returned)
              </span>
            </div>
            <span className={`status-badge ${singleFetchResult.cacheStatus.toLowerCase()}`}>
              X-Cache: {singleFetchResult.cacheStatus}
            </span>
          </div>
        )}

        {/* Benchmark Results Table */}
        {benchmarkData && (
          <div className="benchmark-table-wrapper">
            <h4 style={{ marginBottom: '8px', color: 'var(--text)' }}>
              📊 Empirical Response Time Benchmark Results (Lab Evidence)
            </h4>
            <table className="benchmark-table">
              <thead>
                <tr>
                  <th>Reading</th>
                  <th>Uncached (MongoDB Atlas)</th>
                  <th>Cached (node-cache RAM)</th>
                  <th>Speed Improvement</th>
                </tr>
              </thead>
              <tbody>
                {benchmarkData.samples.map((sample) => (
                  <tr key={sample.id}>
                    <td>Sample #{sample.id}</td>
                    <td>{sample.uncached} ms</td>
                    <td>{sample.cached} ms</td>
                    <td className="speedup-highlight">
                      {(((sample.uncached - sample.cached) / sample.uncached) * 100).toFixed(1)}% faster
                    </td>
                  </tr>
                ))}
                <tr style={{ fontWeight: 'bold', background: 'rgba(99, 102, 241, 0.08)' }}>
                  <td>AVERAGE</td>
                  <td>{benchmarkData.uncachedAvg} ms</td>
                  <td>{benchmarkData.cachedAvg} ms</td>
                  <td className="speedup-highlight" style={{ fontSize: '1rem' }}>
                    {benchmarkData.speedup}% FASTER 🚀
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Theory & Architecture Explainer */}
      <div className="architecture-box">
        <h3 className="controls-title">Key Practical Concepts & Architecture</h3>
        <div className="arch-steps">
          <div className="arch-step">
            <span className="step-num">1</span>
            <div>
              <strong>User-Scoped Keys:</strong> Cache keys follow the format <code>tasks_[userId]</code> to guarantee zero cross-talk between multi-user accounts.
            </div>
          </div>
          <div className="arch-step">
            <span className="step-num">2</span>
            <div>
              <strong>Auto-Invalidation on Write:</strong> Adding, updating, or deleting a task instantly clears the cache key via <code>cache.del()</code> so stale data is never returned.
            </div>
          </div>
          <div className="arch-step">
            <span className="step-num">3</span>
            <div>
              <strong>Process-Local vs. Distributed Cache:</strong> <code>node-cache</code> operates in local RAM (ideal for single instances). Clustered production setups require a distributed store like Redis.
            </div>
          </div>
        </div>
      </div>

      <Toast message={toast.message} type={toast.type} />
    </div>
  );
}

export default CachePage;
