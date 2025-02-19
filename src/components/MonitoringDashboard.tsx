import { Chart } from 'chart.js';
import { PerformanceMetrics } from '../lib/performance/metrics';

const metrics = PerformanceMetrics.getInstance().getMetrics();

const pageLoadData = metrics.pageLoad || [];
const resourceLoadData = metrics.resourceLoad || [];

<div class="monitoring-dashboard">
  <div class="metrics-grid">
    <div class="metric-card">
      <h3>Page Load Times</h3>
      <canvas id="pageLoadChart"></canvas>
    </div>
    
    <div class="metric-card">
      <h3>Resource Performance</h3>
      <canvas id="resourceLoadChart"></canvas>
    </div>
    
    <div class="metric-card">
      <h3>Error Rate</h3>
      <canvas id="errorRateChart"></canvas>
    </div>
    
    <div class="metric-card">
      <h3>API Response Times</h3>
      <canvas id="apiResponseChart"></canvas>
    </div>
  </div>

  <script>
    // Initialize charts
    const createPageLoadChart = () => {
      const ctx = document.getElementById('pageLoadChart');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: pageLoadData.map(d => new Date(d.timestamp).toLocaleTimeString()),
          datasets: [{
            label: 'Page Load Time (ms)',
            data: pageLoadData.map(d => d.totalPageLoad)
          }]
        }
      });
    };

    // Initialize all charts when the page loads
    document.addEventListener('DOMContentLoaded', () => {
      createPageLoadChart();
      // Add other chart initializations
    });
  </script>
</div>

<style>
  .monitoring-dashboard {
    padding: 2rem;
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .metric-card {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: white;
  }
</style> 