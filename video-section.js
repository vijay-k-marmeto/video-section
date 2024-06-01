class VideoContainers extends HTMLElement {
    connectedCallback() {
      this.lazyVideos = this.querySelectorAll('video.lazy');
      
      if (this.lazyVideos.length > 0 && 'IntersectionObserver' in window) {
        this.lazyVideoObserver = new IntersectionObserver(this.onIntersection.bind(this));
  
        this.lazyVideos.forEach(video => this.lazyVideoObserver.observe(video));
      } else {
        console.warn('IntersectionObserver not supported or no lazy videos found');
      }
    }
  
    onIntersection(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadAndPlay(entry.target);
        } else {
          this.pauseVideo(entry.target);
        }
      });
    }
  
    loadAndPlay(video) {
      if (!video.hasAttribute('data-played')) {
        Array.from(video.children).forEach(videoSource => {
          if (videoSource.tagName.toLowerCase() === 'source' && videoSource.dataset.src) {
            videoSource.src = videoSource.dataset.src;
          }
        });
  
        video.load();
        video.play();
        video.setAttribute('data-played', 'true');
      } else {
        video.play();
      }
    }
  
    pauseVideo(video) {
      if (!video.paused) {
        video.pause();
      }
    }
}
  
customElements.define('video-containers', VideoContainers);
  