document.addEventListener('DOMContentLoaded', () => {
    const learnMoreBtn = document.querySelector('#learn-more-trigger');
    const content = document.querySelector('#learn-more');
    
    // Load initial state from localStorage
    const isHidden = localStorage.getItem('learnMoreHidden') !== 'false';
    content.classList.toggle('hidden', isHidden);
    
    // Set initial arrow rotation
    const icon = learnMoreBtn.querySelector('.icon');
    icon.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
    
    learnMoreBtn.addEventListener('click', () => {
        // Toggle content visibility
        content.classList.toggle('hidden');
        
        // Save state to localStorage
        localStorage.setItem('learnMoreHidden', content.classList.contains('hidden'));
        
        // Rotate arrow icon when expanded
        icon.style.transform = content.classList.contains('hidden') 
            ? 'rotate(0deg)' 
            : 'rotate(180deg)';
    });
});
