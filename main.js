const textarea = document.querySelector('textarea')

// auto resize textarea 
textarea.addEventListener('input', (e) => {
    textarea.style.height = 'auto' // to reset the height 
    textarea.style.height = (textarea.scrollHeight) + 'px' // then set again the height
}) 

textarea.addEventListener('keydown', (e) => {
    if (!e.shiftKey && e.key == 'Enter') {   
        e.preventDefault() 
        // to prevent new line on Enter Key Pressed
    } 
})