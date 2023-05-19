const consoleWrapper = document.querySelector('.console-wrapper')
const textarea = document.querySelector('textarea')

// auto resize textarea 
window.onload = resize() // to maintain the height, becase the textarea value not lost after page load
textarea.addEventListener('input', () => resize()) 

function resize() {
    textarea.style.height = 'auto' // to reset the height 
    textarea.style.height = (textarea.scrollHeight) + 'px' // then set again the height
}

textarea.addEventListener('keydown', (e) => {
    if (e.key == 'Tab') {
        e.preventDefault() // by default tab key is for change elements focus
        
        // to add indent if tab key pressed
        let caretPos = e.target.selectionStart // caret is the cursor/text pointer, it will return the index position of caret from the string
        let val = textarea.value

        textarea.value = // it will insert tab (space) into the caret position
            val.substring(0, caretPos) 
            + "    " +  // tab size = 4 space
            val.substring(caretPos)  
        textarea.setSelectionRange(caretPos + 4, caretPos + 4) // here caretPos + 4 (relative to tab size)
        //end
    }

    if (!e.shiftKey && e.key == 'Enter') {   
        e.preventDefault() // to prevent new line on Enter Key Pressed

        if (!!textarea.value) { // if text area is not empty. then ...
            let code = textarea.value
            let output
            try {
                output = eval(code) // if not error, output will have eval(code) return value
            } catch (err) {
                output = err // but if eval(code) return error, the error message will be asigned to ouput
            }
    
            addToHistory(code, output) // adding to history
            textarea.value = "" // to reset textarea
    
            // to automatic scroll down when press Enter and the height of console is over that the wrapper
            // to make textarea.console-input always visible
            let scrollHeight = consoleWrapper.scrollHeight + 2 // 2 is for the border width -> 1px top-bottom
            let height = consoleWrapper.offsetHeight // get the height of the wrapper
            consoleWrapper.scrollTo(0, (scrollHeight - height)) // to scroll down
        }
    } 
})

// Create script to evaluate/execute the code from console input
const consoleHistory = document.querySelector('.console-history')

function addToHistory(code, output) {
    let consoleOutput = document.createElement('div')
    consoleOutput.classList.add('console-output')
    consoleOutput.innerHTML = String(output)

    if (output instanceof Error) { // to check if the output is from error catch
        consoleOutput.classList.add('error')
    } else if (output == undefined || output == null) {
        consoleOutput.classList.add('undefined')
    } 

    let consoleInput = document.createElement('div')
    consoleInput.classList.add('console-input')
    consoleInput.innerText = code // using innertext to maintain the breaking line
    consoleHistory.append(consoleInput, consoleOutput)
}
