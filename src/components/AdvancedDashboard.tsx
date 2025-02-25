import { Chart } from 'chart.js';
import { supabase } from '../lib/supabase';
import { useState, useEffect } from 'react';

interface DashboardMetrics {
  activeUsers: number;
  errorRate: number;
  apiLatency: number;
  memoryUsage: number;
}

const Dashboard = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    activeUsers: 0,
    errorRate: 0,
    apiLatency: 0,
    memoryUsage: 0
  });

  const [timeRange, setTimeRange] = useState('24h');

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, [timeRange]);

  const fetchMetrics = async () => {
    const { data, error } = await supabase
      .from('metrics')
      .select('*')
      .gte('timestamp', getTimeRangeStart());

    if (data) {
      // Process metrics data
      updateDashboard(data);
    }
  };

  return (
    <div class="advanced-dashboard">
      <div class="metrics-header">
        <h2>System Metrics</h2>
        <select onChange={(e) => setTimeRange(e.target.value)}>
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
        </select>
      </div>

      <div class="metrics-grid">
        <MetricCard
          title="Active Users"
          value={metrics.activeUsers}
          trend="+5%"
          icon="users"
        />
        <MetricCard
          title="Error Rate"
          value={`${metrics.errorRate}%`}
          trend="-2%"
          icon="alert"
        />
        <MetricCard
          title="API Latency"
          value={`${metrics.apiLatency}ms`}
          trend="+10ms"
          icon="clock"
        />
        <MetricCard
          title="Memory Usage"
          value={`${metrics.memoryUsage}MB`}
          trend="+50MB"
          icon="memory"
        />
      </div>

      <div class="charts-container">
        <div class="chart">
          <canvas id="usageChart"></canvas>
        </div>
        <div class="chart">
          <canvas id="errorChart"></canvas>
        </div>
      </div>
    </div>
  );
};

<style>
.advanced-dashboard {
  padding: 2rem;
  background: #f5f7fa;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.charts-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.chart {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style> 