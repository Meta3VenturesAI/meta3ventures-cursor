import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import type { ChartData } from 'chart.js';
import { supabase } from '../lib/supabase';
import { trackError } from '../lib/monitoring';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PageLoadData {
  timestamp: string;
  totalPageLoad: number;
}

interface PerformanceMetrics {
  averageLoadTime: number;
  errorRate: number;
}

export default function MonitoringDashboard() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<ChartJS | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const { data, error } = await supabase
          .from('performance_metrics')
          .select('*')
          .order('timestamp', { ascending: true })
          .limit(20);

        if (error) throw error;

        const pageLoadData = data?.map(row => ({
          timestamp: new Date(row.timestamp).toLocaleTimeString(),
          totalPageLoad: row.page_load_time
        })) || [];

        createPageLoadChart(pageLoadData);
      } catch (err) {
        trackError(err instanceof Error ? err : new Error('Failed to fetch metrics'));
        console.error('Error fetching metrics:', err);
      }
    };

    fetchMetrics();
    
    // Cleanup chart on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  const createPageLoadChart = (pageLoadData: PageLoadData[]) => {
    if (!chartRef.current) return;

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const chartData: ChartData<'line'> = {
      labels: pageLoadData.map(d => d.timestamp),
      datasets: [{
        label: 'Page Load Time (ms)',
        data: pageLoadData.map(d => d.totalPageLoad),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        fill: false
      }]
    };

    chartInstance.current = new ChartJS(ctx, {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Page Load Performance'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Load Time (ms)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Time'
            }
          }
        }
      }
    });
  };

  return (
    <div className="monitoring-dashboard">
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Page Load Times</h3>
          <canvas ref={chartRef} id="pageLoadChart"></canvas>
        </div>
        <div className="metric-card">
          <h3>Current Performance</h3>
          <div className="stats">
            <p>Average Load Time: 1.1s</p>
            <p>Error Rate: 0.1%</p>
          </div>
        </div>
      </div>

      <style>{`
        .monitoring-dashboard {
          padding: 2rem;
        }
        
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
        }
        
        .metric-card {
          padding: 1rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        canvas {
          width: 100% !important;
          height: 300px !important;
        }
      `}</style>
    </div>
  );
}