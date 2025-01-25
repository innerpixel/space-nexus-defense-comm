<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="home">
    <div class="hero">
      <h1>SPACE NEXUS</h1>
      <p class="subtitle">Defense Communications System</p>
      <div class="hero-content">
        <p>Advanced AI-powered communication and surveillance platform for space defense operations.</p>
        <RouterLink to="/communications" class="cta-button">Launch Console</RouterLink>
      </div>
    </div>

    <div class="features">
      <div class="feature">
        <h2>📹 Video Surveillance</h2>
        <p>Real-time monitoring with advanced face detection and environmental analysis.</p>
      </div>

      <div class="feature">
        <h2>💬 Communication Console</h2>
        <p>Secure messaging system with priority levels and automated status updates.</p>
      </div>

      <div class="feature">
        <h2>🤖 AI Assistant</h2>
        <p>Intelligent help system providing contextual assistance and tutorials.</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.home {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  padding: 4rem 0;
  animation: fadeIn 1s ease-out;
}

.hero h1 {
  font-size: 4rem;
  color: var(--color-terminal-green);
  margin: 0;
  text-shadow: 0 0 10px rgba(51, 255, 51, 0.5);
}

.subtitle {
  font-size: 1.5rem;
  color: var(--color-terminal-green);
  opacity: 0.8;
  margin: 1rem 0 2rem;
}

.hero-content {
  max-width: 600px;
  margin: 0 auto;
}

.hero-content p {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.cta-button {
  display: inline-block;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  color: black;
  background: var(--color-terminal-green);
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(51, 255, 51, 0.3);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 4rem 0;
}

.feature {
  background: rgba(51, 255, 51, 0.1);
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid var(--color-terminal-border);
  transition: all 0.3s ease;
}

.feature:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(51, 255, 51, 0.2);
}

.feature h2 {
  color: var(--color-terminal-green);
  margin-top: 0;
}

.feature p {
  margin: 1rem 0 0;
  line-height: 1.6;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 3rem;
  }

  .features {
    grid-template-columns: 1fr;
  }
}
</style>
