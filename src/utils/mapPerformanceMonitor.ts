// Map Performance Monitoring Utility
export class MapPerformanceMonitor {
  private static instance: MapPerformanceMonitor;
  private metrics: {
    renderTime: number[];
    memoryUsage: number[];
    frameRate: number[];
    loadTime: number;
    cacheHits: number;
    cacheMisses: number;
  };

  private constructor() {
    this.metrics = {
      renderTime: [],
      memoryUsage: [],
      frameRate: [],
      loadTime: 0,
      cacheHits: 0,
      cacheMisses: 0
    };
  }

  static getInstance(): MapPerformanceMonitor {
    if (!MapPerformanceMonitor.instance) {
      MapPerformanceMonitor.instance = new MapPerformanceMonitor();
    }
    return MapPerformanceMonitor.instance;
  }

  // Track map load time
  trackLoadTime(startTime: number): void {
    this.metrics.loadTime = performance.now() - startTime;
    console.log(`🗺️ Map loaded in ${this.metrics.loadTime.toFixed(2)}ms`);
  }

  // Track render performance
  trackRenderTime(renderTime: number): void {
    this.metrics.renderTime.push(renderTime);
    
    // Keep only last 100 measurements
    if (this.metrics.renderTime.length > 100) {
      this.metrics.renderTime.shift();
    }

    // Log performance warnings
    if (renderTime > 16.67) { // 60 FPS threshold
      console.warn(`🐌 Slow render detected: ${renderTime.toFixed(2)}ms`);
    }
  }

  // Track memory usage
  trackMemoryUsage(): void {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const usedMB = memory.usedJSHeapSize / 1048576; // Convert to MB
      this.metrics.memoryUsage.push(usedMB);

      // Keep only last 50 measurements
      if (this.metrics.memoryUsage.length > 50) {
        this.metrics.memoryUsage.shift();
      }

      // Log memory warnings
      if (usedMB > 100) { // 100MB threshold
        console.warn(`🧠 High memory usage: ${usedMB.toFixed(2)}MB`);
      }
    }
  }

  // Track cache performance
  trackCacheHit(): void {
    this.metrics.cacheHits++;
  }

  trackCacheMiss(): void {
    this.metrics.cacheMisses++;
  }

  // Get performance statistics
  getStats() {
    const avgRenderTime = this.metrics.renderTime.length > 0 
      ? this.metrics.renderTime.reduce((a, b) => a + b, 0) / this.metrics.renderTime.length 
      : 0;

    const avgMemoryUsage = this.metrics.memoryUsage.length > 0
      ? this.metrics.memoryUsage.reduce((a, b) => a + b, 0) / this.metrics.memoryUsage.length
      : 0;

    const cacheHitRate = this.metrics.cacheHits + this.metrics.cacheMisses > 0
      ? (this.metrics.cacheHits / (this.metrics.cacheHits + this.metrics.cacheMisses)) * 100
      : 0;

    return {
      loadTime: this.metrics.loadTime,
      avgRenderTime,
      avgMemoryUsage,
      cacheHitRate,
      totalCacheHits: this.metrics.cacheHits,
      totalCacheMisses: this.metrics.cacheMisses,
      estimatedFPS: avgRenderTime > 0 ? Math.min(60, 1000 / avgRenderTime) : 60
    };
  }

  // Log performance summary
  logPerformanceSummary(): void {
    const stats = this.getStats();
    
    console.group('🗺️ BluntDAO Map Performance Summary');
    console.log(`⏱️ Load Time: ${stats.loadTime.toFixed(2)}ms`);
    console.log(`🎨 Avg Render Time: ${stats.avgRenderTime.toFixed(2)}ms`);
    console.log(`📊 Estimated FPS: ${stats.estimatedFPS.toFixed(1)}`);
    console.log(`🧠 Avg Memory Usage: ${stats.avgMemoryUsage.toFixed(2)}MB`);
    console.log(`💾 Cache Hit Rate: ${stats.cacheHitRate.toFixed(1)}%`);
    console.log(`✅ Cache Hits: ${stats.totalCacheHits}`);
    console.log(`❌ Cache Misses: ${stats.totalCacheMisses}`);
    console.groupEnd();
  }

  // Performance recommendations
  getRecommendations(): string[] {
    const stats = this.getStats();
    const recommendations: string[] = [];

    if (stats.loadTime > 3000) {
      recommendations.push('Consider implementing progressive loading for faster initial render');
    }

    if (stats.avgRenderTime > 16.67) {
      recommendations.push('Optimize GeoJSON complexity or implement feature clustering');
    }

    if (stats.avgMemoryUsage > 100) {
      recommendations.push('Consider implementing feature virtualization to reduce memory usage');
    }

    if (stats.cacheHitRate < 80) {
      recommendations.push('Improve caching strategy to reduce network requests');
    }

    if (stats.estimatedFPS < 30) {
      recommendations.push('Consider reducing visual complexity or using Canvas renderer');
    }

    return recommendations;
  }

  // Start continuous monitoring
  startMonitoring(): void {
    // Monitor frame rate
    let lastFrameTime = performance.now();
    const monitorFrameRate = () => {
      const currentTime = performance.now();
      const frameTime = currentTime - lastFrameTime;
      this.trackRenderTime(frameTime);
      lastFrameTime = currentTime;
      requestAnimationFrame(monitorFrameRate);
    };
    requestAnimationFrame(monitorFrameRate);

    // Monitor memory usage every 5 seconds
    setInterval(() => {
      this.trackMemoryUsage();
    }, 5000);

    // Log performance summary every 30 seconds in development
    if (process.env.NODE_ENV === 'development') {
      setInterval(() => {
        this.logPerformanceSummary();
        const recommendations = this.getRecommendations();
        if (recommendations.length > 0) {
          console.group('💡 Performance Recommendations');
          recommendations.forEach(rec => console.log(`• ${rec}`));
          console.groupEnd();
        }
      }, 30000);
    }
  }

  // Reset metrics
  reset(): void {
    this.metrics = {
      renderTime: [],
      memoryUsage: [],
      frameRate: [],
      loadTime: 0,
      cacheHits: 0,
      cacheMisses: 0
    };
  }
}

// Export singleton instance
export const mapPerformanceMonitor = MapPerformanceMonitor.getInstance();
