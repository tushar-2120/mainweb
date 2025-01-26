// Global array to hold video elements
const videos = Array.from(document.querySelectorAll('.short video'));
let currentVideoIndex = -1;

// Function to open the modal and play the selected video
function playVideo(videoId) {
  const modal = document.getElementById("videoModal"); // Get the modal
  const modalVideo = document.getElementById("modalVideo"); // Get the modal video element

  // Find the index of the clicked video
  currentVideoIndex = videos.findIndex(video => video.id === videoId);

  if (currentVideoIndex !== -1) {
    modal.style.display = "flex"; // Show the modal
    modalVideo.src = videos[currentVideoIndex].src; // Set the source of the clicked video
    modalVideo.play(); // Start playing the video
  }
}

// Function to play the next or previous video
function navigateVideo(direction) {
  const modalVideo = document.getElementById("modalVideo");

  // Update the current index based on the direction
  if (direction === 'next') {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length; // Go to the next video (loop around)
  } else if (direction === 'prev') {
    currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length; // Go to the previous video (loop around)
  }

  // Update the video source and play
  modalVideo.src = videos[currentVideoIndex].src;
  modalVideo.play();
}

// Function to close the modal and stop the video
function closeModal() {
  const modal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");

  modal.style.display = "none"; // Hide the modal
  modalVideo.pause(); // Pause the video
  modalVideo.src = ""; // Clear the video source
}

// Close modal when clicking outside the content
window.onclick = function (event) {
  const modal = document.getElementById("videoModal");
  if (event.target === modal) {
    closeModal();
  }
};
